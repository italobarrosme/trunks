import { TransactionType } from '@prisma/client'

export const setIconTransactionType = (type: TransactionType) => {
  switch (type) {
    case TransactionType.INCOME:
      return {
        text: 'lucide:trending-up',
        color: 'text-feedback-success',
      }
    case TransactionType.EXPENSE:
      return {
        text: 'lucide:trending-down',
        color: 'text-feedback-error',
      }
    case TransactionType.INVESTMENT:
      return {
        text: 'lucide:chart-line',
        color: 'text-feedback-info',
      }
    default:
      return {
        text: 'lucide:align-horizontal-distribute-center',
        color: 'text-neutral-white',
      }
  }
}
