import { drizzle } from 'drizzle-orm/node-postgres'

let sql: postgres.Sql<{}> | null
let db: PostgresJsDatabase<Record<string, never>> | null

export function useDb() {
  const {drizzle: {databaseUrl}} = useRuntimeConfig()

  db = drizzle(databaseUrl)

  return db
}
