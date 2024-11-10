import {
  getSummaryIncomes,
  getSummaryExpenses,
  getSummaryInvestments,
  getSummaryTotal,
} from '@/modules/dashboard/services/getSummaryTransactionType'
import { Balances } from '../components/Balances'

type SummaryDataFormProps = {
  month: string
}

export const SummaryDataForm = async ({ month }: SummaryDataFormProps) => {
  const summaryIncomes = await getSummaryIncomes(month)
  const summaryExpenses = await getSummaryExpenses(month)
  const summaryInvested = await getSummaryInvestments(month)
  const summaryBalance = await getSummaryTotal(month)

  return (
    <Balances
      className="w-full"
      summaryIncomes={summaryIncomes}
      summaryExpenses={summaryExpenses}
      summaryInvested={summaryInvested}
      summaryBalance={summaryBalance}
    />
  )
}
