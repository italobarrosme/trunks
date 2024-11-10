'use client'

import { ToastifyProvider } from '@developerskyi/react-components'
import { ReactNode } from 'react'

type ToastProviderWrapperProps = {
  children: ReactNode
}

export const ToastProviderWrapper = ({
  children,
}: ToastProviderWrapperProps) => {
  return (
    <>
      {children}
      <ToastifyProvider />
    </>
  )
}
