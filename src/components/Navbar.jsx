import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

const navLinks = [
  { label: 'About', href: '#about', type: 'hash' },
  { label: 'Experience', href: '#experience', type: 'hash' },
  { label: 'Projects', href: '#projects', type: 'hash' },
  { label: 'Skills', href: '#skills', type: 'hash' },
  { label: 'Blog', href: '/blog', type: 'route' },
  { label: 'Contact', href: '#contact', type: 'hash', cta: true },
]

export default function Navbar({ alwaysScrolled = false }) {
  const [scrolled, setScrolled] = useState(alwaysScrolled)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    if (alwaysScrolled) return
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [alwaysScrolled])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleHashLink = (e, href) => {
    if (location.pathname !== '/') return // let normal navigation happen
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <nav className={`nav ${scrolled || alwaysScrolled ? 'scrolled' : ''} ${menuOpen ? 'nav-mobile-open' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          AM<span className="dot">.</span>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => {
            if (link.type === 'route') {
              return (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className={`nav-link${link.cta ? ' nav-cta' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            }
            return (
              <li key={link.label}>
                {location.pathname === '/' ? (
                  <a
                    href={link.href}
                    className={`nav-link${link.cta ? ' nav-cta' : ''}`}
                    onClick={(e) => handleHashLink(e, link.href)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={`/${link.href}`}
                    className={`nav-link${link.cta ? ' nav-cta' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  )
}
