import {
  getSummaryIncomes,
  getSummaryExpenses,
  getSummaryInvestments,
  getSummaryBalance,
} from '@/modules/dashboard/services/getSummaryTransactionType'
import { Balances } from '../components/Balances'

type SummaryDataFormProps = {
  month: string
  className?: string
}

export const SummaryDataForm = async ({
  month,
  className,
}: SummaryDataFormProps) => {
  const summaryIncomes = await getSummaryIncomes(month)
  const summaryExpenses = await getSummaryExpenses(month)
  const summaryInvested = await getSummaryInvestments(month)
  const summaryBalance = await getSummaryBalance(month)

  return (
    <Balances
      className={className}
      summaryIncomes={summaryIncomes}
      summaryExpenses={summaryExpenses}
      summaryInvested={summaryInvested}
      summaryBalance={summaryBalance}
    />
  )
}
