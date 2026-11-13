/**
 * One-time cleanup after Firebase Auth cutover:
 * - Verifies public.profiles is owner-only (Firebase uid)
 * - Removes legacy Supabase Auth rows (auth.users) — identity is Firebase now
 * - Clears public.storage_objects / profile_follows for deleted identities
 *
 *   node backend/scripts/purge-legacy-supabase-auth.mjs           # dry run
 *   node backend/scripts/purge-legacy-supabase-auth.mjs --apply
 */
import { runMgmtSql } from "./supabase-mgmt-sql.mjs";

const OWNER_EMAIL = "sahrocky81@gmail.com";
const apply = process.argv.includes("--apply");

const REPORT_SQL = `
select
  (select count(*)::int from public.profiles) as profiles_count,
  (select count(*)::int from auth.users) as auth_users_count,
  (select count(*)::int from public.storage_objects) as storage_objects_count;
`;

const PURGE_SQL = `
-- App rows still FK'd to auth.users (legacy Supabase uuids) — remove before auth.users delete.
delete from public.credit_transactions
where user_id in (select id from auth.users)
   or actor_id in (select id from auth.users);

delete from public.chat_messages where user_id in (select id from auth.users);
delete from public.user_journey where user_id in (select id from auth.users);
delete from public.image_history where user_id in (select id from auth.users);
delete from public.quiz_history where user_id in (select id from auth.users);
delete from public.practice_attempts where user_id in (select id from auth.users);
delete from public.user_state where user_id in (select id from auth.users);
delete from public.user_access_requests where user_id in (select id from auth.users);

do $$
begin
  if to_regclass('public.community_threads') is not null then
    delete from public.community_upvotes where user_id in (select id from auth.users);
    delete from public.community_replies where user_id in (select id from auth.users);
    delete from public.community_threads where user_id in (select id from auth.users);
  end if;
  if to_regclass('public.community_feed_posts') is not null then
    delete from public.community_feed_likes where user_id::text in (select id::text from auth.users);
    delete from public.community_feed_comments where author_id::text in (select id::text from auth.users);
    delete from public.community_feed_posts where author_id::text in (select id::text from auth.users);
  end if;
  if to_regclass('public.profile_follows') is not null then
    delete from public.profile_follows pf
    where pf.follower_id::text in (select id::text from auth.users)
       or pf.following_id::text in (select id::text from auth.users);
  end if;
  if to_regclass('public.storage_objects') is not null then
    delete from public.storage_objects so
    where so.owner_id::text in (select id::text from auth.users);
  end if;
end $$;

-- Legacy Supabase Auth (Firebase is identity source).
delete from auth.sessions;
delete from auth.refresh_tokens;
delete from auth.mfa_factors;
delete from auth.identities;
delete from auth.users;

-- Orphan rows keyed by old uuids (owner profile id is Firebase uid).
delete from public.user_access_requests uar
where uar.user_id::text not in (select id from public.profiles);
delete from public.image_history h
where h.user_id::text not in (select id from public.profiles);
`;

async function main() {
  const before = await runMgmtSql(REPORT_SQL, { quiet: true });
  const row = before?.data?.[0] ?? before?.[0] ?? {};
  console.log("Before:", JSON.stringify(row));

  if (!apply) {
    console.log("\nDry run only. Re-run with --apply to purge legacy Supabase Auth + orphan rows.");
    return;
  }

  await runMgmtSql(PURGE_SQL);
  const after = await runMgmtSql(REPORT_SQL, { quiet: true });
  const row2 = after?.data?.[0] ?? after?.[0] ?? {};
  console.log("After:", JSON.stringify(row2));
  console.log("\nPurged legacy Supabase Auth. Postgres (profiles, credits, …) unchanged.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
