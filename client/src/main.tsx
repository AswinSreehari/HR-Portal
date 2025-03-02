import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@material-tailwind/react'
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JavaScript (for modals, dropdowns, etc.)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider>   
      <App />
    </ThemeProvider>
  </StrictMode>,
)
