import Link from "next/link";
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
    const text = extractPlainText(block.content);
    if (!text) return null;
    return (
      <div className="space-y-4 text-lg leading-relaxed text-ink/80">
        {text.split(/\n{2,}/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
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

export default function RenderRoutedContent({ doc }: { doc: RoutedContent["doc"] }) {
  const layout = Array.isArray(doc.layout) ? (doc.layout as LayoutBlock[]) : [];

  return (
    <article className="mx-auto max-w-4xl space-y-10 px-6 py-16 lg:px-10 lg:py-24">
      {layout.length === 0 ? (
        <h1 className="font-serif text-4xl text-ink">{doc.title}</h1>
      ) : (
        layout.map((block, index) => (
          <BlockView key={index} block={block} />
        ))
      )}
    </article>
  );
}
