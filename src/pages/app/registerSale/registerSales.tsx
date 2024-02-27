import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getClient } from '@/api/get-client'
import { getProducts } from '@/api/get-products'
import { registerSale } from '@/api/register-sale'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const registerSaleForm = z
  .object({
    description: z.string().min(4, 'Forneça uma descrição válida da venda'),
    quantity: z.number().min(1, 'Forneça a quantidade do produto'),
    clientId: z.string(),
    productId: z.string(),
  })
  .refine(
    (schema) => {
      if (schema.clientId) {
        return true
      }

      return false
    },
    {
      message: 'Forneça um cliente',
      path: ['clientId'],
    },
  )
  .refine(
    (schema) => {
      if (schema.productId) {
        return true
      }

      return false
    },
    {
      message: 'Forneça um produto',
      path: ['productId'],
    },
  )

type RegisterSaleForm = z.infer<typeof registerSaleForm>

export function RegisterSale() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<RegisterSaleForm>({
    resolver: zodResolver(registerSaleForm),
    defaultValues: {
      description: '',
      quantity: 0,
      clientId: '',
      productId: '',
    },
  })

  const { data: clients } = useQuery({
    queryKey: ['clientsList'],
    queryFn: getClient,
  })

  const { data: products } = useQuery({
    queryKey: ['productList'],
    queryFn: getProducts,
  })

  const { mutateAsync: registerNewSale } = useMutation({
    mutationFn: registerSale,
    onSuccess: () => {
      toast.success('Venda cadastrada com sucesso')
      navigate('/sales')
    },
  })

  async function handleRegisterSaleForm(data: RegisterSaleForm) {
    try {
      await registerNewSale({
        description: data.description,
        clientId: data.clientId,
        items: [
          {
            id: data.productId,
            quantity: data.quantity,
          },
        ],
      })
    } catch (err) {
      toast.error('Erro ao cadastrar a venda')
    }
  }

  return (
    <div className=" flex flex-col lg:mx-auto lg:w-[700px]">
      <h1 className="mb-14 text-3xl font-bold tracking-tight">
        Registrar nova venda
      </h1>

      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleRegisterSaleForm)}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="sale-description">Descrição</Label>
          <Textarea
            id="sale-description"
            {...register('description')}
            errorMessage={errors.description?.message}
          />
        </div>

        <div className="flex-1 space-y-2">
          <Label>Clientes</Label>

          <Select onValueChange={(e) => setValue('clientId', e)}>
            <SelectTrigger
              className={`${errors.clientId ? 'border-red-500' : undefined}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {clients?.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.clientId?.message && (
            <span className="text-sm text-red-500">
              {errors.clientId.message}
            </span>
          )}
        </div>

        <div className="flex w-full items-start gap-4">
          <div className="flex-1 space-y-2">
            <Label>Produtos</Label>
            <Select onValueChange={(e) => setValue('productId', e)}>
              <SelectTrigger
                className={`${errors.productId ? 'border-red-500' : undefined}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {products?.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.productId?.message && (
              <span className="text-sm text-red-500">
                {errors.productId.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="0"
              {...register('quantity', { valueAsNumber: true })}
              errorMessage={errors.quantity?.message}
              min={1}
            />
          </div>
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
