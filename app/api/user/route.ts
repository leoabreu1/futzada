import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET — retorna dados do usuário logado
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, image: true, nickname: true, nicknameUpdatedAt: true },
  })

  return NextResponse.json({ user })
}

// PATCH — atualiza nickname do usuário logado (limite: 1 vez por semana)
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { nickname } = await req.json()

  if (!nickname || typeof nickname !== 'string') {
    return NextResponse.json({ error: 'Nick inválido' }, { status: 400 })
  }

  const trimmed = nickname.trim()

  if (trimmed.length < 2 || trimmed.length > 20) {
    return NextResponse.json({ error: 'Nick deve ter entre 2 e 20 caracteres' }, { status: 400 })
  }

  // Busca dados atuais para checar limite de troca
  const current = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { nickname: true, nicknameUpdatedAt: true },
  })

  // Limite de 1 mudança por semana — só aplica se já tinha nick definido
  if (current?.nickname && current?.nicknameUpdatedAt) {
    const msPerDay = 1000 * 60 * 60 * 24
    const daysSince = (Date.now() - current.nicknameUpdatedAt.getTime()) / msPerDay
    if (daysSince < 7) {
      const daysLeft = Math.ceil(7 - daysSince)
      return NextResponse.json(
        { error: `Você pode mudar o nick novamente em ${daysLeft} dia${daysLeft > 1 ? 's' : ''}` },
        { status: 429 }
      )
    }
  }

  // Verifica se já está em uso por outro usuário
  const existing = await prisma.user.findUnique({ where: { nickname: trimmed } })
  if (existing && existing.id !== session.user.id) {
    return NextResponse.json({ error: 'Esse nick já está em uso' }, { status: 409 })
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { nickname: trimmed, nicknameUpdatedAt: new Date() },
    select: { id: true, name: true, nickname: true, nicknameUpdatedAt: true },
  })

  return NextResponse.json({ user })
}
