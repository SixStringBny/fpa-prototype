import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useDemo } from '../../state/demo-state'

export function RequireAuth() {
  const { state } = useDemo()
  const location = useLocation()

  if (!state.auth.isAuthenticated) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`)
    return <Navigate to={`/login?next=${next}`} replace />
  }

  return <Outlet />
}
