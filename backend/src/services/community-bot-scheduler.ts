import { randomUUID } from "node:crypto";
import { insertCommunityFeedPost } from "../db/repositories/community-feed.repository.js";
import { COMMUNITY_BOT_ID, ensureCommunityBotProfile } from "../lib/community-bot.js";

/**
 * Tiny scenic SVGs in `frontend/public/community/vibes/` (~2–4 KB each).
 * Markdown embeds stay lightweight; UI prose styles sharpen presentation.
 */
const VIBE_POSTS: ReadonlyArray<{
  title: string;
  body: string;
  image: string;
  category: string;
}> = [
  {
    title: "Dawn over the hills",
    image: "/community/vibes/dawn.svg",
    category: "nepali",
    body: "Before you open a textbook, notice the light on the ridges. Two quiet breaths outdoors often clear the fog better than one more scroll.",
  },
  {
    title: "Monsoon mood",
    image: "/community/vibes/monsoon.svg",
    category: "nepali",
    body: "Rainy afternoons are good for short revision sprints — 25 minutes on one topic, then tea. Hydration matters when humidity is high.",
  },
  {
    title: "Terrace study light",
    image: "/community/vibes/terrace.svg",
    category: "general",
    body: "If your desk feels cramped, move to softer daylight. Rewrite one hard definition in your own words; that counts as real study.",
  },
  {
    title: "Himalaya horizon",
    image: "/community/vibes/himalaya.svg",
    category: "nepali",
    body: "Big goals feel nearer when you break them into this week only: one chapter, one diagram, one past question.",
  },
  {
    title: "Wildflowers & focus",
    image: "/community/vibes/wildflower.svg",
    category: "biology",
    body: "Notice small patterns in nature — symmetry in petals mirrors symmetry in chemistry. Quick sketches lock memory better than passive rereading.",
  },
  {
    title: "Quiet window",
    image: "/community/vibes/study-window.svg",
    category: "general",
    body: "Evening study works when the room is calm. Put your phone face-down; one distraction-free page beats three distracted chapters.",
  },
  {
    title: "Morning birds",
    image: "/community/vibes/dawn.svg",
    category: "general",
    body: "Sound arrives before the city wakes. Match that calm: review yesterday's mistakes before learning anything new.",
  },
  {
    title: "Cloudbreak",
    image: "/community/vibes/monsoon.svg",
    category: "physics",
    body: "After a cloud passes, light changes fast — like finally grasping a formula. Teach it aloud once; if you stumble, you found the gap.",
  },
  {
    title: "Village path",
    image: "/community/vibes/terrace.svg",
    category: "nepali",
    body: "Steady steps matter on long slopes. Pick one subject today, not five. Depth on one unit beats skimming an entire book.",
  },
  {
    title: "Snow line",
    image: "/community/vibes/himalaya.svg",
    category: "general",
    body: "Cold air is sharp — use that clarity for maths or physics problems while your mind is fresh.",
  },
  {
    title: "Field biology",
    image: "/community/vibes/wildflower.svg",
    category: "biology",
    body: "Classification starts with honest observation. Name three traits you see; then map them to your syllabus topic.",
  },
  {
    title: "Night lamp",
    image: "/community/vibes/study-window.svg",
    category: "general",
    body: "Late sessions need a hard stop. Set an alarm; sleep is part of preparation, especially before board week.",
  },
  {
    title: "Market morning",
    image: "/community/vibes/terrace.svg",
    category: "nepali",
    body: "Public notices and exam dates change — check your college board and this app's announcements every few days.",
  },
  {
    title: "River mist",
    image: "/community/vibes/monsoon.svg",
    category: "chemistry",
    body: "Evaporation and condensation are everywhere in the valley weather. Tie today's lesson to something you see outside.",
  },
  {
    title: "Golden hour",
    image: "/community/vibes/dawn.svg",
    category: "english",
    body: "Read one short paragraph aloud for English fluency. Tone and pacing improve faster with voice than silent skimming.",
  },
  {
    title: "Ridge wind",
    image: "/community/vibes/himalaya.svg",
    category: "physics",
    body: "Wind on a ridge is vector thinking in real life. Draw a quick diagram when intuition feels fuzzy.",
  },
  {
    title: "Garden pause",
    image: "/community/vibes/wildflower.svg",
    category: "general",
    body: "A five-minute walk resets attention. Come back to one unsolved problem instead of restarting from page one.",
  },
  {
    title: "Desk candle",
    image: "/community/vibes/study-window.svg",
    category: "mathematics",
    body: "One clean proof beats ten half-understood examples. Close the book and rebuild the steps from memory.",
  },
] as const;

const DISCOVERIES: Array<{ year: number; title: string; body: string }> = [
  { year: -350, title: "Aristotle — biology beginnings", body: "Classification of living things; foundations of natural science." },
  { year: 1543, title: "Copernicus — heliocentric model", body: "Earth orbits the Sun; changed astronomy forever." },
  { year: 1687, title: "Newton — Principia", body: "Laws of motion and universal gravitation." },
  { year: 1869, title: "Mendeleev — periodic table", body: "Patterns in elements predicted missing ones." },
  { year: 1905, title: "Einstein — special relativity", body: "Space and time are linked; E=mc²." },
  { year: 1953, title: "Watson & Crick — DNA structure", body: "Double helix explains heredity." },
  { year: 2012, title: "Higgs boson evidence", body: "CERN confirms mass-giving particle." },
];

function vibeIndex(now: Date): number {
  const minuteSlot = Math.floor(now.getTime() / (2 * 3_600_000));
  return Math.abs(minuteSlot) % VIBE_POSTS.length;
}

function discoveryIndex(now: Date): number {
  const slot = Math.floor(now.getTime() / (2 * 3_600_000));
  return Math.abs(slot) % DISCOVERIES.length;
}

function formatVibeMarkdown(vibe: (typeof VIBE_POSTS)[number]): string {
  const caption = vibe.title;
  return `![${caption}](${vibe.image} "Natural light — study pause")\n\n${vibe.body}`;
}

async function insertBotPost(opts: {
  title: string;
  body: string;
  category: string;
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
    category: opts.category,
    visibility: opts.visibility,
    created_at: now,
    updated_at: now,
  });
  if (error) return { ok: false, reason: error.message };
  return { ok: true, id };
}

/** Rotating public vibe post — called on a few-hour cron (not the same slot every day). */
export async function runCommunityBotDailyPublicPost(now = new Date()) {
  const vibe = VIBE_POSTS[vibeIndex(now)]!;
  return insertBotPost({
    title: vibe.title,
    body: formatVibeMarkdown(vibe),
    category: vibe.category,
    visibility: "public",
  });
}

/** Every 2 hours — discovery timeline on bot profile only (hidden from feed). */
export async function runCommunityBotProfileDiscoveryPost(now = new Date()) {
  const pick = DISCOVERIES[discoveryIndex(now)]!;
  const body = `![Science timeline](/community/vibes/himalaya.svg)\n\n**${pick.year} — ${pick.title}**\n\n${pick.body}`;
  return insertBotPost({
    title: `Science timeline · ${pick.year}`,
    body,
    category: "general",
    visibility: "profile_only",
  });
}