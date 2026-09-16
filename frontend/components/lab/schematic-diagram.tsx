"use client";

import React, { useMemo } from "react";

export interface DiagramAnnotation {
  id: string;
  label: string;
  formulaOrValue?: string;
  examNote: string;
  labelX: number;
  labelY: number;
  targetX: number;
  targetY: number;
  controlX?: number;
  controlY?: number;
  color?: string;
}

export interface SchematicDiagramProps {
  subjectSlug: string;
  topicSlug: string;
  topicTitle: string;
  unitId?: string;
  className?: string;
}

export function SchematicDiagram({
  subjectSlug,
  topicSlug,
  topicTitle,
  unitId,
  className = "",
}: SchematicDiagramProps) {
  const normalizedSubject = useMemo(() => {
    const s = subjectSlug.toLowerCase();
    if (s.includes("physic")) return "physics";
    if (s.includes("chem")) return "chemistry";
    if (s.includes("bio")) return "biology";
    if (s.includes("math")) return "mathematics";
    return "general";
  }, [subjectSlug]);

  const diagramData = useMemo(() => {
    const t = topicSlug.toLowerCase();
    const title = topicTitle.toLowerCase();
    const u = (unitId || "").toLowerCase();

    const projectileAngle = 45;
    const galvanicConnected = true;

    const specific = true;
    const sharedViewBox = "0 0 900 520";

    if (
      normalizedSubject === "biology" &&
      (t.includes("nephr") || t.includes("kidney") || t.includes("urin") || t.includes("excret") || title.includes("nephr"))
    ) {
      return {
        viewBox: sharedViewBox,
        specific,
        annotations: [
          {
            id: "glomerulus",
            label: "Glomerulus & Bowman's Capsule",
            formulaOrValue: "NFP = GHP - (BCOP + CHP) = 10 mmHg",
            examNote: "CEE: Afferent arteriole is wider than efferent arteriole, creating high hydrostatic pressure for ultrafiltration.",
            labelX: 130,
            labelY: 70,
            targetX: 380,
            targetY: 120,
            controlX: 240,
            controlY: 100,
            color: "#ef4444",
          },
          {
            id: "pct",
            label: "Proximal Convoluted Tubule (PCT)",
            formulaOrValue: "Reabsorbs ~65% filtrate (glucose, Na⁺, H₂O, amino acids)",
            examNote: "CEE: PCT has brush-border microvilli; maximum reabsorption; site of selective secretion (H⁺, NH₃).",
            labelX: 620,
            labelY: 60,
            targetX: 450,
            targetY: 180,
            controlX: 560,
            controlY: 100,
            color: "#38bdf8",
          },
          {
            id: "loop_desc",
            label: "Descending Limb of Henle",
            formulaOrValue: "Permeable to H₂O only; hypertonic filtrate at bend",
            examNote: "NEB: Concentrating segment; ADH-independent water reabsorption via osmosis into medulla.",
            labelX: 620,
            labelY: 230,
            targetX: 330,
            targetY: 330,
            controlX: 520,
            controlY: 290,
            color: "#a855f7",
          },
          {
            id: "loop_asc",
            label: "Ascending Limb of Henle",
            formulaOrValue: "Permeable to salts only (diluting segment)",
            examNote: "CEE: Impermeable to water; NaCl actively pumped out → filtrate becomes hypotonic.",
            labelX: 120,
            labelY: 230,
            targetX: 470,
            targetY: 330,
            controlX: 280,
            controlY: 290,
            color: "#f59e0b",
          },
          {
            id: "dct",
            label: "Distal Convoluted Tubule (DCT)",
            formulaOrValue: "Hormonally controlled (Aldosterone, ADH)",
            examNote: "NEB: Aldosterone → Na⁺ reabsorption; ADH → water permeability; pH adjustment via H⁺ secretion.",
            labelX: 130,
            labelY: 380,
            targetX: 500,
            targetY: 230,
            controlX: 280,
            controlY: 320,
            color: "#10b981",
          },
          {
            id: "collecting",
            label: "Collecting Duct",
            formulaOrValue: "Final concentration; U/P ratio up to 4:1 in man",
            examNote: "CEE: ADH inserts aquaporin-2 channels → ↑ H₂O permeability; passes through hypertonic medulla.",
            labelX: 640,
            labelY: 390,
            targetX: 400,
            targetY: 420,
            controlX: 560,
            controlY: 430,
            color: "#6366f1",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => (
          <g>
            <circle cx="380" cy="120" r="38" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2.5" />
            <g stroke="#ef4444" strokeWidth="1.2" fill="none" opacity="0.65">
              <path d="M 358 118 Q 360 92 376 88" />
              <path d="M 362 120 Q 365 96 378 95" />
              <path d="M 366 120 Q 370 100 382 100" />
            </g>
            <path d="M 318 120 C 260 95 250 190 310 210 C 300 165 330 140 362 130 Z" fill="none" stroke="#64748b" strokeWidth="3" />
            <path d="M 400 140 Q 420 160 450 170 Q 490 180 500 160 Q 500 195 450 205 Q 415 212 412 232 Q 390 255 362 230 Q 366 270 332 278 Q 318 300 320 330 Q 325 380 270 395 Q 220 380 235 350 Q 248 335 266 340 L 266 305 Q 272 270 296 258 L 310 230 Q 275 210 296 180 Q 315 170 345 170 Q 370 165 370 150 Q 380 148 380 150" fill="none" stroke="#64748b" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M 450 170 Q 510 170 560 200 Q 605 225 580 278 Q 555 320 610 338 Q 665 350 650 400 Q 630 455 565 455 Q 490 455 470 405 Q 452 350 400 345 Q 350 340 360 295 Q 370 265 410 260 Q 455 258 466 225 Q 460 200 440 190" fill="none" stroke="#64748b" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M 400 415 L 400 470 L 440 470 L 440 430" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="5 4" opacity="0.85" />
            <g stroke="#64748b" strokeWidth="2" fill="none" opacity="0.5">
              <path d="M 320 65 L 380 65 M 440 65 L 440 85 M 300 80 L 320 80" />
            </g>
          </g>
        ),
      };
    }

    if (
      normalizedSubject === "chemistry" &&
      (t.includes("galvan") || t.includes("volta") || t.includes("electrochem") || t.includes("cell") || title.includes("galvan") || title.includes("volta"))
    ) {
      const anodeColor = "#ef4444";
      const cathodeColor = "#3b82f6";
      return {
        viewBox: sharedViewBox,
        specific,
        annotations: [
          {
            id: "anode",
            label: "Anode — Zinc (Oxidation)",
            formulaOrValue: "Zn(s) → Zn²⁺ + 2e⁻ | E° = −0.76 V",
            examNote: "CEE: Oxidation ALWAYS at anode; anions migrate toward anode; negative electrode in galvanic cell.",
            labelX: 80,
            labelY: 70,
            targetX: 220,
            targetY: 300,
            controlX: 160,
            controlY: 160,
            color: anodeColor,
          },
          {
            id: "cathode",
            label: "Cathode — Copper (Reduction)",
            formulaOrValue: "Cu²⁺ + 2e⁻ → Cu(s) | E° = +0.34 V",
            examNote: "CEE: Reduction ALWAYS at cathode; cations migrate toward cathode; positive electrode in galvanic cell.",
            labelX: 700,
            labelY: 70,
            targetX: 680,
            targetY: 300,
            controlX: 720,
            controlY: 160,
            color: cathodeColor,
          },
          {
            id: "salt",
            label: "Salt Bridge (KCl / KNO₃ in Agar)",
            formulaOrValue: "K⁺ → Cathode half | Cl⁻ → Anode half",
            examNote: "NEB: Maintains electrical neutrality; completes inner circuit; prevents liquid junction potential.",
            labelX: 395,
            labelY: 90,
            targetX: 450,
            targetY: 260,
            controlX: 450,
            controlY: 170,
            color: "#a855f7",
          },
          {
            id: "wire",
            label: galvanicConnected ? "External Wire — e⁻ flow (Zn → Cu)" : "External Wire — open circuit",
            formulaOrValue: galvanicConnected ? "Direction: Anode → Voltmeter → Cathode" : "No e⁻ flow; measured Ecell = OCV 1.10 V",
            examNote: "CEE: e⁻ flow opposite to conventional current; voltmeter reads +1.10 V when salt bridge present.",
            labelX: 395,
            labelY: 450,
            targetX: 450,
            targetY: 155,
            controlX: 460,
            controlY: 340,
            color: "#10b981",
          },
          {
            id: "porous",
            label: "Porous Disk / Junction",
            formulaOrValue: "Alternative to salt bridge; allows ion migration",
            examNote: "NEB: Allows ion contact without extensive mixing; still requires balancing charge per half-cell.",
            labelX: 80,
            labelY: 430,
            targetX: 380,
            targetY: 380,
            controlX: 210,
            controlY: 430,
            color: "#f59e0b",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => (
          <g>
            <path d="M 130 260 L 130 400 L 320 400 L 320 260 Z" fill="#ef4444" fillOpacity="0.08" stroke={anodeColor} strokeWidth="3" />
            <path d="M 580 260 L 580 400 L 770 400 L 770 260 Z" fill="#3b82f6" fillOpacity="0.08" stroke={cathodeColor} strokeWidth="3" />
            <text x="225" y="420" textAnchor="middle" fill={anodeColor} fontSize="11" fontWeight="bold">ZnSO₄(aq) Anolyte</text>
            <text x="675" y="420" textAnchor="middle" fill={cathodeColor} fontSize="11" fontWeight="bold">CuSO₄(aq) Catholyte</text>
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={`zn-${i}`} x={170 + i * 22} y={295 + (i % 2) * 8} width="14" height="40" rx="2" fill={anodeColor} fillOpacity="0.2" stroke={anodeColor} strokeWidth="1.4" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={`cu-${i}`} x={620 + i * 22} y={295 + (i % 2) * 8} width="14" height="40" rx="2" fill={cathodeColor} fillOpacity="0.2" stroke={cathodeColor} strokeWidth="1.4" />
            ))}
            <rect x="218" y="180" width="14" height="120" rx="3" fill={anodeColor} fillOpacity="0.25" stroke={anodeColor} strokeWidth="2.2" />
            <text x="225" y="320" textAnchor="middle" fill={anodeColor} fontSize="10" fontWeight="bold">Zn (-)</text>
            <rect x="668" y="180" width="14" height="120" rx="3" fill={cathodeColor} fillOpacity="0.25" stroke={cathodeColor} strokeWidth="2.2" />
            <text x="675" y="320" textAnchor="middle" fill={cathodeColor} fontSize="10" fontWeight="bold">Cu (+)</text>
            <path d="M 225 180 L 225 155 Q 225 145 235 145 L 425 145" fill="none" stroke="#94a3b8" strokeWidth="2.4" />
            <path d={`M 475 145 ${galvanicConnected ? "L 665 145 Q 675 145 675 155" : "L 495 145 M 645 145 L 665 145 Q 675 145 675 155"}`} fill="none" stroke="#94a3b8" strokeWidth="2.4" />
            <path d="M 675 155 L 675 180" fill="none" stroke="#94a3b8" strokeWidth="2.4" />
            {galvanicConnected && (
              <g>
                <circle cx="450" cy="145" r="22" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                <text x="450" y="141" textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="bold">V</text>
                <text x="450" y="153" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">1.10</text>
                <g stroke="#10b981" strokeWidth="1.4" fill="none">
                  <circle cx="290" cy="145" r="3.5" fill="#10b981" />
                  <circle cx="335" cy="145" r="3.5" fill="#10b981" />
                  <circle cx="560" cy="145" r="3.5" fill="#10b981" />
                  <circle cx="610" cy="145" r="3.5" fill="#10b981" />
                </g>
              </g>
            )}
            {!galvanicConnected && (
              <g>
                <line x1="498" y1="125" x2="518" y2="165" stroke="#ef4444" strokeWidth="3" />
                <circle cx="508" cy="145" r="16" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
              </g>
            )}
            <rect x="436" y="225" width="28" height="170" rx="6" fill="#a855f7" fillOpacity="0.12" stroke="#a855f7" strokeWidth="2.2" />
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`salt-${i}`} x1="440" y1={240 + i * 14} x2="460" y2={240 + i * 14} stroke="#a855f7" strokeWidth="1.2" opacity="0.6" />
            ))}
            <text x="450" y="215" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">Salt</text>
            <text x="450" y="226" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">Bridge</text>
            <line x1="350" y1="380" x2="550" y2="380" stroke="#f59e0b" strokeWidth="2.4" strokeDasharray="6 4" opacity="0.85" />
            <g fill="#f59e0b" opacity="0.85">
              <circle cx="370" cy="370" r="3.5" />
              <circle cx="410" cy="390" r="3.5" />
              <circle cx="490" cy="370" r="3.5" />
              <circle cx="530" cy="390" r="3.5" />
            </g>
          </g>
        ),
      };
    }

    if (
      normalizedSubject === "mathematics" &&
      (t.includes("parabol") || t.includes("conic") || title.includes("parabol") || u.includes("conic") || u.includes("coordinate"))
    ) {
      const yAt = (x: number) => (x * x) / 240;
      return {
        viewBox: sharedViewBox,
        specific,
        annotations: [
          {
            id: "vertex",
            label: "Vertex V (0, 0)",
            formulaOrValue: "Mid-point of focus and foot of directrix",
            examNote: "CEE: Vertex where axis meets parabola; tangent at vertex in standard form y-axis for y²=4a x.",
            labelX: 415,
            labelY: 110,
            targetX: 450,
            targetY: 260,
            controlX: 430,
            controlY: 180,
            color: "#ef4444",
          },
          {
            id: "focus",
            label: "Focus S (a, 0)",
            formulaOrValue: "If a = 60  ⇒  S(60, 0) on +ve x-axis",
            examNote: "NEB: Every ray parallel to axis reflects through focus; basis of parabolic mirrors and reflectors.",
            labelX: 560,
            labelY: 220,
            targetX: 510,
            targetY: 260,
            controlX: 540,
            controlY: 240,
            color: "#38bdf8",
          },
          {
            id: "directrix",
            label: "Directrix x = −a",
            formulaOrValue: "PS = PM = distance to directrix (defining property)",
            examNote: "CEE: e = PS/PM = 1 for parabola; tangent bisects angle between PS and perpendicular to directrix.",
            labelX: 150,
            labelY: 420,
            targetX: 330,
            targetY: 260,
            controlX: 230,
            controlY: 340,
            color: "#a855f7",
          },
          {
            id: "latus",
            label: "Latus Rectum LL'",
            formulaOrValue: "Length = 4a; endpoints (a, ±2a)",
            examNote: "NEB: Latus rectum ⊥ axis through focus; y = 4a x gives latus rectum end at (a, 2a); slope of tangent at L = 1.",
            labelX: 560,
            labelY: 420,
            targetX: 510,
            targetY: 380,
            controlX: 560,
            controlY: 400,
            color: "#10b981",
          },
          {
            id: "axis",
            label: "Axis of Parabola (x-axis)",
            formulaOrValue: "y = 0; line through V and S",
            examNote: "CEE: Parabola symmetric about axis; only one real axis (unlike ellipse/hyperbola two axes).",
            labelX: 150,
            labelY: 80,
            targetX: 600,
            targetY: 260,
            controlX: 360,
            controlY: 130,
            color: "#f59e0b",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => {
          const pts = [];
          for (let x = -240; x <= 360; x += 6) {
            const y = yAt(x + 240);
            pts.push([x + 330, 260 - y]);
          }
          const bottom = [];
          for (let x = 360; x >= -240; x -= 6) {
            const y = yAt(x + 240);
            bottom.push([x + 330, 260 + y]);
          }
          const dPath = "M " + [...pts, ...bottom].map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ") + " Z";
          return (
            <g>
              <line x1="80" y1="260" x2="820" y2="260" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="6 4" opacity="0.75" />
              <text x="825" y="255" fill="#f59e0b" fontSize="10" fontWeight="bold">axis x</text>
              <line x1="450" y1="60" x2="450" y2="470" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.5" />
              <text x="455" y="70" fill="#94a3b8" fontSize="9">y</text>
              <line x1="330" y1="50" x2="330" y2="470" stroke="#a855f7" strokeWidth="2.2" />
              <text x="310" y="50" fill="#a855f7" fontSize="10" fontWeight="bold">x = −a</text>
              <path d={dPath} fill="none" stroke="#64748b" strokeWidth="2.6" />
              <circle cx="450" cy="260" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
              <text x="455" y="252" fill="#ef4444" fontSize="10" fontWeight="bold">V</text>
              <circle cx="510" cy="260" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
              <text x="518" y="252" fill="#38bdf8" fontSize="10" fontWeight="bold">S(a, 0)</text>
              <line x1="510" y1="140" x2="510" y2="380" stroke="#10b981" strokeWidth="2.2" />
              <g fill="#10b981">
                <circle cx="510" cy="140" r="4" />
                <circle cx="510" cy="380" r="4" />
              </g>
              <text x="515" y="138" fill="#10b981" fontSize="10" fontWeight="bold">L</text>
              <text x="515" y="396" fill="#10b981" fontSize="10" fontWeight="bold">L'</text>
              <line x1="510" y1="260" x2="330" y2="260" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.7" />
              <g stroke="#10b981" strokeWidth="1.4" fill="none" opacity="0.85">
                <path d="M 620 200 Q 510 220 510 260" markerEnd="url(#arrow-emerald)" />
                <path d="M 700 260 Q 550 250 510 260" markerEnd="url(#arrow-emerald)" />
              </g>
            </g>
          );
        },
      };
    }

    if (
      normalizedSubject === "physics" &&
      (t.includes("projectil") || t.includes("kinemat") || title.includes("projectil") || u.includes("kinemat") || u.includes("mechanic"))
    ) {
      const rad = (projectileAngle * Math.PI) / 180;
      const v = 185;
      const g = 2.5;
      const tMax = (2 * v * Math.sin(rad)) / g;
      const origin: [number, number] = [140, 400];
      const points = [];
      for (let k = 0; k <= 40; k++) {
        const tt = (tMax * k) / 40;
        const x = v * Math.cos(rad) * tt;
        const y = v * Math.sin(rad) * tt - 0.5 * g * tt * tt;
        points.push([origin[0] + x * 1.15, origin[1] - y * 1.15]);
      }
      const traj = "M " + points.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");
      const peakX = origin[0] + v * Math.cos(rad) * (tMax / 2) * 1.15;
      const peakY = origin[1] - ((v * v * Math.sin(rad) * Math.sin(rad)) / (2 * g)) * 1.15;
      const rangeX = origin[0] + v * Math.cos(rad) * tMax * 1.15;
      return {
        viewBox: sharedViewBox,
        specific,
        annotations: [
          {
            id: "launch",
            label: `Point of Projection O — angle θ = ${projectileAngle}°`,
            formulaOrValue: "ux = v cos θ   ,   uy = v sin θ",
            examNote: "NEB: Horizontal velocity component ux constant throughout (ax = 0); ay = −g downward always.",
            labelX: 70,
            labelY: 80,
            targetX: 140,
            targetY: 400,
            controlX: 120,
            controlY: 230,
            color: "#ef4444",
          },
          {
            id: "peak",
            label: "Maximum Height Point (H)",
            formulaOrValue: `vy = 0 only; H = (v² sin² ${projectileAngle}°)/(2g)`,
            examNote: "CEE: Time to reach H = T/2; velocity at peak is purely horizontal (ux only); projectile not in equilibrium at H.",
            labelX: 390,
            labelY: 60,
            targetX: peakX,
            targetY: peakY,
            controlX: (peakX + 390) / 2,
            controlY: 120,
            color: "#38bdf8",
          },
          {
            id: "range",
            label: "Horizontal Range (R) — landing point",
            formulaOrValue: `R = (v² sin ${2 * projectileAngle}°)/g`,
            examNote: "NEB: R for θ and (90−θ) are equal; R_max at θ = 45° is v²/g; landing speed same magnitude as launch if same elevation.",
            labelX: 750,
            labelY: 100,
            targetX: Math.min(rangeX, 860),
            targetY: origin[1],
            controlX: 780,
            controlY: 240,
            color: "#10b981",
          },
          {
            id: "time",
            label: "Time of Flight (T)",
            formulaOrValue: "T = 2v sin θ / g   (from launch to landing, same level)",
            examNote: "CEE: T depends only on uy vertical component; horizontal range depends on ux × T product.",
            labelX: 540,
            labelY: 440,
            targetX: (origin[0] + Math.min(rangeX, 860)) / 2,
            targetY: origin[1] + 14,
            controlX: 480,
            controlY: 460,
            color: "#a855f7",
          },
          {
            id: "gravity",
            label: "Acceleration g = 9.8 m/s²",
            formulaOrValue: "Acts vertically downward everywhere on path",
            examNote: "NEB: g does NOT slow/speed horizontal motion; independence of x-y motions is KEY to all projectile problems.",
            labelX: 80,
            labelY: 440,
            targetX: 260,
            targetY: 330,
            controlX: 150,
            controlY: 360,
            color: "#f59e0b",
          },
        ] as DiagramAnnotation[],
        renderSvg: () => (
          <g>
            <line x1="80" y1="400" x2="870" y2="400" stroke="#64748b" strokeWidth="2" />
            {Array.from({ length: 40 }).map((_, i) => (
              <line key={`ground-${i}`} x1={90 + i * 20} y1="400" x2={104 + i * 20} y2="412" stroke="#64748b" strokeWidth="1.4" />
            ))}
            <line x1="140" y1="100" x2="140" y2="400" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <path d={traj} fill="none" stroke="#64748b" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="140" y1="400" x2={peakX} y2={peakY} stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6" />
            <line x1={peakX} y1={peakY} x2={Math.min(rangeX, 860)} y2={origin[1]} stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.6" />
            <circle cx="140" cy="400" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.4" />
            <circle cx={peakX} cy={peakY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.4" />
            <circle cx={Math.min(rangeX, 860)} cy={origin[1]} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.4" />
            <path d={`M 140 400 L ${140 + Math.cos(rad) * 95} ${400 - Math.sin(rad) * 95}`} stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
            <line x1={peakX} y1={peakY} x2={peakX} y2={origin[1]} stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
            <text x={peakX + 5} y={(peakY + origin[1]) / 2} fill="#38bdf8" fontSize="10" fontWeight="bold">H</text>
            <line x1={origin[0]} y1={origin[1] + 22} x2={Math.min(rangeX, 860)} y2={origin[1] + 22} stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x={(origin[0] + Math.min(rangeX, 860)) / 2} y={origin[1] + 40} textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">R (range)</text>
            <path d={`M 220 260 Q 230 250 250 260`} fill="none" stroke="#ef4444" strokeWidth="1.8" />
            <text x="255" y="265" fill="#ef4444" fontSize="11" fontWeight="bold">θ = {projectileAngle}°</text>
            <g stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow-amber)">
              <line x1="230" y1="230" x2="230" y2="280" />
              <line x1="300" y1="210" x2="300" y2="260" />
              <line x1="380" y1="185" x2="380" y2="235" />
            </g>
            <g stroke="#38bdf8" strokeWidth="2" fill="none" markerEnd="url(#arrow-cyan)" opacity="0.85">
              <line x1="140" y1="400" x2="210" y2="400" />
              <line x1="300" y1="300" x2="360" y2="300" />
            </g>
          </g>
        ),
      };
    }

    return {
      viewBox: sharedViewBox,
      specific: false,
      annotations: [
        {
          id: "normal",
          label: "Normal Reaction (N)",
          formulaOrValue: "N = mg · cos θ  (perpendicular to plane)",
          examNote: "NEB: Normal acts perpendicular through contact surface; N = mg only on horizontal ground (θ = 0).",
          labelX: 130,
          labelY: 160,
          targetX: 430,
          targetY: 200,
          controlX: 240,
          controlY: 160,
          color: "#10b981",
        },
        {
          id: "weight",
          label: "Weight of Block = mg ↓",
          formulaOrValue: "Always acts vertically downward through CM",
          examNote: "CEE: Resolve mg ALONG and PERPENDICULAR to incline; parallel component drives motion down the plane.",
          labelX: 620,
          labelY: 160,
          targetX: 430,
          targetY: 290,
          controlX: 520,
          controlY: 200,
          color: "#ef4444",
        },
        {
          id: "parallel",
          label: "Down-plane Component (mg·sin θ)",
          formulaOrValue: "Net force ⇒ a = g·sin θ − f/m  (down the plane)",
          examNote: "NEB: Resolves into mg·sin(θ) along incline and mg·cos(θ) perpendicular to incline.",
          labelX: 130,
          labelY: 340,
          targetX: 450,
          targetY: 330,
          controlX: 240,
          controlY: 340,
          color: "#38bdf8",
        },
        {
          id: "friction",
          label: "Opposing Frictional Force (f_s)",
          formulaOrValue: "f_max = μ_s · N",
          examNote: "CEE: Static friction self-adjusts up to limiting value. Angle of repose: tan(θ) = μ_s.",
          labelX: 770,
          labelY: 340,
          targetX: 360,
          targetY: 260,
          controlX: 650,
          controlY: 350,
          color: "#f59e0b",
        },
        {
          id: "incline",
          label: "Inclined Plane Surface",
          formulaOrValue: "Inclination Angle θ",
          examNote: "NEB: Acceleration down a smooth incline: a = g·sin θ; on rough incline: a = g(sin θ − μ cos θ).",
          labelX: 140,
          labelY: 460,
          targetX: 280,
          targetY: 350,
          controlX: 200,
          controlY: 420,
          color: "#a855f7",
        },
      ] as DiagramAnnotation[],
      renderSvg: () => (
        <g>
          <polygon points="240,360 660,360 660,180" fill="#64748b" fillOpacity="0.08" stroke="#64748b" strokeWidth="3" />
          <path d="M 280 360 A 40 40 0 0 0 274 346" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <text x="290" y="352" fill="#fbbf24" fontSize="11" fontWeight="bold">θ</text>
          <g transform="translate(430, 240) rotate(-23)">
            <rect x="-35" y="-25" width="70" height="50" rx="6" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="3" />
            <text x="0" y="5" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">Mass m</text>
          </g>
          <line x1="430" y1="240" x2="400" y2="170" stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#arrow-cyan)" />
          <line x1="430" y1="240" x2="540" y2="190" stroke="#10b981" strokeWidth="3.5" markerEnd="url(#arrow-emerald)" />
          <line x1="430" y1="240" x2="430" y2="330" stroke="#ef4444" strokeWidth="3.5" markerEnd="url(#arrow-red)" />
          <line x1="430" y1="240" x2="350" y2="275" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#arrow-amber)" />
        </g>
      ),
    };
  }, [
    normalizedSubject,
    topicSlug,
    topicTitle,
    unitId,
  ]);

  return (
    <svg
      viewBox={diagramData.viewBox}
      className={`w-full h-full ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#64748b" />
        </marker>
        <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#38bdf8" />
        </marker>
        <marker id="arrow-emerald" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10b981" />
        </marker>
        <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#ef4444" />
        </marker>
        <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#f59e0b" />
        </marker>
      </defs>

      {diagramData.renderSvg()}

      {diagramData.annotations.map((ann) => {
        const cColor = ann.color || "#38bdf8";

        const cx = ann.controlX ?? (ann.labelX + ann.targetX) / 2;
        const cy = ann.controlY ?? Math.min(ann.labelY, ann.targetY) - 30;

        const pathD = `M ${ann.labelX} ${ann.labelY} Q ${cx} ${cy} ${ann.targetX} ${ann.targetY}`;

        const tTangent: [number, number] = [
          2 * (ann.targetX - cx),
          2 * (ann.targetY - cy),
        ];
        const angle = Math.atan2(tTangent[1], tTangent[0]);
        const headLen = 10;
        const halfApex = 0.42;
        const a1x = ann.targetX - headLen * Math.cos(angle - halfApex);
        const a1y = ann.targetY - headLen * Math.sin(angle - halfApex);
        const a2x = ann.targetX - headLen * Math.cos(angle + halfApex);
        const a2y = ann.targetY - headLen * Math.sin(angle + halfApex);
        const headD = `M ${a1x} ${a1y} L ${ann.targetX} ${ann.targetY} L ${a2x} ${a2y}`;

        return (
          <g key={ann.id}>
            <path
              d={pathD}
              fill="none"
              stroke={cColor}
              strokeWidth="2.4"
              strokeOpacity="0.92"
              strokeLinecap="round"
            />

            <path d={headD} fill={cColor} stroke="none" />

            <circle
              cx={ann.targetX}
              cy={ann.targetY}
              r="4.5"
              fill={cColor}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default SchematicDiagram;
