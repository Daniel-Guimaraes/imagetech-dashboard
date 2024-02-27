import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface AlertModalDeleteProps {
  id: string
  mutateAsync: (id: string) => Promise<void>
}

export function AlertModalDelete({ id, mutateAsync }: AlertModalDeleteProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem a certeza absoluta?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser anulada. Esta ação irá eliminar permanentemente
          os dados da sua conta.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => mutateAsync(id)}
          className="bg-red-500 dark:bg-red-400 dark:text-white"
        >
          Confirmar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
