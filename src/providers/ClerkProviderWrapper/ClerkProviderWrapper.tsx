import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

type ClerkProviderProps = {
  children: ReactNode
}

export const ClerkProviderWrapper = ({ children }: ClerkProviderProps) => {
  return <ClerkProvider>{children}</ClerkProvider>
}
