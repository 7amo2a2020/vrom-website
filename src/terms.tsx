import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Policy } from './components/Policy.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Policy page="terms" />
  </StrictMode>,
)
