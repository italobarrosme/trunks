'use client'

import { cn } from '@/utils'
import { Card, Divider, Text } from '@developerskyi/react-components'
import { LastTransactions } from '../components/LastTransactions'

type LastTransactionsTemplateProps = {
  className?: string
  transactions: any
}
export const LastTransactionsTemplate = ({
  className,
  transactions,
}: LastTransactionsTemplateProps) => {
  return (
    <Card className={cn('flex flex-col gap-4', className)}>
      <Text variant="lg/medium">Últimas transações</Text>
      <Divider className="bg-neutral-shadow" />

      {transactions.length > 0 ? (
        <div className="flex max-h-96 flex-col justify-center overflow-y-auto px-2">
          <LastTransactions transactions={transactions} />
        </div>
      ) : (
        <div className="flex max-h-96 flex-col justify-center gap-4 overflow-y-auto px-6">
          <Text
            variant="lg/semibold"
            className="bg-feedback-warning/55 p-2 text-center"
          >
            Sem dados para exibir
          </Text>
        </div>
      )}
    </Card>
  )
}
