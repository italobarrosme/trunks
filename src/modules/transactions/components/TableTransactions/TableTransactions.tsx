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

type TableTransactionsProps = {
  transactions: any
}

export const TableTransactions = ({ transactions }: TableTransactionsProps) => {
  return (
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
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>{formatCurrency(transaction.amount)}</TableCell>
              <TableCell className="flex">
                <Button variant="fit/ghost" className="text-neutral-white">
                  <Icon icon="lucide:edit" />
                </Button>
                <Button variant="fit/ghost" className="text-neutral-white">
                  <Icon icon="lucide:trash" />
                </Button>
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
  )
}
