import { DB } from '@core/db'

export const getUsers = async (id?: number) => {
  try {
    const query = DB.selectFrom('users')
      .selectAll()
      .$if(!!id, (qb) => qb.where('id', '=', id!))

    const data = await query.execute()
    return data
  } catch (e) {
    return null
  }
}
