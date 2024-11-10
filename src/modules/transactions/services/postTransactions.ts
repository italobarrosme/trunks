'use server'

import { db } from 'prisma/prisma'
import { auth } from '@clerk/nextjs/server'
import { formatCurrencyStrigToDecimal } from '../functions'
import { AddTransactionSchema } from '../forms/AddTransactionForm/schemas/AddTransactionSchema'
import { revalidatePath } from 'next/cache'

export const postTransactions = async (params: AddTransactionSchema) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Usuário não autenticado')
  }

  const payload = {
    ...params,
    amount: formatCurrencyStrigToDecimal(params.amount),
    date: new Date(params.date),
    userId,
  }

  try {
    const response = await db.transaction.create({
      data: {
        ...payload,
      },
    })

    return response
  } catch (err) {
    return err
  } finally {
    revalidatePath('/transactions')
  }
}
