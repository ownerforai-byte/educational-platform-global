"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, THEME_OPTIONS, Theme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { Palette, Check, Sun, Moon, Sparkles, ChevronDown } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button with Active Theme Color Swatch */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 h-8 px-2 rounded-xl border border-border/70 bg-card hover:bg-muted/80 text-foreground transition-all text-xs font-semibold shadow-sm"
        title="Choose Theme Palette"
        aria-label="Choose Theme Palette"
      >
        <span
          className="h-3 w-3 rounded-full border border-black/20 shadow-xs shrink-0"
          style={{ backgroundColor: activeOption.colors.primary }}
        />
        <Palette className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="hidden xl:inline text-[11px] max-w-[80px] truncate">
          {activeOption.label}
        </span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      {/* Palette Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-72 rounded-2xl border border-border/80 bg-card p-2 shadow-2xl animate-fade-in space-y-1">
          <div className="px-2.5 py-1.5 border-b border-border/50 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Theme Studio</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              8 Themes
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-1 pr-0.5 py-1">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
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
