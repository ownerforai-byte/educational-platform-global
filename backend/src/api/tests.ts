// /api/tests and /api/pyqs returned identical payloads (byte-for-byte copies of
// the same handler). Both routes stay alive for backward compatibility
// (frontend lib/api/exams.ts calls both) — but the implementation lives in one
// place now. If the two surfaces ever diverge, give tests.ts its own router.
export { default } from "./pyqs";
