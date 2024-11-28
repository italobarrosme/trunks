'use client'

import { Button } from '@developerskyi/react-components'
import { Icon } from '@iconify/react'
import { getGenerateAIReports, getTimeoutEventReport } from '../../actions'
import { useReportAiStore } from '../../store'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

export const HandleAiReportForm = () => {
  const { userId } = useAuth()

  const { setMessage } = useReportAiStore()
  const [loading, setLoading] = useState(false)
  const [isBlockedButton, setIsBlockedButton] = useState(false)

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

  const verifyTimeEvent = async (userId: any) => {
    const isBlocked = await getTimeoutEventReport({ userId })

    setIsBlockedButton(!isBlocked)
  }

  useEffect(() => {
    verifyTimeEvent(userId)
  }, [userId])

  return (
    <>
      <Button
        variant="fit/regular"
        onClick={handleAiReport}
        disabled={!isBlockedButton}
      >
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
