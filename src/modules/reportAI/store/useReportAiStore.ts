import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ReportAiStore = {
  message: string
  setMessage: (message: string) => void
}

export const useReportAiStore = create(
  persist<ReportAiStore>(
    (set) => ({
      message: '',
      setMessage: (message) => set({ message }),
    }),
    {
      name: 'report-ai-store',
    }
  )
)
