import { useUser } from '@clerk/nextjs'
import { PLAN_TYPES } from '@/modules/subscriptions/constants/constants'

type SubscriptionPlan = (typeof PLAN_TYPES)[keyof typeof PLAN_TYPES]

export const useVerifySubscriptionPlan = () => {
  const { user } = useUser()

  const subscriptionPlan = user?.publicMetadata
    .subscriptionPlan as SubscriptionPlan

  return { subscriptionPlan, user }
}
