import { useQuery } from '@tanstack/react-query'
import { Layers3 } from 'lucide-react'

import { getSales } from '@/api/get-sales'
import { CardSkeleton } from '@/components/card-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TotalSalesCard() {
  const { data: sales, isLoading } = useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
  })

  if (isLoading) {
    return <CardSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total de vendas
        </CardTitle>
        <Layers3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {sales?.length}
        </span>
      </CardContent>
    </Card>
  )
}
