import '@/styles/globals.css'

import { ReactNode } from 'react'
import { Metadata } from 'next'
import { ToastProviderWrapper } from '@/providers/ToastProviderWrapper'
import { ClerkProviderWrapper } from '@/providers/ClerkProviderWrapper'
import { Mulish } from 'next/font/google'

type Props = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: 'sky.finance - Site',
  description: 'Sistema finaceiro',
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

const mulish = Mulish({
  subsets: ['latin'],
})

export default function RootLayout({ children }: Props) {
  return (
    <ClerkProviderWrapper>
      <html lang="en">
        <body className={`${mulish.className} min-h-screen bg-neutral-shadow`}>
          <ToastProviderWrapper>
            <main>{children}</main>
          </ToastProviderWrapper>
        </body>
      </html>
    </ClerkProviderWrapper>
  )
}
