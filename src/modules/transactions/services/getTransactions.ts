import { db } from 'prisma/prisma'

type GetTransactionParams = {
  quantity: number
}

export const getTransactions = async ({ quantity }: GetTransactionParams) => {
  try {
    const transactions = await db.transaction.findMany({
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
  }
}
