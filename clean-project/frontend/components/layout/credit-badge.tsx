"use client";

import { useEffect, useState, useRef } from "react";
import { Coins, ArrowUpRight, Sparkles } from "lucide-react";
import { getUserCredits } from "@/lib/api/credits";
import Link from "next/link";

const POLL_INTERVAL = 5000; // Refresh every 5 seconds for real-time updates

export function CreditBadge({ className = "" }: { className?: string }) {
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastCredits, setLastCredits] = useState<number | null>(null);
  const [justChanged, setJustChanged] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevCreditsRef = useRef<number | null>(null);

  const fetchCredits = async () => {
    try {
      setError(null);
      const data = await getUserCredits();
      const newCredits = data.credits;
      
      if (prevCreditsRef.current !== null && newCredits !== prevCreditsRef.current) {
        setJustChanged(true);
        setTimeout(() => setJustChanged(false), 2000);
      }
      
      prevCreditsRef.current = newCredits;
      setLastCredits(credits);
      setCredits(newCredits);
    } catch {
      setError("Failed to load credits");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
    const interval = setInterval(fetchCredits, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 ${className}`}>
        <Coins className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
        <span className="text-xs font-medium text-amber-600 dark:text-amber-400">...</span>
      </div>
    );
  }

  const hasChanged = lastCredits !== null && credits !== lastCredits;
  const isIncreased = credits !== null && lastCredits !== null && credits > lastCredits;

  return (
    <Link href="/credits" className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 ${
      justChanged
        ? "bg-green-500/10 border-green-400 dark:border-green-600 scale-105"
        : error
          ? "bg-red-500/10 border-red-300 dark:border-red-700"
          : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600"
    } ${className}`}>
      <Coins className={`h-3.5 w-3.5 transition-colors ${
        justChanged ? "text-green-500 animate-bounce" :
        error ? "text-red-500" : "text-amber-500"
      }`} />
      <span className={`text-xs font-bold transition-all ${
        justChanged ? "text-green-700 dark:text-green-400" :
        error ? "text-red-600 dark:text-red-400" : "text-amber-700 dark:text-amber-400"
      }`}>
        {credits?.toLocaleString() ?? 0}
      </span>
      {justChanged && (
        <Sparkles className="h-3 w-3 text-green-500 animate-spin" />
      )}
      {hasChanged && !justChanged && (
        <ArrowUpRight className={`h-3 w-3 transition-colors ${isIncreased ? "text-green-500" : "text-red-500"}`} />
      )}
      {!hasChanged && !justChanged && (
        <ArrowUpRight className="h-3 w-3 text-amber-500/60" />
      )}
      {error && (
        <span className="text-[9px] text-red-500 ml-1">!</span>
      )}
    </Link>
  );
}
