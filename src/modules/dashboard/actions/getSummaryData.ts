import { TransactionType } from '@prisma/client'
import {
  getSummaryBalance,
  getSummaryTransactionType,
} from './getSummaryTransactionType'

export const getSummaryData = async (month: string, year: string) => {
  const summaryBalance = await getSummaryBalance(month, year)

  const summaryIncomes = await getSummaryTransactionType({
    type: TransactionType.INCOME,
    month,
    year,
  })
  const summaryExpenses = await getSummaryTransactionType({
    type: TransactionType.EXPENSE,
    month,
    year,
  })

  const summaryInvested = await getSummaryTransactionType({
    type: TransactionType.INVESTMENT,
    month,
    year,
  })

  return {
    summaryIncomes: summaryIncomes || 0,
    summaryExpenses: summaryExpenses || 0,
    summaryInvested: summaryInvested || 0,
    summaryBalance: summaryBalance || 0,
  }
}
