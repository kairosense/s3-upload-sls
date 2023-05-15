import { z } from 'zod'
import { createEnv } from '@t3-oss/env-core'

const preProcessToNum = z.preprocess((val) => Number(val), z.number())

export const env = createEnv({
  clientPrefix: '',
  client: {},
  server: {
    APP_ENV: z.enum(['dev', 'stage', 'uat', 'prod']).default('dev'),

    APP_PORT: preProcessToNum.default(3000),
    APP_HOST: z.string().default('localhost'),

    MYSQL_HOST: z.string().default('localhost'),
    MYSQL_PORT: preProcessToNum.default(3306),
    MYSQL_USER: z.string(),
    MYSQL_PASS: z.string(),
    MYSQL_DBNAME: z.string(),
    MYSQL_CONNECTION_LIMIT: preProcessToNum.default(50)
  },
  runtimeEnv: process.env
})
