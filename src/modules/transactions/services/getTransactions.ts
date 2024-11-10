import { db } from 'prisma/prisma'

export const getTransactions = async () => {
  try {
    const transactions = await db.transaction.findMany({})

    return transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
      date: transaction.date.toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}
