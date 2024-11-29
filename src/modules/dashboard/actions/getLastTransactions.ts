import { setIconTransactionType } from '@/modules/transactions/functions/setIconTransactionType'
import { TransactionType } from '@prisma/client'
import { getUser } from '@/modules/auth/actions'
import { db } from 'prisma/prisma'

export const getLastTransactions = async () => {
  const { userId } = getUser()

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      take: 20,
      orderBy: { datePayment: 'desc' },
    })

    return transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
      datePayment: transaction.datePayment.toString(),
      valueMoney: Number(transaction.amount),
      type: transaction.type as TransactionType,
      name: transaction.name,
      icon: setIconTransactionType(transaction.type),
    }))
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}
