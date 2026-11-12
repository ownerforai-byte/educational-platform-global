import type { Metadata } from "next";
import { ErrorPage } from "@/components/errors/error-page";
import { ERROR_PAGE_REGISTRY } from "@/lib/errors/error-page";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: ERROR_PAGE_REGISTRY["404"].title,
  description: ERROR_PAGE_REGISTRY["404"].hint,
};

export default function NotFoundPage() {
  return <ErrorPage variant="404" />;
}
