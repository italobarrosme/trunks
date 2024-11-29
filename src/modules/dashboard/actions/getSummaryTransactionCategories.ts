'use server'

import { TransactionCategory, TransactionType } from '@prisma/client'
import { db } from 'prisma/prisma'
import { getSummaryTransactionType } from './getSummaryTransactionType'
import { getUser } from '@/modules/auth/actions'

export const getSummaryTransactionCategories = async (
  month: string,
  type: TransactionType
) => {
  const { userId } = getUser()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const where = {
    userId,
    datePayment: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  }

  const totalSummary = await getSummaryTransactionType({
    type,
    month,
  })

  const group = await db.transaction.groupBy({
    by: ['category'],
    where: {
      ...where,
      type,
    },
    _sum: {
      amount: true,
    },
  })

  return {
    data: group.map((item) => ({
      category: item.category as TransactionCategory,
      amount: item._sum.amount,
      percentage: Math.round(
        (Number(item._sum.amount) / Number(totalSummary)) * 100
      ),
    })),
  }
}
