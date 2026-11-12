import type { Metadata } from "next";
import { ErrorPage } from "@/components/errors/error-page";
import { ERROR_PAGE_REGISTRY } from "@/lib/errors/error-page";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: ERROR_PAGE_REGISTRY["408"].title,
  description: ERROR_PAGE_REGISTRY["408"].hint,
};

export default function RequestTimeoutPage() {
  return <ErrorPage variant="408" />;
}
