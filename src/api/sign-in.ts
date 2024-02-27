import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

interface SignInResponse {
  access_token: string
}

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>('/login', {
    email,
    password,
  })

  return {
    access_token: response.data.access_token,
  }
}
