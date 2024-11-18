import { getUser } from '@/modules/auth/services'
import { revalidatePath } from 'next/cache'
import { db } from 'prisma/prisma'

type GetTransactionParams = {
  quantity: number
}

export const getTransactions = async ({ quantity }: GetTransactionParams) => {
  const { userId } = getUser()

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      take: quantity,
      orderBy: { date: 'desc' },
    })

    return transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
      date: transaction.date,
    }))
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  } finally {
    revalidatePath('/transactions')
  }
}
