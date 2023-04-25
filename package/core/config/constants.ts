import { type ENV } from '@core/env'

export const constants: Record<typeof ENV.app_env, Record<string, unknown>> = {
  dev: {},
  prod: {},
  stage: {},
  uat: {}
}
