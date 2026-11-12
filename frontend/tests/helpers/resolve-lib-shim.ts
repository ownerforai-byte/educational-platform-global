import fs from "node:fs";
import path from "node:path";

/** Follow Phase 5/6 one-line re-exports (alias or relative) into the real file. */
export function resolveLibSource(frontendRoot: string, libRelativePath: string): string {
  const shimPath = path.join(frontendRoot, libRelativePath);
  if (!fs.existsSync(shimPath)) return shimPath;
  const shim = fs.readFileSync(shimPath, "utf8");
  const reExport = shim.match(/export \* from ["'](@\/[^"']+|\.\/[^"']+)["']/);
  if (!reExport) return shimPath;
  const specifier = reExport[1];
  const base = specifier.startsWith("@/")
    ? path.join(frontendRoot, specifier.slice(2))
    : path.resolve(path.dirname(shimPath), specifier);
  for (const ext of [".tsx", ".ts"]) {
    if (fs.existsSync(`${base}${ext}`)) return `${base}${ext}`;
  }
  return shimPath;
}

export function readLibSource(frontendRoot: string, libRelativePath: string): string {
  return fs.readFileSync(resolveLibSource(frontendRoot, libRelativePath), "utf8");
}

/** Manifest paths may still use `@/components/lab/…` while sources live under `features/lab`. */
export function modulePathExists(frontendRoot: string, modulePath: string): boolean {
  const relative = modulePath.replace(/^@\//, "");
  const candidates = [
    relative,
    relative.replace(/^components\/lab\//, "features/lab/components/"),
  ];
  return candidates.some((rel) =>
    [".tsx", ".ts"].some((ext) => fs.existsSync(path.join(frontendRoot, `${rel}${ext}`))),
  );
}
