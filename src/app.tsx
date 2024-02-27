import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { AuthProvider } from './context/auth'
import { queryClient } from './lib/react-query'
import { Routes } from './routes'
import { ThemeProvider } from './theme/theme-provider'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="dashboard-theme" defaultTheme="light">
        <Helmet titleTemplate="%s | Dashboard" />
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
