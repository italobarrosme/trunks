import { z } from 'zod'
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from '@prisma/client'

export const handleAiReportFormSchema = z.object({
  transactions: z.array(
    z.object({
      id: z.string(),
      amount: z.number(),
      type: z.nativeEnum(TransactionType),
      category: z.nativeEnum(TransactionCategory),
      paymentMethod: z.nativeEnum(TransactionPaymentMethod),
      description: z.optional(z.string()),
      date: z.date(),
      installment: z.optional(z.number()),
      totalInstallments: z.optional(z.number()),
    })
  ),
})

export type HandleAiReportFormSchema = z.infer<typeof handleAiReportFormSchema>
