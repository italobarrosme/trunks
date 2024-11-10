import { formatCurrency } from '@/modules/transactions/functions'
import { cn } from '@/utils'
import { Card } from '@developerskyi/react-components'
import React from 'react'

export type BoxSummaryValueProps = {
  value: number
  title: string
  icon: React.ReactNode
  trigger?: React.ReactNode
  className?: string
}

export const BoxSummaryValue = ({
  value,
  title,
  icon,
  trigger,
  className,
}: BoxSummaryValueProps) => {
  return (
    <Card className={cn('bg-neutral-dark border-none shadow-lg', className)}>
      <div className="flex h-full items-end justify-between">
        <div className="flex h-full items-center">
          <div className="mr-3 p-2">{icon}</div>
          <div>
            <p className="text-sm text-neutral-light">{title}</p>
            <p className="text-2xl font-bold">
              {formatCurrency(Number(value))}
            </p>
          </div>
        </div>
        {trigger}
      </div>
    </Card>
  )
}
