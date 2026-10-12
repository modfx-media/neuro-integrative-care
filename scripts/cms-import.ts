import { readFileSync, existsSync } from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";
import { getPayload, type Payload } from "payload";
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

function hasApplyFlag() {
  return process.argv.includes("--apply") && process.env.CMS_IMPORT_APPLY === "1";
}

/** Drop unresolved `$ref` nodes without throwing. */
function skipMissingRefs(value: unknown): unknown {
  if (value && typeof value === "object") {
    if ("$ref" in (value as Record<string, unknown>)) return null;
    if (Array.isArray(value)) {
      return value.map(skipMissingRefs).filter((item) => item !== null);
    }
    const next: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      const resolved = skipMissingRefs(nested);
      if (resolved !== null) next[key] = resolved;
    }
    return next;
  }
  return value;
}

async function findExisting(
  payload: Payload,
  collection: "pages" | "posts",
  legacyId: string,
  sourceUrl: string,
) {
  if (legacyId) {
    const byLegacy = await payload.find({
      collection,
      where: { legacyId: { equals: legacyId } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    });
    if (byLegacy.docs[0]) return byLegacy.docs[0];
  }
  if (sourceUrl) {
    const byUrl = await payload.find({
      collection,
      where: { sourceUrl: { equals: sourceUrl } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    });
    if (byUrl.docs[0]) return byUrl.docs[0];
  }
  return null;
}

async function main() {
  if (process.argv.includes("--publish")) {
    console.error("Refusing to bulk-publish. Import is draft-only.");
    process.exit(1);
  }
  if (process.argv.includes("--apply") && process.env.CMS_IMPORT_APPLY !== "1") {
    console.error("Set CMS_IMPORT_APPLY=1 with --apply to write drafts.");
    process.exit(1);
  }

  const apply = hasApplyFlag();
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required for cms:import");
    process.exit(1);
  }
  if (!process.env.PAYLOAD_SECRET) {
    console.error("PAYLOAD_SECRET is required for cms:import");
    process.exit(1);
  }

  const file =
    process.argv.find((arg) => arg.endsWith(".json")) ?? "data/content-export.json";
  const resolved = path.resolve(file);
  if (!existsSync(resolved)) {
    console.error(`Missing export file: ${resolved}. Run npm run cms:export first.`);
    process.exit(1);
  }

  const exported = JSON.parse(readFileSync(resolved, "utf8")) as ExportFile;
  const payload = await getPayload({ config });
  let created = 0;
  let updated = 0;

  console.log(
    `${apply ? "Applying" : "Dry run"} ${exported.records.length} records as drafts`,
  );

  if (exported.globals && apply) {
    for (const [slug, data] of Object.entries(exported.globals)) {
      try {
        await payload.updateGlobal({
          slug: slug as "header" | "footer" | "site-settings",
          data: skipMissingRefs(data) as Record<string, unknown>,
          overrideAccess: true,
        });
      } catch (error) {
        console.error(`[cms:import] skip global ${slug}`, error);
      }
    }
  }

  for (const record of exported.records) {
    const data = {
      ...(skipMissingRefs(record.data) as Record<string, unknown>),
      _status: "draft" as const,
    } as Record<string, unknown>;
    if (data.meta && typeof data.meta === "object") {
      const meta = data.meta as Record<string, unknown>;
      if (typeof meta.image === "string") delete meta.image;
    }

    const existing = await findExisting(
      payload,
      record.collection,
      record.legacyId,
      record.sourceUrl,
    );

    if (!apply) {
      console.log(
        `${existing ? "update" : "create"} ${record.collection} ${record.sourceUrl}`,
      );
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
      const cause =
        error instanceof Error && error.cause instanceof Error
          ? error.cause.message
          : null;
      const message = (
        cause || (error instanceof Error ? error.message : String(error))
      ).split("\n")[0];
      console.error(`[cms:import] skip ${record.sourceUrl}: ${message}`);
    }
  }

  console.log(
    apply
      ? `Draft import complete. created=${created} updated=${updated} total=${exported.records.length}. Public site unchanged until publish review.`
      : `Dry run complete. ${exported.records.length} records. Pass --apply and CMS_IMPORT_APPLY=1 to write drafts.`,
  );
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
