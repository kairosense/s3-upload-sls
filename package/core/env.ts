import { z } from 'zod'

const preProcessToNum = z.preprocess((val) => Number(val), z.number())

/**
 * ? Add validations for env configurations
 */
const schema = z.object({
  app_env: z.enum(['dev', 'stage', 'uat', 'prod']).default('dev'),
  mysql_host: z.string().default('localhost'),
  mysql_port: preProcessToNum.default(3306),
  mysql_user: z.string(),
  mysql_pass: z.string(),
  mysql_database: z.string(),
  mysql_connection_limit: preProcessToNum.default(50)
})

type ProcessEnv = Record<keyof z.infer<typeof schema>, string | undefined>

/**
 * ? Add keys below from process.env
 */
const processEnv: ProcessEnv = {
  app_env: process.env.APP_ENV,
  mysql_database: process.env.MYSQL_DBNAME,
  mysql_host: process.env.MYSQL_HOST,
  mysql_port: process.env.MYSQL_PORT,
  mysql_user: process.env.MYSQL_USER,
  mysql_pass: process.env.MYSQL_PASS,
  mysql_connection_limit: process.env.MYSQL_CONNECTION_LIMIT
}

/**
 * ! Do not touch below code.
 */
const parseEnv = (env: ProcessEnv): z.infer<typeof schema> => {
  const parsed = schema.safeParse(env)

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
    )
    throw new Error('Invalid environment variables')
  }

  return new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined
      return target[prop as keyof typeof target]
    }
  })
}

export const ENV = parseEnv(processEnv)
