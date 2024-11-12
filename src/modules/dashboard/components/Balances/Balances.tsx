import { cn } from '@/utils'
import { BoxSummaryValue } from '../BoxSummaryValue'
import { HandleTransactionForm } from '@/modules/transactions/forms'
import { Button } from '@developerskyi/react-components'
import { Icon } from '@iconify/react'
import { setIconTransactionType } from '@/modules/transactions/functions/setIconTransactionType'
import { TransactionType } from '@prisma/client'

type BalancesProps = {
  className?: string
  summaryIncomes: any
  summaryExpenses: any
  summaryInvested: any
  summaryBalance: any
}

export const Balances = ({
  summaryIncomes,
  summaryExpenses,
  summaryInvested,
  summaryBalance,
  className,
}: BalancesProps) => {
  return (
    <div className={cn('grid grid-cols-3 gap-4 max-h-80', className)}>
      <BoxSummaryValue
        title="Saldo"
        valueMoney={summaryBalance}
        icon={
          <Icon
            icon={'lucide:wallet'}
            width="36"
            className="rounded-md bg-neutral-shadow p-2 text-neutral-white"
          />
        }
        className="col-span-3 text-neutral-white"
        trigger={
          <HandleTransactionForm
            trigger={
              <Button variant="fit/regular">
                <Icon icon={'lucide:plus'} /> Adicionar Transação
              </Button>
            }
          />
        }
      />
      <BoxSummaryValue
        title="Investido"
        valueMoney={summaryInvested}
        icon={
          <Icon
            icon={setIconTransactionType(TransactionType.INVESTMENT).text}
            width="36"
            className="rounded-md bg-feedback-info/10 p-2 text-feedback-info"
          />
        }
        className="text-neutral-white"
      />
      <BoxSummaryValue
        title="Receita"
        valueMoney={summaryIncomes}
        icon={
          <Icon
            icon={setIconTransactionType(TransactionType.INCOME).text}
            width="36"
            className="rounded-md bg-feedback-success/10 p-2 text-feedback-success"
          />
        }
        className=" text-neutral-white"
      />
      <BoxSummaryValue
        title="Despesas"
        valueMoney={summaryExpenses}
        icon={
          <Icon
            icon={setIconTransactionType(TransactionType.EXPENSE).text}
            width="36"
            className="rounded-md bg-feedback-error/10 p-2 text-feedback-error"
          />
        }
        className=" text-neutral-white"
      />
    </div>
  )
}
