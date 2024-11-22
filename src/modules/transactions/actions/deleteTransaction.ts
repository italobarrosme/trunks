'use server'

import { db } from 'prisma/prisma'

import { revalidatePath } from 'next/cache'
import { DeleteTransactionFormSchema } from '../forms/DeleteTransactionForm/schemas/DeleteTransactionFormSchema'
import { getUser } from '@/modules/auth/actions'

export const deleteTransaction = async (
  params: DeleteTransactionFormSchema
) => {
  const { userId } = getUser()

  if (!userId) {
    throw new Error('Usuário não autenticado')
  }

  try {
    const response = await db.transaction.delete({
      where: {
        userId,
        id: params.id,
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
