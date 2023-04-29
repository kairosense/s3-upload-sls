import express, { type ErrorRequestHandler } from 'express'

import { UserRouter } from '@functions/users/router'
import { sqsHandler } from '@middlewares/sqs'
import { secureHeaders } from '@middlewares/secure'

const app = express()

/**
 * ? Middlewares
 */
app.use(express.urlencoded({ extended: true, limit: '2' }))
app.use(express.json({ limit: '5' }))
app.use(secureHeaders())

/**
 * ? SQS Functions
 */

app.use(sqsHandler())

/**
 * ? Routers
 */

app.use(UserRouter)

/**
 * ! Error Handler
 */

app.use(((err, _req, res, _next) => {
  res.status(500).send({
    error: 'Something went wrong',
    message: err.message
  })
}) as ErrorRequestHandler)

export default { app }
