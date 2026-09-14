import re

# Read the file
with open('frontend/components/derivations/derivation-visual.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the default case
default_pos = content.rfind('      default:')
if default_pos == -1:
    print("ERROR: Could not find default case")
    exit(1)

print(f"Found default case at position {default_pos}")

physics_cases = '''
      // ============ PHYSICS VISUALIZATIONS ============
      case "projectile-motion":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">Projectile Motion</text>
            {/* Trajectory */}
            <path d="M 100 380 Q 250 100 500 380" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="8,4"/>
            <circle cx="100" cy="380" r="8" fill="#3b82f6"/>
            <text x="100" y="410" textAnchor="middle" fill="#3b82f6" fontSize="10">Launch (θ)</text>
            <circle cx="500" cy="380" r="8" fill="#f59e0b"/>
            <text x="500" y="410" textAnchor="middle" fill="#f59e0b" fontSize="10">Range (R)</text>
            <circle cx="300" cy="130" r="8" fill="#ec4899"/>
            <text x="300" y="110" textAnchor="middle" fill="#ec4899" fontSize="10">Max Height (H)</text>
            {/* Components */}
            <line x1="100" y1="380" x2="200" y2="380" stroke="#ef4444" strokeWidth="2"/>
            <text x="150" y="395" textAnchor="middle" fill="#ef4444" fontSize="10">v_x = u cosθ</text>
            <line x1="100" y1="380" x2="100" y2="280" stroke="#3b82f6" strokeWidth="2"/>
            <text x="80" y="330" textAnchor="middle" fill="#3b82f6" fontSize="10">v_y = u sinθ</text>
            {/* Formulas */}
            <rect x="80" y="430" width="260" height="60" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="455" textAnchor="middle" fill="#22c55e" fontSize="12">R = u²sin(2θ)/g</text>
            <rect x="370" y="430" width="260" height="60" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="500" y="455" textAnchor="middle" fill="#3b82f6" fontSize="12">H = u²sin²θ/2g</text>
          </svg>
        );
      case "ohms-law":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Ohm's Law</text>
            {/* Formula triangle */}
            <polygon points="350,120 250,280 450,280" fill="none" stroke="#f59e0b" strokeWidth="3"/>
            <text x="350" y="200" textAnchor="middle" fill="#ef4444" fontSize="24" fontWeight="bold">V</text>
            <text x="290" y="260" textAnchor="middle" fill="#22c55e" fontSize="20">I</text>
            <text x="410" y="260" textAnchor="middle" fill="#8b5cf6" fontSize="20">R</text>
            <text x="350" y="240" textAnchor="middle" fill="#94a3b8" fontSize="10">×</text>
            {/* Equation forms */}
            <rect x="100" y="310" width="230" height="50" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="215" y="340" textAnchor="middle" fill="#ef4444" fontSize="16">V = IR</text>
            <rect x="370" y="310" width="230" height="50" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="485" y="340" textAnchor="middle" fill="#22c55e" fontSize="16">I = V/R</text>
            <rect x="100" y="380" width="230" height="50" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="215" y="410" textAnchor="middle" fill="#8b5cf6" fontSize="16">R = V/I</text>
            <rect x="370" y="380" width="230" height="50" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="485" y="410" textAnchor="middle" fill="#06b6d4" fontSize="14">I ∝ V (constant T)</text>
          </svg>
        );
      case "coulomb-law":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Coulomb's Law</text>
            {/* Charges */}
            <circle cx="200" cy="250" r="30" fill="#ef4444"/>
            <text x="200" y="255" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">+</text>
            <circle cx="500" cy="250" r="30" fill="#3b82f6"/>
            <text x="500" y="255" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">-</text>
            {/* Force arrows */}
            <line x1="240" y1="250" x2="460" y2="250" stroke="#22c55e" strokeWidth="4" markerEnd="url(#arrow)"/>
            <text x="350" y="230" textAnchor="middle" fill="#22c55e" fontSize="14">Force (attractive)</text>
            {/* Formula */}
            <rect x="150" y="300" width="400" height="80" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="350" y="340" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">F = k(q₁q₂)/r²</text>
            <text x="350" y="365" textAnchor="middle" fill="#94a3b8" fontSize="11">k = 9×10⁹ N·m²/C²</text>
            <text x="350" y="440" textAnchor="middle" fill="#e2e8f0" fontSize="12">Like charges repel · Opposite charges attract</text>
          </svg>
        );
      case "wave-optics":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Wave-Particle Duality</text>
            {/* Wave */}
            <rect x="80" y="100" width="260" height="150" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="130" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Wave Nature</text>
            <path d="M 100 200 Q 150 140 200 200 Q 250 260 300 200" fill="none" stroke="#3b82f6" strokeWidth="3"/>
            <text x="210" y="280" textAnchor="middle" fill="#94a3b8" fontSize="10">Interference, Diffraction, Polarization</text>
            {/* Particle */}
            <rect x="370" y="100" width="260" height="150" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="130" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Particle Nature</text>
            <circle cx="500" cy="200" r="25" fill="#f59e0b"/>
            <text x="500" y="205" textAnchor="middle" fill="white" fontSize="10">γ</text>
            <text x="500" y="280" textAnchor="middle" fill="#94a3b8" fontSize="10">Photoelectric effect, Compton scattering</text>
            {/* de Broglie */}
            <rect x="150" y="280" width="400" height="80" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="315" textAnchor="middle" fill="#06b6d4" fontSize="16">λ = h/p = h/mv</text>
            <text x="350" y="340" textAnchor="middle" fill="#94a3b8" fontSize="11">de Broglie Wavelength</text>
            <text x="350" y="440" textAnchor="middle" fill="#e2e8f0" fontSize="12">Light exhibits both wave and particle properties</text>
          </svg>
        );
      case "newton-gravitation":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Newton's Law of Gravitation</text>
            {/* Earth */}
            <circle cx="350" cy="250" r="60" fill="#3b82f6" opacity="0.7"/>
            <text x="350" y="255" textAnchor="middle" fill="white" fontSize="12">Earth</text>
            {/* Orbit paths */}
            <ellipse cx="350" cy="250" rx="150" ry="100" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="5,3"/>
            <ellipse cx="350" cy="250" rx="220" ry="140" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="5,3"/>
            {/* Satellite */}
            <circle cx="500" cy="250" r="10" fill="#ef4444"/>
            <text x="515" y="255" fill="#ef4444" fontSize="10">satellite</text>
            {/* Force arrow */}
            <line x1="500" y1="250" x2="390" y2="250" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)"/>
            <text x="445" y="235" textAnchor="middle" fill="#f59e0b" fontSize="11">F</text>
            {/* Formula */}
            <rect x="100" y="400" width="500" height="40" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="350" y="425" textAnchor="middle" fill="#f59e0b" fontSize="14">F = Gm₁m₂/r²</text>
          </svg>
        );
      case "vector-basics":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Vector Addition</text>
            {/* Parallelogram method */}
            <rect x="80" y="100" width="260" height="200" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="210" y="130" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Parallelogram Law</text>
            <polygon points="120,250 200,250 260,180 180,180" fill="none" stroke="#94a3b8" strokeWidth="2"/>
            <line x1="120" y1="250" x2="260" y2="180" stroke="#22c55e" strokeWidth="3"/>
            <polygon points="120,250 180,180 200,250" fill="#3b82f6" opacity="0.3"/>
            <text x="160" y="270" fill="#3b82f6" fontSize="10">A</text>
            <text x="200" y="220" fill="#22c55e" fontSize="10">B</text>
            <text x="230" y="210" fill="#ef4444" fontSize="10">R = A+B</text>
            <rect x="370" y="100" width="260" height="200" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="500" y="130" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">Triangle Law</text>
            <line x1="420" y1="280" x2="500" y2="280" stroke="#3b82f6" strokeWidth="3"/>
            <line x1="500" y1="280" x2="560" y2="200" stroke="#22c55e" strokeWidth="3"/>
            <line x1="420" y1="280" x2="560" y2="200" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,3"/>
            <text x="460" y="295" fill="#3b82f6" fontSize="10">A</text>
            <text x="540" y="240" fill="#22c55e" fontSize="10">B</text>
            <text x="490" y="245" fill="#ef4444" fontSize="10">R</text>
            <rect x="80" y="330" width="540" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="365" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Scalar vs Vector</text>
            <text x="100" y="395" fill="#e2e8f0" fontSize="11">Scalar: magnitude only (mass, speed, time)</text>
            <text x="380" y="395" textAnchor="middle" fill="#e2e8f0" fontSize="11">Vector: magnitude + direction (force, velocity, displacement)</text>
          </svg>
        );
      case "lens-maker":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">Lens Maker's Formula</text>
            {/* Convex lens */}
            <rect x="80" y="100" width="260" height="200" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="210" y="130" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Convex Lens</text>
            <ellipse cx="210" cy="220" rx="30" ry="60" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
            <line x1="100" y1="220" x2="320" y2="220" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,2"/>
            <text x="210" y="310" textAnchor="middle" fill="#94a3b8" fontSize="10">Converges light rays</text>
            <text x="210" y="330" textAnchor="middle" fill="#94a3b8" fontSize="10">Real image possible</text>
            {/* Concave lens */}
            <rect x="370" y="100" width="260" height="200" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="500" y="130" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">Concave Lens</text>
            <ellipse cx="500" cy="220" rx="30" ry="60" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2"/>
            <line x1="390" y1="220" x2="610" y2="220" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,2"/>
            <text x="500" y="310" textAnchor="middle" fill="#94a3b8" fontSize="10">Diverges light rays</text>
            <text x="500" y="330" textAnchor="middle" fill="#94a3b8" fontSize="10">Virtual image always</text>
            {/* Formula */}
            <rect x="80" y="330" width="540" height="80" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="365" textAnchor="middle" fill="#06b6d4" fontSize="16">1/f = (n-1)(1/R₁ - 1/R₂)</text>
            <text x="350" y="390" textAnchor="middle" fill="#94a3b8" fontSize="11">Thin lens equation: 1/f = 1/v - 1/u</text>
          </svg>
        );
      case "snell-law":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold">Snell's Law (Refraction)</text>
            {/* Interface */}
            <line x1="100" y1="200" x2="600" y2="200" stroke="#f59e0b" strokeWidth="2"/>
            <text x="120" y="185" fill="#f59e0b" fontSize="10">Medium 1 (n₁)</text>
            <text x="120" y="235" fill="#22c55e" fontSize="10">Medium 2 (n₂)</text>
            {/* Normal */}
            <line x1="350" y1="80" x2="350" y2="420" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,3"/>
            <text x="360" y="95" fill="#94a3b8" fontSize="10">Normal</text>
            {/* Incident ray */}
            <line x1="200" y1="80" x2="350" y2="200" stroke="#ef4444" strokeWidth="3"/>
            <text x="250" y="130" fill="#ef4444" fontSize="11">Incident</text>
            {/* Refracted ray */}
            <line x1="350" y1="200" x2="450" y2="380" stroke="#3b82f6" strokeWidth="3"/>
            <text x="400" y="320" fill="#3b82f6" fontSize="11">Refracted</text>
            {/* Angles */}
            <path d="M 350 140 A 60 60 0 0 0 295 170" fill="none" stroke="#ef4444" strokeWidth="2"/>
            <text x="310" y="155" fill="#ef4444" fontSize="10">i</text>
            <path d="M 350 260 A 60 60 0 0 0 390 290" fill="none" stroke="#3b82f6" strokeWidth="2"/>
            <text x="370" y="285" fill="#3b82f6" fontSize="10">r</text>
            {/* Formula */}
            <rect x="150" y="420" width="400" height="30" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="440" textAnchor="middle" fill="#06b6d4" fontSize="14">n₁sin(i) = n₂sin(r)  →  n = sin(i)/sin(r)</text>
          </svg>
        );
      case "tir":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Total Internal Reflection</text>
            {/* Critical angle diagram */}
            <rect x="100" y="100" width="500" height="200" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <line x1="150" y1="200" x2="450" y2="200" stroke="#3b82f6" strokeWidth="2"/>
            <text x="170" y="185" fill="#3b82f6" fontSize="10"> denser medium (n₁)</text>
            <text x="170" y="235" fill="#22c55e" fontSize="10">rarer medium (n₂)</text>
            {/* Critical ray */}
            <line x1="300" y1="280" x2="300" y2="200" stroke="#ef4444" strokeWidth="2"/>
            <line x1="300" y1="200" x2="450" y2="200" stroke="#f59e0b" strokeWidth="3"/>
            <text x="310" y="250" fill="#ef4444" fontSize="10">i = c</text>
            <text x="380" y="195" fill="#f59e0b" fontSize="10">Refracted at 90°</text>
            {/* TIR ray */}
            <line x1="250" y1="280" x2="250" y2="200" stroke="#22c55e" strokeWidth="2"/>
            <line x1="250" y1="200" x2="150" y2="280" stroke="#22c55e" strokeWidth="3"/>
            <text x="260" y="240" fill="#22c55e" fontSize="10">i &gt; c → TIR</text>
            {/* Conditions */}
            <rect x="80" y="320" width="540" height="120" rx="6" fill="#1e293b" stroke="#06b6d4"/>
            <text x="350" y="350" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Conditions for TIR</text>
            <text x="100" y="380" fill="#e2e8f0" fontSize="11">1. Light travels from denser to rarer medium</text>
            <text x="100" y="400" fill="#e2e8f0" fontSize="11">2. Angle of incidence > critical angle (i &gt; c)</text>
            <text x="350" y="420" textAnchor="middle" fill="#94a3b8" fontSize="10">Critical angle: sin(c) = n₂/n₁</text>
          </svg>
        );
      case "capacitor":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Parallel Plate Capacitor</text>
            {/* Capacitor symbol */}
            <line x1="150" y1="200" x2="250" y2="200" stroke="#f59e0b" strokeWidth="3"/>
            <line x1="250" y1="150" x2="250" y2="250" stroke="#ef4444" strokeWidth="4"/>
            <line x1="300" y1="150" x2="300" y2="250" stroke="#3b82f6" strokeWidth="4"/>
            <line x1="300" y1="200" x2="400" y2="200" stroke="#f59e0b" strokeWidth="3"/>
            {/* Labels */}
            <text x="275" y="180" textAnchor="middle" fill="#ef4444" fontSize="12">+</text>
            <text x="275" y="235" textAnchor="middle" fill="#3b82f6" fontSize="12">−</text>
            <text x="275" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10">separation: d</text>
            <text x="350" y="290" textAnchor="middle" fill="#e2e8f0" fontSize="11">Area A</text>
            {/* Formula */}
            <rect x="100" y="310" width="260" height="80" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="230" y="345" textAnchor="middle" fill="#22c55e" fontSize="16">C = ε₀A/d</text>
            <text x="230" y="370" textAnchor="middle" fill="#94a3b8" fontSize="10">C = κε₀A/d (with dielectric)</text>
            <rect x="370" y="310" width="260" height="80" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="500" y="345" textAnchor="middle" fill="#8b5cf6" fontSize="14">Energy stored:</text>
            <text x="500" y="370" textAnchor="middle" fill="#e2e8f0" fontSize="12">U = ½CV² = ½QV = Q²/2C</text>
          </svg>
        );
      case "blackbody":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">Black Body Radiation</text>
            {/* Graph axes */}
            <line x1="120" y1="380" x2="500" y2="380" stroke="#94a3b8" strokeWidth="2"/>
            <line x1="120" y1="380" x2="120" y2="100" stroke="#94a3b8" strokeWidth="2"/>
            <text x="310" y="410" textAnchor="middle" fill="#94a3b8" fontSize="11">Wavelength (λ)</text>
            <text x="80" y="240" textAnchor="middle" fill="#94a3b8" fontSize="11">Intensity</text>
            {/* Curves */}
            <path d="M 120 350 Q 200 350 250 200 Q 300 100 350 180 Q 400 300 500 350" fill="none" stroke="#ef4444" strokeWidth="3"/>
            <text x="380" y="160" fill="#ef4444" fontSize="10">T₁ (high)</text>
            <path d="M 120 360 Q 220 360 280 250 Q 340 150 400 220 Q 440 310 500 360" fill="none" stroke="#3b82f6" strokeWidth="3"/>
            <text x="420" y="200" fill="#3b82f6" fontSize="10">T₂ (low)</text>
            {/* Formula */}
            <rect x="100" y="430" width="260" height="20" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="230" y="445" textAnchor="middle" fill="#22c55e" fontSize="11">Wien's: λ_max · T = b (constant)</text>
            <rect x="380" y="430" width="260" height="20" rx="6" fill="#1e293b" stroke="#f59e0b"/>
            <text x="510" y="445" textAnchor="middle" fill="#f59e0b" fontSize="11">Stefan-Boltzmann: P = σAT⁴</text>
          </svg>
        );
      case "zeroth-law":
        return (
          <svg viewBox="0 0 700 500" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="420" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
            <text x="350" y="70" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">Zeroth Law of Thermodynamics</text>
            {/* Three bodies */}
            <rect x="100" y="120" width="150" height="100" rx="6" fill="#1e293b" stroke="#ef4444"/>
            <text x="175" y="170" textAnchor="middle" fill="#ef4444" fontSize="14">Body A</text>
            <text x="175" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">T_A</text>
            <rect x="450" y="120" width="150" height="100" rx="6" fill="#1e293b" stroke="#3b82f6"/>
            <text x="525" y="170" textAnchor="middle" fill="#3b82f6" fontSize="14">Body B</text>
            <text x="525" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">T_B</text>
            <rect x="250" y="280" width="200" height="100" rx="6" fill="#1e293b" stroke="#22c55e"/>
            <text x="350" y="330" textAnchor="middle" fill="#22c55e" fontSize="14">Body C</text>
            <text x="350" y="350" textAnchor="middle" fill="#94a3b8" fontSize="10">T_C (thermometer)</text>
            {/* Arrows */}
            <line x1="250" y1="170" x2="300" y2="280" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="450" y1="170" x2="400" y2="280" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="280" y="230" fill="#f59e0b" fontSize="10">thermal equilibrium</text>
            {/* Statement */}
            <rect x="100" y="410" width="500" height="35" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
            <text x="350" y="433" textAnchor="middle" fill="#8b5cf6" fontSize="12">If A~C and B~C, then A~B (defines temperature)</text>
          </svg>
        );
'''

# Insert before default case
new_content = content[:default_pos] + physics_cases + content[default_pos:]

with open('frontend/components/derivations/derivation-visual.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Physics visual cases added successfully!")
