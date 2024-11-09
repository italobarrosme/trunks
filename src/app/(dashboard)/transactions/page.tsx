import { TableTransactions } from '@/modules/transactions/components/TableTransactions'
import { AddTransactionForm } from '@/modules/transactions/forms'
import { getTransactions } from '@/modules/transactions/services'
// import { Text } from '@developerskyi/react-components'

export default async function TransactionsPage() {
  const transactionsList = await getTransactions()

  return (
    <>
      <section className="flex flex-col gap-4 p-6">
        <AddTransactionForm />
        <div>
          <TableTransactions transactions={transactionsList} />
        </div>
      </section>
    </>
  )
}
