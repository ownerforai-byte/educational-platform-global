import type { Metadata } from "next";
import { BillingView } from "@/components/study/billing-view";

export const metadata: Metadata = {
  title: "Billing",
  description: "Spark balance, plan status and receipt history.",
};

export default function Page() {
  return <BillingView />;
}
