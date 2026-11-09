import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Info, Lock, Mail, Sparkles, UserRound } from 'lucide-react'
import { useDemo } from '../../state/demo-state'
import { Button } from '../../components/ui/Button'
import { TextField } from '../../components/ui/Field'
import { Logo } from '../../components/shared/Logo'
import { useToast } from '../../components/ui/Toast'
import { Avatar } from '../../components/ui/Avatar'

export function LoginPage() {
  const { state, login, resetDemo } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('naledi@example.com')
  const [password, setPassword] = useState('launchpad')
  const [error, setError] = useState('')

  const rawNext = searchParams.get('next')
  const next =
    rawNext && rawNext.startsWith('/app') ? rawNext : '/app/dashboard'

  if (state.auth.isAuthenticated) {
    return <Navigate to={next} replace />
  }

  const signIn = () => {
    login()
    toast('Signed in as the test user. No real account was created.', 'success')
    navigate(next, { replace: true })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Enter an email address and password to continue.')
      return
    }
    setError('')
    signIn()
  }

  return (
    <div className="auth-page">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <aside className="auth-page__panel">
        <Logo light />
        <div>
          <span className="eyebrow">Welcome back</span>
          <h2>One login. Your modules, mentors and sessions in one place.</h2>
          <p>
            Pick up where you left off, book a mentor and keep track of the work
            you have already done.
          </p>
          <div className="auth-page__quote" style={{ marginTop: 'var(--space-8)' }}>
            <div className="cluster" style={{ marginBottom: 'var(--space-3)' }}>
              <Avatar
                src="/avatars/user-naledi.svg"
                alt=""
                size="sm"
              />
              <div>
                <p style={{ color: '#fff', fontWeight: 600 }}>
                  Naledi Khumalo
                </p>
                <p style={{ fontSize: 'var(--text-xs)' }}>
                  Design graduate · Johannesburg
                </p>
              </div>
            </div>
            “I finally know what to do after the quote is accepted. That used
            to be the scariest part.”
          </div>
        </div>
        <p className="text-sm">
          A fictional prototype for moderated usability testing. No real
          accounts, emails or payments.
        </p>
      </aside>

      <main className="auth-page__form-side" id="main">
        <div className="auth-card">
          <Link
            to="/"
            className="inline-link"
            style={{ display: 'inline-flex', gap: 6, marginBottom: 'var(--space-8)' }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Launchpad
          </Link>

          <h1>Log in or create your account</h1>
          <p className="auth-card__intro">
            Any email and password will work — this is a prototype.
          </p>

          <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
            <TextField
              id="login-email"
              label="Email address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TextField
              id="login-password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              hint="At least one character. It is not checked."
              required
            />
            {error ? (
              <p className="field__error" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" block icon={<Mail size={18} />}>
              Log in
            </Button>
          </form>

          <div className="auth-divider">or</div>

          <Button
            variant="secondary"
            size="lg"
            block
            icon={<UserRound size={18} />}
            onClick={signIn}
          >
            Continue as test user
          </Button>

          <div className="prototype-note">
            <Info size={18} aria-hidden="true" />
            <p>
              <strong>Prototype only.</strong> Submitting this form does not
              create an account or send any data anywhere. Progress is stored
              in this browser only.
            </p>
          </div>

          <div className="auth-card__footer">
            <p>
              <Lock
                size={14}
                aria-hidden="true"
                style={{ display: 'inline', marginRight: 6 }}
              />
              Demo data lives in <code>launchpad.demo.v1</code>.
            </p>
            <p style={{ marginTop: 'var(--space-2)' }}>
              <button
                type="button"
                className="inline-link"
                style={{ background: 'none', border: 0, padding: 0 }}
                onClick={resetDemo}
              >
                Reset demo data
              </button>
              <span aria-hidden="true"> · </span>
              <Link to="/">Return to the marketing site</Link>
            </p>
          </div>

          <p className="text-xs text-muted" style={{ marginTop: 'var(--space-4)' }}>
            <Sparkles size={13} aria-hidden="true" style={{ display: 'inline', marginRight: 4 }} />
            Tip: use “Continue as test user” for the prepared demo journey.
          </p>
        </div>
      </main>
    </div>
  )
}
