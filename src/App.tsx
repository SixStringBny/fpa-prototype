import { DemoStateProvider } from './state/demo-state'
import { ToastProvider } from './components/ui/Toast'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import { AppRouter } from './router'

export default function App() {
  return (
    <DemoStateProvider>
      <ToastProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </ToastProvider>
    </DemoStateProvider>
  )
}
