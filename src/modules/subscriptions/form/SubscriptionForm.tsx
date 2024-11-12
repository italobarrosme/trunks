'use client'

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@developerskyi/react-components'
import { PlanCard } from '../components/PlanCard'
import { createStripeCheckout } from '../actions'
import { loadStripe } from '@stripe/stripe-js'

export const SubscriptionForm = () => {
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

  const PlanAvailables = [
    {
      title: 'Plano Start',
      price: 0,
      currentPlan: true,
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
      title: 'Plano Plus',
      price: 29.9,
      currentPlan: false,
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
