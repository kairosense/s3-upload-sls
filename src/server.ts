import express, { type ErrorRequestHandler } from 'express'
import { secureHeaders } from '~core/middlewares/secure'

import { bootstrap } from '@config/bootstrap'
import * as UploadController from '@functions/upload/controller'

const app = express()

/**
 * ? Middlewares
 */
app.use(express.urlencoded({ extended: true, limit: '2' }))
app.use(express.json({ limit: '5' }))
app.use(secureHeaders())

/**
 * Routes
 */
app.post('/initalize', UploadController.initialize)
app.post('/get-presigned-urls', UploadController.getPresignedUrls)
app.post('/finalize', UploadController.finalize)

/**
 * ! Error Handler
 */
app.use(((err, _req, res, _next) => {
  res.status(500).send({
    error: 'Something went wrong',
    message: err.message
  })
}) as ErrorRequestHandler)

export default { app: bootstrap(app) }
