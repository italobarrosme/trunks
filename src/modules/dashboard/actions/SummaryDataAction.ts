import { TransactionType } from '@prisma/client'
import {
  getSummaryBalance,
  getSummaryTransactionType,
} from '../services/getSummaryTransactionType'

export const SummaryDataAction = async (month: string) => {
  const summaryBalance = await getSummaryBalance(month)

  const summaryIncomes = await getSummaryTransactionType({
    type: TransactionType.INCOME,
    month,
  })
  const summaryExpenses = await getSummaryTransactionType({
    type: TransactionType.EXPENSE,
    month,
  })

  const summaryInvested = await getSummaryTransactionType({
    type: TransactionType.INVESTMENT,
    month,
  })

  return {
    summaryIncomes: summaryIncomes || 0,
    summaryExpenses: summaryExpenses || 0,
    summaryInvested: summaryInvested || 0,
    summaryBalance: summaryBalance || 0,
  }
}
