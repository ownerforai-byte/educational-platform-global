"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Class11ChemistryTheory: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Chemistry Theory</CardTitle>
        <CardDescription>
          Comprehensive Class 11 Chemistry concepts organized by chapters.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="atomic" className="w-full">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="atomic">Atomic Structure</TabsTrigger>
            <TabsTrigger value="periodic">Periodic Table</TabsTrigger>
            <TabsTrigger value="bonding">Chemical Bonding</TabsTrigger>
            <TabsTrigger value="thermo">Thermodynamics</TabsTrigger>
            <TabsTrigger value="equilibrium">Equilibrium</TabsTrigger>
          </TabsList>

          <TabsContent value="atomic" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 1: Atomic Structure</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Fundamental Particles:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Particle</th>
                        <th className="text-left p-2">Symbol</th>
                        <th className="text-left p-2">Charge</th>
                        <th className="text-left p-2">Mass (kg)</th>
                        <th className="text-left p-2">Mass (u)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Electron</td>
                        <td className="p-2">e⁻</td>
                        <td className="p-2">-1.6 × 10⁻¹⁹ C</td>
                        <td className="p-2">9.1 × 10⁻³¹</td>
                        <td className="p-2">0.0005486</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Proton</td>
                        <td className="p-2">p⁺</td>
                        <td className="p-2">+1.6 × 10⁻¹⁹ C</td>
                        <td className="p-2">1.67 × 10⁻²⁷</td>
                        <td className="p-2">1.007276</td>
                      </tr>
                      <tr>
                        <td className="p-2">Neutron</td>
                        <td className="p-2">n</td>
                        <td className="p-2">0</td>
                        <td className="p-2">1.67 × 10⁻²⁷</td>
                        <td className="p-2">1.008665</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Atomic Models:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Thomson's Model:</p>
                    <p className="text-sm">Atom is a sphere of positive charge with electrons embedded in it (Plum pudding model).</p>
                  </div>
                  <div>
                    <p className="font-medium">Rutherford's Model:</p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Atom has a tiny, dense, positively charged nucleus.</li>
                      <li>Electrons revolve around the nucleus in circular orbits.</li>
                      <li>Most of the atom is empty space.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Bohr's Model:</p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Electrons revolve in discrete orbits called energy levels or shells.</li>
                      <li>Each orbit has a definite energy.</li>
                      <li>Electrons can jump from one orbit to another by absorbing or emitting energy.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Quantum Numbers:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Principal Quantum Number (n):</p>
                    <p className="text-sm">Determines size and energy of the orbital. n = 1, 2, 3, ... (K, L, M shells)</p>
                  </div>
                  <div>
                    <p className="font-medium">Azimuthal Quantum Number (l):</p>
                    <p className="text-sm">Determines shape of the orbital. l = 0, 1, 2, ..., (n-1)</p>
                    <p className="text-sm">l = 0: s-orbital, l = 1: p-orbital, l = 2: d-orbital, l = 3: f-orbital</p>
                  </div>
                  <div>
                    <p className="font-medium">Magnetic Quantum Number (m_l):</p>
                    <p className="text-sm">Determines orientation of the orbital. m_l = -l, ..., 0, ..., +l</p>
                  </div>
                  <div>
                    <p className="font-medium">Spin Quantum Number (m_s):</p>
                    <p className="text-sm">Determines spin of the electron. m_s = ±½</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Electronic Configuration:</h4>
                <p className="text-sm">Distribution of electrons in various atomic orbitals.</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li><strong>Aufbau Principle:</strong> Electrons fill orbitals in order of increasing energy.</li>
                  <li><strong>Pauli Exclusion Principle:</strong> No two electrons in an atom can have the same set of four quantum numbers. Maximum 2 electrons per orbital.</li>
                  <li><strong>Hund's Rule:</strong> Electrons fill degenerate orbitals (same energy) singly first, then pair up.</li>
                </ul>
                <p className="text-sm mt-2"><strong>Order of filling:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f...</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">De Broglie Hypothesis:</h4>
                <p className="text-sm">Matter exhibits both particle and wave nature.</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">λ = h/mv = h/p</p>
                <p className="text-sm text-muted-foreground">where h = Planck's constant = 6.626 × 10⁻³⁴ J·s, p = momentum</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Heisenberg's Uncertainty Principle:</h4>
                <p className="text-sm">It is impossible to simultaneously determine both the position and momentum of a particle with absolute precision.</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">Δx · Δp ≥ h/4π</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="periodic" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 2: Periodic Classification of Elements</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Periodic Law:</h4>
                <p className="text-sm">Properties of elements are periodic functions of their atomic numbers.</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Modern Periodic Table:</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>Groups:</strong> Vertical columns (18 groups). Elements in same group have similar chemical properties.</li>
                  <li><strong>Periods:</strong> Horizontal rows (7 periods). Properties change gradually across a period.</li>
                  <li><strong>Blocks:</strong> s-block (groups 1-2), p-block (groups 13-18), d-block (transition metals), f-block (lanthanides & actinides)</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Periodic Trends:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Atomic Radius:</p>
                    <p className="text-sm">Decreases across a period, Increases down a group</p>
                  </div>
                  <div>
                    <p className="font-medium">Ionic Radius:</p>
                    <p className="text-sm">Cations &lt; Atoms &lt; Anions</p>
                  </div>
                  <div>
                    <p className="font-medium">Ionization Energy:</p>
                    <p className="text-sm">Increases across a period, Decreases down a group</p>
                  </div>
                  <div>
                    <p className="font-medium">Electron Affinity:</p>
                    <p className="text-sm">Increases across a period, Decreases down a group</p>
                  </div>
                  <div>
                    <p className="font-medium">Electronegativity:</p>
                    <p className="text-sm">Increases across a period, Decreases down a group</p>
                  </div>
                  <div>
                    <p className="font-medium">Metallic Character:</p>
                    <p className="text-sm">Decreases across a period, Increases down a group</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Classification of Elements:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium">Metals:</p>
                    <ul className="text-sm space-y-1">
                      <li>Left side of periodic table</li>
                      <li>Good conductors of heat & electricity</li>
                      <li>Malleable & ductile</li>
                      <li>Form basic oxides</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Non-Metals:</p>
                    <ul className="text-sm space-y-1">
                      <li>Right side of periodic table</li>
                      <li>Poor conductors</li>
                      <li>Brittle</li>
                      <li>Form acidic oxides</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Metalloids:</p>
                    <ul className="text-sm space-y-1">
                      <li>Borderline elements (B, Si, Ge, As, Sb, Te)</li>
                      <li>Intermediate properties</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Special Names:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Group 1:</p>
                    <p className="text-sm">Alkali Metals (Li, Na, K, Rb, Cs, Fr)</p>
                  </div>
                  <div>
                    <p className="font-medium">Group 2:</p>
                    <p className="text-sm">Alkaline Earth Metals (Be, Mg, Ca, Sr, Ba, Ra)</p>
                  </div>
                  <div>
                    <p className="font-medium">Group 17:</p>
                    <p className="text-sm">Halogens (F, Cl, Br, I, At)</p>
                  </div>
                  <div>
                    <p className="font-medium">Group 18:</p>
                    <p className="text-sm">Noble Gases (He, Ne, Ar, Kr, Xe, Rn)</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bonding" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 3: Chemical Bonding and Molecular Structure</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Types of Chemical Bonds:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium">Ionic Bond:</p>
                    <ul className="text-sm space-y-1">
                      <li>Transfer of electrons</li>
                      <li>Between metals and non-metals</li>
                      <li>Electrostatic attraction</li>
                      <li>Forms ions</li>
                      <li><strong>Examples:</strong> NaCl, CaO, MgCl₂</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Covalent Bond:</p>
                    <ul className="text-sm space-y-1">
                      <li>Sharing of electrons</li>
                      <li>Between non-metals</li>
                      <li>Forms molecules</li>
                      <li><strong>Examples:</strong> H₂, O₂, H₂O, CO₂</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Metallic Bond:</p>
                    <ul className="text-sm space-y-1">
                      <li>Sea of electrons</li>
                      <li>Between metal atoms</li>
                      <li>Forms metallic lattice</li>
                      <li><strong>Examples:</strong> Na, Cu, Fe</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Lewis Structures:</h4>
                <p className="text-sm">Representation of valence electrons around atoms.</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li><strong>Octet Rule:</strong> Atoms tend to have 8 electrons in their valence shell (except H which follows duet rule).</li>
                  <li><strong>Formal Charge:</strong> FC = Valence electrons - (Non-bonding + ½ Bonding electrons)</li>
                  <li><strong>Resonance:</strong> Multiple valid Lewis structures for a molecule.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">VSEPR Theory:</h4>
                <p className="text-sm">Valence Shell Electron Pair Repulsion Theory explains the shapes of molecules.</p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="font-medium text-sm">Linear:</p>
                    <p className="text-xs">2 electron pairs, 180°</p>
                    <p className="text-xs"><strong>Examples:</strong> CO₂, BeCl₂</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Trigonal Planar:</p>
                    <p className="text-xs">3 electron pairs, 120°</p>
                    <p className="text-xs"><strong>Examples:</strong> BF₃, AlCl₃</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Tetrahedral:</p>
                    <p className="text-xs">4 electron pairs, 109.5°</p>
                    <p className="text-xs"><strong>Examples:</strong> CH₄, CCl₄</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Trigonal Bipyramidal:</p>
                    <p className="text-xs">5 electron pairs, 90°, 120°</p>
                    <p className="text-xs"><strong>Examples:</strong> PCl₅, AsF₅</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Octahedral:</p>
                    <p className="text-xs">6 electron pairs, 90°</p>
                    <p className="text-xs"><strong>Examples:</strong> SF₆, AlF₆³⁻</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Hybridization:</h4>
                <p className="text-sm">Mixing of atomic orbitals to form new hybrid orbitals.</p>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  <div>
                    <p className="font-medium text-sm">sp:</p>
                    <p className="text-xs">Linear, 2 orbitals</p>
                    <p className="text-xs"><strong>Example:</strong> BeCl₂</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">sp²:</p>
                    <p className="text-xs">Trigonal planar, 3 orbitals</p>
                    <p className="text-xs"><strong>Example:</strong> BF₃</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">sp³:</p>
                    <p className="text-xs">Tetrahedral, 4 orbitals</p>
                    <p className="text-xs"><strong>Example:</strong> CH₄</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">dsp³:</p>
                    <p className="text-xs">Trigonal bipyramidal, 5 orbitals</p>
                    <p className="text-xs"><strong>Example:</strong> PCl₅</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Intermolecular Forces:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Ion-Dipole Forces:</p>
                    <p className="text-sm">Between ions and polar molecules.</p>
                  </div>
                  <div>
                    <p className="font-medium">Dipole-Dipole Forces:</p>
                    <p className="text-sm">Between polar molecules.</p>
                  </div>
                  <div>
                    <p className="font-medium">London Dispersion Forces:</p>
                    <p className="text-sm">Between all molecules (including non-polar).</p>
                  </div>
                  <div>
                    <p className="font-medium">Hydrogen Bonding:</p>
                    <p className="text-sm">Special dipole-dipole interaction between H and F, O, or N.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Bond Parameters:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-sm">Bond Length:</p>
                    <p className="text-xs">Distance between nuclei of bonded atoms.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Bond Angle:</p>
                    <p className="text-xs">Angle between two adjacent bonds.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Bond Enthalpy:</p>
                    <p className="text-xs">Energy required to break one mole of bonds.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Bond Order:</p>
                    <p className="text-xs">Number of chemical bonds between pair of atoms.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Resonance Energy:</p>
                    <p className="text-xs">Difference in energy between actual and hypothetical structure.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="thermo" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 4: Thermodynamics</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">System and Surroundings:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium">Open System:</p>
                    <p className="text-sm">Exchanges matter and energy with surroundings.</p>
                  </div>
                  <div>
                    <p className="font-medium">Closed System:</p>
                    <p className="text-sm">Exchanges energy but not matter.</p>
                  </div>
                  <div>
                    <p className="font-medium">Isolated System:</p>
                    <p className="text-sm">Exchanges neither matter nor energy.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Thermodynamic Properties:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Extensive Properties:</p>
                    <p className="text-sm">Depend on amount of matter.</p>
                    <p className="text-xs"><strong>Examples:</strong> Mass, Volume, Internal Energy, Entropy</p>
                  </div>
                  <div>
                    <p className="font-medium">Intensive Properties:</p>
                    <p className="text-sm">Independent of amount of matter.</p>
                    <p className="text-xs"><strong>Examples:</strong> Temperature, Pressure, Density, Viscosity</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Laws of Thermodynamics:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Zeroth Law:</p>
                    <p className="text-sm">If A is in thermal equilibrium with B and B is in thermal equilibrium with C, then A is in thermal equilibrium with C.</p>
                  </div>
                  <div>
                    <p className="font-medium">First Law:</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded">ΔU = q + w</p>
                    <p className="text-sm text-muted-foreground">Change in internal energy = heat added + work done on the system</p>
                  </div>
                  <div>
                    <p className="font-medium">Second Law:</p>
                    <p className="text-sm">Entropy of an isolated system always increases over time.</p>
                    <p className="text-sm mt-1">Or: Heat cannot flow from a colder body to a hotter body on its own.</p>
                  </div>
                  <div>
                    <p className="font-medium">Third Law:</p>
                    <p className="text-sm">At absolute zero temperature, the entropy of a perfect crystal is zero.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Enthalpy (H):</h4>
                <p className="text-sm">Total heat content of a system at constant pressure.</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">H = U + PV</p>
                <p className="text-sm text-muted-foreground">ΔH = q_p (heat absorbed at constant pressure)</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Types of Enthalpy:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm">Standard Enthalpy of Formation (ΔH_f°):</p>
                    <p className="text-xs">Enthalpy change when 1 mole of a compound is formed from its elements in their standard states.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Standard Enthalpy of Combustion (ΔH_c°):</p>
                    <p className="text-xs">Enthalpy change when 1 mole of a substance is completely burned in oxygen.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Enthalpy of Neutralization:</p>
                    <p className="text-xs">Enthalpy change when 1 mole of H⁺ from acid reacts with 1 mole of OH⁻ from base to form water.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Enthalpy of Solution:</p>
                    <p className="text-xs">Enthalpy change when 1 mole of a substance dissolves in excess solvent.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Hess's Law:</h4>
                <p className="text-sm">If a reaction takes place in several steps, its standard reaction enthalpy is the sum of the standard enthalpies of the intermediate reactions into which the overall reaction can be divided.</p>
                <p className="text-sm mt-2"><strong>ΔH_reaction = Σ ΔH_products - Σ ΔH_reactants</strong></p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Spontaneity:</h4>
                <p className="text-sm">Reaction is spontaneous if Gibbs free energy change (ΔG) is negative.</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">ΔG = ΔH - TΔS</p>
                <p className="text-sm text-muted-foreground">where ΔS = entropy change, T = temperature in Kelvin</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-medium text-sm">ΔG &lt; 0:</p>
                    <p className="text-sm">Spontaneous reaction</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">ΔG &gt; 0:</p>
                    <p className="text-sm">Non-spontaneous reaction</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">ΔG = 0:</p>
                    <p className="text-sm">Reaction at equilibrium</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="equilibrium" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 5: Chemical Equilibrium</h3>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Physical vs Chemical Equilibrium:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Physical Equilibrium:</p>
                    <ul className="text-sm space-y-1">
                      <li>Change in physical state</li>
                      <li><strong>Example:</strong> Ice ⇌ Water ⇌ Vapor</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Chemical Equilibrium:</p>
                    <ul className="text-sm space-y-1">
                      <li>Change in chemical composition</li>
                      <li><strong>Example:</strong> N₂ + 3H₂ ⇌ 2NH₃</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Dynamic Equilibrium:</h4>
                <p className="text-sm">At equilibrium, the rate of forward reaction equals the rate of backward reaction.</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li><strong>Characteristics:</strong></li>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Reversible process</li>
                    <li>Rates of forward and backward reactions are equal</li>
                    <li>Concentrations of reactants and products remain constant</li>
                    <li>Can be approached from either direction</li>
                  </ul>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Law of Mass Action:</h4>
                <p className="text-sm">At a constant temperature, the rate of a chemical reaction is directly proportional to the product of the active masses of the reactants.</p>
                <p className="text-sm mt-2">For reaction: aA + bB ⇌ cC + dD</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded">K_c = [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Equilibrium Constant:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">K_c (Concentration):</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">K_c = [Products]/[Reactants]</p>
                    <p className="text-sm text-muted-foreground">Units depend on the reaction</p>
                  </div>
                  <div>
                    <p className="font-medium">K_p (Pressure):</p>
                    <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">K_p = (P_Cᶜ P_Dᵈ)/(P_Aᵃ P_Bᵇ)</p>
                    <p className="text-sm text-muted-foreground">For gaseous reactions</p>
                  </div>
                </div>
                <p className="text-sm mt-2"><strong>Relation:</strong> K_p = K_c (RT)^(Δn), where Δn = moles of products - moles of reactants</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Le Chatelier's Principle:</h4>
                <p className="text-sm">If a dynamic equilibrium is disturbed by changing the conditions (concentration, pressure, temperature), the position of equilibrium moves to counteract the change.</p>
                <div className="space-y-3 mt-3">
                  <div>
                    <p className="font-medium">Effect of Concentration:</p>
                    <p className="text-sm">Increasing concentration of reactants shifts equilibrium to the right (towards products).</p>
                  </div>
                  <div>
                    <p className="font-medium">Effect of Pressure:</p>
                    <p className="text-sm">Increasing pressure shifts equilibrium to the side with fewer moles of gas.</p>
                  </div>
                  <div>
                    <p className="font-medium">Effect of Temperature:</p>
                    <p className="text-sm">Increasing temperature shifts equilibrium in the endothermic direction.</p>
                  </div>
                  <div>
                    <p className="font-medium">Effect of Catalyst:</p>
                    <p className="text-sm">Catalyst does not affect the position of equilibrium but helps to reach equilibrium faster.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Ionic Equilibrium:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Strong Electrolytes:</p>
                    <p className="text-sm">Completely dissociate in water.</p>
                    <p className="text-xs"><strong>Examples:</strong> NaCl, HCl, H₂SO₄</p>
                  </div>
                  <div>
                    <p className="font-medium">Weak Electrolytes:</p>
                    <p className="text-sm">Partially dissociate in water.</p>
                    <p className="text-xs"><strong>Examples:</strong> CH₃COOH, NH₄OH, H₂CO₃</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Ionization Constant (K_a):</p>
                  <p className="text-sm">For weak acid HA ⇌ H⁺ + A⁻</p>
                  <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">K_a = [H⁺][A⁻]/[HA]</p>
                </div>
                <div className="mt-3">
                  <p className="font-medium">Ionization Constant of Water (K_w):</p>
                  <p className="text-sm">H₂O ⇌ H⁺ + OH⁻</p>
                  <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-1">K_w = [H⁺][OH⁻] = 1 × 10⁻¹⁴ at 25°C</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">pH Scale:</h4>
                <p className="text-sm">Measure of hydrogen ion concentration.</p>
                <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">pH = -log[H⁺]</p>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="font-medium text-sm">pH &lt; 7:</p>
                    <p className="text-sm">Acidic</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">pH = 7:</p>
                    <p className="text-sm">Neutral</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">pH &gt; 7:</p>
                    <p className="text-sm">Basic</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Class11ChemistryTheory;
