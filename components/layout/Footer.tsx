import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(154, 176, 190, 0.12)',
        background: 'rgba(5, 13, 20, 0.82)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
    >
      <div
        style={{
          width: 'min(var(--container-width), calc(100vw - 24px))',
          margin: '0 auto',
          padding: '26px 0 30px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 18,
          alignItems: 'end',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Logo size={30} />
          <p style={{ maxWidth: 420, color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            Minijogos diarios de futebol com cara de arquibancada, ranking vivo e desafios feitos para voltar todo dia.
          </p>
        </div>

        <div style={{ justifySelf: 'start' }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            Navegue
          </div>
          <Link href="/" style={{ display: 'block', color: 'var(--color-muted)', fontSize: '0.84rem', textDecoration: 'none' }}>
            Jogos
          </Link>
          <Link href="/ranking" style={{ display: 'block', color: 'var(--color-muted)', fontSize: '0.84rem', textDecoration: 'none' }}>
            Ranking
          </Link>
          <Link href="/profile" style={{ display: 'block', color: 'var(--color-muted)', fontSize: '0.84rem', textDecoration: 'none' }}>
            Perfil
          </Link>
        </div>

        <div style={{ justifySelf: 'end', textAlign: 'right' }}>
          <div className="eyebrow" style={{ marginBottom: 8, justifyContent: 'flex-end' }}>
            Temporada
          </div>
          <p style={{ color: 'var(--color-brand-green)', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
            {new Date().getFullYear()}
          </p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Feito para quem vive futebol</p>
        </div>
      </div>
    </footer>
  )
}
