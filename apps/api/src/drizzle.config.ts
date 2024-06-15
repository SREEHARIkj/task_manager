import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: '.src/db_schemas/schema.ts',
  driver: 'pg',
  dbCredentials: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'task_manager_db',
  },
  out: '.src/db_schemas/drizzle',
  verbose: true,
  strict: true,
});
