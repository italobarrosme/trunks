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
  const summaryTotal = await db.transaction.aggregate({
    where: {
      type,
      date: {
        gte: new Date(`${month}-01`),
        lt: new Date(`${month}-31`),
      },
    },
    _sum: {
      amount: true,
    },
  })

  return summaryTotal
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

export const getSummaryTotal = async (month: string) => {
  const summaryIncomes = await getSummaryIncomes(month)
  const summaryExpenses = await getSummaryExpenses(month)

  return {
    incomes: Number(summaryIncomes._sum.amount) || 0,
    expenses: Number(summaryExpenses._sum.amount) || 0,
    total:
      (Number(summaryIncomes._sum.amount) || 0) -
      (Number(summaryExpenses._sum.amount) || 0),
  }
}
