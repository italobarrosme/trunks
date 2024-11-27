'use client'

import {
  InputText,
  InputDatePicker,
  InputNumber,
  InputSelect,
  Button,
  InputArea,
  Toastify,
  SidePanelButtonClose,
} from '@developerskyi/react-components'
import { TableControllerPanel } from '../../components/TableControllerPanel'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  handleTransactionFormSchema,
  HandleTransactionFormSchema,
} from './schemas/HandleTransactionFormSchema'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { getEnumOptions } from '../../functions/getEnumOptions'
import {
  PAYMENT_METHOD_TRANSLATION,
  TRANSACTION_CATEGORY_TRANSLATION,
  TRANSACTION_TYPE_TRANSLATION,
} from '../../constants'
import { putTransaction } from '../../actions/putTransaction'
import { useState } from 'react'
import { add, format } from 'date-fns'

type HandleTransactionFormProps = {
  edit?: boolean
  editValues?: HandleTransactionFormSchema
  trigger: React.ReactNode
}

export const HandleTransactionForm = ({
  edit,
  editValues,
  trigger,
}: HandleTransactionFormProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<HandleTransactionFormSchema>({
    resolver: zodResolver(handleTransactionFormSchema),
    defaultValues: {
      id: editValues?.id,
      name: editValues?.name || '',
      amount: editValues?.amount.toString() || '',
      type: editValues?.type || TransactionType.EXPENSE,
      category: editValues?.category || TransactionCategory.FOOD,
      paymentMethod:
        editValues?.paymentMethod || TransactionPaymentMethod.CREDIT_CARD,
      date:
        editValues?.date ||
        format(add(new Date(), { months: 1 }), 'dd/MM/yyyy'),
      description: editValues?.description,
    },
  })

  const onSubmit = async (data: HandleTransactionFormSchema) => {
    setLoading(true)

    try {
      await putTransaction(data)

      Toastify({
        description: 'Transação cadastrada com sucesso',
        option: {
          type: 'success',
        },
      })
    } catch (err) {
      if (err instanceof Error) {
        Toastify({
          description: 'Erro ao cadastrar transação',
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
    <TableControllerPanel trigger={trigger}>
      <div className="flex flex-row">
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex w-full flex-col justify-center gap-4 px-6"
        >
          <InputText
            dark
            label="Nome"
            error={errors.name?.message}
            className="text-sm"
            {...register('name')}
          />
          <InputNumber
            dark
            label="Valor"
            error={errors.amount?.message}
            className="text-sm"
            currency={'BRL'}
            {...register('amount')}
          />

          <fieldset className="relative">
            <InputDatePicker
              label="Data"
              dark
              error={errors.date?.message}
              className="text-sm"
              {...register('date')}
              defaultValue={
                editValues?.date ||
                format(add(new Date(), { months: 1 }), 'dd/MM/yyyy')
              }
              emitValue={(value) => {
                setValue('date', value as string)
              }}
            />
          </fieldset>
          <fieldset className="flex flex-col gap-6 text-sm">
            <InputSelect
              dark
              label="Tipo"
              errorMessage={errors.type?.message}
              {...register('type')}
              className="text-sm text-neutral-dark"
              options={getEnumOptions(TRANSACTION_TYPE_TRANSLATION)}
              defaultValue={editValues?.type || TransactionType.EXPENSE}
              onValueChange={(value: string) => {
                setValue('type', value as TransactionType)
              }}
            />
            <InputSelect
              dark
              label="Categoria"
              errorMessage={errors.category?.message}
              {...register('category')}
              className="text-lg text-neutral-dark"
              options={getEnumOptions(TRANSACTION_CATEGORY_TRANSLATION)}
              defaultValue={editValues?.category || TransactionCategory.FOOD}
              onValueChange={(value) => {
                setValue('category', value as TransactionCategory)
              }}
            />
            <InputSelect
              dark
              label="Método de Pagamento"
              errorMessage={errors.paymentMethod?.message}
              {...register('paymentMethod')}
              className="text-xs text-neutral-dark"
              options={getEnumOptions(PAYMENT_METHOD_TRANSLATION)}
              defaultValue={
                editValues?.paymentMethod ||
                TransactionPaymentMethod.CREDIT_CARD
              }
              onValueChange={(value) => {
                setValue('paymentMethod', value as TransactionPaymentMethod)
              }}
            />
            <InputArea
              dark
              label="Descrição (Opcional)"
              {...register('description')}
            />
          </fieldset>

          <fieldset className="flex flex-row-reverse gap-4">
            <Button variant="fit/regular" type="submit" disabled={loading}>
              {loading
                ? 'Carregando...'
                : `${edit ? 'Editar' : 'Criar'} Transação`}
            </Button>
            <SidePanelButtonClose>
              <Button variant="fit/outline" type="reset">
                Cancelar
              </Button>
            </SidePanelButtonClose>
          </fieldset>
        </form>
      </div>
    </TableControllerPanel>
  )
}
