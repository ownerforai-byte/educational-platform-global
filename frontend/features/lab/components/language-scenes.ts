"use client";

/**
 * Language & Literature scenes — the bespoke 3D visuals for English and Nepali.
 *
 * Why a separate module (2026-11-11): the science keyword router in
 * `chapter-animation.tsx` matches on English keywords, so a literature topic
 * like "Sequences & Series" or "Organic Principles" could be claimed by a
 * maths/chemistry scene. English and Nepali topics are therefore routed
 * through THIS table only — a subject-scoped lookup that can never fall
 * through to a science scene.
 *
 * Each scene is a real, teachable model of the topic's shape:
 *
 *   StoryScene      — characters, setting and plot arc of a narrative
 *   PoemScene       — stanza / metre structure of a verse
 *   EssayScene      — the four-part argument structure of an essay
 *   GrammarScene    — the parts of a sentence and their relationships
 *   WritingScene    — letter / report / note layout on the desk
 *   SpeechScene     — two speakers exchanging turns in a dialogue
 *   CultureScene    — a wheel of the social / cultural themes of a unit
 *   TimelineScene   — historical or developmental sequence
 *
 * Every scene is built from the same primitives the science scenes use
 * (`SceneRender`, `MouseOrbitHandle`), so they compose with the shared
 * orbit / zoom / toolbar rig.
 */
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";
import { makeTitleSprite } from "@/components/lab/mouse-orbit-scene";
import type { SceneRender } from "@/components/lab/chapter-animation";

const SPHERE = new THREE.SphereGeometry(1, 32, 32);
const BOX = new THREE.BoxGeometry(1, 1, 1);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 32);
const mat = (color: number, emissive?: number) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive: emissive ?? color,
    emissiveIntensity: 0.25,
    roughness: 0.35,
    metalness: 0.2,
  });

/* ── shared helpers ─────────────────────────────────────────────────────── */

/** A flat "page" plate that the writing scenes can lay text rows on. */
function pagePlate(color = 0xf8fafc): THREE.Mesh {
  const page = new THREE.Mesh(
    new THREE.PlaneGeometry(6.4, 8),
    new THREE.MeshStandardMaterial({ color, roughness: 0.95 }),
  );
  page.position.set(0, 2.6, 0);
  return page;
}

/** Rows of "text" on a page: one thin box per line, shorter near the end. */
function textRows(
  parent: THREE.Group,
  count: number,
  color: number,
  width = 4.9,
): void {
  for (let i = 0; i < count; i += 1) {
    const row = new THREE.Mesh(
      new THREE.BoxGeometry(width - (i % 3) * 0.6, 0.09, 0.04),
      new THREE.MeshBasicMaterial({ color }),
    );
    row.position.set(-0.35, 5.5 - i * 0.42, 0.03);
    parent.add(row);
  }
}

/** A ring of nodes with connecting lines — the shape used by several scenes. */
function nodeWheel(
  parent: THREE.Group,
  count: number,
  radius: number,
  colors: number[],
  nodeScale = 0.3,
): void {
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const node = new THREE.Mesh(SPHERE, mat(colors[i % colors.length]));
    node.scale.setScalar(nodeScale);
    node.position.set(Math.cos(angle) * radius, 2, Math.sin(angle) * radius);
    parent.add(node);
  }
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    const b = ((i + 1) / count) * Math.PI * 2;
    parent.add(
      new LiveLeaderLine(
        new THREE.Vector3(Math.cos(a) * radius, 2, Math.sin(a) * radius),
        new THREE.Vector3(Math.cos(b) * radius, 2, Math.sin(b) * radius),
        1.6,
        0x94a3b8,
        0.06,
        0.06,
      ),
    );
  }
}

/* ── scenes ─────────────────────────────────────────────────────────────── */

/**
 * A narrative: two characters facing each other across a setting, with the
 * plot arc drawn as a rising line between them.
 */
const StoryScene: SceneRender = (h) => {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 }),
  );
  ground.rotation.x = -Math.PI / 2;
  h.group.add(ground);

  const hero = new THREE.Mesh(CYL, mat(0xf59e0b, 0xf59e0b));
  hero.scale.set(0.45, 2.4, 0.45);
  hero.position.set(-3, 1.2, 0);
  h.group.add(hero);

  const other = new THREE.Mesh(CYL, mat(0x38bdf8, 0x38bdf8));
  other.scale.set(0.45, 2.1, 0.45);
  other.position.set(3, 1.05, 0);
  h.group.add(other);

  // The conflict between them, drawn as a taut line.
  h.group.add(
    new LiveLeaderLine(
      new THREE.Vector3(-2.6, 2.2, 0),
      new THREE.Vector3(2.6, 1.9, 0),
      5.2,
      0xef4444,
      0.07,
      0.07,
    ),
  );

  // The plot arc: rising, falling, resolving.
  const arcPoints: THREE.Vector3[] = [];
  for (let i = 0; i < 60; i += 1) {
    const t = i / 59;
    arcPoints.push(
      new THREE.Vector3(
        (t - 0.5) * 9,
        1 + Math.sin(t * Math.PI) * 2.6 - t * 0.6,
        -2.4,
      ),
    );
  }
  h.group.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(arcPoints),
      new THREE.LineBasicMaterial({ color: 0xfbbf24 }),
    ),
  );
  h.group.add(makeTitleSprite("Setting · Characters · Conflict · Arc", "#fbbf24"));

  const id = setInterval(() => {
    h.group.rotation.y += 0.004;
  }, 16);
  return () => clearInterval(id);
};

/**
 * A verse: stanzas as stacked rows of a fixed metre, with the rhyme links
 * drawn between the last words of each line.
 */
const PoemScene: SceneRender = (h) => {
  const stanzaColors = [0x8b5cf6, 0x3b82f6, 0x10b981, 0xf59e0b];
  for (let s = 0; s < 4; s += 1) {
    for (let i = 0; i < 4; i += 1) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(3.4 - i * 0.15, 0.16, 0.16),
        mat(stanzaColors[s]),
      );
      line.position.set(-1.2, 4.4 - s * 1.1 - i * 0.22, -s * 0.35);
      h.group.add(line);
    }
  }
  // Rhyme links: the end of each line joins the end of its partner line.
  for (let i = 0; i < 4; i += 1) {
    h.group.add(
      new LiveLeaderLine(
        new THREE.Vector3(0.5, 4.4 - i * 0.22, 0),
        new THREE.Vector3(0.5, 3.96 - i * 0.22, -1.05),
        1.2,
        0xf472b6,
        0.05,
        0.05,
      ),
    );
  }
  h.group.add(makeTitleSprite("Stanza · Metre · Rhyme · Rhythm", "#f472b6"));

  const id = setInterval(() => {
    h.group.rotation.y += 0.005;
  }, 16);
  return () => clearInterval(id);
};

/**
 * An essay's argument structure: a claim supported by three reasons, and a
 * conclusion closing the structure.
 */
const EssayScene: SceneRender = (h) => {
  const claim = new THREE.Mesh(BOX, mat(0xf59e0b, 0xf59e0b));
  claim.scale.set(2.6, 0.5, 0.5);
  claim.position.set(0, 4.4, 0);
  h.group.add(claim);

  const reasons = [0x38bdf8, 0x10b981, 0xa78bfa];
  reasons.forEach((color, i) => {
    const x = (i - 1) * 2.4;
    const reason = new THREE.Mesh(BOX, mat(color));
    reason.scale.set(1.8, 0.4, 0.4);
    reason.position.set(x, 2.4, 0);
    h.group.add(reason);
    h.group.add(
      new LiveLeaderLine(
        new THREE.Vector3(0, 4.1, 0),
        new THREE.Vector3(x, 2.7, 0),
        2.4,
        0x64748b,
        0.06,
        0.06,
      ),
    );
  });

  const conclusion = new THREE.Mesh(BOX, mat(0xef4444, 0xef4444));
  conclusion.scale.set(3.2, 0.5, 0.5);
  conclusion.position.set(0, 0.6, 0);
  h.group.add(conclusion);
  for (let i = 0; i < reasons.length; i += 1) {
    const x = (i - 1) * 2.4;
    h.group.add(
      new LiveLeaderLine(
        new THREE.Vector3(x, 2.1, 0),
        new THREE.Vector3(0, 0.9, 0),
        2.4,
        0x64748b,
        0.06,
        0.06,
      ),
    );
  }
  h.group.add(makeTitleSprite("Claim · Reasons · Evidence · Conclusion", "#fbbf24"));

  const id = setInterval(() => {
    h.group.rotation.y += 0.005;
  }, 16);
  return () => clearInterval(id);
};

/**
 * A sentence: subject, verb and object as labelled parts with the object
 * and the complement branching off the verb.
 */
const GrammarScene: SceneRender = (h) => {
  const subject = new THREE.Mesh(BOX, mat(0x38bdf8));
  subject.scale.set(1.8, 0.6, 0.6);
  subject.position.set(-3, 2.6, 0);
  h.group.add(subject);

  const verb = new THREE.Mesh(BOX, mat(0xf59e0b));
  verb.scale.set(1.8, 0.6, 0.6);
  verb.position.set(0, 2.6, 0);
  h.group.add(verb);

  const object = new THREE.Mesh(BOX, mat(0x10b981));
  object.scale.set(1.8, 0.6, 0.6);
  object.position.set(3, 2.6, 0);
  h.group.add(object);

  h.group.add(
    new LiveLeaderLine(
      new THREE.Vector3(-2.1, 2.6, 0),
      new THREE.Vector3(-0.9, 2.6, 0),
      1.2,
      0x94a3b8,
      0.07,
      0.07,
    ),
  );
  h.group.add(
    new LiveLeaderLine(
      new THREE.Vector3(0.9, 2.6, 0),
      new THREE.Vector3(2.1, 2.6, 0),
      1.2,
      0x94a3b8,
      0.07,
      0.07,
    ),
  );

  // Modifiers and complements branch below the verb.
  const branches = [0xa78bfa, 0xf472b6];
  branches.forEach((color, i) => {
    const x = i === 0 ? -1.2 : 1.2;
    const branch = new THREE.Mesh(BOX, mat(color));
    branch.scale.set(1.4, 0.4, 0.4);
    branch.position.set(x, 1.1, 0);
    h.group.add(branch);
    h.group.add(
      new LiveLeaderLine(
        new THREE.Vector3(0, 2.25, 0),
        new THREE.Vector3(x, 1.35, 0),
        1.4,
        0x64748b,
        0.06,
        0.06,
      ),
    );
  });

  h.group.add(makeTitleSprite("Subject · Verb · Object · Modifiers", "#7dd3fc"));

  const id = setInterval(() => {
    h.group.rotation.y += 0.006;
  }, 16);
  return () => clearInterval(id);
};

/**
 * A page of formal writing: the letterhead block, the salutation, the body
 * paragraphs and the closing — the layout every letter and report shares.
 */
const WritingScene: SceneRender = (h) => {
  h.group.add(pagePlate());
  textRows(h.group, 5, 0x334155, 3.2);

  // Letterhead: the block at the top of the page.
  const head = new THREE.Mesh(BOX, mat(0x38bdf8));
  head.scale.set(4.4, 0.22, 0.06);
  head.position.set(-0.4, 6.2, 0.05);
  h.group.add(head);

  // Salutation line, then the body.
  const salutation = new THREE.Mesh(BOX, mat(0xf59e0b));
  salutation.scale.set(2.6, 0.16, 0.06);
  salutation.position.set(-1.1, 5.05, 0.05);
  h.group.add(salutation);

  // The closing signature block, underlined.
  const sign = new THREE.Mesh(BOX, mat(0xef4444));
  sign.scale.set(1.8, 0.14, 0.06);
  sign.position.set(-1.5, 1.55, 0.05);
  h.group.add(sign);

  h.group.add(makeTitleSprite("Heading · Salutation · Body · Closing", "#7dd3fc"));

  const id = setInterval(() => {
    h.group.rotation.y += 0.004;
  }, 16);
  return () => clearInterval(id);
};

/**
 * A conversation: two speakers facing each other, with the turn-taking
 * shown as a beam of speech passing between them.
 */
const SpeechScene: SceneRender = (h) => {
  const left = new THREE.Mesh(CYL, mat(0x38bdf8, 0x38bdf8));
  left.scale.set(0.45, 2.3, 0.45);
  left.position.set(-2.6, 1.15, 0);
  h.group.add(left);

  const right = new THREE.Mesh(CYL, mat(0xf59e0b, 0xf59e0b));
  right.scale.set(0.45, 2.1, 0.45);
  right.position.set(2.6, 1.05, 0);
  h.group.add(right);

  // Speech bubbles above each speaker.
  for (const [x, color] of [
    [-2.6, 0x38bdf8],
    [2.6, 0xf59e0b],
  ] as const) {
    const bubble = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.9, 0.5),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.35,
        roughness: 0.4,
      }),
    );
    bubble.position.set(x, 3.4, 0);
    h.group.add(bubble);
  }

  // The turn: a beam that pulses from one speaker to the other.
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.16, 0.16),
    new THREE.MeshBasicMaterial({ color: 0xa78bfa }),
  );
  beam.position.set(0, 3.4, 0);
  h.group.add(beam);

  h.group.add(makeTitleSprite("Speaker · Turn · Response · Feedback", "#a78bfa"));

  const id = setInterval(() => {
    const t = performance.now() / 900;
    beam.position.x = Math.sin(t) * 1.6;
    beam.material.opacity = 0.55 + Math.abs(Math.sin(t)) * 0.45;
    (beam.material as THREE.MeshBasicMaterial).transparent = true;
  }, 16);
  return () => clearInterval(id);
};

/**
 * A unit's social / cultural themes as a wheel of connected ideas, with the
 * central concept holding them together.
 */
const CultureScene: SceneRender = (h) => {
  const center = new THREE.Mesh(SPHERE, mat(0xf59e0b, 0xf59e0b));
  center.scale.setScalar(0.6);
  center.position.set(0, 2, 0);
  h.group.add(center);

  nodeWheel(
    h.group,
    8,
    3.4,
    [0x38bdf8, 0x10b981, 0xa78bfa, 0xf472b6, 0xfacc15],
    0.34,
  );

  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    h.group.add(
      new LiveLeaderLine(
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(Math.cos(angle) * 3.4, 2, Math.sin(angle) * 3.4),
        3.4,
        0x94a3b8,
        0.05,
        0.05,
      ),
    );
  }

  h.group.add(makeTitleSprite("Themes · Values · Society · Identity", "#fbbf24"));

  const id = setInterval(() => {
    h.group.rotation.y += 0.006;
  }, 16);
  return () => clearInterval(id);
};

/**
 * A sequence in time: ordered nodes on a rising path, marking the
 * development of a language, a movement or a person's contribution.
 */
const TimelineScene: SceneRender = (h) => {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i += 1) {
    const x = (i - 2.5) * 1.9;
    const y = 1.4 + Math.sin((i / 5) * Math.PI) * 1.6;
    points.push(new THREE.Vector3(x, y, 0));

    const node = new THREE.Mesh(SPHERE, mat([0x38bdf8, 0x10b981, 0xf59e0b][i % 3]));
    node.scale.setScalar(0.32);
    node.position.set(x, y, 0);
    h.group.add(node);
  }
  h.group.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0xfbbf24 }),
    ),
  );

  h.group.add(makeTitleSprite("Origin · Development · Influence · Legacy", "#fbbf24"));

  const id = setInterval(() => {
    h.group.rotation.y += 0.005;
  }, 16);
  return () => clearInterval(id);
};

/* ── the subject-scoped routing table ───────────────────────────────────── */

export interface LanguageSceneRoute {
  keys: string[];
  scene: SceneRender;
  title: string;
  description: string;
}

/**
 * The routing table for English and Nepali topics. Keys are matched against
 * the topic slug AND title, lowercased. Nepali keys are the Devanagari
 * substrings that appear in the Nepali topic titles.
 *
 * Order matters: the first route whose key matches wins, so the most
 * specific families (literature, writing, grammar) come first.
 */
export const LANGUAGE_SCENE_ROUTES: LanguageSceneRoute[] = [
  // ── Nepali (Devanagari keys) ──
  {
    keys: [
      "पदप्रकरण",
      "क्रियाप्रकरण",
      "समास",
      "शब्द परिवर्तन",
      "शब्द-वर्ग",
      "कारक",
      "विभक्ति",
      "वाक्य रचना",
      "क्रिया —",
      "मुहावरा",
      "लोकोक्ति",
      "शब्द-सम्पदा",
      "राष्ट्रभाषा",
      "भाषा र पहिचान",
    ],
    scene: GrammarScene,
    title: "Nepali Grammar & Vocabulary",
    description: "Sentence parts, word classes and compound structure in 3D.",
  },
  {
    keys: [
      "निबन्ध लेखन",
      "चिठी लेखन",
      "संवाद लेखन",
      "दैनिकी लेखन",
      "वक्तृता",
      "प्रतिवेदन",
      "सम्पादन लेखन",
      "समीक्षा",
      "सारांश",
      "सृजनात्मक लेखन",
      "आवधिक निबन्ध",
      "पत्र लेखन",
      "व्यावसायिक पत्र",
    ],
    scene: WritingScene,
    title: "Nepali Writing & Composition",
    description: "The formal layout of an essay, letter, report or speech.",
  },
  {
    keys: [
      "पाठ १",
      "पाठ २",
      "पाठ ३",
      "पाठ ४",
      "पाठ ५",
      "पाठ ६",
      "पाठ ७",
      "पाठ ८",
      "पाठ ९",
      "कथा, कविता र नाटक",
      "व्यंग्य र हास्यव्यंग्य",
      "साहित्यकार",
      "साहित्यमा",
    ],
    scene: StoryScene,
    title: "Nepali Literature & Culture",
    description: "Characters, setting and plot arc of the prescribed texts.",
  },
  {
    keys: ["नेपाली संस्कृति", "सामाजिक संरचना", "रीतिरिवाज", "चाडपर्व"],
    scene: CultureScene,
    title: "Nepali Culture & Society",
    description: "The themes, values and social structure of the unit.",
  },

  // ── English ──
  {
    keys: [
      "short story",
      "poem",
      "essay 1",
      "essay 2",
      "essay 3",
      "essay 4",
      "essay 5",
      "one-act play",
      "literary",
      "neighbours",
      "respectable woman",
      "devoted son",
      "treasure in the forest",
      "my old home",
      "half-closed eyes",
      "very old man",
      "a day",
      "every morning i wake",
      "my own route",
      "awakening age",
      "soft storm",
      "on libraries",
      "marriage as a social",
      "knowledge and wisdom",
      "humility",
      "age of inequality",
      "matter of husbands",
      "facing death",
      "the bull",
    ],
    scene: StoryScene,
    title: "English Literature",
    description: "Characters, setting and plot arc of the prescribed texts.",
  },
  {
    keys: [
      "grammar",
      "tense",
      "clause",
      "sentence type",
      "voice",
      "narration",
      "modal",
      "punctuation",
      "capitalisation",
      "vocabulary",
    ],
    scene: GrammarScene,
    title: "English Grammar & Usage",
    description: "The parts of a sentence, tense and clause in 3D.",
  },
  {
    keys: [
      "writing",
      "composition",
      "letter",
      "email",
      "report",
      "article",
      "summary",
      "note-making",
      "story writing",
      "speech",
      "dialogue",
      "review",
      "comprehension",
      "paraphrasing",
      "unseen passage",
    ],
    scene: WritingScene,
    title: "English Writing Skills",
    description: "The formal layout of an essay, letter, report or summary.",
  },
  {
    keys: [
      "conversation",
      "role play",
      "presentation",
      "debate",
      "discussion",
      "listening",
      "oral communication",
    ],
    scene: SpeechScene,
    title: "Oral Communication",
    description: "Two speakers exchanging turns in a dialogue.",
  },
  {
    keys: [
      "critical thinking",
      "media and society",
      "history and culture",
      "human rights",
      "democracy",
      "power and politics",
      "globalization",
      "diaspora",
      "war and peace",
      "education and humanity",
      "arts and creation",
      "fantasy",
      "career and entrepreneurship",
      "humour and satire",
      "health and exercise",
      "ecology and development",
      "home life and family",
      "life and love",
      "language development",
      "communication",
      "technology",
      "money and economy",
      "sports",
      "hobbies",
      "animal world",
      "leisure",
      "music and creation",
      "human culture",
      "family",
      "history",
      "migration",
      "education",
      "humour",
      "ecology",
      "career",
      "opportunities",
      "environment",
    ],
    scene: CultureScene,
    title: "English Language Development",
    description: "The themes, values and society of the unit.",
  },
  {
    keys: ["essay writing", "writing and composition"],
    scene: EssayScene,
    title: "Essay Argument Structure",
    description: "Claim, reasons, evidence and conclusion in 3D.",
  },
];

/** Subject slugs that use the language scenes instead of the science table. */
export const LANGUAGE_SUBJECT_SLUGS = ["english", "nepali"] as const;

/**
 * Resolve a scene for an English/Nepali topic. Returns null when no route
 * matches — the caller then shows the honest "under progress" state rather
 * than borrowing a science scene.
 */
export function pickLanguageScene(
  slug: string,
  title: string,
): { scene: SceneRender; title: string; description: string } | null {
  const haystack = `${slug} ${title}`.toLowerCase();
  for (const entry of LANGUAGE_SCENE_ROUTES) {
    if (entry.keys.some((k) => haystack.includes(k.toLowerCase()))) {
      return { scene: entry.scene, title: entry.title, description: entry.description };
    }
  }
  return null;
}
