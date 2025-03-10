import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeI18n } from '@/plugins/i18n/i18n.ts'
import App from './App.tsx'

initializeI18n()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

