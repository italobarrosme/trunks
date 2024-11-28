'use client'

import { HandleAiReportForm } from '@/modules/reportAI/forms/HandleAiReportForm'
import { useReportAiStore } from '@/modules/reportAI/store'
import { cn } from '@/utils'
import { Card, Divider, Text } from '@developerskyi/react-components'
import ReactMarkdown from 'react-markdown'

type ReportAiTemplateProps = {
  className?: string
}
export const ReportAiTemplate = ({ className }: ReportAiTemplateProps) => {
  const { message } = useReportAiStore()

  return (
    <Card className={cn('flex flex-col gap-4', className)}>
      <div className="flex justify-between gap-2">
        <Text>Relatório feito pelo especialista IA</Text>
        <HandleAiReportForm />
      </div>
      <Divider className="bg-neutral-shadow" />

      {message ? (
        <div className="flex max-h-96 flex-col justify-center overflow-y-auto px-2">
          <Text variant="xs/bold" className="h-full">
            <ReactMarkdown
              components={{
                p: ({ ...props }) => (
                  <p className={cn('mb-4 leading-relaxed')} {...props} />
                ),
                hr: ({ ...props }) => (
                  <hr className={cn('my-4 border-neutral-shadow')} {...props} />
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          </Text>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-center gap-4 overflow-y-auto px-6">
          <Text
            variant="lg/semibold"
            className="bg-feedback-warning/55 p-2 text-center"
          >
            Sem dados para exibir
          </Text>
        </div>
      )}
    </Card>
  )
}
