'use client'

import * as React from 'react'
import { Pie, PieChart, Sector } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/modules/shared/components/Charts'
import { Card, CardHeader, Text } from '@developerskyi/react-components'
import { CardContent, CardFooter } from '@developerskyi/react-components'
// import { Icon } from '@iconify/react'
import { cn } from '@/utils'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

type chartDataProps = {
  type: string
  amount: number
  fill: string
}

export type PieChartsProps = {
  chartData: chartDataProps[]
  chartConfig: ChartConfig
  className?: string
  description?: string
  title?: string
  children?: React.ReactNode
}

export const PieCharts = ({
  title,
  description,
  chartData,
  chartConfig,
  className,
  children,
}: PieChartsProps) => {
  // const totalVisitors = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  // }, [])

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        <Text variant="lg/semibold">{title}</Text>
        <Text variant="sm/medium" className="text-neutral-light">
          {description}
        </Text>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector
                  {...props}
                  outerRadius={outerRadius + 10}
                  className="cursor-pointer duration-700"
                />
              )}
            >
              {/* <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-primary-foreground text-3xl font-bold"
                        >
                          100%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-primary-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              /> */}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-wrap gap-2 text-sm">{children}</CardFooter>
    </Card>
  )
}
