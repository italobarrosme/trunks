'use client'

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@developerskyi/react-components'
import { PlanCard } from '../components/PlanCard'
import { createStripeCheckout } from '../actions'
import { loadStripe } from '@stripe/stripe-js'
import { useVerifySubscriptionPlan } from '../hooks/useVerifySubscriptionPlan'
import { PLAN_TYPES } from '../constants/constants'
import { useRouter } from 'next/navigation'

export const SubscriptionForm = () => {
  const { subscriptionPlan, user } = useVerifySubscriptionPlan()
  const { push } = useRouter()

  const handleCheckoutPlanPlus = async () => {
    const { sessionId } = await createStripeCheckout()

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Stripe publishable key not found')
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    )

    if (!sessionId || !stripe) {
      throw new Error('Error creating Stripe checkout session')
    }

    await stripe.redirectToCheckout({
      sessionId,
    })
  }

  const handleManagePlan = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL) {
      throw new Error('Stripe customer portal URL not found')
    }

    push(
      `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${user?.emailAddresses[0].emailAddress}`
    )
  }

  const PlanAvailables = [
    {
      title: 'Plano Start',
      price: 0,
      currentPlan: subscriptionPlan === PLAN_TYPES.starter,
      onClick: () => handleCheckoutPlanPlus(),
      benefits: [
        {
          title: 'Benefício 1',
          description: 'Descrição do benefício 1',
          available: true,
        },
        {
          title: 'Benefício 2',
          description: 'Descrição do benefício 2',
          available: true,
        },
        {
          title: 'Benefício 3',
          description: 'Descrição do benefício 3',
          available: false,
        },
        {
          title: 'Benefício 4',
          description: 'Descrição do benefício 4',
          available: false,
        },
      ],
    },
    {
      title: 'Plano Premium',
      price: 29.9,
      currentPlan: subscriptionPlan === PLAN_TYPES.premium,
      onClick: () =>
        subscriptionPlan !== PLAN_TYPES.premium
          ? handleCheckoutPlanPlus()
          : handleManagePlan(),
      benefits: [
        {
          title: 'Benefício 1',
          description: 'Descrição do benefício 1',
          available: true,
        },
        {
          title: 'Benefício 2',
          description: 'Descrição do benefício 2',
          available: true,
        },
        {
          title: 'Benefício 3',
          description: 'Descrição do benefício 3',
          available: true,
        },
        {
          title: 'Benefício 4',
          description: 'Descrição do benefício 4',
          available: false,
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-6 px-6 py-4 text-primary-regular">
      <Text variant="3xl/bold" tag="h2" className="text-neutral-white">
        Plano e Assinatura
      </Text>

      <div className="flex gap-4">
        {PlanAvailables.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  )
}
