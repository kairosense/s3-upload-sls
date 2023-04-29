import type { Request, Response, NextFunction } from 'express'

export const sqsHandler = () => (req: Request, res: Response, next: NextFunction) => {
  /**
   * Take use of req.api_event and req.api_context
   * to handle api route and forward to proper router
   */

  const functionName = req.api_context?.functionName
  console.log('🚀 ~ file: sqs.ts:10 ~ sqsHandler ~ functionName:', functionName)

  next()
}
