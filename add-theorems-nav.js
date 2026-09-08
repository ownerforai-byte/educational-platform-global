const fs = require('fs');
const f = 'frontend/components/layout/sidebar-navigation.tsx';
let c = fs.readFileSync(f, 'utf8');

// Add FileText to lucide imports
c = c.replace(
  '  ClipboardList,\n} from "lucide-react";',
  '  ClipboardList,\n  FileText,\n} from "lucide-react";'
);

// Add theorems item after /levels in browseItems
c = c.replace(
  '{ href: "/levels", label: "Curriculum", icon: BookOpen },\n  { href: "/loksewa"',
  '{ href: "/levels", label: "Curriculum", icon: BookOpen },\n  { href: "/theorems", label: "Theorems & Proofs", icon: FileText },\n  { href: "/loksewa"'
);

fs.writeFileSync(f, c, 'utf8');
console.log('Done');
console.log('Has FileText import:', c.includes('FileText'));
console.log('Has theorems nav item:', c.includes('/theorems'));
