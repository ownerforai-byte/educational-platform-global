"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * AuthField — the reference sign-in input (owner 2026-11-09, "make the sign in
 * like this … and for password also"): a rounded box with a leading icon whose
 * label floats onto the border in crimson the moment the field is focused or
 * filled, and whose placeholder changes with it ("Email Address" →
 * "Enter Email Address"). One field component serves email AND password.
 */
export function AuthField({
  label,
  placeholder,
  activePlaceholder,
  value,
  onChange,
  type = "text",
  id,
  autoComplete,
  required,
  minLength,
  maxLength,
  icon,
  trailing,
}: {
  /** Visible field label — floats onto the border once the field is active. */
  label: string;
  /** Placeholder while idle (before focus). */
  placeholder: string;
  /** Placeholder once the label floats (focused or filled). */
  activePlaceholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  id?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  /** Leading icon (mail, lock …). */
  icon?: ReactNode;
  /** Right-hand control (the show/hide password toggle). */
  trailing?: ReactNode;
}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div
      className={cn(
        "relative flex h-14 items-center gap-3 rounded-2xl border bg-background px-4 transition-colors",
        focused
          ? "border-[#D2223D] shadow-[0_0_0_3px_rgba(210,34,61,0.12)]"
          : "border-border",
      )}
    >
      {icon ? <span className="flex shrink-0 text-muted-foreground">{icon}</span> : null}
      <label
        htmlFor={fieldId}
        className={cn(
          "pointer-events-none absolute top-0 -translate-y-1/2 bg-background px-1.5 text-[11px] font-semibold transition-opacity",
          floated ? "text-[#D2223D] opacity-100" : "opacity-0",
          icon ? "left-12" : "left-4",
        )}
      >
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={floated ? activePlaceholder ?? placeholder : placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/80"
      />
      {trailing}
    </div>
  );
}
