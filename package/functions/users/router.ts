import { Router } from 'express'
import { getUsers } from './service'
import { getUsersValidations } from './validations'

const router = Router()

router.get('/users', async (req, res) => {
  // Validations
  const validation = getUsersValidations.safeParse({
    query: req.query
  })

  // Validation Failed
  if (!validation.success) {
    return res.status(400).send({
      errors: validation.error.issues
    })
  }

  const data = validation.data
  const users = await getUsers(data.query.id)

  return res.send({ data: users })
})

export const UserRouter = router
