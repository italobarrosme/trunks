import {
  COLUMN_HEADERS_TABLE,
  PAYMENT_METHOD_TRANSLATION,
  TRANSACTION_CATEGORY_TRANSLATION,
} from '@/modules/transactions/constants'
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@developerskyi/react-components'
import { Icon } from '@iconify/react'
import {
  formatStyleTransactionType,
  formatDate,
  formatTranslation,
  formatCurrency,
} from '../../functions'
import { HandleTransactionForm } from '../../forms'
import { DeleteTransactionForm } from '../../forms/DeleteTransactionForm'
import { GetTransactionResponse } from '../../actions/getTransactions'

type TableTransactionsProps = {
  transactions: GetTransactionResponse
}

export const TableTransactions = ({ transactions }: TableTransactionsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Text variant="3xl/bold" tag="h2" className="text-neutral-white">
          Transações
        </Text>
        <HandleTransactionForm
          trigger={
            <Button variant="fit/regular">
              <Icon icon={'lucide:plus'} /> Adicionar Transação
            </Button>
          }
        />
      </div>

      <Table className="border-collapse overflow-hidden rounded-lg shadow-lg">
        <TableHeader>
          <TableRow className="rounded-lg bg-neutral-dark text-neutral-white hover:bg-neutral-dark">
            {COLUMN_HEADERS_TABLE.map((header: string) => (
              <TableHead key={header}>
                <Text variant="md/semibold">{header}</Text>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction: any) => (
              <TableRow
                key={transaction.id}
                className="cursor-pointer bg-neutral-dark/55 font-normal text-neutral-white "
              >
                <TableCell>{transaction.name}</TableCell>
                <TableCell>
                  {
                    <Chip
                      variant="fit/regular"
                      className={
                        formatStyleTransactionType(transaction.type).style
                      }
                      value={formatStyleTransactionType(transaction.type).label}
                    />
                  }
                </TableCell>
                <TableCell>
                  {formatTranslation(
                    transaction.category,
                    TRANSACTION_CATEGORY_TRANSLATION
                  )}
                </TableCell>
                <TableCell>
                  {formatTranslation(
                    transaction.paymentMethod,
                    PAYMENT_METHOD_TRANSLATION
                  )}
                </TableCell>
                <TableCell>{formatDate(transaction.datePayment)}</TableCell>
                <TableCell>
                  {formatCurrency(transaction.amount.toString())}
                </TableCell>
                <TableCell className="flex">
                  <HandleTransactionForm
                    edit
                    editValues={transaction}
                    trigger={
                      <Button
                        variant="fit/ghost"
                        className="text-neutral-white"
                      >
                        <Icon icon="akar-icons:edit" />
                      </Button>
                    }
                  />
                  <DeleteTransactionForm
                    id={transaction.id}
                    trigger={
                      <Button
                        variant="fit/ghost"
                        className="text-neutral-white"
                      >
                        <Icon icon="lucide:trash" />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={12}
                className="bg-feedback-warning/40 text-center text-neutral-white"
              >
                <Text>Não há transações no momento</Text>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
