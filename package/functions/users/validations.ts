import { z } from 'zod'

export const getUsersById = z.object({
  params: z.object({
    id: z.coerce.number()
  })
})
