'use client'
import { formatCurrency } from '@/modules/transactions/functions'
import {
  Card,
  CardFooter,
  Button,
  Text,
  Chip,
} from '@developerskyi/react-components'
import { Icon } from '@iconify/react'

type Benefits = {
  title: string
  description?: string
  available: boolean
}

type Plan = {
  title: string
  currentPlan: boolean
  price: number
  benefits: Benefits[]
  onClick?: () => void
}

type PlanCardProps = {
  plan: Plan
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const buttonPlanLabel = plan.currentPlan ? '' : 'Fazer Upgrade'

  return (
    <Card className="w-fit min-w-80 border-none bg-neutral-dark p-6 text-neutral-white">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex h-5 w-full justify-end">
          {plan.currentPlan && (
            <Chip
              value="Atual"
              variant="fit/regular"
              className="h-8 bg-primary-regular/90"
            />
          )}
        </div>
        <Text variant="2xl/bold">{plan.title}</Text>
        <Text variant="md/normal">{plan.currentPlan}</Text>
        <Text className="text-center text-5xl font-bold tracking-tighter">
          {formatCurrency(plan.price)}
          <span className="text-3xl text-neutral-light">/mês</span>
        </Text>
        <div className="flex flex-col gap-2 border-t-2 border-neutral-shadow p-6">
          {plan.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon
                icon={benefit.available ? 'lucide:check' : 'lucide:circle-x'}
              />
              <Text variant="md/normal">{benefit.title}</Text>
            </div>
          ))}
        </div>
      </div>
      <CardFooter className="px-0">
        {!plan.currentPlan && (
          <Button variant="full/regular" onClick={plan.onClick}>
            {buttonPlanLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
