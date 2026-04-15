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
    isAvailable: false,
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
      <div style={{ padding: 'clamp(60px, 10vw, 100px) 0 clamp(48px, 8vw, 72px)', textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <span className="badge badge-green">
            <span style={{ marginRight: 5 }}>●</span> 4 JOGOS DISPONÍVEIS
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 6vw, 4rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          marginBottom: 20,
        }}>
          <span className="text-gradient">Minijogos de Futebol</span>
          <br />
          <span style={{ color: 'var(--color-text)' }}>com Estilo Brasileiro</span>
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--color-muted)',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Teste seu conhecimento sobre futebol — brasileirão, europeu e seleções.
          Novo desafio todo dia.
        </p>
      </div>

      {/* Separador */}
      <hr className="divider" style={{ marginBottom: 40 }} />

      {/* Jogos disponíveis */}
      <section style={{ marginBottom: 56 }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          color: 'var(--color-brand-green)',
          marginBottom: 16,
        }}>
          JOGAR AGORA
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {available.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>

      {/* Em breve */}
      <section>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          color: 'var(--color-muted-2)',
          marginBottom: 16,
        }}>
          EM BREVE
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {comingSoon.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>
    </main>
  )
}
