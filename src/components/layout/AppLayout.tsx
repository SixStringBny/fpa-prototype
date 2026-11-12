import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { AppTopbar } from './AppTopbar'
import { MobileNav } from './MobileNav'

function titleFor(pathname: string): string {
  if (pathname.startsWith('/app/dashboard')) return 'Dashboard'
  if (pathname.startsWith('/app/learn')) {
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length >= 4) return 'Lesson'
    if (parts.length === 3) return 'Module'
    return 'Learn'
  }
  if (pathname.startsWith('/app/mentors')) {
    const parts = pathname.split('/')
    if (parts.length > 4) return 'Booking'
    if (parts.length > 3) return 'Mentor profile'
    return 'Mentor matching'
  }
  if (pathname.startsWith('/app/opportunities')) {
    return pathname === '/app/opportunities'
      ? 'Opportunities'
      : 'Opportunity brief'
  }
  if (pathname.startsWith('/app/portfolio')) {
    return pathname === '/app/portfolio' ? 'My portfolio' : 'Project feedback'
  }
  if (pathname.startsWith('/app/roadmap')) return 'Your path'
  if (pathname.startsWith('/app/community')) return 'Community'
  if (pathname.startsWith('/app/sessions')) return 'Sessions'
  if (pathname.startsWith('/app/saved')) return 'Saved mentors'
  if (pathname.startsWith('/app/profile')) return 'My Profile'
  return 'LaunchPad'
}

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <AppSidebar />
      <div className="app-main">
        <AppTopbar
          title={titleFor(pathname)}
          onOpenMenu={() => setMobileOpen(true)}
        />
        <main id="main" className="app-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  )
}
