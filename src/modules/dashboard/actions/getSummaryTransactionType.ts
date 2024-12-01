'use server'

import { getUser } from '@/modules/auth/actions'
import { TransactionType } from '@prisma/client'
import { db } from 'prisma/prisma'

export type SummaryTransactionTypeParams = {
  type: TransactionType
  month: string
  year: string
}

export const getSummaryTransactionType = async ({
  type,
  month,
  year,
}: SummaryTransactionTypeParams) => {
  const { userId } = getUser()

  const summaryResult = await db.transaction.aggregate({
    where: {
      userId,
      type,
      datePayment: {
        gte: new Date(`${year}-${month}-01`),
      },
    },
    _sum: {
      amount: true,
    },
  })

  return Number(summaryResult._sum.amount) || 0
}

export const getSummaryBalance = async (month: string, year: string) => {
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

  return summaryIncomes - summaryExpenses
}

export const getSummaryTotalTransactions = async (
  month: string,
  year: string
) => {
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

  return summaryIncomes + summaryExpenses + summaryInvested
}
