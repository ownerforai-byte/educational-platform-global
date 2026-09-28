import { redirect } from "next/navigation";

/**
 * "R Notes" and "Ravikishan Notes" were retired into the official Class 11 and
 * Class 12 curriculum tracks. Both legacy URLs used to render near-identical
 * migration pages; there is now ONE canonical migration page
 * (/ravikishan-notes-disabled) and this path forwards to it, so the same
 * notice is never served from two URLs.
 */
export default function RNotesDisabledRedirect() {
  redirect("/ravikishan-notes-disabled");
}
