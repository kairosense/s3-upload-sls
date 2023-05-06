import { config } from 'dotenv'
import { join } from 'path'

const envPath = join(__dirname, `../environments/${process.env.NODE_ENV ?? 'local'}.env`)

console.log('🚀 ~ Using Env Configuration from ~:', envPath)
config({ path: envPath })
