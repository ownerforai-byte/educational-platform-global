import io
p = "frontend/features/docs/figures/registry.ts"
s = io.open(p, encoding="utf-8").read()
tail = '''

};

/**
 * Look up figures for a topic. Exact slug match only — never fuzzy, so a
 * typo'd or renamed slug can never put the wrong diagram on a page.
 */
export function getTopicFigures(topicSlug: string): TopicFiguresEntry | undefined {
  return REGISTRY[topicSlug];
}

/** All registered slugs (for tests and tooling). */
export function registeredFigureSlugs(): string[] {
  return Object.keys(REGISTRY);
}
'''
assert "getTopicFigures" not in s
s = s.rstrip("\n") + tail
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("tail restored")
