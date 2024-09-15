import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL!, { max: 1 });
const db = drizzle(client);

async function main() {
  await migrate(db, { migrationsFolder: "./src/drizzle/migrations" });
  await client.end();
}

main();
