import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { clerkClient } from '@clerk/nextjs/server'
import { PLAN_TYPES } from '@/modules/subscriptions/constants/constants'

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error()
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-10-28.acacia',
  })
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.error()
  }

  const text = await request.text()

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  )

  switch (event.type) {
    case 'invoice.paid': {
      const { customer, subscription, subscription_details } = event.data.object
      const clerkUserId = subscription_details?.metadata?.clerk_user_id

      if (!clerkUserId) {
        return NextResponse.error()
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: PLAN_TYPES.premium,
        },
      })
      break
    }

    case 'customer.subscription.deleted': {
      // Remover plano premium do usuário
      const subscriptionId = await stripe.subscriptions.retrieve(
        event.data.object.id
      )
      const clerkUserId = subscriptionId.metadata.clerk_user_id
      if (!clerkUserId) {
        return NextResponse.error()
      }
      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
