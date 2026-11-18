/**
 * Renders a JSON-LD <script> for a server component.
 *
 * JSON-LD uses the `application/ld+json` MIME type, so browsers never execute it
 * as JavaScript; the site's nonce-based CSP `script-src` therefore does not
 * apply to it. Keeping it nonce-free lets blog pages stay statically generated,
 * which is what we want for a corpus that AI crawlers read.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
