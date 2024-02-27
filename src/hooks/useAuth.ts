import { useContext } from 'react'

import { AuthContext } from '@/context/auth'

export function useAuth() {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('auth context not available')
  }

  return authContext
}
