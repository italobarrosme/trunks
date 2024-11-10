import { z } from 'zod'

export const deleteTransactionFormSchema = z.object({
  id: z.string().nonempty(),
})

export type DeleteTransactionFormSchema = z.infer<
  typeof deleteTransactionFormSchema
>
