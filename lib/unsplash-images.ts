// Imagens do Unsplash para cada jogo
// Usando parâmetros de busca para garantir qualidade
export const GAME_IMAGES = {
  'jogo-da-velha': 'https://images.unsplash.com/photo-1552667466-07d71e725e34?w=600&h=400&fit=crop&q=80', // Tic tac toe/board game
  'wordle': 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop&q=80', // Letters/words
  'quem-e-o-craque': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop&q=80', // Soccer/football player
  'conexoes': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80', // Network/connections
  'carreira': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80', // Career/timeline
  'duelo': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop&q=80', // Soccer match/competition
  'linha-do-tempo': 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=600&h=400&fit=crop&q=80', // Timeline/history
  'escudo': 'https://images.unsplash.com/photo-1579952363873-187243a993ce?w=600&h=400&fit=crop&q=80', // Shield/team
  'camisa': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop&q=80', // Football jersey
}

export function getGameImage(gameType: string): string {
  return GAME_IMAGES[gameType as keyof typeof GAME_IMAGES] ||
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop&q=80'
}
