export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      marginTop: 'auto',
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
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="url(#footerGrad)"/>
            <path d="M11 10h14v4H15v5h9v4h-9v7h-4V10z" fill="#0a0a0b"/>
            <circle cx="30" cy="28" r="4" fill="#0a0a0b" opacity="0.85"/>
            <defs>
              <linearGradient id="footerGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10B981"/>
                <stop offset="100%" stopColor="#F59E0B"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            letterSpacing: '0.04em',
            background: 'linear-gradient(90deg, #10B981, #F59E0B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            FUTZADA
          </span>
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--color-muted-2)' }}>
          Minijogos de futebol com estilo brasileiro
        </p>

        <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-2)' }}>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
