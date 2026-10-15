"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, THEME_OPTIONS } from "@/components/theme/theme-provider";
import { Palette, Check, Sparkles, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  /** "dropdown" is the compact header/icon picker; "inline" displays in-drawer or sidebar tools */
  variant?: "dropdown" | "inline";
  compact?: boolean;
  className?: string;
  showLabel?: boolean;
  ariaLabel?: string;
}

export function ThemeToggle({
  variant = "dropdown",
  compact = false,
  className,
  showLabel = true,
  ariaLabel,
}: ThemeToggleProps) {
  const { theme, setTheme, liteMode, setLiteMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (variant === "inline") {
    return (
      <div className={cn("space-y-2 rounded-xl border border-border/70 bg-card/60 p-3", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Theme &amp; Appearance</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">{activeOption.label}</span>
        </div>

        {/* Lite Mode switch button */}
        <button
          type="button"
          role="switch"
          aria-checked={liteMode}
          aria-label="Lite mode"
          onClick={() => setLiteMode(!liteMode)}
          className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-background/70 px-2.5 py-1.5 text-left transition-colors hover:bg-muted/60"
        >
          <span className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-foreground">Lite mode (low data)</span>
          </span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[9px] font-bold",
              liteMode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {liteMode ? "On" : "Off"}
          </span>
        </button>

        {/* Horizontal Theme Color Badges / Buttons */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {THEME_OPTIONS.map((opt) => {
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-1.5 text-left text-[11px] transition-all",
                  isSelected
                    ? "border-primary/50 bg-primary/10 font-bold text-primary shadow-xs"
                    : "border-border/60 bg-background/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/20"
                  style={{ backgroundColor: opt.colors.primary }}
                />
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="ml-auto h-3 w-3 shrink-0 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button with Active Theme Color Swatch */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={compact
          ? "flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card text-foreground shadow-sm transition-all hover:bg-muted/80"
          : cn("flex items-center gap-1.5 h-8 px-2 rounded-xl border border-border/70 bg-card hover:bg-muted/80 text-foreground transition-all text-xs font-semibold shadow-sm", className)}
        title={ariaLabel ?? (compact ? "Choose Theme Palette" : "Choose appearance and data-saving settings")}
        aria-label={ariaLabel ?? (compact ? "Choose Theme Palette" : "Choose appearance and data-saving settings")}
        aria-expanded={isOpen}
      >
        <span
          className="h-3 w-3 rounded-full border border-black/20 shadow-xs shrink-0"
          style={{ backgroundColor: activeOption.colors.primary }}
        />
        <Palette className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        {!compact && showLabel && (
          <span className="truncate text-[11px] max-w-[80px]">
            {activeOption.label}
          </span>
        )}
        {!compact && <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />}
      </button>

      {/* Palette Dropdown Menu */}
      {isOpen && (
        <div className={compact
          ? "absolute left-full top-0 z-50 ml-2 w-72 rounded-2xl border border-border/80 bg-card p-2 shadow-2xl animate-fade-in space-y-1"
          : "absolute left-0 top-full z-50 mt-2 w-full min-w-64 rounded-2xl border border-border/80 bg-card p-2 shadow-2xl animate-fade-in space-y-1"}>
          <div className="px-2.5 py-1.5 border-b border-border/50 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Theme</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              Appearance &amp; speed
            </span>
          </div>

          <div className="border-b border-border/50 px-2 py-2">
            <button
              type="button"
              role="switch"
              aria-checked={liteMode}
              aria-label="Lite mode"
              onClick={() => setLiteMode(!liteMode)}
              className="flex w-full items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-left hover:bg-muted/60"
            >
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-bold text-foreground">Lite mode</span>
                  <span className="block text-[10px] text-muted-foreground">Less data, fewer visual effects</span>
                </span>
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${liteMode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {liteMode ? "On" : "Off"}
              </span>
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-1 pr-0.5 py-1">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Visual Color Preview Swatch */}
                    <div
                      className="h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 shadow-sm"
                      style={{
                        backgroundColor: opt.colors.bg,
                        borderColor: opt.colors.border,
                      }}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: opt.colors.primary }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-foreground truncate">
                          {opt.label}
                        </span>
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-muted text-muted-foreground">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {opt.description}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
