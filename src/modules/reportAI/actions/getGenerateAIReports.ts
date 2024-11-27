'use server'

import { getUser } from '@/modules/auth/actions'
import { formatCurrency, formatDate } from '@/modules/transactions/functions'
import OpenAI from 'openai'
import { db } from 'prisma/prisma'

export const getGenerateAIReports = async (): Promise<{ message: string }> => {
  const { userId } = getUser()

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // verify plan premmiun

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
  })

  if (!transactions.length) {
    return {
      message: 'Não há transações para gerar o relatório',
    }
  }

  const content = `Generate a report with insights about my finances, including tips and guidance on how to improve my financial life. The transactions are divided by semicolons. The structure of each transaction is {DATE}--{TYPE}--{AMOUNT}--{CATEGORY}. They are as follows:
  
  ${transactions
    .map(
      (transaction) =>
        `${formatDate(transaction.date)}--${transaction.type}--${formatCurrency(Number(transaction.amount))}--${transaction.category}`
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

  return {
    message:
      completion.choices[0].message.content ??
      'Não foi possível gerar o relatório',
  }
}
