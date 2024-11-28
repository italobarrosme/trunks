import { getUser } from '@/modules/auth/actions'
import { revalidatePath } from 'next/cache'
import { db } from 'prisma/prisma'
// import { Transaction } from '@prisma/client'

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
      date: transaction.date.toString(),
    }))
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  } finally {
    revalidatePath('/transactions')
  }
}
