import fs from 'node:fs';
import path from 'node:path';
const root = 'C:/Users/ASUS/Desktop/rn/frontend';
function edit(file, transform) {
  const target = path.join(root, file);
  const source = fs.readFileSync(target, 'utf8');
  const result = transform(source);
  if (result === source) throw new Error(`No changes: ${file}`);
  fs.writeFileSync(target, result);
}
edit('components/layout/app-shell.tsx', s => s
  .replace('      <MobileQuickNav />\n', '')
  .replace('href="/"', 'href="/home"')
  .replace('              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />\n', '')
  .replace('Entering Veer Room...', 'Loading study assistant...')
  .replace('translate-y-0 shadow-md', 'translate-y-0')
);
edit('app/layout.tsx', s => s
  .replace('import { StarField } from "@/components/theme/star-field";\n', '')
  .replace('import { AIWidget } from "@/components/layout/ai-widget";\n', '')
  .replace('import { SiteWelcome } from "@/components/layout/site-welcome";\n', '')
  .replace('t=s||"nebula"', 't=s||"system"')
  .replace('if(!(t in m))t="nebula"', 'if(!(t in m))t="system"')
  .replace('antialiased bg-mesh', 'antialiased')
  .replace('defaultTheme="nebula"', 'defaultTheme="system"')
  .replace('            <StarField />\n', '')
  .replace(/                \{\/\* Floating AI chat[\s\S]*?<AIWidget \/>\n/, '')
  .replace(/                \{\/\* Site-wide greeting[\s\S]*?<SiteWelcome \/>\n/, '')
  .replace('R1 focus timer - sits above the AI widget, owner/granted only', 'R1 focus timer - owner/granted only')
);
edit('lib/navigation.ts', s => s
  .replace('{ href: "/", label: "Home"', '{ href: "/home", label: "Home"')
  .replace(/, badge: "[^"]*"(?:, badgeClass: "[^"]*")?/g, '')
  .replace('label: "All 6 Subjects"', 'label: "Subjects"')
  .replace('label: "STEM Labs & Rigor"', 'label: "Labs & Reference"')
  .replace('label: "Veer & Assessment"', 'label: "AI & Practice"')
  .replace('label: "Knowledge & Prep"', 'label: "More Resources"')
  .replace(/(href: "\/chat\/nepali", label: )"[^"]*"/, '$1"Nepali Assistant"')
);
edit('components/home/home-audience.tsx', s => s
  .replace(/\/\*\*[\s\S]*?\*\//, '/** Session-aware home content. The page owns the member tree and its access gate. */')
);
console.log('Updated shared layout, navigation and home audience.');
