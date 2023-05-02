import { type env } from '@core/env'

export const constants: Record<typeof env.APP_ENV, Record<string, unknown>> = {
  dev: {},
  prod: {},
  stage: {},
  uat: {}
}
