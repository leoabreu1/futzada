# Log de Atualizações Diárias — Futzada

---

## 2026-04-19 — Conexões: banco de puzzles triplicado (7 → 21)

**O que foi feito:** O jogo Conexões tinha apenas 7 puzzles diferentes, o que significava que após uma semana os desafios começavam a se repetir. Foram adicionados 14 novos puzzles cobrindo times históricos (Santos, Ajax, Roma, Monaco, Celtic, Zenit), seleções campeãs (Itália 2006, Alemanha 2014, Bélgica, Holanda dos anos 90) e lendas do futebol brasileiro (Grêmio, Vasco, Fluminense, Botafogo, Cruzeiro). O banco agora tem 21 puzzles únicos — três semanas de desafios sem repetição.

**Arquivos modificados:** `lib/games/conexoes-data.ts`

**Por que:** Quem joga todo dia merece sempre um desafio novo. Com apenas 7 puzzles, um jogador frequente via o mesmo desafio repetir em menos de duas semanas, o que tira a graça e a sensação de descoberta do jogo.

---

## 2026-04-17 — Linha do Tempo agora vale pontos e aparece no ranking

**O que foi feito:** Corrigido um bug onde jogadores que venciam o jogo Linha do Tempo recebiam 0 pontos (nenhum) e o jogo sequer aparecia como opção de filtro na página de ranking. Agora o jogo calcula corretamente 100 pontos menos 20 por cada tentativa usada, com mínimo de 10 pontos. O filtro "📅 Linha do Tempo" foi adicionado ao ranking e o badge roxo aparece no card de cada jogador.

**Arquivos modificados:** `lib/hooks/useGameScore.ts`, `app/ranking/page.tsx`

**Por que:** Era injusto — quem jogava e ganhava a Linha do Tempo ficava sem pontuação no ranking, como se o esforço não valesse nada. Agora todos os 4 jogos contam igualmente para o placar global.

---

## 2026-04-16 — Linha do Tempo: shuffle correto + 15 novos eventos históricos

**O que foi feito:** Corrigido um bug crítico na Linha do Tempo onde o shuffle dos eventos usava `Math.random()`, tornando o jogo não-determinístico (cada carregamento de página mostrava eventos diferentes). Substituído por um PRNG determinístico (mulberry32 + Fisher-Yates), garantindo que todos os jogadores vejam exatamente os mesmos 4 eventos no mesmo dia. Adicionada também uma proteção que evita selecionar dois eventos do mesmo ano (evitando ambiguidade na ordenação). O banco de dados de eventos cresceu de 28 para 43 entradas.

**Arquivos modificados:** `lib/games/linha-do-tempo-data.ts`

**Novos eventos adicionados:** Primeira Copa do Mundo (1930), Maracanazo (1950), Brasil campeão 1958 com Pelé aos 17 anos, Brasil bicampeão com Garrincha (1962), Inglaterra campeã em casa (1966), Argentina primeira Copa (1978), Ronaldinho nasce (1980), Brasil encanta mas cai em 1982, Brasil tetracampeão em 1994, Zidane vai ao Real Madrid (2001), Grécia vence Eurocopa (2004), Milagre de Istambul — Liverpool 3-3 Milan (2005), CR7 primeiro Ballon d'Or (2008), Neymar transferência recorde ao PSG (2017), Flamengo bicampeão da Libertadores (2019).

**Por que:** O jogo agora funciona como um desafio diário de verdade — todos os jogadores enfrentam os mesmos 4 eventos no mesmo dia, tornando o resultado comparável e o compartilhamento de resultados significativo. Antes, recarregar a página poderia mostrar eventos completamente diferentes.

---
