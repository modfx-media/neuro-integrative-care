// Serializes JSON-LD for a <script> tag, escaping `<` so embedded content
// (e.g. a "</script>") can't break out of the script element.
export function jsonLdScript(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
