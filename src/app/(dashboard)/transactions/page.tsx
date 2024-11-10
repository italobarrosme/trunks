import { TableTransactions } from '@/modules/transactions/components/TableTransactions'
import { getTransactions } from '@/modules/transactions/services'

export default async function TransactionsPage() {
  const transactionsList = await getTransactions()

  return (
    <>
      <section className="flex flex-col gap-4 p-6">
        <TableTransactions transactions={transactionsList} />
      </section>
    </>
  )
}
