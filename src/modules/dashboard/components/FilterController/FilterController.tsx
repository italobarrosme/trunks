'use client'

import { monthsOptions } from '@/modules/shared/constants/months'
import { InputSelect, Text } from '@developerskyi/react-components'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { isBefore, isSameMonth } from 'date-fns'

export const FilterController = () => {
  const searchParams = useSearchParams()

  const labelMonthFeedback = (monthSelected: string): string => {
    const today = new Date()
    const selectedMonth = new Date(
      today.getFullYear(),
      Number(monthSelected) - 1
    )

    // Verifica se o mês selecionado é o mês anterior
    if (isBefore(selectedMonth, today) && !isSameMonth(selectedMonth, today)) {
      return 'Esse mês já foi faturado'
    }

    // Verifica se o mês selecionado é o mês atual
    if (isSameMonth(selectedMonth, today)) {
      return 'Esse mês está sendo faturado'
    }

    // Se não é anterior nem atual, assume que é o próximo mês
    return 'Esse mês ainda não foi faturado'
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const { push } = useRouter()

  if (!searchParams) return null

  return (
    <div className="flex w-full justify-between px-6 py-4">
      <Text variant="3xl/bold" tag="h2" className="text-neutral-white">
        Dashboard
      </Text>

      <div className="flex items-end gap-4">
        <InputSelect
          label={labelMonthFeedback(searchParams.get('month') || '1')}
          placeholder="Filtrar por Mês"
          options={monthsOptions}
          className="!min-w-64"
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
