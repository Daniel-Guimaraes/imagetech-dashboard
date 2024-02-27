import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'

import { deleteSale } from '@/api/delete-sale'
import { getClient } from '@/api/get-client'
import { getProducts } from '@/api/get-products'
import { AlertModalDelete } from '@/components/alert-modal-delete'
import { TableBodySkeleton } from '@/components/table-body-skeleton'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'
import { priceFormatter } from '@/utils/functions'

import { SaleDetails } from './sale-details'

interface ClientProps {
  sale: {
    id: string
    description: string
    totalValue: number
    clientId: string
  }
  transaction: {
    productId: string
    quantity: number
  }[]
}

export function SalesTableRow({ sale, transaction }: ClientProps) {
  const { mutateAsync } = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      queryClient.refetchQueries()
    },
  })

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: getClient,
  })

  const { data: products, isLoading } = useQuery({
    queryKey: ['productList'],
    queryFn: getProducts,
  })

  const transactionProduct = transaction.find(
    (item) => item.productId && item.quantity,
  )

  const product = products?.find(
    (item) => item.id === transactionProduct?.productId,
  )

  const client = clients?.find((item) => item.id === sale.clientId)

  if (isLoading) {
    return <TableBodySkeleton />
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              className="flex items-center gap-2"
            >
              <Search className="h-3 w-3" />
              <span className="text-xs">Detalhes</span>
            </Button>
          </DialogTrigger>

          <SaleDetails description={sale.description} />
        </Dialog>
      </TableCell>

      <TableCell className="font-medium">{client?.name}</TableCell>
      <TableCell className="font-medium">{product?.name}</TableCell>

      <TableCell className="font-medium">
        {transactionProduct?.quantity}
      </TableCell>

      <TableCell className="font-medium">
        {priceFormatter(sale.totalValue)}
      </TableCell>

      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="xs" variant="destructive">
              Deletar
            </Button>
          </AlertDialogTrigger>

          <AlertModalDelete mutateAsync={mutateAsync} id={sale?.id as string} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
