import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFilterSearch } from '@/hooks/useFilterSearch'

const productsTableFilterForm = z.object({
  productName: z.string(),
  productValue: z.string(),
})

type ProductsTableFilterForm = z.infer<typeof productsTableFilterForm>

export function ProductsTableFilters() {
  const { addSearchParams, clearFilter, searchParams } = useFilterSearch()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ProductsTableFilterForm>({
    resolver: zodResolver(productsTableFilterForm),
    defaultValues: {
      productName: searchParams.get('product-name') || '',
      productValue: searchParams.get('product-Value') || '',
    },
  })

  function handleFilterProductForm(data: ProductsTableFilterForm) {
    addSearchParams({
      paramInitial: 'product-name',
      paramSecondary: 'product-value',
      dataInitial: data.productName,
      dataSecondary: data.productValue,
    })
  }

  function handleClearFilter() {
    reset()
    clearFilter({
      paramInitial: 'product-name',
      paramSecondary: 'product-value',
    })
  }

  return (
    <form
      className="flex flex-col gap-2 space-y-1 lg:flex-row lg:items-center lg:space-y-0"
      onSubmit={handleSubmit(handleFilterProductForm)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="Nome"
        className="h-8 w-[320px]"
        {...register('productName')}
        errorMessage={errors.productName?.message}
      />
      <Input
        placeholder="Preço"
        className="h-8 w-[320px]"
        {...register('productValue')}
        errorMessage={errors.productValue?.message}
      />

      <div className="flex justify-between lg:justify-normal">
        <Button type="submit" variant="secondary" size="xs">
          <Search className="mr-2 h-4 w-4" />
          Filtrar Resultado
        </Button>
        <Button
          type="submit"
          variant="outline"
          size="xs"
          onClick={handleClearFilter}
        >
          <X className="mr-2 h-4 w-4" />
          Remover Filtros
        </Button>
      </div>
    </form>
  )
}
