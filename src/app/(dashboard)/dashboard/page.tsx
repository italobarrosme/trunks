import { FilterController } from '@/modules/dashboard/components/FilterController'
import { PageWithSearchParams } from '@/modules/shared/types/types'
import { redirect } from 'next/navigation'
import { getMonth } from 'date-fns'
import {
  PieChartDataTemplate,
  BalancesTemplate,
  SummaryCategoriesDataTemplate,
  ReportAiTemplate,
  LastTransactionsTemplate,
} from '@/modules/dashboard/template'
import { getLastTransactions } from '@/modules/dashboard/actions'

export default async function DashboardPage({
  searchParams,
}: PageWithSearchParams) {
  const params = new URLSearchParams(searchParams)

  if (!params.has('month')) {
    redirect(`?month=${getMonth(new Date()) + 2}`)
  }
  const month = params.get('month') as string

  const transactions = await getLastTransactions()

  return (
    <>
      <section className="flex flex-col text-primary-regular">
        <FilterController />
        <div className="flex gap-4 px-6 pb-4">
          <div className="grid w-full grid-cols-9 gap-4">
            <BalancesTemplate
              month={month}
              className="col-span-4 h-full max-h-96 rounded-md border-none bg-neutral-dark text-neutral-white"
            />
            <ReportAiTemplate className="col-span-2 h-full max-h-96 border-none bg-neutral-dark p-4 text-neutral-white" />
            <LastTransactionsTemplate
              transactions={transactions}
              className="col-span-3 h-full max-h-96 border-none bg-neutral-dark p-4 text-neutral-white"
            />
            <PieChartDataTemplate
              month={month}
              className="col-span-7 border-none bg-neutral-dark text-neutral-white"
            />
            <SummaryCategoriesDataTemplate
              month={month}
              className="col-span-2 border-none bg-neutral-dark text-neutral-white"
            />
          </div>
        </div>
      </section>
    </>
  )
}
