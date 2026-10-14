import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { RoutedContent } from "@/lib/cms/query";

type LayoutBlock = {
  blockType?: string;
  text?: string;
  tag?: "h1" | "h2" | "h3";
  body?: string;
  heading?: string;
  lead?: string;
  label?: string;
  href?: string;
  content?: unknown;
};

function headingClass(tag: string | undefined) {
  if (tag === "h1") {
    return "font-serif text-4xl leading-tight text-ink lg:text-5xl";
  }
  if (tag === "h3") {
    return "font-serif text-2xl leading-snug text-ink";
  }
  return "font-serif text-3xl leading-snug text-ink";
}

function extractPlainText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object") return "";
  const node = value as { root?: { children?: unknown[] }; children?: unknown[]; text?: string };
  if (typeof node.text === "string") return node.text;
  const children = node.root?.children ?? node.children;
  if (!Array.isArray(children)) return "";
  return children.map((child) => extractPlainText(child)).join("\n\n");
}

function BlockView({ block }: { block: LayoutBlock }) {
  if (block.blockType === "heading" && block.text) {
    const Tag = block.tag ?? "h2";
    return <Tag className={headingClass(block.tag)}>{block.text}</Tag>;
  }

  if (block.blockType === "copy" && block.body) {
    return (
      <div className="space-y-4 text-lg leading-relaxed text-ink/80">
        {block.body.split(/\n{2,}/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (block.blockType === "richText") {
    if (!extractPlainText(block.content) && !JSON.stringify(block.content ?? "").includes('"upload"')) return null;
    return (
      <div className="cms-prose space-y-4 text-lg leading-relaxed text-ink/80 [&_a]:text-amber-b [&_a]:underline [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-ink [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">
        <RichText data={block.content as SerializedEditorState} />
      </div>
    );
  }

  if (block.blockType === "cta") {
    return (
      <section className="rounded-2xl bg-ink px-8 py-10 text-paper">
        {block.heading ? (
          <h2 className="font-serif text-3xl">{block.heading}</h2>
        ) : null}
        {block.lead ? <p className="mt-4 text-paper/80">{block.lead}</p> : null}
        {block.href && block.label ? (
          <Link
            href={block.href}
            className="mt-6 inline-flex rounded-full bg-amber-b px-6 py-3 text-sm font-medium text-ink"
          >
            {block.label}
          </Link>
        ) : null}
      </section>
    );
  }

  return null;
}

export default function RenderRoutedContent({
  doc,
  standalone = false,
}: {
  doc: RoutedContent["doc"];
  /** CMS-only post with no coded page: also render its title and meta image. */
  standalone?: boolean;
}) {
  const layout = Array.isArray(doc.layout) ? (doc.layout as LayoutBlock[]) : [];
  const featured = (doc.meta?.image ?? null) as { url?: string | null; alt?: string | null } | null;
  const featuredUrl = standalone && featured && typeof featured === "object" ? featured.url : null;
  const hasH1 = layout.some((b) => b.blockType === "heading" && b.tag === "h1");

  return (
    <article className="mx-auto max-w-4xl space-y-10 px-6 py-16 lg:px-10 lg:py-24">
      {(standalone || layout.length === 0) && !hasH1 && doc.title ? (
        <h1 className="font-serif text-4xl leading-tight text-ink lg:text-5xl">{doc.title}</h1>
      ) : null}
      {featuredUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={featuredUrl} alt={featured?.alt ?? doc.title ?? ""} className="aspect-[16/9] w-full rounded-2xl object-cover" />
      ) : null}
      {layout.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </article>
  );
}
