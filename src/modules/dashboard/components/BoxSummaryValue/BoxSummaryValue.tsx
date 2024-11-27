import { formatCurrency } from '@/modules/transactions/functions'
import { cn } from '@/utils'
import { Card } from '@developerskyi/react-components'
import React from 'react'

export type BoxSummaryValueProps = {
  valueMoney?: number
  valuePercent?: number
  title: string
  icon: React.ReactNode
  className?: string
  flagPercent?: boolean
}

export const BoxSummaryValue = ({
  valueMoney,
  valuePercent,
  flagPercent = false,
  title,
  icon,
  className,
}: BoxSummaryValueProps) => {
  return (
    <Card className={cn('bg-neutral-dark border-none shadow-lg', className)}>
      <div className="flex h-full items-start justify-between">
        <div className="flex h-full items-center">
          <div className="mr-3 p-2">{icon}</div>
          <div>
            <p className="text-sm text-neutral-light">{title}</p>
            <p className="text-xl font-bold text-inherit">
              {Number(valueMoney) >= 0
                ? formatCurrency(Number(valueMoney))
                : !flagPercent
                  ? `-${formatCurrency(Number(valueMoney) * -1)}`
                  : ''}
            </p>
            <p className="text-sm text-neutral-white">
              {flagPercent && `${valuePercent}%`}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
