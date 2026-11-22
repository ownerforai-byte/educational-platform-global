/**
 * One-shot destructive cleanup (owner-confirmed 2026-11-22):
 *   1. backup dump -> ../backups/purge-<ts>.json
 *   2. delete ALL community_feed_posts (cascades comments/likes/saves/attachments)
 *   3. delete every auth user except OWNER_EMAIL (cascades their content)
 *   4. delete matching profile rows (keep owner + community bot)
 *   5. clean profile_follows / social_notifications / social_blocks for deleted ids
 * Usage: node scripts/purge-users-and-community.mjs [--apply]   (default: dry run)
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const APPLY = process.argv.includes('--apply');
const OWNER_EMAIL = 'sahrocky81@gmail.com';
const BOT_ID = 'rn-study-assistant';

const env = fs.readFileSync(new URL('../.env', import.meta.url), 'utf8');
const get = (k) => { const m = env.match(new RegExp('^' + k + '=(.*)$', 'm')); return m ? m[1].trim().replace(/^"|"$/g, '') : null; };
const sb = createClient(get('SUPABASE_URL'), get('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } });

const log = (...a) => console.log(...a);

// ── 1. census + backup ─────────────────────────────────────────────────────
let page = 1, users = [];
for (;;) {
  const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 200 });
  if (error) throw error;
  users = users.concat(data.users);
  if (data.users.length < 200) break;
  page++;
}
const victims = users.filter((u) => (u.email || '').toLowerCase() !== OWNER_EMAIL);
const owner = users.find((u) => (u.email || '').toLowerCase() === OWNER_EMAIL);
log(`auth users: ${users.length} total, ${victims.length} to delete, owner: ${owner?.email ?? 'NOT FOUND'}`);

const tables = ['profiles', 'community_feed_posts', 'community_feed_comments', 'community_feed_likes',
  'community_feed_reposts', 'community_feed_saves', 'community_feed_reports', 'community_feed_ai_replies',
  'community_feed_attachments', 'profile_follows', 'social_notifications', 'social_blocks'];
const dump = { timestamp: new Date().toISOString(), authUsers: users.map((u) => ({ id: u.id, email: u.email, created_at: u.created_at })) };
for (const t of tables) {
  const { data, error } = await sb.from(t).select('*');
  if (error) { log(`  (backup skip ${t}: ${error.message})`); dump[t] = { error: error.message }; continue; }
  dump[t] = data;
  log(`  ${t}: ${data.length} rows`);
}
const outDir = fileURLToPath(new URL('../backups/', import.meta.url));
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `purge-${Date.now()}.json`);
fs.writeFileSync(outPath, JSON.stringify(dump, null, 1));
log(`backup -> ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);

if (!APPLY) { log('\nDRY RUN — rerun with --apply to execute.'); process.exit(0); }

// ── 2. all community posts (cascades children) ────────────────────────────
const { error: ePosts, count: cPosts } = await sb.from('community_feed_posts').delete({ count: 'exact' }).neq('id', '00000000-0000-0000-0000-000000000000');
log(`posts deleted: ${cPosts ?? '?'}${ePosts ? ' ERR ' + ePosts.message : ''}`);

// orphan sweep for tables that may not cascade from posts
for (const t of ['community_feed_ai_replies', 'community_feed_reports']) {
  const { error, count } = await sb.from(t).delete({ count: 'exact' }).neq('post_id', '00000000-0000-0000-0000-000000000000');
  log(`${t} cleared: ${count ?? '?'}${error ? ' ERR ' + error.message : ''}`);
}

// ── 3. auth users ──────────────────────────────────────────────────────────
let okAuth = 0, failAuth = 0;
for (const u of victims) {
  const { error } = await sb.auth.admin.deleteUser(u.id);
  if (error) { failAuth++; log(`  AUTH FAIL ${u.email}: ${error.message}`); }
  else okAuth++;
}
log(`auth users deleted: ${okAuth}, failed: ${failAuth}`);

// ── 4. profiles (keep owner + bot) ────────────────────────────────────────
const keepIds = new Set([owner?.id, BOT_ID].filter(Boolean));
const { data: profs } = await sb.from('profiles').select('id, full_name, username');
const profVictims = (profs ?? []).filter((p) => !keepIds.has(p.id));
let okProf = 0;
for (const p of profVictims) {
  const { error } = await sb.from('profiles').delete().eq('id', p.id);
  if (error) log(`  PROFILE FAIL ${p.id}: ${error.message}`); else okProf++;
}
log(`profiles deleted: ${okProf} of ${profVictims.length} (kept: owner + ${BOT_ID})`);

// ── 5. social graph cleanup ────────────────────────────────────────────────
const victimIds = victims.map((u) => u.id);
for (const id of victimIds) {
  await sb.from('profile_follows').delete().or(`follower_id.eq.${id},following_id.eq.${id}`);
  await sb.from('social_notifications').delete().or(`user_id.eq.${id},actor_id.eq.${id}`);
  await sb.from('social_blocks').delete().or(`blocker_id.eq.${id},blocked_id.eq.${id}`);
}
log('follows / notifications / blocks cleaned for deleted users');

// ── 6. final state ─────────────────────────────────────────────────────────
for (const t of ['profiles', 'community_feed_posts', 'community_feed_comments']) {
  const { count } = await sb.from(t).select('id', { count: 'exact', head: true });
  log(`remaining ${t}: ${count}`);
}
log('DONE');
