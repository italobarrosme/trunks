import { getMonth } from 'date-fns'
import { redirect } from 'next/navigation'

export const formatSearchParamsDate = (searchParams: string) => {
  const params = new URLSearchParams(searchParams)

  if (params.has('month') && Number(params.get('month')) === 13) {
    redirect(`?month=01&year=${new Date().getFullYear() + 1}`)
  }

  if (!params.has('month') && !params.has('year')) {
    redirect(
      `?month=${getMonth(new Date()) + 2}&year=${new Date().getFullYear() + 1}`
    )
  }

  return searchParams
}
