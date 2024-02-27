import { api } from '@/lib/axios'

interface RegisterProductBody {
  name: string
  description: string
  saleValue: number
  linkDownload?: string
  sizes?: string
}

export async function registerProduct({
  name,
  description,
  saleValue,
  linkDownload,
  sizes,
}: RegisterProductBody) {
  await api.post('/product', {
    name,
    description,
    saleValue,
    linkDownload,
    sizes,
  })
}
