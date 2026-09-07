import { useState, useEffect } from 'react'
import { logoGhost } from '../lib/logos'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <a href="#" className="navbar-brand">
        {logoGhost && (
          <img
            src={logoGhost}
            alt=""
            className="navbar-icon"
            width="36"
            height="36"
          />
        )}
        <span className="navbar-name">GHOSTTAG</span>
      </a>
      <div className="navbar-links">
        <a href="#catalogo">Catálogo</a>
        <a
          href="https://wa.me/529981035834"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contacto
        </a>
      </div>
    </nav>
  )
}
