'use client'

import { Button } from '@developerskyi/react-components'
import { Icon } from '@iconify/react'
import { getGenerateAIReports } from '../../actions'
import { useReportAiStore } from '../../store'

export const HandleAiReportForm = () => {
  const { setMessage } = useReportAiStore()

  const handleAiReport = async () => {
    console.log('handleAiReport')
    try {
      const { message } = await getGenerateAIReports()

      if (message) {
        console.log(message)
        setMessage(message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button variant="fit/regular" onClick={handleAiReport}>
        <Icon icon={'lucide:brain-circuit'} />
        Gerar Relatorio AI
      </Button>
    </>
  )
}
