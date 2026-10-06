import { readFileSync } from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";
import { getPayload } from "payload";
import config from "../payload.config";

loadEnv({ path: ".env.local" });
loadEnv();

type ExportFile = {
  version: number;
  records: Array<{
    collection: "pages" | "posts";
    legacyId: string;
    sourceUrl: string;
    data: Record<string, unknown>;
  }>;
  globals?: Record<string, Record<string, unknown>>;
};

function skipMissingRefs<T>(value: T): T {
  return value;
}

async function findExisting(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "pages" | "posts",
  legacyId: string,
  sourceUrl: string,
) {
  const byLegacy = await payload.find({
    collection,
    where: { legacyId: { equals: legacyId } },
    limit: 1,
    draft: true,
    overrideAccess: true,
  });
  if (byLegacy.docs[0]) return byLegacy.docs[0];
  const byUrl = await payload.find({
    collection,
    where: { sourceUrl: { equals: sourceUrl } },
    limit: 1,
    draft: true,
    overrideAccess: true,
  });
  return byUrl.docs[0] ?? null;
}

async function main() {
  const apply =
    process.env.CMS_IMPORT_APPLY === "1" || process.argv.includes("--apply");
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required for cms:import");
    process.exit(1);
  }
  const file = process.argv.find((arg) => arg.endsWith(".json")) ?? "data/content-export.json";
  const exported = JSON.parse(
    readFileSync(path.resolve(file), "utf8"),
  ) as ExportFile;

  const payload = await getPayload({ config });
  let created = 0;
  let updated = 0;

  if (exported.globals && apply) {
    for (const [slug, data] of Object.entries(exported.globals)) {
      try {
        await payload.updateGlobal({
          slug: slug as "header" | "footer" | "site-settings",
          data: skipMissingRefs(data),
          draft: true,
          overrideAccess: true,
        });
      } catch (error) {
        console.error(`[cms:import] skip global ${slug}`, error);
      }
    }
  }

  for (const record of exported.records) {
    const data = {
      ...skipMissingRefs(record.data),
      _status: "draft",
    };
    const existing = await findExisting(
      payload,
      record.collection,
      record.legacyId,
      record.sourceUrl,
    );
    if (!apply) {
      continue;
    }
    try {
      if (existing) {
        await payload.update({
          collection: record.collection,
          id: existing.id,
          data,
          draft: true,
          overrideAccess: true,
        });
        updated += 1;
      } else {
        await payload.create({
          collection: record.collection,
          data,
          draft: true,
          overrideAccess: true,
        });
        created += 1;
      }
    } catch (error) {
      console.error(`[cms:import] skip ${record.sourceUrl}`, error);
    }
  }

  console.log(
    apply
      ? `Import complete. created=${created} updated=${updated} total=${exported.records.length}`
      : `Dry run. ${exported.records.length} records. Pass --apply and CMS_IMPORT_APPLY=1 to write.`,
  );
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
