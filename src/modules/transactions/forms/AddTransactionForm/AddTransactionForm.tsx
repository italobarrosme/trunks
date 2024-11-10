'use client'

import {
  InputText,
  InputDatePicker,
  InputNumber,
  InputSelect,
  Button,
  Text,
} from '@developerskyi/react-components'
import { TableController } from '../../components/TableController'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AddTransactionSchema,
  addTransactionSchema,
} from './schemas/AddTransactionSchema'
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

export const AddTransactionForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddTransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      name: '',
      amount: '',
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      paymentMethod: TransactionPaymentMethod.PIX,
      date: '',
    },
  })

  return (
    <TableController title={'Transações'}>
      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col justify-center gap-6 px-6">
          <Text variant="3xl/semibold" tag="h2" className="text-neutral-white">
            Formulário para Cadastro de Transações
          </Text>
          <Text className="text-neutral-white">
            Neste formulário, você pode cadastrar transações de despesas e
            receitas. Essas transações serão utilizadas para gerar relatórios
            detalhados de gastos e receitas.
          </Text>
        </div>
        <form
          onSubmit={handleSubmit((data) => console.log(data, 'data'))}
          className="flex w-1/2 flex-col justify-center gap-6 p-6"
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

          <fieldset className="flex flex-row-reverse justify-between">
            <Button variant="fit/regular" type="submit">
              Adicionar Transação
            </Button>
          </fieldset>
        </form>
      </div>
    </TableController>
  )
}
