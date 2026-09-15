import re

# Read the file
with open('frontend/components/derivations/derivation-visual.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the default case (should be after all biology cases)
default_pos = content.rfind('      default:')
if default_pos == -1:
    print("ERROR: Could not find default case")
    exit(1)

print(f"Found default case at position {default_pos}")

chemistry_cases = '''
      // ============ CHEMISTRY VISUALIZATIONS ============
      case "bohr-hydrogen-atom":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Bohr Model of Hydrogen Atom</text>
            <circle cx="350" cy="250" r="15" fill="#ef4444"/>
            <text x="350" y="255" textAnchor="middle" fill="white" fontSize="8">+</text>
            {[1,2,3,4].map(n => (
              <circle key={n} cx="350" cy="250" r={40*n} fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray={n===1?"":"5,3"}/>
            ))}
            <circle cx={350+40} cy="250" r="6" fill="#22c55e"/>
            <text x={350+50} y="255" fill="#22c55e" fontSize="10">n=1</text>
            <circle cx={350} cy={250-80} r="6" fill="#22c55e"/>
            <text x={350+10} y={240} fill="#22c55e" fontSize="10">n=2</text>
            <circle cx={350+120} cy={250} r="6" fill="#22c55e"/>
            <text x={350+130} y="255" fill="#22c55e" fontSize="10">n=3</text>
            <rect x="80" y="380" width="260" height="60" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="405" textAnchor="middle" fill="#f59e0b" fontSize="12">E_n = -13.6/n^2 eV</text>
            <text x="210" y="425" textAnchor="middle" fill="#94a3b8" fontSize="10">Quantized energy levels</text>
            <rect x="380" y="380" width="240" height="60" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="405" textAnchor="middle" fill="#8b5cf6" fontSize="10">Spectral Series</text>
            <text x="390" y="425" fill="#e2e8f0" fontSize="9">Lyman (UV) • Balmer (Visible)</text>
          </svg>
        );
      case "rutherford-alpha-scattering":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">Rutherford Gold Foil Experiment</text>
            {[100,200,300,400,500].map((x,i) => (
              <g key={i}>
                <line x1={x} y1="120" x2={x} y2="200" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,2"/>
                <polygon points={`${x},115 ${x+5},125 ${x-5},125`} fill="#fbbf24"/>
              </g>
            ))}
            <rect x="100" y="200" width="500" height="20" rx="3" fill="#d97706" opacity="0.8"/>
            <circle cx="350" cy="280" r="12" fill="#ef4444"/>
            <text x="350" y="285" textAnchor="middle" fill="white" fontSize="8">N</text>
            <path d="M 100 200 Q 200 280 150 380" fill="none" stroke="#f87171" strokeWidth="2"/>
            <path d="M 500 200 Q 450 280 500 380" fill="none" stroke="#f87171" strokeWidth="2"/>
            <path d="M 350 200 L 350 280" fill="none" stroke="#fbbf24" strokeWidth="2"/>
            <text x="100" y="390" fill="#f87171" fontSize="10">Deflected</text>
            <text x="350" y="390" textAnchor="middle" fill="#fbbf24" fontSize="10">Most pass through</text>
            <text x="550" y="390" textAnchor="end" fill="#f87171" fontSize="10">Small angle</text>
            <rect x="80" y="410" width="540" height="40" rx="6" fill="#1e293b" stroke="#10b981"/>
            <text x="350" y="435" textAnchor="middle" fill="#e2e8f0" fontSize="11">Atom is mostly empty space with dense positive nucleus</text>
          </svg>
        );
      case "hydrogen-spectrum":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Hydrogen Emission Spectrum</text>
            <rect x="100" y="100" width="500" height="80" rx="6" fill="#1e293b"/>
            <text x="110" y="120" fill="#94a3b8" fontSize="10">Visible Region (Balmer)</text>
            <line x1="150" y1="140" x2="150" y2="170" stroke="#ef4444" strokeWidth="4"/>
            <text x="150" y="185" textAnchor="middle" fill="#ef4444" fontSize="9">Hα 656nm</text>
            <line x1="220" y1="140" x2="220" y2="170" stroke="#22c55e" strokeWidth="4"/>
            <text x="220" y="185" textAnchor="middle" fill="#22c55e" fontSize="9">Hβ 486nm</text>
            <line x1="290" y1="140" x2="290" y2="170" stroke="#3b82f6" strokeWidth="4"/>
            <text x="290" y="185" textAnchor="middle" fill="#3b82f6" fontSize="9">Hγ 434nm</text>
            <line x1="350" y1="140" x2="350" y2="170" stroke="#8b5cf6" strokeWidth="4"/>
            <text x="350" y="185" textAnchor="middle" fill="#8b5cf6" fontSize="9">Hδ 410nm</text>
            <rect x="100" y="240" width="240" height="200" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="220" y="260" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Energy Levels</text>
            {[1,2,3,4,5,'∞'].map((n,i) => (
              <g key={n}>
                <line x1="130" y1={290+i*25} x2="310" y2={290+i*25} stroke="#475569" strokeWidth="2"/>
                <text x="120" y={295+i*25} textAnchor="end" fill="#94a3b8" fontSize="10">n={n}</text>
                <text x="320" y={295+i*25} fill="#64748b" fontSize="9">{n==='∞'?'0':((-13.6/Number(n)/Number(n)).toFixed(1))+'eV'}</text>
              </g>
            ))}
            <rect x="370" y="240" width="260" height="200" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="260" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Spectral Series</text>
            <text x="380" y="290" fill="#ef4444" fontSize="10">• Lyman: n→1 (UV)</text>
            <text x="380" y="315" fill="#22c55e" fontSize="10">• Balmer: n→2 (Visible)</text>
            <text x="380" y="340" fill="#3b82f6" fontSize="10">• Paschen: n→3 (IR)</text>
            <text x="380" y="365" fill="#8b5cf6" fontSize="10">• Brackett: n→4 (IR)</text>
            <text x="380" y="390" fill="#ec4899" fontSize="10">• Pfund: n→5 (IR)</text>
            <text x="380" y="420" fill="#94a3b8" fontSize="10">Rydberg: 1/λ = R(1/n²-1/m²)</text>
          </svg>
        );
      case "quantum-numbers":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Quantum Numbers</text>
            <rect x="80" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="210" y="115" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">Principal (n)</text>
            <text x="90" y="140" fill="#e2e8f0" fontSize="10">• Energy level/shell</text>
            <text x="90" y="160" fill="#e2e8f0" fontSize="10">• n = 1, 2, 3...</text>
            <text x="90" y="180" fill="#e2e8f0" fontSize="10">• Determines size</text>
            <text x="90" y="200" fill="#e2e8f0" fontSize="10">• Max electrons: 2n²</text>
            <text x="90" y="225" fill="#94a3b8" fontSize="10">Example: n=2 → 8 e⁻ max</text>
            <rect x="370" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#10b981"/>
            <text x="500" y="115" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Azimuthal (l)</text>
            <text x="380" y="140" fill="#e2e8f0" fontSize="10">• Subshell shape</text>
            <text x="380" y="160" fill="#e2e8f0" fontSize="10">• l = 0 to n-1</text>
            <text x="380" y="180" fill="#e2e8f0" fontSize="10">• s,p,d,f orbitals</text>
            <text x="380" y="200" fill="#e2e8f0" fontSize="10">• Determines angular mom.</text>
            <text x="380" y="225" fill="#94a3b8" fontSize="10">l=0(s), 1(p), 2(d), 3(f)</text>
            <rect x="80" y="290" width="260" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="315" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Magnetic (ml)</text>
            <text x="90" y="340" fill="#e2e8f0" fontSize="10">• Orbital orientation</text>
            <text x="90" y="360" fill="#e2e8f0" fontSize="10">• ml = -l to +l</text>
            <text x="90" y="380" fill="#e2e8f0" fontSize="10">• Number of orbitals</text>
            <text x="90" y="400" fill="#e2e8f0" fontSize="10">• Each holds 2 e⁻</text>
            <text x="90" y="430" fill="#94a3b8" fontSize="10">l=1 → ml=-1,0,+1 (3 p-orbitals)</text>
            <rect x="370" y="290" width="260" height="160" rx="6" fill="#1e293b" stroke="#ec4899"/>
            <text x="500" y="315" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">Spin (ms)</text>
            <text x="380" y="340" fill="#e2e8f0" fontSize="10">• Electron spin direction</text>
            <text x="380" y="360" fill="#e2e8f0" fontSize="10">• ms = +½ or -½</text>
            <text x="380" y="380" fill="#e2e8f0" fontSize="10">• Up ↑ or down ↓</text>
            <text x="380" y="400" fill="#e2e8f0" fontSize="10">• Pauli exclusion principle</text>
            <text x="380" y="430" fill="#94a3b8" fontSize="10">No two e⁻ share all 4 quantum #'s</text>
          </svg>
        );
      case "orbital-shapes-s-p":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Orbital Shapes: s and p Orbitals</text>
            <rect x="80" y="90" width="220" height="180" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="190" y="115" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">s Orbital</text>
            <circle cx="190" cy="190" r="60" fill="none" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="190" cy="190" r="40" fill="#3b82f6" opacity="0.3"/>
            <circle cx="190" cy="190" r="20" fill="#3b82f6" opacity="0.5"/>
            <text x="190" y="280" textAnchor="middle" fill="#94a3b8" fontSize="10">Spherical symmetry</text>
            <text x="190" y="295" textAnchor="middle" fill="#64748b" fontSize="9">l = 0, 1 orbital</text>
            <rect x="330" y="90" width="310" height="180" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="485" y="115" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">p Orbitals (px, py, pz)</text>
            <ellipse cx="400" cy="185" rx="40" ry="25" fill="#22c55e" opacity="0.4"/>
            <text x="400" y="230" textAnchor="middle" fill="#22c55e" fontSize="9">px</text>
            <ellipse cx="485" cy="185" rx="25" ry="40" fill="#3b82f6" opacity="0.4"/>
            <text x="485" y="230" textAnchor="middle" fill="#3b82f6" fontSize="9">py</text>
            <ellipse cx="570" cy="185" rx="40" ry="25" fill="#f59e0b" opacity="0.4" transform="rotate(90,570,185)"/>
            <text x="570" y="230" textAnchor="middle" fill="#f59e0b" fontSize="9">pz</text>
            <text x="485" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10">Dumbbell shaped</text>
            <text x="485" y="275" textAnchor="middle" fill="#64748b" fontSize="9">l = 1, 3 orbitals</text>
            <rect x="80" y="300" width="560" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="360" y="330" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Key Properties</text>
            <text x="100" y="360" fill="#e2e8f0" fontSize="11">• s orbital: spherical, no nodal plane through nucleus</text>
            <text x="100" y="385" fill="#e2e8f0" fontSize="11">• p orbital: dumbbell, one nodal plane through nucleus</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">• Each orbital holds max 2 electrons (opposite spins)</text>
            <text x="100" y="435" fill="#e2e8f0" fontSize="11">• n=2: one 2s + three 2p orbitals = 4 total orbitals, 8 electrons</text>
          </svg>
        );
      case "vsepr-geometry":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">VSEPR Theory - Molecular Geometry</text>
            <rect x="80" y="90" width="160" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="160" y="115" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">AX₂ (0 LP)</text>
            <circle cx="160" cy="155" r="10" fill="#ef4444"/>
            <line x1="160" y1="155" x2="120" y2="195" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="120" cy="195" r="6" fill="#3b82f6"/>
            <line x1="160" y1="155" x2="200" y2="195" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="200" cy="195" r="6" fill="#3b82f6"/>
            <text x="160" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">Linear 180°</text>
            <text x="160" y="240" textAnchor="middle" fill="#64748b" fontSize="8">CO₂, BeCl₂</text>
            <rect x="260" y="90" width="160" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="340" y="115" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">AX₃ (0 LP)</text>
            <circle cx="340" cy="155" r="10" fill="#ef4444"/>
            <line x1="340" y1="155" x2="300" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="300" cy="200" r="6" fill="#3b82f6"/>
            <line x1="340" y1="155" x2="380" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="380" cy="200" r="6" fill="#3b82f6"/>
            <line x1="340" y1="155" x2="340" y2="210" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="340" cy="210" r="6" fill="#3b82f6"/>
            <text x="340" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">Trigonal Planar 120°</text>
            <text x="340" y="255" textAnchor="middle" fill="#64748b" fontSize="8">BF₃</text>
            <rect x="440" y="90" width="180" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="530" y="115" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">AX₄ (0 LP)</text>
            <circle cx="530" cy="155" r="10" fill="#ef4444"/>
            <line x1="530" y1="155" x2="490" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="490" cy="200" r="6" fill="#3b82f6"/>
            <line x1="530" y1="155" x2="570" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="570" cy="200" r="6" fill="#3b82f6"/>
            <line x1="530" y1="155" x2="530" y2="210" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="530" cy="210" r="6" fill="#3b82f6"/>
            <text x="530" y="240" textAnchor="middle" fill="#94a3b8" fontSize="9">Tetrahedral 109.5°</text>
            <text x="530" y="255" textAnchor="middle" fill="#64748b" fontSize="8">CH₄</text>
            <rect x="80" y="230" width="160" height="120" rx="6" fill="#1e293b" stroke="#ec4899"/>
            <text x="160" y="255" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">AX₂E₂ (2 LP)</text>
            <circle cx="160" cy="295" r="10" fill="#ef4444"/>
            <ellipse cx="160" cy="275" rx="20" ry="10" fill="#ec4899" opacity="0.5"/>
            <line x1="160" y1="295" x2="130" y2="340" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="130" cy="340" r="6" fill="#3b82f6"/>
            <line x1="160" y1="295" x2="190" y2="340" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="190" cy="340" r="6" fill="#3b82f6"/>
            <text x="160" y="365" textAnchor="middle" fill="#94a3b8" fontSize="9">Bent ~104.5°</text>
            <text x="160" y="380" textAnchor="middle" fill="#64748b" fontSize="8">H₂O</text>
            <rect x="260" y="230" width="360" height="120" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="440" y="255" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">VSEPR Principles</text>
            <text x="270" y="280" fill="#e2e8f0" fontSize="10">• Electron pairs repel each other</text>
            <text x="270" y="300" fill="#e2e8f0" fontSize="10">• Lone pairs repel more than bonding pairs</text>
            <text x="270" y="320" fill="#e2e8f0" fontSize="10">• Geometry minimizes repulsion</text>
            <text x="270" y="340" fill="#e2e8f0" fontSize="10">• Bond angles: LP-LP {'>'} LP-BP {'>'} BP-BP</text>
            <text x="270" y="360" fill="#94a3b8" fontSize="10">Example: NH₃ (107°) {'<'} CH₄ (109.5°) due to LP</text>
            <rect x="80" y="370" width="560" height="70" rx="6" fill="#1e293b" stroke="#475569"/>
            <text x="100" y="395" fill="#ef4444" fontSize="11">●</text>
            <text x="115" y="395" fill="#e2e8f0" fontSize="10">Central atom</text>
            <text x="230" y="395" fill="#3b82f6" fontSize="11">●</text>
            <text x="245" y="395" fill="#e2e8f0" fontSize="10">Bonding pair</text>
            <text x="370" y="395" fill="#ec4899" fontSize="11">●</text>
            <text x="385" y="395" fill="#e2e8f0" fontSize="10">Lone pair</text>
            <text x="100" y="420" fill="#94a3b8" fontSize="10">Note: Molecular shape considers atoms only, not lone pairs</text>
          </svg>
        );
      case "hybridization-orbitals":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Hybridization of Atomic Orbitals</text>
            <rect x="80" y="90" width="170" height="200" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="115" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">sp³</text>
            <text x="165" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">1s + 3p → 4 sp³</text>
            <circle cx="165" cy="180" r="8" fill="#ef4444"/>
            <line x1="165" y1="180" x2="130" y2="230" stroke="#3b82f6" strokeWidth="3"/>
            <circle cx="130" cy="230" r="6" fill="#3b82f6"/>
            <line x1="165" y1="180" x2="200" y2="230" stroke="#3b82f6" strokeWidth="3"/>
            <circle cx="200" cy="230" r="6" fill="#3b82f6"/>
            <line x1="165" y1="180" x2="165" y2="260" stroke="#3b82f6" strokeWidth="3"/>
            <circle cx="165" cy="260" r="6" fill="#3b82f6"/>
            <text x="165" y="285" textAnchor="middle" fill="#e2e8f0" fontSize="10">109.5°</text>
            <text x="165" y="300" textAnchor="middle" fill="#94a3b8" fontSize="9">CH₄, CCl₄</text>
            <rect x="270" y="90" width="170" height="200" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="355" y="115" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">sp²</text>
            <text x="355" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">1s + 2p → 3 sp²</text>
            <circle cx="355" cy="180" r="8" fill="#ef4444"/>
            <line x1="355" y1="180" x2="310" y2="235" stroke="#22c55e" strokeWidth="3"/>
            <circle cx="310" cy="235" r="6" fill="#22c55e"/>
            <line x1="355" y1="180" x2="400" y2="235" stroke="#22c55e" strokeWidth="3"/>
            <circle cx="400" cy="235" r="6" fill="#22c55e"/>
            <line x1="355" y1="180" x2="355" y2="260" stroke="#f59e0b" strokeWidth="3"/>
            <circle cx="355" cy="260" r="6" fill="#f59e0b"/>
            <text x="355" y="285" textAnchor="middle" fill="#e2e8f0" fontSize="10">120°</text>
            <text x="355" y="300" textAnchor="middle" fill="#94a3b8" fontSize="9">C₂H₄, BF₃</text>
            <rect x="460" y="90" width="170" height="200" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="545" y="115" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">sp</text>
            <text x="545" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">1s + 1p → 2 sp</text>
            <circle cx="545" cy="180" r="8" fill="#ef4444"/>
            <line x1="545" y1="180" x2="490" y2="230" stroke="#22c55e" strokeWidth="3"/>
            <circle cx="490" cy="230" r="6" fill="#22c55e"/>
            <line x1="545" y1="180" x2="600" y2="230" stroke="#22c55e" strokeWidth="3"/>
            <circle cx="600" cy="230" r="6" fill="#22c55e"/>
            <text x="545" y="285" textAnchor="middle" fill="#e2e8f0" fontSize="10">180°</text>
            <text x="545" y="300" textAnchor="middle" fill="#94a3b8" fontSize="9">C₂H₂, BeCl₂</text>
            <rect x="80" y="310" width="560" height="130" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="360" y="340" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Hybridization Summary</text>
            <text x="100" y="370" fill="#e2e8f0" fontSize="11">sp³: 4 hybrid orbitals, tetrahedral, single bonds (σ)</text>
            <text x="100" y="395" fill="#e2e8f0" fontSize="11">sp²: 3 hybrid orbitals, trigonal planar, one double bond (1σ + 1π)</text>
            <text x="100" y="420" fill="#e2e8f0" fontSize="11">sp: 2 hybrid orbitals, linear, two double bonds or one triple (2σ + 2π)</text>
            <text x="360" y="445" textAnchor="middle" fill="#94a3b8" fontSize="10">Unhybridized p orbitals form π bonds in multiple bonds</text>
          </svg>
        );
      case "molecular-orbital-theory":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ec4899" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ec4899" fontSize="16" fontWeight="bold">Molecular Orbital Theory - O₂ Example</text>
            <rect x="80" y="100" width="140" height="300" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="150" y="130" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">O Atom</text>
            <line x1="100" y1="160" x2="200" y2="160" stroke="#475569" strokeWidth="2"/>
            <text x="210" y="165" fill="#94a3b8" fontSize="10">1s²</text>
            <line x1="100" y1="190" x2="200" y2="190" stroke="#475569" strokeWidth="2"/>
            <text x="210" y="195" fill="#94a3b8" fontSize="10">2s²</text>
            <line x1="100" y1="220" x2="200" y2="220" stroke="#22c55e" strokeWidth="2"/>
            <text x="210" y="225" fill="#22c55e" fontSize="10">2p⁴</text>
            <rect x="480" y="100" width="140" height="300" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="550" y="130" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">O Atom</text>
            <line x1="500" y1="160" x2="600" y2="160" stroke="#475569" strokeWidth="2"/>
            <text x="490" y="165" fill="#94a3b8" fontSize="10">1s²</text>
            <line x1="500" y1="190" x2="600" y2="190" stroke="#475569" strokeWidth="2"/>
            <text x="490" y="195" fill="#94a3b8" fontSize="10">2s²</text>
            <line x1="500" y1="220" x2="600" y2="220" stroke="#22c55e" strokeWidth="2"/>
            <text x="490" y="225" fill="#22c55e" fontSize="10">2p⁴</text>
            <line x1="220" y1="200" x2="330" y2="200" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="480" y1="200" x2="370" y2="200" stroke="#f59e0b" strokeWidth="2"/>
            <rect x="250" y="100" width="200" height="300" rx="6" fill="#1e293b" stroke="#ec4899"/>
            <text x="350" y="130" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">O₂ M.O.</text>
            <line x1="270" y1="160" x2="310" y2="160" stroke="#475569" strokeWidth="2"/>
            <text x="320" y="165" fill="#94a3b8" fontSize="9">σ2s</text>
            <line x1="390" y1="160" x2="430" y2="160" stroke="#475569" strokeWidth="2"/>
            <text x="440" y="165" fill="#94a3b8" fontSize="9">σ*2s</text>
            <line x1="270" y1="200" x2="310" y2="200" stroke="#22c55e" strokeWidth="2"/>
            <text x="320" y="205" fill="#22c55e" fontSize="9">σ2p</text>
            <line x1="270" y1="240" x2="310" y2="240" stroke="#f59e0b" strokeWidth="2"/>
            <text x="320" y="245" fill="#f59e0b" fontSize="9">π2p</text>
            <line x1="390" y1="240" x2="430" y2="240" stroke="#f59e0b" strokeWidth="2"/>
            <text x="440" y="245" fill="#f59e0b" fontSize="9">π*2p</text>
            <line x1="390" y1="200" x2="430" y2="200" stroke="#ef4444" strokeWidth="2"/>
            <text x="440" y="205" fill="#ef4444" fontSize="9">σ*2p</text>
            <rect x="80" y="420" width="540" height="30" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="440" textAnchor="middle" fill="#06b6d4" fontSize="12">Bond Order = (Bonding e- - Antibonding e-)/2 = (8-4)/2 = 2 (Double bond)</text>
          </svg>
        );
      case "mole-concept":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">The Mole Concept</text>
            <rect x="80" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Avogadro's Number</text>
            <text x="210" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="20">N₀ = 6.022 × 10²³</text>
            <text x="210" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">particles per mole</text>
            <rect x="370" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="500" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Molar Mass</text>
            <text x="500" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="16">M = mass/moles</text>
            <text x="500" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">g/mol (numerically equal to atomic mass)</text>
            <rect x="80" y="210" width="260" height="100" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="210" y="240" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Ideal Gas at STP</text>
            <text x="210" y="275" textAnchor="middle" fill="#e2e8f0" fontSize="16">V = 22.4 L/mol</text>
            <text x="210" y="295" textAnchor="middle" fill="#94a3b8" fontSize="10">0°C, 1 atm</text>
            <rect x="370" y="210" width="260" height="100" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="240" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Key Formulas</text>
            <text x="380" y="270" fill="#e2e8f0" fontSize="11">n = m/M = N/N₀ = V/V₀</text>
            <text x="380" y="290" fill="#94a3b8" fontSize="10">moles = mass/molar mass</text>
            <text x="500" y="310" textAnchor="middle" fill="#94a3b8" fontSize="10">or particles/Avogadro's #</text>
            <rect x="80" y="330" width="550" height="110" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="355" y="360" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Common Examples</text>
            <text x="100" y="390" fill="#e2e8f0" fontSize="11">• 1 mol H₂O = 18 g = 6.022×10²³ molecules</text>
            <text x="100" y="415" fill="#e2e8f0" fontSize="11">• 1 mol C = 12 g = 6.022×10²³ atoms</text>
            <text x="380" y="390" fill="#e2e8f0" fontSize="11">• 1 mol O₂ = 32 g = 6.022×10²³ molecules</text>
            <text x="380" y="415" fill="#e2e8f0" fontSize="11">• 1 mol gas at STP = 22.4 L</text>
          </svg>
        );
      case "periodic-trends":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Periodic Trends</text>
            <rect x="80" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Across a Period (← →)</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">Atomic Radius: DECREASES</text>
            <text x="100" y="175" fill="#94a3b8" fontSize="10">More protons pull e⁻ closer</text>
            <text x="100" y="205" fill="#e2e8f0" fontSize="11">Ionization Energy: INCREASES</text>
            <text x="100" y="225" fill="#94a3b8" fontSize="10">Harder to remove e⁻ from small atom</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">Electronegativity: INCREASES</text>
            <text x="100" y="275" fill="#94a3b8" fontSize="10">F is most electronegative (4.0)</text>
            <rect x="370" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="120" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Down a Group (↑ ↓)</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">Atomic Radius: INCREASES</text>
            <text x="390" y="175" fill="#94a3b8" fontSize="10">More electron shells added</text>
            <text x="390" y="205" fill="#e2e8f0" fontSize="11">Ionization Energy: DECREASES</text>
            <text x="390" y="225" fill="#94a3b8" fontSize="10">Outer e⁻ farther from nucleus</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">Electronegativity: DECREASES</text>
            <text x="390" y="275" fill="#94a3b8" fontSize="10">Less attraction for bonding e⁻</text>
            <rect x="80" y="290" width="540" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="350" y="320" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Important Concepts</text>
            <text x="100" y="355" fill="#e2e8f0" fontSize="11">Metallic Character: Increases down & left (opposite of EN)</text>
            <text x="100" y="380" fill="#e2e8f0" fontSize="11">Cation Size < Parent Atom < Anion Size (for same element)</text>
            <text x="100" y="405" fill="#e2e8f0" fontSize="11">Noble gases have highest IE in their period</text>
            <text x="350" y="430" textAnchor="middle" fill="#94a3b8" fontSize="10">Reason: Nuclear charge vs shielding effect balance</text>
          </svg>
        );
      case "redox-reactions":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">Redox Reactions</text>
            <rect x="80" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">MNEMONIC</text>
            <text x="210" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="16">OIL RIG</text>
            <text x="210" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">Oxidation Is Loss (of e⁻)</text>
            <text x="210" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">Reduction Is Gain (of e⁻)</text>
            <rect x="370" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">HALF REACTIONS</text>
            <text x="390" y="155" fill="#ef4444" fontSize="12">Oxidation: Zn → Zn²⁺ + 2e⁻</text>
            <text x="390" y="180" fill="#22c55e" fontSize="12">Reduction: Cu²⁺ + 2e⁻ → Cu</text>
            <text x="500" y="205" textAnchor="middle" fill="#94a3b8" fontSize="10">Electrons cancel in overall</text>
            <rect x="80" y="230" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="260" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">AGENTS</text>
            <text x="100" y="290" fill="#e2e8f0" fontSize="11">Oxidizing Agent: Gets REDUCED</text>
            <text x="100" y="310" fill="#e2e8f0" fontSize="11">(Causes oxidation, accepts e⁻)</text>
            <text x="100" y="340" fill="#e2e8f0" fontSize="11">Reducing Agent: Gets OXIDIZED</text>
            <text x="100" y="360" fill="#e2e8f0" fontSize="11">(Causes reduction, donates e⁻)</text>
            <rect x="370" y="230" width="260" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="260" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">EXAMPLE</text>
            <text x="390" y="290" fill="#e2e8f0" fontSize="12">Zn + CuSO₄ → ZnSO₄ + Cu</text>
            <text x="390" y="320" fill="#ef4444" fontSize="10">Zn: 0 → +2 (oxidized, reducing agent)</text>
            <text x="390" y="340" fill="#22c55e" fontSize="10">Cu: +2 → 0 (reduced, oxidizing agent)</text>
            <text x="500" y="365" textAnchor="middle" fill="#94a3b8" fontSize="10">Electrons flow from Zn to Cu²⁺</text>
          </svg>
        );
      case "le-chateliers-principle":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Le Chatelier's Principle</text>
            <rect x="80" y="90" width="540" height="60" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="14">If a system at equilibrium is disturbed, it shifts to counteract the disturbance</text>
            <rect x="80" y="170" width="170" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="200" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Concentration</text>
            <text x="100" y="235" fill="#e2e8f0" fontSize="10">Add reactant → shift RIGHT</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="10">Add product → shift LEFT</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="10">Remove substance →</text>
            <text x="100" y="290" fill="#94a3b8" fontSize="10">fill the gap</text>
            <rect x="270" y="170" width="170" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="355" y="200" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Pressure (gas)</text>
            <text x="290" y="235" fill="#e2e8f0" fontSize="10">Increase P → fewer moles</text>
            <text x="290" y="255" fill="#e2e8f0" fontSize="10">Decrease P → more moles</text>
            <text x="290" y="275" fill="#94a3b8" fontSize="10">Only affects gaseous</text>
            <text x="290" y="290" fill="#94a3b8" fontSize="10">species</text>
            <rect x="460" y="170" width="170" height="120" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="545" y="200" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Temperature</text>
            <text x="480" y="235" fill="#e2e8f0" fontSize="10">Exothermic: ↑T → shift LEFT</text>
            <text x="480" y="255" fill="#e2e8f0" fontSize="10">Endothermic: ↑T → shift RIGHT</text>
            <text x="480" y="275" fill="#94a3b8" fontSize="10">Treat heat as reactant/product</text>
            <rect x="80" y="310" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="345" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Catalyst: Does NOT shift equilibrium, only speeds up attainment</text>
            <text x="350" y="370" textAnchor="middle" fill="#94a3b8" fontSize="12">Both forward and reverse rates increase equally</text>
            <rect x="80" y="400" width="540" height="30" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="420" textAnchor="middle" fill="#e2e8f0" fontSize="11">Haber Process: N₂ + 3H₂ ⇌ 2NH₃ + heat → High P, low T favor NH₃</text>
          </svg>
        );
      case "alkanes":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Alkanes - Saturated Hydrocarbons</text>
            <rect x="80" y="90" width="260" height="80" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">General Formula</text>
            <text x="210" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="18">CₙH₂ₙ₊₂</text>
            <rect x="370" y="90" width="260" height="80" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Properties</text>
            <text x="390" y="145" fill="#e2e8f0" fontSize="11">• Nonpolar, hydrophobic</text>
            <text x="390" y="165" fill="#e2e8f0" fontSize="11">• Low reactivity (except combustion)</text>
            <text x="500" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">Single C-C and C-H bonds (sp³)</text>
            <rect x="80" y="190" width="540" height="100" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="220" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Homologous Series (each differs by CH₂)</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">Methane CH₄ → Ethane C₂H₆ → Propane C₃H₈ → Butane C₄H₁₀ → Pentane C₅H₁₂</text>
            <text x="100" y="275" fill="#94a3b8" fontSize="10">BP increases with molecular weight: -162°C → -42°C → 42°C → 36°C → 36°C</text>
            <rect x="80" y="310" width="260" height="110" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="210" y="340" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Combustion</text>
            <text x="100" y="370" fill="#e2e8f0" fontSize="11">CₙH₂ₙ₊₂ + O₂ → CO₂ + H₂O + heat</text>
            <text x="100" y="390" fill="#94a3b8" fontSize="10">Exothermic, used as fuel</text>
            <rect x="370" y="310" width="260" height="110" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="500" y="340" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Halogenation</text>
            <text x="390" y="370" fill="#e2e8f0" fontSize="11">CH₄ + Cl₂ → CH₃Cl + HCl (UV light)</text>
            <text x="390" y="390" fill="#94a3b8" fontSize="10">Free radical substitution mechanism</text>
          </svg>
        );
      case "alkenes":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Alkenes - Unsaturated Hydrocarbons</text>
            <rect x="80" y="90" width="260" height="80" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">General Formula</text>
            <text x="210" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="18">CₙH₂ₙ</text>
            <rect x="370" y="90" width="260" height="80" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Structure</text>
            <text x="390" y="145" fill="#e2e8f0" fontSize="11">C=C double bond (1σ + 1π)</text>
            <text x="390" y="165" fill="#e2e8f0" fontSize="11">sp² hybridized, trigonal planar</text>
            <text x="500" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">π bond is reactive site</text>
            <rect x="80" y="190" width="260" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="220" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Geometric Isomerism</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">Cis: similar groups on same side</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">Trans: similar groups on opposite sides</text>
            <text x="100" y="300" fill="#94a3b8" fontSize="10">Requires: 2 different groups on EACH C</text>
            <rect x="370" y="190" width="260" height="120" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="220" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Addition Reactions</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">H₂/Pt → Alkane (hydrogenation)</text>
            <text x="390" y="275" fill="#e2e8f0" fontSize="11">X₂ → Dihaloalkane (halogenation)</text>
            <text x="390" y="295" fill="#e2e8f0" fontSize="11">HX → Haloalkane (hydrohalogenation)</text>
            <text x="390" y="315" fill="#94a3b8" fontSize="10">Markovnikov: H adds to C with more H</text>
            <rect x="80" y="330" width="540" height="110" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="360" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Polymerization</text>
            <text x="100" y="390" fill="#e2e8f0" fontSize="11">n(CH₂=CH₂) → -(CH₂-CH₂)n- (polyethylene)</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">n(CH₂=CHCl) → -(CH₂-CHCl)n- (PVC)</text>
            <text x="100" y="430" fill="#94a3b8" fontSize="10">π bond breaks, forms new σ bonds with neighboring monomers</text>
          </svg>
        );
      case "benzene-aromatic":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Benzene - Aromatic Compound</text>
            <rect x="80" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Structure</text>
            <polygon points="210,140 252,164 252,212 210,236 168,212 168,164" fill="none" stroke="#f59e0b" strokeWidth="3"/>
            <circle cx="210" cy="188" r="28" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,2"/>
            <text x="210" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10">C₆H₆ - all C-C bonds equal (1.39 Å)</text>
            <text x="210" y="285" textAnchor="middle" fill="#64748b" fontSize="9">Delocalized π electrons</text>
            <rect x="370" y="90" width="260" height="180" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="500" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Kekulé Structures</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">Two equivalent resonance forms:</text>
            <text x="390" y="180" fill="#ef4444" fontSize="11">Form I:  C=C-C=C-C=C</text>
            <text x="390" y="200" fill="#3b82f6" fontSize="11">Form II: C-C=C-C=C-C</text>
            <text x="390" y="230" fill="#94a3b8" fontSize="10">Actual structure is hybrid</text>
            <text x="390" y="250" fill="#94a3b8" fontSize="10">of both forms</text>
            <rect x="80" y="290" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="320" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Properties</text>
            <text x="100" y="350" fill="#e2e8f0" fontSize="11">• Planar hexagonal ring</text>
            <text x="100" y="370" fill="#e2e8f0" fontSize="11">• sp² hybridized carbons</text>
            <text x="100" y="390" fill="#e2e8f0" fontSize="11">• 120° bond angles</text>
            <text x="100" y="410" fill="#94a3b8" fontSize="10">• Exceptionally stable (resonance)</text>
            <rect x="370" y="290" width="260" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="320" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Hückel's Rule</text>
            <text x="390" y="350" fill="#e2e8f0" fontSize="11">• Cyclic structure</text>
            <text x="390" y="370" fill="#e2e8f0" fontSize="11">• Planar (all sp²)</text>
            <text x="390" y="390" fill="#e2e8f0" fontSize="11">• Fully conjugated</text>
            <text x="390" y="410" fill="#22c55e" fontSize="11">• 4n+2 π electrons</text>
            <rect x="80" y="420" width="540" height="60" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="455" textAnchor="middle" fill="#ef4444" fontSize="13">Electrophilic Substitution (not addition!) - preserves aromaticity</text>
          </svg>
        );
      case "isomerism":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Isomerism in Organic Compounds</text>
            <rect x="80" y="90" width="540" height="60" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="14">Isomers: Same molecular formula, different structural arrangement</text>
            <rect x="80" y="170" width="260" height="160" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="200" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Structural Isomers</text>
            <text x="100" y="235" fill="#e2e8f0" fontSize="11">Chain: Different carbon skeleton</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">Position: Different position of group</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">Functional: Different functional group</text>
            <text x="100" y="305" fill="#94a3b8" fontSize="10">Example: C₄H₁₀</text>
            <text x="100" y="320" fill="#94a3b8" fontSize="10">n-butane vs isobutane</text>
            <rect x="370" y="170" width="260" height="160" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="200" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Stereoisomers</text>
            <text x="390" y="235" fill="#e2e8f0" fontSize="11">Geometric: Cis-trans (E/Z)</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">Optical: Enantiomers (mirror images)</text>
            <text x="390" y="285" fill="#94a3b8" fontSize="10">Same connectivity,</text>
            <text x="390" y="300" fill="#94a3b8" fontSize="10">different spatial arrangement</text>
            <rect x="80" y="350" width="260" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="380" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Chain Isomerism</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">C₅H₁₂: pentane, isopentane,</text>
            <text x="100" y="430" fill="#e2e8f0" fontSize="11">neopentane (3 isomers)</text>
            <rect x="370" y="350" width="260" height="100" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="380" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Position Isomerism</text>
            <text x="390" y="410" fill="#e2e8f0" fontSize="11">C₃H₇OH: 1-propanol vs</text>
            <text x="390" y="430" fill="#e2e8f0" fontSize="11">2-propanol (different OH pos.)</text>
          </svg>
        );
      case "empirical-molecular-formula":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Empirical & Molecular Formulas</text>
            <rect x="80" y="90" width="260" height="140" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Empirical Formula</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">Simplest whole-number ratio</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">of atoms in compound</text>
            <text x="100" y="205" fill="#94a3b8" fontSize="10">Example: Glucose</text>
            <text x="100" y="225" fill="#94a3b8" fontSize="10">Empirical: CH₂O</text>
            <rect x="370" y="90" width="260" height="140" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Molecular Formula</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">Actual number of atoms</text>
            <text x="390" y="175" fill="#e2e8f0" fontSize="11">in one molecule</text>
            <text x="390" y="205" fill="#94a3b8" fontSize="10">Example: Glucose</text>
            <text x="390" y="225" fill="#94a3b8" fontSize="10">Molecular: C₆H₁₂O₆</text>
            <rect x="80" y="250" width="540" height="80" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="350" y="280" textAnchor="middle" fill="#f59e0b" fontSize="14">Molecular Formula = n × Empirical Formula</text>
            <text x="350" y="310" textAnchor="middle" fill="#94a3b8" fontSize="12">where n = Molar Mass / Empirical Formula Mass</text>
            <rect x="80" y="350" width="540" height="100" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="380" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Worked Example</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">Compound: 40% C, 6.7% H, 53.3% O; Molar mass = 180 g/mol</text>
            <text x="100" y="430" fill="#22c55e" fontSize="11">Empirical: CH₂O (mass 30) → n = 180/30 = 6 → Molecular: C₆H₁₂O₆</text>
          </svg>
        );
      case "chemical-equilibrium":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Chemical Equilibrium</text>
            <rect x="80" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Dynamic Equilibrium</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">Forward rate = Reverse rate</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">Concentrations constant (not equal!)</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">Closed system, constant T</text>
            <rect x="370" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Equilibrium Constant</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="12">K = [Products]/[Reactants]</text>
            <text x="390" y="180" fill="#94a3b8" fontSize="10">K > 1: products favored</text>
            <text x="390" y="195" fill="#94a3b8" fontSize="10">K < 1: reactants favored</text>
            <rect x="80" y="230" width="540" height="120" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="350" y="260" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Le Chatelier's Principle Effects</text>
            <text x="100" y="295" fill="#e2e8f0" fontSize="11">• Increase [reactant] → shift right (more products)</text>
            <text x="100" y="315" fill="#e2e8f0" fontSize="11">• Increase pressure (gas) → shift to fewer moles</text>
            <text x="100" y="335" fill="#e2e8f0" fontSize="11">• Increase temperature → shift endothermic direction</text>
            <rect x="80" y="370" width="540" height="60" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="405" textAnchor="middle" fill="#ef4444" fontSize="14">Kp = Kc(RT)^Δn  where Δn = moles gas products - moles gas reactants</text>
          </svg>
        );
      case "law-of-mass-action":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Law of Mass Action</text>
            <rect x="80" y="90" width="540" height="80" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="14">Rate of reaction ∝ Product of active masses of reactants</text>
            <rect x="80" y="190" width="540" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="220" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">For aA + bB ⇌ cC + dD</text>
            <text x="350" y="255" textAnchor="middle" fill="#e2e8f0" fontSize="16">K = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</text>
            <text x="350" y="275" textAnchor="middle" fill="#94a3b8" fontSize="10">At equilibrium, K is constant at given temperature</text>
            <rect x="80" y="310" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="340" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Key Points</text>
            <text x="100" y="370" fill="#e2e8f0" fontSize="11">• K depends only on temperature</text>
            <text x="100" y="390" fill="#e2e8f0" fontSize="11">• Large K (>>1): products favored</text>
            <rect x="370" y="310" width="260" height="120" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="340" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Applications</text>
            <text x="390" y="370" fill="#e2e8f0" fontSize="11">• Predict direction of reaction</text>
            <text x="390" y="390" fill="#e2e8f0" fontSize="11">• Calculate equilibrium concentrations</text>
          </svg>
        );
      case "hydrogen":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Hydrogen - The First Element</text>
            <rect x="80" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Position in Periodic Table</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">• Group 1 (alkali metals) - 1 valence e⁻</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">• Also resembles Group 17 (halogens)</text>
            <rect x="370" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Isotopes</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">• Protium (¹H): 1p, 0n - 99.98%</text>
            <text x="390" y="175" fill="#e2e8f0" fontSize="11">• Deuterium (²H/D): 1p, 1n - heavy water</text>
            <rect x="80" y="210" width="260" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="210" y="240" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Laboratory Preparation</text>
            <text x="100" y="270" fill="#e2e8f0" fontSize="11">Zn + H₂SO₄ → ZnSO₄ + H₂</text>
            <text x="100" y="290" fill="#94a3b8" fontSize="10">Metal + acid method</text>
            <rect x="370" y="210" width="260" height="120" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="240" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Industrial Preparation</text>
            <text x="390" y="270" fill="#e2e8f0" fontSize="11">Steam reforming: CH₄ + H₂O → CO + 3H₂</text>
            <text x="390" y="290" fill="#94a3b8" fontSize="10">Primary source of industrial H₂</text>
            <rect x="80" y="350" width="540" height="90" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="380" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Uses</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">• Haber process (NH₃ production) • Rocket fuel • Hydrogenation of oils • Fuel cells</text>
          </svg>
        );
      case "oxygen":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Oxygen - Essential Element</text>
            <rect x="80" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Occurrence</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">• 21% of atmosphere (most abundant gas)</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">• 46% of Earth's crust (by mass)</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">• Found in water, minerals, organic compounds</text>
            <rect x="370" y="90" width="260" height="120" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Allotropes</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">• O₂ (dioxygen): colorless gas, paramagnetic</text>
            <text x="390" y="175" fill="#e2e8f0" fontSize="11">• O₃ (ozone): pale blue gas, bent structure</text>
            <text x="390" y="195" fill="#94a3b8" fontSize="10">O₃ is 1000× more soluble in water</text>
            <rect x="80" y="230" width="260" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="210" y="260" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Laboratory Preparation</text>
            <text x="100" y="290" fill="#e2e8f0" fontSize="11">2H₂O₂ → 2H₂O + O₂ (MnO₂ catalyst)</text>
            <text x="100" y="315" fill="#e2e8f0" fontSize="11">2KClO₃ → 2KCl + 3O₂ (heat)</text>
            <text x="100" y="340" fill="#94a3b8" fontSize="10">Collected by downward displacement of water</text>
            <rect x="370" y="230" width="260" height="140" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="260" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Properties</text>
            <text x="390" y="290" fill="#e2e8f0" fontSize="11">• Supports combustion (burning)</text>
            <text x="390" y="315" fill="#e2e8f0" fontSize="11">• Oxidizing agent in reactions</text>
            <text x="390" y="340" fill="#94a3b8" fontSize="10">Essential for respiration</text>
            <rect x="80" y="390" width="540" height="50" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="420" textAnchor="middle" fill="#e2e8f0" fontSize="12">Medical oxygen • Steel production • Rocket oxidizer • Water treatment • Welding</text>
          </svg>
        );
      case "nitrogen":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Nitrogen - Inert Gas</text>
            <rect x="80" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Occurrence</text>
            <text x="100" y="150" fill="#e2e8f0" fontSize="11">• 78% of atmosphere (N₂ gas)</text>
            <text x="100" y="170" fill="#e2e8f0" fontSize="11">• Found in proteins, DNA, fertilizers</text>
            <rect x="370" y="90" width="260" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Inertness of N₂</text>
            <text x="390" y="150" fill="#e2e8f0" fontSize="11">• Triple bond N≡N: very strong (941 kJ/mol)</text>
            <text x="390" y="170" fill="#e2e8f0" fontSize="11">• Requires high T or catalyst to react</text>
            <rect x="80" y="210" width="260" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="210" y="240" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Ammonia (NH₃)</text>
            <text x="100" y="270" fill="#e2e8f0" fontSize="11">Haber process: N₂ + 3H₂ ⇌ 2NH₃</text>
            <text x="100" y="290" fill="#e2e8f0" fontSize="11">Conditions: 450°C, 200 atm, Fe catalyst</text>
            <text x="100" y="330" fill="#94a3b8" fontSize="10">Used in fertilizers, explosives, cleaning</text>
            <rect x="370" y="210" width="260" height="140" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="240" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Nitrogen Oxides</text>
            <text x="390" y="270" fill="#e2e8f0" fontSize="11">NO: colorless gas, from lightning/cars</text>
            <text x="390" y="290" fill="#e2e8f0" fontSize="11">NO₂: brown gas, air pollutant</text>
            <text x="390" y="330" fill="#94a3b8" fontSize="10">Contribute to acid rain and smog</text>
            <rect x="80" y="370" width="540" height="70" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="400" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">HNO₃ (Nitric Acid)</text>
            <text x="350" y="420" textAnchor="middle" fill="#e2e8f0" fontSize="12">Strong acid, oxidizing agent, used in fertilizers and explosives</text>
          </svg>
        );
      case "halogens":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ec4899" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ec4899" fontSize="16" fontWeight="bold">Halogens - Group 17 Elements</text>
            <rect x="80" y="90" width="540" height="80" rx="6" fill="#1e293b" stroke="#ec4899"/>
            <text x="350" y="120" textAnchor="middle" fill="#ec4899" fontSize="14" fontWeight="bold">F₂  Cl₂  Br₂  I₂  At</text>
            <text x="350" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11">Color: Pale yellow → Green → Red-brown → Violet → ?</text>
            <rect x="80" y="190" width="260" height="140" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="220" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Periodic Trends</text>
            <text x="100" y="250" fill="#e2e8f0" fontSize="11">• Reactivity decreases down group</text>
            <text x="100" y="270" fill="#e2e8f0" fontSize="11">• Electronegativity decreases</text>
            <text x="100" y="290" fill="#e2e8f0" fontSize="11">• Melting/boiling points increase</text>
            <rect x="370" y="190" width="260" height="140" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="220" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Properties</text>
            <text x="390" y="250" fill="#e2e8f0" fontSize="11">• Strong oxidizing agents</text>
            <text x="390" y="270" fill="#e2e8f0" fontSize="11">• Form -1 ions (halides)</text>
            <text x="390" y="290" fill="#e2e8f0" fontSize="11">• Displacement reactions occur</text>
            <rect x="80" y="350" width="260" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="210" y="380" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Chlorine (Cl₂)</text>
            <text x="100" y="410" fill="#e2e8f0" fontSize="11">Yellow-green gas, toxic</text>
            <text x="100" y="430" fill="#94a3b8" fontSize="10">Water purification, PVC production</text>
            <rect x="370" y="350" width="260" height="100" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="380" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Fluorine (F₂)</text>
            <text x="390" y="410" fill="#e2e8f0" fontSize="11">Most reactive nonmetal</text>
            <text x="390" y="430" fill="#94a3b8" fontSize="10">Teflon, refrigerants, uranium enrichment</text>
          </svg>
        );
      case "sodium-compounds":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Sodium Compounds (Solvay Process)</text>
            <rect x="80" y="90" width="540" height="140" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Solvay Process - Na₂CO₃ Production</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">1. NH₃ + CO₂ + H₂O → NH₄HCO₃</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">2. NaCl + NH₄HCO₃ → NaHCO₃↓ + NH₄Cl</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">3. 2NaHCO₃ → Na₂CO₃ + CO₂ + H₂O (heat)</text>
            <text x="350" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">NaHCO₃ precipitates due to low solubility in NH₄Cl solution</text>
            <rect x="80" y="250" width="260" height="120" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="280" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">NaOH (Soda Lye)</text>
            <text x="100" y="310" fill="#e2e8f0" fontSize="11">• Strong base, deliquescent</text>
            <text x="100" y="330" fill="#e2e8f0" fontSize="11">• Used in soap, paper, textiles</text>
            <rect x="370" y="250" width="260" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="280" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Na₂CO₃ (Soda Ash)</text>
            <text x="390" y="310" fill="#e2e8f0" fontSize="11">• Washing soda, glass making</text>
            <text x="390" y="330" fill="#e2e8f0" fontSize="11">• Water softening agent</text>
            <rect x="80" y="390" width="540" height="50" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="420" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">NaHCO₃ (Baking Soda): antacid, fire extinguisher, baking powder</text>
          </svg>
        );
      case "lattice-energy":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Lattice Energy</text>
            <rect x="80" y="90" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="14">Energy released when gaseous ions form 1 mole of ionic solid</text>
            <rect x="80" y="190" width="260" height="160" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="220" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Factors Affecting</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">• Ionic charge: U ∝ |Q₁Q₂|</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">• Ionic radius: U ∝ 1/(r₊ + r₋)</text>
            <text x="100" y="305" fill="#94a3b8" fontSize="10">Higher charge → stronger attraction</text>
            <text x="100" y="325" fill="#94a3b8" fontSize="10">Smaller ions → closer packing</text>
            <rect x="370" y="190" width="260" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="220" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Examples</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">NaCl: -788 kJ/mol</text>
            <text x="390" y="275" fill="#e2e8f0" fontSize="11">MgO: -3795 kJ/mol</text>
            <text x="390" y="305" fill="#94a3b8" fontSize="10">MgO has 2+ and 2- charges</text>
            <text x="390" y="325" fill="#94a3b8" fontSize="10">vs NaCl with 1+ and 1-</text>
            <rect x="80" y="370" width="540" height="70" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="400" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Predicts Solubility & Stability</text>
            <text x="350" y="420" textAnchor="middle" fill="#94a3b8" fontSize="11">High lattice energy → insoluble salts (BaSO₄) • Determines melting point</text>
          </svg>
        );
      case "chemical-industry":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Major Chemical Industries</text>
            <rect x="80" y="90" width="170" height="140" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="120" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Haber Process</text>
            <text x="100" y="150" fill="#e2e8f0" fontSize="10">N₂ + 3H₂ ⇌ 2NH₃</text>
            <text x="100" y="170" fill="#e2e8f0" fontSize="10">450°C, 200 atm</text>
            <text x="100" y="190" fill="#94a3b8" fontSize="9">Fe catalyst</text>
            <text x="100" y="210" fill="#94a3b8" fontSize="9">Fertilizers, explosives</text>
            <rect x="270" y="90" width="170" height="140" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="355" y="120" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Contact Process</text>
            <text x="290" y="150" fill="#e2e8f0" fontSize="10">SO₂ + ½O₂ ⇌ SO₃</text>
            <text x="290" y="170" fill="#e2e8f0" fontSize="10">450°C, 1-2 atm</text>
            <text x="290" y="190" fill="#94a3b8" fontSize="9">V₂O₅ catalyst</text>
            <text x="290" y="210" fill="#94a3b8" fontSize="9">H₂SO₄ production</text>
            <rect x="460" y="90" width="170" height="140" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="545" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Solvay Process</text>
            <text x="480" y="150" fill="#e2e8f0" fontSize="10">NaCl + NH₃ + CO₂</text>
            <text x="480" y="170" fill="#e2e8f0" fontSize="10">→ NaHCO₃ → Na₂CO₃</text>
            <text x="480" y="195" fill="#94a3b8" fontSize="9">Room temperature</text>
            <text x="480" y="215" fill="#94a3b8" fontSize="9">Washing soda, glass</text>
            <rect x="80" y="250" width="540" height="100" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="280" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Other Major Industries</text>
            <text x="100" y="310" fill="#e2e8f0" fontSize="11">• Chlor-alkali: NaCl → Cl₂ + NaOH + H₂</text>
            <text x="100" y="330" fill="#e2e8f0" fontSize="11">• Ostwald: NH₃ → HNO�3 (oxidation)</text>
            <rect x="80" y="370" width="540" height="70" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="400" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Environmental Concerns</text>
            <text x="350" y="420" textAnchor="middle" fill="#94a3b8" fontSize="11">Acid rain (SO₂, NOₓ) • Greenhouse gases • Wastewater treatment • Solid waste management</text>
          </svg>
        );
      case "balancing-equations":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Balancing Chemical Equations</text>
            <rect x="80" y="90" width="540" height="60" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="14">Law of Conservation of Mass: atoms neither created nor destroyed</text>
            <rect x="80" y="170" width="260" height="180" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="200" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Steps to Balance</text>
            <text x="100" y="235" fill="#e2e8f0" fontSize="11">1. Write unbalanced equation</text>
            <text x="100" y="255" fill="#e2e8f0" fontSize="11">2. Count atoms on each side</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">3. Add coefficients (never subscripts!)</text>
            <text x="100" y="295" fill="#e2e8f0" fontSize="11">4. Check all atoms balance</text>
            <rect x="370" y="170" width="260" height="180" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="200" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Tips</text>
            <text x="390" y="235" fill="#e2e8f0" fontSize="11">• Start with most complex compound</text>
            <text x="390" y="255" fill="#e2e8f0" fontSize="11">• Leave O and H for last</text>
            <text x="390" y="275" fill="#e2e8f0" fontSize="11">• Use smallest whole numbers</text>
            <text x="390" y="295" fill="#94a3b8" fontSize="10">• Check charge balance for ionic</text>
            <rect x="80" y="370" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="400" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Example: Fe + O₂ → Fe₂O₃</text>
            <text x="350" y="425" textAnchor="middle" fill="#e2e8f0" fontSize="12">4Fe + 3O₂ → 2Fe₂O₃ (balanced)</text>
          </svg>
        );
      case "electrolysis":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Electrolysis</text>
            <rect x="80" y="90" width="540" height="70" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="14">Decomposition of electrolyte by electric current</text>
            <rect x="80" y="180" width="260" height="160" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="210" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Electrolytic Cell</text>
            <text x="100" y="245" fill="#e2e8f0" fontSize="11">Anode (+): Oxidation occurs</text>
            <text x="100" y="265" fill="#e2e8f0" fontSize="11">Cathode (-): Reduction occurs</text>
            <text x="100" y="285" fill="#e2e8f0" fontSize="11">Electrons flow: power supply → cathode</text>
            <text x="100" y="315" fill="#94a3b8" fontSize="10">Ions move through electrolyte</text>
            <rect x="370" y="180" width="260" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="210" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Faraday's Laws</text>
            <text x="390" y="245" fill="#e2e8f0" fontSize="11">1st: mass ∝ charge (Q = It)</text>
            <text x="390" y="265" fill="#e2e8f0" fontSize="11">2nd: mass ∝ equivalent mass</text>
            <text x="390" y="295" fill="#94a3b8" fontSize="10">1 Faraday = 96500 C/mol e⁻</text>
            <rect x="80" y="360" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="390" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Applications</text>
            <text x="100" y="420" fill="#e2e8f0" fontSize="11">Electroplating • Metal extraction (Al, Na) • Purification • Chlor-alkali industry</text>
          </svg>
        );
      case "gas-laws":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Gas Laws</text>
            <rect x="80" y="90" width="170" height="90" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="120" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Boyle's Law</text>
            <text x="165" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="14">P₁V₁ = P₂V₂</text>
            <text x="165" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">T constant</text>
            <rect x="270" y="90" width="170" height="90" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="355" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Charles's Law</text>
            <text x="355" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="14">V₁/T₁ = V₂/T₂</text>
            <text x="355" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">P constant</text>
            <rect x="460" y="90" width="170" height="90" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="545" y="120" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Gay-Lussac's</text>
            <text x="545" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="14">P₁/T₁ = P₂/T₂</text>
            <text x="545" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">V constant</text>
            <rect x="80" y="200" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="235" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Combined Gas Law</text>
            <text x="350" y="265" textAnchor="middle" fill="#e2e8f0" fontSize="14">PV/T = constant  OR  P₁V₁/T₁ = P₂V₂/T₂</text>
            <rect x="80" y="300" width="540" height="80" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="335" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Ideal Gas Equation</text>
            <text x="350" y="370" textAnchor="middle" fill="#e2e8f0" fontSize="18">PV = nRT</text>
            <text x="350" y="390" textAnchor="middle" fill="#94a3b8" fontSize="10">R = 0.0821 L·atm/(mol·K)  or  8.314 J/(mol·K)</text>
            <rect x="80" y="400" width="540" height="40" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="425" textAnchor="middle" fill="#e2e8f0" fontSize="11">Assumptions: negligible volume, no intermolecular forces, elastic collisions</text>
          </svg>
        );
      case "kinetic-theory-gases":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Kinetic Theory of Gases</text>
            <rect x="80" y="90" width="260" height="200" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Postulates</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">1. Gas consists of tiny particles</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">2. Particles in constant random motion</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">3. Collisions are perfectly elastic</text>
            <text x="100" y="215" fill="#e2e8f0" fontSize="11">4. No intermolecular forces</text>
            <text x="100" y="235" fill="#e2e8f0" fontSize="11">5. KE ∝ absolute temperature</text>
            <rect x="370" y="90" width="260" height="200" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Key Equations</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="12">KE_avg = 3/2 kT</text>
            <text x="390" y="180" fill="#94a3b8" fontSize="10">k = Boltzmann constant</text>
            <text x="390" y="210" fill="#e2e8f0" fontSize="12">v_rms = sqrt(3RT/M)</text>
            <text x="390" y="235" fill="#94a3b8" fontSize="10">Root mean square speed</text>
            <text x="390" y="270" fill="#e2e8f0" fontSize="12">PV = 1/3 Nm(v_rms)²</text>
            <rect x="80" y="310" width="540" height="130" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="350" y="340" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Real Gas Deviation</text>
            <text x="100" y="375" fill="#e2e8f0" fontSize="11">Van der Waals equation: (P+a/V²)(V-b) = RT</text>
            <text x="100" y="400" fill="#94a3b8" fontSize="10">a = attraction correction, b = volume correction</text>
            <text x="100" y="420" fill="#94a3b8" fontSize="10">Deviation at high P, low T (intermolecular forces matter)</text>
          </svg>
        );
      case "crystal-lattices":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Solid State - Crystal Lattices</text>
            <rect x="80" y="90" width="260" height="160" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="120" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Types of Solids</text>
            <text x="100" y="155" fill="#e2e8f0" fontSize="11">• Ionic: NaCl, MgO (hard, brittle)</text>
            <text x="100" y="175" fill="#e2e8f0" fontSize="11">• Molecular: ice, dry ice (soft)</text>
            <text x="100" y="195" fill="#e2e8f0" fontSize="11">• Covalent: diamond, SiO₂ (very hard)</text>
            <text x="100" y="215" fill="#e2e8f0" fontSize="11">• Metallic: Fe, Cu (malleable)</text>
            <rect x="370" y="90" width="260" height="160" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="120" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Unit Cells</text>
            <text x="390" y="155" fill="#e2e8f0" fontSize="11">• Simple cubic (SC): 1 atom/cell</text>
            <text x="390" y="175" fill="#e2e8f0" fontSize="11">• Body-centered (BCC): 2 atoms/cell</text>
            <text x="390" y="195" fill="#e2e8f0" fontSize="11">• Face-centered (FCC): 4 atoms/cell</text>
            <text x="390" y="215" fill="#94a3b8" fontSize="10">Packing efficiency: SC 52%, BCC 68%, FCC 74%</text>
            <rect x="80" y="270" width="540" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="350" y="300" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Crystal Defects</text>
            <text x="100" y="335" fill="#e2e8f0" fontSize="11">Point defects: vacancy (missing atom), interstitial (extra atom)</text>
            <text x="100" y="360" fill="#e2e8f0" fontSize="11">Impurity defects: substitutional or interstitial impurities</text>
          </svg>
        );
      case "basic-concepts-chemistry":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Basic Concepts of Chemistry</text>
            <rect x="80" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="165" y="120" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Atom</text>
            <text x="165" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="11">Smallest particle</text>
            <text x="165" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">of an element</text>
            <rect x="270" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="355" y="120" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Molecule</text>
            <text x="355" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="11">Smallest particle</text>
            <text x="355" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">of a compound</text>
            <rect x="460" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="545" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Formula</text>
            <text x="545" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="11">Symbolic representation</text>
            <text x="545" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">of composition</text>
            <rect x="80" y="210" width="540" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="240" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Fundamental Laws</text>
            <text x="100" y="275" fill="#e2e8f0" fontSize="11">• Conservation of Mass: mass neither created nor destroyed</text>
            <text x="100" y="300" fill="#e2e8f0" fontSize="11">• Definite Proportions: compound always has same elements ratio</text>
            <text x="350" y="275" textAnchor="middle" fill="#e2e8f0" fontSize="11">• Multiple Proportions: different compounds show simple ratios</text>
            <text x="350" y="300" textAnchor="middle" fill="#94a3b8" fontSize="10">e.g., CO and CO₂ → oxygen ratio 1:2</text>
            <rect x="80" y="350" width="540" height="90" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="380" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Atomic Mass Unit (amu)</text>
            <text x="350" y="410" textAnchor="middle" fill="#e2e8f0" fontSize="12">1 amu = 1/12 mass of ¹²C atom = 1.6605 × 10⁻²⁴ g</text>
          </svg>
        );
      case "chemistry-intro":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Introduction to Chemistry</text>
            <rect x="80" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="165" y="120" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Organic</text>
            <text x="165" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10">Carbon compounds</text>
            <rect x="270" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="355" y="120" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Inorganic</text>
            <text x="355" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10">Non-carbon compounds</text>
            <rect x="460" y="90" width="170" height="100" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="545" y="120" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Physical</text>
            <text x="545" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10">Energy & kinetics</text>
            <rect x="80" y="210" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="250" textAnchor="middle" fill="#e2e8f0" fontSize="14">Chemistry: Study of matter, its properties, composition, and transformations</text>
            <rect x="80" y="310" width="540" height="130" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="340" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Importance in Daily Life</text>
            <text x="100" y="375" fill="#e2e8f0" fontSize="11">• Food preservation, medicines, fuels, plastics, fertilizers</text>
            <text x="100" y="400" fill="#e2e8f0" fontSize="11">• Understanding digestion, respiration, photosynthesis</text>
            <text x="100" y="420" fill="#94a3b8" fontSize="10">• Environmental chemistry, pollution control</text>
          </svg>
        );
'''

# Insert before default case
new_content = content[:default_pos] + chemistry_cases + content[default_pos:]

with open('frontend/components/derivations/derivation-visual.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Chemistry visual cases added successfully!")
