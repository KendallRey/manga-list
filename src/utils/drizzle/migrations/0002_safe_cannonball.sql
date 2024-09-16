ALTER TABLE "manga" ADD COLUMN "description" varchar(255);--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "hide" boolean DEFAULT false;