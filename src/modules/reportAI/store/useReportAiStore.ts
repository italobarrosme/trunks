import { create } from 'zustand'

type ReportAiStore = {
  message: string
  setMessage: (message: string) => void
}

export const useReportAiStore = create<ReportAiStore>((set) => ({
  message: '',
  setMessage: (message) => set({ message }),
}))
