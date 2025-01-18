import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type executionLog = {
  id: string
  executedAt: string
  status: 'success' | 'failure'
  message: string // Summary of execution
}

type executionLogState = {
  logs: executionLog[]
  addExecutionLog: (log: executionLog) => void
  clearLogs: () => void
}

export const useExecutionLogStore = create(
  persist<executionLogState>(
    (set) => ({
      logs: [],
      addExecutionLog: (log) =>
        set((state) => ({
          logs: [...state.logs, log],
        })),
      clearLogs: () =>
        set(() => ({
          logs: [],
        })),
    }),
    {
      name: 'execution-log-storage',
    }
  )
)
