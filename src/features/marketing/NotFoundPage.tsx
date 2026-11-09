import { Link } from 'react-router-dom'
import { Container } from '../../components/layout/Container'

export function NotFoundPage() {
  return (
    <div className="not-found">
      <Container>
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1>That page has moved on</h1>
        <p>
          The page you are looking for does not exist in this prototype. Try
          the home page or head to your dashboard.
        </p>
        <div className="not-found__actions">
          <Link className="btn btn--primary" to="/">
            Back home
          </Link>
          <Link className="btn btn--secondary" to="/app/dashboard">
            Go to dashboard
          </Link>
        </div>
      </Container>
    </div>
  )
}
