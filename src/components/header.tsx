import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@radix-ui/react-menubar'
import {
  BarChart3,
  Database,
  DollarSign,
  Home,
  LogOut,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

import { ThemeToggle } from './theme/theme-toggle'
import { NavLink } from './nav-link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Header() {
  const auth = useAuth()
  const navigate = useNavigate()

  function signOut() {
    auth.logout()
    navigate('/')
  }

  return (
    <>
      <div className="flex justify-between px-6 pt-4 lg:hidden">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="rounded-md border bg-muted-foreground p-2 ">
              <BarChart3 className="h-6 w-6 text-muted" />
            </MenubarTrigger>
            <MenubarContent
              alignOffset={10}
              className="mt-1 flex w-[150px] flex-col space-y-5 rounded-md bg-muted-foreground p-5"
            >
              <MenubarItem>
                <NavLink to="/" className="flex items-center gap-3 text-muted ">
                  <Home className="h-5 w-5" />
                  Início
                </NavLink>
                <Separator
                  orientation="horizontal"
                  className="mt-3 w-24 lg:h-6"
                />
              </MenubarItem>

              <MenubarItem>
                <NavLink
                  to="/clients"
                  className="flex items-center gap-3 text-muted"
                >
                  <Users className="h-5 w-5" />
                  Clientes
                </NavLink>
                <Separator
                  orientation="horizontal"
                  className="mt-3 w-24 lg:h-6"
                />
              </MenubarItem>

              <MenubarItem>
                <NavLink
                  to="/products"
                  className="flex items-center gap-3 text-muted"
                >
                  <Database className="h-5 w-5" />
                  Produtos
                </NavLink>
                <Separator
                  orientation="horizontal"
                  className="mt-3 w-24 lg:h-6"
                />
              </MenubarItem>

              <MenubarItem>
                <NavLink
                  to="/sales"
                  className="flex items-center gap-3 text-muted"
                >
                  <DollarSign className="h-5 w-5" />
                  Vendas
                </NavLink>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant={'outline'}
            onClick={signOut}
            className="hover:border-rose-300 hover:bg-transparent"
          >
            <LogOut className="mr-1 h-4 w-4 text-rose-500  dark:text-rose-400" />
            <span className="text-rose-500 dark:text-rose-400">Sair</span>
          </Button>
        </div>
      </div>

      <div className="hidden border-b px-6 pt-2 lg:block">
        <div className="flex h-16 items-center gap-6 px-6">
          <BarChart3 className="hidden lg:h-6 lg:w-6" />

          <Separator orientation="vertical" className="hidden lg:h-6" />

          <nav className="flex items-center space-x-4 lg:space-x-6">
            <NavLink to="/">
              <Home className="h-4 w-4" />
              Início
            </NavLink>

            <NavLink to="/clients">
              <Users className="h-4 w-4" />
              Clientes
            </NavLink>

            <NavLink to="/products">
              <Database className="h-4 w-4" />
              Produtos
            </NavLink>

            <NavLink to="/sales">
              <DollarSign className="h-4 w-4" />
              Vendas
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            <Button
              variant={'outline'}
              onClick={signOut}
              className="hover:border-rose-300 hover:bg-transparent"
            >
              <LogOut className="mr-1 h-4 w-4 text-rose-500  dark:text-rose-400" />
              <span className="text-rose-500 dark:text-rose-400">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
