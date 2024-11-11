'use client'

import { monthsOptions } from '@/modules/shared/constants/months'
import { Button, InputSelect, Text } from '@developerskyi/react-components'
import { Icon } from '@iconify/react'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const FilterController = () => {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const { push } = useRouter()

  return (
    <div className="flex w-full justify-between px-6 py-4">
      <Text variant="3xl/bold" tag="h2" className="text-neutral-white">
        Dashboard
      </Text>

      <div className="flex items-end gap-4">
        <Button variant="fit/regular">
          <Icon icon={'lucide:brain-circuit'} /> Relatorio AI
        </Button>
        <InputSelect
          label="Filtrar por Mês"
          placeholder="Filtrar por Mês"
          options={monthsOptions}
          className="w-52 !min-w-24"
          defaultValue={searchParams.get('month') || '1'}
          dark
          onValueChange={(value) => {
            const queryString = createQueryString('month', value)
            push(`?${queryString}`)
          }}
        />
      </div>
    </div>
  )
}
