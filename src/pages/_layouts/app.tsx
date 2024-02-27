import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 px-6 py-7  lg:px-14 lg:py-8">
        <Outlet />
      </div>
    </div>
  )
}
