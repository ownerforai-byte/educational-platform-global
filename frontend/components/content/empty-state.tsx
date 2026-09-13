import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Inbox } from "lucide-react";
import React from "react";

export interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  children?: React.ReactNode;
}

export function EmptyState({
  title = "Nothing here yet",
  description,
  icon,
  action,
  children,
}: EmptyStateProps) {
  return (
    <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/80 text-muted-foreground mb-4">
          {icon ?? <Inbox className="h-6 w-6" />}
        </div>
        <h3 className="font-semibold text-foreground text-base">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-md leading-relaxed">{description}</p>

        {action && (
          <div className="mt-5">
            {action.href ? (
              <Link href={action.href}>
                <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                  {action.label}
                </Button>
              </Link>
            ) : action.onClick ? (
              <Button variant="outline" size="sm" onClick={action.onClick} className="gap-2 rounded-xl">
                {action.label}
              </Button>
            ) : null}
          </div>
        )}

        {children && <div className="mt-5">{children}</div>}
      </CardContent>
    </Card>
  );
}
