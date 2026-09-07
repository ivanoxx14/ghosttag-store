import { logoGhost, logoDark } from '../lib/logos'

export default function Hero() {
  return (
    <section className="hero">
      {logoDark && (
        <img
          src={logoDark}
          alt=""
          className="hero-bg-logo"
          aria-hidden="true"
        />
      )}
      <div className="hero-content">
        {logoGhost && (
          <img
            src={logoGhost}
            alt="GHOSTTAG"
            className="hero-ghost"
            width="180"
            height="180"
          />
        )}
        <h1 className="hero-title">GHOSTTAG</h1>
        <p className="hero-subtitle">Streetwear Premium</p>
        <a href="#catalogo" className="hero-cta">
          Ver Colección
        </a>
      </div>
    </section>
  )
}
