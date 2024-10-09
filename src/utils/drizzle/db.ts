import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const client = postgres(process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL!, { max: 5 });
export const db = drizzle(client, { schema, logger: true });
