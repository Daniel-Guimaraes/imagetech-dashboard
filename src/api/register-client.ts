import { api } from '@/lib/axios'

interface RegisterClientBody {
  name: string
  email: string
  cpf: string
}

export async function registerClient({ name, email, cpf }: RegisterClientBody) {
  await api.post('/client', {
    name,
    email,
    cpf,
  })
}
