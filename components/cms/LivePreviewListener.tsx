"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

export default function LivePreviewListener() {
  const router = useRouter();
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={serverURL}
    />
  );
}
