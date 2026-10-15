import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { StarField } from "@/components/theme/star-field";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { CreditProvider } from "@/features/credits";
import { ServiceWorkerRegistrar } from "@/components/pwa/service-worker-registrar";
import { RouteScrollReset } from "@/components/navigation/route-scroll-reset";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import { RawEventRejectionGuard } from "@/components/dev/raw-event-rejection-guard";
import { DevContrastAudit } from "@/lib/color-contrast";
import { AIWidget } from "@/components/layout/ai-widget";
import { FocusTimer } from "@/components/r1/focus-timer";
import { SiteWelcome } from "@/components/layout/site-welcome";

const THEME_BOOTSTRAP = `(function(){try{var c=document.documentElement,s=localStorage.getItem("neb-theme"),t=s||"nebula",m={light:0,sepia:0,system:window.matchMedia("(prefers-color-scheme: dark)").matches?1:0,dark:1,cyberpunk:1,emerald:1,nord:1,amber:1,oled:1,nebula:1};if(!(t in m))t="nebula";var d=!!m[t],n=navigator.connection,l=localStorage.getItem("neb-lite-mode");if(l===null)l=String(!!(n&&(n.saveData||n.effectiveType==="2g"||n.effectiveType==="slow-2g")));c.classList.add(d?"dark":"light",t);c.dataset.theme=t;c.dataset.lite=l;c.style.colorScheme=d?"dark":"light"}catch(e){}})();`;

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
    <meta name="theme-color" content="#3b82f6" />
    <script
      id="theme-bootstrap"
      dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }}
    />
    <link rel="manifest" href="/manifest.json" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Ravikisan's Platform" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
  </head>
      <body className="min-h-screen bg-background text-foreground antialiased bg-mesh">
        <QueryProvider>
          <ThemeProvider defaultTheme="nebula" storageKey="neb-theme">
            <StarField />
            <AuthProvider>
              <CreditProvider>
                <RawEventRejectionGuard />
                <ServiceWorkerRegistrar />
                {/* Every route change starts at the header, not the footer. */}
                <RouteScrollReset />
                <OfflineBanner />
                {/* Task 2: dev-only WCAG contrast audit — logs theme/pair/ratio warnings. */}
                {process.env.NODE_ENV !== "production" && <DevContrastAudit />}
                {children}
                {/* Floating AI chat — the full chat lives in its own panel (owner rule):
                    history, colorful typing dots and the green live dot all ride along. */}
                <AIWidget />
                {/* R1 focus timer — sits above the AI widget, owner/granted only
                    (renders null for everyone else). */}
                <FocusTimer />
                {/* Site-wide greeting — greets every visitor (public or
                    signed-in) once when they open the site, then removes
                    itself after 5 seconds. */}
                <SiteWelcome />
              </CreditProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
