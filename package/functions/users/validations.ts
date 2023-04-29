import { z } from 'zod'

export const getUsersValidations = z.object({
  query: z.object({
    id: z.coerce.number().optional()
  })
})
