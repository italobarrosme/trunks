'use server'

import fs from 'fs'
import path from 'path'
import { differenceInHours } from 'date-fns'

const RULE_TIME_BLOCK_REPORT = 24
const FILE_PATH = path.join(process.cwd(), './timeoutData.json')

const loadData = (): Record<string, string> => {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify({}), 'utf-8')
  }
  return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'))
}

const saveData = (data: Record<string, string>) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

type PatchTimeoutEventReportProps = {
  userId: string
  timeEvent: string
}

export const patchTimeoutEventReport = ({
  userId,
  timeEvent,
}: PatchTimeoutEventReportProps): void => {
  const data = loadData()

  // Atualiza ou insere o horário do evento para o usuário
  data[userId] = timeEvent

  // Salva no arquivo JSON
  saveData(data)
}

type GetTimeoutEventReportProps = {
  userId: string
}

export const getTimeoutEventReport = ({
  userId,
}: GetTimeoutEventReportProps): boolean => {
  const data = loadData()

  const timeEvent = data[userId]
  if (!timeEvent) {
    return false
  }

  const secondsElapsed = differenceInHours(new Date(), new Date(timeEvent))

  return secondsElapsed < RULE_TIME_BLOCK_REPORT
}
