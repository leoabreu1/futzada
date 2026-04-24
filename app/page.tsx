import Link from 'next/link'
import GameCard from '@/components/ui/GameCard'

const GAMES = [
  {
    title: 'Jogo da Velha Futebol',
    description: 'Cruze categorias, ache o nome certo e feche o tabuleiro sem gastar tentativa a toa.',
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
    description: 'A foto comeca escondida. Cada erro revela mais um pouco do jogador do dia.',
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
    copy: 'Todo dia entra uma rodada nova com partidas curtas e objetivas.',
  },
  {
    title: 'Ranking vivo',
    copy: 'Entre na conta, salve seu resultado e acompanhe quem sobe no dia.',
  },
  {
    title: 'Leitura rapida',
    copy: 'Tudo foi organizado para destacar o jogo antes de qualquer texto de apoio.',
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
            <p className="eyebrow hero-eyebrow">Arcade diario de futebol</p>
            <h1 className="display-title hero-display-title text-glow">
              Futebol para
              <br />
              resolver em <span className="text-gradient">minutos</span>
            </h1>
          </div>

          <p className="lede hero-lede animate-fade-up delay-3">
            O FUTLE reune jogos diarios de futebol para quem gosta de lembrar nomes, ler pistas e subir no ranking sem perder tempo.
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
                Cinco jogos no ar, uma leitura so.
              </h2>
              <p className="muted hero-context-panel__copy">
                A home agora apresenta o produto de forma mais direta: o que jogar, quanto tem no ar e por que vale voltar amanha.
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

      <section id="jogos" style={{ paddingTop: 18, marginBottom: 54 }}>
        <div className="section-header">
          <div>
            <p className="section-label">Escalacao titular</p>
            <h2 className="section-title" style={{ marginBottom: 10 }}>
              Jogos para entrar agora
            </h2>
            <p>Os modos ativos ja estao no novo visual e prontos para jogar.</p>
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
              Cada rodada cabe em poucos minutos e ainda deixa motivo para voltar no dia seguinte.
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
              Crie seu nick, acumule pontos e acompanhe quem foi melhor na rodada do dia.
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
            <p>Os proximos jogos ja seguem a mesma identidade para manter o produto coeso.</p>
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
