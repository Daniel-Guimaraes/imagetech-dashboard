import { api } from '@/lib/axios'

export async function deleteClient(id: string) {
  await api.delete(`/client/${id}`)
}
