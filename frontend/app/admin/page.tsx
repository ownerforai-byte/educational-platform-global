import { redirect } from "next/navigation";

/**
 * The legacy admin panel is retired. All platform control now lives in the
 * owner console at /owner, restricted to allowlisted owner emails.
 */
export default function AdminPage() {
  redirect("/owner");
}
