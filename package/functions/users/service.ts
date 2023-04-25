import { DB } from '@core/db'

export const getUsersData = async (id?: number) => {
  let query = 'SELECT * FROM users'
  const params = []

  if (id) {
    query += ' WHERE id = ? '
    params.push(id)
  }

  const [rows] = await DB.query(query, params)

  return rows
}
