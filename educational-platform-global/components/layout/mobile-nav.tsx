"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FlaskConical,
  Layers,
} from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full w-64 border-r border-border bg-background p-4">
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                ×
              </Button>
            </div>
            <nav className="mt-4 flex flex-col gap-2">
              <Link href="/subjects" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm hover:text-primary">
                <Layers className="h-4 w-4" /> Subjects
              </Link>
              <Link href="/levels" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm hover:text-primary">
                <BookOpen className="h-4 w-4" /> Curriculum
              </Link>
              <Link href="/lab" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm hover:text-primary">
                <FlaskConical className="h-4 w-4" /> Lab
              </Link>
              <Link href="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm hover:text-primary">
                Login
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
