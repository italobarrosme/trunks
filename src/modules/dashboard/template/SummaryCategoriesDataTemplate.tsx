import { TransactionType } from '@prisma/client'
import { LineSummaryValue } from '../components/LineSummaryValue'
import { getSummaryTransactionCategories } from '../services/getSummaryTransactionCategories'
import { Card, Divider, Text } from '@developerskyi/react-components'
import { cn } from '@/utils'
import { formatEnumText } from '@/modules/transactions/functions'
import { TRANSACTION_CATEGORY_TRANSLATION } from '@/modules/transactions/constants'

type SummaryCategoriesDataTemplateProps = {
  month: string
  className?: string
}

export const SummaryCategoriesDataTemplate = async ({
  month,
  className,
}: SummaryCategoriesDataTemplateProps) => {
  const summaryCategoriesExpenses = await getSummaryTransactionCategories(
    month,
    TransactionType.EXPENSE
  )

  return (
    <Card
      className={cn('flex flex-col gap-4 min-h-[516px] h-[516px]', className)}
    >
      <Text>Gastos por categoria</Text>
      <Divider className="bg-neutral-shadow" />
      {/* !TODO ADD TABS */}
      {!summaryCategoriesExpenses.data.length && (
        <div className="flex h-96 flex-col justify-center gap-4 overflow-y-auto px-6">
          <Text
            variant="lg/semibold"
            className="bg-feedback-warning/55 p-2 text-center"
          >
            Sem dados para exibir
          </Text>
        </div>
      )}
      <div className="flex flex-col gap-4 overflow-y-auto px-6">
        {!!summaryCategoriesExpenses.data.length &&
          summaryCategoriesExpenses.data.map((item) => (
            <LineSummaryValue
              key={item.category}
              title={formatEnumText(
                TRANSACTION_CATEGORY_TRANSLATION,
                item.category
              )}
              valueMoney={Number(item.amount)}
              progress={item.percentage}
            />
          ))}
      </div>
    </Card>
  )
}
