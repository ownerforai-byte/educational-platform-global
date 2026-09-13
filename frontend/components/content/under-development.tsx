import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, Clock, Compass, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface UnderDevelopmentProps {
  title?: string;
  description?: string;
  timeline?: string;
  variant?: "construction" | "clock";
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  showFallbackLinks?: boolean;
}

export function UnderDevelopment({
  title = "Under Development",
  description = "This section is actively being developed and curated according to the official curriculum.",
  timeline,
  variant = "construction",
  action,
  showFallbackLinks = true,
}: UnderDevelopmentProps) {
  const Icon = variant === "construction" ? Construction : Clock;

  return (
    <Card className="border-dashed border-2 border-amber-500/30 bg-amber-500/5 overflow-hidden">
      <CardContent className="py-10 px-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="icon-badge inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
            <Icon className="h-7 w-7" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1.5">
          🚧 {title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {description}
        </p>
        {timeline && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
            📅 Expected: {timeline}
          </p>
        )}

        {action && (
          <div className="mt-5">
            {action.href ? (
              <Link href={action.href}>
                <Button size="sm" className="rounded-xl">
                  {action.label}
                </Button>
              </Link>
            ) : action.onClick ? (
              <Button size="sm" onClick={action.onClick} className="rounded-xl">
                {action.label}
              </Button>
            ) : null}
          </div>
        )}

        {showFallbackLinks && !action && (
          <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Continue learning with:</span>
            <Link href="/class-11-notes">
              <Button variant="outline" size="sm" className="text-xs h-8 rounded-lg gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> Class 11 Notes
              </Button>
            </Link>
            <Link href="/class-12-notes">
              <Button variant="outline" size="sm" className="text-xs h-8 rounded-lg gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> Class 12 Notes
              </Button>
            </Link>
            <Link href="/subjects">
              <Button variant="outline" size="sm" className="text-xs h-8 rounded-lg gap-1.5">
                <Compass className="h-3.5 w-3.5" /> All Subjects
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
