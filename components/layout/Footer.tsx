import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo size={30} />
          <p className="site-footer__copy">
            Jogos diarios de futebol para jogar rapido, comparar resultado e voltar no dia seguinte.
          </p>
        </div>

        <div className="site-footer__nav">
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            Navegue
          </div>
          <Link href="/" className="site-footer__link">
            Jogos
          </Link>
          <Link href="/ranking" className="site-footer__link">
            Ranking
          </Link>
          <Link href="/profile" className="site-footer__link">
            Perfil
          </Link>
        </div>

        <div className="site-footer__season">
          <div className="eyebrow" style={{ marginBottom: 8, justifyContent: 'flex-end' }}>
            Temporada
          </div>
          <p className="site-footer__year">{new Date().getFullYear()}</p>
          <p className="site-footer__tagline">Feito para quem vive futebol</p>
        </div>
      </div>
    </footer>
  )
}
