import { Router } from 'express'
import * as UserController from './controller'

const router = Router()

router.get('/users/:id', UserController.getUserById)

export const UserRouter = router
