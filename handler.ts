import serverless from 'serverless-http'
import server from './server'

import type { Request } from 'express'
import type { APIGatewayProxyEvent, Context } from 'aws-lambda'

export const app = serverless(server.app, {
  requestId: 'X-REQUEST-ID',
  request(request: Request, event: APIGatewayProxyEvent, context: Context) {
    request.api_event = event
    request.api_context = context
  }
})
