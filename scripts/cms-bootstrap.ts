import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv();

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || !process.env.PAYLOAD_SECRET) {
    throw new Error("DATABASE_URL and PAYLOAD_SECRET are required");
  }

  const { getPayload } = await import("payload");
  const { default: config } = await import("../payload.config");

  // Boot Payload (vercelPostgresAdapter + forceUseVercelPostgres) as the
  // connectivity check — prefer pooled DATABASE_URL over a direct 5432 ping.
  const payload = await getPayload({ config });
  console.log("payload boot ok");
  const existing = await payload.find({
    collection: "users",
    limit: 1,
    overrideAccess: true,
  });
  console.log("users", existing.totalDocs);

  const email = process.env.CMS_ADMIN_EMAIL;
  const password = process.env.CMS_ADMIN_PASSWORD;
  if (existing.totalDocs === 0) {
    if (!email || !password) {
      throw new Error(
        "CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD are required when no users exist (or run cms:ensure-admin)",
      );
    }
    await payload.create({
      collection: "users",
      data: { email, password, name: "Admin" },
    });
    console.log("created admin", email);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
