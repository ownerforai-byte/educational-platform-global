// Shielding layers around the nucleus. Theme-aware.
export function ShieldingLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Shielding layers inner shell electrons between nucleus and outer electron reducing effective nuclear charge sodium example with eleven protons ten inner electrons">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Screening — inner electrons blur the nucleus</text>
      <circle cx="250" cy="120" r="46" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <circle cx="250" cy="120" r="78" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 4" style={{ color: "rgb(16 185 129 / 0.8)" }} />
      <circle cx="250" cy="120" r="6" className="fill-current text-rose-500" style={{ color: "rgb(244 63 94 / 0.95)" }} />
      <text x="250" y="146" fontSize="8" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">nucleus +11</text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={250 + 46 * Math.cos(a)} cy={120 + 46 * Math.sin(a)} r="3.4" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.9)" }} />;
      })}
      {[1, 3, 5, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2 + 0.4;
        return <circle key={i} cx={250 + 78 * Math.cos(a)} cy={120 + 78 * Math.sin(a)} r="3.4" className="fill-current text-emerald-500" style={{ color: "rgb(16 185 129 / 0.9)" }} />;
      })}
      <circle cx={250 + 100} cy="120" r="5" className="fill-current text-amber-500" style={{ color: "rgb(245 158 11 / 0.95)" }} />
      <text x={356} y="106" fontSize="8" className="fill-current text-amber-600" fontWeight="800">outer 3s electron</text>
      <text x="250" y="216" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Na: 10 inner electrons (1s² 2s² 2p⁶) stand in front of the +11 nucleus → the 3s electron feels only ≈ +1.</text>
      <rect x="450" y="60" width="240" height="110" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="570" y="84" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Two directions to remember</text>
      <text x="570" y="108" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Across a period: shielding ~constant,</text>
      <text x="570" y="126" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Z_eff climbs → atoms shrink.</text>
      <text x="570" y="150" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Down a group: shells add, shielding</text>
      <text x="570" y="166" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">wins → atoms swell.</text>
    </svg>
  );
}
