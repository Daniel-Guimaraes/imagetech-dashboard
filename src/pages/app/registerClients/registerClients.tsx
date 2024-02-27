import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerClient } from '@/api/register-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerClientForm = z.object({
  name: z.string().min(4, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Digite um cpf válido'),
})

type RegisterClientForm = z.infer<typeof registerClientForm>

export function RegisterClient() {
  const navigate = useNavigate()

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterClientForm>({
    resolver: zodResolver(registerClientForm),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
    },
  })

  const { mutateAsync: registerNewClient } = useMutation({
    mutationFn: registerClient,
    onSuccess: () => {
      toast.success('Cliente cadastrado com sucesso!')
      reset()
    },
  })

  async function handleRegisterClientForm(data: RegisterClientForm) {
    try {
      await registerNewClient({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
      })

      navigate('/clients')
    } catch {
      toast.error('Cliente já existe')
    }
  }

  const cpf = watch('cpf')
  const cpfMask = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

  return (
    <div className=" flex flex-col lg:mx-auto lg:w-[700px]">
      <h1 className="mb-14 text-3xl font-bold tracking-tight">
        Registrar novo cliente
      </h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleRegisterClientForm)}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="client-name">Nome do cliente</Label>
          <Input
            id="client-name"
            type="text"
            {...register('name')}
            errorMessage={errors.name?.message}
          />
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="text"
            {...register('email')}
            errorMessage={errors.email?.message}
          />
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            value={cpfMask}
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            {...register('cpf')}
            errorMessage={errors.cpf?.message}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            'Cadastrar'
          )}
        </Button>
      </form>
    </div>
  )
}
