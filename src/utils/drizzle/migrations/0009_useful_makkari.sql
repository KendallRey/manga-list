ALTER TABLE "user_profile" ADD COLUMN "image_url" varchar(500) DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "favorite" boolean DEFAULT false;