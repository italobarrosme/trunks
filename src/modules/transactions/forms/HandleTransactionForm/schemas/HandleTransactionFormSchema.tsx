import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { z } from 'zod'

export const handleTransactionFormSchema = z.object({
  id: z.string().optional(),
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
  datePayment: z.string({
    required_error: 'Selecione a data da transação',
  }),
  description: z.string().optional(),
})

export type HandleTransactionFormSchema = z.infer<
  typeof handleTransactionFormSchema
>
