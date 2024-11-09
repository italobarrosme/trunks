'use client'

import { TableController } from '../components/TableController'

export const AddTransactionForm = () => {
  return (
    <TableController
      title={'Transações'}
      actionButton={() => console.log('action')}
    />
  )
}
