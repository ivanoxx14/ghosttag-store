import { logoGhost } from '../lib/logos'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {logoGhost && (
          <img
            src={logoGhost}
            alt=""
            className="footer-ghost"
            width="60"
            height="60"
          />
        )}
        <span className="footer-logo">GHOSTTAG</span>
        <p className="footer-tagline">Streetwear Premium — México</p>
        <a
          href="https://wa.me/529981035834"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-wa"
        >
          Contáctanos por WhatsApp
        </a>
        <p className="footer-copy">
          © {new Date().getFullYear()} GHOSTTAG. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
