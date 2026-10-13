"use client";

import { useEffect, useState } from "react";
import { Lightbulb, RefreshCw, Sparkles, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  TUTOR_SUGGESTION_CATEGORIES,
  createSuggestionDeck,
  type StudySuggestion,
  type SuggestionCategory,
} from "@/lib/ai/study-suggestions";
import { chat } from "@/lib/api";
import { chatWithPuter } from "@/lib/puter-chat";
import { getChatHistory, saveChatHistory } from "@/lib/api/chat-history";

const HISTORY_SESSION = "study-suggestions";
const DECK_SIZE = 6;

type ExplainResult =
  | { answer: string; source: "server" | "puter.js fallback" }
  | { error: string };

export function StudySuggestionsPanel() {
  const [categories, setCategories] = useState<SuggestionCategory[]>(
    TUTOR_SUGGESTION_CATEGORIES,
  );
  const [deck, setDeck] = useState<StudySuggestion[]>([]);
  const [seen, setSeen] = useState<string[]>([]);
  const [results, setResults] = useState<Record<string, ExplainResult>>({});
  const [pending, setPending] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);

  const shuffle = (nextCategories = categories, avoid: string[] = seen) => {
    setDeck(createSuggestionDeck(nextCategories, DECK_SIZE, [...avoid, ...recent]));
  };

  useEffect(() => {
    setDeck(createSuggestionDeck(TUTOR_SUGGESTION_CATEGORIES, DECK_SIZE, []));
    getChatHistory(HISTORY_SESSION, 20)
      .then(({ messages }) => {
        const prompts = messages
          .filter((m) => m.role === "user")
          .map((m) => m.content)
          .slice(-6);
        setRecent(prompts.reverse());
        setSeen((prev) => [...prev, ...prompts]);
      })
      .catch(() => undefined);
  }, []);

  const explain = async (text: string) => {
    if (pending) return;
    setPending(text);
    setSeen((prev) => (prev.includes(text) ? prev : [...prev, text]));
    const prompt = `Explain this NEB Class 11/12 study question in a few concise, exam-shaped steps: ${text}`;
    try {
      const res = await chat([{ role: "user", content: prompt }]);
      setResults((prev) => ({
        ...prev,
        [text]: { answer: res.response, source: "server" },
      }));
      void saveChatHistory(
        [
          { role: "user", content: text },
          { role: "assistant", content: res.response },
        ],
        HISTORY_SESSION,
      ).catch(() => undefined);
    } catch {
      try {
        const answer = await chatWithPuter(prompt);
        setResults((prev) => ({
          ...prev,
          [text]: { answer, source: "puter.js fallback" },
        }));
        void saveChatHistory(
          [
            { role: "user", content: text },
            { role: "assistant", content: answer },
          ],
          HISTORY_SESSION,
        ).catch(() => undefined);
      } catch (err) {
        setResults((prev) => ({
          ...prev,
          [text]: {
            error: err instanceof Error ? err.message : "Could not generate an explanation.",
          },
        }));
      }
    } finally {
      setPending(null);
    }
  };

  const toggleCategory = (category: SuggestionCategory) => {
    const next = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];
    const effective = next.length > 0 ? next : TUTOR_SUGGESTION_CATEGORIES;
    setCategories(effective);
    shuffle(effective);
  };

  return (
    <section className="space-y-4 rounded-2xl border border-border/70 bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10">
            <Lightbulb className="h-4 w-4 text-amber-500" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-foreground">Study suggestions</h2>
            <p className="text-[11px] text-muted-foreground">
              Fresh prompts for your revision — ask Veer to explain any of them.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => shuffle()} className="rounded-xl text-xs">
          <RefreshCw className="mr-1.5 h-3 w-3" />
          Shuffle
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {TUTOR_SUGGESTION_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => toggleCategory(category)}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              categories.includes(category)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {deck.map((suggestion) => {
          const result = results[suggestion.text];
          return (
            <Card key={suggestion.text} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-3 pt-5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm leading-relaxed text-foreground">
                    {suggestion.text}
                  </p>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    {suggestion.category}
                  </Badge>
                </div>

                <div className="mt-auto space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={pending !== null}
                    onClick={() => explain(suggestion.text)}
                    className="rounded-xl text-xs"
                  >
                    <Sparkles className="mr-1.5 h-3 w-3" />
                    {pending === suggestion.text
                      ? "Explaining…"
                      : result
                        ? "Explain again"
                        : "Explain"}
                  </Button>

                  {result && "error" in result && (
                    <p className="text-xs text-red-500">{result.error}</p>
                  )}
                  {result && "answer" in result && (
                    <div className="space-y-1.5 rounded-xl border border-border bg-muted/20 p-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        <Sparkles className="h-2.5 w-2.5" />
                        {result.source}
                      </span>
                      <MathMarkdown content={result.answer} className="text-xs" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {recent.length > 0 && (
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
            <History className="h-3 w-3" />
            Recently explored (saved to your chat history)
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recent.map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => explain(text)}
                disabled={pending !== null}
                className="max-w-full truncate rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
