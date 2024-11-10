import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { z } from 'zod'

export const addTransactionSchema = z.object({
  name: z.string().trim().nonempty({
    message: 'O valor não pode ser vazio',
  }),
  amount: z.string().nonempty({
    message: 'O valor não pode ser vazio',
  }),
  type: z.nativeEnum(TransactionType, {
    required_error: 'Selecione o tipo da transação',
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: 'Selecione a categoria da transação',
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: 'Selecione o método de pagamento',
  }),
  date: z.string({
    required_error: 'Selecione a data da transação',
  }),
})

export type AddTransactionSchema = z.infer<typeof addTransactionSchema>
