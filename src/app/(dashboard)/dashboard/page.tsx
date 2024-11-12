import { FilterController } from '@/modules/dashboard/components/FilterController'
import { PageWithSearchParams } from '@/modules/shared/types/types'
import { redirect } from 'next/navigation'
import { getMonth } from 'date-fns'
import { SummaryDataForm } from '@/modules/dashboard/forms/SummaryDataForm'
import { PieChartDataForm } from '@/modules/dashboard/forms/PieChartDataForm'
import { SummaryCategoriesDataForm } from '@/modules/dashboard/forms/SummaryCategoriesDataForm'
import { LastTransactionForm } from '@/modules/dashboard/forms/LastTransactionForm'

export default async function DashboardPage({
  searchParams,
}: PageWithSearchParams) {
  const params = new URLSearchParams(searchParams)

  if (!params.has('month')) {
    redirect(`?month=${getMonth(new Date()) + 1}`)
  }

  const month = params.get('month') as string

  return (
    <>
      <section className="flex flex-col text-primary-regular">
        <FilterController />
        <div className="flex gap-4 px-6">
          <div className="grid w-full grid-cols-3 gap-4">
            <SummaryDataForm month={month} className="col-span-3" />
            <PieChartDataForm
              month={month}
              className="col-span-2 h-fit border-none bg-neutral-dark text-neutral-white"
            />
            <SummaryCategoriesDataForm
              month={month}
              className="col-span-1 h-fit border-none bg-neutral-dark text-neutral-white"
            />
          </div>
          <div className="h-screen w-1/3">
            <div className="h-full rounded-lg">
              <LastTransactionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
