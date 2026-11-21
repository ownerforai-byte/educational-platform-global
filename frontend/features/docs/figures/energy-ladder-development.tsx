/** Energy ladder development — from dung to electricity. Well-detailed. Theme-aware. */
export function EnergyLadderDevelopment({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Energy ladder development dung crop residues fuelwood charcoal kerosene LPG electricity climbing rungs income correlation energy transition indoor pollution efficiency convenience modern carriers leapfrogging skip rungs solar Nepal household energy mix firewood majority rural urban difference clean cooking access target SDG7">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The energy ladder — households climb as income rises</text>
      {/* ladder */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["1. Dung + crop residue", "free, smoky, inefficient — the bottom rung", 130],
        ["2. Fuelwood", "the rural Nepali default; labour to collect, smoke to breathe", 230],
        ["3. Charcoal / kerosene", "urban stepping stones; still polluting", 330],
        ["4. LPG / biogas", "clean burning, piped or bottled", 430],
        ["5. Electricity", "the top rung: induction, appliances, everything", 530],
      ].map(([rung, detail, x], i) => {
        const y = 76 + i * 26;
        return (
          <g key={rung as string}>
            <rect x="60" y={y - 9} width={30 + i * 90} height="18" rx="4" className="fill-current" style={{ color: i < 3 ? "rgb(217 119 6 / 0.3)" : "rgb(22 163 74 / 0.3)" }} stroke="currentColor" strokeWidth="0.8" />
            <text x="70" y={y + 3} fontSize="5.8" className="fill-current text-foreground" fontWeight="700">{rung as string}</text>
            <text x={100 + i * 90} y={y + 3} fontSize="5.4" className="fill-current text-muted-foreground">{detail as string}</text>
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">up the ladder = cleaner, more convenient, more efficient — and usually more expensive per unit of service</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal's position: most rural households still cook with fuelwood; LPG and biogas are climbing fast in towns and accessible hills.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Leapfrogging happens: households jump from fuelwood straight to electric cooking — the ladder isn't always climbed rung by rung.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the rungs in order and link each to income and health — the ladder is a development diagram, not just an energy one.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">SDG 7 is the ladder as policy: affordable, reliable, modern energy for all.</text>
    </svg>
  );
}
