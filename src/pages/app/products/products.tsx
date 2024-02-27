import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'

import { getProducts } from '@/api/get-products'
import { TableSkeleton } from '@/components/table-skeleton'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ProductsTableFilters } from './products-table-filter'
import { ProductsTableRow } from './products-table-row'

export function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['productList'],
    queryFn: getProducts,
  })

  const [searchParams] = useSearchParams()

  const productName = searchParams.get('product-name')
  const productValue = searchParams.get('product-value')

  const productsFiltered = products?.filter((product) => {
    if (productName && productValue) {
      return (
        product.name.includes(productName) &&
        product.saleValue.toString().includes(productValue)
      )
    } else if (productName) {
      return product.name.includes(productName)
    } else if (productValue) {
      return product.saleValue.toString().includes(productValue)
    }

    return product
  })

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div>
      <Helmet title="Produtos" />
      <div className="mt-10 flex flex-col gap-4 lg:mt-0">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>

          <Button asChild>
            <Link to="/register-product">Cadastrar Produto</Link>
          </Button>
        </div>

        <div className="space-y-2.5">
          <ProductsTableFilters />

          <div className="mt-7 text-nowrap rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsFiltered?.map((product) => (
                  <ProductsTableRow key={product.id} product={product} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
