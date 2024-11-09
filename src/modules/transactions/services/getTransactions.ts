import { db } from 'prisma/prisma'

export const getTransactions = async () => {
  try {
    const transactions = await db.transaction.findMany({})
    return transactions
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}
