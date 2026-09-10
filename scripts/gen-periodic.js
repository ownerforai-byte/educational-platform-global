const fs = require("fs");
const periodic = {
  title: "Periodic Table & Periodicity",
  notes: [
    "**Modern Periodic Law:** properties of elements are a periodic function of their atomic numbers (not atomic masses — that was Mendeleev's law).",
    "**Periods (7):** horizontal rows. Period 1 has 2 elements; Periods 2-3 have 8 each; Periods 4-5 have 18 each; Period 6 has 32 (lanthanides); Period 7 is incomplete (actinides).",
    "**Groups (18):** vertical columns. Same group = same outer-shell configuration = similar chemistry.",
    "**s-block (1-2):** reactive metals — alkali (G1) and alkaline earth (G2).",
    "**p-block (13-18):** metals, metalloids, non-metals; G18 noble gases, G17 halogens (most reactive non-metals).",
    "**d-block (3-12):** transition metals — variable oxidation states, coloured ions, catalysis.",
    "**f-block:** lanthanides (4f) + actinides (5f); inner-transition elements.",
    "**Atomic radius:** DECREASES across a period (rising nuclear charge); INCREASES down a group (new shells).",
    "**Ionization energy:** up across a period, down a group. Exceptions: Be > B and N > O (subshell stability).",
    "**Electronegativity:** up across, down a group. F > O > N ~ Cl.",
    "**Electron gain enthalpy:** Cl > F (small F repels the incoming electron).",
    "**Metallic character:** down across, up a group. Fr bottom-left; F top-right.",
    "**Diagonal relationship:** Li-Mg, Be-Al, B-Si (similar charge/size ratio)."
  ],
  confusion: [
    "❌ 'Atomic radius increases across a period.' ✅ It DECREASES across; increases DOWN.",
    "❌ 'Mendeleev's law = Modern Periodic Law.' ✅ Mass vs atomic NUMBER.",
    "❌ 'IE always increases across a period.' ✅ Exceptions: Be > B, N > O.",
    "❌ 'F has the highest electron gain enthalpy.' ✅ Cl does.",
    "❌ 'All d-block = transition elements.' ✅ Zn, Cd, Hg (d10) are not."
  ]
};
fs.writeFileSync("content/ravikishan/class-11/chemistry/theory/periodic-table.json", JSON.stringify(periodic, null, 2) + "\n");
console.log("periodic-table.json rewritten");