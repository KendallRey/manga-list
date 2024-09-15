import { MODEL } from "@/model/model";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable(MODEL.USER.name, {
  [MODEL.USER.ID]: uuid(MODEL.USER.ID).primaryKey(), // Supabase auth uses UUID for user IDs
});
