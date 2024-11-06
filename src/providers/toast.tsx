'use client'

import { Toaster } from '@developerskyi/react-components'
import { ReactNode } from 'react'

type ToastProviderProps = {
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

export const ToastProvider = ({ children, position }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster position={position} />
    </>
  )
}
