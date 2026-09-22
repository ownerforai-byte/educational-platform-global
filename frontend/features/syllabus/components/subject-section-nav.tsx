import Link from "next/link";
import { FlaskConical } from "lucide-react";

const SECTIONS = [
  { key: "syllabus", label: "Syllabus", href: (base: string) => `${base}/syllabus` },
  { key: "chapters", label: "Chapters", href: (base: string) => `${base}/chapters` },
  { key: "theory", label: "Theory & PYQs", href: (base: string) => `${base}/theory` },
  { key: "mindmap", label: "Mind Maps", href: (base: string) => `${base}/mindmap` },
] as const;

export function SubjectSectionNav({
  basePath,
  active,
}: {
  basePath: string;
  active?: (typeof SECTIONS)[number]["key"] | "hub" | "practical";
}) {
  const parts = basePath.split("/").filter(Boolean);
  const subjectSlug = parts[parts.length - 1] || "";
  const isScience = ["physics", "chemistry", "biology"].includes(subjectSlug);
  const practicalHref = isScience ? `/practical/${subjectSlug}` : "/practical";

  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="Subject sections">
      {SECTIONS.map((section) => {
        const href = section.href(basePath);
        const isActive = active === section.key;
        return (
          <Link
            key={section.key}
            href={href}
            className={
              isActive
                ? "rounded-md border border-primary bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                : "rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent"
            }
          >
            {section.label}
          </Link>
        );
      })}

      {/* Practical Lab Direct Link */}
      <Link
        href={practicalHref}
        className={
          active === "practical"
            ? "inline-flex items-center gap-1.5 rounded-md border border-emerald-500 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
            : "inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 transition-colors"
        }
      >
        <FlaskConical className="h-4 w-4" />
        <span>{isScience ? `${subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1)} Practicals` : "Practical Labs"}</span>
      </Link>
    </nav>
  );
}
