import { ENV } from '@core/env'
import mysql from 'mysql2'
import { Kysely, MysqlDialect, type LogConfig } from 'kysely'

import type { UserTable } from './models/users'

export const poolConnection = mysql.createPool({
  host: ENV.mysql_host,
  port: ENV.mysql_port,
  user: ENV.mysql_user,
  password: ENV.mysql_pass,
  database: ENV.mysql_database,
  connectionLimit: ENV.mysql_connection_limit
})

export interface Database {
  users: UserTable
}

const log: LogConfig = ENV.app_env === 'dev' ? ['query', 'error'] : ['error']
export const DB = new Kysely<Database>({
  log,
  dialect: new MysqlDialect({
    pool: poolConnection
  })
})
