import { type APIGatewayProxyHandler } from 'aws-lambda'

import API, { type HandlerFunction } from 'lambda-api'
import { getUsersData } from './service'

const app = API()

const GetUsers: HandlerFunction = async (req, res) => {
  const id = req.query.id ? Number(req.query.id) : undefined
  const allUsers = await getUsersData(id)

  return res.send({ allUsers })
}
app.get('/users', GetUsers)

app.finally((req, res) => {})

export const UserController: APIGatewayProxyHandler = async (event, context) => await app.run(event, context)
