import { api } from '@/lib/axios'

interface GetClientResponse {
  id: string
  name: string
  email: string
  cpf: string
}

export async function getClient() {
  const response = await api.get<GetClientResponse[]>('/client')

  return response.data
}
