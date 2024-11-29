'use server'

import { getUser } from '@/modules/auth/actions'
import { formatCurrency, formatDate } from '@/modules/transactions/functions'
import OpenAI from 'openai'
import { db } from 'prisma/prisma'
import { patchTimeoutEventReport } from './timeoutEventReport'

export const getGenerateAIReports = async (): Promise<{
  message: string
  timeEvent?: string
}> => {
  try {
    const { userId } = getUser()

    const openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      take: 20,
      orderBy: { datePayment: 'desc' },
    })

    if (!transactions.length) {
      return {
        message: 'Não há transações para gerar o relatório',
      }
    }

    const content = `Generate a report finance with insights about my last 20 transactions, including tips and guidance on how to improve my financial life. The transactions are divided by semicolons. The structure of each transaction is {DATE}--{TYPE}--{AMOUNT}--{CATEGORY}. They are as follows:

    ${transactions
      .map(
        (transaction) =>
          `${formatDate(transaction.datePayment)}--${transaction.type}--${formatCurrency(Number(transaction.amount))}--${transaction.category}`
      )
      .join(';')}
      return the report in a text format in Portuguese.`

    const completion = await openAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a finance specialist and help people organize their finances.',
        },
        {
          role: 'user',
          content,
        },
      ],
    })

    patchTimeoutEventReport({ userId, timeEvent: new Date().toISOString() })

    return {
      message:
        completion.choices[0].message.content ??
        'Não foi possível gerar o relatório',
    }
  } catch (error) {
    console.error('Erro ao gerar o relatório:', error)
    return {
      message:
        'Ocorreu um erro ao gerar o relatório. Tente novamente mais tarde.',
    }
  }
}
