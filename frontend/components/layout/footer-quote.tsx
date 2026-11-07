"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "To strive, to seek, to find, and not to yield.",
    author: "Alfred, Lord Tennyson",
    source: "https://en.wikisource.org/wiki/Ulysses_(Tennyson)",
  },
  {
    text: "Much have I seen and known.",
    author: "Alfred, Lord Tennyson",
    source: "https://en.wikisource.org/wiki/Ulysses_(Tennyson)",
  },
  {
    text: "That which we are, we are.",
    author: "Alfred, Lord Tennyson",
    source: "https://en.wikisource.org/wiki/Ulysses_(Tennyson)",
  },
  {
    text: "I am the master of my fate: I am the captain of my soul.",
    author: "William Ernest Henley",
    source: "https://en.wikisource.org/wiki/Poems_(Henley)/Out_of_the_night_that_covers_me",
  },
  {
    text: "My head is bloody, but unbowed.",
    author: "William Ernest Henley",
    source: "https://en.wikisource.org/wiki/Poems_(Henley)/Out_of_the_night_that_covers_me",
  },
  {
    text: "For my unconquerable soul.",
    author: "William Ernest Henley",
    source: "https://en.wikisource.org/wiki/Poems_(Henley)/Out_of_the_night_that_covers_me",
  },
] as const;

export function FooterQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quote = QUOTES[quoteIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((index) => (index + 1) % QUOTES.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Some words"
      className="footer-quote-glow relative my-6 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-cyan-500/5 px-4 py-5 text-center sm:px-8 sm:py-6"
    >
      <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">
        Some words
      </h2>
      <blockquote
        key={quote.text}
        aria-live="polite"
        aria-atomic="true"
        className="footer-quote-enter"
      >
        <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
          “{quote.text}”
        </p>
        <footer className="mt-2 text-xs text-muted-foreground">
          — {quote.author}
          <a
            href={quote.source}
            target="_blank"
            rel="noreferrer"
            className="ml-2 underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary"
          >
            Source
          </a>
        </footer>
      </blockquote>
    </section>
  );
}
