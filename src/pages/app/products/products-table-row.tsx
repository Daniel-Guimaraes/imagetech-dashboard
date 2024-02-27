import { AlertDialog, AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { useMutation } from '@tanstack/react-query'
import { Search } from 'lucide-react'

import { deleteProduct } from '@/api/delete-product'
import { AlertModalDelete } from '@/components/alert-modal-delete'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'
import { priceFormatter } from '@/utils/functions'

import { ChangeProduct } from './change-product'
import { ProductDetails } from './product-details'

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    saleValue: number
  }
}

export function ProductsTableRow({ product }: ProductProps) {
  const { mutateAsync } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['productList'] })
    },
  })

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

          <ProductDetails product={product} />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell className="font-medium">
        {priceFormatter(product.saleValue)}
      </TableCell>
      <TableCell className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              className="flex items-center gap-2"
            >
              <span className="text-xs">Alterar</span>
            </Button>
          </DialogTrigger>

          <ChangeProduct product={product} />
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="xs" variant="destructive">
              Deletar
            </Button>
          </AlertDialogTrigger>

          <AlertModalDelete mutateAsync={mutateAsync} id={product.id} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
