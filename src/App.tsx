import { DemoStateProvider } from './state/demo-state'
import { ToastProvider } from './components/ui/Toast'
import { AppRouter } from './router'

export default function App() {
  return (
    <DemoStateProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </DemoStateProvider>
  )
}
