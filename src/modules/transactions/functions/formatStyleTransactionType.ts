import { TRANSACTION_TYPE } from '../types'

export const formatStyleTransactionType = (type: string) => {
  switch (type) {
    case TRANSACTION_TYPE.INCOME:
      return {
        label: 'Receita',
        style: 'text-xs h-5 bg-feedback-success/40 text-feedback-success',
      }
    case TRANSACTION_TYPE.EXPENSE:
      return {
        label: 'Despesa',
        style: 'text-xs h-5 bg-feedback-error/40 text-feedback-danger',
      }
    case TRANSACTION_TYPE.INVESTMENT:
      return {
        label: 'Investimento',
        style: 'text-xs h-5 bg-feedback-info/40 text-feedback-info',
      }
    default:
      return {
        label: 'Não identificado',
        style: 'text-xs h-5 bg-feedback-warning/40 text-feedback-warning',
      }
  }
}
