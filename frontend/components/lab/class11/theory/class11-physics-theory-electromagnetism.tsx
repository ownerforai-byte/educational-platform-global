"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// DEEP Grade 11 Physics Theory: Electromagnetism
// NEB/CDC Class 11 Chapter 8 - Electromagnetic Induction & Alternating Current
// Specific to Nepal curriculum with peculiar facts, not general Wikipedia knowledge

export const Class11PhysicsTheoryElectromagnetism: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Physics - Electromagnetic Induction (NEB Chapter 8)</CardTitle>
        <CardDescription>
          Deep dive into NEB/CDC Grade 11 Electromagnetism: Magnetic Flux, Faraday&apos;s Laws, Lenz&apos;s Law, Self & Mutual Induction, Eddy Currents, AC Generator, Transformer - with peculiar exam-focused facts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* NEB/CDC Specific Syllabus Mapping */}
        <div className="rounded-md border-2 border-green-500 bg-green-500/10 p-4">
          <h4 className="font-semibold mb-3 text-green-600">NEB/CDC Syllabus Reference</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            <strong>Chapter 8:</strong> Electromagnetic Induction and Alternating Current
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Weightage:</strong> 15 marks (High weightage chapter - frequently asked in exams)
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Pre-requisite:</strong> Magnetism (Chapter 7), Current Electricity (Chapter 6)
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Exam Pattern:</strong> 1 Numerical (5 marks) + 2 Theory (5+5 marks)
          </p>
        </div>

        {/* Magnetic Flux - Deep Definitions */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Magnetic Flux (Φ) - Precise NEB Definition</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            <strong>Definition:</strong> Magnetic flux through a surface is the <strong>total number of magnetic field lines</strong> passing normally through that surface.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">Formula</Badge>
              <div>
                <p className="font-medium">Φ = B·A = BA cosθ</p>
                <p className="text-sm text-muted-foreground">
                  Where: B = Magnetic field intensity (Tesla), A = Area vector (m²), θ = angle between B and normal to surface
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">Unit</Badge>
              <div>
                <p className="font-medium">Weber (Wb) or Tesla·m² (T·m²)</p>
                <p className="text-sm text-muted-foreground">
                  <strong>1 Wb = 1 T·m² = 10⁴ Gauss·cm²</strong> (NEB conversion factor to remember)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">Dimensional Formula</Badge>
              <div>
                <p className="font-medium">[M L² T⁻² A⁻¹]</p>
                <p className="text-sm text-muted-foreground">
                  Derived from: [B] = [M T⁻² A⁻¹], [A] = [L²]
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h5 className="font-medium text-primary mb-2">PECULIAR NEB FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Magnetic flux is a <strong>scalar quantity</strong> (not vector, despite B being vector)</li>
              <li>Flux is maximum when surface is <strong>perpendicular to B</strong> (θ = 0°, cosθ = 1)</li>
              <li>Flux is zero when surface is <strong>parallel to B</strong> (θ = 90°, cosθ = 0)</li>
              <li>For closed surface: <strong>Net magnetic flux = 0</strong> (Gauss&apos;s Law for Magnetism)</li>
              <li>Magnetic monopoles <strong>do not exist</strong> (unlike electric monopoles)</li>
            </ul>
          </div>
        </div>

        {/* Faraday's Law - Exam Focused */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Faraday&apos;s Law of Electromagnetic Induction</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            <strong>Statement:</strong> The induced electromotive force (emf) in a closed circuit is directly proportional to the <strong>rate of change of magnetic flux</strong> through the circuit.
          </p>
          
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-1">Mathematical Form</Badge>
            <div>
              <p className="font-medium text-lg">ε = -dΦ/dt = -L dI/dt</p>
              <p className="text-sm text-muted-foreground mt-1">
                ε = induced emf (Volts), Φ = magnetic flux (Wb), t = time (s), L = self-inductance (H), I = current (A)
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h5 className="font-medium text-primary mb-2">CRITICAL EXAM POINTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Negative sign:</strong> Indicates direction of induced emf (Lenz&apos;s Law - opposes the change)</li>
              <li><strong>Instantaneous:</strong> Induced emf exists only when flux <strong>changes</strong> (dΦ/dt ≠ 0)</li>
              <li><strong>Magnitude:</strong> ε = |dΦ/dt| (absolute value for calculations)</li>
              <li><strong>Coil with N turns:</strong> ε = -N dΦ/dt (total emf = sum of emf in each turn)</li>
              <li><strong>Flux change methods:</strong> (i) Change magnetic field, (ii) Change area, (iii) Change orientation, (iv) Any combination</li>
            </ul>
          </div>
        </div>

        {/* Lenz's Law - NEB Specific */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Lenz&apos;s Law - Conservation of Energy Perspective</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            <strong>Statement:</strong> The direction of induced current is always such as to <strong>oppose the cause</strong> that produces it.
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            This is a direct consequence of <strong>Conservation of Energy</strong> - if induced current reinforced the change, perpetual motion would be possible (violating energy conservation).
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <h5 className="font-medium text-blue-600 mb-2">Method to Find Direction:</h5>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Determine direction of <strong>magnetic field</strong></li>
                <li>Determine if flux is <strong>increasing or decreasing</strong></li>
                <li>Induced current creates field to <strong>oppose</strong> the change</li>
                <li>Use <strong>Right-Hand Rule</strong> to find current direction</li>
              </ol>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg">
              <h5 className="font-medium text-red-600 mb-2">Peculiar NEB Examples:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Bar magnet approaching coil:</strong> Current flows to <strong>repel</strong> magnet</li>
                <li><strong>Bar magnet moving away:</strong> Current flows to <strong>attract</strong> magnet</li>
                <li><strong>North pole entering coil:</strong> Current anti-clockwise (viewed from magnet side)</li>
                <li><strong>South pole entering coil:</strong> Current clockwise</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Self and Mutual Induction - Deep Dive */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Self-Induction vs Mutual Induction</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-purple-600 mb-3">Self-Induction (L)</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Induced emf in a coil due to <strong>change in its own current</strong>.
              </p>
              <p className="font-medium">ε = -L dI/dt</p>
              <p className="text-sm text-muted-foreground mt-1">
                L = Self-inductance (Henry, H)
              </p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm"><strong>NEB Formula:</strong></p>
                <p className="font-medium">L = μ₀ N² A / l</p>
                <p className="text-sm text-muted-foreground">
                  μ₀ = 4π×10⁻⁷ H/m, N = turns, A = area, l = length
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm"><strong>Energy Stored:</strong></p>
                <p className="font-medium">U = ½ L I²</p>
                <p className="text-sm text-muted-foreground">
                  (This formula appears in NEB exams - remember it!)
                </p>
              </div>
            </div>
            
            <div className="bg-orange-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-orange-600 mb-3">Mutual Induction (M)</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Induced emf in one coil due to <strong>change in current of another coil</strong>.
              </p>
              <p className="font-medium">ε₂ = -M dI₁/dt</p>
              <p className="text-sm text-muted-foreground mt-1">
                M = Mutual inductance (Henry, H)
              </p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm"><strong>NEB Formula:</strong></p>
                <p className="font-medium">M = μ₀ N₁ N₂ A / l</p>
                <p className="text-sm text-muted-foreground">
                  N₁, N₂ = turns in primary and secondary coils
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm"><strong>Coupling Coefficient:</strong></p>
                <p className="font-medium">k = M / √(L₁ L₂)</p>
                <p className="text-sm text-muted-foreground">
                  0 ≤ k ≤ 1 (k=1 for perfect coupling)
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h5 className="font-medium text-primary mb-2">PECULIAR NEB FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Self-inductance is property of <strong>single coil</strong>, mutual inductance is property of <strong>two coils</strong></li>
              <li>Self-inductance <strong>opposes</strong> the change in current in its own coil</li>
              <li>Mutual inductance depends on <strong>relative orientation</strong> of coils</li>
              <li>M = M₁₂ = M₂₁ (mutual inductance is same for both coils)</li>
              <li>Self-inductance of long solenoid: <strong>L = μ₀ n² V</strong> where n = turns/length, V = volume</li>
            </ul>
          </div>
        </div>

        {/* Eddy Currents - NEB Specific */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Eddy Currents (NEB Special Topic)</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Circular currents induced in <strong>bulk conductors</strong> when placed in changing magnetic fields.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-2">Applications:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Induction Furnace:</strong> Heating metals to high temperatures (NEB diagram required)</li>
                <li><strong>Electromagnetic Braking:</strong> Used in trains (no friction, works in vacuum)</li>
                <li><strong>Speedometers:</strong> Measures vehicle speed using eddy currents</li>
                <li><strong>Energy Meters:</strong> Aluminium disc rotates due to eddy currents</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Disadvantages & Minimization:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Energy Loss:</strong> In transformers, generators (I²R loss)</li>
                <li><strong>Minimization:</strong> Use <strong>laminated cores</strong> (thin silicon steel sheets)</li>
                <li><strong>Why laminated?</strong> Increases resistance → reduces eddy current magnitude</li>
                <li><strong>Insulated layers:</strong> Prevent current flow between laminations</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-amber-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-amber-600 mb-2">NEB NUMERICAL FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Eddy current magnitude: I = (dΦ/dt) / R</li>
              <li>Power loss: P = I² R = (dΦ/dt)² / R</li>
              <li>In laminated core: P ∝ t² (t = thickness of lamination)</li>
              <li>With lamination: P is reduced by factor of <strong>n²</strong> (n = number of laminations)</li>
            </ul>
          </div>
        </div>

        {/* AC Generator & Transformer - Exam Critical */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">AC Generator (NEB Chapter 8.5)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium mb-2">Construction:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Armature:</strong> Coil ABCD (rectangular, N turns)</li>
                <li><strong>Field Magnets:</strong> North and South poles</li>
                <li><strong>Slip Rings:</strong> Two metallic rings (R₁, R₂)</li>
                <li><strong>Brushes:</strong> Carbon brushes (B₁, B₂) for external connection</li>
                <li><strong>Axis:</strong> Perpendicular to magnetic field</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Working:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Armature rotates in uniform magnetic field</li>
                <li>Flux through coil changes continuously</li>
                <li>Induced emf: <strong>ε = N B A ω sin(ωt)</strong></li>
                <li><strong>ε₀ = N B A ω</strong> (maximum emf)</li>
                <li>Frequency: <strong>f = n / 60 Hz</strong> (n = rpm)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-cyan-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-cyan-600 mb-2">NEB IMPORTANT DERIVATIONS:</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>EMF Equation:</strong> ε = ε₀ sin(ωt) where ε₀ = N B A ω
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              For circular coil: A = πr², ω = 2πf
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              <strong>Average EMF over half cycle:</strong> ε_avg = (2/π) ε₀ = 0.637 ε₀
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              <strong>RMS EMF:</strong> ε_rms = ε₀ / √2 = 0.707 ε₀
            </p>
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Transformer (NEB Chapter 8.6)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium mb-2">Types:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Step-up:</strong> N_s &gt; N_p, V_s &gt; V_p, I_s &lt; I_p</li>
                <li><strong>Step-down:</strong> N_s &lt; N_p, V_s &lt; V_p, I_s &gt; I_p</li>
                <li><strong>Ideal:</strong> 100% efficiency (no losses)</li>
                <li><strong>Real:</strong> 95-99% efficiency (has losses)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Formulas:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>V_s / V_p = N_s / N_p = I_p / I_s</li>
                <li>V_s = (N_s / N_p) V_p</li>
                <li>P_in = P_out (ideal)</li>
                <li>η = (P_out / P_in) × 100%</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h5 className="font-medium text-primary mb-2">Transformer Losses (NEB Exam Points):</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500/10 p-2 rounded">
                <p className="font-medium text-sm">Copper Loss:</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>I²R loss in primary & secondary windings</li>
                  <li>Minimized: Use thick wire, low resistance</li>
                  <li>Formula: P_cu = I_p² R_p + I_s² R_s</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 p-2 rounded">
                <p className="font-medium text-sm">Iron Loss:</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Hysteresis loss + Eddy current loss</li>
                  <li>Hysteresis: P_h = k_h B_max^1.6 f V</li>
                  <li>Eddy: P_e = k_e B_max² f² t² V</li>
                  <li>Minimized: Silicon steel, laminated core</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-green-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-green-600 mb-2">NEB PECULIAR FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Transformer works on <strong>AC only</strong> (not DC - flux doesn&apos;t change)</li>
              <li>Frequency remains <strong>same</strong> in primary and secondary</li>
              <li>Phase difference between V_p and V_s is <strong>180°</strong> (due to Lenz&apos;s Law)</li>
              <li>In ideal transformer: <strong>V_p I_p = V_s I_s</strong></li>
              <li>Transformer does NOT change <strong>power</strong> (only voltage and current)</li>
              <li>Open circuit test: Measures <strong>iron loss</strong></li>
              <li>Short circuit test: Measures <strong>copper loss</strong></li>
            </ul>
          </div>
        </div>

        {/* Exam Tips */}
        <div className="rounded-md border-2 border-amber-500 bg-amber-500/10 p-4">
          <h4 className="font-semibold mb-3 text-amber-600">NEB EXAM TIPS - Electromagnetism</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="font-medium text-primary mb-2">High Weightage Topics:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Faraday&apos;s Law calculations</li>
                <li>Self-inductance of solenoid</li>
                <li>AC generator emf equation</li>
                <li>Transformer voltage/current ratios</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-primary mb-2">Common Mistakes:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Forgetting negative sign in Lenz&apos;s Law</li>
                <li>Using diameter instead of radius in area</li>
                <li>Wrong units (Wb vs T·m²)</li>
                <li>Confusing self and mutual induction</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-primary mb-2">Important Constants:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>μ₀ = 4π × 10⁻⁷ H/m</li>
                <li>ε₀ = 8.85 × 10⁻¹² F/m</li>
                <li>c = 3 × 10⁸ m/s</li>
                <li>g = 9.8 m/s² (use 10 for simplification)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11PhysicsTheoryElectromagnetism;
