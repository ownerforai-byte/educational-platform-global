import { redirect } from "next/navigation";

// Root `/` now redirects to the nav-bar home (/home).
// The former (marketing) no-nav UI has been removed; /home is the single
// primary landing experience (nav bar + all sections).
export default function RootRedirect() {
  redirect("/home");
}
