import { ChartConfig } from '@/modules/shared/components/Charts'
import { PieCharts } from '../components/PieCharts'
import { BoxSummaryValue } from '../components/BoxSummaryValue'
import { Icon } from '@iconify/react'
import { Card, Text } from '@developerskyi/react-components'
import { cn } from '@/utils'
import { getSummaryData } from '../actions'

type PieChartDataFormProps = {
  className?: string
  month: string
}

export const PieChartDataTemplate = async ({
  className,
  month,
}: PieChartDataFormProps) => {
  const { summaryIncomes, summaryExpenses, summaryInvested } =
    await getSummaryData(month)

  const summaryTotal = summaryIncomes + summaryExpenses + summaryInvested

  const chartData = [
    {
      type: 'expenses',
      amount: Math.round((Number(summaryExpenses) / summaryTotal) * 100) || 0,
      fill: 'hsl(var(--color-feedback-error))',
    },
    {
      type: 'incomes',
      amount: Math.round((Number(summaryIncomes) / summaryTotal) * 100) || 0,
      fill: 'hsl(var(--color-feedback-success))',
    },
    {
      type: 'investments',
      amount: Math.round((Number(summaryInvested) / summaryTotal) * 100) || 0,
      fill: 'hsl(var(--color-feedback-info))',
    },
  ]

  const chartConfig = {
    expenses: {
      label: 'Despesa',
      color: 'hsl(var(--color-feedback-error))',
    },
    incomes: {
      label: 'Receita',
      color: 'hsl(var(--color-feedback-success))',
    },
    investments: {
      label: 'Investido',
      color: 'hsl(var(--color-feedback-info))',
    },
  } satisfies ChartConfig

  const verifyData = chartData.every((item) => item.amount === 0)

  if (verifyData) {
    return (
      <Card
        className={cn(
          'min-h-[516px] flex justify-center items-center',
          className
        )}
      >
        <Text
          variant="lg/semibold"
          className="bg-feedback-warning/55 p-2 text-center"
        >
          Sem dados para exibir
        </Text>
      </Card>
    )
  }

  return (
    <PieCharts
      title={`Gráfico de alocação de recursos no mês ${month}`}
      description={'Recursos por tipo de transação'}
      className={className}
      chartData={chartData}
      chartConfig={chartConfig}
    >
      <BoxSummaryValue
        title="Investido"
        valuePercent={chartData[2].amount}
        icon={
          <Icon
            icon={'lucide:chart-line'}
            width="36"
            className="rounded-md bg-feedback-info/10 p-2 text-feedback-info"
          />
        }
        className=" w-fit text-neutral-white shadow-inherit"
      />
      <BoxSummaryValue
        title="Receita"
        valuePercent={chartData[1].amount}
        icon={
          <Icon
            icon={'lucide:trending-up'}
            width="36"
            className="rounded-md bg-feedback-success/10 p-2 text-feedback-success"
          />
        }
        className=" w-fit text-neutral-white shadow-inherit"
      />
      <BoxSummaryValue
        title="Despesas"
        valuePercent={chartData[0].amount}
        icon={
          <Icon
            icon={'lucide:trending-down'}
            width="36"
            className="rounded-md bg-feedback-error/10 p-2 text-feedback-error"
          />
        }
        className=" w-fit text-neutral-white shadow-inherit"
      />
    </PieCharts>
  )
}
