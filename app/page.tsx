import Link from 'next/link'
import GameCard from '@/components/ui/GameCard'

const GAMES = [
  {
    title: 'Jogo da Velha Futebol',
    description: 'Cruze categorias, ache o jogador certo e complete o tabuleiro sem desperdiçar tentativas.',
    href: '/games/jogo-da-velha',
    tag: 'Diario',
    isNew: false,
    isAvailable: true,
  },
  {
    title: 'Wordle do Futebol',
    description: 'Descubra o sobrenome do craque em ate 6 palpites e leia as pistas por cor.',
    href: '/games/wordle',
    tag: 'Diario',
    isNew: false,
    isAvailable: true,
  },
  {
    title: 'Quem e o Craque?',
    description: 'A foto começa escondida e cada erro revela mais. Ganhe com o menor numero de dicas.',
    href: '/games/quem-e-o-craque',
    tag: 'Diario',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Conexoes Futebol',
    description: 'Forme grupos secretos de jogadores e prove que enxerga padroes antes dos outros.',
    href: '/games/conexoes',
    tag: 'Diario',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Caminho da Carreira',
    description: 'Leia a trilha de clubes e tente identificar o nome escondido por tras da jornada.',
    href: '/games/carreira',
    isAvailable: false,
  },
  {
    title: 'Duelo de Stats',
    description: 'Compare dois nomes, escolha quem domina a estatistica e ganhe no reflexo.',
    href: '/games/duelo',
    isAvailable: false,
  },
  {
    title: 'Linha do Tempo',
    description: 'Coloque momentos e feitos do futebol na ordem certa antes do cronometro mental apertar.',
    href: '/games/linha-do-tempo',
    tag: 'Diario',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Escudo Quebrado',
    description: 'Remonte o simbolo, conecte pistas visuais e tente reconhecer o clube antes do resto.',
    href: '/games/escudo',
    isAvailable: false,
  },
  {
    title: 'Camisa Misteriosa',
    description: 'Sem nome, sem escudo, so tecido, padrao e memoria de torcedor.',
    href: '/games/camisa',
    isAvailable: false,
  },
]

const HIGHLIGHTS = [
  {
    title: 'Desafios diarios',
    copy: 'Todo dia abre uma rodada nova com jogos curtos, memoraveis e competitivos.',
  },
  {
    title: 'Ranking vivo',
    copy: 'Entre com conta, salve resultados e acompanhe quem realmente entende de futebol.',
  },
  {
    title: 'Visual de estadio',
    copy: 'Nova identidade com cara de transmissao esportiva, painel e arquibancada noturna.',
  },
]

export default function Home() {
  const available = GAMES.filter((game) => game.isAvailable)
  const comingSoon = GAMES.filter((game) => !game.isAvailable)

  return (
    <div className="page-shell page-shell--home">
      <section className="hero-layout hero-layout--home">
        <div className="hero-copy">
          <div className="animate-fade-up delay-1">
            <span className="kicker">Nova temporada visual</span>
          </div>

          <div className="animate-fade-up delay-2">
            <p className="eyebrow hero-eyebrow">
              Arcade diario de futebol
            </p>
            <h1 className="display-title hero-display-title text-glow">
              Futebol em
              <br />
              formato de <span className="text-gradient">desafio</span>
            </h1>
          </div>

          <p className="lede hero-lede animate-fade-up delay-3">
            O FUTLE virou uma arena de minijogos com mais presença, mais ritmo e uma cara propria.
            Jogue partidas rapidas, acompanhe o ranking e volte todo dia para uma rodada nova.
          </p>

          <div className="hero-actions animate-fade-up delay-4">
            <Link href="#jogos" className="btn-primary">
              Explorar jogos
            </Link>
            <Link href="/ranking" className="btn-ghost">
              Ver ranking
            </Link>
          </div>

          <div className="hero-metrics animate-fade-up delay-5">
            <div className="metric-tile">
              <div className="metric-value">{available.length}</div>
              <div className="metric-label">Jogos no ar</div>
            </div>
            <div className="metric-tile">
              <div className="metric-value">1</div>
              <div className="metric-label">Rodada por dia</div>
            </div>
            <div className="metric-tile">
              <div className="metric-value">{comingSoon.length}</div>
              <div className="metric-label">Modos chegando</div>
            </div>
          </div>
        </div>

        <aside className="surface-panel surface-panel--accent hero-context-panel animate-scale-in delay-3" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner stack">
            <div>
              <p className="eyebrow hero-context-panel__eyebrow">
                Jogue com contexto
              </p>
              <h2 className="section-title hero-context-panel__title">
                Um hub feito para quem acompanha futebol como linguagem.
              </h2>
              <p className="muted hero-context-panel__copy">
                Nada de tela generica. O novo layout assume uma energia mais editorial, mais esportiva e mais memoravel.
              </p>
            </div>

            <div className="hero-highlight-grid">
              {HIGHLIGHTS.map((item) => (
                <div key={item.title} className="hero-highlight-card">
                  <p className="eyebrow hero-highlight-card__eyebrow">
                    {item.title}
                  </p>
                  <p className="muted hero-highlight-card__copy">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section id="jogos" style={{ paddingTop: 18, marginBottom: 54 }}>
        <div className="section-header">
          <div>
            <p className="section-label">Escalacao titular</p>
            <h2 className="section-title" style={{ marginBottom: 10 }}>
              Jogos para entrar agora
            </h2>
            <p>Os modos ja disponiveis carregam o novo visual e continuam com a mesma logica de jogo.</p>
          </div>
        </div>

        <div className="games-grid">
          {available.map((game, index) => (
            <GameCard key={game.href} {...game} index={index} />
          ))}
        </div>
      </section>

      <section className="panel-grid" style={{ marginBottom: 54 }}>
        <div className="surface-panel animate-fade-up delay-2" style={{ padding: 24, opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner">
            <p className="section-label">Ritmo do produto</p>
            <h3 className="section-title" style={{ marginBottom: 12 }}>
              Sessao curta, retorno alto
            </h3>
            <p className="muted" style={{ marginBottom: 18 }}>
              Cada jogo foi pensado para caber em poucos minutos e ainda assim deixar vontade de voltar amanha.
            </p>
            <Link href="/login" className="btn-ghost">
              Entrar para salvar scores
            </Link>
          </div>
        </div>

        <div className="surface-panel surface-panel--warm animate-fade-up delay-3" style={{ padding: 24, opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner">
            <p className="section-label section-label-muted">Competicao</p>
            <h3 className="section-title" style={{ marginBottom: 12 }}>
              Sua torcida agora aparece no ranking
            </h3>
            <p className="muted" style={{ marginBottom: 18 }}>
              Crie seu nick, acumule pontuacao nas rodadas e suba posicoes conforme os outros desafiam o mesmo dia.
            </p>
            <Link href="/ranking" className="btn-primary">
              Abrir ranking
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <div>
            <p className="section-label section-label-muted">Banco de reservas</p>
            <h2 className="section-title" style={{ marginBottom: 10 }}>
              Proximos modos em construcao
            </h2>
            <p>Os proximos jogos ja entram dentro da nova identidade visual, mantendo uma familia consistente.</p>
          </div>
        </div>

        <div className="games-grid">
          {comingSoon.map((game, index) => (
            <GameCard key={game.href} {...game} index={index + available.length} />
          ))}
        </div>
      </section>
    </div>
  )
}
