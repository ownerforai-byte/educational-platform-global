/**
 * When true, identity tokens are verified with Firebase Admin (`verifyIdToken`);
 * Supabase Auth is not used on the request path. Postgres still uses
 * `supabaseAdmin` for data CRUD.
 */
export function useFirebaseAuth(): boolean {
  const raw = process.env.USE_FIREBASE_AUTH?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}
