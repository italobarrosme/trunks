'use server'

import { db } from 'prisma/prisma'
import { formatCurrencyStrigToDecimal } from '../functions'
import { HandleTransactionFormSchema } from '../forms/HandleTransactionForm/schemas/HandleTransactionFormSchema'
import { revalidatePath } from 'next/cache'
import { parse } from 'date-fns'
import { getUser } from '@/modules/auth/actions'

export const putTransaction = async (params: HandleTransactionFormSchema) => {
  const { userId } = getUser()

  if (!userId) {
    throw new Error('Usuário não autenticado')
  }

  const payload = {
    ...params,
    amount: formatCurrencyStrigToDecimal(params.amount),
    datePayment: parse(params.datePayment, 'dd/MM/yyyy', new Date()),
    userId,
  }

  if (params.id) {
    try {
      const response = await db.transaction.update({
        where: {
          userId,
          id: params.id,
        },
        data: {
          ...payload,
        },
      })

      return {
        ...response,
        amount: Number(response.amount),
        datePayment: response.datePayment.toISOString(),
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
        datePayment: response.datePayment.toISOString(),
      }
    } catch (err) {
      return err
    } finally {
      revalidatePath('/transactions')
    }
  }
}
