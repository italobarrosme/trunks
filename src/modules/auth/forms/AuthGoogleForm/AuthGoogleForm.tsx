'use client'

import { Button } from '@developerskyi/react-components'
import { Icon } from '@iconify/react'
import { SignInButton } from '@clerk/nextjs'

export const AuthGoogleForm = () => {
  return (
    <div className="flex gap-4">
      <SignInButton>
        <Button variant="full/outline" className="border-primary-regular">
          <Icon icon={'devicon:google'} /> Acessar com Google
        </Button>
      </SignInButton>
    </div>
  )
}
