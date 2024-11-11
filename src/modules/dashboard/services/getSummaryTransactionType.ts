'use server'

import { TransactionType } from '@prisma/client'
import { db } from 'prisma/prisma'

export type SummaryTransactionTypeParams = {
  type: TransactionType
  month: string
}

export const getSummaryTransactionType = async ({
  type,
  month,
}: SummaryTransactionTypeParams) => {
  const summaryResult = await db.transaction.aggregate({
    where: {
      type,
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
    _sum: {
      amount: true,
    },
  })

  return Number(summaryResult._sum.amount) || 0
}

export const getSummaryIncomes = async (month: string) => {
  return getSummaryTransactionType({ type: TransactionType.INCOME, month })
}

export const getSummaryExpenses = async (month: string) => {
  return getSummaryTransactionType({ type: TransactionType.EXPENSE, month })
}

export const getSummaryInvestments = async (month: string) => {
  return getSummaryTransactionType({ type: TransactionType.INVESTMENT, month })
}

export const getSummaryBalance = async (month: string) => {
  const summaryIncomes = await getSummaryIncomes(month)
  const summaryExpenses = await getSummaryExpenses(month)

  return summaryIncomes - summaryExpenses
}

export const getSummaryTotalTransactions = async (month: string) => {
  const summaryIncomes = await getSummaryIncomes(month)
  const summaryExpenses = await getSummaryExpenses(month)
  const summaryInvested = await getSummaryInvestments(month)

  return summaryIncomes + summaryExpenses + summaryInvested
}
