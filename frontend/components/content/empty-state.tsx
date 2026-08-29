import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  title = "Nothing here yet",
  description,
}: {
  title?: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="py-10 text-center">
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
