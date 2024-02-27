import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { getSales } from '@/api/get-sales'
import { TableSkeleton } from '@/components/table-skeleton'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { SalesTableRow } from './sales-table-row'

export function Sales() {
  const { data: sales, isLoading } = useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
  })

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div>
      <Helmet title="Vendas" />
      <div className="mt-10 flex flex-col gap-4 lg:mt-0">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>

          <Button asChild>
            <Link to="/register-sale">Cadastrar Venda</Link>
          </Button>
        </div>

        <div className="lg:space-y-2.5">
          <div className="mt-7 text-nowrap rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Valor Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales?.map((sale) => (
                  <SalesTableRow
                    key={sale.id}
                    sale={sale}
                    transaction={sale.transactions}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
