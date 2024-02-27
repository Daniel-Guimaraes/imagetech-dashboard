import { createContext, PropsWithChildren, useState } from 'react'

import { api } from '@/lib/axios'

const tokenKey = '@imagetech:token'

type Auth = {
  token: string | null
  saveCredentials: (token: string) => void
  logout: () => void
}

type AuthProviderProps = PropsWithChildren<{
  // nothing
}>

export const AuthContext = createContext<Auth>({} as Auth)

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(localStorage.getItem(tokenKey))

  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''

  function saveCredentials(token: string) {
    localStorage.setItem(tokenKey, token)
    setToken(token)
  }

  function logout() {
    localStorage.removeItem(tokenKey)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, saveCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
