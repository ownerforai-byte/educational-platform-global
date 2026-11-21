/** Spore print — field ID technique. Well-detailed. Theme-aware. */
export function MushroomSporePrintSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Spore print technique steps cut cap place gills down on paper cover with glass wait hours lift cap spore print colour pattern white brown purple black identifies species">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Spore print — a mushroom's fingerprint</text>

      {/* step 1 */}
      <rect x="30" y="44" width="150" height="120" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="105" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">1. CUT THE CAP</text>
      <path d="M70 110 q35 -34 70 0 q-14 8 -35 8 q-21 0 -35 -8" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <line x1="105" y1="118" x2="105" y2="140" strokeWidth="4" className="stroke-current text-stone-400" />

      {/* step 2 */}
      <rect x="195" y="44" width="150" height="120" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="270" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2. GILLS DOWN</text>
      <rect x="215" y="100" width="110" height="40" rx="4" className="fill-current text-stone-100/60" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(231 229 228 / 0.9)" }} />
      <path d="M230 100 q25 -18 50 0 q25 18 50 0" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="270" y="156" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">on white + black paper halves</text>

      {/* step 3 */}
      <rect x="360" y="44" width="150" height="120" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="435" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">3. COVER + WAIT</text>
      <path d="M390 130 q45 -46 90 0" className="fill-none stroke-current text-sky-500" strokeWidth="3" />
      <text x="435" y="100" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">glass dome, 4–12 h</text>
      <text x="435" y="150" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">spores drop in silence</text>

      {/* step 4 */}
      <rect x="525" y="44" width="165" height="120" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="607" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">4. LIFT THE CAP</text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={545 + i * 16} y1="95" x2={552 + i * 16} y2="140" strokeWidth="4" className="stroke-current text-violet-600" opacity={0.8 - i * 0.04} />
      ))}
      <text x="607" y="156" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">radial spore pattern = the print</text>

      {/* colour key */}
      <rect x="30" y="184" width="660" height="100" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="50" y="208" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">COLOUR SEPARATES SPECIES: white (Amanita, Agaricus) · pink (Entoloma) · brown (Boletus) · purple-brown (Agaricus campestris) · black (Coprinus).</text>
      <text x="50" y="232" fontSize="7.8" className="fill-current text-muted-foreground">Two mushrooms can look identical above ground yet leave different prints — spore colour is a primary ID character.</text>
      <text x="50" y="256" fontSize="7.6" className="fill-current text-muted-foreground">Exam hook: spore print = colour + pattern of fallen spores; used with gill attachment and stem characters.</text>
      <text x="50" y="276" fontSize="7.4" className="fill-current text-muted-foreground">Safety: never identify edibles by colour alone — chemical tests and expert confirmation are essential.</text>
    </svg>
  );
}
