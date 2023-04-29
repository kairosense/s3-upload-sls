import type { Generated, ColumnType, Selectable, Insertable, Updateable } from 'kysely'

export interface UserTable {
  id: Generated<number>

  first_name: string
  last_name: string | null

  email: string
  username: string

  created_at: ColumnType<Date, string | undefined, never>
}

export type User = Selectable<UserTable>
export type InsertableUser = Insertable<UserTable>
export type UpdateableUser = Updateable<UserTable>
