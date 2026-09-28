import { redirect } from "next/navigation";

/**
 * The AI quiz generator has ONE canonical route: /ai-quiz (the page every nav
 * entry and the Everything Index point at). This path exists only so older
 * /ai?tab=quiz links keep working — it forwards instead of rendering a second
 * copy of the same page.
 */
export default function AiQuizRedirect() {
  redirect("/ai-quiz");
}
