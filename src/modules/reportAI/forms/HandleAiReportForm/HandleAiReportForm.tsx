'use client'

import { Button } from '@developerskyi/react-components'
import { Icon } from '@iconify/react'
import { getGenerateAIReports } from '../../actions'
import { useReportAiStore } from '../../store'
import { useState } from 'react'

export const HandleAiReportForm = () => {
  const { setMessage } = useReportAiStore()
  const [loading, setLoading] = useState(false)

  const handleAiReport = async () => {
    setLoading(true)
    try {
      const { message } = await getGenerateAIReports()

      if (message) {
        setMessage(message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="fit/regular" onClick={handleAiReport}>
        {loading ? (
          <>
            <Icon
              icon="mingcute:ai-line"
              className="animate-spin text-neutral-white"
            />
            Gerando Relatorio ...
          </>
        ) : (
          <>
            <Icon icon={'lucide:brain-circuit'} />
            Gerar Relatorio AI
          </>
        )}
      </Button>
    </>
  )
}
