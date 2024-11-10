'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { deleteTransaction } from '../../services/deleteTransaction'
import {
  Button,
  SidePanel,
  SidePanelButtonClose,
  Text,
  Toastify,
} from '@developerskyi/react-components'
import {
  DeleteTransactionFormSchema,
  deleteTransactionFormSchema,
} from './schemas/DeleteTransactionFormSchema'
import { useState } from 'react'

type DeleteTransactionFormProps = {
  id: string
  trigger: React.ReactNode
}

export const DeleteTransactionForm = ({
  id,
  trigger,
}: DeleteTransactionFormProps) => {
  const [loading, setLoading] = useState(false)

  const { handleSubmit } = useForm<DeleteTransactionFormSchema>({
    resolver: zodResolver(deleteTransactionFormSchema),
    defaultValues: {
      id,
    },
  })

  const onSubmit = async () => {
    setLoading(true)

    try {
      await deleteTransaction({ id })
      Toastify({
        description: 'Transação deletada com sucesso',
        option: {
          type: 'success',
        },
      })
    } catch (err) {
      if (err instanceof Error) {
        Toastify({
          description: 'Erro ao deletar transação',
          option: {
            type: 'error',
          },
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidePanel orientation={'right'} trigger={trigger} className="w-80">
      <div className="h-screen bg-neutral-dark p-6 text-neutral-white">
        <div className="flex flex-col gap-6">
          <Text variant="3xl/semibold" tag="h2" className="text-neutral-white">
            Deletar Transação
          </Text>
          <Text className="text-neutral-white">
            Você tem certeza que deseja deletar essa transação?
          </Text>
          <form onSubmit={handleSubmit(() => onSubmit())}>
            <fieldset className="flex flex-row-reverse gap-4">
              <Button
                variant="fit/regular"
                type="submit"
                className="text-neutral-white"
                disabled={loading}
              >
                Deletar
              </Button>
              <SidePanelButtonClose>
                <Button variant="fit/outline" type="reset">
                  Cancelar
                </Button>
              </SidePanelButtonClose>
            </fieldset>
          </form>
        </div>
      </div>
    </SidePanel>
  )
}
