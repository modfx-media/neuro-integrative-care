import { draftMode } from "next/headers";
import type { ReactNode } from "react";
import { queryRoutedContentByPath } from "@/lib/cms/query";
import LivePreviewListener from "@/components/cms/LivePreviewListener";
import RenderRoutedContent from "@/components/cms/RenderRoutedContent";

export default async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const [routed, draft] = await Promise.all([
    queryRoutedContentByPath(path),
    draftMode(),
  ]);

  if (!routed) return children;

  return (
    <>
      {draft.isEnabled ? <LivePreviewListener /> : null}
      <RenderRoutedContent doc={routed.doc} />
    </>
  );
}
