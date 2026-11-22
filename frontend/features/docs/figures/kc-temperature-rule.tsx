// Only temperature changes Kc. Theme-aware.
export function KcTemperatureRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Summary of which factors change Kc and which only shift the equilibrium position, with temperature alone changing the constant">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Who moves the position, who rewrites Kc</text>
      <rect x="40" y="50" width="270" height="120" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.13" />
      <text x="60" y="76" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">Shift position only:</text>
      <text x="60" y="100" fontSize="11.5" className="fill-current text-muted-foreground">- add / remove species</text>
      <text x="60" y="122" fontSize="11.5" className="fill-current text-muted-foreground">- change pressure or volume</text>
      <text x="60" y="144" fontSize="11.5" className="fill-current text-muted-foreground">- add a catalyst (time only)</text>
      <rect x="350" y="50" width="270" height="120" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.15" />
      <text x="370" y="76" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">Rewrites Kc itself:</text>
      <text x="370" y="100" fontSize="11.5" fontWeight="700" fill="rgb(239 68 68)">- temperature - the only one</text>
      <text x="370" y="126" fontSize="11" className="fill-current text-muted-foreground">exothermic: Kc falls as T rises</text>
      <text x="370" y="146" fontSize="11" className="fill-current text-muted-foreground">endothermic: Kc rises as T rises</text>
      <text x="330" y="212" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Concentration and pressure slide along a fixed Kc; temperature builds a new one</text>
      <text x="330" y="236" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Write this sentence in every Le Chatelier answer - it carries a mark</text>
    </svg>
  );
}
