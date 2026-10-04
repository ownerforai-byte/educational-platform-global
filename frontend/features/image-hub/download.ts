/**
 * Cross-origin safe download: fetch → blob → click; window.open as last
 * resort (Google results and puter.js data: URLs live on foreign hosts, so
 * a plain `download` anchor is not guaranteed to work).
 *
 * Lives in its own module so both the hub gallery and the details interface
 * can use it without importing each other.
 */
export async function downloadImage(url: string, filename: string): Promise<void> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const blob = await res.blob();
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  } catch {
    window.open(url, "_blank", "noopener");
  }
}
