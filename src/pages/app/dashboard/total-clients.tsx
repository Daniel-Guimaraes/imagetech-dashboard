import { useQuery } from '@tanstack/react-query'
import { Users } from 'lucide-react'

import { getClient } from '@/api/get-client'
import { CardSkeleton } from '@/components/card-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TotalClientsCard() {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClient,
  })

  if (isLoading) {
    return <CardSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total de clientes
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {clients?.length}
        </span>
      </CardContent>
    </Card>
  )
}
