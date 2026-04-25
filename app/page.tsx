import Image from 'next/image'
import Link from 'next/link'
import styles from './home.module.css'

type Game = {
  title: string
  shortTitle?: string
  description: string
  href: string
  badge?: string
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  duration: string
  isNew?: boolean
  isAvailable: boolean
}

const GAMES: Game[] = [
  {
    title: 'Quem é o Craque?',
    description: 'Descubra o jogador pela imagem revelada e pelas pistas.',
    href: '/games/quem-e-o-craque',
    badge: 'Desafio do dia',
    difficulty: 'Médio',
    duration: '2 min',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Jogo da Velha Futebol',
    shortTitle: 'Velha Futebol',
    description: 'Cruze categorias e feche o tabuleiro.',
    href: '/games/jogo-da-velha',
    badge: 'Diário',
    difficulty: 'Médio',
    duration: '3 min',
    isAvailable: true,
  },
  {
    title: 'Wordle do Futebol',
    shortTitle: 'Wordle',
    description: 'Acerte o sobrenome do craque em 6 palpites.',
    href: '/games/wordle',
    badge: 'Popular',
    difficulty: 'Fácil',
    duration: '2 min',
    isAvailable: true,
  },
  {
    title: 'Conexões Futebol',
    shortTitle: 'Conexões',
    description: 'Reconheça padrões entre jogadores e clubes.',
    href: '/games/conexoes',
    badge: 'Novo',
    difficulty: 'Difícil',
    duration: '4 min',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Caminho da Carreira',
    shortTitle: 'Carreira',
    description: 'Leia a trilha de clubes e descubra o nome.',
    href: '/games/carreira',
    badge: 'Diário',
    difficulty: 'Médio',
    duration: '3 min',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Linha do Tempo',
    description: 'Ordene momentos marcantes antes de errar a sequência.',
    href: '/games/linha-do-tempo',
    badge: 'Diário',
    difficulty: 'Difícil',
    duration: '4 min',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Duelo de Stats',
    description: 'Compare números e escolha quem lidera.',
    href: '/games/duelo',
    difficulty: 'Médio',
    duration: '2 min',
    isAvailable: false,
  },
  {
    title: 'Escudo Quebrado',
    description: 'Reconstrua o escudo antes do tempo acabar.',
    href: '/games/escudo',
    difficulty: 'Difícil',
    duration: '3 min',
    isAvailable: false,
  },
  {
    title: 'Camisa Misteriosa',
    description: 'Descubra o clube pela camisa.',
    href: '/games/camisa',
    difficulty: 'Médio',
    duration: '2 min',
    isAvailable: false,
  },
]

const DAILY_STATS = [
  { label: 'Concluídos', value: '0/6' },
  { label: 'Sequência', value: '0 dias' },
  { label: 'Pontos hoje', value: '0' },
  { label: 'Tempo médio', value: '2 min' },
]

const RANKING_PREVIEW = [
  { position: 1, name: 'Canhota', points: 1840 },
  { position: 2, name: 'Meia 10', points: 1720 },
  { position: 3, name: 'Varzeano', points: 1655 },
  { position: 4, name: 'La Bombonera', points: 1530 },
  { position: 5, name: 'Capita', points: 1495 },
]

const BENEFITS = [
  'Partidas curtas, disputa diária',
  'Complete sua rodada do dia',
  'Volte amanhã para uma nova rodada',
  'Desafios feitos para caber no seu dia',
]

const BENEFIT_ICONS = ['90', '6/6', '24h', '2m']

function getGameSlug(href: string) {
  return href.split('/').pop() ?? ''
}

function getGameImage(href: string) {
  return `/images/games/${getGameSlug(href)}.png`
}

function GameGlyph({ game }: { game: Game }) {
  const label = game.shortTitle ?? game.title

  return (
    <span className={styles.gameGlyph} aria-hidden="true">
      {label.slice(0, 2).toUpperCase()}
    </span>
  )
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return <span className={styles.metaPill}>{children}</span>
}

function ModeCard({ game }: { game: Game }) {
  return (
    <Link href={game.href} className={styles.modeCard}>
      <div className={styles.modeMedia}>
        <Image
          src={getGameImage(game.href)}
          alt={game.title}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1120px) 50vw, 25vw"
          className={styles.modeImage}
        />
        <GameGlyph game={game} />
      </div>

      <div className={styles.modeBody}>
        <div className={styles.cardHeading}>
          <h3>{game.shortTitle ?? game.title}</h3>
          {game.badge && <span className={game.isNew ? `${styles.badge} ${styles.badgeGold}` : styles.badge}>{game.badge}</span>}
        </div>
        <p>{game.description}</p>
        <div className={styles.cardMeta}>
          <MetaPill>{game.duration}</MetaPill>
          <MetaPill>{game.difficulty}</MetaPill>
        </div>
        <span className={styles.cardCta}>Jogar agora</span>
      </div>
    </Link>
  )
}

function MissionCard({ href }: { href: string }) {
  return (
    <Link href={href} className={`${styles.modeCard} ${styles.missionCard}`}>
      <div className={styles.missionCardInner}>
        <span className={styles.badge}>Missão diária</span>
        <h3>Feche 6 desafios hoje</h3>
        <p>Complete a rodada, some pontos e desbloqueie sua pontuação final.</p>
        <div className={styles.missionSteps} aria-label="Checklist da rodada">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <span className={styles.cardCta}>Começar rodada</span>
      </div>
    </Link>
  )
}

export default function Home() {
  const available = GAMES.filter((game) => game.isAvailable)
  const primaryGame = available[0]
  const otherModes = available.slice(1)
  const comingSoon = GAMES.filter((game) => !game.isAvailable)

  return (
    <div className={`page-shell page-shell--home ${styles.dashboard}`}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Rodada diária aberta</p>
          <h1 className={styles.title}>
            Teste seu futebol
            <br />
            em <span>3 minutos</span>
          </h1>
          <p className={styles.subtitle}>
            Desafios diários de futebol, partidas rápidas e ranking para quem quer testar conhecimento e competir todos os dias.
          </p>

          <div className={styles.actions}>
            <Link href={primaryGame.href} className={`btn-primary ${styles.primaryCta}`}>
              Jogar desafio de hoje
            </Link>
            <Link href="/ranking" className={`btn-ghost ${styles.secondaryCta}`}>
              Ver ranking
            </Link>
          </div>
        </div>

        <aside className={styles.dailyPanel}>
          <div className={styles.dailyPanelTop}>
            <div>
              <p>Sua rodada de hoje</p>
              <strong>0/6 desafios concluídos</strong>
            </div>
            <span>Rodada aberta</span>
          </div>

          <p className={styles.dailyHint}>Faltam 6 jogos para completar sua rodada.</p>

          <div className={styles.progress} aria-label="Progresso diário">
            <span style={{ width: '0%' }} />
          </div>

          <div className={styles.dailyStats}>
            {DAILY_STATS.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <Link href={primaryGame.href} className={styles.dailyStatus}>
            Sua rodada fecha à meia-noite
            <span>Começar</span>
          </Link>
        </aside>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionHeading}>
          <p className="section-label">Comece por aqui</p>
          <h2>Desafio principal</h2>
        </div>

        <Link href={primaryGame.href} className={styles.featuredCard}>
          <div className={styles.featuredMedia}>
            <Image
              src={getGameImage(primaryGame.href)}
              alt={primaryGame.title}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 46vw"
              className={styles.featuredImage}
            />
            <span className={styles.featuredBadge}>Desafio do dia</span>
          </div>

          <div className={styles.featuredContent}>
            <div>
              <p className={`${styles.kicker} ${styles.kickerSmall}`}>Mais jogado hoje</p>
              <h3>Você acerta o jogador de hoje?</h3>
              <p>{primaryGame.description}</p>
            </div>

            <div className={styles.cardMeta}>
              <MetaPill>Tempo médio: {primaryGame.duration}</MetaPill>
              <MetaPill>{primaryGame.difficulty}</MetaPill>
              <MetaPill>Novo desafio</MetaPill>
            </div>

            <span className={`btn-primary ${styles.featuredCta}`}>Jogar desafio de hoje</span>
          </div>
        </Link>
      </section>

      <section className={styles.modesSection}>
        <div className={styles.sectionHeading}>
          <p className="section-label">Outros modos</p>
          <h2>Complete a rodada</h2>
          <span>Escolha um modo, jogue rápido e some pontos para o dia.</span>
        </div>

        <div className={styles.modesGrid}>
          {otherModes.map((game) => (
            <ModeCard key={game.href} game={game} />
          ))}
          <MissionCard href={primaryGame.href} />
        </div>
      </section>

      <section className={styles.competitionSection}>
        <aside className={styles.rankingPanel}>
          <div className={styles.rankingHeader}>
            <div>
              <p className="section-label section-label-muted">Ranking diário</p>
              <h2>Entre no top 10 de hoje</h2>
            </div>
            <Link href="/ranking">Ver tabela</Link>
          </div>

          <div className={styles.rankingList}>
            {RANKING_PREVIEW.map((player) => (
              <div key={player.name} className={styles.rankingRow}>
                <span className={player.position <= 3 ? `${styles.rank} ${styles.rankPodium}` : styles.rank}>{player.position}</span>
                <strong>{player.name}</strong>
                <span>{player.points}</span>
              </div>
            ))}
          </div>

          <div className={styles.playerRank}>
            <div>
              <strong>Você ainda não jogou hoje</strong>
              <span>Seu resultado entra no ranking diário.</span>
            </div>
            <Link href={primaryGame.href}>Subir</Link>
          </div>
        </aside>
      </section>

      <section className={styles.benefitStrip} aria-label="Por que voltar ao FUTLE">
        {BENEFITS.map((benefit, index) => (
          <div key={benefit}>
            <span>{BENEFIT_ICONS[index]}</span>
            <p>{benefit}</p>
          </div>
        ))}
      </section>

      <section className={styles.upcomingSection}>
        <div className={styles.sectionHeading}>
          <p className="section-label section-label-muted">Banco de reservas</p>
          <h2>Próximos modos</h2>
          <span>Novos formatos para aumentar a rodada sem perder o ritmo.</span>
        </div>

        <div className={styles.upcomingGrid}>
          {comingSoon.map((game) => (
            <div key={game.href} className={styles.upcomingCard}>
              <div className={styles.upcomingMedia}>
                <Image
                  src={getGameImage(game.href)}
                  alt={game.title}
                  fill
                  sizes="(max-width: 720px) 100vw, 33vw"
                  className={styles.upcomingImage}
                />
                <span>Em breve</span>
              </div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
