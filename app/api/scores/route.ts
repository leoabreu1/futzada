import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const body = await req.json()
  const { gameType, points, attempts, won, date } = body

  if (!gameType || points === undefined || !date) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  try {
    // upsert: se já jogou hoje, atualiza (só melhora se ganhou mais pontos)
    const existing = await prisma.score.findUnique({
      where: {
        userId_gameType_date: {
          userId: session.user.id,
          gameType,
          date,
        },
      },
    })

    if (existing) {
      // Não sobrescreve se o score anterior foi maior
      if (existing.points >= points) {
        return NextResponse.json({ score: existing, updated: false })
      }
      const updated = await prisma.score.update({
        where: { id: existing.id },
        data: { points, attempts, won },
      })
      return NextResponse.json({ score: updated, updated: true })
    }

    const score = await prisma.score.create({
      data: {
        userId: session.user.id,
        gameType,
        points,
        attempts,
        won: won ?? true,
        date,
      },
    })

    return NextResponse.json({ score, updated: false }, { status: 201 })
  } catch (error) {
    console.error('Erro ao salvar score:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
