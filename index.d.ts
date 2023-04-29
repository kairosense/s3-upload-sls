/**
 * Modify express request interface
 */

import type { APIGatewayProxyEvent, Context } from 'aws-lambda'

declare global {
  // Extending Express Request Interface
  namespace Express {
    export interface Request {
      api_event?: APIGatewayProxyEvent
      api_context?: Context

      values: {
        valid: boolean
        data: unknown
      }
    }
  }
}
