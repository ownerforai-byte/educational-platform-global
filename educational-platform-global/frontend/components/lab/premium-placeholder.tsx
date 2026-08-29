"use client";

import { ReactNode } from "react";
import { Construction, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LabCard } from "@/components/lab/lab-card";

/**
 * PremiumPlaceholder — shown for premium labs that have been unlocked but
 * whose full simulation is still under construction. Keeps the premium tier
 * turning up real content (never a blank screen) even before every app ships.
 */
export function PremiumPlaceholder({
  title,
  icon,
  description,
  className,
}: {
  title: string;
  icon?: ReactNode;
  description: string;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <LabCard title={title} icon={icon} description={description}>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted/30">
              <Crown className="h-7 w-7 text-amber-500" />
            </span>
            <div>
              <p className="flex items-center justify-center gap-2 text-sm font-semibold">
                <Construction className="h-4 w-4 text-amber-500" />
                Lab under construction
              </p>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                You&apos;ve unlocked this premium lab! The full interactive simulation is being
                built and will appear here. Your credits are safely spent — nothing more is required.
              </p>
            </div>
          </CardContent>
        </Card>
      </LabCard>
    </div>
  );
}