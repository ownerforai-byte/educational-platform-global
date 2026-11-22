"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Bot } from "lucide-react";
import {
  COMMUNITY_BOT_DISPLAY_NAME,
  COMMUNITY_BOT_USERNAME,
} from "@/lib/community-bot";
import { cn } from "@/lib/utils";

export const COMMUNITY_BOT_MENTION = `@${COMMUNITY_BOT_USERNAME}`;

const SUGGESTIONS = [
  {
    username: COMMUNITY_BOT_USERNAME,
    label: COMMUNITY_BOT_DISPLAY_NAME,
    detail: "Replies on this thread when tagged",
  },
] as const;

function mentionQueryAt(text: string, caret: number): string | null {
  const before = text.slice(0, caret);
  const at = before.lastIndexOf("@");
  if (at < 0) return null;
  const fragment = before.slice(at + 1);
  if (/\s/.test(fragment)) return null;
  return fragment.toLowerCase();
}

export function useCommunityMentionSuggest({
  body,
  setBody,
  textareaRef,
}: {
  body: string;
  setBody: (next: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [caret, setCaret] = useState(0);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = SUGGESTIONS.filter(
    (row) =>
      !query ||
      row.username.toLowerCase().startsWith(query) ||
      row.label.toLowerCase().includes(query),
  );

  const syncFromTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const pos = el.selectionStart ?? body.length;
    setCaret(pos);
    const q = mentionQueryAt(body, pos);
    if (q === null) {
      setOpen(false);
      setQuery("");
      return;
    }
    setQuery(q);
    setOpen(true);
  }, [body, textareaRef]);

  const insertMention = useCallback(
    (username: string) => {
      const el = textareaRef.current;
      const pos = el?.selectionStart ?? caret;
      const before = body.slice(0, pos);
      const at = before.lastIndexOf("@");
      if (at < 0) {
        const next = body.trimEnd() ? `${body.trimEnd()} @${username} ` : `@${username} `;
        setBody(next);
      } else {
        const after = body.slice(pos);
        const next = `${body.slice(0, at)}@${username} ${after}`;
        setBody(next);
      }
      setOpen(false);
      requestAnimationFrame(() => {
        el?.focus();
      });
    },
    [body, caret, setBody, textareaRef],
  );

  const openFromAtButton = useCallback(() => {
    const el = textareaRef.current;
    const pos = el?.selectionStart ?? body.length;
    const prefix = body.slice(0, pos);
    const suffix = body.slice(pos);
    const needsSpace = prefix.length > 0 && !/\s$/.test(prefix);
    const next = `${prefix}${needsSpace ? " " : ""}@${suffix}`;
    setBody(next);
    requestAnimationFrame(() => {
      el?.focus();
      const cursor = (needsSpace ? prefix.length + 1 : pos) + 1;
      el?.setSelectionRange(cursor, cursor);
      setCaret(cursor);
      setQuery("");
      setOpen(true);
    });
  }, [body, setBody, textareaRef]);

  useEffect(() => {
    return () => {
      if (blurTimer.current) clearTimeout(blurTimer.current);
    };
  }, []);

  const onTextareaBlur = () => {
    blurTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const panel =
    open && filtered.length > 0 ? (
      <ul
        role="listbox"
        aria-label="Mention suggestions"
        className="absolute z-20 mt-1 max-h-40 w-full min-w-[12rem] overflow-auto rounded-lg border border-border bg-popover p-1 shadow-elev-3"
      >
        {filtered.map((row) => (
          <li key={row.username} role="presentation">
            <button
              type="button"
              role="option"
              className={cn(
                "flex w-full items-start gap-2 rounded-md px-2.5 py-2 text-left text-sm",
                "hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
              )}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => insertMention(row.username)}
            >
              <Bot className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0">
                <span className="block font-semibold text-foreground">{row.label}</span>
                <span className="block text-xs text-muted-foreground">@{row.username}</span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">{row.detail}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    ) : null;

  return {
    mentionPanel: panel,
    syncFromTextarea,
    onTextareaBlur,
    openFromAtButton,
    insertBotMention: () => insertMention(COMMUNITY_BOT_USERNAME),
  };
}