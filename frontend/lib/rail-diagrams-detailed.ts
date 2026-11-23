/**
 * rail-diagrams-detailed — the "most detailed image" half of the home-rail
 * upgrade (owner request 2026-11-24): one rich, textbook-grade drawing per
 * curated card that did not already carry a figure. Same contract as
 * rail-diagrams.ts: a single self-contained `<svg>…</svg>` block that passes
 * the note-visuals guard (no script/style/defs/gradients/markers/use/external
 * refs/url(#…)/ids/on*), flat translucent fills, plain-polygon arrowheads,
 * inked on white "paper" in both themes. Google-hosted raster images cannot be
 * embedded here (the guard refuses external fetches and licensing forbids
 * hotlinking), so these drawings are authored to textbook detail instead.
 *
 * Pair every card with a hierarchical "Knowledge map" figure from
 * rail-knowledge-tree.ts — see rail-knowledge-trees.ts for the tree data.
 */

/* ─────────────── PHYSICS ─────────────── */

/** Work–energy theorem: energy bars from KE → work by friction → heat. */
export const WORK_ENERGY_STOPPING = `<svg viewBox="0 0 640 340" role="img">
  <title>Work-energy theorem applied to a braking car</title>
  <rect x="0" y="0" width="640" height="340" fill="#ffffff"/>
  <line x1="40" y1="240" x2="600" y2="240" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="70" y="196" width="90" height="44" rx="6" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
  <circle cx="92" cy="244" r="13" fill="none" stroke="#0f172a" stroke-width="2.5"/>
  <circle cx="138" cy="244" r="13" fill="none" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="30" y1="218" x2="62" y2="218" stroke="#2563eb" stroke-width="3"/>
  <polygon points="72,218 56,210 56,226" fill="#2563eb"/>
  <text x="24" y="208" font-size="13" font-weight="bold" fill="#1d4ed8">v</text>
  <line x1="170" y1="240" x2="470" y2="240" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 7"/>
  <text x="250" y="262" font-size="13" fill="#b91c1c">stopping distance d (friction does negative work)</text>
  <rect x="500" y="150" width="26" height="90" fill="rgba(37,99,235,0.35)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="513" y="140" font-size="13" font-weight="bold" text-anchor="middle" fill="#1d4ed8">KE</text>
  <rect x="536" y="196" width="26" height="44" fill="rgba(220,38,38,0.30)" stroke="#b91c1c" stroke-width="2"/>
  <text x="549" y="188" font-size="12" font-weight="bold" text-anchor="middle" fill="#b91c1c">W=f·d</text>
  <text x="60" y="66" font-size="15" font-weight="bold" fill="#0f172a">½mv² = f·d   ⇒   d = v² / (2μg)</text>
  <text x="60" y="92" font-size="12.5" fill="#475569">Double v → stopping distance ×4 (d ∝ v²), not ×2.</text>
  <text x="60" y="112" font-size="12.5" fill="#475569">Reaction distance before braking: d_r = v·t_reaction (grows linearly).</text>
  <text x="60" y="132" font-size="12.5" fill="#475569">Sloped road: d = v² / (2g(μcosθ + sinθ)) uphill — gravity helps the brake.</text>
</svg>`;

/** Gravitation: circular orbit vs escape trajectory from a planet. */
export const GRAVITATION_ORBITS = `<svg viewBox="0 0 640 340" role="img">
  <title>Orbital and escape trajectories around a planet</title>
  <rect x="0" y="0" width="640" height="340" fill="#ffffff"/>
  <circle cx="220" cy="190" r="46" fill="rgba(37,99,235,0.25)" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="220" y="196" font-size="13" font-weight="bold" text-anchor="middle" fill="#1d4ed8">M</text>
  <ellipse cx="220" cy="190" rx="110" ry="110" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="7 6"/>
  <circle cx="330" cy="190" r="7" fill="#16a34a"/>
  <text x="348" y="180" font-size="12.5" font-weight="bold" fill="#15803d">v_c = √(GM/r) — circular orbit</text>
  <path d="M 258 158 Q 420 60 590 96" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <polygon points="600,99 582,90 585,106" fill="#dc2626"/>
  <circle cx="258" cy="158" r="6" fill="#dc2626"/>
  <text x="392" y="66" font-size="12.5" font-weight="bold" fill="#b91c1c">v ≥ v_esc = √(2GM/r) — escapes, never returns</text>
  <path d="M 250 226 Q 400 300 560 286" fill="none" stroke="#c2410c" stroke-width="2.5" stroke-dasharray="9 6"/>
  <polygon points="570,285 553,279 556,294" fill="#c2410c"/>
  <circle cx="250" cy="226" r="6" fill="#c2410c"/>
  <text x="396" y="318" font-size="12.5" font-weight="bold" fill="#c2410c">v_orb &lt; v &lt; v_esc — ellipse stays bound</text>
  <text x="40" y="46" font-size="14" font-weight="bold" fill="#0f172a">g = GM/R² at the surface · T² ∝ r³ (Kepler III)</text>
  <text x="40" y="70" font-size="12.5" fill="#475569">Orbit speed is independent of the satellite's own mass.</text>
</svg>`;

/** Ohm's law with a mixed series/parallel network being reduced. */
export const OHM_NETWORK = `<svg viewBox="0 0 640 340" role="img">
  <title>Reducing a series-parallel resistor network</title>
  <rect x="0" y="0" width="640" height="340" fill="#ffffff"/>
  <rect x="60" y="70" width="520" height="220" rx="10" fill="none" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="252" y="52" width="60" height="36" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <text x="282" y="76" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">ε, r</text>
  <line x1="150" y1="70" x2="150" y2="130" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="122" y="130" width="56" height="26" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="150" y="149" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">R₁</text>
  <line x1="150" y1="156" x2="150" y2="290" stroke="#0f172a" stroke-width="2.5"/>
  <circle cx="150" cy="196" r="3.5" fill="#0f172a"/>
  <circle cx="150" cy="290" r="3.5" fill="#0f172a"/>
  <line x1="150" y1="196" x2="470" y2="196" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="330" y1="196" x2="330" y2="290" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="302" y="216" width="56" height="26" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="330" y="235" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">R₂</text>
  <line x1="470" y1="196" x2="470" y2="290" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="442" y="216" width="56" height="26" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="470" y="235" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">R₃</text>
  <text x="240" y="182" font-size="12" fill="#475569">R₂ ∥ R₃ = R₂R₃/(R₂+R₃)</text>
  <text x="60" y="326" font-size="13.5" font-weight="bold" fill="#0f172a">I = ε / (r + R₁ + R₂R₃/(R₂+R₃))   ·   V₁ = I·R₁ (divider rule)</text>
  <text x="60" y="44" font-size="12.5" fill="#475569">Drift velocity v_d = I/(nAe) — same I in series, I splits inversely to R in parallel.</text>
</svg>`;

/* ─────────────── CHEMISTRY ─────────────── */

/** Mole concept map: mass ⇄ moles ⇄ particles ⇄ gas volume. */
export const MOLE_MAP = `<svg viewBox="0 0 640 320" role="img">
  <title>The mole as the hub between mass, particles and gas volume</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <rect x="250" y="120" width="140" height="70" rx="10" fill="rgba(217,119,6,0.20)" stroke="#0f172a" stroke-width="2.5"/>
  <text x="320" y="150" font-size="16" font-weight="bold" text-anchor="middle" fill="#0f172a">n (mole)</text>
  <text x="320" y="172" font-size="12" text-anchor="middle" fill="#475569">6.022 × 10²³ units</text>
  <rect x="40" y="30" width="170" height="54" rx="8" fill="rgba(37,99,235,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="125" y="52" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">Mass m (g)</text>
  <text x="125" y="72" font-size="12" text-anchor="middle" fill="#475569">n = m / M</text>
  <rect x="430" y="30" width="170" height="54" rx="8" fill="rgba(22,163,74,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="515" y="52" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">Particles N</text>
  <text x="515" y="72" font-size="12" text-anchor="middle" fill="#475569">N = n × N_A</text>
  <rect x="40" y="230" width="170" height="54" rx="8" fill="rgba(124,58,237,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="125" y="252" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">Solution</text>
  <text x="125" y="272" font-size="12" text-anchor="middle" fill="#475569">n = C × V (L)</text>
  <rect x="430" y="230" width="170" height="54" rx="8" fill="rgba(13,148,136,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="515" y="252" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">Gas volume (STP)</text>
  <text x="515" y="272" font-size="12" text-anchor="middle" fill="#475569">V = n × 22.4 L</text>
  <line x1="150" y1="84" x2="262" y2="120" stroke="#475569" stroke-width="2"/>
  <polygon points="270,124 252,120 258,134" fill="#475569"/>
  <line x1="490" y1="84" x2="378" y2="120" stroke="#475569" stroke-width="2"/>
  <polygon points="370,124 382,134 388,120" fill="#475569"/>
  <line x1="150" y1="230" x2="262" y2="190" stroke="#475569" stroke-width="2"/>
  <polygon points="270,186 252,190 258,176" fill="#475569"/>
  <line x1="490" y1="230" x2="378" y2="190" stroke="#475569" stroke-width="2"/>
  <polygon points="370,186 388,190 382,176" fill="#475569"/>
  <text x="320" y="250" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#0f172a">molarity × volume ⇄ moles ⇄ 22.4 L at STP</text>
  <text x="320" y="300" font-size="12" text-anchor="middle" fill="#475569">Limiting reagent: divide each reactant's moles by its coefficient — smallest quotient wins.</text>
</svg>`;

/** Equilibrium: concentration–time curves and the Le Chatelier shift. */
export const EQUILIBRIUM_GRAPH = `<svg viewBox="0 0 640 330" role="img">
  <title>Reaching equilibrium and the Le Chatelier shift</title>
  <rect x="0" y="0" width="640" height="330" fill="#ffffff"/>
  <line x1="70" y1="30" x2="70" y2="280" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="70" y1="280" x2="600" y2="280" stroke="#0f172a" stroke-width="2.5"/>
  <text x="36" y="160" font-size="12" fill="#475569">[conc]</text>
  <text x="560" y="302" font-size="12" fill="#475569">time</text>
  <path d="M 70 60 Q 220 240 330 216 L 600 216" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <text x="470" y="206" font-size="12.5" font-weight="bold" fill="#b91c1c">[reactant] falls, then plateaus</text>
  <path d="M 70 270 Q 220 120 330 140 L 600 140" fill="none" stroke="#2563eb" stroke-width="2.5"/>
  <text x="470" y="130" font-size="12.5" font-weight="bold" fill="#1d4ed8">[product] rises to the same plateau time</text>
  <line x1="330" y1="60" x2="330" y2="280" stroke="#16a34a" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="336" y="52" font-size="12" font-weight="bold" fill="#15803d">equilibrium: rate_f = rate_r</text>
  <path d="M 70 216 Q 160 216 240 216" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4 4"/>
  <text x="80" y="240" font-size="11.5" fill="#475569">Kc = [C]^c[D]^d / [A]^a[B]^b — unchanged by catalyst or pressure of solids</text>
  <text x="70" y="322" font-size="12.5" font-weight="bold" fill="#0f172a">Le Chatelier: add reactant ↑, remove product ↑, ↑T favours endothermic side, ↑P favours fewer gas moles</text>
</svg>`;

/** Inductive effect along a chain and its acidity order consequence. */
export const INDUCTIVE_EFFECT = `<svg viewBox="0 0 640 320" role="img">
  <title>Inductive effect and the acidity order it predicts</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <text x="60" y="70" font-size="15" font-weight="bold" fill="#0f172a">−I groups pull electron density along σ-bonds (dies out in 3–4 bonds):</text>
  <circle cx="120" cy="140" r="26" fill="rgba(220,38,38,0.20)" stroke="#b91c1c" stroke-width="2.5"/>
  <text x="120" y="146" font-size="14" font-weight="bold" text-anchor="middle" fill="#b91c1c">Cl</text>
  <line x1="146" y1="140" x2="220" y2="140" stroke="#0f172a" stroke-width="2"/>
  <polygon points="232,140 216,132 216,148" fill="#dc2626"/>
  <text x="180" y="128" font-size="12" fill="#b91c1c">δ− pulls</text>
  <circle cx="260" cy="140" r="22" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="260" y="146" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">C</text>
  <line x1="282" y1="140" x2="350" y2="140" stroke="#0f172a" stroke-width="2"/>
  <polygon points="362,140 346,132 346,148" fill="#c2410c"/>
  <text x="316" y="128" font-size="12" fill="#c2410c">δδ+</text>
  <circle cx="390" cy="140" r="22" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="390" y="146" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">C</text>
  <line x1="412" y1="140" x2="470" y2="140" stroke="#0f172a" stroke-width="2"/>
  <text x="480" y="146" font-size="13" font-weight="bold" fill="#0f172a">O–H → H⁺ leaves</text>
  <text x="60" y="216" font-size="14" font-weight="bold" fill="#0f172a">Acidity order the effect predicts:</text>
  <text x="60" y="246" font-size="13" fill="#0f172a">CCl₃COOH &gt; CHCl₂COOH &gt; CH₂ClCOOH &gt; CH₃COOH &gt; CH₃CH₂OH &gt; H₂O</text>
  <text x="60" y="278" font-size="12.5" fill="#475569">More −I groups ⇒ conjugate base more stabilised ⇒ acid stronger. +I groups (alkyl) do the opposite.</text>
</svg>`;

/* ─────────────── BIOLOGY ─────────────── */

/** rDNA technology: the five steps and the PCR temperature cycle. */
export const RDNA_PCR_STEPS = `<svg viewBox="0 0 640 340" role="img">
  <title>Five steps of rDNA technology and the PCR cycle</title>
  <rect x="0" y="0" width="640" height="340" fill="#ffffff"/>
  <rect x="30" y="40" width="110" height="40" rx="8" fill="rgba(22,163,74,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="85" y="65" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">1 Isolate DNA</text>
  <rect x="170" y="40" width="110" height="40" rx="8" fill="rgba(22,163,74,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="225" y="65" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">2 Cut (EcoRI)</text>
  <rect x="310" y="40" width="110" height="40" rx="8" fill="rgba(22,163,74,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="365" y="65" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">3 Insert + ligase</text>
  <rect x="450" y="40" width="110" height="40" rx="8" fill="rgba(22,163,74,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="505" y="65" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">4 Host + vector</text>
  <rect x="240" y="110" width="160" height="40" rx="8" fill="rgba(37,99,235,0.14)" stroke="#0f172a" stroke-width="2"/>
  <text x="320" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">5 Screen (antibiotic marker)</text>
  <line x1="140" y1="60" x2="170" y2="60" stroke="#475569" stroke-width="2"/>
  <line x1="280" y1="60" x2="310" y2="60" stroke="#475569" stroke-width="2"/>
  <line x1="420" y1="60" x2="450" y2="60" stroke="#475569" stroke-width="2"/>
  <line x1="505" y1="80" x2="400" y2="110" stroke="#475569" stroke-width="2"/>
  <line x1="320" y1="150" x2="320" y2="180" stroke="#475569" stroke-width="2"/>
  <polygon points="320,190 312,176 328,176" fill="#475569"/>
  <text x="90" y="230" font-size="13" font-weight="bold" fill="#0f172a">PCR cycle (in vitro amplification):</text>
  <rect x="90" y="244" width="150" height="34" rx="8" fill="rgba(220,38,38,0.16)" stroke="#b91c1c" stroke-width="2"/>
  <text x="165" y="266" font-size="12" font-weight="bold" text-anchor="middle" fill="#b91c1c">94–95 °C denature</text>
  <rect x="255" y="244" width="150" height="34" rx="8" fill="rgba(217,119,6,0.16)" stroke="#c2410c" stroke-width="2"/>
  <text x="330" y="266" font-size="12" font-weight="bold" text-anchor="middle" fill="#c2410c">50–65 °C anneal primers</text>
  <rect x="420" y="244" width="150" height="34" rx="8" fill="rgba(22,163,74,0.16)" stroke="#15803d" stroke-width="2"/>
  <text x="495" y="266" font-size="12" font-weight="bold" text-anchor="middle" fill="#15803d">72 °C Taq polymerase</text>
  <line x1="240" y1="261" x2="255" y2="261" stroke="#475569" stroke-width="2"/>
  <line x1="405" y1="261" x2="420" y2="261" stroke="#475569" stroke-width="2"/>
  <text x="90" y="310" font-size="12" fill="#475569">30 cycles ⇒ 2³⁰ ≈ 10⁹× amplification · Taq from Thermus aquaticus survives the denature step.</text>
</svg>`;

/** Hardy–Weinberg: allele vs genotype frequency bars. */
export const HARDY_WEINBERG = `<svg viewBox="0 0 640 320" role="img">
  <title>Hardy-Weinberg genotype frequencies from allele frequencies</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <text x="60" y="56" font-size="15" font-weight="bold" fill="#0f172a">p + q = 1 (alleles)   ·   p² + 2pq + q² = 1 (genotypes)</text>
  <line x1="70" y1="260" x2="600" y2="260" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="100" y="100" width="90" height="160" fill="rgba(37,99,235,0.30)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="145" y="92" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#1d4ed8">p² (AA)</text>
  <rect x="210" y="130" width="90" height="130" fill="rgba(22,163,74,0.28)" stroke="#15803d" stroke-width="2"/>
  <text x="255" y="122" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">2pq (Aa)</text>
  <rect x="320" y="200" width="90" height="60" fill="rgba(220,38,38,0.25)" stroke="#b91c1c" stroke-width="2"/>
  <text x="365" y="192" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#b91c1c">q² (aa)</text>
  <text x="470" y="140" font-size="12.5" fill="#0f172a">Example p = 0.7, q = 0.3:</text>
  <text x="470" y="164" font-size="12.5" fill="#475569">AA = 0.49</text>
  <text x="470" y="188" font-size="12.5" fill="#475569">Aa = 0.42</text>
  <text x="470" y="212" font-size="12.5" fill="#475569">aa = 0.09</text>
  <text x="60" y="316" font-size="12.5" fill="#0f172a" font-weight="bold">P(B) = 0.6·0.3 + 0.4·0.1 = 0.22   ·   P(A|B) = 0.18/0.22 ≈ 0.818 (Bayes)</text>
</svg>`;

/* ─────────────── ENGLISH ─────────────── */

/** The twelve tenses laid out on a past–present–future timeline. */
export const TENSE_TIMELINE = `<svg viewBox="0 0 640 330" role="img">
  <title>The twelve tenses arranged on a time line</title>
  <rect x="0" y="0" width="640" height="330" fill="#ffffff"/>
  <line x1="40" y1="180" x2="600" y2="180" stroke="#0f172a" stroke-width="3"/>
  <polygon points="614,180 596,171 596,189" fill="#0f172a"/>
  <circle cx="90" cy="180" r="5" fill="#0f172a"/>
  <circle cx="320" cy="180" r="5" fill="#0f172a"/>
  <circle cx="550" cy="180" r="5" fill="#0f172a"/>
  <text x="90" y="206" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">PAST</text>
  <text x="320" y="206" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">PRESENT</text>
  <text x="550" y="206" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">FUTURE</text>
  <rect x="30" y="40" width="120" height="30" rx="6" fill="rgba(37,99,235,0.12)" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="90" y="60" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Simple · V2</text>
  <rect x="30" y="78" width="120" height="30" rx="6" fill="rgba(37,99,235,0.12)" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="90" y="98" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Continuous · was V-ing</text>
  <rect x="30" y="116" width="120" height="30" rx="6" fill="rgba(37,99,235,0.12)" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="90" y="136" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Perfect · had V3</text>
  <rect x="30" y="154" width="0" height="0" fill="none"/>
  <rect x="260" y="40" width="120" height="30" rx="6" fill="rgba(22,163,74,0.12)" stroke="#15803d" stroke-width="1.8"/>
  <text x="320" y="60" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#15803d">Simple · V1(s)</text>
  <rect x="260" y="78" width="120" height="30" rx="6" fill="rgba(22,163,74,0.12)" stroke="#15803d" stroke-width="1.8"/>
  <text x="320" y="98" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#15803d">Continuous · is V-ing</text>
  <rect x="260" y="116" width="120" height="30" rx="6" fill="rgba(22,163,74,0.12)" stroke="#15803d" stroke-width="1.8"/>
  <text x="320" y="136" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#15803d">Perfect · has V3</text>
  <rect x="490" y="40" width="120" height="30" rx="6" fill="rgba(217,119,6,0.14)" stroke="#c2410c" stroke-width="1.8"/>
  <text x="550" y="60" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#c2410c">Simple · will V1</text>
  <rect x="490" y="78" width="120" height="30" rx="6" fill="rgba(217,119,6,0.14)" stroke="#c2410c" stroke-width="1.8"/>
  <text x="550" y="98" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#c2410c">Continuous · will be V-ing</text>
  <rect x="490" y="116" width="120" height="30" rx="6" fill="rgba(217,119,6,0.14)" stroke="#c2410c" stroke-width="1.8"/>
  <text x="550" y="136" font-size="11.5" font-weight="bold" text-anchor="middle" fill="#c2410c">Perfect · will have V3</text>
  <line x1="90" y1="170" x2="90" y2="146" stroke="#475569" stroke-width="1.6"/>
  <line x1="320" y1="170" x2="320" y2="146" stroke="#475569" stroke-width="1.6"/>
  <line x1="550" y1="170" x2="550" y2="146" stroke="#475569" stroke-width="1.6"/>
  <text x="40" y="250" font-size="12.5" fill="#0f172a" font-weight="bold">Perfect continuous row (had been V-ing · has been V-ing · will have been V-ing) completes the 3 × 4 grid.</text>
  <text x="40" y="276" font-size="12" fill="#475569">Time markers: yesterday / ago → past · now / just / yet → present · tomorrow / by next year → future.</text>
</svg>`;

/** Active→passive transformation and direct→indirect speech shifts. */
export const VOICE_SPEECH_MAP = `<svg viewBox="0 0 640 330" role="img">
  <title>Active to passive voice and direct to indirect speech maps</title>
  <rect x="0" y="0" width="640" height="330" fill="#ffffff"/>
  <text x="40" y="56" font-size="14" font-weight="bold" fill="#0f172a">Voice:  Object → subject, verb → be + V3, subject → by-phrase</text>
  <rect x="40" y="70" width="250" height="36" rx="8" fill="rgba(37,99,235,0.12)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="165" y="93" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">S + V + O  (active)</text>
  <rect x="360" y="70" width="240" height="36" rx="8" fill="rgba(124,58,237,0.12)" stroke="#6d28d9" stroke-width="2"/>
  <text x="480" y="93" font-size="12" font-weight="bold" text-anchor="middle" fill="#6d28d9">O + be-V3 + (by S)  (passive)</text>
  <line x1="290" y1="88" x2="360" y2="88" stroke="#475569" stroke-width="2"/>
  <polygon points="370,88 354,80 354,96" fill="#475569"/>
  <text x="40" y="140" font-size="12.5" fill="#475569">Only transitive verbs · tense lives in "be" (is written / was written / will be written).</text>
  <text x="40" y="180" font-size="14" font-weight="bold" fill="#0f172a">Speech: backshift the tense, shift the pronouns and the time words</text>
  <rect x="40" y="194" width="250" height="36" rx="8" fill="rgba(22,163,74,0.12)" stroke="#15803d" stroke-width="2"/>
  <text x="165" y="217" font-size="12" font-weight="bold" text-anchor="middle" fill="#15803d">"I am tired," he said.</text>
  <rect x="360" y="194" width="240" height="36" rx="8" fill="rgba(217,119,6,0.12)" stroke="#c2410c" stroke-width="2"/>
  <text x="480" y="217" font-size="12" font-weight="bold" text-anchor="middle" fill="#c2410c">He said (that) he was tired.</text>
  <line x1="290" y1="212" x2="360" y2="212" stroke="#475569" stroke-width="2"/>
  <polygon points="370,212 354,204 354,220" fill="#475569"/>
  <text x="40" y="262" font-size="12.5" fill="#475569">am/is → was · will → would · today → that day · here → there · question → statement order.</text>
  <text x="40" y="296" font-size="12.5" fill="#475569">Universal truths keep present tense: "The sun rises in the east" stays rises.</text>
</svg>`;

/** Essay skeleton: introduction, body paragraphs, conclusion. */
export const ESSAY_STRUCTURE = `<svg viewBox="0 0 640 320" role="img">
  <title>The essay skeleton from hook to conclusion</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <rect x="120" y="36" width="400" height="52" rx="9" fill="rgba(37,99,235,0.13)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="320" y="58" font-size="13" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Introduction — hook · context · THESIS (one sentence)</text>
  <text x="320" y="78" font-size="11.5" text-anchor="middle" fill="#475569">10–12 % of the word limit · never a new argument here</text>
  <rect x="60" y="116" width="160" height="70" rx="9" fill="rgba(22,163,74,0.11)" stroke="#15803d" stroke-width="2"/>
  <text x="140" y="140" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">Body 1</text>
  <text x="140" y="160" font-size="11" text-anchor="middle" fill="#475569">topic sentence</text>
  <text x="140" y="176" font-size="11" text-anchor="middle" fill="#475569">evidence → link</text>
  <rect x="240" y="116" width="160" height="70" rx="9" fill="rgba(22,163,74,0.11)" stroke="#15803d" stroke-width="2"/>
  <text x="320" y="140" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">Body 2</text>
  <text x="320" y="160" font-size="11" text-anchor="middle" fill="#475569">strongest point</text>
  <text x="320" y="176" font-size="11" text-anchor="middle" fill="#475569">example + analysis</text>
  <rect x="420" y="116" width="160" height="70" rx="9" fill="rgba(22,163,74,0.11)" stroke="#15803d" stroke-width="2"/>
  <text x="500" y="140" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">Body 3</text>
  <text x="500" y="160" font-size="11" text-anchor="middle" fill="#475569">counter-view</text>
  <text x="500" y="176" font-size="11" text-anchor="middle" fill="#475569">+ rebuttal</text>
  <rect x="120" y="214" width="400" height="52" rx="9" fill="rgba(217,119,6,0.13)" stroke="#c2410c" stroke-width="2"/>
  <text x="320" y="236" font-size="13" font-weight="bold" text-anchor="middle" fill="#c2410c">Conclusion — restate thesis · synthesis · closing thought</text>
  <text x="320" y="256" font-size="11.5" text-anchor="middle" fill="#475569">no new facts · echo the hook for a full-circle ending</text>
  <line x1="320" y1="88" x2="320" y2="116" stroke="#475569" stroke-width="2"/>
  <line x1="140" y1="186" x2="250" y2="214" stroke="#475569" stroke-width="2"/>
  <line x1="500" y1="186" x2="390" y2="214" stroke="#475569" stroke-width="2"/>
  <text x="60" y="300" font-size="12" fill="#475569">One idea per paragraph · PEEL (Point, Evidence, Explain, Link) · cohesion markers: however, moreover, in contrast.</text>
</svg>`;

/** Argument map: claim, evidence, warrant and where fallacies sit. */
export const ARGUMENT_MAP = `<svg viewBox="0 0 640 320" role="img">
  <title>Anatomy of an argument and the fallacies that break it</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <rect x="220" y="34" width="200" height="44" rx="9" fill="rgba(37,99,235,0.14)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="320" y="62" font-size="13" font-weight="bold" text-anchor="middle" fill="#1d4ed8">CLAIM (what you assert)</text>
  <rect x="60" y="130" width="160" height="44" rx="9" fill="rgba(22,163,74,0.12)" stroke="#15803d" stroke-width="2"/>
  <text x="140" y="150" font-size="12" font-weight="bold" text-anchor="middle" fill="#15803d">EVIDENCE</text>
  <text x="140" y="168" font-size="11" text-anchor="middle" fill="#475569">data, citation, example</text>
  <rect x="420" y="130" width="160" height="44" rx="9" fill="rgba(217,119,6,0.12)" stroke="#c2410c" stroke-width="2"/>
  <text x="500" y="150" font-size="12" font-weight="bold" text-anchor="middle" fill="#c2410c">REASONING (warrant)</text>
  <text x="500" y="168" font-size="11" text-anchor="middle" fill="#475569">why evidence → claim</text>
  <line x1="140" y1="130" x2="280" y2="78" stroke="#475569" stroke-width="2"/>
  <line x1="500" y1="130" x2="360" y2="78" stroke="#475569" stroke-width="2"/>
  <text x="60" y="226" font-size="13" font-weight="bold" fill="#0f172a">Fallacies to spot:</text>
  <text x="60" y="252" font-size="12" fill="#475569">ad hominem (attack the person) · straw man (distort the claim) · hasty generalisation</text>
  <text x="60" y="274" font-size="12" fill="#475569">false dilemma (only two options?) · post hoc (sequence ≠ cause) · appeal to popularity</text>
  <text x="60" y="300" font-size="12" fill="#475569">Circular reasoning (assumes the conclusion) · red herring (irrelevant distraction)</text>
</svg>`;

/** Word formation: root with prefixes and suffixes. */
export const WORD_FORMATION_TREE = `<svg viewBox="0 0 640 320" role="img">
  <title>Building words from root, prefix and suffix</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <rect x="240" y="30" width="160" height="44" rx="9" fill="rgba(37,99,235,0.14)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="320" y="58" font-size="13.5" font-weight="bold" text-anchor="middle" fill="#1d4ed8">ROOT: port (carry)</text>
  <rect x="40" y="120" width="170" height="40" rx="8" fill="rgba(220,38,38,0.10)" stroke="#b91c1c" stroke-width="2"/>
  <text x="125" y="145" font-size="12" font-weight="bold" text-anchor="middle" fill="#b91c1c">PREFIX: re-, dis-, un-</text>
  <rect x="235" y="120" width="170" height="40" rx="8" fill="rgba(37,99,235,0.10)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="320" y="145" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">export · import · porter</text>
  <rect x="430" y="120" width="170" height="40" rx="8" fill="rgba(22,163,74,0.10)" stroke="#15803d" stroke-width="2"/>
  <text x="515" y="145" font-size="12" font-weight="bold" text-anchor="middle" fill="#15803d">SUFFIX: -tion, -able, -ly</text>
  <line x1="125" y1="120" x2="280" y2="74" stroke="#475569" stroke-width="2"/>
  <line x1="320" y1="120" x2="320" y2="74" stroke="#475569" stroke-width="2"/>
  <line x1="515" y1="120" x2="360" y2="74" stroke="#475569" stroke-width="2"/>
  <text x="60" y="210" font-size="12.5" fill="#0f172a" font-weight="bold">Full build: un + predict + able = unpredictable (negation + root + adjective maker)</text>
  <text x="60" y="238" font-size="12" fill="#475569">Idiom ≠ literal meaning: "break the ice" = ease tension. Collocations travel together: heavy rain, take a decision.</text>
  <text x="60" y="266" font-size="12" fill="#475569">Confusable pairs: principal/principle · affect/effect · stationary/stationery · compliment/complement.</text>
  <text x="60" y="294" font-size="12" fill="#475569">Spelling rule: final -y after consonant → -ies (study→studies); drop silent -e before a vowel suffix (make→making).</text>
</svg>`;

/* ─────────────── NEPALI ─────────────── */

/** कारक चार्ट — छ वटै कारक, चिन्ह र उदाहरण। */
export const KARAK_CHART = `<svg viewBox="0 0 640 340" role="img">
  <title>छ वटै कारक, तिनका चिन्ह र उदाहरण</title>
  <rect x="0" y="0" width="640" height="340" fill="#ffffff"/>
  <rect x="40" y="26" width="560" height="34" rx="8" fill="rgba(37,99,235,0.13)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="320" y="49" font-size="14" font-weight="bold" text-anchor="middle" fill="#1d4ed8">कारक = वाक्यमा क्रियासँग सम्बन्ध जोड्ने शब्द</text>
  <text x="70" y="92" font-size="12.5" font-weight="bold" fill="#0f172a">कर्ता — ले / ने</text>
  <text x="330" y="92" font-size="12" fill="#475569">रामले खायो · म गर्छु (प्रत्यय -इ क्रियामा 'ले' हुँदैन)</text>
  <text x="70" y="124" font-size="12.5" font-weight="bold" fill="#0f172a">कर्म — लाई</text>
  <text x="330" y="124" font-size="12" fill="#475569">सीतालाई पढाउँछु · हामीलाई बोलाऊ</text>
  <text x="70" y="156" font-size="12.5" font-weight="bold" fill="#0f172a">करण — द्वारा / ले</text>
  <text x="330" y="156" font-size="12" fill="#475569">कलमले लेख · बसद्वारा जाऊ</text>
  <text x="70" y="188" font-size="12.5" font-weight="bold" fill="#0f172a">सम्प्रदान — लाई / निम्ति</text>
  <text x="330" y="188" font-size="12" fill="#475569">गरिबलाई दिऊ · भोलिनिम्ति तयार</text>
  <text x="70" y="220" font-size="12.5" font-weight="bold" fill="#0f172a">अपादान — देखि / बाट</text>
  <text x="330" y="220" font-size="12" fill="#475569">घरदेखि हिँडे · डरबाट भागे</text>
  <text x="70" y="252" font-size="12.5" font-weight="bold" fill="#0f172a">सम्बन्ध — को / की / का</text>
  <text x="330" y="252" font-size="12" fill="#475569">रामको घर · गीताकी बहिनी · रामका छोरा (लिङ्गअनुसार)</text>
  <line x1="40" y1="66" x2="600" y2="66" stroke="#0f172a" stroke-width="1.6"/>
  <text x="40" y="292" font-size="12.5" fill="#475569">शून्य सम्बन्ध: 'को' नभएको सम्बन्ध — नेपाल भाषा, सुन गहना (अभिजात अर्थ)।</text>
  <text x="40" y="318" font-size="12.5" fill="#475569">पहिचान ट्रिक: क्रियाले 'के? को? कसलाई? कहाँबाट?' सोधे उत्तरमा जुन चिन्ह आउँछ — त्यही कारक।</text>
</svg>`;

/** सन्धि फ्लो — स्वर र व्यंजन सन्धिका नियम। */
export const SANDHI_FLOW = `<svg viewBox="0 0 640 320" role="img">
  <title>सन्धिका मुख्य शाखा र नियम</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <rect x="230" y="26" width="180" height="42" rx="9" fill="rgba(37,99,235,0.14)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="320" y="53" font-size="14" font-weight="bold" text-anchor="middle" fill="#1d4ed8">सन्धि = दुई वर्णको मेल</text>
  <rect x="70" y="110" width="200" height="40" rx="8" fill="rgba(22,163,74,0.12)" stroke="#15803d" stroke-width="2"/>
  <text x="170" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">स्वर सन्धि</text>
  <rect x="370" y="110" width="200" height="40" rx="8" fill="rgba(217,119,6,0.12)" stroke="#c2410c" stroke-width="2"/>
  <text x="470" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#c2410c">व्यंजन सन्धि</text>
  <line x1="290" y1="68" x2="180" y2="110" stroke="#475569" stroke-width="2"/>
  <line x1="350" y1="68" x2="460" y2="110" stroke="#475569" stroke-width="2"/>
  <text x="70" y="182" font-size="12" fill="#0f172a">गुण: a/ā + i/ī → e (देव + ईश = देवेश)</text>
  <text x="70" y="206" font-size="12" fill="#0f172a">दीर्घ: a/ā + u/ū → o (परम + आत्मा = परमात्मा)</text>
  <text x="70" y="230" font-size="12" fill="#0f172a">यण्: i/u/ṛ + भिन्न स्वर → य्/व्/र् (इति + आदि = इत्यादि)</text>
  <text x="70" y="254" font-size="12" fill="#0f172a">वृद्धि: a + e/ai → ai; a + o/au → au (एक + एक = एकैक)</text>
  <text x="370" y="182" font-size="12" fill="#0f172a">प्रथम: व्यंजन + च/ज/श → क्/ग् रूप (तस्मात् + एव = ततैव)</text>
  <text x="370" y="206" font-size="12" fill="#0f172a">तृतीय: द/ध + लिपि-वर्ण → न् (विद् + या = विद्या)</text>
  <text x="370" y="230" font-size="12" fill="#0f172a">म् + क/ख/ग/घ → ङ् (सम् + गच्छ = सङ्गच्छ)</text>
  <text x="370" y="254" font-size="12" fill="#0f172a">म् + च/ज → ञ् (सम् + चर = सञ्चर)</text>
  <text x="70" y="296" font-size="12.5" font-weight="bold" fill="#0f172a">विच्छेद उल्टो प्रक्रिया हो: देवेश = देव + ईश · ततैव = तस्मात् + एव</text>
</svg>`;

/** अलंकार वृक्ष — उपमा, रूपक, यमक, अनुप्रासका उदाहरण। */
export const ALANKARA_TREE = `<svg viewBox="0 0 640 330" role="img">
  <title>अलंकारका चार मुख्य भेद र उदाहरण</title>
  <rect x="0" y="0" width="640" height="330" fill="#ffffff"/>
  <rect x="230" y="26" width="180" height="42" rx="9" fill="rgba(124,58,237,0.14)" stroke="#6d28d9" stroke-width="2"/>
  <text x="320" y="53" font-size="14" font-weight="bold" text-anchor="middle" fill="#6d28d9">अलंकार = काव्यसौन्दर्य</text>
  <rect x="40" y="110" width="130" height="40" rx="8" fill="rgba(37,99,235,0.12)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="105" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#1d4ed8">उपमा</text>
  <rect x="190" y="110" width="130" height="40" rx="8" fill="rgba(22,163,74,0.12)" stroke="#15803d" stroke-width="2"/>
  <text x="255" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">रूपक</text>
  <rect x="340" y="110" width="130" height="40" rx="8" fill="rgba(217,119,6,0.12)" stroke="#c2410c" stroke-width="2"/>
  <text x="405" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#c2410c">यमक</text>
  <rect x="490" y="110" width="110" height="40" rx="8" fill="rgba(13,148,136,0.12)" stroke="#0f766e" stroke-width="2"/>
  <text x="545" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#0f766e">अनुप्रास</text>
  <line x1="105" y1="110" x2="290" y2="68" stroke="#475569" stroke-width="2"/>
  <line x1="255" y1="110" x2="310" y2="68" stroke="#475569" stroke-width="2"/>
  <line x1="405" y1="110" x2="330" y2="68" stroke="#475569" stroke-width="2"/>
  <line x1="545" y1="110" x2="350" y2="68" stroke="#475569" stroke-width="2"/>
  <text x="40" y="182" font-size="12" fill="#0f172a">उपमवाचक शब्द स्पष्ट: सा, जस्तै, सरि</text>
  <text x="40" y="206" font-size="12" fill="#475569">"मुख जून जस्तै" — चन्द्रसँग तुलना</text>
  <text x="190" y="182" font-size="12" fill="#0f172a">उपमेयमै उपमानको आरोप</text>
  <text x="190" y="206" font-size="12" fill="#475569">"कमल नेत्र" — आँखा नै कमल</text>
  <text x="340" y="182" font-size="12" fill="#0f172a">एउटै शब्द, फरक अर्थ</text>
  <text x="340" y="206" font-size="12" fill="#475569">"चरित बड चतुर" — बड = बलियो/बरखा</text>
  <text x="490" y="182" font-size="12" fill="#0f172a">वर्णको दोहोरिने प्रयोग</text>
  <text x="490" y="206" font-size="12" fill="#475569">"राम राजा रङ्गीलो" — र/र/र</text>
  <text x="40" y="252" font-size="12.5" fill="#475569">छेक: उपमा र रूपक छुट्याउने कुञ्जी — 'जस्तै' जस्तो शब्द देखिन्छ भने उपमा, नदेखिन्छ भने रूपक।</text>
  <text x="40" y="280" font-size="12.5" fill="#475569">अरू भेद: अतिशयोक्ति (बढाइँ), श्लेष (एक शब्द धेरै अर्थ), अर्थान्तरन्यास (परिभाषा दोहोर्‍याइएको)।</text>
  <text x="40" y="308" font-size="12" fill="#475569">परीक्षामा पदसँगै भेद लेख्नुपर्छ — पहिले वाक्य पढी तुलना/आरोप/दोहोरो अर्थ खोज्ने।</text>
</svg>`;

/** निबन्ध ढाँचा — भूमिका, विषयवस्तु, निष्कर्ष। */
export const NIBANDHA_SKELETON = `<svg viewBox="0 0 640 320" role="img">
  <title>निबन्धको तीन तहको ढाँचा</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <rect x="140" y="30" width="360" height="50" rx="9" fill="rgba(37,99,235,0.13)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="320" y="52" font-size="13" font-weight="bold" text-anchor="middle" fill="#1d4ed8">भूमिका — आकर्षक सुरुवात · विषय परिचय</text>
  <text x="320" y="72" font-size="11.5" text-anchor="middle" fill="#475569">उद्धरण/प्रश्न/घटनाबाट सुरु · शब्दसीमाको १०–१५%</text>
  <rect x="60" y="110" width="160" height="66" rx="9" fill="rgba(22,163,74,0.11)" stroke="#15803d" stroke-width="2"/>
  <text x="140" y="134" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">विषयवस्तु १</text>
  <text x="140" y="154" font-size="11" text-anchor="middle" fill="#475569">मुख्य बुँदा + उदाहरण</text>
  <text x="140" y="170" font-size="11" text-anchor="middle" fill="#475569">एक अनुच्छेद = एक भाव</text>
  <rect x="240" y="110" width="160" height="66" rx="9" fill="rgba(22,163,74,0.11)" stroke="#15803d" stroke-width="2"/>
  <text x="320" y="134" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">विषयवस्तु २</text>
  <text x="320" y="154" font-size="11" text-anchor="middle" fill="#475569">कारण–परिणाम</text>
  <text x="320" y="170" font-size="11" text-anchor="middle" fill="#475569">तुलना/विपरीत दृष्टि</text>
  <rect x="420" y="110" width="160" height="66" rx="9" fill="rgba(22,163,74,0.11)" stroke="#15803d" stroke-width="2"/>
  <text x="500" y="134" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">विषयवस्तु ३</text>
  <text x="500" y="154" font-size="11" text-anchor="middle" fill="#475569">समाधान/सुझाव</text>
  <text x="500" y="170" font-size="11" text-anchor="middle" fill="#475569">उद्धरण-प्रसङ्ग</text>
  <rect x="140" y="206" width="360" height="50" rx="9" fill="rgba(217,119,6,0.13)" stroke="#c2410c" stroke-width="2"/>
  <text x="320" y="228" font-size="13" font-weight="bold" text-anchor="middle" fill="#c2410c">निष्कर्ष — सार सङ्कलन · सन्देश</text>
  <text x="320" y="248" font-size="11.5" text-anchor="middle" fill="#475569">नयाँ तथ्य हुँदैन · भूमिकासँग मेल</text>
  <line x1="320" y1="80" x2="320" y2="110" stroke="#475569" stroke-width="2"/>
  <line x1="140" y1="176" x2="250" y2="206" stroke="#475569" stroke-width="2"/>
  <line x1="500" y1="176" x2="390" y2="206" stroke="#475569" stroke-width="2"/>
  <text x="60" y="292" font-size="12" fill="#475569">गल्तीहरू: शीर्षकबाट भट्टिने लेखन · अनुच्छेद नमार्ने · बोलीचालीको शब्द · शब्दसीमा नहेरी लामो कथा।</text>
</svg>`;

/** साहित्यका विधा वृक्ष — कविता, गीत, कथा, उपन्यास, निबन्ध। */
export const SAHITYA_VIDHA_TREE = `<svg viewBox="0 0 640 330" role="img">
  <title>साहित्यका विधा र तिनका भेद</title>
  <rect x="0" y="0" width="640" height="330" fill="#ffffff"/>
  <rect x="230" y="26" width="180" height="42" rx="9" fill="rgba(37,99,235,0.14)" stroke="#1d4ed8" stroke-width="2"/>
  <text x="320" y="53" font-size="14" font-weight="bold" text-anchor="middle" fill="#1d4ed8">साहित्यका विधा</text>
  <rect x="40" y="110" width="110" height="40" rx="8" fill="rgba(22,163,74,0.12)" stroke="#15803d" stroke-width="2"/>
  <text x="95" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">कविता</text>
  <rect x="165" y="110" width="100" height="40" rx="8" fill="rgba(217,119,6,0.12)" stroke="#c2410c" stroke-width="2"/>
  <text x="215" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#c2410c">गीत</text>
  <rect x="280" y="110" width="100" height="40" rx="8" fill="rgba(124,58,237,0.12)" stroke="#6d28d9" stroke-width="2"/>
  <text x="330" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#6d28d9">कथा</text>
  <rect x="395" y="110" width="110" height="40" rx="8" fill="rgba(13,148,136,0.12)" stroke="#0f766e" stroke-width="2"/>
  <text x="450" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#0f766e">उपन्यास</text>
  <rect x="520" y="110" width="100" height="40" rx="8" fill="rgba(220,38,38,0.10)" stroke="#b91c1c" stroke-width="2"/>
  <text x="570" y="135" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#b91c1c">निबन्ध</text>
  <line x1="95" y1="110" x2="280" y2="68" stroke="#475569" stroke-width="2"/>
  <line x1="215" y1="110" x2="300" y2="68" stroke="#475569" stroke-width="2"/>
  <line x1="330" y1="110" x2="320" y2="68" stroke="#475569" stroke-width="2"/>
  <line x1="450" y1="110" x2="340" y2="68" stroke="#475569" stroke-width="2"/>
  <line x1="570" y1="110" x2="360" y2="68" stroke="#475569" stroke-width="2"/>
  <text x="40" y="182" font-size="12" fill="#0f172a">भेद: छन्दबद्ध · मुक्त छन्द</text>
  <text x="40" y="206" font-size="12" fill="#475569">गुरु-लघु ताल, रस र बिम्ब</text>
  <text x="165" y="182" font-size="12" fill="#0f172a">भेद: देशभक्ति · प्रेम · भक्ति</text>
  <text x="165" y="206" font-size="12" fill="#475569">स्थायी, अन्तरे, भरिया</text>
  <text x="280" y="182" font-size="12" fill="#0f172a">लघु कथा: एक घटना, एक मोड</text>
  <text x="280" y="206" font-size="12" fill="#475569">चरित्र &lt; पात्रहरू, औचित्य</text>
  <text x="395" y="182" font-size="12" fill="#0f172a">लम्बा कथानक, बहु पात्र</text>
  <text x="395" y="206" font-size="12" fill="#475569">परिवेश, युगचेतना</text>
  <text x="520" y="182" font-size="12" fill="#0f172a">तर्कसंगत विचार</text>
  <text x="520" y="206" font-size="12" fill="#475569">प्रमाण + व्यक्तित्व</text>
  <text x="40" y="252" font-size="12.5" fill="#475569">नाटक र उखानटुक्का पनि विधा नै: नाटकमा अङ्क/दृश्य, संवादनै जीवन; उखान परिपक्व अनुभवको गोली भनाइ।</text>
  <text x="40" y="280" font-size="12.5" fill="#475569">पहिचान: छन्द देखियो → कविता · सुर/ताल → गीत · छोटो कथानक → कथा · लामो → उपन्यास · तर्क → निबन्ध।</text>
  <text x="40" y="308" font-size="12" fill="#475569">परीक्षामा 'विधा + भेद + एक विशेषता' तीनै बुँदा लेख्दा पूर्ण अङ्क।</text>
</svg>`;

/* ─────────────── MATHEMATICS ─────────────── */

/** Derivative as slope: tangent, stationary points, increasing/decreasing. */
export const DERIVATIVE_CURVE = `<svg viewBox="0 0 640 340" role="img">
  <title>A cubic curve with tangents, maximum and minimum points</title>
  <rect x="0" y="0" width="640" height="340" fill="#ffffff"/>
  <line x1="60" y1="30" x2="60" y2="310" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="60" y1="240" x2="610" y2="240" stroke="#0f172a" stroke-width="2.5"/>
  <text x="34" y="46" font-size="12" fill="#475569">y</text>
  <text x="596" y="262" font-size="12" fill="#475569">x</text>
  <path d="M 80 70 C 150 70 170 96 210 96 C 260 96 260 150 320 150 C 390 150 390 300 470 300 C 520 300 550 280 590 250" fill="none" stroke="#2563eb" stroke-width="3"/>
  <circle cx="210" cy="96" r="6" fill="#dc2626"/>
  <text x="210" y="82" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#b91c1c">max: f′ = 0, f′′ &lt; 0</text>
  <circle cx="470" cy="300" r="6" fill="#16a34a"/>
  <text x="470" y="326" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">min: f′ = 0, f′′ &gt; 0</text>
  <line x1="120" y1="120" x2="200" y2="66" stroke="#c2410c" stroke-width="2.5"/>
  <text x="96" y="140" font-size="12" fill="#c2410c">f′ &gt; 0 rising</text>
  <line x1="280" y1="120" x2="360" y2="168" stroke="#7c3aed" stroke-width="2.5"/>
  <text x="290" y="108" font-size="12" fill="#7c3aed">f′ &lt; 0 falling</text>
  <text x="60" y="52" font-size="12.5" fill="#475569">dy/dx = limit of Δy/Δx as Δx → 0 — the slope of the tangent, not the chord.</text>
</svg>`;

/** Straight line: slope, intercepts and the point-slope construction. */
export const STRAIGHT_LINE_FORMS = `<svg viewBox="0 0 640 320" role="img">
  <title>A straight line marked with slope, intercepts and a point</title>
  <rect x="0" y="0" width="640" height="320" fill="#ffffff"/>
  <line x1="70" y1="30" x2="70" y2="290" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="70" y1="230" x2="610" y2="230" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="110" y1="270" x2="560" y2="70" stroke="#2563eb" stroke-width="3"/>
  <circle cx="110" cy="270" r="0.5" fill="none"/>
  <line x1="70" y1="270" x2="110" y2="270" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 4"/>
  <line x1="110" y1="270" x2="110" y2="230" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="76" y="286" font-size="12" fill="#b91c1c">a (x-intercept)</text>
  <text x="118" y="224" font-size="12" fill="#b91c1c">b (y-intercept)</text>
  <circle cx="380" cy="158" r="6" fill="#16a34a"/>
  <text x="392" y="150" font-size="12.5" font-weight="bold" fill="#15803d">P(x₁, y₁)</text>
  <line x1="380" y1="158" x2="440" y2="158" stroke="#0f172a" stroke-width="2"/>
  <line x1="440" y1="158" x2="440" y2="136" stroke="#0f172a" stroke-width="2"/>
  <polygon points="440,128 432,142 448,142" fill="#0f172a"/>
  <text x="448" y="150" font-size="12.5" font-weight="bold" fill="#0f172a">slope m = tan θ = (y₂−y₁)/(x₂−x₁)</text>
  <text x="70" y="52" font-size="13.5" font-weight="bold" fill="#0f172a">y − y₁ = m(x − x₁)   ·   x/a + y/b = 1   ·   y = mx + c</text>
  <text x="70" y="306" font-size="12.5" fill="#475569">Parallel ⇔ m₁ = m₂ · Perpendicular ⇔ m₁m₂ = −1 · Distance = |ax₁+by₁+c|/√(a²+b²)</text>
</svg>`;

/** Dot and cross product: projection and the parallelogram area. */
export const VECTORS_DOT_CROSS = `<svg viewBox="0 0 640 330" role="img">
  <title>Two vectors with projection (dot) and parallelogram area (cross)</title>
  <rect x="0" y="0" width="640" height="330" fill="#ffffff"/>
  <line x1="90" y1="250" x2="420" y2="250" stroke="#2563eb" stroke-width="3.5"/>
  <polygon points="432,250 414,241 414,259" fill="#2563eb"/>
  <text x="430" y="270" font-size="14" font-weight="bold" fill="#1d4ed8">a</text>
  <line x1="90" y1="250" x2="240" y2="110" stroke="#dc2626" stroke-width="3.5"/>
  <polygon points="248,102 228,108 240,122" fill="#dc2626"/>
  <text x="252" y="104" font-size="14" font-weight="bold" fill="#b91c1c">b</text>
  <line x1="240" y1="110" x2="240" y2="250" stroke="#475569" stroke-width="1.8" stroke-dasharray="6 5"/>
  <line x1="240" y1="250" x2="190" y2="250" stroke="#16a34a" stroke-width="3"/>
  <text x="180" y="272" font-size="12.5" font-weight="bold" fill="#15803d">a·cosθ = projection</text>
  <rect x="90" y="110" width="150" height="140" fill="rgba(124,58,237,0.14)" stroke="#7c3aed" stroke-width="1.6"/>
  <text x="165" y="200" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#6d28d9">|a×b| = |a||b|sinθ = area</text>
  <text x="470" y="110" font-size="13" font-weight="bold" fill="#0f172a">a·b = |a||b|cosθ</text>
  <text x="470" y="134" font-size="12" fill="#475569">scalar · zero ⇒ ⊥</text>
  <text x="470" y="170" font-size="13" font-weight="bold" fill="#0f172a">a×b = |a||b|sinθ n̂</text>
  <text x="470" y="194" font-size="12" fill="#475569">vector · zero ⇒ parallel</text>
  <text x="60" y="306" font-size="12.5" fill="#475569">Right-hand rule gives n̂ direction · Work = F·d (dot) · Torque = r×F (cross)</text>
</svg>`;

/** Probability tree with conditional branches and the Bayes read-out. */
export const PROBABILITY_TREE = `<svg viewBox="0 0 640 330" role="img">
  <title>A two-stage probability tree with Bayes labels</title>
  <rect x="0" y="0" width="640" height="330" fill="#ffffff"/>
  <circle cx="90" cy="165" r="26" fill="rgba(37,99,235,0.16)" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="90" y="171" font-size="13" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Start</text>
  <circle cx="300" cy="80" r="24" fill="rgba(22,163,74,0.14)" stroke="#15803d" stroke-width="2"/>
  <text x="300" y="86" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#15803d">A, P = 0.6</text>
  <circle cx="300" cy="250" r="24" fill="rgba(220,38,38,0.14)" stroke="#b91c1c" stroke-width="2"/>
  <text x="300" y="256" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#b91c1c">A′, 0.4</text>
  <line x1="114" y1="152" x2="276" y2="88" stroke="#475569" stroke-width="2"/>
  <line x1="114" y1="178" x2="276" y2="242" stroke="#475569" stroke-width="2"/>
  <circle cx="520" cy="50" r="24" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="520" y="56" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">B|A 0.3</text>
  <circle cx="520" cy="120" r="24" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="520" y="126" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">B′|A 0.7</text>
  <circle cx="520" cy="220" r="24" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="520" y="226" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">B|A′ 0.1</text>
  <circle cx="520" cy="290" r="24" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="520" y="296" font-size="12" font-weight="bold" text-anchor="middle" fill="#0f172a">B′|A′ 0.9</text>
  <line x1="324" y1="72" x2="496" y2="54" stroke="#475569" stroke-width="1.8"/>
  <line x1="324" y1="90" x2="496" y2="116" stroke="#475569" stroke-width="1.8"/>
  <line x1="324" y1="242" x2="496" y2="224" stroke="#475569" stroke-width="1.8"/>
  <line x1="324" y1="258" x2="496" y2="286" stroke="#475569" stroke-width="1.8"/>
  <text x="60" y="316" font-size="12.5" fill="#0f172a" font-weight="bold">P(B) = 0.6·0.3 + 0.4·0.1 = 0.22   ·   P(A|B) = 0.18/0.22 ≈ 0.818 (Bayes)</text>
</svg>`;
