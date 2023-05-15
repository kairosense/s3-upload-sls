import { config } from 'dotenv'
import { join } from 'path'

const envPath = join(__dirname, '../.env')

console.log('🚀 ~ Using Env Configuration from ~:', envPath)
config({ path: envPath })
