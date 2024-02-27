import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'

import { getClient } from '@/api/get-client'
import { TableSkeleton } from '@/components/table-skeleton'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ClientsTableFilters } from './clients-table-filter'
import { ClientsTableRow } from './clients-table-row'

export function Clients() {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClient,
  })

  const [searchParams] = useSearchParams()

  const name = searchParams.get('name')
  const email = searchParams.get('email')

  const clientsFiltered = clients?.filter((client) => {
    if (name && email) {
      return client.name.includes(name) && client.email.includes(email)
    } else if (name) {
      return client.name.includes(name)
    } else if (email) {
      return client.email.includes(email)
    }

    return client
  })

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div>
      <Helmet title="Clientes" />
      <div className="mt-10 flex flex-col gap-4 lg:mt-0">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>

          <Button asChild>
            <Link to="/register-client">Cadastrar Cliente</Link>
          </Button>
        </div>

        <div className="lg:space-y-2.5">
          <ClientsTableFilters />

          <div className="mt-7 text-nowrap rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>email</TableCell>
                  <TableCell>cpf</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientsFiltered?.map((client) => (
                  <ClientsTableRow key={client.id} client={client} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
