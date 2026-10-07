import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { build } from "esbuild";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

function resolveAlias(spec) {
  const base = path.resolve(spec.slice(2));
  const extensions = [".ts", ".tsx", ".js", ".mjs", ".json"];
  if (fs.existsSync(base) && fs.statSync(base).isFile()) return base;
  for (const ext of extensions) {
    if (fs.existsSync(base + ext)) return base + ext;
  }
  for (const ext of extensions) {
    const index = path.join(base, `index${ext}`);
    if (fs.existsSync(index)) return index;
  }
  return base;
}

const entry = process.argv[2];
if (!entry) {
  console.error("Usage: node scripts/run-cms.mjs <script.ts> [args...]");
  process.exit(1);
}

const outfile = path.resolve(`scripts/.cms-run-${process.pid}.mjs`);
const scriptArgs = process.argv.slice(3);

await build({
  entryPoints: [path.resolve(entry)],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile,
  packages: "external",
  plugins: [
    {
      name: "at-alias",
      setup(pluginBuild) {
        pluginBuild.onResolve({ filter: /^@\// }, (args) => ({
          path: resolveAlias(args.path),
        }));
        pluginBuild.onResolve({ filter: /[\\/]payload[\\/]dist[\\/]/ }, (args) => ({
          path: args.path,
          external: true,
        }));
      },
    },
  ],
});

const child = spawn(process.execPath, [outfile, ...scriptArgs], {
  stdio: "inherit",
  env: process.env,
});

const code = await new Promise((resolve) => {
  child.on("exit", (exitCode, signal) => {
    if (signal) resolve(1);
    else resolve(exitCode ?? 1);
  });
  child.on("error", (error) => {
    console.error(error);
    resolve(1);
  });
});

fs.rmSync(outfile, { force: true });
process.exit(code);
