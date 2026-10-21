import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-vercel-postgres";

/**
 * Adds the optional Posts `featuredImage` upload (relationTo: media).
 * Push is off on Vercel, so production needs this column added explicitly.
 * Idempotent: safe if a local `push` already created the column.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "featured_image_id" integer;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_featured_image_id" integer;
    DO $$ BEGIN
      ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk"
        FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk"
        FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    CREATE INDEX IF NOT EXISTS "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
    CREATE INDEX IF NOT EXISTS "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_featured_image_id_media_id_fk";
    ALTER TABLE "_posts_v" DROP CONSTRAINT IF EXISTS "_posts_v_version_featured_image_id_media_id_fk";
    DROP INDEX IF EXISTS "posts_featured_image_idx";
    DROP INDEX IF EXISTS "_posts_v_version_version_featured_image_idx";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "featured_image_id";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_featured_image_id";
  `);
}
