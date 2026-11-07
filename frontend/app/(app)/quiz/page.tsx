import { redirect } from "next/navigation";

/**
 * Practice has ONE home: `/practice`.
 *
 * `/quiz` used to be a second, older practice hub with its own three quiz
 * engines (concepts, True/False, PYQ). Keeping it would have meant two sets of
 * question types and two different explanation surfaces, so the old engine was
 * replaced by the two-type Practice section and this route now forwards —
 * keeping every nav entry, bookmark and footer link working.
 */
export default function QuizRedirectPage() {
  redirect("/practice");
}
