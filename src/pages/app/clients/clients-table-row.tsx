import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { useMutation } from '@tanstack/react-query'

import { deleteClient } from '@/api/delete-client'
import { AlertModalDelete } from '@/components/alert-modal-delete'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'

interface ClientsProps {
  client: {
    id: string
    name: string
    email: string
    cpf: string
  }
}

export function ClientsTableRow({ client }: ClientsProps) {
  const { mutateAsync } = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['clients'] })
    },
  })

  return (
    <TableRow>
      <TableCell className="font-medium">{client.name}</TableCell>
      <TableCell className="font-medium">{client.email}</TableCell>
      <TableCell className="font-medium">{client.cpf}</TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="xs" variant="destructive">
              Deletar
            </Button>
          </AlertDialogTrigger>

          <AlertModalDelete mutateAsync={mutateAsync} id={client.id} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
