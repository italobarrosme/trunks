import { getUser } from '@/modules/auth/actions'
import { Transaction } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { db } from 'prisma/prisma'

type GetTransactionParams = {
  quantity: number
}

export type GetTransactionResponse = Array<
  Omit<Transaction, 'amount' | 'datePayment'> & {
    amount: number
    datePayment: string
  }
>

export const getTransactions = async ({
  quantity,
}: GetTransactionParams): Promise<GetTransactionResponse> => {
  const { userId } = getUser()

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      take: quantity,
      orderBy: { datePayment: 'desc' },
    })

    return transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
      datePayment: transaction.datePayment.toString(),
    }))
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  } finally {
    revalidatePath('/transactions')
  }
}
