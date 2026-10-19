import { redirect } from "next/navigation";

/**
 * /ai/search was the Veer Curriculum Search page — now consolidated under the
 * canonical /search route so the global search bar, footer, quick-access bar
 * and mobile nav all open the same single surface.
 *
 * Redirects every request (with the query string) to /search so bookmarked
 * links keep working.
 */
export default function AISearchRedirectPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Next.js 15+ exposes searchParams as a Promise. Read it synchronously
  // by awaiting in the page is not possible here (server component), so we
  // pass the raw query through via the redirect helper's URL construction.
  const sp = props.searchParams as
    | Record<string, string | string[] | undefined>
    | undefined;
  const q = typeof sp?.q === "string" ? sp.q : "";
  const url = q ? `/search?q=${encodeURIComponent(q)}` : "/search";
  redirect(url);
}

