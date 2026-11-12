import type { Metadata } from "next";
import { ErrorPage } from "@/components/errors/error-page";
import { ERROR_PAGE_REGISTRY } from "@/lib/errors/error-page";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: ERROR_PAGE_REGISTRY["503"].title,
  description: ERROR_PAGE_REGISTRY["503"].hint,
};

export default function ServiceUnavailablePage() {
  return <ErrorPage variant="503" />;
}
