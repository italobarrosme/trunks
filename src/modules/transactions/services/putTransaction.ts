'use server'

import { db } from 'prisma/prisma'
import { auth } from '@clerk/nextjs/server'
import { formatCurrencyStrigToDecimal } from '../functions'
import { HandleTransactionFormSchema } from '../forms/HandleTransactionForm/schemas/HandleTransactionFormSchema'
import { revalidatePath } from 'next/cache'
import { parse } from 'date-fns'

export const putTransaction = async (params: HandleTransactionFormSchema) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Usuário não autenticado')
  }

  const payload = {
    ...params,
    amount: formatCurrencyStrigToDecimal(params.amount),
    date: parse(params.date, 'dd/MM/yyyy', new Date()),
    userId,
  }

  if (params.id) {
    try {
      const response = await db.transaction.update({
        where: {
          id: params.id,
        },
        data: {
          ...payload,
        },
      })

      return {
        ...response,
        amount: Number(response.amount),
        date: response.date.toISOString(),
      }
    } catch (err) {
      return err
    } finally {
      revalidatePath('/transactions')
    }
  } else {
    try {
      const response = await db.transaction.create({
        data: {
          ...payload,
        },
      })

      return {
        ...response,
        amount: Number(response.amount),
        date: response.date.toISOString(),
      }
    } catch (err) {
      return err
    } finally {
      revalidatePath('/transactions')
    }
  }
}
