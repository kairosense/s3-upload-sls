import { type env } from '@config/env'

export const constants: Record<typeof env.APP_ENV, Record<string, unknown>> = {
  dev: {},
  prod: {},
  stage: {},
  uat: {}
}
