'use server'

import { db } from 'prisma/prisma'
import { auth } from '@clerk/nextjs/server'

import { revalidatePath } from 'next/cache'
import { DeleteTransactionFormSchema } from '../forms/DeleteTransactionForm/schemas/DeleteTransactionFormSchema'

export const deleteTransaction = async (
  params: DeleteTransactionFormSchema
) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Usuário não autenticado')
  }

  try {
    const response = await db.transaction.delete({
      where: {
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
