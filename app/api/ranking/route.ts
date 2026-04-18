import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Busca todos os scores com dados do usuário
    const scores = await prisma.score.findMany({
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Agrega por usuário
    const playerMap = new Map<string, {
      userId: string
      name: string
      image: string | null
      totalPoints: number
      gamesPlayed: number
      gameBreakdown: Record<string, number>
      lastPlayedDate: string
    }>()

    for (const score of scores) {
      const { user } = score
      if (!playerMap.has(user.id)) {
        playerMap.set(user.id, {
          userId: user.id,
          name: user.name ?? 'Anônimo',
          image: user.image,
          totalPoints: 0,
          gamesPlayed: 0,
          gameBreakdown: {
            wordle: 0,
            'jogo-da-velha': 0,
            'quem-e-o-craque': 0,
            'linha-do-tempo': 0,
            conexoes: 0,
          },
          lastPlayedDate: score.date,
        })
      }

      const player = playerMap.get(user.id)!
      player.totalPoints += score.points
      player.gamesPlayed += 1
      player.gameBreakdown[score.gameType] = (player.gameBreakdown[score.gameType] ?? 0) + 1
      if (score.date > player.lastPlayedDate) {
        player.lastPlayedDate = score.date
      }
    }

    const ranking = Array.from(playerMap.values())
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 50)

    return NextResponse.json({ ranking })
  } catch (error) {
    console.error('Erro ao buscar ranking:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
