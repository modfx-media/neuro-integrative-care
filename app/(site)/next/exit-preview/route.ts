import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { normalizePath } from "@/lib/cms/path";

export async function GET(request: Request): Promise<Response> {
  const draft = await draftMode();
  draft.disable();

  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("path") || "/";
  const path = normalizePath(raw) ?? "/";
  redirect(path);
}
