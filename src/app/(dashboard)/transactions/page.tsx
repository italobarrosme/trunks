import { TableTransactions } from '@/modules/transactions/components/TableTransactions'
import { getTransactions } from '@/modules/transactions/services'

export default async function TransactionsPage() {
  const transactionsList = await getTransactions({ quantity: 100 })

  return (
    <>
      <section className="flex flex-col gap-4 px-6 py-4">
        <TableTransactions transactions={transactionsList} />
      </section>
    </>
  )
}
