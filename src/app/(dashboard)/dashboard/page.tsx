import { FilterController } from '@/modules/dashboard/components/FilterController'
import { PageWithSearchParams } from '@/modules/shared/types/types'
import {
  PieChartDataTemplate,
  BalancesTemplate,
  SummaryCategoriesDataTemplate,
  ReportAiTemplate,
  LastTransactionsTemplate,
} from '@/modules/dashboard/template'
import { getLastTransactions } from '@/modules/dashboard/actions'
import { Suspense } from 'react'
import { Skeleton } from '@developerskyi/react-components'
import { formatSearchParamsDate } from '@/utils/formatSearchParamsDate'

export default async function DashboardPage({
  searchParams,
}: PageWithSearchParams) {
  const params = new URLSearchParams(searchParams)

  formatSearchParamsDate(params.toString())

  const month = params.get('month') as string
  const year = params.get('year') as string

  const transactions = await getLastTransactions()

  return (
    <>
      <section className="flex flex-col text-primary-regular">
        <FilterController />
        <div className="flex gap-4 px-6 pb-4">
          <div className="grid w-full grid-cols-9 gap-4">
            <Suspense
              fallback={
                <Skeleton
                  animationDuration={1.5}
                  className="col-span-4 max-h-96 min-h-96 rounded-md border-none bg-neutral-dark text-neutral-white"
                />
              }
            >
              <BalancesTemplate
                month={month}
                year={year}
                className="col-span-4 max-h-96 min-h-96 rounded-md border-none bg-neutral-dark text-neutral-white"
              />
            </Suspense>
            <Suspense
              fallback={
                <Skeleton
                  animationDuration={1.5}
                  className="col-span-2 max-h-96 min-h-96 border-none bg-neutral-dark p-4 text-neutral-white"
                />
              }
            >
              <ReportAiTemplate className="col-span-2 max-h-96 min-h-96 border-none bg-neutral-dark p-4 text-neutral-white" />
            </Suspense>
            <Suspense
              fallback={
                <Skeleton
                  animationDuration={1.5}
                  className="col-span-3 max-h-96 min-h-96 border-none bg-neutral-dark p-4 text-neutral-white"
                />
              }
            >
              <LastTransactionsTemplate
                transactions={transactions}
                className="col-span-3 max-h-96 min-h-96 border-none bg-neutral-dark p-4 text-neutral-white"
              />
            </Suspense>
            <Suspense
              fallback={
                <Skeleton
                  animationDuration={1.5}
                  className="col-span-7 min-h-96 border-none bg-neutral-dark text-neutral-white"
                />
              }
            >
              <PieChartDataTemplate
                month={month}
                year={year}
                className="col-span-7 min-h-96 border-none bg-neutral-dark text-neutral-white"
              />
            </Suspense>
            <Suspense
              fallback={
                <Skeleton
                  animationDuration={1.5}
                  className="col-span-2 min-h-96 border-none bg-neutral-dark text-neutral-white"
                />
              }
            >
              <SummaryCategoriesDataTemplate
                month={month}
                year={year}
                className="col-span-2 min-h-96 border-none bg-neutral-dark text-neutral-white"
              />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
