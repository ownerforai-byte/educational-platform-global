import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "Ravikisan's Platform — NEB (+2) Learning Platform",
  description: "Syllabus-first learning for NEB +2 students in Nepal. Notes, mind maps, interactive labs, and PYQs aligned to the official curriculum.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased bg-mesh">
        <QueryProvider>
          <ThemeProvider defaultTheme="system" storageKey="neb-theme">
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
