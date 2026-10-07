# NeuroIntegrative Care of Los Gatos

Next.js App Router marketing site with Payload CMS 3 as the content data plane. Designed pages stay as the public fallback until a document is **published**.

## Develop

```bash
cp .env.example .env.local
# Set PAYLOAD_SECRET, DATABASE_URL (Neon pooled), PREVIEW_SECRET
npm install
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## CMS scripts

| Script | Purpose |
|---|---|
| `npm run cms:export` | Rebuild `data/content-export.json` from hardcoded content |
| `npm run cms:validate-export` | Ensure export covers sitemap / public paths |
| `npm run cms:import` | Dry-run draft upsert (needs `DATABASE_URL`) |
| `CMS_IMPORT_APPLY=1 npm run cms:import -- --apply` | Write **drafts** only |
| `npm run cms:bootstrap` | Ping Neon + ensure schema/boot |
| `npm run cms:ensure-admin` | Create/reset local admin user |
| `npm run cms:generate:types` | Regenerate `payload-types.ts` |
| `npm run cms:generate:importmap` | Regenerate admin import map |

Import never bulk-publishes. Pass `--publish` and the script exits.

## Architecture

- `app/(site)` — designed marketing UI + `/next/preview`
- `app/(payload)` — Payload `/admin` + `/api`
- `CMSRoute` — published CMS doc overlays designed children; drafts stay private
- `withCMS` — database failures fall back to designed UI (public site never 500s solely because CMS is down)

See `installation-script.md` for the agency Install checklist and invariants.
