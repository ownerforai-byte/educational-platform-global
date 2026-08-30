import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "Manim Educativo — Interactive NEB Learning",
  description: "Interactive 3D math, physics, chemistry and biology visualizations for NEB +2 students in Nepal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <QueryProvider>
          <ThemeProvider defaultTheme="dark" storageKey="neb-theme">
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}