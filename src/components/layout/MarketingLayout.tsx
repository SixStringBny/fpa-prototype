import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { MarketingHeader } from './MarketingHeader'
import { MarketingFooter } from './MarketingFooter'

export function MarketingLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="marketing-shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <MarketingHeader />
      <main id="main" className="marketing-main" tabIndex={-1}>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  )
}
