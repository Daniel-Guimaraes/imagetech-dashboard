import { api } from '@/lib/axios'

export async function deleteSale(id: string) {
  await api.delete(`/sale/${id}`)
}
