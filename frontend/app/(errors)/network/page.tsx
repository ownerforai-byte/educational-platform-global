import type { Metadata } from "next";
import { ErrorPage } from "@/components/errors/error-page";
import { ERROR_PAGE_REGISTRY } from "@/lib/errors/error-page";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: ERROR_PAGE_REGISTRY.network.title,
  description: ERROR_PAGE_REGISTRY.network.hint,
};

export default function NetworkErrorPage() {
  return <ErrorPage variant="network" />;
}
