/**
 * Veer branding for the AI tutor (owner request 2026-09-28):
 *   "change the bot logo to like a captain" / "design the ai widget chat's
 *    logo also like something real".
 *
 * Two hand-drawn marks, no icon-library dependency:
 *   • CaptainAvatar — a peaked captain's cap; drops into any spot that used
 *     lucide's <Bot/> (message bubbles, chat headers). Inherits currentColor
 *     for the cap so it themes with its container; the band/badge stay gold.
 *   • CaptainMark — Veer's badge: a medallion ring holding the
 *     peaked cap over a gold anchor; used as the floating widget's real
 *     logo on its gradient button (owner 2026-09-28: "change that wheel
 *     icon to a captain logo").
 */

export function CaptainAvatar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Cap crown */}
      <path
        d="M7 16.8C7 10.6 11 6 16 6s9 4.6 9 10.8H7Z"
        fill="currentColor"
      />
      {/* Crown sheen */}
      <path
        d="M10.8 9.2c1.9-1.4 3.9-2.1 5.6-2.1 1.7 0 3.3.5 4.8 1.6"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Gold band */}
      <rect x="5.4" y="16.2" width="21.2" height="3.6" rx="1.6" fill="#fbbf24" />
      {/* Badge on the band */}
      <circle cx="16" cy="18" r="1.35" fill="currentColor" />
      {/* Visor */}
      <path
        d="M4.6 19.6c1.3 4.1 6.1 6.8 11.4 6.8s10.1-2.7 11.4-6.8c-3 1.7-7 2.7-11.4 2.7S7.6 21.3 4.6 19.6Z"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  );
}

export function CaptainMark({ className = "" }: { className?: string }) {
  // Veer's badge: medallion ring + peaked cap + gold anchor.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Medallion ring */}
      <circle cx="32" cy="32" r="28.5" stroke="currentColor" strokeWidth="3.4" />
      <circle cx="32" cy="32" r="23.5" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      {/* Peaked cap (same silhouette as CaptainAvatar, scaled into the ring) */}
      <g transform="translate(16 10) scale(1)">
        <path d="M7 16.8C7 10.6 11 6 16 6s9 4.6 9 10.8H7Z" fill="currentColor" />
        <rect x="5.4" y="16.2" width="21.2" height="3.6" rx="1.6" fill="#fbbf24" />
        <circle cx="16" cy="18" r="1.35" fill="currentColor" />
        <path
          d="M4.6 19.6c1.3 4.1 6.1 6.8 11.4 6.8s10.1-2.7 11.4-6.8c-3 1.7-7 2.7-11.4 2.7S7.6 21.3 4.6 19.6Z"
          fill="currentColor"
          opacity="0.92"
        />
      </g>
      {/* Gold anchor below the cap */}
      <g stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <circle cx="32" cy="37.4" r="2" />
        <line x1="32" y1="39.4" x2="32" y2="52" />
        <line x1="27.6" y1="43.2" x2="36.4" y2="43.2" />
        <path d="M25.8 47.6c0 4 2.8 6.6 6.2 6.6s6.2-2.6 6.2-6.6" />
      </g>
    </svg>
  );
}
