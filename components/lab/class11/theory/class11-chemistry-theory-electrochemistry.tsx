"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// DEEP Grade 11 Chemistry Theory: Electrochemistry
// NEB/CDC Class 11 Chapter 9 - Electrochemistry
// Specific to Nepal curriculum with peculiar exam-focused facts, not general knowledge

export const Class11ChemistryTheoryElectrochemistry: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Chemistry - Electrochemistry (NEB Chapter 9)</CardTitle>
        <CardDescription>
          Deep dive into NEB/CDC Grade 11 Electrochemistry: Redox Reactions, Electrochemical Cells, Nernst Equation, Electrolytic Cells, Electrolysis, Batteries - with peculiar Nepal-specific exam facts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* NEB/CDC Specific Syllabus Mapping */}
        <div className="rounded-md border-2 border-green-500 bg-green-500/10 p-4">
          <h4 className="font-semibold mb-3 text-green-600">NEB/CDC Syllabus Reference</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            <strong>Chapter 9:</strong> Electrochemistry
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Weightage:</strong> 10-12 marks (Very high weightage - always 1 numerical + 1-2 theory questions)
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Pre-requisite:</strong> Chemical Bonding (Chapter 3), Thermodynamics (Chapter 6)
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Exam Pattern:</strong> 1 Numerical (5 marks) + 1 Theory (5 marks) + Short questions (2-3 marks)
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Practical:</strong> Daniel Cell experiment (must know for practical exams)
          </p>
        </div>

        {/* Oxidation and Reduction - NEB Specific */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Oxidation and Reduction (NEB Precise Definitions)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-blue-600 mb-3">Oxidation (Loss of Electrons)</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Process involving <strong>loss of electrons</strong> by a substance.
              </p>
              <p className="font-medium">Oxidation State Increases</p>
              <p className="text-sm text-muted-foreground">Example: Fe²⁺ → Fe³⁺ + e⁻ (OS increases from +2 to +3)</p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm"><strong>Oxidizing Agent (OA):</strong></p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Accepts electrons</li>
                  <li>Gets reduced itself</li>
                  <li>Oxidation state decreases</li>
                  <li>Examples: KMnO₄, K₂Cr₂O₇, H₂SO₄, O₃, H₂O₂</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-red-600 mb-3">Reduction (Gain of Electrons)</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Process involving <strong>gain of electrons</strong> by a substance.
              </p>
              <p className="font-medium">Oxidation State Decreases</p>
              <p className="text-sm text-muted-foreground">Example: Cu²⁺ + 2e⁻ → Cu (OS decreases from +2 to 0)</p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm"><strong>Reducing Agent (RA):</strong></p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Donates electrons</li>
                  <li>Gets oxidized itself</li>
                  <li>Oxidation state increases</li>
                  <li>Examples: Zn, Fe, SnCl₂, H₂S, SO₂, Oxalic acid</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-purple-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-purple-600 mb-2">MNEMONIC FOR NEB EXAMS:</h5>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm"><strong>OIL RIG:</strong></p>
                <p className="text-sm text-muted-foreground">Oxidation Is Loss, Reduction Is Gain</p>
              </div>
              <div>
                <p className="text-sm"><strong>LEO GER:</strong></p>
                <p className="text-sm text-muted-foreground">Lose Electrons Oxidation, Gain Electrons Reduction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Electrochemical Series - NEB Critical */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Electrochemical Series (ECS) - NEB Exam Essential</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Arrangement of metals in order of their <strong>standard electrode potentials</strong> (E°).
          </p>
          
          <p className="font-medium text-center mb-3">NEB Electrochemical Series (Partial - Exam Important):</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Metal/Non-metal</th>
                  <th className="border p-2 text-center">E° (Volts)</th>
                  <th className="border p-2 text-left">Reaction</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-500/10"><td className="border p-2">K (Potassium)</td><td className="border p-2 text-center">-2.93</td><td className="border p-2">K → K⁺ + e⁻</td></tr>
                <tr className="bg-blue-500/10"><td className="border p-2">Ca (Calcium)</td><td className="border p-2 text-center">-2.87</td><td className="border p-2">Ca → Ca²⁺ + 2e⁻</td></tr>
                <tr className="bg-blue-500/10"><td className="border p-2">Na (Sodium)</td><td className="border p-2 text-center">-2.71</td><td className="border p-2">Na → Na⁺ + e⁻</td></tr>
                <tr className="bg-blue-500/10"><td className="border p-2">Mg (Magnesium)</td><td className="border p-2 text-center">-2.37</td><td className="border p-2">Mg → Mg²⁺ + 2e⁻</td></tr>
                <tr className="bg-blue-500/10"><td className="border p-2">Al (Aluminium)</td><td className="border p-2 text-center">-1.66</td><td className="border p-2">Al → Al³⁺ + 3e⁻</td></tr>
                <tr className="bg-blue-500/10"><td className="border p-2">Zn (Zinc)</td><td className="border p-2 text-center">-0.76</td><td className="border p-2">Zn → Zn²⁺ + 2e⁻</td></tr>
                <tr className="bg-blue-500/10"><td className="border p-2">Fe (Iron)</td><td className="border p-2 text-center">-0.44</td><td className="border p-2">Fe → Fe²⁺ + 2e⁻</td></tr>
                <tr className="bg-green-500/10"><td className="border p-2">2H⁺/H₂</td><td className="border p-2 text-center">0.00</td><td className="border p-2">2H⁺ + 2e⁻ → H₂</td></tr>
                <tr className="bg-orange-500/10"><td className="border p-2">Cu (Copper)</td><td className="border p-2 text-center">+0.34</td><td className="border p-2">Cu²⁺ + 2e⁻ → Cu</td></tr>
                <tr className="bg-orange-500/10"><td className="border p-2">Ag (Silver)</td><td className="border p-2 text-center">+0.80</td><td className="border p-2">Ag⁺ + e⁻ → Ag</td></tr>
                <tr className="bg-red-500/10"><td className="border p-2">Au (Gold)</td><td className="border p-2 text-center">+1.50</td><td className="border p-2">Au³⁺ + 3e⁻ → Au</td></tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h5 className="font-medium text-primary mb-2">PECULIAR NEB FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>More negative E° = <strong>stronger reducing agent</strong></li>
              <li>More positive E° = <strong>stronger oxidizing agent</strong></li>
              <li>Metals <strong>above hydrogen</strong> in ECS displace H₂ from acids</li>
              <li>Metals <strong>below hydrogen</strong> do NOT displace H₂ from acids</li>
              <li>In Daniel Cell: <strong>Zn is anode (-), Cu is cathode (+)</strong></li>
              <li>Standard hydrogen electrode (SHE) has <strong>E° = 0 V</strong></li>
              <li>E° for F₂/F⁻ is <strong>+2.87 V</strong> (strongest oxidizing agent)</li>
            </ul>
          </div>
        </div>

        {/* Galvanic/Daniel Cell - Deep NEB Knowledge */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Galvanic (Daniel) Cell - NEB Deep Analysis</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Device that converts <strong>chemical energy into electrical energy</strong> through spontaneous redox reaction.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cyan-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-cyan-600 mb-3">Construction (NEB Diagram):</h5>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li><strong>Anode (-):</strong> Zn rod dipped in ZnSO₄ solution (1M)</li>
                <li><strong>Cathode (+):</strong> Cu rod dipped in CuSO₄ solution (1M)</li>
                <li><strong>Salt Bridge:</strong> U-tube with agar-agar + KNO₃ or NH₄NO₃</li>
                <li><strong>Function of Salt Bridge:</strong> Maintains electrical neutrality</li>
                <li><strong>Voltmeter:</strong> Measures cell potential (E_cell)</li>
              </ul>
            </div>
            
            <div className="bg-cyan-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-cyan-600 mb-3">Working (NEB Exam Points):</h5>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li><strong>At Anode (Oxidation):</strong> Zn → Zn²⁺ + 2e⁻</li>
                <li><strong>At Cathode (Reduction):</strong> Cu²⁺ + 2e⁻ → Cu</li>
                <li><strong>Net Reaction:</strong> Zn + Cu²⁺ → Zn²⁺ + Cu</li>
                <li><strong>Electron Flow:</strong> Anode → External circuit → Cathode</li>
                <li><strong>Current Flow:</strong> Cathode → External circuit → Anode (opposite to electron flow)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-amber-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-amber-600 mb-2">Cell Notation (NEB Convention):</h5>
            <p className="text-center">
              <span className="font-mono text-lg">Zn | Zn²⁺(1M) || Cu²⁺(1M) | Cu</span>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed text-center mt-2">
              Single line (|) = Phase boundary | Double line (||) = Salt bridge
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              Left = Anode (Oxidation) | Right = Cathode (Reduction)
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h5 className="font-medium text-primary mb-2">Cell Potential Calculation:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">E_cell = E_cathode - E_anode</p>
                <p className="text-sm text-muted-foreground">For Daniel Cell: E_cell = E_Cu - E_Zn = 0.34 - (-0.76) = +1.10 V</p>
              </div>
              <div>
                <p className="font-medium">ΔG = -n F E_cell</p>
                <p className="text-sm text-muted-foreground">n = electrons transferred, F = 96500 C/mol</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="font-medium">Nernst Equation:</p>
              <p className="font-mono text-lg">E = E° - (RT/nF) ln Q</p>
              <p className="text-sm text-muted-foreground mt-1">
                At 298K: E = E° - (0.0591/n) log Q
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-green-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-green-600 mb-2">NEB PECULIAR FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Salt bridge contains <strong>inert electrolyte</strong> (KNO₃, NH₄NO₃)</li>
              <li>Anode is <strong>negative</strong>, Cathode is <strong>positive</strong> in Galvanic cell</li>
              <li>In Electrolytic cell: Anode is <strong>positive</strong>, Cathode is <strong>negative</strong></li>
              <li>E_cell is <strong>positive</strong> for spontaneous reaction</li>
              <li>E_cell is <strong>negative</strong> for non-spontaneous reaction</li>
              <li>Standard conditions: 298K, 1 atm, 1M concentration</li>
              <li>F = 96500 C/mol (Faraday constant - must remember for numericals)</li>
              <li>For Zn-Cu cell: <strong>E°_cell = +1.10 V</strong></li>
            </ul>
          </div>
        </div>

        {/* Electrolytic Cells - NEB Specific */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Electrolytic Cell (NEB Chapter 9.2)</h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Device that converts <strong>electrical energy into chemical energy</strong> through non-spontaneous redox reaction.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium mb-2">Difference from Galvanic Cell:</p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted"><th className="border p-1 text-left">Feature</th><th className="border p-1 text-center">Galvanic</th><th className="border p-1 text-center">Electrolytic</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border p-1">Energy Conversion</td><td className="border p-1 text-center">Chemical → Electrical</td><td className="border p-1 text-center">Electrical → Chemical</td></tr>
                  <tr><td className="border p-1">Reaction Type</td><td className="border p-1 text-center">Spontaneous (ΔG < 0)</td><td className="border p-1 text-center">Non-spontaneous (ΔG > 0)</td></tr>
                  <tr><td className="border p-1">Anode</td><td className="border p-1 text-center">Negative (-)</td><td className="border p-1 text-center">Positive (+)</td></tr>
                  <tr><td className="border p-1">Cathode</td><td className="border p-1 text-center">Positive (+)</td><td className="border p-1 text-center">Negative (-)</td></tr>
                  <tr><td className="border p-1">Salt Bridge</td><td className="border p-1 text-center">Required</td><td className="border p-1 text-center">Not required</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-cyan-500/10 p-4 rounded-lg">
              <h5 className="font-medium text-cyan-600 mb-3">Applications:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Electroplating:</strong> Coating metals (e.g., Cu, Ag, Au, Ni, Cr)</li>
                <li><strong>Electrorefining:</strong> Purification of metals (Cu, Ag, Au)</li>
                <li><strong>Electrolysis of Water:</strong> 2H₂O → 2H₂ + O₂</li>
                <li><strong>Electrolysis of NaCl:</strong> 2NaCl + 2H₂O → 2NaOH + H₂ + Cl₂</li>
                <li><strong>Electrowinning:</strong> Extraction of metals from ores</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-orange-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-orange-600 mb-2">Faraday&apos;s Laws of Electrolysis (NEB Numerical Focus):</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">First Law:</p>
                <p className="font-mono">m = Z I t</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                  <li>m = mass deposited (g)</li>
                  <li>Z = electrochemical equivalent (g/C)</li>
                  <li>I = current (A)</li>
                  <li>t = time (s)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Second Law:</p>
                <p className="font-mono">m ∝ E ∝ Q</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground mt-2">
                  <li>m = mass deposited</li>
                  <li>E = equivalent weight</li>
                  <li>Q = quantity of electricity (C)</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="font-medium mb-2">Combined Formula:</p>
              <p className="font-mono text-lg">m = (Q / F) × (M / n)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Q = I × t, F = 96500 C/mol, M = molar mass, n = valence
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                For 1 mole: m = M/n grams
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border bg-green-500/10 p-3 rounded-lg">
            <h5 className="font-medium text-green-600 mb-2">NEB PECULIAR FACTS:</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>1 Faraday = 96500 C = charge of 1 mole electrons</li>
              <li>Equivalent weight (E) = Molar mass (M) / Valence (n)</li>
              <li>For Ag (n=1): E = 108 g, m = 108 g for 1F charge</li>
              <li>For Cu (n=2): E = 63.5/2 = 31.75 g, m = 31.75 g for 1F charge</li>
              <li>At STP: 1F charge liberates 11.2 L of H₂ or 5.6 L of O₂</li>
              <li>Electroplating: Object is <strong>cathode</strong>, metal to be plated is <strong>anode</strong></li>
              <li>In electrorefining: Impure metal is <strong>anode</strong>, pure metal deposits at <strong>cathode</strong></li>
            </ul>
          </div>
        </div>

        {/* Batteries and Cells - NEB Specific */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Batteries and Commercial Cells (NEB Additional Knowledge)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium mb-2">Primary Cells (Non-rechargeable):</p>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li><strong>Dry Cell (Leclanché):</strong> Zn | NH₄Cl, MnO₂ | C (E = 1.5 V)</li>
                <li><strong>Anode:</strong> Zn → Zn²⁺ + 2e⁻</li>
                <li><strong>Cathode:</strong> 2MnO₂ + 2NH₄⁺ + 2e⁻ → Mn₂O₃ + 2NH₃ + H₂O</li>
                <li><strong>Mercury Cell:</strong> Zn | HgO | C (E = 1.35 V, steady voltage)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Secondary Cells (Rechargeable):</p>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li><strong>Lead Storage Battery:</strong> Pb | H₂SO₄ | PbO₂ (E = 2 V per cell)</li>
                <li><strong>Discharging:</strong> Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O</li>
                <li><strong>Charging:</strong> 2PbSO₄ + 2H₂O → Pb + PbO₂ + 2H₂SO₄</li>
                <li><strong>Ni-Cd Cell:</strong> Cd | KOH | NiO(OH) (E = 1.4 V)</li>
                <li><strong>Li-ion Battery:</strong> Most common in mobile devices (E = 3.7 V)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h5 className="font-medium text-primary mb-2">Fuel Cells (NEB Modern Application):</h5>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li><strong>H₂-O₂ Fuel Cell:</strong> 2H₂ + O₂ → 2H₂O (E ≈ 1.23 V)</li>
              <li><strong>Anode Reaction:</strong> 2H₂ + 4OH⁻ → 4H₂O + 4e⁻</li>
              <li><strong>Cathode Reaction:</strong> O₂ + 2H₂O + 4e⁻ → 4OH⁻</li>
              <li><strong>Efficiency:</strong> 60-70% (higher than thermal engines)</li>
              <li><strong>Applications:</strong> Space vehicles, electric vehicles</li>
            </ul>
          </div>
        </div>

        {/* Exam Tips */}
        <div className="rounded-md border-2 border-amber-500 bg-amber-500/10 p-4">
          <h4 className="font-semibold mb-3 text-amber-600">NEB EXAM TIPS - Electrochemistry</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="font-medium text-primary mb-2">High Weightage Topics:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Nernst Equation calculations</li>
                <li>Daniel Cell potential calculation</li>
                <li>Faraday&apos;s Laws numericals</li>
                <li>Electrochemical Series applications</li>
                <li>Electroplating calculations</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-primary mb-2">Common Mistakes:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Confusing Anode/Cathode in Galvanic vs Electrolytic cells</li>
                <li>Wrong sign in Nernst Equation</li>
                <li>Forgetting to divide by n in E = E° - (0.0591/n) log Q</li>
                <li>Using wrong valence in equivalent weight</li>
                <li>Not balancing redox reactions properly</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-primary mb-2">Important Constants:</h5>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>F = 96500 C/mol (Faraday)</li>
                <li>R = 8.314 J/mol·K</li>
                <li>T = 298 K (standard temperature)</li>
                <li>RT/F = 0.0257 V at 298K</li>
                <li>2.303 RT/F = 0.0591 V at 298K</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11ChemistryTheoryElectrochemistry;
