import { FilterController } from '@/modules/dashboard/components/FilterController'
import { PageWithSearchParams } from '@/modules/shared/types/types'
import { redirect } from 'next/navigation'
import { getMonth } from 'date-fns'
import { SummaryDataForm } from '@/modules/dashboard/forms/SummaryDataForm'

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
        <div className="flex gap-6 px-6">
          <SummaryDataForm month={month} />
          <div className="h-screen w-1/2">
            <div className="h-full rounded-lg bg-neutral-dark shadow-lg"></div>
          </div>
        </div>
      </section>
    </>
  )
}
