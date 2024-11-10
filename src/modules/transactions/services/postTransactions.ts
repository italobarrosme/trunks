'use server'

import { Prisma } from '@prisma/client'
import { db } from 'prisma/prisma'

export const postTransactions = async (
  params: Prisma.TransactionCreateInput
) => {
  await db.transaction.create({
    data: params,
  })
}
