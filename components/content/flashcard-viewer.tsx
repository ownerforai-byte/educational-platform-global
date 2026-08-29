"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { UnderDevelopment } from "@/components/content/under-development";

export function FlashcardViewer({
  cards,
}: {
  cards: Array<{ id: string; title: string; content: Record<string, unknown> }>;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) {
    return <UnderDevelopment />;
  }

  const card = cards[index];
  const front = String(card.content?.front ?? card.title);
  const back = String(card.content?.back ?? "");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Card {index + 1} of {cards.length}
        </span>
        <Button
          variant="ghost"
          size="sm" md:size="default" lg:size="lg"
          onClick={() => setFlipped(false)}
          aria-label="Reset flip"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="relative h-64 md:h-80 lg:h-96 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") setFlipped(!flipped);
        }}
        aria-label="Flashcard. Press to flip."
      >
        <div className="absolute inset-0">
          <Card
            className={`h-full transition-all duration-300 ${
              flipped ? "opacity-0" : "opacity-100"
            }`}
          >
            <CardContent className="flex h-full items-center justify-center p-6 text-center">
              <p className="text-base md:text-lg lg:text-xl font-medium">{front}</p>
            </CardContent>
          </Card>
          <Card
            className={`absolute inset-0 h-full transition-all duration-300 ${
              flipped ? "opacity-100" : "opacity-0"
            }`}
          >
            <CardContent className="flex h-full items-center justify-center p-6 text-center">
              <p className="text-base md:text-lg lg:text-xl">{back}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setIndex((i) => Math.max(0, i - 1));
            setFlipped(false);
          }}
          disabled={index === 0}
          aria-label="Previous card"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setIndex((i) => Math.min(cards.length - 1, i + 1));
            setFlipped(false);
          }}
          disabled={index === cards.length - 1}
          aria-label="Next card"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
