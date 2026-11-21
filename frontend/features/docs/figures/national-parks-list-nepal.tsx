/** National parks list Nepal — the twelve protected jewels. Well-detailed. Theme-aware. */
export function NationalParksListNepal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="National parks list Nepal twelve parks Chitwan Bardiya Banke Shuklaphanta Parsa Langtang Sagarmatha Makalu Barun Shey Phoksundo Rara Khaptad Shivapuri Nagarjun area established year flagship species tiger rhino snow leopard dolphin wetland lowest altitude highest park altitudinal range Terai Himalaya protected area network table">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's twelve national parks — the network at a glance</text>
      {/* table */}
      <rect x="30" y="40" width="660" height="196" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="50" y="62" fontSize="6.4" className="fill-current text-foreground" fontWeight="800">Park</text>
      <text x="220" y="62" fontSize="6.4" className="fill-current text-foreground" fontWeight="800">Established</text>
      <text x="320" y="62" fontSize="6.4" className="fill-current text-foreground" fontWeight="800">Known for</text>
      {[
        ["Chitwan", "1973 (first)", "tiger, rhino, gharial"],
        ["Sagarmatha", "1976", "Everest, Sherpa culture"],
        ["Langtang", "1977", "close-to-capital Himalaya"],
        ["Rara", "1979", "largest lake, mid-west"],
        ["Khaptad", "1984", "mid-hill plateau, herbs"],
        ["Shey Phoksundo", "1984", "deepest lake, snow leopard"],
        ["Bardiya", "1988", "tiger stronghold, Karnali"],
        ["Makalu Barun", "1992", "wilderness, Makalu peak"],
        ["Shivapuri Nagarjun", "2002", "Kathmandu's watershed"],
        ["Banke", "2010", "TAL connectivity"],
        ["Shuklaphanta", "2017 (from reserve)", "swamp deer, grasslands"],
        ["Parsa", "2017 (from reserve)", "wild elephant, tiger corridor"],
      ].map(([park, year, known], i) => {
        const y = 80 + i * 13;
        return (
          <g key={park as string}>
            <text x="50" y={y} fontSize="5.8" className="fill-current text-foreground" fontWeight="600">{park as string}</text>
            <text x="220" y={y} fontSize="5.8" className="fill-current text-muted-foreground">{year as string}</text>
            <text x="320" y={y} fontSize="5.8" className="fill-current text-muted-foreground">{known as string}</text>
          </g>
        );
      })}
      {/* facts */}
      <rect x="30" y="244" width="660" height="48" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="262" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The span: from Shuklaphanta's 155 m Terai grasslands to Sagarmatha's summits — an altitudinal range no other country's park system matches.</text>
      <text x="360" y="280" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Chitwan first (1973); pair each Terai park with its flagship (tiger/rhino/swamp deer/elephant) and each mountain park with its feature.</text>
    </svg>
  );
}
