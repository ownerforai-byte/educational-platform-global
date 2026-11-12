import { redirect } from "next/navigation";
import { DENIED_ROUTE } from "@/features/auth/pending-signup-identity";

/** Legacy URL — denial screen lives at /welcome/denied. */
export default function WelcomeRejectedRedirect() {
  redirect(DENIED_ROUTE);
}
