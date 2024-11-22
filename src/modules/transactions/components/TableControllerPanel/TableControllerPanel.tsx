'use client'

import { SidePanel } from '@developerskyi/react-components'

type TableControllerPanelProps = {
  children: React.ReactNode
  trigger: React.ReactNode
}

export const TableControllerPanel = ({
  children,
  trigger,
}: TableControllerPanelProps) => {
  return (
    <div className="flex items-center justify-between">
      <SidePanel orientation={'right'} trigger={trigger} className="w-2/6">
        <div className="h-screen bg-neutral-dark px-6 py-4 text-neutral-white">
          {children}
        </div>
      </SidePanel>
    </div>
  )
}
