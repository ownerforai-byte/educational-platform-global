import Link from "next/link";
import { Leaf } from "lucide-react";
import { PLATFORM_DISPLAY_NAME } from "@/lib/core/platform-brand";

/** Static error routes render outside the app shell — light brand chrome only. */
export default function ErrorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border/60 bg-card/50 px-4 py-3 backdrop-blur-sm sm:px-6">
        <Link
          href="/home"
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-foreground hover:text-primary"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-600/20"
          >
            <Leaf className="h-4 w-4" />
          </span>
          {PLATFORM_DISPLAY_NAME}
        </Link>
        <nav aria-label="Error page shortcuts" className="flex items-center gap-4 text-sm">
          <Link href="/help" className="font-medium text-muted-foreground hover:text-foreground">
            Help
          </Link>
          <Link href="/login" className="font-medium text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
        </nav>
      </header>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}