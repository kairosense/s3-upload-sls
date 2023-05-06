import { DB } from '@core/db'

export const getUserById = async (id: number) => {
  try {
    const data = await DB.selectFrom('users').select(['users.email']).where('id', '=', id).executeTakeFirst()
    return data
  } catch (e) {
    console.log('🚀 ~ file: service.ts:12 ~ getUsers ~ e:', e)
    return null
  }
}
