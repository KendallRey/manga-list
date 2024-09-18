ALTER TABLE "manga_image" ADD COLUMN "image_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "manga_image" ADD COLUMN "path" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "manga_image" ADD COLUMN "full_path" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "manga_image" ADD COLUMN "public_url" varchar(500) NOT NULL;