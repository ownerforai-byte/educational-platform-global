import { redirect } from "next/navigation";

// `/` now redirects to the nav-bar home so the AppShell experience (nav bar +
// all sections) is the primary landing. The former marketing hero and
// showcase sections were merged into /home.
export default function MarketingRedirect() {
  redirect("/home");
}
