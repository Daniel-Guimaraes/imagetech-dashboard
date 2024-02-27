import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface SaleDetailsProps {
  description: string
}

export function SaleDetails({ description }: SaleDetailsProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes da venda</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="leading-6 tracking-tight text-muted-foreground">
                {description}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
