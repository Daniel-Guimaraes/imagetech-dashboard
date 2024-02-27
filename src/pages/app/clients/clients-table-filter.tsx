import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFilterSearch } from '@/hooks/useFilterSearch'

const schema = z.object({
  name: z.string(),
  email: z.string(),
})

type FormData = z.infer<typeof schema>

export function ClientsTableFilters() {
  const { addSearchParams, clearFilter, searchParams } = useFilterSearch()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: searchParams.get('name') || '',
      email: searchParams.get('email') || '',
    },
  })

  function handleFilterClientForm(data: FormData) {
    addSearchParams({
      paramInitial: 'name',
      paramSecondary: 'email',
      dataInitial: data.name,
      dataSecondary: data.email,
    })
  }

  function handleClearFilter() {
    reset()
    clearFilter({
      paramInitial: 'name',
      paramSecondary: 'email',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterClientForm)}
      className="flex flex-col gap-2 space-y-1 lg:flex-row lg:items-center lg:space-y-0"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="nome"
        className="h-8 w-[320px]"
        {...register('name')}
        errorMessage={errors.name?.message}
      />
      <Input
        placeholder="email"
        className="h-8 w-[320px]"
        {...register('email')}
        errorMessage={errors.email?.message}
      />

      <div className="flex justify-between lg:justify-normal">
        <Button type="submit" variant="secondary" size="xs">
          <Search className="mr-2 h-4 w-4" />
          Filtrar Resultado
        </Button>
        <Button
          onClick={handleClearFilter}
          type="submit"
          variant="outline"
          size="xs"
        >
          <X className="mr-2 h-4 w-4" />
          Remover Filtros
        </Button>
      </div>
    </form>
  )
}
