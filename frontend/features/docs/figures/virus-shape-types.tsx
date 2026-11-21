/**
 * Virus shape types — helical (TMV), icosahedral (adenovirus),
 * enveloped (influenza), complex (T4 phage). Theme-aware.
 */
export function VirusShapeTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Four virus architecture types: helical TMV rod, icosahedral adenovirus, enveloped influenza sphere with spikes and complex T4 bacteriophage">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Virus architectures — four ways to pack a genome</text>

      {/* helical */}
      <g>
        <path d="M60 80 q12 -10 24 0 q12 10 24 0 q12 -10 24 0 q12 10 24 0 q12 -10 24 0" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-current text-emerald-500/30" />
        <path d="M60 80 q12 -10 24 0 q12 10 24 0 q12 -10 24 0 q12 10 24 0 q12 -10 24 0" fill="none" strokeWidth="2.5" className="stroke-current text-emerald-600" />
        <text x="110" y="120" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">HELICAL (TMV)</text>
        <text x="110" y="134" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">RNA coiled in a rod of capsomeres</text>
      </g>

      {/* icosahedral */}
      <g>
        <polygon points="300,52 330,68 330,100 300,116 270,100 270,68" className="fill-current text-sky-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.95)" }} />
        <polygon points="300,66 316,76 316,92 300,102 284,92 284,76" fill="none" strokeWidth="1.5" className="stroke-current text-sky-400" />
        <text x="300" y="140" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">ICOSAHEDRAL (adenovirus)</text>
        <text x="300" y="154" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">20 triangular faces — most efficient shell</text>
      </g>

      {/* enveloped */}
      <g>
        <circle cx="480" cy="84" r="32" className="fill-current text-rose-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.95)" }} />
        <g className="stroke-current text-rose-400" strokeWidth="2.5">
          <line x1="480" y1="52" x2="480" y2="40" /><line x1="456" y1="60" x2="448" y2="50" /><line x1="504" y1="60" x2="512" y2="50" /><line x1="448" y1="92" x2="438" y2="98" /><line x1="512" y1="92" x2="522" y2="98" />
        </g>
        <text x="480" y="140" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">ENVELOPED (influenza, HIV)</text>
        <text x="480" y="154" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">stolen membrane + spikes → entry keys</text>
      </g>

      {/* complex */}
      <g>
        <polygon points="80,180 104,194 104,220 80,234 56,220 56,194" className="fill-current text-violet-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.95)" }} />
        <rect x="76" y="234" width="8" height="22" rx="3" className="fill-current text-violet-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.95)" }} />
        <g className="stroke-current text-violet-600" strokeWidth="2">
          <line x1="80" y1="256" x2="64" y2="272" /><line x1="80" y1="256" x2="96" y2="272" /><line x1="80" y1="256" x2="80" y2="274" />
        </g>
        <text x="80" y="292" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">COMPLEX (T4 phage)</text>
        <text x="230" y="216" fontSize="9" className="fill-current text-muted-foreground">head + tail + tail fibres —</text>
        <text x="230" y="230" fontSize="9" className="fill-current text-muted-foreground">a syringe, not a shape</text>
      </g>

      <text x="400" y="216" fontSize="10" className="fill-current text-muted-foreground">All share: nucleic acid core (DNA or RNA, never both) + protein capsid.</text>
      <text x="400" y="232" fontSize="10" className="fill-current text-muted-foreground">Size 20–300 nm — smaller than the wavelength of light.</text>
      <text x="400" y="248" fontSize="10" className="fill-current text-muted-foreground">Classification = genome type + shape + host.</text>
    </svg>
  );
}
