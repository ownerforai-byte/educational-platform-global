import { randomUUID } from "node:crypto";
import { insertCommunityFeedPost } from "../db/repositories/community-feed.repository.js";
import { COMMUNITY_BOT_ID, ensureCommunityBotProfile } from "../lib/community-bot.js";

const NATURE_DIGEST = [
  {
    title: "Morning nature note",
    body: "Today notice how light arrives before sound — dew, birds, then traffic. A two-minute pause outdoors often resets focus better than another scroll.",
  },
  {
    title: "Weather and study",
    body: "Nepal's pre-monsoon heat makes hydration matter for concentration. Keep water nearby; short breaks beat long unfocused sessions.",
  },
  {
    title: "Public news for students",
    body: "Board and entrance calendars shift yearly — check your college notice board and this platform's announcements. Plan backward from the exam month.",
  },
] as const;

/** Smallest inline asset — platform bot avatar (~1 KB svg). */
const DISCOVERY_IMG = "![Discovery](/avatars/community-bot.svg)";

const DISCOVERIES: Array<{ year: number; title: string; body: string }> = [
  { year: -350, title: "Aristotle — biology beginnings", body: "Classification of living things; foundations of natural science." },
  { year: 1543, title: "Copernicus — heliocentric model", body: "Earth orbits the Sun; changed astronomy forever." },
  { year: 1687, title: "Newton — Principia", body: "Laws of motion and universal gravitation." },
  { year: 1869, title: "Mendeleev — periodic table", body: "Patterns in elements predicted missing ones." },
  { year: 1905, title: "Einstein — special relativity", body: "Space and time are linked; E=mc²." },
  { year: 1953, title: "Watson & Crick — DNA structure", body: "Double helix explains heredity." },
  { year: 2012, title: "Higgs boson evidence", body: "CERN confirms mass-giving particle." },
];

function digestIndex(now: Date): number {
  const day = Math.floor(now.getTime() / 86_400_000);
  return Math.abs(day) % NATURE_DIGEST.length;
}

function discoveryIndex(now: Date): number {
  const slot = Math.floor(now.getTime() / (2 * 3_600_000));
  return Math.abs(slot) % DISCOVERIES.length;
}

async function insertBotPost(opts: {
  title: string;
  body: string;
  visibility: "public" | "profile_only";
}): Promise<{ ok: true; id: string } | { ok: false; reason: string }> {
  await ensureCommunityBotProfile();
  const now = new Date().toISOString();
  const id = randomUUID();
  const { error } = await insertCommunityFeedPost({
    id,
    author_id: COMMUNITY_BOT_ID,
    title: opts.title,
    body: opts.body,
    category: "general",
    visibility: opts.visibility,
    created_at: now,
    updated_at: now,
  });
  if (error) return { ok: false, reason: error.message };
  return { ok: true, id };
}

/** 02:00 Asia/Kathmandu — one public nature/news post on the main feed. */
export async function runCommunityBotDailyPublicPost(now = new Date()) {
  const pick = NATURE_DIGEST[digestIndex(now)]!;
  return insertBotPost({
    title: pick.title,
    body: pick.body,
    visibility: "public",
  });
}

/** Every 2 hours — discovery timeline on bot profile only (hidden from feed). */
export async function runCommunityBotProfileDiscoveryPost(now = new Date()) {
  const pick = DISCOVERIES[discoveryIndex(now)]!;
  const body = `${DISCOVERY_IMG}\n\n**${pick.year} — ${pick.title}**\n\n${pick.body}`;
  return insertBotPost({
    title: `Science timeline · ${pick.year}`,
    body,
    visibility: "profile_only",
  });
}