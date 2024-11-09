import { TRANSACTION_TYPE } from '../types'

export const formatStyleTransactionType = (type: string) => {
  switch (type) {
    case TRANSACTION_TYPE.INCOME:
      return {
        label: 'Receita',
        style: 'text-xs h-5 bg-feedback-success/30 text-feedback-success',
      }
    case TRANSACTION_TYPE.EXPENSE:
      return {
        label: 'Despesa',
        style: 'text-xs h-5 bg-feedback-danger/30 text-feedback-danger',
      }
    case TRANSACTION_TYPE.INVESTMENT:
      return {
        label: 'Investimento',
        style: 'text-xs h-5 bg-feedback-info/30 text-feedback-info',
      }
    default:
      return {
        label: 'Não identificado',
        style: 'text-xs h-5 bg-feedback-warning/30 text-feedback-warning',
      }
  }
}
