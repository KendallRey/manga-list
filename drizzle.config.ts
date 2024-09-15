import { defineConfig, Config } from 'drizzle-kit';

const config: Config = {
  schema: "./src/utils/drizzle/schema.ts",
  out: './src/utils/drizzle/migrations',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL!,
  },
  dialect: 'postgresql',
  verbose: true,
  strict: true,
}

export default defineConfig(config)