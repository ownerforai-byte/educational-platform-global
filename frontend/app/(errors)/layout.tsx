import Link from "next/link";
import { PLATFORM_DISPLAY_NAME } from "@/lib/core/platform-brand";

/** Static error routes render outside the app shell — light brand chrome only. */
export default function ErrorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border/60 bg-card/50 px-4 py-3 backdrop-blur-sm sm:px-6">
        <Link
          href="/home"
          className="text-sm font-semibold tracking-tight text-foreground hover:text-primary"
        >
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