import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function Class11MorePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">Class 11 More</h1>
        <p className="mt-2 text-muted-foreground">
          Additional resources and supplementary content for Class 11.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/class-11-more/biology">
          <Card className="h-full transition-colors hover:border-primary">
            <CardHeader>
              <CardTitle>Biology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Biology content for Class 11 More.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/class-11-more/chemistry">
          <Card className="h-full transition-colors hover:border-primary">
            <CardHeader>
              <CardTitle>Chemistry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Chemistry content for Class 11 More.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/class-11-more/english">
          <Card className="h-full transition-colors hover:border-primary">
            <CardHeader>
              <CardTitle>English</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                English content for Class 11 More.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/class-11-more/mathematics">
          <Card className="h-full transition-colors hover:border-primary">
            <CardHeader>
              <CardTitle>Mathematics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Mathematics content for Class 11 More.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/class-11-more/nepali">
          <Card className="h-full transition-colors hover:border-primary">
            <CardHeader>
              <CardTitle>Nepali</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Nepali content for Class 11 More.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/class-11-more/physics">
          <Card className="h-full transition-colors hover:border-primary">
            <CardHeader>
              <CardTitle>Physics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Physics content for Class 11 More.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
