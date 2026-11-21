// Fine structure — one Bohr line resolving into a doublet. Theme-aware.
export function FineStructureSplit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Single Bohr spectral line resolving into a close doublet under a high resolution spectrograph showing fine structure from spin and relativistic effects">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fine structure — Bohr predicts one line, nature shows two</text>
      <rect x="40" y="50" width="270" height="70" rx="8" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 120 130 / 0.7)" }} />
      <line x1="175" y1="50" x2="175" y2="120" className="stroke-current text-sky-500" strokeWidth="6" style={{ color: "rgb(14 165 233 / 0.95)" }} />
      <text x="175" y="140" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Bohr's prediction: one line</text>
      <text x="175" y="155" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">single n → n jump, single wavelength</text>
      <rect x="410" y="50" width="270" height="70" rx="8" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 120 130 / 0.7)" }} />
      <line x1="528" y1="50" x2="528" y2="120" className="stroke-current text-violet-500" strokeWidth="5" style={{ color: "rgb(139 92 246 / 0.95)" }} />
      <line x1="562" y1="50" x2="562" y2="120" className="stroke-current text-violet-500" strokeWidth="5" style={{ color: "rgb(139 92 246 / 0.75)" }} />
      <text x="545" y="140" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">High-resolution spectrograph: a doublet</text>
      <text x="545" y="155" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">spin (mₛ) + relativistic shifts split every level slightly</text>
      <rect x="30" y="168" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="184" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Hα (656.3 nm) resolves into a close pair — fine structure needs the l and s quantum numbers Bohr never had.</text>
    </svg>
  );
}
