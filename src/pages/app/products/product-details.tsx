import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface ProductDetailsProps {
  product: {
    name: string
    description: string
    linkDownload?: string
    sizes?: string
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{product.name}</DialogTitle>
        <DialogDescription>Detalhes do Produto</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="leading-6 tracking-tight text-muted-foreground">
                {product.description}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {product.linkDownload && (
          <>
            <Separator orientation="horizontal" />

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-base">Link de download</TableCell>
                  <TableCell className="text-right">
                    <Button>
                      <a className="text-xs" href={product.linkDownload}>
                        Download
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}

        {product.sizes && (
          <>
            <Separator orientation="horizontal" />

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-base">Tamanho</TableCell>
                  <TableCell className="text-right">
                    <Badge>
                      <span className="text-base">{product.sizes}</span>
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </DialogContent>
  )
}
