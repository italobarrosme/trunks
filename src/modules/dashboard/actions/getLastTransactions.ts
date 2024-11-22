import { setIconTransactionType } from '@/modules/transactions/functions/setIconTransactionType'
import { getTransactions } from '@/modules/transactions/actions'
import { TransactionType } from '@prisma/client'

export const getLastTransactions = async () => {
  const response = await getTransactions({ quantity: 10 })

  const transactions = response.map((transaction) => ({
    valueMoney: transaction.amount,
    type: transaction.type as TransactionType,
    name: transaction.name,
    date: transaction.date,
    icon: setIconTransactionType(transaction.type),
  }))

  return transactions
}
