"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface LabCardProps {
  title: string;
  icon?: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function LabCard({ title, icon, description, children, className }: LabCardProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="break-words">{title}</span>
        </CardTitle>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}
