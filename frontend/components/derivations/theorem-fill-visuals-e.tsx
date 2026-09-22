"use client";

/**
 * Theorem Fill visuals — Module E: Biology (Mendel, chromosome theory, rDNA)
 * + Mathematics (statics, Bayes, Leibniz, differentiability, ODE, LPP, line).
 */

import type { ReactNode } from "react";

export function renderTheoremFillVisualE(type: string, showAnnotations: boolean): ReactNode | null {
  switch (type) {
    case "tv-mendel-laws":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Punnett square Tt × Tt */}
          <g transform="translate(60, 55)">
            <text x="130" y="0" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Tt × Tt (monohybrid F₂)</text>
            {([
              [0, 0, "T", "TT"],
              [1, 0, "t", "Tt"],
              [0, 1, "T", "Tt"],
              [1, 1, "t", "tt"],
            ] as [number, number, string, string][]).map(([c, r, g, cell]) => (
              <g key={`${c}-${r}`} transform={`translate(${60 + c * 90}, ${20 + r * 60})`}>
                <rect x="0" y="0" width="80" height="52" rx="6" fill={cell === "tt" ? "#ef444422" : "#10b98122"} stroke={cell === "tt" ? "#ef4444" : "#10b981"} strokeWidth="1.5" />
                <text x="40" y="33" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">{cell}</text>
                <text x="-14" y={r === 0 ? 30 : 30} fill="#94a3b8" fontSize="10">{r === 0 ? g : g}</text>
                <text x={c === 0 ? 38 : 38} y="14" fill="#64748b" fontSize="8">{c === 0 && r === 0 ? "gametes" : ""}</text>
              </g>
            ))}
            <text x="230" y="55" fill="#10b981" fontSize="10.5" fontWeight="bold">3 : 1 phenotype</text>
            <text x="230" y="78" fill="#38bdf8" fontSize="10.5" fontWeight="bold">1 : 2 : 1 genotype</text>
            <text x="230" y="101" fill="#94a3b8" fontSize="9">TT tall · Tt tall · tt dwarf</text>
          </g>
          {/* Dihybrid + laws */}
          <g transform="translate(400, 45)">
            <rect x="0" y="0" width="260" height="150" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="14" y="24" fill="#10b981" fontSize="10.5" fontWeight="bold">Dihybrid RrYy × RrYy</text>
            <text x="14" y="52" fill="#e2e8f0" fontSize="10.5" fontWeight="bold">9 : 3 : 3 : 1</text>
            <text x="14" y="74" fill="#94a3b8" fontSize="9">round-yellow · round-green ·</text>
            <text x="14" y="92" fill="#94a3b8" fontSize="9">wrinkled-yellow · wrinkled-green</text>
            <text x="14" y="118" fill="#fbbf24" fontSize="9">(3:1)² — the two characters</text>
            <text x="14" y="136" fill="#fbbf24" fontSize="9">inherited independently</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="60" y="228" width="600" height="120" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="76" y="252" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Law of Dominance — alleles pair; the dominant masks the recessive in F₁.</text>
              <text x="76" y="276" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Law of Segregation — alleles separate cleanly in gametes (no blending!).</text>
              <text x="76" y="300" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Law of Independent Assortment — allele pairs sort independently (metaphase I).</text>
              <text x="76" y="324" fill="#94a3b8" fontSize="9">Test cross (Tt × tt → 1:1) reveals genotype · exceptions: incomplete dominance (pink 4 o'clock), codominance (AB blood), linkage.</text>
              <text x="76" y="342" fill="#94a3b8" fontSize="9">Mendel's luck: 7 characters on 4 chromosomes, all unlinked — modern genetics began where his ratios held.</text>
            </g>
          )}
        </svg>
      );

    case "tv-chromosome-theory":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Meiosis to gametes */}
          <g transform="translate(55, 60)">
            <rect x="0" y="0" width="170" height="110" rx="10" fill="#0b1220" stroke="#38bdf8" strokeWidth="2" />
            <text x="85" y="24" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">2n cell (Boveri–Sutton)</text>
            <line x1="30" y1="60" x2="30" y2="95" stroke="#ef4444" strokeWidth="5" />
            <line x1="50" y1="60" x2="50" y2="95" stroke="#38bdf8" strokeWidth="5" />
            <line x1="110" y1="60" x2="110" y2="95" stroke="#10b981" strokeWidth="5" />
            <line x1="130" y1="60" x2="130" y2="95" stroke="#a855f7" strokeWidth="5" />
            <text x="85" y="132" fill="#94a3b8" fontSize="9" textAnchor="middle">chromosome pairs (homologues)</text>
            <line x1="85" y1="140" x2="85" y2="165" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
            <rect x="15" y="170" width="140" height="44" rx="8" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="85" y="196" fill="#fbbf24" fontSize="10" textAnchor="middle">gametes n: one of each pair</text>
          </g>
          {/* Parallels card */}
          <g transform="translate(380, 55)">
            <rect x="0" y="0" width="280" height="230" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="14" y="24" fill="#10b981" fontSize="10.5" fontWeight="bold">Sutton–Boveri parallels (1902–03):</text>
            <text x="14" y="50" fill="#e2e8f0" fontSize="9.5">① genes come in pairs ⇔ chromosome pairs</text>
            <text x="14" y="74" fill="#e2e8f0" fontSize="9.5">② allele segregation ⇔ anaphase I split</text>
            <text x="14" y="98" fill="#e2e8f0" fontSize="9.5">③ independent assortment ⇔ random</text>
            <text x="14" y="116" fill="#e2e8f0" fontSize="9.5">metaphase-I orientation</text>
            <text x="14" y="142" fill="#e2e8f0" fontSize="9.5">④ fertilisation restores 2n ⇔ gene pairs</text>
            <text x="14" y="170" fill="#a855f7" fontSize="9">⇒ genes are LOCATED ON chromosomes</text>
            <text x="14" y="196" fill="#38bdf8" fontSize="9">Morgan: white-eyed fly (X-linked) proved</text>
            <text x="14" y="214" fill="#38bdf8" fontSize="9">specific genes occupy specific loci</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="55" y="300" width="605" height="48" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="71" y="320" fill="#f59e0b" fontSize="10" fontWeight="bold">Sex determination: XX ♀ / XY ♂ (man, Drosophila) · ZW in birds — the heterogametic parent decides.</text>
              <text x="71" y="338" fill="#94a3b8" fontSize="9">Linkage beats assortment when loci share a chromosome — recombination frequency maps them (1 map unit = 1% crossing over).</text>
            </g>
          )}
        </svg>
      );

    case "tv-rdna-technology":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Pipeline */}
          <g transform="translate(50, 40)">
            <rect x="0" y="0" width="600" height="120" rx="10" fill="#0b1220" stroke="#38bdf8" strokeWidth="2" />
            <text x="300" y="24" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Recombinant DNA pipeline</text>
            {/* Steps */}
            {[
              ["1. Restriction", "ECORI cuts", 20],
              ["2. Vector", "plasmid", 150],
              ["3. Ligase", "join insert", 280],
              ["4. Transform", "E. coli host", 410],
              ["5. Select", "antibiotic", 520],
            ].map(([t, d, x], i) => (
              <g key={t} transform={`translate(${x}, 40)`}>
                <rect x="0" y="0" width="95" height="58" rx="7" fill="#0f172a" stroke={i === 0 || i === 2 ? "#ef4444" : "#10b981"} strokeWidth="1.5" />
                <text x="47" y="22" fill="#e2e8f0" fontSize="8.5" fontWeight="bold" textAnchor="middle">{t}</text>
                <text x="47" y="40" fill="#94a3b8" fontSize="7.5" textAnchor="middle">{d}</text>
              </g>
            ))}
          </g>
          {/* Cut sites detail */}
          <g transform="translate(50, 190)">
            <rect x="0" y="0" width="290" height="120" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#ef4444" strokeWidth="1.5" />
            <text x="145" y="22" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">EcoRI sticky ends</text>
            <text x="145" y="52" fill="#e2e8f0" fontSize="10.5" fontFamily="monospace" textAnchor="middle">G↓AATTC</text>
            <text x="145" y="70" fill="#e2e8f0" fontSize="10.5" fontFamily="monospace" textAnchor="middle">CTTAA↑G</text>
            <text x="145" y="96" fill="#94a3b8" fontSize="9" textAnchor="middle">palindromic · staggered cut →</text>
            <text x="145" y="112" fill="#94a3b8" fontSize="9" textAnchor="middle">single-strand tails that re-anneal</text>
          </g>
          {/* Ti plasmid + PCR */}
          <g transform="translate(380, 190)">
            <rect x="0" y="0" width="270" height="120" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
            <text x="14" y="24" fill="#a855f7" fontSize="10" fontWeight="bold">Vector toolbox:</text>
            <text x="14" y="48" fill="#e2e8f0" fontSize="9">Ti plasmid (Agrobacterium) → plants</text>
            <text x="14" y="70" fill="#e2e8f0" fontSize="9">retrovirus / plasmid pBR322 → animals</text>
            <text x="14" y="92" fill="#fbbf24" fontSize="9">PCR (Taq) amplifies DNA between primers</text>
            <text x="14" y="112" fill="#94a3b8" fontSize="9">origin + selectable marker + cloning site</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="50" y="322" width="600" height="30" rx="7" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.2" />
              <text x="66" y="341" fill="#10b981" fontSize="9.5">Products: human insulin (Humulin), Bt cotton (cry genes), golden rice, gene therapy vectors.</text>
            </g>
          )}
        </svg>
      );

    case "tv-statics-parallelogram":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Parallelogram construction */}
          <g transform="translate(70, 50)">
            {/* Axes */}
            <line x1="0" y1="200" x2="380" y2="200" stroke="#334155" strokeWidth="1.5" />
            <line x1="0" y1="200" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
            {/* P and Q vectors */}
            <line x1="0" y1="200" x2="260" y2="200" stroke="#ef4444" strokeWidth="3.5" />
            <text x="130" y="222" fill="#ef4444" fontSize="11" fontWeight="bold">P (290 N)</text>
            <line x1="0" y1="200" x2="130" y2="80" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="30" y="90" fill="#38bdf8" fontSize="11" fontWeight="bold">Q (180 N)</text>
            {/* Parallelogram */}
            <line x1="260" y1="200" x2="390" y2="80" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="130" y1="80" x2="390" y2="80" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
            {/* Resultant */}
            <line x1="0" y1="200" x2="390" y2="80" stroke="#10b981" strokeWidth="4" />
            <text x="200" y="128" fill="#10b981" fontSize="12" fontWeight="bold">R</text>
            {/* Angle */}
            <path d="M 60 200 A 60 60 0 0 0 50 156" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <text x="70" y="172" fill="#fbbf24" fontSize="10">θ</text>
            {/* Formula */}
            <text x="0" y="256" fill="#fbbf24" fontSize="12" fontWeight="bold">R = √(P² + Q² + 2PQ cos θ)</text>
            <text x="0" y="280" fill="#38bdf8" fontSize="10">tan α = Q sin θ / (P + Q cos θ)  (α from P)</text>
          </g>
          {/* Special cases */}
          <g transform="translate(470, 55)">
            <rect x="0" y="0" width="200" height="220" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
            <text x="14" y="24" fill="#a855f7" fontSize="10" fontWeight="bold">Special cases</text>
            <text x="14" y="52" fill="#10b981" fontSize="9.5">θ = 0: R = P + Q (max)</text>
            <text x="14" y="78" fill="#38bdf8" fontSize="9.5">θ = 90°: R = √(P²+Q²)</text>
            <text x="14" y="104" fill="#fbbf24" fontSize="9.5">θ = 180°: R = |P − Q| (min)</text>
            <text x="14" y="130" fill="#ef4444" fontSize="9.5">P = Q, θ = 120°: R = P</text>
            <text x="14" y="156" fill="#94a3b8" fontSize="9">R = 0 ⇔ equilibrium</text>
            <text x="14" y="180" fill="#94a3b8" fontSize="9">(concurrent forces)</text>
            <text x="14" y="208" fill="#a855f7" fontSize="9">Lami: each / sin angle = const</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="70" y="310" width="600" height="38" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="86" y="328" fill="#f59e0b" fontSize="10" fontWeight="bold">Derivation: law of cosines on the triangle P, Q, −R, or resolve both onto axes and add components.</text>
              <text x="86" y="342" fill="#94a3b8" fontSize="9">Moment of a force: M = F × d ⊥ — the turning counterpart used in beams and levers.</text>
            </g>
          )}
        </svg>
      );

    case "tv-bayes-theorem":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Tree diagram */}
          <g transform="translate(60, 55)">
            <text x="0" y="0" fill="#38bdf8" fontSize="11" fontWeight="bold">Disease test — 1% have it (D), test 99% accurate</text>
            {/* Root */}
            <circle cx="30" cy="80" r="8" fill="#e2e8f0" />
            {/* D branch */}
            <line x1="38" y1="75" x2="130" y2="30" stroke="#10b981" strokeWidth="2.5" />
            <text x="52" y="30" fill="#10b981" fontSize="9">0.01</text>
            <text x="140" y="34" fill="#10b981" fontSize="9.5" fontWeight="bold">+ → 0.99 × 0.01 = 0.0099 ✓ TRUE positive</text>
            <line x1="38" y1="85" x2="130" y2="130" stroke="#ef4444" strokeWidth="2.5" />
            <text x="52" y="122" fill="#ef4444" fontSize="9">0.01</text>
            <text x="140" y="134" fill="#ef4444" fontSize="9.5" fontWeight="bold">− → 0.01 × 0.01 = 0.0001 ✗ missed</text>
            {/* no-D branch */}
            <line x1="38" y1="90" x2="130" y2="185" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="52" y="150" fill="#38bdf8" fontSize="9">0.99</text>
            <text x="140" y="189" fill="#38bdf8" fontSize="9.5" fontWeight="bold">+ → 0.99 × 0.01 = 0.0099 ✗ FALSE positive!</text>
            <line x1="38" y1="90" x2="130" y2="235" stroke="#64748b" strokeWidth="2.5" />
            <text x="140" y="239" fill="#64748b" fontSize="9.5">− → 0.99 × 0.99 = 0.9801 ✓ clean</text>
          </g>
          {/* Bayes computation */}
          <g transform="translate(420, 60)">
            <rect x="0" y="0" width="250" height="240" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="14" y="26" fill="#f59e0b" fontSize="10.5" fontWeight="bold">P(D | +) = ?</text>
            <text x="14" y="56" fill="#e2e8f0" fontSize="10">P(+) = 0.0099 + 0.0099 = 0.0198</text>
            <text x="14" y="86" fill="#10b981" fontSize="11" fontWeight="bold">P(D|+) = 0.0099 / 0.0198 = 50%!</text>
            <text x="14" y="118" fill="#94a3b8" fontSize="9.5">Half the positives are false —</text>
            <text x="14" y="138" fill="#94a3b8" fontSize="9.5">rare disease + decent test ≠ certainty.</text>
            <line x1="14" y1="156" x2="236" y2="156" stroke="#334155" strokeWidth="1" />
            <text x="14" y="182" fill="#38bdf8" fontSize="10" fontWeight="bold">P(A|B) = P(B|A)·P(A) / P(B)</text>
            <text x="14" y="210" fill="#94a3b8" fontSize="9">P(B) = Σ P(B|Aᵢ)·P(Aᵢ) — total probability</text>
            <text x="14" y="230" fill="#a855f7" fontSize="9">prior P(D)=1% → posterior 50% after evidence</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="60" y="316" width="610" height="34" rx="7" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.2" />
              <text x="76" y="337" fill="#38bdf8" fontSize="10">Base-rate fallacy: ignore P(A) and the "99% accurate" claim collapses — conditional probability reverses only via Bayes.</text>
            </g>
          )}
        </svg>
      );

    case "tv-leibniz-theorem":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <text x="350" y="40" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">d/dx ∫₍ᵤ₎^₍ᵥ₎ f(t) dt = f(v)·v′ − f(u)·u′</text>
          {/* Flow diagram */}
          <g transform="translate(70, 70)">
            <rect x="0" y="0" width="180" height="90" rx="9" fill="#0b1220" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="90" y="26" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Split the integral</text>
            <text x="90" y="50" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">∫_a^v − ∫_a^u</text>
            <text x="90" y="70" fill="#94a3b8" fontSize="8.5" textAnchor="middle">(a = fixed reference point)</text>
            <rect x="230" y="0" width="180" height="90" rx="9" fill="#0b1220" stroke="#10b981" strokeWidth="1.5" />
            <text x="320" y="26" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">2. FTC on each</text>
            <text x="320" y="50" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">d/dv ∫_a^v f = f(v)·v′</text>
            <text x="320" y="70" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">(chain rule × u′ or v′)</text>
            <rect x="460" y="0" width="180" height="90" rx="9" fill="#0b1220" stroke="#ef4444" strokeWidth="1.5" />
            <text x="550" y="26" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">3. Subtract</text>
            <text x="550" y="50" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">f(v)v′ − f(u)u′</text>
            <text x="550" y="70" fill="#94a3b8" fontSize="8.5" textAnchor="middle">sign flips on the lower limit</text>
            <line x1="180" y1="45" x2="228" y2="45" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
            <line x1="410" y1="45" x2="458" y2="45" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
          </g>
          {/* Area intuition */}
          <g transform="translate(80, 200)">
            <line x1="0" y1="100" x2="300" y2="100" stroke="#64748b" strokeWidth="2" />
            <path d="M 20 100 Q 150 20 280 90" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <rect x="20" y="57" width="80" height="43" fill="#10b981" fillOpacity="0.3" />
            <rect x="100" y="47" width="10" height="53" fill="#fbbf24" fillOpacity="0.55" />
            <text x="110" y="40" fill="#fbbf24" fontSize="9" textAnchor="middle">dx strip: height f(v)</text>
            <text x="60" y="120" fill="#94a3b8" fontSize="9">area ∫ f — grows as v moves</text>
            <text x="240" y="120" fill="#94a3b8" fontSize="9">u: eats area back (−f(u)u′)</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="420" y="200" width="220" height="140" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#a855f7" strokeWidth="1.5" />
              <text x="434" y="224" fill="#a855f7" fontSize="10" fontWeight="bold">Applications:</text>
              <text x="434" y="248" fill="#e2e8f0" fontSize="9">d/dx ∫₀→x²  e^(−t²) dt = e^(−x⁴)·2x</text>
              <text x="434" y="272" fill="#e2e8f0" fontSize="9">limits both fixed ⇒ derivative 0</text>
              <text x="434" y="296" fill="#e2e8f0" fontSize="9">variable limit + improper: FTC chain</text>
              <text x="434" y="326" fill="#94a3b8" fontSize="9">f continuous on the range of u, v is</text>
              <text x="434" y="344" fill="#94a3b8" fontSize="9">the only hypothesis you need.</text>
            </g>
          )}
        </svg>
      );

    case "tv-differentiability":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Smooth curve */}
          <g transform="translate(70, 60)">
            <line x1="0" y1="200" x2="180" y2="200" stroke="#334155" strokeWidth="1.5" />
            <path d="M 0 200 Q 60 40 170 10" fill="none" stroke="#10b981" strokeWidth="3" />
            <text x="30" y="60" fill="#10b981" fontSize="9.5" fontWeight="bold">smooth ⇒ f′ exists</text>
            <text x="30" y="78" fill="#94a3b8" fontSize="8.5">no break, no corner</text>
          </g>
          {/* Corner (|x|) */}
          <g transform="translate(300, 60)">
            <line x1="0" y1="200" x2="200" y2="200" stroke="#334155" strokeWidth="1.5" />
            <path d="M 10 20 L 100 100 L 190 20" fill="none" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="100" cy="100" r="5" fill="#ef4444" />
            <text x="100" y="140" fill="#ef4444" fontSize="9.5" fontWeight="bold" textAnchor="middle">corner: f′⁻ ≠ f′⁺</text>
            <text x="100" y="158" fill="#94a3b8" fontSize="8.5" textAnchor="middle">|x| at 0 — continuous but not differentiable</text>
          </g>
          {/* Vertical tangent / cusp */}
          <g transform="translate(540, 60)">
            <line x1="0" y1="200" x2="120" y2="200" stroke="#334155" strokeWidth="1.5" />
            <path d="M 60 210 Q 20 130 60 60 Q 100 130 60 210" fill="none" stroke="#a855f7" strokeWidth="3" />
            <circle cx="60" cy="140" r="5" fill="#ef4444" />
            <text x="60" y="235" fill="#a855f7" fontSize="9.5" fontWeight="bold" textAnchor="middle">cusp / vertical tangent</text>
          </g>
          {/* Logic chain */}
          <g transform="translate(70, 240)">
            <rect x="0" y="0" width="590" height="100" rx="9" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="16" y="26" fill="#38bdf8" fontSize="11" fontWeight="bold">differentiable ⇒ continuous (chain: differentiable → smooth tangent → no jump possible)</text>
            <text x="16" y="52" fill="#ef4444" fontSize="10.5">CONVERSE FALSE: |x| is continuous everywhere, differentiable nowhere at 0.</text>
            <text x="16" y="78" fill="#fbbf24" fontSize="9.5">Checks: f′(c) = limₕ→₀ [f(c+h) − f(c)]/h exists ⇒ LHL = RHL of the difference quotient · Rolle needs both C + differentiability.</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="70" y="316" width="590" height="0" />
            </g>
          )}
          {showAnnotations && (
            <g>
              <rect x="70" y="348" width="590" height="0" />
            </g>
          )}
          {showAnnotations && (
            <text x="70" y="356" fill="#94a3b8" fontSize="9">L'Hospital: 0/0 or ∞/∞ ⇒ f′/g′ (verify the form first, else wrong answers).</text>
          )}
        </svg>
      );

    case "tv-ode-formation":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Family of circles */}
          <g transform="translate(80, 70)">
            <line x1="0" y1="160" x2="280" y2="160" stroke="#334155" strokeWidth="1.5" />
            <line x1="140" y1="160" x2="140" y2="10" stroke="#334155" strokeWidth="1.5" />
            {[40, 70, 100].map((r, i) => (
              <g key={r}>
                <circle cx="140" cy="60" r={r} fill="none" stroke={["#38bdf8", "#10b981", "#a855f7"][i]} strokeWidth="2" />
                <text x={140 + r + 4} y="60" fill={["#38bdf8", "#10b981", "#a855f7"][i]} fontSize="8.5">r={r}</text>
              </g>
            ))}
            <text x="140" y="185" fill="#94a3b8" fontSize="9.5" textAnchor="middle">family: (x−a)² + (y−b)² = r² — 3 arbitrary constants</text>
          </g>
          {/* Procedure card */}
          <g transform="translate(430, 55)">
            <rect x="0" y="0" width="230" height="220" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="14" y="24" fill="#f59e0b" fontSize="10.5" fontWeight="bold">Formation recipe:</text>
            <text x="14" y="50" fill="#e2e8f0" fontSize="9.5">① write F(x, y, a, b, …) = 0</text>
            <text x="14" y="74" fill="#e2e8f0" fontSize="9.5">② differentiate — once per</text>
            <text x="14" y="92" fill="#e2e8f0" fontSize="9.5">independent constant (chain rule)</text>
            <text x="14" y="118" fill="#e2e8f0" fontSize="9.5">③ eliminate a, b, … between</text>
            <text x="14" y="136" fill="#e2e8f0" fontSize="9.5">the equations</text>
            <line x1="14" y1="152" x2="216" y2="152" stroke="#334155" strokeWidth="1" />
            <text x="14" y="178" fill="#10b981" fontSize="9.5">n constants ⇒ n-th order ODE</text>
            <text x="14" y="202" fill="#94a3b8" fontSize="9">circles through origin (a=b=0):</text>
          </g>
          {/* Result */}
          <g transform="translate(80, 250)">
            <rect x="0" y="0" width="580" height="70" rx="9" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="16" y="26" fill="#10b981" fontSize="11" fontWeight="bold">Example result: y″ = (1 + y′²)(1+y²)... — the elimination IS the differential equation.</text>
            <text x="16" y="50" fill="#94a3b8" fontSize="9.5">Order = number of independent arbitrary constants · degree = power of highest derivative (after radical-free form).</text>
          </g>
          {showAnnotations && (
            <g>
              <text x="80" y="345" fill="#fbbf24" fontSize="9.5">Solve check: integrating back must recover the family — order and constant count must match.</text>
            </g>
          )}
        </svg>
      );

    case "tv-lpp-formulation":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Feasible region */}
          <g transform="translate(80, 60)">
            <line x1="0" y1="220" x2="360" y2="220" stroke="#64748b" strokeWidth="2" />
            <line x1="0" y1="220" x2="0" y2="10" stroke="#64748b" strokeWidth="2" />
            <text x="330" y="238" fill="#94a3b8" fontSize="10">x</text>
            <text x="-14" y="24" fill="#94a3b8" fontSize="10">y</text>
            {/* Constraints */}
            <line x1="0" y1="100" x2="300" y2="10" stroke="#38bdf8" strokeWidth="2" />
            <text x="150" y="40" fill="#38bdf8" fontSize="9.5">x + 2y ≤ 100</text>
            <line x1="0" y1="190" x2="260" y2="70" stroke="#ef4444" strokeWidth="2" />
            <text x="170" y="110" fill="#ef4444" fontSize="9.5">3x + y ≤ 180</text>
            <line x1="180" y1="220" x2="180" y2="10" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="5 4" />
            <text x="186" y="200" fill="#a855f7" fontSize="9">x ≤ 60</text>
            {/* Feasible polygon */}
            <polygon points="0,220 0,100 120,66 216,79 180,220" fill="#10b981" fillOpacity="0.18" stroke="#10b981" strokeWidth="1.5" />
            <text x="80" y="180" fill="#6ee7b7" fontSize="10" fontWeight="bold">feasible region</text>
            {/* Optimal vertex */}
            <circle cx="216" cy="79" r="6" fill="#fbbf24" />
            <text x="226" y="66" fill="#fbbf24" fontSize="10.5" fontWeight="bold">optimum at vertex!</text>
            {/* Objective line */}
            <line x1="0" y1="150" x2="330" y2="40" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x="250" y="46" fill="#fbbf24" fontSize="9">Z = 3x + 4y (iso-profit)</text>
          </g>
          {/* Steps */}
          <g transform="translate(490, 55)">
            <rect x="0" y="0" width="180" height="230" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="12" y="24" fill="#38bdf8" fontSize="10" fontWeight="bold">Formulation:</text>
            <text x="12" y="50" fill="#e2e8f0" fontSize="9">① decision variables (x, y…)</text>
            <text x="12" y="76" fill="#e2e8f0" fontSize="9">② objective Z → max/min</text>
            <text x="12" y="102" fill="#e2e8f0" fontSize="9">③ constraints ≤ / ≥ / =</text>
            <text x="12" y="128" fill="#e2e8f0" fontSize="9">④ non-negativity x, y ≥ 0</text>
            <line x1="12" y1="144" x2="168" y2="144" stroke="#334155" strokeWidth="1" />
            <text x="12" y="168" fill="#10b981" fontSize="9">convex region ⇒ corner</text>
            <text x="12" y="188" fill="#10b981" fontSize="9">point theorem</text>
            <text x="12" y="214" fill="#fbbf24" fontSize="9">slide iso-profit line out</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="80" y="312" width="590" height="38" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="96" y="330" fill="#fbbf24" fontSize="10" fontWeight="bold">Special cases: multiple optima (edge parallel to Z-line) · unbounded (no max — reformulate) · infeasible (empty region).</text>
              <text x="96" y="344" fill="#94a3b8" fontSize="9">Diet/transport/production problems all reduce to this geometry — vertices are computed by solving constraint pairs.</text>
            </g>
          )}
        </svg>
      );

    case "tv-line-in-space":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          {/* Axes */}
          <g transform="translate(90, 60)">
            <line x1="0" y1="180" x2="280" y2="180" stroke="#64748b" strokeWidth="2" />
            <text x="284" y="184" fill="#94a3b8" fontSize="9.5">x</text>
            <line x1="0" y1="180" x2="0" y2="10" stroke="#64748b" strokeWidth="2" />
            <text x="-8" y="16" fill="#94a3b8" fontSize="9.5">z</text>
            <line x1="0" y1="180" x2="130" y2="120" stroke="#64748b" strokeWidth="2" />
            <text x="134" y="118" fill="#94a3b8" fontSize="9.5">y</text>
            {/* Point + direction line */}
            <circle cx="60" cy="120" r="5" fill="#38bdf8" />
            <text x="40" y="140" fill="#38bdf8" fontSize="9.5">r₀ (x₁,y₁,z₁)</text>
            <line x1="60" y1="120" x2="240" y2="40" stroke="#10b981" strokeWidth="3.5" />
            <text x="150" y="70" fill="#10b981" fontSize="10.5" fontWeight="bold">r = r₀ + t·b⃗</text>
            {/* Direction vector */}
            <line x1="60" y1="120" x2="110" y2="96" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow-end-gold)" />
            <text x="70" y="108" fill="#fbbf24" fontSize="9.5">b⃗</text>
          </g>
          {/* Forms card */}
          <g transform="translate(430, 55)">
            <rect x="0" y="0" width="240" height="240" rx="10" fill="#0f172a" fillOpacity="0.92" stroke="#10b981" strokeWidth="1.5" />
            <text x="14" y="26" fill="#10b981" fontSize="10.5" fontWeight="bold">Three equivalent forms</text>
            <text x="14" y="54" fill="#e2e8f0" fontSize="10">Vector: r = r₀ + t b⃗</text>
            <text x="14" y="82" fill="#e2e8f0" fontSize="10">Cartesian: (x−x₁)/l =</text>
            <text x="14" y="102" fill="#e2e8f0" fontSize="10">(y−y₁)/m = (z−z₁)/n</text>
            <text x="14" y="130" fill="#e2e8f0" fontSize="10">Parametric: x = x₁ + lt, …</text>
            <line x1="14" y1="146" x2="226" y2="146" stroke="#334155" strokeWidth="1" />
            <text x="14" y="170" fill="#38bdf8" fontSize="9.5">angle between lines: cos θ =</text>
            <text x="14" y="188" fill="#38bdf8" fontSize="9.5">(b₁·b₂)/(|b₁||b₂|)</text>
            <text x="14" y="214" fill="#a855f7" fontSize="9.5">skew: not parallel, never meet</text>
            <text x="14" y="232" fill="#fbbf24" fontSize="9.5">line ⊥ plane ⇔ b⃗ ∥ normal</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="90" y="300" width="580" height="48" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="106" y="320" fill="#fbbf24" fontSize="10" fontWeight="bold">Distance point→line: |(r − r₀) × b⃗| / |b⃗| — cross product builds the perpendicular.</text>
              <text x="106" y="338" fill="#94a3b8" fontSize="9">Two planes: n⃗₁·n⃗₂ gives their angle; the line of intersection has direction n⃗₁ × n⃗₂.</text>
            </g>
          )}
        </svg>
      );

    case "tv-diff-rules":
      return (
        <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
          <rect x="20" y="20" width="660" height="320" rx="14" fill="#0f172a" fillOpacity="0.6" stroke="#334155" strokeWidth="1" />
          <text x="350" y="50" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Differentiation Rules — product · quotient · chain · implicit</text>
          <g transform="translate(40, 80)">
            <rect x="0" y="0" width="300" height="46" rx="8" fill="#10b981" fillOpacity="0.12" stroke="#10b981" />
            <text x="14" y="29" fill="#10b981" fontSize="11.5" fontWeight="bold">Product: (uv)′ = u′v + uv′</text>
            <rect x="0" y="60" width="300" height="46" rx="8" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" />
            <text x="14" y="89" fill="#f59e0b" fontSize="11.5" fontWeight="bold">Quotient: (u/v)′ = (u′v − uv′)/v²</text>
            <rect x="0" y="120" width="300" height="46" rx="8" fill="#a855f7" fillOpacity="0.12" stroke="#a855f7" />
            <text x="14" y="149" fill="#a855f7" fontSize="11.5" fontWeight="bold">Chain: dy/dx = dy/du · du/dx</text>
            <rect x="330" y="0" width="300" height="46" rx="8" fill="#38bdf8" fillOpacity="0.12" stroke="#38bdf8" />
            <text x="344" y="29" fill="#38bdf8" fontSize="11.5" fontWeight="bold">Parametric: dy/dx = (dy/dt)/(dx/dt)</text>
            <rect x="330" y="60" width="300" height="46" rx="8" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" />
            <text x="344" y="89" fill="#ef4444" fontSize="11.5" fontWeight="bold">Implicit: differentiate in x, collect dy/dx</text>
            <rect x="330" y="120" width="300" height="46" rx="8" fill="#64748b" fillOpacity="0.2" stroke="#64748b" />
            <text x="344" y="149" fill="#94a3b8" fontSize="11.5" fontWeight="bold">Higher order: d²y/dx² = (d/dx)(dy/dx)</text>
          </g>
          {showAnnotations && (
            <g>
              <rect x="40" y="270" width="620" height="54" rx="8" fill="#0f172a" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="56" y="292" fill="#fbbf24" fontSize="10" fontWeight="bold">Chain example: y = sin(x²) ⇒ dy/dx = cos(x²)·2x — differentiate outer, multiply by inner derivative.</text>
              <text x="56" y="312" fill="#94a3b8" fontSize="9.5">Implicit example: x² + y² = 25 ⇒ 2x + 2y·y′ = 0 ⇒ y′ = −x/y · Parametric: x = at², y = 2at ⇒ dy/dx = 1/t.</text>
            </g>
          )}
        </svg>
      );

    default:
      return null;
  }
}
