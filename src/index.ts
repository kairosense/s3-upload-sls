import '~/environments/config'

import { env } from '@core/env'
import server from './server'

server.app.listen(env.APP_PORT, env.APP_HOST, () => {
  console.log(`🚀 Server running on port ${env.APP_PORT}`)
})
