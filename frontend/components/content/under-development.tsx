import { Card, CardContent } from "@/components/ui/card";
import { Construction, Clock } from "lucide-react";

export interface UnderDevelopmentProps {
  title?: string;
  description?: string;
  timeline?: string;
  variant?: "construction" | "clock";
}

export function UnderDevelopment({
  title = "Under Development",
  description = "This section is under development and will be added in a future update.",
  timeline,
  variant = "construction",
}: UnderDevelopmentProps) {
  const Icon = variant === "construction" ? Construction : Clock;

  return (
    <Card className="border-dashed border-2 border-amber-500/30 bg-amber-500/5">
      <CardContent className="py-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="icon-badge inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border-2 border-amber-500/20 animate-pulse-subtle">
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-2">
          🚧 {title}
        </h3>
        <p className="text-sm text-amber-800/80 dark:text-amber-300/80 max-w-md mx-auto">
          {description}
        </p>
        {timeline && (
          <p className="mt-3 text-xs text-amber-700/70 dark:text-amber-400/70 font-medium">
            📅 Expected: {timeline}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
