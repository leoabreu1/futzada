import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET — retorna dados do usuário logado (incluindo nickname)
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, image: true, nickname: true },
  })

  return NextResponse.json({ user })
}

// PATCH — atualiza nickname do usuário logado
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

  // Verifica se já está em uso por outro usuário
  const existing = await prisma.user.findUnique({
    where: { nickname: trimmed },
  })

  if (existing && existing.id !== session.user.id) {
    return NextResponse.json({ error: 'Esse nick já está em uso' }, { status: 409 })
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { nickname: trimmed },
    select: { id: true, name: true, nickname: true },
  })

  return NextResponse.json({ user })
}
