import { redirect } from "next/navigation";

/**
 * The AI study assistant has ONE canonical route: /chat. This path only
 * forwards older /ai?tab=tutor links so the same assistant is never served
 * from two URLs.
 */
export default function AiChatRedirect() {
  redirect("/chat");
}
