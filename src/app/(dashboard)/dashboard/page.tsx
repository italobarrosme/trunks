import { FilterController } from '@/modules/dashboard/components/FilterController'
import { PageWithSearchParams } from '@/modules/shared/types/types'
import { redirect } from 'next/navigation'
import { getMonth } from 'date-fns'
import {
  PieChartDataTemplate,
  BalancesTemplate,
  SummaryCategoriesDataTemplate,
  ReportAiTemplate,
} from '@/modules/dashboard/template'
import { Card } from '@developerskyi/react-components'
import { LastTransactions } from '@/modules/dashboard/components/LastTransactions'
import { getLastTransactions } from '@/modules/dashboard/actions'

export default async function DashboardPage({
  searchParams,
}: PageWithSearchParams) {
  const params = new URLSearchParams(searchParams)

  if (!params.has('month')) {
    redirect(`?month=${getMonth(new Date()) + 1}`)
  }
  const month = params.get('month') as string

  const transactions = await getLastTransactions()

  return (
    <>
      <section className="flex max-h-screen flex-col text-primary-regular">
        <FilterController />
        <div className="flex gap-4 px-6 pb-4">
          <div className="grid w-full grid-cols-3 gap-4">
            <BalancesTemplate
              month={month}
              className="col-span-2 max-h-svh rounded-md border-none bg-neutral-dark text-neutral-white"
            />
            <ReportAiTemplate className="col-span-1 max-h-svh border-none bg-neutral-dark p-4 text-neutral-white" />
            <PieChartDataTemplate
              month={month}
              className="col-span-2 max-h-svh border-none bg-neutral-dark text-neutral-white"
            />
            <SummaryCategoriesDataTemplate
              month={month}
              className="col-span-1 max-h-svh border-none bg-neutral-dark text-neutral-white"
            />
          </div>
          <div className="h-screen w-1/3">
            <div className="h-full rounded-lg">
              <Card className="h-screen border-none bg-neutral-dark text-neutral-white">
                <LastTransactions transactions={transactions} />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
