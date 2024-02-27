import { RouteObject } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/app'
import { NotFound } from '@/pages/404'
import { Change } from '@/pages/app/change/change'
import { Clients } from '@/pages/app/clients/clients'
import { Dashboard } from '@/pages/app/dashboard/dashboard'
import { Products } from '@/pages/app/products/products'
import { RegisterClient } from '@/pages/app/registerClients/registerClients'
import { RegisterProduct } from '@/pages/app/registerProduct/registerProduct'
import { RegisterSale } from '@/pages/app/registerSale/registerSales'
import { Sales } from '@/pages/app/sales/sales'
import { Error } from '@/pages/error'

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/clients', element: <Clients /> },
      { path: '/products', element: <Products /> },
      { path: '/products/change', element: <Change /> },
      { path: '/sales', element: <Sales /> },
      { path: '/register-product', element: <RegisterProduct /> },
      { path: '/register-client', element: <RegisterClient /> },
      { path: '/register-sale', element: <RegisterSale /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
