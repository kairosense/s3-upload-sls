import { z } from 'zod'
import { createEnv } from '@t3-oss/env-core'

export const env = createEnv({
  clientPrefix: '',
  client: {},
  server: {
    APP_ENV: z.enum(['dev', 'stage', 'uat', 'prod']).default('dev'),
    BUCKETNAME: z.string()
  },
  runtimeEnv: process.env
})
