'use client'

import { Button, SidePanel, Text } from '@developerskyi/react-components'
import { Icon } from '@iconify/react'

type TableControllerProps = {
  title: string
  children: React.ReactNode
}

export const TableController = ({ title, children }: TableControllerProps) => {
  return (
    <div className="flex items-center justify-between">
      <Text variant="3xl/semibold" tag="h2" className="text-neutral-white">
        {title}
      </Text>
      <SidePanel
        orientation={'right'}
        trigger={
          <Button variant="fit/regular">
            <Icon icon={'lucide:plus'} /> Adicionar Transação
          </Button>
        }
      >
        <div className="h-full bg-neutral-dark p-6 text-neutral-white">
          {children}
        </div>
      </SidePanel>
    </div>
  )
}
