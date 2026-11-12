import type { Metadata } from "next";
import { ErrorPage } from "@/components/errors/error-page";
import { ERROR_PAGE_REGISTRY } from "@/lib/errors/error-page";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: ERROR_PAGE_REGISTRY["400"].title,
  description: ERROR_PAGE_REGISTRY["400"].hint,
};

export default function BadRequestPage() {
  return <ErrorPage variant="400" />;
}
