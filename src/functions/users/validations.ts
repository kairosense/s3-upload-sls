import { z } from 'zod'

export const getUsersById = z.object({
  id: z.coerce.number()
})
