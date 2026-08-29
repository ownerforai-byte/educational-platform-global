"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LabSectionCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function LabSectionCard({ title, description, icon, children, className, headerClassName, contentClassName }: LabSectionCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className={cn("pb-3", headerClassName)}>
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg sm:text-xl">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="break-words">{title}</span>
        </CardTitle>
        {description && <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>}
      </CardHeader>
      <CardContent className={cn("space-y-4", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
