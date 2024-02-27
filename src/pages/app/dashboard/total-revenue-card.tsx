import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getSales } from '@/api/get-sales'
import { CardSkeleton } from '@/components/card-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { priceFormatter } from '@/utils/functions'

export function TotalRevenueCard() {
  const { data: sales, isLoading } = useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
  })

  const totalRevenue = sales?.reduce((accumulator, sale) => {
    return accumulator + Number(sale.totalValue)
  }, 0)

  if (isLoading) {
    return <CardSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Receita total</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight text-emerald-500 dark:text-emerald-400">
          {priceFormatter(totalRevenue || 0)}
        </span>
      </CardContent>
    </Card>
  )
}
