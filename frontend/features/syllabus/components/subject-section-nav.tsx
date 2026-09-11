import Link from "next/link";

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
  active?: (typeof SECTIONS)[number]["key"] | "hub";
}) {
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
    </nav>
  );
}
