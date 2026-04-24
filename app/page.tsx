import Link from 'next/link'
import GameCard from '@/components/ui/GameCard'

const GAMES = [
  {
    title: 'Jogo da Velha Futebol',
    description: 'Cruze categorias, ache o nome certo e feche o tabuleiro sem gastar tentativa a toa.',
    href: '/games/jogo-da-velha',
    tag: 'Diário',
    isNew: false,
    isAvailable: true,
  },
  {
    title: 'Wordle do Futebol',
    description: 'Descubra o sobrenome do craque em até 6 palpites e leia as pistas por cor.',
    href: '/games/wordle',
    tag: 'Diário',
    isNew: false,
    isAvailable: true,
  },
  {
    title: 'Quem e o Craque?',
    description: 'A foto começa escondida. Cada erro revela mais um pouco do jogador do dia.',
    href: '/games/quem-e-o-craque',
    tag: 'Diário',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Conexões Futebol',
    description: 'Forme grupos secretos de jogadores e prove que enxerga padrões antes dos outros.',
    href: '/games/conexoes',
    tag: 'Diário',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Caminho da Carreira',
    description: 'Leia a trilha de clubes e tente identificar o nome escondido por trás da jornada.',
    href: '/games/carreira',
    isAvailable: false,
  },
  {
    title: 'Duelo de Stats',
    description: 'Compare dois nomes, escolha quem domina a estatística e ganhe no reflexo.',
    href: '/games/duelo',
    isAvailable: false,
  },
  {
    title: 'Linha do Tempo',
    description: 'Coloque momentos e feitos do futebol na ordem certa antes do cronômetro mental apertar.',
    href: '/games/linha-do-tempo',
    tag: 'Diário',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Escudo Quebrado',
    description: 'Remonte o símbolo, conecte pistas visuais e tente reconhecer o clube antes do resto.',
    href: '/games/escudo',
    isAvailable: false,
  },
  {
    title: 'Camisa Misteriosa',
    description: 'Sem nome, sem escudo, só tecido, padrão e memória de torcedor.',
    href: '/games/camisa',
    isAvailable: false,
  },
]

const HIGHLIGHTS = [
  {
    title: 'Desafios diários',
    copy: 'Abra a rodada do dia, resolva rápido e veja se você fecha tudo melhor que ontem.',
  },
  {
    title: 'Ranking vivo',
    copy: 'Entre com seu nick, salve sua pontuação e acompanhe quem está na frente hoje.',
  },
  {
    title: 'Cinco modos no ar',
    copy: 'Wordle, Conexões, Jogo da Velha, Linha do Tempo e Quem é o Craque já estão valendo.',
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
            <p className="eyebrow hero-eyebrow">Arcade diário de futebol</p>
            <h1 className="display-title hero-display-title text-glow">
              Futebol para
              <br />
              resolver em <span className="text-gradient">minutos</span>
            </h1>
          </div>

          <p className="lede hero-lede animate-fade-up delay-3">
            O FUTLE reúne jogos diários de futebol para quem gosta de lembrar nomes, ler pistas e subir no ranking sem perder tempo.
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
              <p className="eyebrow hero-context-panel__eyebrow">Jogue com contexto</p>
              <h2 className="section-title hero-context-panel__title">
                Escolha um jogo e entre na rodada.
              </h2>
              <p className="muted hero-context-panel__copy">
                Aqui você encontra o que está valendo hoje, acompanha seu desempenho e volta amanhã para uma rodada nova.
              </p>
            </div>

            <div className="hero-highlight-grid">
              {HIGHLIGHTS.map((item) => (
                <div key={item.title} className="hero-highlight-card">
                  <p className="eyebrow hero-highlight-card__eyebrow">{item.title}</p>
                  <p className="muted hero-highlight-card__copy">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section id="jogos" style={{ paddingTop: 4, marginBottom: 48 }}>
        <div className="section-header">
          <div>
            <p className="section-label">Escalação titular</p>
            <h2 className="section-title" style={{ marginBottom: 10 }}>
              Jogos para entrar agora
            </h2>
            <p>Escolha um modo, jogue a rodada de hoje e tente subir no ranking.</p>
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
              Partidas curtas, disputa diária
            </h3>
            <p className="muted" style={{ marginBottom: 18 }}>
              Cada jogo foi feito para caber em poucos minutos e ainda deixar vontade de voltar no dia seguinte.
            </p>
            <Link href="/login" className="btn-ghost">
              Entrar para salvar scores
            </Link>
          </div>
        </div>

        <div className="surface-panel surface-panel--warm animate-fade-up delay-3" style={{ padding: 24, opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner">
            <p className="section-label section-label-muted">Competição</p>
            <h3 className="section-title" style={{ marginBottom: 12 }}>
              Seu resultado entra no ranking
            </h3>
            <p className="muted" style={{ marginBottom: 18 }}>
              Crie seu nick, some pontos e acompanhe quem teve o melhor dia.
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
              Próximos modos em construção
            </h2>
            <p>Mais modos estão chegando para aumentar a rodada sem perder o ritmo do site.</p>
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
