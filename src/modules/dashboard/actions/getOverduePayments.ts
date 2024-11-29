import { getUser } from '@/modules/auth/actions'
import { revalidatePath } from 'next/cache'
import { db } from 'prisma/prisma'

export const getOverduePayments = async () => {
  const { userId } = getUser()

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
        datePayment: {
          lte: new Date(),
        },
      },
      orderBy: { datePayment: 'asc' },
    })

    return transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
      datePayment: transaction.datePayment.toString(),
    }))
  } catch (error) {
    console.error('Error fetching overdue payments:', error)
    throw error
  } finally {
    revalidatePath('/dashboard')
  }
}
