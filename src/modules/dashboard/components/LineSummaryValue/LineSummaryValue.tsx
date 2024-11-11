import { formatCurrency } from '@/modules/transactions/functions'
import { ProgressBar, Text } from '@developerskyi/react-components'

type LineSummaryValueProps = {
  title: string
  valueMoney: number
  progress: number
}

export const LineSummaryValue = ({
  title,
  valueMoney,
  progress,
}: LineSummaryValueProps) => {
  return (
    <div>
      <Text variant="sm/medium" className="text-neutral-white">
        {title}
      </Text>
      <ProgressBar variant="success" progress={progress} displayPercentage />
      <Text variant="sm/medium" className="text-neutral-light">
        {formatCurrency(valueMoney)}
      </Text>
    </div>
  )
}
