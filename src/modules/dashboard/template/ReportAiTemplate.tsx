'use client'

import { HandleAiReportForm } from '@/modules/reportAI/forms/HandleAiReportForm'
import { useReportAiStore } from '@/modules/reportAI/store'
import { cn } from '@/utils'
import { Card, Divider, Text } from '@developerskyi/react-components'

type ReportAiTemplateProps = {
  className?: string
}
export const ReportAiTemplate = ({ className }: ReportAiTemplateProps) => {
  const { message } = useReportAiStore()

  return (
    <Card className={cn('flex flex-col gap-4', className)}>
      <div className="flex gap-2">
        <Text>Relatório feito pelo especialista IA</Text>
        <HandleAiReportForm />
      </div>
      <Divider className="bg-neutral-shadow" />

      {message ? (
        <div className="flex h-96 flex-col justify-center gap-4 overflow-y-auto px-6">
          <Text
            variant="lg/semibold"
            className="bg-feedback-warning/55 p-2 text-center"
          >
            {message}
          </Text>
        </div>
      ) : (
        <div className="flex h-80 flex-col justify-center gap-4 overflow-y-auto px-6">
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
