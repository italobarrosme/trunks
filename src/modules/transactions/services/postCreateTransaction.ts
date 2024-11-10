'use server'

import { db } from 'prisma/prisma'
import { auth } from '@clerk/nextjs/server'
import { formatCurrencyStrigToDecimal } from '../functions'
import { HandleTransactionFormSchema } from '../forms/HandleTransactionForm/schemas/HandleTransactionFormSchema'
import { revalidatePath } from 'next/cache'
import { parse } from 'date-fns'

export const postCreateTransaction = async (
  params: HandleTransactionFormSchema
) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Usuário não autenticado')
  }

  console.log('params', params.date)

  const payload = {
    ...params,
    amount: formatCurrencyStrigToDecimal(params.amount),
    date: parse(params.date, 'dd/MM/yyyy', new Date()),
    userId,
  }

  console.log('payload', payload)

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
