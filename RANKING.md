# 🏆 Sistema de Ranking - FUTZADA

## ✅ O que foi implementado:

### 1. **Página de Ranking** (`/ranking`)
- Leaderboard global com Top 20 jogadores
- Filtros por tipo de jogo (Wordle, Jogo da Velha, Quem é o Craque)
- Exibição de badges conquistadas
- Estatísticas gerais (total de jogadores, jogos, pontos)
- Ranking agregado por pontos totais

### 2. **Sistema de Badges** 🎖️
Badges automáticos conquistados:
- 🏆 **Primeiro Acerto** - Ganhou o primeiro jogo
- 🔥 **Série de 5** - Ganhou 5 jogos seguidos (em desenvolvimento)
- 🎯 **Mestre do Wordle** - 10+ vitórias no Wordle
- 👁️ **Perito em Craques** - 10+ vitórias em "Quem é o Craque?"
- ⚡ **Mestre da Malha** - 10+ vitórias no Jogo da Velha
- ⭐ **Top 10 Global** - Entrou no Top 10 (em desenvolvimento)

### 3. **Página de Perfil** (`/profile`)
- Configuração do nome do jogador
- ID único gerado automaticamente
- Informações salvas em localStorage

### 4. **Sistema de Pontos**
Pontos baseados em performance:
- **Wordle**: 100 - (tentativas × 10)
  - 1 tentativa = 90 pontos
  - 6 tentativas = 40 pontos
- **Jogo da Velha**: 100 - (tentativas × 5)
  - 1 acerto = 95 pontos
  - 9 acertos = 55 pontos
- **Quem é o Craque**: 100 - (tentativas × 15)
  - 1 tentativa = 85 pontos
  - 5 tentativas = 25 pontos

## 📚 Como usar no código dos games:

### Exemplo - Integrar com o Wordle:

```tsx
'use client'
import { useGameScore } from '@/lib/hooks/useGameScore'

export default function WordlePage() {
  const { registerGameResult } = useGameScore()
  
  // Quando ganhar:
  const handleWin = () => {
    registerGameResult('wordle', true, guesses.length)
  }
  
  // Quando perder:
  const handleLoss = () => {
    registerGameResult('wordle', false, 6)
  }
}
```

## 🗄️ Estrutura de Dados:

### LocalStorage:
```javascript
// Scores (histórico completo)
localStorage['futzada-scores'] = JSON.stringify([
  {
    id: '1713200123456-0.789',
    playerId: 'player-abc123',
    playerName: 'João Silva',
    gameType: 'wordle',
    points: 80,
    attempts: 2,
    date: '2024-04-15'
  },
  // ... mais scores
])

// Player ID (gerado uma vez)
localStorage['futzada-player-id'] = 'player-abc123'

// Player Name (configurável)
localStorage['futzada-player-name'] = 'João Silva'
```

## 🚀 Próximos passos (Expansão Futura):

### 1. **Autenticação Real** (GitHub OAuth)
```bash
npm install next-auth
# Implementar com NextAuth + GitHub
```

### 2. **Banco de Dados** (Supabase ou Firebase)
```typescript
// Migrar localStorage → PostgreSQL
// Tabelas:
// - users (id, name, avatar, createdAt)
// - scores (id, userId, gameType, points, attempts, createdAt)
// - badges (id, userId, badgeType, earnedAt)
```

### 3. **Streaks & Daily Challenges**
```typescript
// Rastrear dias consecutivos jogando
// Desafios especiais por dia
```

### 4. **Social Features**
```typescript
// Compartilhar scores no Twitter
// Convidar amigos
// Salas privadas para competir
```

### 5. **Analytics**
```typescript
// Rastrear:
// - Win rate por game
// - Tempo médio de jogo
// - Distribuição de pontos
```

## 📋 Checklist de Implementação:

- ✅ Tipos TypeScript para Score e Ranking
- ✅ Hook useRankingStorage para persistência
- ✅ Hook useGameScore para registrar resultados
- ✅ Página /ranking com leaderboard
- ✅ Página /profile com config de nome
- ✅ Sistema de badges
- ✅ Build sem erros
- ⏳ Integração com games (TODO: adicionar chamadas a useGameScore)
- ⏳ Autenticação GitHub
- ⏳ Backend com Supabase/Firebase
- ⏳ Streaks diários
- ⏳ Social sharing

## 🔗 Arquivos criados/modificados:

```
lib/
├── hooks/
│   ├── useRankingStorage.ts    (NEW)
│   └── useGameScore.ts         (NEW)
├── types/
│   └── ranking.ts              (NEW)

app/
├── ranking/
│   └── page.tsx                (NEW)
└── profile/
    └── page.tsx                (NEW)

components/
└── layout/
    └── Header.tsx              (MODIFIED - adicionado links)
```

## 🎮 Para testar localmente:

```bash
cd ~/futzada

# Instalar deps
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Acessar:
# - http://localhost:3000/ (home)
# - http://localhost:3000/ranking (leaderboard)
# - http://localhost:3000/profile (seu perfil)
```

---

**Criado em:** 15 Abril 2026  
**Status:** ✅ MVP Completo (localStorage)  
**Próxima fase:** Integração com Supabase + GitHub Auth
