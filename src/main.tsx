import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo'
import '@fontsource-variable/inter'
import './styles/tokens.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/pages.css'
import './styles/app.css'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Root element not found')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
