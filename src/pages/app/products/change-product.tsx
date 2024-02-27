import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { putProduct } from '@/api/put-product'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/react-query'

interface ChangeProductProps {
  product: {
    id: string
    name: string
    description: string
    saleValue: number
    linkDownload?: string
    sizes?: string
  }
}

const changeProductForm = z.object({
  newName: z.string().optional(),
  newDescription: z.string().optional(),
  newSaleValue: z.number().optional(),
})

type ChangeProductForm = z.infer<typeof changeProductForm>

export function ChangeProduct({ product }: ChangeProductProps) {
  const dialogRef = useRef<HTMLButtonElement>(null)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ChangeProductForm>({
    resolver: zodResolver(changeProductForm),
    defaultValues: {
      newName: product.name,
      newDescription: product.description,
      newSaleValue: product.saleValue,
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: putProduct,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['productList'] })
      toast.success('Produto alterado com sucesso')
      dialogRef.current?.click()
    },
  })

  async function handleChangeProductForm(data: ChangeProductForm) {
    try {
      await mutateAsync({
        id: product.id,
        name: data.newName,
        description: data.newDescription,
        saleValue: data.newSaleValue,
      })
    } catch (err) {
      toast.error('Falha ao atualizar o produto')
    }
  }

  return (
    <DialogContent>
      <DialogClose ref={dialogRef} />
      <DialogHeader>
        <DialogTitle>{product.name}</DialogTitle>
        <DialogDescription>Alterar dados do produto</DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(handleChangeProductForm)}
        className="space-y-3"
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="newName">Novo nome</Label>
          <Input
            id="newName"
            type="text"
            {...register('newName')}
            errorMessage={errors.newName?.message}
          />
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="newName">Novo Valor</Label>
          <Input
            type="number"
            {...register('newSaleValue', { valueAsNumber: true })}
            errorMessage={errors.newSaleValue?.message}
          />
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="newName">Nova Descrição</Label>
          <Textarea
            id="newName"
            {...register('newDescription')}
            errorMessage={errors.newDescription?.message}
          />
        </div>

        <Button type="submit" className="mt-10 w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            'Registrar'
          )}
        </Button>
      </form>
    </DialogContent>
  )
}
