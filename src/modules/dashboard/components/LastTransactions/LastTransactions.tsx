import { formatCurrency, formatDate } from '@/modules/transactions/functions'
import { Divider, Text } from '@developerskyi/react-components'
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
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {transaction.icon && (
          <Icon
            icon={transaction.icon.text}
            width={24}
            height={24}
            className={transaction.icon.color}
          />
        )}
        <div className="flex flex-col">
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
  if (!transactions.length) {
    return (
      <div className="flex flex-col gap-4">
        <Text variant="lg/medium">Últimas transações</Text>
        <Divider className="bg-neutral-shadow" />
        <Text
          variant="lg/semibold"
          className="bg-feedback-warning/55 p-2 text-center"
        >
          Sem dados para exibir
        </Text>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Text variant="lg/medium">Últimas transações</Text>
      <Divider className="bg-neutral-shadow" />
      <div className="flex flex-col gap-2">
        {transactions.map((transaction, index) => (
          <LastTransactionItem key={index} {...transaction} />
        ))}
      </div>
    </div>
  )
}
