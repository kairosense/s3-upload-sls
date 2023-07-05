import express, { type ErrorRequestHandler } from 'express'
import { secureHeaders } from '~core/middlewares/secure'

import { bootstrap } from '@config/bootstrap'
import * as UploadController from '@functions/upload/controller'
import * as DownloadController from '@functions/download/controller'

const app = express()

/**
 * ? Middlewares
 */
app.use(express.urlencoded({ extended: true, limit: '2mb' }))
app.use(express.json({ limit: '20mb' }))
app.use(secureHeaders())

/**
 * Routes
 */
app.get('/download', DownloadController.downloadFile)

app.post('/initalize', UploadController.initialize)
app.post('/get-presigned-urls', UploadController.getPresignedUrls)
app.post('/finalize', UploadController.finalize)

/**
 * ! Error Handler
 */
app.use(((err, _req, res, _next) => {
  console.log('🚀 ~ file: server.ts:27 ~ app.use ~ err:', err)
  res.status(500).send({
    error: 'Something went wrong sss',
    message: err.message
  })
}) as ErrorRequestHandler)

export default { app: bootstrap(app) }
