import { ENV } from '@core/env'
import mysql from 'mysql2/promise'

export const poolConnection = mysql.createPool({
  host: ENV.mysql_host,
  port: ENV.mysql_port,
  user: ENV.mysql_user,
  password: ENV.mysql_pass,
  database: ENV.mysql_database,
  connectionLimit: ENV.mysql_connection_limit
})

export const DB = poolConnection
