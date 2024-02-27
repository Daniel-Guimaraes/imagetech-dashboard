import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

import { privateRoutes } from './protected-routes'
import { publicRoutes } from './public-routes'

export function Routes() {
  const auth = useAuth()

  const routes = auth.token ? privateRoutes : publicRoutes

  return <RouterProvider router={createBrowserRouter(routes)} />
}
