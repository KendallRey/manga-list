CREATE TABLE IF NOT EXISTS "user_profile_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_profile_id" uuid,
	"image_id" varchar(255) NOT NULL,
	"path" varchar(500) NOT NULL,
	"full_path" varchar(500) NOT NULL,
	"public_url" varchar(500) NOT NULL,
	"created_at" timestamp with time zone DEFAULT NOW(),
	"updated_at" timestamp with time zone DEFAULT NOW(),
	"deleted_at" timestamp with time zone,
	"archived" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile_image" ADD CONSTRAINT "user_profile_image_user_profile_id_user_profile_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profile"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
