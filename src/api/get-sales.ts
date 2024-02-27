import { api } from '@/lib/axios'

interface GetSaleResponse {
  id: string
  description: string
  totalValue: number
  clientId: string
  transactions: {
    id: string
    quantity: number
    productId: string
  }[]
}

export async function getSales() {
  const response = await api.get<GetSaleResponse[]>('/sale')

  return response.data
}
