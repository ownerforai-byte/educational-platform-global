// MimicryPanel figure. Theme-aware.
export function MimicryPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lead mimicking calcium and cadmium mimicking zinc in biological systems">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Mechanism 2: mimicry — the wrong ion in the right seat</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Pb²⁺ imitates Ca²⁺</text>
      <text x="180" y="110" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">same +2 charge, similar size</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">→ deposits in bone</text>
      <text x="180" y="154" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">→ blocks haem-synthesis enzymes</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(20 184 166)" opacity="0.1" stroke="rgb(20 184 166)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cd²⁺ imitates Zn²⁺</text>
      <text x="480" y="110" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">same group IIB</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">→ occupies Zn enzyme sites</text>
      <text x="480" y="154" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">→ but cannot do zinc's chemistry</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">They need not be abundant — only similar. That is why traces poison</text>
    </svg>
  );
}
