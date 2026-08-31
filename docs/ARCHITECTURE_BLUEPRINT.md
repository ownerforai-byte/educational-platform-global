# 🧭 Architecture Blueprint — ravikishan (educational-platform-global)

> **Auto-generated** — do not edit by hand. Regenerate with `npm run blueprint` (runs automatically on every commit via the pre-commit hook).
> Generated: 2026-08-31

<!-- BLUEPRINT:START -->
```text
ravikishan/
├── frontend/                        # Next.js (App Router)  -> the running app
│   ├── app/                         # routes (URL-transparent route groups)
│   │   ├── (marketing)/             # public landing pages (no AppShell)
│   │   ├── (app)/                   # authenticated app shell (<AppShell>)
│   │   ├── admin/                   # separate auth gate (OWNER/ADMIN)
│   │   ├── login/  signup/          # public auth pages
│   │   └── layout.tsx               # root: html/body + providers only
│   ├── components/                  # ui/ design-system (pure) + feature components
│   ├── features/                    # feature modules (auth, knowledge, mindmap, syllabus)
│   ├── lib/                         # api/, auth/, content/, schemas/, types/
│   ├── providers/  hooks/  public/  tests/  types/
├── backend/                         # Express API (Supabase)
│   └── src/                         # api/ auth/ db/ ai/ middleware/
├── content/                         # shared curriculum content (data, not code)
├── content-tools/                   # migration/validation scripts for content/
├── scripts/                         # build/deploy + blueprint tooling
├── docs/                            # ARCHITECTURE.md, DECISIONS.md, API_CONTRACT.md ...
├── .github/workflows/ci.yml         # lint + typecheck + test + build
├── AGENT_RULES.md  PROJECT_STATUS.md
└── package.json                     # npm workspaces root
```

## 📁 Live structure (scanned from disk)

```text
ravikishan/
├── frontend/
│   ├── app/
│   │   ├── (app)/   # authenticated app shell (wraps pages in <AppShell>)
│   │   │   ├── bookmarks/
│   │   │   │   └── …
│   │   │   ├── chat/
│   │   │   │   └── …
│   │   │   ├── class-11/
│   │   │   │   └── …
│   │   │   ├── class-11-more/
│   │   │   │   └── …
│   │   │   ├── class-11-notes/
│   │   │   │   └── …
│   │   │   ├── class-11e/
│   │   │   │   └── …
│   │   │   ├── class-12/
│   │   │   │   └── …
│   │   │   ├── class-12-more/
│   │   │   │   └── …
│   │   │   ├── class-12-notes/
│   │   │   │   └── …
│   │   │   ├── class-12e/
│   │   │   │   └── …
│   │   │   ├── controller/
│   │   │   │   └── …
│   │   │   ├── credits/
│   │   │   │   └── …
│   │   │   ├── knowledge/   # grammar (EN), byakaran (NE), numerical-*, biology-diagrams
│   │   │   │   └── …
│   │   │   ├── lab/
│   │   │   │   └── …
│   │   │   ├── levels/
│   │   │   │   └── …
│   │   │   ├── loksewa/
│   │   │   │   └── …
│   │   │   ├── notes/   # the ONE note viewer (r-notes + ravikishan-notes consolidated)
│   │   │   │   └── …
│   │   │   ├── progress/
│   │   │   │   └── …
│   │   │   ├── r-notes/
│   │   │   │   └── …
│   │   │   ├── ravikishan-notes/
│   │   │   │   └── …
│   │   │   ├── resources/
│   │   │   │   └── …
│   │   │   ├── subjects/
│   │   │   │   └── …
│   │   │   ├── syllabus/
│   │   │   │   └── …
│   │   │   ├── world-knowledge/
│   │   │   │   └── …
│   │   │   └── layout.tsx
│   │   ├── (marketing)/   # public landing routes (no AppShell)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── admin/   # separate auth gate (OWNER/ADMIN)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── chat/
│   │   │   └── study-chat.tsx
│   │   ├── content/
│   │   │   ├── content-tabs.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── flashcard-viewer.tsx
│   │   │   ├── imported-notes-section.tsx
│   │   │   ├── katex.tsx
│   │   │   ├── math-markdown.tsx
│   │   │   ├── MathRenderer.tsx
│   │   │   ├── notes-viewer.tsx
│   │   │   ├── numerical-viewer.tsx
│   │   │   ├── pyq-card.tsx
│   │   │   ├── quiz-viewer.tsx
│   │   │   ├── rendered-imported-note.tsx
│   │   │   ├── resource-form.tsx
│   │   │   ├── resource-link-form.tsx
│   │   │   ├── status-badge.tsx
│   │   │   ├── syllabus-section.tsx
│   │   │   ├── under-development.tsx
│   │   │   └── video-viewer.tsx
│   │   ├── lab/
│   │   │   ├── chapters/
│   │   │   │   └── …
│   │   │   ├── class11/
│   │   │   │   └── …
│   │   │   ├── motion-graphics/
│   │   │   │   └── …
│   │   │   ├── topics/
│   │   │   │   └── …
│   │   │   ├── Analytics.tsx
│   │   │   ├── AnnotatedModelViewer.tsx
│   │   │   ├── AREAS.md
│   │   │   ├── ARViewer.tsx
│   │   │   ├── biology-3d-diversity-suite.tsx
│   │   │   ├── biology-3d-suite.tsx
│   │   │   ├── biology-3d.tsx
│   │   │   ├── biology-biomolecules-3d.tsx
│   │   │   ├── biology-biota-conservation-3d.tsx
│   │   │   ├── biology-cell-3d.tsx
│   │   │   ├── biology-cell-division-3d.tsx
│   │   │   ├── biology-ecology-3d.tsx
│   │   │   ├── biology-evolution-3d.tsx
│   │   │   ├── biology-faunal-diversity-3d.tsx
│   │   │   ├── biology-floral-diversity-3d.tsx
│   │   │   ├── biology-lab.tsx
│   │   │   ├── biology-microbiology-3d.tsx
│   │   │   ├── chemistry-3d-molecules.tsx
│   │   │   ├── chemistry-3d-syllabus-suite.tsx
│   │   │   ├── chemistry-3d.tsx
│   │   │   ├── chemistry-advanced-3d.tsx
│   │   │   ├── chemistry-interactive.tsx
│   │   │   ├── chemistry-lab.tsx
│   │   │   ├── chemistry-modern-3d.tsx
│   │   │   ├── chemistry-stoichiometry.tsx
│   │   │   ├── collapsible-controls.tsx
│   │   │   ├── control-group.tsx
│   │   │   ├── DiscussionThread.tsx
│   │   │   ├── FormulaCheatSheet.tsx
│   │   │   ├── index.ts
│   │   │   ├── interactive-3d-template.tsx
│   │   │   ├── lab-card.tsx
│   │   │   ├── lab-control-group.tsx
│   │   │   ├── lab-dashboard.tsx
│   │   │   ├── lab-input.tsx
│   │   │   ├── lab-result.tsx
│   │   │   ├── lab-section-card.tsx
│   │   │   ├── lab-workspace.tsx
│   │   │   ├── label3d.tsx
│   │   │   ├── leader-lines.tsx
│   │   │   ├── math-3d-geometry-labelledby.tsx
│   │   │   ├── math-3d-syllabus-suite.tsx
│   │   │   ├── math-3d-symbols.tsx
│   │   │   ├── math-advanced-3d.tsx
│   │   │   ├── math-geometry-3d.tsx
│   │   │   ├── math-interactive.tsx
│   │   │   ├── math-modern-3d.tsx
│   │   │   ├── math-motion-3d.tsx
│   │   │   ├── math-series-lab.tsx
│   │   │   ├── MindMap.tsx
│   │   │   ├── physics-3d-atomic-symbols.tsx
│   │   │   ├── physics-3d-elasticity-gas.tsx
│   │   │   ├── physics-3d-electricity-i.tsx
│   │   │   ├── physics-3d-electricity-symbols.tsx
│   │   │   ├── physics-3d-electrostatics.tsx
│   │   │   ├── physics-3d-gravitation.tsx
│   │   │   ├── physics-3d-heat-determinations.tsx
│   │   │   ├── physics-3d-lees-disc.tsx
│   │   │   ├── physics-3d-lenses.tsx
│   │   │   ├── physics-3d-linear-expansion.tsx
│   │   │   ├── physics-3d-magnetism-emi.tsx
│   │   │   ├── physics-3d-measurement.tsx
│   │   │   ├── physics-3d-mechanics-i.tsx
│   │   │   ├── physics-3d-mechanics-symbols.tsx
│   │   │   ├── physics-3d-mirrors-concave.tsx
│   │   │   ├── physics-3d-mirrors-convex.tsx
│   │   │   ├── physics-3d-mirrors.tsx
│   │   │   ├── physics-3d-modern.tsx
│   │   │   ├── physics-3d-newtons-cooling.tsx
│   │   │   ├── physics-3d-prism.tsx
│   │   │   ├── physics-3d-searles-bar.tsx
│   │   │   ├── physics-3d-thermodynamics.tsx
│   │   │   ├── physics-3d-vectors-comprehensive.tsx
│   │   │   ├── physics-3d-vectors.tsx
│   │   │   ├── physics-3d-wave-optics.tsx
│   │   │   ├── physics-3d-waves-symbols.tsx
│   │   │   ├── physics-3d.tsx
│   │   │   ├── physics-advanced-3d.tsx
│   │   │   ├── physics-advanced-motion.tsx
│   │   │   ├── physics-dynamics-3d.tsx
│   │   │   ├── physics-lab.tsx
│   │   │   ├── physics-motion-3d.tsx
│   │   │   ├── physics-vectors-optics-3d.tsx
│   │   │   ├── PracticeProblems.tsx
│   │   │   ├── premium-advanced-circuit.tsx
│   │   │   ├── premium-equation-solver.tsx
│   │   │   ├── premium-placeholder.tsx
│   │   │   ├── ProgressTracker.tsx
│   │   │   ├── quantum-3d.tsx
│   │   │   ├── science-lab-section.tsx
│   │   │   ├── SharedAnnotationBoard.tsx
│   │   │   ├── sim-card.tsx
│   │   │   ├── theory-panel.tsx
│   │   │   ├── three-scene.ts
│   │   │   ├── use-canvas-size.ts
│   │   │   └── webgl-fallback.tsx
│   │   ├── layout/
│   │   │   ├── ai-widget.tsx
│   │   │   ├── app-shell.tsx
│   │   │   ├── breadcrumbs.tsx
│   │   │   ├── class-subjects-grid.tsx
│   │   │   ├── credit-badge.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── global-search.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── sidebar-navigation.tsx
│   │   │   └── subject-search.tsx
│   │   ├── navigation/
│   │   │   └── back-button.tsx
│   │   ├── theme/
│   │   │   ├── theme-provider.tsx
│   │   │   └── theme-toggle.tsx
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── icon-badge.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── status-badge.tsx
│   │       ├── switch.tsx
│   │       ├── tabs.tsx
│   │       └── textarea.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── …
│   │   │   ├── hooks/
│   │   │   │   └── …
│   │   │   ├── actions.ts
│   │   │   ├── schema.ts
│   │   │   └── types.ts
│   │   ├── knowledge/   # grammar (EN), byakaran (NE), numerical-*, biology-diagrams
│   │   │   ├── components/
│   │   │   │   └── …
│   │   │   └── data.ts
│   │   ├── mindmap/
│   │   │   ├── components/
│   │   │   │   └── …
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   └── syllabus/
│   │       ├── components/
│   │       │   └── …
│   │       ├── content-router.ts
│   │       ├── hooks.ts
│   │       ├── queries.ts
│   │       ├── schema.ts
│   │       └── types.ts
│   ├── lib/
│   │   ├── ai/
│   │   │   └── prompts.ts
│   │   ├── api/
│   │   │   ├── ai.ts
│   │   │   ├── auth.ts
│   │   │   ├── bookmarks.ts
│   │   │   ├── content.ts
│   │   │   ├── credits.ts
│   │   │   ├── exams.ts
│   │   │   ├── levels.ts
│   │   │   ├── progress.ts
│   │   │   ├── resources.ts
│   │   │   └── subjects.ts
│   │   ├── auth/
│   │   │   └── roles.ts
│   │   ├── content/
│   │   │   ├── katex.ts
│   │   │   ├── note-status.ts
│   │   │   ├── pipeline.ts
│   │   │   └── renderers.tsx
│   │   ├── schemas/
│   │   │   └── exam.ts
│   │   ├── types/
│   │   │   └── lab.ts
│   │   ├── api-client.ts
│   │   ├── api.ts
│   │   ├── curriculum.ts
│   │   ├── data-loader.ts
│   │   ├── hast-util-from-html-isomorphic.js
│   │   ├── imported-notes.ts
│   │   ├── lab-registry.tsx
│   │   ├── lab-types.ts
│   │   ├── math-expression.ts
│   │   ├── misconception-questions-chemistry.ts
│   │   ├── misconception-questions.ts
│   │   ├── pyq-bank.ts
│   │   ├── queries.ts
│   │   ├── syllabus-history.ts
│   │   ├── syllabus.ts
│   │   ├── utils.ts
│   │   └── webgl.ts
│   ├── providers/
│   │   └── query-provider.tsx
│   ├── public/
│   │   └── data/
│   │       ├── exams/
│   │       │   └── …
│   │       ├── r-export/
│   │       │   └── …
│   │       └── ravikishan/
│   │           └── …
│   ├── tests/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       └── …
│   │   ├── lib/
│   │   │   ├── auth/
│   │   │   │   └── …
│   │   │   └── content/
│   │   │       └── …
│   │   └── setup.ts
│   ├── types/
│   │   ├── api.ts
│   │   └── katex-contrib.d.ts
│   ├── .env.example
│   ├── .env.local
│   ├── .eslintrc.json
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── components.json
│   ├── MIGRATION_FILE_MAP.md
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── PROMPT_FOR_COMPETITOR.md
│   ├── proxy.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vercel.json
│   └── vitest.config.ts
├── backend/
│   ├── scripts/
│   │   ├── fix-db.cjs
│   │   ├── fix-esm-imports.mjs
│   │   └── fix-owners.ts
│   ├── src/
│   │   ├── ai/
│   │   │   └── service.ts
│   │   ├── api/
│   │   │   ├── admin.ts
│   │   │   ├── ai-guest.ts
│   │   │   ├── ai.ts
│   │   │   ├── auth.ts
│   │   │   ├── biology.ts
│   │   │   ├── bookmarks.ts
│   │   │   ├── chapters.ts
│   │   │   ├── classes.ts
│   │   │   ├── controller.ts
│   │   │   ├── exams.ts
│   │   │   ├── levels.ts
│   │   │   ├── progress.ts
│   │   │   ├── pyqs.ts
│   │   │   ├── r-notes.ts
│   │   │   ├── ravikishan-notes.ts
│   │   │   ├── resources.ts
│   │   │   ├── search.ts
│   │   │   ├── storage.ts
│   │   │   ├── subjects.ts
│   │   │   ├── tests.ts
│   │   │   ├── topics.ts
│   │   │   └── user.ts
│   │   ├── auth/
│   │   │   └── supabase.ts
│   │   ├── db/
│   │   │   └── supabase.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── cors.ts
│   │   │   ├── creditCheck.ts
│   │   │   └── rateLimit.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tests/
│   │   ├── auth-flow.test.ts
│   │   └── hardening.test.ts
│   ├── .env
│   ├── .env.example
│   ├── boot-pid.txt
│   ├── ecosystem.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── content/
│   ├── exams/
│   │   ├── exam-01.json
│   │   ├── exam-02.json
│   │   └── exam-03.json
│   ├── lessons/
│   │   ├── algebra.md
│   │   ├── atomic-structure.md
│   │   ├── biomolecules-and-cell-biology.md
│   │   ├── calculus.md
│   │   ├── floral-diversity.md
│   │   ├── gravitation.md
│   │   ├── optics.md
│   │   ├── quantity-of-heat.md
│   │   ├── stoichiometry.md
│   │   ├── trigonometry.md
│   │   └── vectors.md
│   ├── r-export/
│   │   ├── content-export.json
│   │   └── manifest.json
│   └── ravikishan/
│       ├── class-11/
│       │   ├── biology/
│       │   │   └── …
│       │   ├── chemistry/
│       │   │   └── …
│       │   ├── english/
│       │   │   └── …
│       │   ├── mathematics/
│       │   │   └── …
│       │   ├── nepali/
│       │   │   └── …
│       │   └── physics/
│       │       └── …
│       ├── class-11-notes/
│       │   ├── biology/
│       │   │   └── …
│       │   ├── chemistry/
│       │   │   └── …
│       │   ├── english/
│       │   │   └── …
│       │   ├── mathematics/
│       │   │   └── …
│       │   ├── nepali/
│       │   │   └── …
│       │   └── physics/
│       │       └── …
│       ├── class-11e/
│       │   ├── biology/
│       │   │   └── …
│       │   ├── mathematics/
│       │   │   └── …
│       │   └── physics/
│       │       └── …
│       ├── _index.json
│       └── manifest.json
├── content-tools/
│   ├── migrate-biology.ts
│   └── validate-biology-content.ts
├── scripts/
│   ├── hooks/
│   │   └── pre-commit
│   ├── manim/
│   │   ├── manim_3d_complete_optimized.py
│   │   ├── manim_3d_complete.py
│   │   ├── manim_3d_math_animations_extended.py
│   │   ├── manim_3d_math_animations_test.py
│   │   ├── manim_3d_math_animations.py
│   │   ├── manim_motion_graphics.py
│   │   └── run_manim.py
│   ├── add-meanings.py
│   ├── build-content.mjs
│   ├── build-import-mapping.ts
│   ├── build-pages.sh
│   ├── build.mjs
│   ├── check_teacher.sql
│   ├── check-live.ps1
│   ├── create-chem-pages.js
│   ├── create-owners.mjs
│   ├── debug_teacher.sql
│   ├── fix-apostrophes.py
│   ├── gen-chem.js
│   ├── gen-hub.js
│   ├── gen-pages.js
│   ├── generate-blueprint.mjs
│   ├── generate-lab-pages.js
│   ├── generate-lab-pages.ts
│   ├── generate-theory-routes.mjs
│   ├── git-commit-push.sh
│   ├── git-push.sh
│   ├── import-r-notes.ts
│   ├── import-ravikishan-notes.py
│   ├── import-ravikishan-to-supabase.ts
│   ├── import-source-content.mjs
│   ├── inspect-manifests.ts
│   ├── inspect-syllabus.py
│   ├── install-hooks.mjs
│   ├── list-ravikishan-links.ts
│   ├── local_setup.sql
│   ├── local_tests.sql
│   ├── measure-sizes.js
│   ├── organize-content.ts
│   ├── override_auth_uid.sql
│   ├── remove-edge.mjs
│   ├── run_local_verify.ps1
│   ├── run.ps1
│   ├── start-servers.bat
│   ├── start.bat
│   ├── test_jwt.sql
│   ├── update-class-11-more-pages.py
│   ├── update-class-11e-pages.py
│   ├── update-syllabus-r-links.py
│   └── validate-content.ts
├── docs/
│   ├── API_CONTRACT.md
│   ├── ARCHITECTURE_BLUEPRINT.md
│   ├── ARCHITECTURE.md
│   ├── BIOLOGY_LAB_API.md
│   ├── CHANGELOG.md
│   ├── CLOUDFLARE_RENDER_SETUP.md
│   ├── DECISIONS.md
│   ├── DEPLOY_NOW.md
│   ├── DEPLOYMENT.md
│   ├── FINAL_COVERAGE_SUMMARY.md
│   ├── LAB_3D_INTERACTIVITY_GUIDE.md
│   ├── LAB_IMPROVEMENT_LOG.md
│   ├── LaTeX_SETUP.md
│   ├── MIGRATION_AUDIT.md
│   ├── MIGRATION_COMPLETE.md
│   ├── QUICK_START.md
│   ├── README_MANIM.md
│   ├── RESOURCE_CLASSIFICATION.md
│   ├── Syllabus_Animation_Map.md
│   └── TODO.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── .cursor/
├── .vscode/
│   └── settings.json
├── agent-pipeline/
│   ├── bin/
│   │   ├── agnes
│   │   ├── claude
│   │   ├── entry.sh
│   │   └── kilo
│   ├── lib/
│   │   ├── agents.sh
│   │   └── lock.sh
│   ├── logs/
│   │   ├── .gitkeep
│   │   ├── 20260831_212245_implementer_kilocode.log
│   │   ├── 20260831_212400_implementer_kilocode.log
│   │   ├── 20260831_212400_planner_claude.log
│   │   ├── 20260831_213602_generator_mistral.log
│   │   ├── 20260831_213945_generator_mistral.log
│   │   ├── 20260831_214406_generator_mistral.log
│   │   ├── 20260831_215522_planner_claude.log
│   │   ├── 20260831_215522_verifier_agnes.log
│   │   ├── 20260831_215729_generator_mistral.log
│   │   ├── 20260831_224535_verifier_agnes.log
│   │   ├── 20260831_224941_planner_claude.log
│   │   ├── 20260831_224941_verifier_agnes.log
│   │   ├── 20260831_225023_planner_claude.log
│   │   ├── 20260831_225023_verifier_agnes.log
│   │   └── router.log
│   ├── rules/
│   │   ├── generator.md
│   │   ├── implementer.md
│   │   ├── overseer.md
│   │   ├── planner.md
│   │   └── verifier.md
│   ├── README.md
│   ├── router.sh
│   └── TASKS.md
├── db/
│   ├── schema.ts
│   └── seed.ts
├── media/
│   ├── images/
│   │   └── manim_3d_math_animations/
│   ├── Tex/
│   │   └── efbc164f55b4df91.tex
│   └── videos/
│       └── manim_3d_math_animations/
│           └── 480p15/
│               └── …
├── public/
│   └── data/
│       ├── exams/
│       │   ├── exam-01.json
│       │   ├── exam-02.json
│       │   └── exam-03.json
│       ├── r-export/
│       │   └── manifest.json
│       └── ravikishan/
│           ├── _index.json
│           └── manifest.json
├── supabase/
│   ├── migrations/
│   │   ├── 0001_init_schema.sql
│   │   ├── 0002_rls.sql
│   │   ├── 0003_seed_dev.sql
│   │   ├── 0004_credits_system.sql
│   │   ├── 0004_seed_content.sql
│   │   └── setup_all.sql
│   ├── .gitignore
│   └── config.toml
├── AGENT_RULES.md
├── backend.log
├── components.json
├── drizzle.config.ts
├── eslint.config.mjs
├── opencode.json
├── package.json
├── postcss.config.mjs
├── PROJECT_STATUS.md
├── README.md
├── tailwind.config.ts
└── vitest.config.ts
```

## 🔁 Keeping this up to date

- Run manually after any change:  `npm run blueprint`
- A **pre-commit git hook** regenerates it automatically before every commit;
  if the tree changed, the new version is included in that commit.
- The tree above is generated by scanning the real filesystem — it cannot drift.

<!-- BLUEPRINT:END -->
