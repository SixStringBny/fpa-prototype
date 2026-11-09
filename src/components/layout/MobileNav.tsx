import { useEffect, useRef, useState } from 'react'
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
  X,
} from 'lucide-react'
import { appNav } from '../../data/site'
import { useDemo } from '../../state/demo-state'
import { getUpcomingBookings } from '../../state/selectors'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { IconButton } from '../ui/IconButton'
import { useToast } from '../ui/Toast'
import { Logo } from '../shared/Logo'

const navIcons = [Home, BookOpen, Users, CalendarDays, Bookmark, UserCircle]

type MobileNavProps = {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { state, logout, resetDemo } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [resetOpen, setResetOpen] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleCancel = (event: Event) => {
      event.preventDefault()
      onClose()
    }
    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [onClose])

  const upcomingCount = getUpcomingBookings(state).length
  const savedCount = state.savedMentorIds.length
  const badgeFor = (label: string) => {
    if (label === 'Sessions' && upcomingCount > 0) return upcomingCount
    if (label === 'Saved' && savedCount > 0) return savedCount
    return null
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        className="mobile-nav"
        aria-label="App navigation"
        onClose={onClose}
        onClick={(event) => {
          if (event.target === dialogRef.current) onClose()
        }}
      >
        <div className="mobile-nav__header">
          <Logo light to="/app/dashboard" onClick={onClose} />
          <IconButton
            label="Close navigation"
            className="mobile-nav__close"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </IconButton>
        </div>

        <div className="app-sidebar__user">
          <Avatar src={state.profile.avatar} alt="" size="xs" />
          <div>
            <p className="app-sidebar__user-name">{state.profile.name}</p>
            <p className="app-sidebar__user-role">Test user</p>
          </div>
        </div>

        <nav className="app-sidebar__nav" aria-label="Mobile app navigation">
          {appNav.map((item, index) => {
            const Icon = navIcons[index] ?? Home
            const badge = badgeFor(item.label)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `app-nav-item${isActive ? ' app-nav-item--active' : ''}`
                }
              >
                <Icon size={19} aria-hidden="true" />
                <span>{item.label}</span>
                {badge ? (
                  <span className="app-nav-item__badge">{badge}</span>
                ) : null}
              </NavLink>
            )
          })}
        </nav>

        <div className="app-sidebar__footer">
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
              onClose()
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
      </dialog>

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
