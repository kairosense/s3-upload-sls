import type { NextFunction, Request, Response } from 'express'

import * as UserService from './service'
import * as UserValidation from './validations'

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = UserValidation.getUsersById.safeParse(req.params)
    if (!validation.success) {
      return next({ message: validation.error.issues })
    }

    const { id } = validation.data

    const user = await UserService.getUserById(id)

    if (!user) {
      return next({ message: '404: User not found' })
    }

    return res.status(200).json({ user })
  } catch (e) {
    console.log('🚀 ~ file: controller.ts:27 ~ getUserById ~ e:', e)
    return next({ message: 'Something went wrong' })
  }
}
