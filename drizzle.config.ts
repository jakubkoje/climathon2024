import { defineConfig } from 'drizzle-kit'

const { drizzle } = useRuntimeConfig();
export default defineConfig({
  dialect: 'postgresql',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    url: drizzle.databaseUrl
  },
});
