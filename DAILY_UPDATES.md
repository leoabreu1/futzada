# Log de Atualizações Diárias — Futzada

---

## 2026-04-24 — Badge "JOGADO HOJE" nos cards da página inicial

**O que foi feito:** Adicionado um indicador visual verde "✓ JOGADO" nos cards dos jogos da página inicial quando o usuário já completou aquele jogo no dia. O badge aparece automaticamente ao lado de "DIÁRIO" assim que o jogador termina o desafio e volta para a home, sem precisar recarregar. Funciona tanto para usuários logados quanto para visitantes.

**Arquivos modificados:** `components/ui/GameCard.tsx`, `components/ui/PlayedTodayBadge.tsx` (novo)

**Por que:** Sem esse indicador, quem joga mais de um jogo por dia precisa abrir cada card para descobrir se já jogou ou não — o que é frustrante. Agora, ao voltar para a home depois de jogar, o progresso do dia fica visível de relance, incentivando o jogador a completar todos os 5 jogos disponíveis.

---

## 2026-04-23 — Conexões: 3 semanas de puzzles novos (sem repetição)

**O que foi feito:** Adicionados 3 novos puzzles ao jogo Conexões Futebol (puzzles 21, 22 e 23), integrando com os 14 que o repositório já havia recebido hoje. O jogo agora tem 24 puzzles únicos no total — o que significa que os jogadores passarão mais de 3 semanas sem ver o mesmo desafio duas vezes. Antes, quem abrisse o jogo hoje (dia 7 desde o lançamento) veriam o puzzle do dia 1 repetido. As novas categorias incluem temas originais como "Usaram a camisa 10 pela Seleção Brasileira", "Foram jogadores E técnicos do mesmo clube" e "Capitães campeões em Copas do Mundo".

**Arquivos modificados:** `lib/games/conexoes-data.ts`

**Por que:** O desafio diário é o coração do jogo — se ele repete, perde a graça. Agora os jogadores têm conteúdo fresco por mais de 3 semanas, e os novos puzzles têm categorias mais criativas e com pegadinhas mais elaboradas (ex: Ronaldo Fenomeno aparece tanto em "revelados pelo Santos" quanto em "artilheiros da Copa" — é uma armadilha intencional).

---

## 2026-04-22 — Jogo da Velha: feedback explicativo de resposta errada

**O que foi feito:** Quando o jogador escolhe um jogador que não se encaixa na célula do grid, agora aparece uma mensagem vermelha explicando exatamente o motivo do erro — por exemplo "Messi não é Goleiro" ou "Robinho não é Francês nem Premier League". Antes só aparecia um X vermelho sem nenhuma explicação. A mensagem fica visível por 2,5 segundos e desaparece com animação suave.

**Arquivos modificados:** `app/games/jogo-da-velha/page.tsx`

**Por que:** Sem feedback, o jogador errava e ficava sem entender por que — desperdiçava tentativas tentando adivinhar qual categoria o jogador não cumpria. Agora o aprendizado é imediato e o jogo fica mais justo e divertido.

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
