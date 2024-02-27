import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerProduct } from '@/api/register-products'
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

const registerProductForm = z
  .object({
    name: z.string().min(4, 'Forneça um nome válido para o produto'),
    description: z.string().min(10, 'Descreva melhor o produto'),
    saleValue: z.number().min(1, 'Forneça o valor do produto'),
    typeProduct: z.string(),
    linkDownload: z.string(),
    sizeProduct: z.string().optional(),
  })
  .refine(
    (schema) => {
      if (schema.typeProduct === 'digital' && !schema.linkDownload) {
        return false
      }

      return true
    },
    {
      message: 'Forneça um link para download',
      path: ['linkDownload'],
    },
  )
  .refine(
    (schema) => {
      if (schema.typeProduct === 'configurable' && !schema.sizeProduct) {
        return false
      }
      return true
    },
    {
      message: 'Selecione um tamanho',
      path: ['sizeProduct'],
    },
  )

type RegisterProductForm = z.infer<typeof registerProductForm>

export function RegisterProduct() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = useForm<RegisterProductForm>({
    resolver: zodResolver(registerProductForm),
    defaultValues: {
      name: '',
      description: '',
      saleValue: 0,
      typeProduct: '',
      linkDownload: '',
    },
  })

  const typeProduct = watch('typeProduct')

  const { mutateAsync: registerNewProduct } = useMutation({
    mutationFn: registerProduct,
    onSuccess: () => {
      toast.success('Produto cadastrado com sucesso')
      navigate('/products')
    },
  })

  async function handleRegisterProductForm(data: RegisterProductForm) {
    try {
      await registerNewProduct({
        name: data.name,
        description: data.description,
        saleValue: data.saleValue,
        linkDownload: data.linkDownload,
        sizes: data.sizeProduct,
      })
    } catch (err) {
      toast.error('Erro ao cadastrar o novo produto')
    }
  }

  return (
    <div className=" flex flex-col lg:mx-auto lg:w-[700px]">
      <h1 className="mb-14 text-3xl font-bold tracking-tight">
        Registrar novo produto
      </h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleRegisterProductForm)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="product-name">Nome do produto</Label>
            <Input
              id="product-name"
              type="text"
              {...register('name')}
              errorMessage={errors.name?.message}
            />
          </div>

          <div className="w-[180px] space-y-2">
            <Label>Tipo do produto</Label>
            <Select onValueChange={(e) => setValue('typeProduct', e)}>
              <SelectTrigger>
                <SelectValue placeholder="Produto simples" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Produtos simples</SelectItem>
                <SelectItem value="digital">Produtos Digitais</SelectItem>
                <SelectItem value="configurable">
                  Produtos Configuráveis
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="saleValue">Valor da venda</Label>
            <Input
              id="saleValue"
              {...register('saleValue', { valueAsNumber: true })}
              errorMessage={errors.saleValue?.message}
            />
          </div>

          {typeProduct === 'configurable' && (
            <div className="w-[180px] space-y-2">
              <Label>Tamanhos</Label>
              <Select onValueChange={(e) => setValue('sizeProduct', e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P">P</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="GG">GG</SelectItem>
                  <SelectItem value="XG">XG</SelectItem>
                </SelectContent>
              </Select>
              {errors.sizeProduct?.message && (
                <p className="text-sm text-red-500">
                  {errors.sizeProduct.message}
                </p>
              )}
            </div>
          )}
        </div>

        {typeProduct === 'digital' && (
          <div className="flex-1 space-y-2">
            <Label htmlFor="downloadLink">Link para download</Label>
            <Input
              id="downloadLink"
              {...register('linkDownload')}
              errorMessage={errors.linkDownload?.message}
            />
          </div>
        )}

        <div className="flex-1 space-y-2">
          <Label htmlFor="description">Descrição do produto</Label>
          <Textarea
            id="description"
            className="h-[250px]"
            {...register('description')}
            errorMessage={errors.description?.message}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            'Registrar'
          )}
        </Button>
      </form>
    </div>
  )
}
