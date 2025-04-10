import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './Router'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={Router} />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)
