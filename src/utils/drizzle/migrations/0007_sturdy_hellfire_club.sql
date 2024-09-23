DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('manga', 'manhwa', 'manhua');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "type" "type";