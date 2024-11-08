'use client'

import { Toaster } from '@developerskyi/react-components'
import { ReactNode } from 'react'

type ToastProviderWrapperProps = {
  children: ReactNode
  position:
    | 'bottom/center'
    | 'bottom/left'
    | 'bottom/right'
    | 'top/center'
    | 'top/left'
    | 'top/right'
    | undefined
}

export const ToastProviderWrapper = ({
  children,
  position,
}: ToastProviderWrapperProps) => {
  return (
    <>
      {children}
      <Toaster position={position} />
    </>
  )
}
