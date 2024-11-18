import { auth } from '@clerk/nextjs/server'

type User = {
  userId: string
}

export const getUser = (): User => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('User not found')
  }

  return {
    userId,
  }
}
