import { formatCurrency, formatDate } from '@/modules/transactions/functions'
import { Text } from '@developerskyi/react-components'
import { Icon } from '@iconify/react'
import { TransactionType } from '@prisma/client'

type IconObject = {
  text: string
  color: string
}

type TransactionItem = {
  valueMoney: number
  type: TransactionType
  name: string
  date: Date
  icon?: IconObject
}

type LastTransactions = {
  transactions: TransactionItem[]
}

const LastTransactionItem = (transaction: TransactionItem) => {
  return (
    <div className="my-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {transaction.icon && (
          <Icon
            icon={transaction.icon.text}
            width={24}
            height={24}
            className={transaction.icon.color}
          />
        )}
        <div className="flex h-full flex-col">
          <Text variant="sm/normal">{transaction.name}</Text>
          <Text variant="xs/medium" className="text-neutral-light/40">
            {formatDate(transaction.date)}
          </Text>
        </div>
      </div>
      <Text
        variant="sm/medium"
        className={
          transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
        }
      >
        {transaction.type === 'INCOME' ? '+' : '-'}
        {formatCurrency(transaction.valueMoney)}
      </Text>
    </div>
  )
}

export const LastTransactions = ({ transactions }: LastTransactions) => {
  return (
    <div className="h-full">
      {transactions.map((transaction, index) => (
        <LastTransactionItem key={index} {...transaction} />
      ))}
    </div>
  )
}
