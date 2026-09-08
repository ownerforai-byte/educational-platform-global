const fs = require('fs');
const path = 'frontend/components/lab/chemistry-lab.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add getBlock function after Element type closing brace
const elementPattern = /(export type Element = \{[\s\S]*?col: number;\n\};)/;
const getBlockFn = `

/** Derive the s/p/d/f block from an element's electron configuration. */
export function getBlock(el: Element): "s" | "p" | "d" | "f" {
  const config = el.electronConfig ?? "";
  const match = config.match(/([spdf])[\\d⁰¹²³⁴⁵⁶⁷⁸⁹]+$/);
  if (match) return match[1] as "s" | "p" | "d" | "f";
  if (el.row === 9 || el.row === 10) return "f";
  if (el.col >= 3 && el.col <= 12) return "d";
  if (el.col >= 13 && el.col <= 18) return "p";
  return "s";
}`;

if (elementPattern.test(content)) {
  content = content.replace(elementPattern, `$1${getBlockFn}`);
  console.log('1. Added getBlock function');
} else {
  console.log('1. FAILED to find Element type');
}

// 2. Add BlockFilter type before METAL_CATEGORIES
const metalPattern = /const METAL_CATEGORIES = new Set/;
const blockTypeCode = `type BlockFilter = "all" | "s" | "p" | "d" | "f";
const BLOCK_FILTER_LABELS: Record<BlockFilter, string> = {
  "all": "All Blocks",
  "s": "s-block",
  "p": "p-block",
  "d": "d-block",
  "f": "f-block",
};

const METAL_CATEGORIES = new Set`;
if (metalPattern.test(content)) {
  content = content.replace(metalPattern, blockTypeCode);
  console.log('2. Added BlockFilter type and constants');
} else {
  console.log('2. FAILED to find METAL_CATEGORIES');
}

// 3. Add blockFilter state
const statePattern = /const \[activeClass, setActiveClass\] = useState<string \| null>\(null\);/;
const stateReplacement = `const [activeClass, setActiveClass] = useState<string | null>(null);
  const [blockFilter, setBlockFilter] = useState<BlockFilter>("all");`;
if (statePattern.test(content)) {
  content = content.replace(statePattern, stateReplacement);
  console.log('3. Added blockFilter state');
} else {
  console.log('3. FAILED to find activeClass state');
}

// 4. Update filter check in init
const inClassPattern = /const inClass = isInClass\(el, activeClass\);/;
const inClassReplacement = `const inClass = isInClass(el, activeClass);
        const inBlock = blockFilter === "all" || getBlock(el) === blockFilter;
        const visible = inClass && inBlock;`;
if (inClassPattern.test(content)) {
  content = content.replace(inClassPattern, inClassReplacement);
  console.log('4. Added block filter logic');
} else {
  console.log('4. FAILED to find inClass check');
}

// 5. Replace opacity inClass -> visible (material)
content = content.replace(
  'opacity: inClass ? 1 : 0.12,',
  'opacity: visible ? 1 : 0.12,'
);
console.log('5. Updated material opacity');

// 6. Replace opacity inClass -> visible (sprite)
content = content.replace(
  'opacity: inClass ? 1 : 0.15',
  'opacity: visible ? 1 : 0.15'
);
console.log('6. Updated sprite opacity');

// 7. Update useEffect deps
content = content.replace(
  '}, [search, activeClass, autoRotate]);',
  '}, [search, activeClass, blockFilter, autoRotate]);'
);
console.log('7. Updated useEffect deps');

// 8. Add block filter UI - find the right insertion point
const containerDivPattern = /<div\s+ref=\{containerRef\}\s+className="lab-3d-container/;
const blockFilterUI = `
            {!activeClass && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Blocks:</span>
                {(Object.keys(BLOCK_FILTER_LABELS) as BlockFilter[]).map((bf) => (
                  <button
                    key={bf}
                    className={\`px-3 py-1 text-xs rounded-md border transition-colors \${
                      blockFilter === bf
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-accent border-border"
                    }\`}
                    onClick={() => setBlockFilter(bf)}
                  >
                    {BLOCK_FILTER_LABELS[bf]}
                  </button>
                ))}
              </div>
            )}

            {blockFilter !== "all" && (
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Filtered by:</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setBlockFilter("all")}
                  title="Click to clear block filter"
                >
                  {BLOCK_FILTER_LABELS[blockFilter]} ✕
                </Button>
              </div>
            )}

            `;

// Find the container div and insert before it
if (containerDivPattern.test(content)) {
  // Insert block filter UI right before the container div, after the class filter section
  content = content.replace(
    /<\/div>\s*\n\s*<\/div>\s*\n\s*<div\s+ref=\{containerRef\}\s+className="lab-3d-container/,
    (match) => blockFilterUI + match.replace(/<div\s+ref=\{containerRef\}/, '<div ref={containerRef}')
  );
  console.log('8. Added block filter UI');
} else {
  console.log('8. FAILED to find container div pattern');
  // Try alternative: find the container div directly
  const altPattern = /<div\s+ref=\{containerRef\}/;
  if (altPattern.test(content)) {
    content = content.replace(altPattern, blockFilterUI + '\n            <div ref={containerRef}');
    console.log('8. Added block filter UI (alt)');
  } else {
    console.log('8. FAILED both patterns');
  }
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done writing file');
