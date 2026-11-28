import { getAdminClient, isMissingTable } from "./base.repository.js";

export type StorageAccountingReason =
  | "quota"
  | "missing"
  | "missing_profile"
  | "owner_mismatch"
  | "invalid_mode"
  | "invalid_path"
  | "invalid_size"
  | "invalid_limit"
  | "missing_source"
  | "target_exists"
  | "ref_overflow";

export interface StorageAccountingResult {
  ok: boolean;
  reason?: StorageAccountingReason | "not_found";
  used_bytes?: number;
  ref_count?: number;
  byte_size?: number;
  path?: string;
}

export type StorageAccountingInput = {
  mode: "reserve" | "account" | "release" | "replace" | "promote";
  ownerId: string;
  path: string;
  byteSize: number;
  limitBytes: number;
  oldPath?: string | null;
};

export async function adjustStorageObject(input: StorageAccountingInput): Promise<StorageAccountingResult> {
  const { data, error } = await getAdminClient().rpc("adjust_storage_object", {
    p_mode: input.mode,
    p_owner_id: input.ownerId,
    p_path: input.path,
    p_byte_size: input.byteSize,
    p_limit_bytes: input.limitBytes,
    p_old_path: input.oldPath ?? null,
  });

  if (error) {
    const message = (error.message ?? "").toLowerCase();
    if (isMissingTable(error) || error.code === "PGRST202" || message.includes("could not find the function")) {
      return { ok: false, reason: "missing" };
    }
    throw error;
  }

  return (data ?? { ok: false, reason: "missing" }) as StorageAccountingResult;
}
