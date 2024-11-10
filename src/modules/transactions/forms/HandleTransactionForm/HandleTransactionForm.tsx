'use client'

import {
  InputText,
  InputDatePicker,
  InputNumber,
  InputSelect,
  Button,
  Text,
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
import { postCreateTransaction } from '../../services/postCreateTransaction'
import { useState } from 'react'

type HandleTransactionFormProps = {
  edit?: boolean
  defaultValues?: HandleTransactionFormSchema
  trigger: React.ReactNode
}

export const HandleTransactionForm = ({
  edit,
  defaultValues,
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
      name: defaultValues?.name || '',
      amount: defaultValues?.amount.toString() || '',
      type: defaultValues?.type || TransactionType.EXPENSE,
      category: defaultValues?.category || TransactionCategory.OTHER,
      paymentMethod:
        defaultValues?.paymentMethod || TransactionPaymentMethod.PIX,
      date: defaultValues?.date || new Date().toISOString(),
      description: defaultValues?.description,
    },
  })

  const onSubmit = async (data: HandleTransactionFormSchema) => {
    setLoading(true)

    try {
      await postCreateTransaction(data)

      Toastify({
        description: 'Transação cadastrada com sucesso',
        option: {
          type: 'success',
        },
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TableControllerPanel trigger={trigger}>
      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col justify-center gap-6 px-6">
          <Text variant="3xl/semibold" tag="h2" className="text-neutral-white">
            Formulário para {edit ? 'Edição' : 'Criação'} de Transações
          </Text>
          <Text className="text-neutral-white">
            Neste formulário, você pode cadastrar transações de despesas e
            receitas. Essas transações serão utilizadas para gerar relatórios
            detalhados de gastos e receitas.
          </Text>
        </div>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex w-1/2 flex-col justify-center gap-4 px-6"
        >
          <InputText
            label="Nome"
            error={errors.name?.message}
            className="text-sm"
            {...register('name')}
          />
          <InputNumber
            label="Valor"
            error={errors.amount?.message}
            className="text-sm"
            currency={'BRL'}
            {...register('amount')}
          />
          <InputArea
            label="Descrição (Opcional)"
            {...register('description')}
          />

          <fieldset className="relative">
            <Text
              variant="sm/semibold"
              className="absolute z-20 text-neutral-white"
            >
              Data
            </Text>
            <InputDatePicker
              label="Data"
              error={errors.date?.message}
              className="text-sm text-neutral-dark"
              {...register('date')}
              emitValue={(value) => {
                setValue('date', value as string)
              }}
            />
          </fieldset>
          <fieldset className="flex flex-col gap-6 text-sm">
            <InputSelect
              label="Tipo"
              errorMessage={errors.type?.message}
              {...register('type')}
              className="text-sm text-neutral-dark"
              defaultValue={TransactionType.EXPENSE}
              options={getEnumOptions(TRANSACTION_TYPE_TRANSLATION)}
              onValueChange={(value: string) => {
                setValue('type', value as TransactionType)
              }}
            />
            <InputSelect
              label="Categoria"
              errorMessage={errors.category?.message}
              {...register('category')}
              className="text-lg text-neutral-dark"
              defaultValue={TransactionCategory.OTHER}
              options={getEnumOptions(TRANSACTION_CATEGORY_TRANSLATION)}
              onValueChange={(value) => {
                setValue('category', value as TransactionCategory)
              }}
            />
            <InputSelect
              label="Método de Pagamento"
              errorMessage={errors.paymentMethod?.message}
              {...register('paymentMethod')}
              className="text-xs text-neutral-dark"
              defaultValue={TransactionPaymentMethod.PIX}
              options={getEnumOptions(PAYMENT_METHOD_TRANSLATION)}
              onValueChange={(value) => {
                setValue('paymentMethod', value as TransactionPaymentMethod)
              }}
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
