# 🎮 FUTLE - Game: Linha do Tempo ✅

## ✨ O que foi implementado:

### 📄 Arquivos Criados:
1. **lib/games/linha-do-tempo-data.ts** (318 linhas)
   - 30 eventos históricos do futebol
   - Funções para: pegar eventos do dia, ordenar cronologicamente, calcular pontos
   - Desafio diário (determinístico por data)

2. **app/games/linha-do-tempo/page.tsx** (314 linhas)
   - UI completa do jogo
   - Sistema de drag-and-drop (clique para reordenar)
   - 3 tentativas para acertar
   - Feedback visual (verde/amarelo quando ganha/perde)
   - Integração automática com ranking

### 🎯 Mecânica do Jogo:

**Objetivo:** Ordene 4 eventos históricos do futebol em ordem cronológica

**Exemplos de eventos:**
- 1940: Pelé nasce
- 1970: Brasil tricampeão
- 1986: Maradona mão de Deus
- 1998: França campeã em casa
- ... e muito mais!

**Como Funciona:**
1. Sistema pega 4 eventos aleatórios (diferentes a cada dia)
2. Shuffle aleatório dos eventos
3. Jogador clica nos eventos para reordenar (da esquerda pra direita)
4. Pode remover clicando no evento na sua ordem
5. 3 tentativas para acertar

**Sistema de Pontos:**
- Acerta em 1 tentativa = 100 pontos ✨
- Acerta em 2 tentativas = 80 pontos
- Acerta em 3 tentativas = 60 pontos
- Erra = 0 pontos

### 📊 Modificações em Arquivos Existentes:

1. **app/page.tsx**
   - Marcado "Linha do Tempo" como disponível
   - Adicionado tag "DIÁRIO"
   - Marcado como "NEW"
   - Atualizado contador: "3 JOGOS" → "4 JOGOS"

2. **lib/types/ranking.ts**
   - Adicionado 'linha-do-tempo' ao tipo Score
   - Adicionado 'linha-do-tempo' ao gameBreakdown

3. **lib/hooks/useRankingStorage.ts**
   - Adicionado 'linha-do-tempo' ao gameBreakdown inicial
   - Tipo atualizado

4. **lib/hooks/useGameScore.ts**
   - Adicionado 'linha-do-tempo' ao tipo registerGameResult

## 🏗️ Estrutura de Dados:

```typescript
TimelineEvent = {
  id: string              // ID único
  title: string           // "Pelé nasce"
  description: string     // Contexto do evento
  year: number            // 1940
  emoji: string           // 👶
}

// Cada dia pega 4 eventos diferentes aleatoriamente
// Baseado na data: determinístico (mesmo jogo se jogar 2x no mesmo dia)
```

## 🎮 Como Jogar:

1. Acesse http://localhost:3000
2. Clique em "Linha do Tempo"
3. Clique nos eventos para reordená-los
4. Clique em "Verificar Ordem" quando terminar
5. Se acertar, ganha pontos!
6. Se errar, pode tentar novamente (até 3 vezes)
7. Próximo desafio amanhã às 00:00

## 📈 Integração com Ranking:

- ✅ Score registrado automaticamente ao ganhar
- ✅ Aparece no leaderboard (/ranking)
- ✅ Feedback visual de "Pontuação registrada!"
- ✅ Filtro por jogo no ranking
- ✅ Contador de "Linha do Tempo" jogos no perfil

## 🧪 Testes:

```bash
cd ~/futle
npm run dev

# Abrir navegador:
# http://localhost:3000/games/linha-do-tempo
```

## ✅ Build Status:

```
✓ Compiled successfully in 8.0s
✓ TypeScript validation passed
✓ 10/10 páginas geradas
```

**Páginas agora disponíveis:**
- / (home)
- /games/wordle
- /games/jogo-da-velha
- **NEW: /games/linha-do-tempo** ← 
- /games/quem-e-o-craque
- /profile
- /ranking

## 📋 Dados de Teste:

Para testar com múltiplos jogadores e scores, execute no console:

```javascript
// Abra DevTools (F12) → Console
// Cole a função do lib/mock-data.ts
window.seedFutleMockData()
```

## 🎯 Próximos Games a Implementar:

Restam **5 games**:
1. ⭐ **Duelo de Stats** (2-2.5h) - Mais divertido
2. 🔗 **Conexões Futebol** (2-3h) - Mais complexo
3. 👕 **Camisa Misteriosa** (1.5-2h) - Visual
4. 🧩 **Escudo Quebrado** (1.5h) - Puzzle
5. 🛤️ **Caminho da Carreira** (2h) - Curiosidade

---

**Tempo investido:** ~1.5 horas
**Linhas de código:** ~650 novas
**Status:** ✅ Pronto para usar

Qual game quer fazer próximo? 🚀
