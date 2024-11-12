'use server'

import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export const createStripeCheckout = async () => {
  const { userId } = await auth()

  if (!userId) {
    return {
      status: 401,
      body: {
        message: 'Unauthorized',
      },
    }
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      status: 500,
      body: {
        message: 'Internal server error',
      },
    }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-10-28.acacia',
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscriptions/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscriptions`,
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  })

  return {
    sessionId: session.id,
  }
}
