import { Router, type Request, type Response } from "express";

/**
 * Wave 2 thin surface endpoints — announcements, changelog, notice,
 * exam-countdown, feedback categories, platform status, referrals info,
 * site-index sections, and curriculum levels.
 *
 * All are static-data or one-query endpoints with no backend state.
 * Shape: { ok: true, data: ... } matching the mobile-v1 envelope.
 */
const router = Router();

// ── Announcements ───────────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  {
    date: "Nov 2026",
    tag: "Feature",
    title: "AI answer citations now live",
    body: "Veer AI chat answers for academic questions now cite the source note or past-year question they were grounded in.",
  },
  {
    date: "Nov 2026",
    tag: "Content",
    title: "Class 12 Physics Unit 5 notes expanded",
    body: "AC circuits topic now includes the full derivation set and three new PYQs with worked solutions.",
  },
  {
    date: "Oct 2026",
    tag: "Feature",
    title: "Spaced repetition sync",
    body: "SRS deck progress now syncs across devices for signed-in Plus and Pro members.",
  },
  {
    date: "Oct 2026",
    tag: "Content",
    title: "Chemistry model question bank updated",
    body: "Concept drills for Class 11 Chemistry Units 1–3 now available in the quiz bank.",
  },
];

router.get("/announcements", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json({ ok: true, data: { items: ANNOUNCEMENTS } });
});

// ── Changelog ───────────────────────────────────────────────────────────────
const CHANGES = [
  {
    version: "2.4.0",
    date: "Nov 2026",
    type: "feature",
    entries: [
      "AI answer citations: Veer AI chat now cites the source note or PYQ behind each academic answer.",
      "Repo hygiene: untracked large build binaries and dead routes removed from the repository.",
    ],
  },
  {
    version: "2.3.0",
    date: "Oct 2026",
    type: "feature",
    entries: [
      "Spaced repetition sync across devices for Plus and Pro members.",
      "Performance cache layer for GET API routes with stale-while-revalidate.",
      "HSTS security headers added to the frontend origin.",
    ],
  },
  {
    version: "2.2.0",
    date: "Oct 2026",
    type: "content",
    entries: [
      "Class 12 Physics AC circuits derivations and PYQs expanded.",
      "Chemistry concept drills for Units 1–3 added to the quiz bank.",
      "Biology 3D lab – cell organelles interactive model.",
    ],
  },
  {
    version: "2.1.0",
    date: "Sep 2026",
    type: "feature",
    entries: [
      "Weekly planner generates a study schedule from your goals and exam date.",
      "Community study spaces: one per class + subject, with discussion threads.",
    ],
  },
  {
    version: "2.0.0",
    date: "Sep 2026",
    type: "feature",
    entries: [
      "Tiered access launched (Free, Plus, Pro). AI tools require Plus or higher.",
      "Full native Android app released (Compose, offline-first).",
      "Community feed launched with class-aware study spaces.",
    ],
  },
];

router.get("/changelog", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json({ ok: true, data: { items: CHANGES } });
});

// ── Notice ──────────────────────────────────────────────────────────────────
const NOTICES = [
  {
    title: "NEB Class 12 exam dates confirmed",
    body: "The official NEB examination schedule for Class 12 Science has been published. Physics on Jestha 10, Chemistry on Jestha 12, Biology on Jestha 14.",
    date: "Oct 2026",
    source: "NEB Official Gazette",
    sourceUrl: "https://www.neb.gov.np",
  },
  {
    title: "CEE Medical entrance moved to Shrawan 1",
    body: "The Common Entrance Examination for MBBS/BDS admission has been rescheduled from Ashadh 25 to Shrawan 1 by the Medical Education Commission.",
    date: "Oct 2026",
    source: "MEC Directive",
    sourceUrl: "https://mec.gov.np",
  },
];

router.get("/notice", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json({ ok: true, data: { items: NOTICES } });
});

// ── Exam Countdown ──────────────────────────────────────────────────────────
const EXAM_CALENDAR: Record<string, { name: string; ad: string; bs: string }> = {
  physics:     { name: "Physics",     ad: "2027-05-25", bs: "2084-02-11" },
  chemistry:   { name: "Chemistry",   ad: "2027-05-27", bs: "2084-02-13" },
  biology:     { name: "Biology",     ad: "2027-05-29", bs: "2084-02-15" },
  mathematics: { name: "Mathematics", ad: "2027-05-31", bs: "2084-02-17" },
  english:     { name: "English",     ad: "2027-06-02", bs: "2084-02-19" },
  nepali:      { name: "Nepali",      ad: "2027-06-04", bs: "2084-02-21" },
};

router.get("/exam-countdown", (_req: Request, res: Response) => {
  const now = Date.now();
  const subjects = Object.entries(EXAM_CALENDAR).map(([slug, s]) => {
    const examMs = new Date(s.ad).getTime();
    const daysLeft = Math.max(0, Math.ceil((examMs - now) / 86400000));
    return { slug, name: s.name, examDateAd: s.ad, examDateBs: s.bs, daysLeft };
  });
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({ ok: true, data: { subjects } });
});

// ── Feedback categories ─────────────────────────────────────────────────────
const FEEDBACK_CATEGORIES = [
  { icon: "📋", title: "Content correction", description: "Report a wrong answer, typo, outdated fact, or a broken note link." },
  { icon: "💡", title: "Suggest a topic", description: "Request a new note, PYQ, lab, or visual. Tell us the subject and unit." },
  { icon: "🐛", title: "Report a bug", description: "Something broken or not loading? Include your device and steps to reproduce." },
  { icon: "⭐", title: "Feature request", description: "Suggest a new feature or improvement." },
];

router.get("/feedback", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({ ok: true, data: { categories: FEEDBACK_CATEGORIES, contactUrl: "https://harindrasah.com.np/contact" } });
});

// ── Platform Status ─────────────────────────────────────────────────────────
router.get("/status", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({
    ok: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
      commit: process.env.COMMIT_SHA ?? process.env.K_REVISION ?? null,
      services: { api: "operational", ai: "operational", content: "operational" },
    },
  });
});

// ── Referrals info ──────────────────────────────────────────────────────────
router.get("/referrals", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({
    ok: true,
    data: {
      title: "Referrals",
      description: "Invite friends to earn credits and unlock features.",
      enabled: true,
      rewardDescription: "Earn 50 credits for every friend who signs up and completes onboarding.",
    },
  });
});

// ── Site Index ──────────────────────────────────────────────────────────────
router.get("/site-index", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({
    ok: true,
    data: {
      sections: [
        { name: "Study", items: [
          { title: "Syllabus", href: "/syllabus" }, { title: "Notes", href: "/notes" },
          { title: "PYQs", href: "/pyqs" }, { title: "Formulas", href: "/formulas" },
          { title: "Derivations", href: "/derivations" }, { title: "Theorems", href: "/theorems" },
          { title: "Practical", href: "/practical" },
        ]},
        { name: "Practice & AI", items: [
          { title: "Practice", href: "/practice" }, { title: "AI Tutor", href: "/ask" },
          { title: "Mock Exams", href: "/mock-exams" }, { title: "Quiz Bank", href: "/quiz" },
        ]},
        { name: "Knowledge", items: [
          { title: "Loksewa GK", href: "/loksewa" }, { title: "World Knowledge", href: "/world-knowledge" },
          { title: "Labs", href: "/lab" }, { title: "Periodic Table", href: "/periodic-table" },
        ]},
        { name: "Account", items: [
          { title: "Dashboard", href: "/dashboard" }, { title: "Profile", href: "/profile" },
          { title: "Settings", href: "/settings" }, { title: "Referrals", href: "/referrals" },
          { title: "Billing", href: "/billing" },
        ]},
      ],
    },
  });
});

// ── Curriculum Levels ───────────────────────────────────────────────────────
router.get("/levels", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({
    ok: true,
    data: {
      levels: [
        { slug: "class-11-notes", name: "Class 11", description: "NEB Class 11 Science curriculum.", subjectCount: 6 },
        { slug: "class-12-notes", name: "Class 12", description: "NEB Class 12 Science curriculum.", subjectCount: 6 },
        { slug: "entrance-cee", name: "CEE Medical", description: "Common Entrance Exam for MBBS/BDS.", subjectCount: 4 },
        { slug: "entrance-ioe", name: "IOE Engineering", description: "Institute of Engineering entrance.", subjectCount: 4 },
        { slug: "loksewa", name: "Loksewa", description: "Public service commission exam prep.", subjectCount: 3 },
      ],
    },
  });
});

export default router;
