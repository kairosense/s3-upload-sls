import { type NextFunction, type Request, type Response } from 'express'

export const secureHeaders = () => (req: Request, res: Response, next: NextFunction) => {
  // Remove headers
  res.removeHeader('X-Powered-By')
  res.removeHeader('Server')

  // Set headers
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  next()
}
