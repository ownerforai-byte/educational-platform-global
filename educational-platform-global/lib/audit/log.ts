import { createClient } from "@/lib/db/server";

export type AuditLogInput = {
  action: string;
  entityType?: string;
  entityId?: string;
  details?: Record<string, unknown>;
};

export async function logAuditEvent(input: AuditLogInput, actorId?: string) {
  const supabase = await createClient();
  const userId = actorId ?? (await supabase.auth.getUser()).data.user?.id;

  await supabase.from("audit_events").insert({
    actor_id: userId,
    action: input.action,
    entity_type: input.entityType ?? null,
    entity_id: input.entityId ?? null,
    details: input.details ?? {},
  });
}
