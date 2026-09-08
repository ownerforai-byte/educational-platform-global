const fs = require('fs');
const f = 'frontend/components/lab/chemistry-lab.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Find line with "ref={containerRef}" - insert block filter UI right before it
let insertLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('ref={containerRef}')) {
    insertLine = i;
    break;
  }
}

if (insertLine > 0) {
  const blockUI = `            {!activeClass && (
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
  lines.splice(insertLine, 0, blockUI);
  console.log('Inserted block filter UI at line', insertLine + 1);
} else {
  console.log('FAILED to find containerRef line');
}

fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Done');
