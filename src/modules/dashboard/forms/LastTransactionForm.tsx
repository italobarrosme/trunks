import { getTransactions } from '@/modules/transactions/services'
import { LastTransactions } from '../components/LastTransactions'
import { TransactionType } from '@prisma/client'
import { Card } from '@developerskyi/react-components'
import { setIconTransactionType } from '@/modules/transactions/functions/setIconTransactionType'

export const LastTransactionForm = async () => {
  const response = await getTransactions({ quantity: 10 })

  const transactions = response.map((transaction) => ({
    valueMoney: transaction.amount,
    type: transaction.type as TransactionType,
    name: transaction.name,
    date: transaction.date,
    icon: setIconTransactionType(transaction.type),
  }))

  return (
    <Card className="h-[833px] border-none bg-neutral-dark text-neutral-white">
      <LastTransactions transactions={transactions} />
    </Card>
  )
}
