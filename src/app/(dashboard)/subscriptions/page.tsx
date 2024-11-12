import { SubscriptionForm } from '@/modules/subscriptions/form/SubscriptionForm'

export default async function SubscriptionsPage() {
  return (
    <>
      <section className="flex max-w-5xl flex-col gap-16 text-primary-regular">
        <SubscriptionForm />
      </section>
    </>
  )
}
