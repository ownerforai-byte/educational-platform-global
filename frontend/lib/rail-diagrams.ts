/**
 * rail-diagrams — the drawings the home rails show in their rectangular boxes.
 *
 * Owner request 2026-10-06: "insert the diagrams, in a rectangular box at
 * conceptual place based on their need". Each constant below is one
 * self-contained `<svg>…</svg>` drawing, attached to the row of the card it
 * explains (Concept usually, Derivation or Special cases where the picture
 * belongs there) through `SubjectSlideRow.figure`.
 *
 * Every drawing obeys the note-visuals guard in `lib/content/visuals.ts`, which
 * is what actually renders it: one bounded `<svg>` block, shape/text primitives
 * only, no `<script>`, `<style>`, `<defs>`, gradients, markers, `<use>`,
 * external fetches, `url(#…)` references or inline `on*=` handlers. Arrowheads
 * are plain `<polygon>`s and shading is flat translucent fill, exactly like a
 * printed textbook figure. They are inked on white "paper" in both themes
 * (`.rail-figure`), so the dark strokes stay legible in the dark UI.
 *
 * Cards in the corpus may carry their own inline figure instead of importing
 * from here — this module is for the hand-written curated cards in
 * `lib/home-subject-slides.ts`.
 */

/** Free-body diagram for F = ma: applied force, friction, weight, normal. */
export const FBD_NEWTON = `<svg viewBox="0 0 640 340" role="img">
  <title>Free-body diagram of a block on a rough surface</title>
  <rect x="250" y="170" width="140" height="70" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="60" y1="240" x2="580" y2="240" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="90" y1="240" x2="70" y2="262" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="150" y1="240" x2="130" y2="262" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="210" y1="240" x2="190" y2="262" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="270" y1="240" x2="250" y2="262" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="330" y1="240" x2="310" y2="262" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="390" y1="240" x2="370" y2="262" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="450" y1="240" x2="430" y2="262" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="510" y1="240" x2="490" y2="262" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="320" y1="170" x2="320" y2="96" stroke="#16a34a" stroke-width="3"/>
  <polygon points="320,86 311,105 329,105" fill="#16a34a"/>
  <text x="330" y="112" font-size="15" font-weight="bold" fill="#15803d">R</text>
  <line x1="320" y1="240" x2="320" y2="315" stroke="#dc2626" stroke-width="3"/>
  <polygon points="320,327 311,308 329,308" fill="#dc2626"/>
  <text x="330" y="322" font-size="15" font-weight="bold" fill="#b91c1c">mg</text>
  <line x1="392" y1="205" x2="500" y2="205" stroke="#2563eb" stroke-width="3"/>
  <polygon points="512,205 494,196 494,214" fill="#2563eb"/>
  <text x="452" y="196" font-size="15" font-weight="bold" fill="#1d4ed8">F</text>
  <line x1="248" y1="215" x2="160" y2="215" stroke="#c2410c" stroke-width="3"/>
  <polygon points="148,215 166,206 166,224" fill="#c2410c"/>
  <text x="196" y="206" font-size="15" font-weight="bold" fill="#c2410c">f</text>
  <text x="470" y="300" font-size="13" fill="#475569">net force = F − f</text>
</svg>`;

/** Convex-lens ray diagram: two rays crossing at the inverted image. */
export const LENS_RAY_DIAGRAM = `<svg viewBox="0 0 640 320" role="img">
  <title>Ray diagram for a convex lens</title>
  <line x1="40" y1="160" x2="600" y2="160" stroke="#64748b" stroke-width="1.5" stroke-dasharray="8 6"/>
  <path d="M 300 70 Q 332 160 300 250 Q 268 160 300 70 Z" fill="rgba(96,165,250,0.22)" stroke="#0f172a" stroke-width="2.5"/>
  <circle cx="220" cy="160" r="4" fill="#0f172a"/>
  <circle cx="380" cy="160" r="4" fill="#0f172a"/>
  <text x="220" y="184" font-size="13" text-anchor="middle" fill="#0f172a">F</text>
  <text x="380" y="184" font-size="13" text-anchor="middle" fill="#0f172a">F'</text>
  <line x1="140" y1="160" x2="140" y2="106" stroke="#0f172a" stroke-width="2.5"/>
  <polygon points="140,96 133,112 147,112" fill="#0f172a"/>
  <text x="140" y="186" font-size="13" text-anchor="middle" fill="#0f172a">object</text>
  <line x1="140" y1="100" x2="300" y2="100" stroke="#2563eb" stroke-width="2"/>
  <line x1="300" y1="100" x2="580" y2="310" stroke="#2563eb" stroke-width="2"/>
  <line x1="140" y1="100" x2="545" y2="252" stroke="#16a34a" stroke-width="2"/>
  <line x1="460" y1="160" x2="460" y2="212" stroke="#dc2626" stroke-width="2.5"/>
  <polygon points="460,224 453,208 467,208" fill="#dc2626"/>
  <text x="468" y="240" font-size="13" fill="#b91c1c">real, inverted image</text>
  <text x="60" y="300" font-size="13" fill="#475569">1/v − 1/u = 1/f</text>
</svg>`;

/** Bohr energy levels of hydrogen with the 3 → 2 transition (H-alpha). */
export const BOHR_LEVELS = `<svg viewBox="0 0 640 320" role="img">
  <title>Bohr energy levels of hydrogen and the three to two transition</title>
  <circle cx="78" cy="200" r="26" fill="#fee2e2" stroke="#0f172a" stroke-width="2"/>
  <text x="78" y="207" font-size="17" text-anchor="middle" fill="#b91c1c">+</text>
  <text x="78" y="248" font-size="12" text-anchor="middle" fill="#475569">nucleus</text>
  <line x1="140" y1="290" x2="470" y2="290" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="140" y1="225" x2="470" y2="225" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="140" y1="165" x2="470" y2="165" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="140" y1="115" x2="470" y2="115" stroke="#0f172a" stroke-width="2.5"/>
  <text x="132" y="295" font-size="14" text-anchor="end" fill="#0f172a">n = 1</text>
  <text x="132" y="230" font-size="14" text-anchor="end" fill="#0f172a">n = 2</text>
  <text x="132" y="170" font-size="14" text-anchor="end" fill="#0f172a">n = 3</text>
  <text x="132" y="120" font-size="14" text-anchor="end" fill="#0f172a">n = 4</text>
  <text x="480" y="295" font-size="13" fill="#334155">−13.6 eV</text>
  <text x="480" y="230" font-size="13" fill="#334155">−3.40 eV</text>
  <text x="480" y="170" font-size="13" fill="#334155">−1.51 eV</text>
  <text x="480" y="120" font-size="13" fill="#334155">−0.85 eV</text>
  <line x1="300" y1="165" x2="300" y2="214" stroke="#dc2626" stroke-width="2.5"/>
  <polygon points="300,226 293,210 307,210" fill="#dc2626"/>
  <text x="292" y="200" font-size="13" text-anchor="end" fill="#b91c1c">electron falls</text>
  <polyline points="306,196 318,186 330,206 342,186 354,206 366,186 378,196 392,196" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
  <text x="400" y="192" font-size="13" fill="#6d28d9">photon, 1.89 eV</text>
  <text x="400" y="212" font-size="13" fill="#6d28d9">λ = 656 nm</text>
</svg>`;

/** VSEPR shapes: linear, trigonal planar, bent and tetrahedral. */
export const VSEPR_SHAPES = `<svg viewBox="0 0 640 215" role="img">
  <title>VSEPR shapes with their bond angles</title>
  <text x="80" y="26" font-size="13" text-anchor="middle" fill="#334155">CO₂</text>
  <text x="240" y="26" font-size="13" text-anchor="middle" fill="#334155">BF₃</text>
  <text x="400" y="26" font-size="13" text-anchor="middle" fill="#334155">H₂O</text>
  <text x="560" y="26" font-size="13" text-anchor="middle" fill="#334155">CH₄</text>
  <line x1="74" y1="100" x2="36" y2="100" stroke="#475569" stroke-width="2.5"/>
  <line x1="86" y1="100" x2="124" y2="100" stroke="#475569" stroke-width="2.5"/>
  <circle cx="80" cy="100" r="9" fill="#0f172a"/>
  <circle cx="28" cy="100" r="8" fill="#93c5fd" stroke="#1e3a8a" stroke-width="1.5"/>
  <circle cx="132" cy="100" r="8" fill="#93c5fd" stroke="#1e3a8a" stroke-width="1.5"/>
  <line x1="240" y1="94" x2="240" y2="56" stroke="#475569" stroke-width="2.5"/>
  <line x1="246" y1="104" x2="284" y2="124" stroke="#475569" stroke-width="2.5"/>
  <line x1="234" y1="104" x2="196" y2="124" stroke="#475569" stroke-width="2.5"/>
  <circle cx="240" cy="100" r="9" fill="#0f172a"/>
  <circle cx="240" cy="48" r="8" fill="#a7f3d0" stroke="#065f46" stroke-width="1.5"/>
  <circle cx="291" cy="128" r="8" fill="#a7f3d0" stroke="#065f46" stroke-width="1.5"/>
  <circle cx="189" cy="128" r="8" fill="#a7f3d0" stroke="#065f46" stroke-width="1.5"/>
  <circle cx="380" cy="68" r="4" fill="#7c3aed"/>
  <circle cx="394" cy="58" r="4" fill="#7c3aed"/>
  <circle cx="406" cy="58" r="4" fill="#7c3aed"/>
  <circle cx="420" cy="68" r="4" fill="#7c3aed"/>
  <line x1="394" y1="102" x2="352" y2="132" stroke="#475569" stroke-width="2.5"/>
  <line x1="406" y1="102" x2="448" y2="132" stroke="#475569" stroke-width="2.5"/>
  <circle cx="400" cy="98" r="9" fill="#0f172a"/>
  <circle cx="345" cy="138" r="8" fill="#fecaca" stroke="#991b1b" stroke-width="1.5"/>
  <circle cx="455" cy="138" r="8" fill="#fecaca" stroke="#991b1b" stroke-width="1.5"/>
  <line x1="560" y1="94" x2="560" y2="54" stroke="#475569" stroke-width="2.5"/>
  <line x1="552" y1="104" x2="514" y2="128" stroke="#475569" stroke-width="2.5"/>
  <line x1="568" y1="104" x2="606" y2="128" stroke="#475569" stroke-width="2.5"/>
  <polygon points="560,100 543,126 577,126" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
  <circle cx="560" cy="100" r="9" fill="#0f172a"/>
  <circle cx="560" cy="46" r="8" fill="#fde68a" stroke="#92400e" stroke-width="1.5"/>
  <circle cx="506" cy="134" r="8" fill="#fde68a" stroke="#92400e" stroke-width="1.5"/>
  <circle cx="614" cy="134" r="8" fill="#fde68a" stroke="#92400e" stroke-width="1.5"/>
  <circle cx="560" cy="140" r="8" fill="#fde68a" stroke="#92400e" stroke-width="1.5"/>
  <text x="80" y="196" font-size="12" text-anchor="middle" fill="#0f172a">Linear · 180°</text>
  <text x="240" y="196" font-size="12" text-anchor="middle" fill="#0f172a">Trigonal planar · 120°</text>
  <text x="400" y="196" font-size="12" text-anchor="middle" fill="#0f172a">Bent · 104.5°</text>
  <text x="560" y="196" font-size="12" text-anchor="middle" fill="#0f172a">Tetrahedral · 109.5°</text>
</svg>`;

/** Animal cell with its labelled organelles. */
export const ANIMAL_CELL = `<svg viewBox="0 0 640 400" role="img">
  <title>Labelled animal cell</title>
  <ellipse cx="250" cy="200" rx="172" ry="132" fill="#eef7f1"/>
  <ellipse cx="250" cy="200" rx="178" ry="138" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="7 5"/>
  <ellipse cx="250" cy="200" rx="185" ry="145" fill="none" stroke="#0f172a" stroke-width="2.5"/>
  <circle cx="215" cy="185" r="52" fill="#dbeafe" stroke="#0f172a" stroke-width="2"/>
  <circle cx="232" cy="196" r="17" fill="#93c5fd" stroke="#1e3a8a" stroke-width="1.5"/>
  <path d="M 272 140 q 20 -14 40 0 q 20 14 40 0" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
  <circle cx="286" cy="136" r="2.6" fill="#7c3aed"/>
  <circle cx="316" cy="132" r="2.6" fill="#7c3aed"/>
  <circle cx="346" cy="136" r="2.6" fill="#7c3aed"/>
  <ellipse cx="335" cy="258" rx="44" ry="21" fill="#fee2e2" stroke="#0f172a" stroke-width="2"/>
  <polyline points="316,272 328,256 340,272 352,256 364,272" fill="none" stroke="#b91c1c" stroke-width="1.8"/>
  <path d="M 300 300 q 34 -20 68 0" fill="none" stroke="#0f766e" stroke-width="2.5"/>
  <path d="M 306 313 q 28 -18 56 0" fill="none" stroke="#0f766e" stroke-width="2.5"/>
  <path d="M 312 326 q 22 -16 44 0" fill="none" stroke="#0f766e" stroke-width="2.5"/>
  <line x1="436" y1="66" x2="402" y2="86" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="436" y1="101" x2="262" y2="150" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="436" y1="136" x2="243" y2="188" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="436" y1="171" x2="330" y2="138" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="436" y1="230" x2="370" y2="250" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="436" y1="290" x2="350" y2="300" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="436" y1="336" x2="190" y2="300" stroke="#94a3b8" stroke-width="1.2"/>
  <text x="442" y="70" font-size="13" fill="#0f172a">Cell membrane</text>
  <text x="442" y="105" font-size="13" fill="#0f172a">Nucleus</text>
  <text x="442" y="140" font-size="13" fill="#0f172a">Nucleolus</text>
  <text x="442" y="175" font-size="13" fill="#0f172a">Rough ER + ribosomes</text>
  <text x="442" y="234" font-size="13" fill="#0f172a">Mitochondrion</text>
  <text x="442" y="294" font-size="13" fill="#0f172a">Golgi body</text>
  <text x="442" y="340" font-size="13" fill="#0f172a">Cytoplasm</text>
</svg>`;

/** Lindeman's 10 % law drawn as an upright energy pyramid. */
export const ENERGY_PYRAMID = `<svg viewBox="0 0 640 320" role="img">
  <title>Upright energy pyramid and the ten percent law</title>
  <polygon points="300,60 340,60 363,108 277,108" fill="#dcfce7" stroke="#0f172a" stroke-width="2"/>
  <polygon points="277,108 363,108 386,156 254,156" fill="#bbf7d0" stroke="#0f172a" stroke-width="2"/>
  <polygon points="254,156 386,156 409,204 231,204" fill="#86efac" stroke="#0f172a" stroke-width="2"/>
  <polygon points="231,204 409,204 432,252 208,252" fill="#4ade80" stroke="#0f172a" stroke-width="2"/>
  <line x1="176" y1="84" x2="296" y2="84" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="176" y1="132" x2="274" y2="132" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="176" y1="180" x2="251" y2="180" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="176" y1="228" x2="228" y2="228" stroke="#94a3b8" stroke-width="1.2"/>
  <text x="170" y="88" font-size="12" text-anchor="end" fill="#0f172a">Tertiary consumers</text>
  <text x="170" y="136" font-size="12" text-anchor="end" fill="#0f172a">Secondary consumers</text>
  <text x="170" y="184" font-size="12" text-anchor="end" fill="#0f172a">Primary consumers</text>
  <text x="170" y="232" font-size="12" text-anchor="end" fill="#0f172a">Producers</text>
  <text x="320" y="92" font-size="12" text-anchor="middle" fill="#14532d">10 kJ</text>
  <text x="320" y="140" font-size="12" text-anchor="middle" fill="#14532d">100 kJ</text>
  <text x="320" y="188" font-size="12" text-anchor="middle" fill="#14532d">1 000 kJ</text>
  <text x="320" y="236" font-size="12" text-anchor="middle" fill="#14532d">10 000 kJ</text>
  <line x1="500" y1="252" x2="500" y2="84" stroke="#0284c7" stroke-width="3"/>
  <polygon points="500,68 491,90 509,90" fill="#0284c7"/>
  <text x="520" y="168" font-size="13" text-anchor="middle" fill="#0369a1" transform="rotate(-90 520 168)">energy flow</text>
</svg>`;

/** Tt × Tt Punnett square: 1 TT : 2 Tt : 1 tt, so 3 tall : 1 dwarf. */
export const PUNNETT_SQUARE = `<svg viewBox="0 0 640 330" role="img">
  <title>Punnett square for a monohybrid cross</title>
  <text x="200" y="40" font-size="15" fill="#334155">Parents: Tt × Tt</text>
  <text x="245" y="74" font-size="18" text-anchor="middle" fill="#1d4ed8">T</text>
  <text x="335" y="74" font-size="18" text-anchor="middle" fill="#1d4ed8">t</text>
  <text x="178" y="144" font-size="18" text-anchor="middle" fill="#1d4ed8">T</text>
  <text x="178" y="234" font-size="18" text-anchor="middle" fill="#1d4ed8">t</text>
  <rect x="200" y="90" width="90" height="90" fill="#eff6ff" stroke="#0f172a" stroke-width="2"/>
  <rect x="290" y="90" width="90" height="90" fill="#dbeafe" stroke="#0f172a" stroke-width="2"/>
  <rect x="200" y="180" width="90" height="90" fill="#dbeafe" stroke="#0f172a" stroke-width="2"/>
  <rect x="290" y="180" width="90" height="90" fill="#bfdbfe" stroke="#0f172a" stroke-width="2"/>
  <text x="245" y="146" font-size="22" text-anchor="middle" fill="#0f172a">TT</text>
  <text x="335" y="146" font-size="22" text-anchor="middle" fill="#0f172a">Tt</text>
  <text x="245" y="236" font-size="22" text-anchor="middle" fill="#0f172a">Tt</text>
  <text x="335" y="236" font-size="22" text-anchor="middle" fill="#0f172a">tt</text>
  <text x="400" y="140" font-size="13" fill="#0f172a">1 TT : 2 Tt : 1 tt</text>
  <text x="400" y="164" font-size="13" fill="#0f172a">genotype ratio</text>
  <text x="400" y="210" font-size="13" fill="#0f172a">3 tall : 1 dwarf</text>
  <text x="400" y="234" font-size="13" fill="#0f172a">phenotype ratio</text>
  <text x="200" y="302" font-size="13" fill="#475569">Every gamete carries one factor; the squares recombine them at random.</text>
</svg>`;

/** Unit circle: the radius, and the sin/cos legs of the angle θ. */
export const UNIT_CIRCLE = `<svg viewBox="0 0 640 380" role="img">
  <title>The unit circle and the sine and cosine of an angle</title>
  <text x="52" y="52" font-size="15" fill="#334155">x² + y² = 1</text>
  <circle cx="250" cy="190" r="115" fill="none" stroke="#0f172a" stroke-width="2"/>
  <line x1="80" y1="190" x2="450" y2="190" stroke="#64748b" stroke-width="1.5"/>
  <polygon points="460,190 444,184 444,196" fill="#64748b"/>
  <line x1="250" y1="340" x2="250" y2="40" stroke="#64748b" stroke-width="1.5"/>
  <polygon points="250,30 244,46 256,46" fill="#64748b"/>
  <text x="466" y="186" font-size="14" fill="#475569">x</text>
  <text x="258" y="40" font-size="14" fill="#475569">y</text>
  <line x1="250" y1="190" x2="338" y2="116" stroke="#2563eb" stroke-width="2.5"/>
  <line x1="338" y1="116" x2="338" y2="190" stroke="#16a34a" stroke-width="2.5"/>
  <line x1="250" y1="190" x2="338" y2="190" stroke="#dc2626" stroke-width="2.5"/>
  <path d="M 298 190 A 48 48 0 0 0 286.8 159.1" fill="none" stroke="#7c3aed" stroke-width="2"/>
  <text x="302" y="180" font-size="15" fill="#6d28d9">θ</text>
  <text x="294" y="212" font-size="14" text-anchor="middle" fill="#b91c1c">cos θ</text>
  <text x="346" y="158" font-size="14" fill="#15803d">sin θ</text>
  <circle cx="338" cy="116" r="4.5" fill="#1d4ed8"/>
  <text x="348" y="110" font-size="14" fill="#1d4ed8">P (cos θ, sin θ)</text>
  <text x="196" y="212" font-size="13" fill="#475569">O</text>
  <text x="252" y="150" font-size="13" fill="#475569">r = 1</text>
</svg>`;
