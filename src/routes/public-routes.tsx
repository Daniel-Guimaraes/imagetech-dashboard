import { RouteObject } from 'react-router-dom'

import { AuthLayout } from '@/pages/_layouts/auth'
import { NotFound } from '@/pages/404'
import { SignIn } from '@/pages/auth/sign-in'
import { Error } from '@/pages/error'

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [{ path: '/', element: <SignIn /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
