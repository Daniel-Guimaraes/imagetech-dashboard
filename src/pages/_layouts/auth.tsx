import { BarChart3 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="antialiased lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex lg:h-full lg:flex-col lg:justify-between lg:border-r lg:border-foreground/5 lg:bg-muted lg:p-10 lg:text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <BarChart3 className="h-5 w-5" />
          <span className="font-semibold">Imagetech</span>
        </div>
        <footer className="text-sm">
          Imagetech &copy; Dashboard - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex h-screen flex-col items-center justify-center">
        <Outlet />

        <footer className="mt-20 text-xs">
          Imagetech &copy; Dashboard - {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
