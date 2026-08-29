"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Settings2 } from "lucide-react";

type CollapsibleControlsProps = {
  label?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function CollapsibleControls({
  label = "Options",
  children,
  defaultOpen = false,
  className = "",
}: CollapsibleControlsProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`space-y-2 ${className}`}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5"
        aria-expanded={open}
      >
        {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        <Settings2 className="h-3.5 w-3.5" />
        {label}
      </Button>
      {open && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  );
}