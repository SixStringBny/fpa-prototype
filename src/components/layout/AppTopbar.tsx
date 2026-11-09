import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  UserCircle,
  Users,
} from 'lucide-react'
import { modules } from '../../data/modules'
import { mentors } from '../../data/mentors'
import { useDemo } from '../../state/demo-state'
import { Avatar } from '../ui/Avatar'
import { IconButton } from '../ui/IconButton'
import { useToast } from '../ui/Toast'

type AppTopbarProps = {
  title: string
  onOpenMenu: () => void
}

export function AppTopbar({ title, onOpenMenu }: AppTopbarProps) {
  const { state, logout } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false)
      }
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (term.length < 2) return { mentors: [], modules: [] }
    return {
      mentors: mentors
        .filter(
          (mentor) =>
            mentor.name.toLowerCase().includes(term) ||
            mentor.expertise.some((item) => item.toLowerCase().includes(term)),
        )
        .slice(0, 4),
      modules: modules
        .filter(
          (module) =>
            module.title.toLowerCase().includes(term) ||
            module.topic.toLowerCase().includes(term),
        )
        .slice(0, 3),
    }
  }, [query])

  const hasResults = results.mentors.length + results.modules.length > 0

  return (
    <header className="app-topbar">
      <IconButton
        label="Open navigation"
        className="app-topbar__menu"
        onClick={onOpenMenu}
      >
        <Menu size={22} aria-hidden="true" />
      </IconButton>

      <p className="app-topbar__title">{title}</p>

      <div className="app-topbar__search global-search" ref={searchRef}>
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            if (!query.trim()) return
            navigate(`/app/mentors?q=${encodeURIComponent(query.trim())}`)
            setSearchOpen(false)
          }}
        >
          <label className="visually-hidden" htmlFor="global-search">
            Search mentors and modules
          </label>
          <div className="search-field">
            <Search className="search-field__icon" size={17} aria-hidden="true" />
            <input
              id="global-search"
              className="input"
              type="search"
              placeholder="Search mentors and modules"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setSearchOpen(false)
              }}
            />
          </div>
        </form>

        {searchOpen && query.trim().length >= 2 ? (
          <div className="global-search__results">
            {hasResults ? (
              <>
                {results.mentors.length > 0 ? (
                  <div className="global-search__group">
                    <p className="global-search__label">Mentors</p>
                    {results.mentors.map((mentor) => (
                      <button
                        key={mentor.id}
                        type="button"
                        className="global-search__item"
                        onClick={() => {
                          navigate(`/app/mentors/${mentor.slug}`)
                          setQuery('')
                          setSearchOpen(false)
                        }}
                      >
                        <Users size={16} aria-hidden="true" />
                        <span>
                          {mentor.name}
                          <small>{mentor.role}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
                {results.modules.length > 0 ? (
                  <div className="global-search__group">
                    <p className="global-search__label">Modules</p>
                    {results.modules.map((module) => (
                      <button
                        key={module.id}
                        type="button"
                        className="global-search__item"
                        onClick={() => {
                          navigate(`/app/learn/${module.slug}`)
                          setQuery('')
                          setSearchOpen(false)
                        }}
                      >
                        <BookOpen size={16} aria-hidden="true" />
                        <span>
                          {module.title}
                          <small>{module.topic}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <p className="global-search__empty">
                No mentors or modules match “{query.trim()}”.
              </p>
            )}
          </div>
        ) : null}
      </div>

      <div className="app-topbar__actions">
        <IconButton
          label="Notifications"
          bordered
          onClick={() =>
            toast('The notification centre is not part of this prototype.', 'info')
          }
        >
          <Bell size={19} aria-hidden="true" />
        </IconButton>

        <div className="avatar-menu" ref={menuRef}>
          <button
            type="button"
            className="avatar-menu__button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Avatar src={state.profile.avatar} alt="" size="xs" />
            <ChevronDown size={16} aria-hidden="true" />
            <span className="visually-hidden">Open account menu</span>
          </button>

          {menuOpen ? (
            <div className="avatar-menu__panel" role="menu">
              <div className="avatar-menu__name">
                <p style={{ fontWeight: 600, color: 'var(--ink-900)' }}>
                  {state.profile.name}
                </p>
                <p className="text-sm text-muted">Test user</p>
              </div>
              <Link
                className="avatar-menu__item"
                to="/app/profile"
                role="menuitem"
              >
                <UserCircle size={17} aria-hidden="true" />
                My profile
              </Link>
              <button
                type="button"
                className="avatar-menu__item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  logout()
                  navigate('/')
                  toast('You have been logged out.')
                }}
              >
                <LogOut size={17} aria-hidden="true" />
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
