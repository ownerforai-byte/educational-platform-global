/**
 * Earthworm digestive system — the alimentary canal from mouth to anus with
 * the specialised chambers labelled. Theme-aware via currentColor.
 */
export function EarthwormDigestive({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Alimentary canal of earthworm drawn horizontally showing mouth, buccal cavity, pharynx, oesophagus, gizzard, stomach, intestine with typhlosole and rectum ending at anus">
      {/* body outline */}
      <rect x="30" y="60" width="590" height="150" rx="75" className="fill-current text-rose-500/5" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.6)" }} />
      <text x="280" y="52" fontSize="13" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">Earthworm (Pheretima) — alimentary canal</text>

      {/* canal segments */}
      <g>
        {/* mouth + buccal cavity */}
        <circle cx="66" cy="135" r="14" className="fill-current text-slate-600/40" strokeWidth="2" stroke="currentColor" />
        <text x="40" y="108" fontSize="10.5" className="fill-current text-foreground" fontWeight="700">Mouth (1–3)</text>
        <rect x="80" y="122" width="46" height="26" rx="8" className="fill-current text-sky-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.8)" }} />
        <text x="76" y="172" fontSize="10.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">Buccal cavity (3–4)</text>

        {/* pharynx */}
        <ellipse cx="162" cy="135" rx="30" ry="24" className="fill-current text-violet-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.85)" }} />
        <text x="128" y="96" fontSize="10.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">Pharynx (4–6) — sucking + saliva</text>

        {/* oesophagus */}
        <rect x="192" y="126" width="60" height="18" rx="6" className="fill-current text-slate-500/20" strokeWidth="2" stroke="currentColor" />
        <text x="186" y="176" fontSize="10.5" className="fill-current text-muted-foreground" fontWeight="700">Oesophagus (6–8)</text>

        {/* gizzard */}
        <circle cx="286" cy="135" r="24" className="fill-current text-orange-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(249 115 22 / 0.9)" }} />
        <text x="258" y="96" fontSize="10.5" className="fill-current text-orange-600 dark:text-orange-400" fontWeight="700">Gizzard (9–10) — grinds food</text>

        {/* stomach */}
        <rect x="316" y="124" width="60" height="22" rx="8" className="fill-current text-teal-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.85)" }} />
        <text x="312" y="176" fontSize="10.5" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="700">Stomach (11–14) — calciferous glands neutralise humic acid</text>

        {/* intestine with typhlosole */}
        <rect x="382" y="112" width="200" height="46" rx="14" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.85)" }} />
        <line x1="400" y1="118" x2="560" y2="118" strokeWidth="0" />
        <path d="M400 135 q90 -14 180 0 q-90 8 -180 0" fill="currentColor" style={{ color: "rgb(5 150 105 / 0.5)" }} />
        <text x="396" y="96" fontSize="10.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">Intestine (15–last) — digestion + absorption; typhlosole (dorsal fold) doubles surface</text>

        {/* rectum + anus */}
        <rect x="588" y="122" width="26" height="26" rx="6" className="fill-current text-slate-500/25" strokeWidth="2" stroke="currentColor" />
        <text x="576" y="176" fontSize="10.5" className="fill-current text-muted-foreground" fontWeight="700">Rectum → Anus</text>
      </g>

      {/* flow arrows */}
      <g className="fill-current text-foreground">
        <polygon points="78,131 90,135 78,139" />
        <polygon points="186,131 198,135 186,139" />
        <polygon points="258,131 270,135 258,139" />
        <polygon points="312,131 324,135 312,139" />
        <polygon points="376,131 388,135 376,139" />
        <polygon points="578,131 590,135 578,139" />
      </g>

      <text x="30" y="244" fontSize="10" className="fill-current text-muted-foreground">Flow: mouth → buccal cavity → pharynx → oesophagus → gizzard → stomach → intestine → rectum → anus. Typhlosolar intestine (26–95) is the chief absorption zone; chloragogen cells of the intestine store glycogen and deaminate proteins.</text>
      <text x="30" y="262" fontSize="10" className="fill-current text-muted-foreground">Nutrition: humus ingested with soil; digestion is extracellular; absorbed food passes into the blood via the intestinal plexus.</text>
    </svg>
  );
}
