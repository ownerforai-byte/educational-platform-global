import { redirect } from "next/navigation";

/**
 * The standalone AI chat has moved into the AI Studio at /ai (Tutor tab).
 */
export default function ChatPage() {
  redirect("/ai");
}
