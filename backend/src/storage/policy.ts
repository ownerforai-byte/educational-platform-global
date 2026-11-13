/** Pure classification — re-export of tiers (T11 rename target). */
export {
  classifyBinaryUpload,
  classifyRealtimeDoc,
  classifyRelational,
  TIER_PROVIDER,
  type StorageTier,
  type StorageProvider,
  type UploadClassInput,
  type FirestoreDocKind,
  type RelationalKind,
} from "./tiers.js";
