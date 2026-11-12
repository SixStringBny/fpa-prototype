import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Logo } from '../shared/Logo'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

/**
 * Last-resort UI for an unexpected render error. The prototype has no
 * reporting backend, so this keeps the failure local and gives a way back.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('LaunchPad render error', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="not-found">
        <div className="container container--narrow">
          <Logo />
          <p className="not-found__code" aria-hidden="true">
            !
          </p>
          <h1>Something went wrong</h1>
          <p>
            The prototype hit an unexpected error. Your saved demo data is still
            in this browser, so reloading should bring you back to where you
            were.
          </p>
          <div className="not-found__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              Reload the prototype
            </button>
            <a className="btn btn--secondary" href="#/">
              Back to the home page
            </a>
          </div>
        </div>
      </div>
    )
  }
}
