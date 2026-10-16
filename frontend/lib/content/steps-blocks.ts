/**
 * steps-blocks — turns a ```steps fence in a Veer reply into step cards.
 *
 * Format written by the tutor (see PLATFORM_SYSTEM_PROMPT, STEP CARDS):
 *
 *   ```steps
 *   ### Find the net force
 *   Add the vectors head to tail …
 *   ### Apply Newton's second law
 *   $F = ma$ …
 *   ```
 *
 * Each `###` heading opens a card; the lines under it are that card's body,
 * rendered as ordinary markdown, so a svg or run fence can sit inside a step.
 * Anything outside a steps fence stays prose. A steps fence with no usable
 * card, or one that is never closed (mid-stream), is left as written, so
 * nothing is silently dropped.
 *
 * Pure string work with no DOM or React, so it is unit-tested directly.
 */

export interface StepCard {
  title: string;
  body: string;
}

export type ReplySegment =
  | { kind: "text"; text: string }
  | { kind: "steps"; steps: StepCard[] };

/** Card heading: exactly three hash marks (deeper or shallower lines are body text). */
const CARD_HEADING = /^###\s+(.+?)\s*$/;
/** Opening line of the steps fence. */
const STEPS_OPEN = /^```steps\b/;
/** Any fence that opens with a language (a nested svg/run/etc. block). */
const FENCE_OPEN = /^```\S/;
/** A bare closing fence line. */
const FENCE_CLOSE = /^```\s*$/;

/** Parse the inside of one steps fence into cards (empty array = not usable). */
export function parseStepBlock(raw: string): StepCard[] {
  const cards: StepCard[] = [];
  let current: { title: string; lines: string[] } | null = null;

  for (const line of raw.split(/\r?\n/)) {
    const heading = CARD_HEADING.exec(line);
    if (heading) {
      if (current) cards.push(finishCard(current));
      current = { title: heading[1], lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else if (line.trim()) {
      // Text before the first heading becomes an untitled lead card, not lost.
      current = { title: "", lines: [line] };
    }
  }
  if (current) cards.push(finishCard(current));

  return cards.filter((card) => card.title || card.body.trim());
}

function finishCard(card: { title: string; lines: string[] }): StepCard {
  return { title: card.title, body: card.lines.join("\n").trim() };
}

/**
 * Split a whole reply into prose and step segments, in order.
 *
 * The scanner walks line by line. Inside a steps fence it counts nested
 * language fences, so the closing ``` belonging to a figure does not end the
 * steps block. Any steps fence that yields no card, or is never closed, is
 * kept verbatim as prose.
 */
export function splitStepBlocks(content: string): ReplySegment[] {
  const lines = content.split("\n");
  const segments: ReplySegment[] = [];
  let prose: string[] = [];

  const flushProse = () => {
    if (prose.length > 0) {
      segments.push({ kind: "text", text: prose.join("\n") });
      prose = [];
    }
  };

  let i = 0;
  while (i < lines.length) {
    if (!STEPS_OPEN.test(lines[i])) {
      prose.push(lines[i]);
      i += 1;
      continue;
    }

    const open = i;
    let depth = 0;
    let close = -1;
    for (let j = open + 1; j < lines.length; j += 1) {
      if (FENCE_CLOSE.test(lines[j])) {
        if (depth === 0) {
          close = j;
          break;
        }
        depth -= 1;
      } else if (FENCE_OPEN.test(lines[j])) {
        depth += 1;
      }
    }

    if (close === -1) {
      // Unclosed (still streaming): keep the rest as prose until it closes.
      prose.push(...lines.slice(open));
      break;
    }

    const steps = parseStepBlock(lines.slice(open + 1, close).join("\n"));
    if (steps.length === 0) {
      prose.push(...lines.slice(open, close + 1));
    } else {
      flushProse();
      segments.push({ kind: "steps", steps });
    }
    i = close + 1;
  }

  flushProse();
  if (segments.length === 0) return [{ kind: "text", text: content }];
  return segments;
}
