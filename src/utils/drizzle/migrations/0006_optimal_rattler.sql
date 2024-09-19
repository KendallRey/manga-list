ALTER TABLE "manga" ALTER COLUMN "description" SET DATA TYPE varchar(2048);--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "danger" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "manga" ADD COLUMN "spicy" boolean DEFAULT false;