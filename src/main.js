import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ThemeProvider wraps App so useTheme() is available everywhere */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
