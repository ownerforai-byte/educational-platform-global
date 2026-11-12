import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
// KaTeX styles (and its fonts) must be global so every math surface — Veer
// chat, notes, lessons, quizzes — renders LaTeX identically everywhere.
import "katex/dist/katex.min.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { CreditProvider } from "@/features/credits";
import { ServiceWorkerRegistrar } from "@/components/pwa/service-worker-registrar";
import { RouteScrollReset } from "@/components/navigation/route-scroll-reset";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import { RawEventRejectionGuard } from "@/components/dev/raw-event-rejection-guard";
import { DevContrastAudit } from "@/lib/color-contrast";
import { FocusTimer } from "@/components/owner/focus-timer";
import { Toaster } from "sonner";
import { StarField } from "@/components/theme/star-field";

export const metadata: Metadata = {
  title: "Ravikisan's Platform",
  description: "Syllabus-first learning for NEB +2 students in Nepal. Notes, mind maps, interactive labs, and PYQs aligned to the official curriculum.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ravikisan's Platform",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // No `maximumScale` — blocking pinch-zoom fails WCAG 1.4.4 (Resize Text).
  themeColor: "#3b82f6",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
    <meta name="theme-color" content="#3b82f6" />
    <Script
      id="theme-bootstrap"
      src="/theme-bootstrap.js"
      nonce={nonce}
      strategy="beforeInteractive"
    />
    <link rel="manifest" href="/manifest.json" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Ravikisan's Platform" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
  </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <QueryProvider>
          <ThemeProvider defaultTheme="system" storageKey="neb-theme">
            <StarField />
            <AuthProvider>
              <CreditProvider>
                <RawEventRejectionGuard />
                <ServiceWorkerRegistrar />
                {/* Every route change starts at the header, not the footer. */}
                <RouteScrollReset />
                <OfflineBanner />
                {/* Toast notifications (quiz studio, quiz history, …). */}
                <Toaster />
                {/* Task 2: dev-only WCAG contrast audit — logs theme/pair/ratio warnings. */}
                {process.env.NODE_ENV !== "production" && <DevContrastAudit />}
                {children}
                {/* Owner-tier focus timer — hidden for every other rung. */}
                <FocusTimer />
              </CreditProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
