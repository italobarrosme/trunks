// import { Text } from '@developerskyi/react-components'

import { AuthCard } from '@/modules/auth/components/AuthCard'
import { AuthGoogleForm } from '@/modules/auth/forms/AuthGoogleForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const AuthCardData = {
  title: 'Bem vindo',
  description: `A Sky.finance é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, 
  e oferecer insights personalizados, facilitando o controle do seu orçamento.`,
  linkLogo: '/logo_white.png',
}

export default async function AuthPage() {
  const { userId } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <section>
      <AuthCard
        title={AuthCardData.title}
        description={AuthCardData.description}
        logo={AuthCardData.linkLogo}
      >
        <AuthGoogleForm />
      </AuthCard>
    </section>
  )
}
