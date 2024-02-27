import { api } from '@/lib/axios'

interface RegisterProductBody {
  description: string
  clientId: string
  items: {
    id: string
    quantity: number
  }[]
}

export async function registerSale({
  description,
  clientId,
  items,
}: RegisterProductBody) {
  await api.post('/sale', {
    description,
    clientId,
    items,
  })
}
