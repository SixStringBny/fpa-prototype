import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogIn, Menu, X } from 'lucide-react'
import { marketingNav } from '../../data/site'
import { useDemo } from '../../state/demo-state'
import { cn } from '../../lib/cn'
import { Logo } from '../shared/Logo'
import { Avatar } from '../ui/Avatar'
import { IconButton } from '../ui/IconButton'
import { Container } from './Container'

export function MarketingHeader() {
  const { state } = useDemo()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const dialog = menuRef.current
    if (!dialog) return
    if (menuOpen && !dialog.open) dialog.showModal()
    if (!menuOpen && dialog.open) dialog.close()
  }, [menuOpen])

  useEffect(() => {
    const dialog = menuRef.current
    if (!dialog) return
    const handleCancel = (event: Event) => {
      event.preventDefault()
      setMenuOpen(false)
    }
    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [])

  return (
    <>
      <header className="marketing-header">
        <Container className="marketing-header__inner">
          <Logo />
          <nav className="marketing-nav" aria-label="Main navigation">
            {marketingNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'marketing-nav__link',
                    isActive && 'marketing-nav__link--active',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="marketing-header__actions">
            {state.auth.isAuthenticated ? (
              <>
                <Link
                  className="avatar-menu__button"
                  to="/app/dashboard"
                  aria-label="Go to your dashboard"
                >
                  <Avatar
                    src={state.profile.avatar}
                    alt=""
                    size="xs"
                  />
                  <span className="text-sm" style={{ fontWeight: 600 }}>
                    Dashboard
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link className="marketing-header__login" to="/login">
                  Log in
                </Link>
                <Link className="marketing-header__login" to="/login">
                  Sign up
                </Link>
                <Link className="btn btn--primary btn--sm" to="/login">
                  Get Started
                </Link>
              </>
            )}
            <IconButton
              label={menuOpen ? 'Close menu' : 'Open menu'}
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </IconButton>
          </div>
        </Container>
      </header>

      <dialog
        ref={menuRef}
        className="mobile-menu"
        aria-label="Site menu"
        onClose={() => setMenuOpen(false)}
      >
        <div className="mobile-menu__header">
          <Logo />
          <IconButton label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={22} aria-hidden="true" />
          </IconButton>
        </div>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {marketingNav.map((item) => (
            <Link key={item.to} className="mobile-menu__link" to={item.to}>
              {item.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__actions">
          {state.auth.isAuthenticated ? (
            <Link className="btn btn--primary btn--lg" to="/app/dashboard">
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link className="btn btn--primary btn--lg" to="/login">
                Get Started
              </Link>
              <Link className="btn btn--secondary btn--lg" to="/login">
                <LogIn size={18} aria-hidden="true" />
                Log in
              </Link>
            </>
          )}
        </div>
      </dialog>
    </>
  )
}
