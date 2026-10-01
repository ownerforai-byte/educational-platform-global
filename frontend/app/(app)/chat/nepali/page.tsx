import type { Metadata } from "next";
import { TutorConsole } from "@/components/ai/tutor-console";

export const metadata: Metadata = {
  title: "नेपाली Console — Veer, NEB Class 11 & 12",
  description:
    "Veer को शुद्ध नेपाली कन्सोल — NEB कक्षा ११ र १२ का नेपाली, व्याकरण, रचना र साहित्यका डाउटहरू सधैं नेपालीमै जवाफ पाउनुहोस्।",
};

/**
 * Deep link for the pure-Nepali chat console: the same TutorConsole as /chat,
 * with the नेपाली mode preselected (and persisted, exactly as if the chip had
 * been tapped). Shared links, the nav entry and subject pages land here.
 */
export default function NepaliChatPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-6">
      <TutorConsole initialConsole="nepali" />
    </div>
  );
}
