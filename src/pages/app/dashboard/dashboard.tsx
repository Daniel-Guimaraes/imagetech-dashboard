import { Helmet } from 'react-helmet-async'

import { TotalClientsCard } from './total-clients'
import { TotalProductsCard } from './total-products-card'
import { TotalRevenueCard } from './total-revenue-card'
import { TotalSalesCard } from './total-sales-card'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="mt-14 flex flex-col space-y-2 lg:mx-auto  lg:w-[1024px]">
        <h1 className="mb-7 text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className=" flex flex-col gap-4 lg:grid   lg:grid-cols-2">
          <TotalProductsCard />

          <TotalClientsCard />

          <TotalSalesCard />

          <TotalRevenueCard />
        </div>
      </div>
    </>
  )
}
