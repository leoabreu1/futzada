import GameCard from '@/components/ui/GameCard'

const GAMES = [
  {
    title: 'Jogo da Velha Futebol',
    description: 'Grid 3x3 com categorias cruzadas. Preencha com jogadores que se encaixam nas duas condições ao mesmo tempo.',
    href: '/games/jogo-da-velha',
    tag: 'DIÁRIO',
    isNew: false,
    isAvailable: true,
  },
  {
    title: 'Wordle do Futebol',
    description: 'Adivinhe o sobrenome do jogador em 6 tentativas. Verde, amarelo ou cinza a cada palpite.',
    href: '/games/wordle',
    tag: 'DIÁRIO',
    isNew: false,
    isAvailable: true,
  },
  {
    title: 'Quem é o Craque?',
    description: 'Foto do jogador começa embaçada. A cada erro o blur diminui — acerte com o mínimo de dicas.',
    href: '/games/quem-e-o-craque',
    tag: 'DIÁRIO',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Conexões Futebol',
    description: 'Encontre 4 grupos de 4 jogadores com algo em comum. Cuidado com as pegadinhas.',
    href: '/games/conexoes',
    tag: 'DIÁRIO',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Caminho da Carreira',
    description: 'Adivinhe o jogador pela sequência de clubes onde atuou ao longo da vida.',
    href: '/games/carreira',
    isAvailable: false,
  },
  {
    title: 'Duelo de Stats',
    description: 'Dois jogadores, um duelo. Quem tem mais gols, assistências ou títulos?',
    href: '/games/duelo',
    isAvailable: false,
  },
  {
    title: 'Linha do Tempo',
    description: 'Ordene os momentos mais marcantes do futebol na sequência cronológica correta.',
    href: '/games/linha-do-tempo',
    tag: 'DIÁRIO',
    isNew: true,
    isAvailable: true,
  },
  {
    title: 'Escudo Quebrado',
    description: 'O escudo aparece fragmentado. Monte o puzzle e descubra o clube.',
    href: '/games/escudo',
    isAvailable: false,
  },
  {
    title: 'Camisa Misteriosa',
    description: 'Só a camisa, sem escudo. Adivinhe o time e a temporada.',
    href: '/games/camisa',
    isAvailable: false,
  },
]

export default function Home() {
  const available = GAMES.filter((g) => g.isAvailable)
  const comingSoon = GAMES.filter((g) => !g.isAvailable)

  return (
    <main id="jogos" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>

      {/* Hero */}
      <div style={{ padding: 'clamp(70px, 12vw, 120px) 0 clamp(48px, 8vw, 72px)', textAlign: 'center' }}>
        <div className="animate-fade-up delay-1" style={{ marginBottom: 20, opacity: 0, animationFillMode: 'forwards' }}>
          <span className="badge badge-green animate-pulse-glow" style={{ fontSize: '0.7rem', padding: '0.25rem 0.8rem' }}>
            <span style={{ marginRight: 6, fontSize: '0.5rem' }}>&#9679;</span> 5 JOGOS DISPONÍVEIS
          </span>
        </div>

        <h1 className="animate-fade-up delay-2" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.6rem, 7vw, 4.5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          marginBottom: 24,
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          <span className="text-gradient text-glow">Minijogos de Futebol</span>
          <br />
          <span style={{ color: 'var(--color-text)' }}>com Estilo Brasileiro</span>
        </h1>

        <p className="animate-fade-up delay-3" style={{
          fontSize: '1.05rem',
          color: 'var(--color-muted)',
          maxWidth: 500,
          margin: '0 auto',
          lineHeight: 1.7,
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          Teste seu conhecimento sobre futebol — brasileirão, europeu e seleções.
          <br />
          <span style={{ color: 'var(--color-brand-green)' }}>Novo desafio todo dia.</span>
        </p>
      </div>

      {/* Separador com glow */}
      <div className="animate-fade-in delay-4" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <hr style={{
          border: 'none',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), rgba(245, 158, 11, 0.2), transparent)',
          marginBottom: 40,
        }} />
      </div>

      {/* Jogos disponíveis */}
      <section style={{ marginBottom: 56 }}>
        <p className="section-label section-label-green animate-fade-up delay-4" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          JOGAR AGORA
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {available.map((game, i) => (
            <GameCard key={game.href} {...game} index={i} />
          ))}
        </div>
      </section>

      {/* Em breve */}
      <section>
        <p className="section-label section-label-muted animate-fade-up delay-5" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          EM BREVE
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {comingSoon.map((game, i) => (
            <GameCard key={game.href} {...game} index={i + 4} />
          ))}
        </div>
      </section>
    </main>
  )
}
