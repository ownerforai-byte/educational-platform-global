const fs = require("fs");
const path = require("path");

const base = "C:/Users/ASUS/Desktop/rn/frontend/components/lab";
const dirs = [base, path.join(base, "topic-visuals")];

let filesChanged = 0;
const skippedResize = [];
const heightReport = {};

for (const dir of dirs) {
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".tsx")) continue;
    const p = path.join(dir, f);
    let t = fs.readFileSync(p, "utf8");
    const orig = t;

    // 1. Responsive canvas height — fit according to screen (60vh, clamped)
    t = t.replace(/h-\[(\d{2,4})px\]/g, (m, n) => {
      const num = parseInt(n, 10);
      heightReport[num] = (heightReport[num] || 0) + 1;
      if (num >= 250 && num <= 800) return "h-[clamp(320px,60vh,640px)]";
      return m;
    });

    // 2. ResizeObserver so the canvas re-fits when the container resizes
    if (
      !t.includes("ResizeObserver") &&
      t.includes('window.addEventListener("resize", handleResize);') &&
      t.includes('window.removeEventListener("resize", handleResize);')
    ) {
      const m = t.match(/const (container\w*) = containerRef\.current;/);
      const cname = m ? m[1] : null;
      if (cname) {
        t = t.replace(
          'window.addEventListener("resize", handleResize);',
          'window.addEventListener("resize", handleResize);\n' +
            '      // Re-fit the canvas whenever the container itself resizes (screen fit)\n' +
            '      const resizeObserver = new ResizeObserver(() => handleResize());\n' +
            `      resizeObserver.observe(${cname});`
        );
        t = t.replace(
          'window.removeEventListener("resize", handleResize);',
          'window.removeEventListener("resize", handleResize);\n' +
            '        resizeObserver?.disconnect();'
        );
      } else {
        skippedResize.push(f);
      }
    }

    if (t !== orig) {
      fs.writeFileSync(p, t);
      filesChanged++;
    }
  }
}

console.log("Files changed:", filesChanged);
console.log("Heights seen:", JSON.stringify(heightReport));
console.log("Skipped resize (no container var):", skippedResize);
