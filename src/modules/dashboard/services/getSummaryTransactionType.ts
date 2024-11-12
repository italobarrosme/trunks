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

export const getSummaryBalance = async (month: string) => {
  const summaryIncomes = await getSummaryTransactionType({
    type: TransactionType.INCOME,
    month,
  })
  const summaryExpenses = await getSummaryTransactionType({
    type: TransactionType.EXPENSE,
    month,
  })

  return summaryIncomes - summaryExpenses
}

export const getSummaryTotalTransactions = async (month: string) => {
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

  return summaryIncomes + summaryExpenses + summaryInvested
}
