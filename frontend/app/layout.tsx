import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
// KaTeX styles (and its fonts) must be global so every math surface — Veer
// chat, notes, lessons, quizzes — renders LaTeX identically everywhere.
import "katex/dist/katex.min.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { CreditProvider } from "@/features/credits";
import { ServiceWorkerRegistrar } from "@/components/pwa/service-worker-registrar";
import { FcmNotificationListener } from "@/lib/fcm/notification-listener";
import { RouteScrollReset } from "@/components/navigation/route-scroll-reset";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import { RawEventRejectionGuard } from "@/components/dev/raw-event-rejection-guard";
import { DevContrastAudit } from "@/lib/color-contrast";
import { FocusTimer } from "@/components/owner/focus-timer";
import { Toaster } from "sonner";
import { StarField } from "@/components/theme/star-field";
import {
  SITE_OG_IMAGE_URL,
} from "@/lib/site-assets";
import { CANONICAL_SITE_URL } from "@/lib/site-url";

const SITE_NAME = "Ravikisan's Platform";
const SITE_DESCRIPTION =
  "Syllabus-first learning for NEB +2 students in Nepal. Notes, mind maps, interactive labs, and PYQs aligned to the official curriculum.";

export const metadata: Metadata = {
  // metadataBase resolves every relative OG/canonical URL — without it, share
  // previews on Messenger/WhatsApp/Twitter render broken or missing images.
  metadataBase: new URL(CANONICAL_SITE_URL),
  // Plain string — most pages already carry the "… | Ravikisan's Platform"
  // suffix themselves, so no title template here (it would double it).
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.json",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: SITE_OG_IMAGE_URL, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE_URL],
  },
  // Favicon + Apple touch icon come from the file conventions
  // (app/icon.png, app/apple-icon.png) — square PNGs, no duplication.
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
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
  </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider defaultTheme="system" storageKey="neb-theme">
          <StarField />
          <AuthProvider>
            <CreditProvider>
              <RawEventRejectionGuard />
              <ServiceWorkerRegistrar />
              <FcmNotificationListener />
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
      </body>
    </html>
  );
}
