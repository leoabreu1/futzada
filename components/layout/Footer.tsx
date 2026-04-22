import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      marginTop: 'auto',
      background: 'rgba(6,6,9,0.5)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo size={22} id="footerLogo" />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            letterSpacing: '0.06em',
            color: '#FACC15',
          }}>
            FUTLE
          </span>
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--color-muted-2)' }}>
          Desafio diário • Futebol brasileiro
        </p>

        <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-2)' }}>
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
