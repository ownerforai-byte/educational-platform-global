import type { Metadata } from "next";
import { Suspense } from "react";
import { AskView } from "@/components/study/ask-view";

export const metadata: Metadata = {
  title: "Ask",
  description: "Ask a study question and get an answer from the Veer tutor.",
};

export default function Page() {
  return (
    <Suspense>
      <AskView />
    </Suspense>
  );
}
