import { env } from '@core/env'
import mysql from 'mysql2'
import { Kysely, MysqlDialect, type LogConfig } from 'kysely'

import type { UserTable } from './models/users'

export const poolConnection = mysql.createPool({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASS,
  database: env.MYSQL_DBNAME,
  connectionLimit: env.MYSQL_CONNECTION_LIMIT
})

export interface Database {
  users: UserTable
}

const log: LogConfig = env.APP_ENV === 'dev' ? ['query', 'error'] : ['error']
export const DB = new Kysely<Database>({
  log,
  dialect: new MysqlDialect({
    pool: poolConnection
  })
})
