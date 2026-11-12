import { redirect } from "next/navigation";

/**
 * The legacy admin panel is retired. All platform control now lives in the
 * operator surface at /owner, restricted to authorised accounts.
 */
export default function AdminPage() {
  redirect("/owner");
}
