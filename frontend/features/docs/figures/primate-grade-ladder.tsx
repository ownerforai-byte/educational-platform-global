/** Primate grade ladder — prosimian to man. Well-detailed. Theme-aware. */
export function PrimateGradeLadder({ className }: { className?: string }) {
  const grades: [string, string, string][] = [
    ["Prosimians", "lemurs, lorises — wet nose, large eyes", "most primitive grade"],
    ["New World monkeys", "spider, howler — prehensile tail, side nostrils", "Americas only"],
    ["Old World monkeys", "macaque, langur, baboon — down nostrils, callosities", "Africa and Asia"],
    ["Lesser apes", "gibbon — brachiation, monogamous", "Hylobatidae"],
    ["Great apes", "orangutan, gorilla, chimpanzee — large, tailless", "Hominidae"],
    ["Man", "bipedal, speech, culture — Homo sapiens", "Hominidae, tribe Hominini"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Primate grade ladder prosimians New World Old World monkeys lesser apes great apes man six grades characters ascending">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Six primate grades, one ladder</text>
      {grades.map(([name, chars, tag], i) => {
        const y = 46 + i * 36;
        const w = 200 + i * 90;
        return (
          <g key={name}>
            <rect x="40" y={y} width={w} height="30" rx="7" className="fill-current text-sky-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: `rgb(2 132 199 / ${0.6 + i * 0.07})` }} />
            <text x="54" y={y + 20} fontSize="7.2" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={56 + w} y={y + 20} fontSize="6.6" className="fill-current text-muted-foreground">{chars.slice(0, 44)}</text>
            <text x="660" y={y + 20} fontSize="6.2" textAnchor="end" className="fill-current" style={{ color: "rgb(2 132 199 / 0.9)" }}>{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="266" width="660" height="26" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="278" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A grade ladder, not a family tree: each grade shares the characters below it and adds new ones.</text>
      <text x="360" y="289" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: order the six grades — prosimians → NW monkeys → OW monkeys → lesser apes → great apes → man.</text>
    </svg>
  );
}
