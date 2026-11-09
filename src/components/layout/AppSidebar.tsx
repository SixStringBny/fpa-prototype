import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Bookmark,
  CalendarDays,
  Home,
  LogOut,
  RotateCcw,
  UserCircle,
  Users,
} from 'lucide-react'
import { appNav } from '../../data/site'
import { useDemo } from '../../state/demo-state'
import { getUpcomingBookings } from '../../state/selectors'
import { Avatar } from '../ui/Avatar'
import { Dialog } from '../ui/Dialog'
import { Button } from '../ui/Button'
import { useToast } from '../ui/Toast'
import { Logo } from '../shared/Logo'

const navIcons = [Home, BookOpen, Users, CalendarDays, Bookmark, UserCircle]

export function AppSidebar() {
  const { state, logout, resetDemo } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [resetOpen, setResetOpen] = useState(false)

  const upcomingCount = getUpcomingBookings(state).length
  const savedCount = state.savedMentorIds.length

  const badgeFor = (label: string) => {
    if (label === 'Sessions' && upcomingCount > 0) return upcomingCount
    if (label === 'Saved' && savedCount > 0) return savedCount
    return null
  }

  return (
    <>
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          <Logo light to="/app/dashboard" />
        </div>

        <p className="app-sidebar__label">Your space</p>
        <nav className="app-sidebar__nav" aria-label="App navigation">
          {appNav.map((item, index) => {
            const Icon = navIcons[index] ?? Home
            const badge = badgeFor(item.label)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `app-nav-item${isActive ? ' app-nav-item--active' : ''}`
                }
              >
                <Icon size={19} aria-hidden="true" />
                <span>{item.label}</span>
                {badge ? (
                  <span className="app-nav-item__badge" aria-label={`${badge} items`}>
                    {badge}
                  </span>
                ) : null}
              </NavLink>
            )
          })}
        </nav>

        <div className="app-sidebar__footer">
          <div className="app-sidebar__user">
            <Avatar src={state.profile.avatar} alt="" size="xs" />
            <div>
              <p className="app-sidebar__user-name">{state.profile.name}</p>
              <p className="app-sidebar__user-role">Test user</p>
            </div>
          </div>
          <button
            type="button"
            className="app-nav-item"
            onClick={() => setResetOpen(true)}
            style={{ width: '100%', background: 'none', border: 0 }}
          >
            <RotateCcw size={18} aria-hidden="true" />
            Reset demo
          </button>
          <button
            type="button"
            className="app-nav-item"
            onClick={() => {
              logout()
              navigate('/')
              toast('You have been logged out. Your demo data is still saved.')
            }}
            style={{ width: '100%', background: 'none', border: 0 }}
          >
            <LogOut size={18} aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>

      <Dialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset the demo?"
        description="This clears saved mentors, bookings, lesson progress and profile edits, then restores the original seed data."
        footer={
          <>
            <Button variant="secondary" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setResetOpen(false)
                resetDemo()
              }}
            >
              Reset demo
            </Button>
          </>
        }
      />
    </>
  )
}
