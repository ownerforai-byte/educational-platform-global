import { handleSession } from "@/features/auth/api";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const GET = handleSession;
