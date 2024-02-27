import { api } from '@/lib/axios'

interface GetProductsBody {
  id: string
  name: string
  description: string
  saleValue: number
}

export async function getProducts() {
  const response = await api.get<GetProductsBody[]>('/product')

  return response.data
}
