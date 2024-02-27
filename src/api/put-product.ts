import { api } from '@/lib/axios'

interface PutProductBody {
  id: string | undefined
  name: string | undefined
  description: string | undefined
  saleValue: number | undefined
}

export async function putProduct({
  id,
  name,
  description,
  saleValue,
}: PutProductBody) {
  await api.put<PutProductBody>(`/product/${id}`, {
    name,
    description,
    saleValue,
  })
}
