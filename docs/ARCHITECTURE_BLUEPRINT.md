# 🧭 Architecture Blueprint — ravikishan (educational-platform-global)

> **Auto-generated** — do not edit by hand. Regenerate with `npm run blueprint` (runs automatically on every commit via the pre-commit hook).
> Generated: 2026-09-07

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
├── .github/
│   └── workflows/   # CI/CD pipelines
│       └── ci.yml
├── backend/   # Express API (Supabase)
│   ├── scripts/
│   │   ├── diagnose-ai.cjs
│   │   ├── diagnose-ai.js
│   │   ├── ensure-deps.mjs
│   │   ├── fix-db.cjs
│   │   ├── fix-esm-imports.mjs
│   │   └── fix-owners.ts
│   ├── src/   # api/ auth/ db/ ai/ middleware/
│   │   ├── ai/
│   │   │   └── service.ts
│   │   ├── api/
│   │   │   ├── admin.ts
│   │   │   ├── ai-generate.ts
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
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── cell-architecture-studio/
│   ├── docs/
│   │   ├── media/
│   │   │   ├── cell-architecture-studio-demo.gif
│   │   │   └── cell-architecture-studio-demo.mp4
│   │   └── ASSETS.md
│   ├── public/
│   │   ├── cell-renders/
│   │   │   ├── animal.png
│   │   │   ├── bacteria.png
│   │   │   ├── epithelial.png
│   │   │   ├── muscle.png
│   │   │   ├── neuron.png
│   │   │   ├── plant.png
│   │   │   └── white-blood.png
│   │   ├── cell-renders-transparent/
│   │   │   ├── animal.png
│   │   │   ├── bacteria.png
│   │   │   ├── epithelial.png
│   │   │   ├── muscle.png
│   │   │   ├── neuron.png
│   │   │   ├── plant.png
│   │   │   └── white-blood.png
│   │   ├── models/
│   │   │   ├── animal-cell-nih.glb
│   │   │   ├── bacteria-wall-nih.glb
│   │   │   ├── neuron-nih.glb
│   │   │   ├── plant-cell-first001.glb
│   │   │   └── white-blood-cell-user.glb
│   │   ├── nih-previews/
│   │   │   ├── animal-cell-nih.png
│   │   │   ├── bacteria-wall-nih.png
│   │   │   └── neuron-nih.png
│   │   ├── texture-references/
│   │   │   └── gpt-image-2-biology-more-teaching-2026-05-31/
│   │   │       ├── jpg/
│   │   │       │   └── …
│   │   │       ├── png/
│   │   │       │   └── …
│   │   │       ├── annotation-hotspots.json
│   │   │       ├── index-en.html
│   │   │       └── index.html
│   │   └── favicon.svg
│   ├── scripts/
│   │   ├── verify-preflight.mjs
│   │   ├── verify-preflight.test.mjs
│   │   └── verify.mjs
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutModal.tsx
│   │   │   ├── AchievementsPanel.tsx
│   │   │   ├── BottomPanels.tsx
│   │   │   ├── CelebrationBanner.tsx
│   │   │   ├── CellScene.tsx
│   │   │   ├── ComparisonModal.tsx
│   │   │   ├── Confetti.tsx
│   │   │   ├── DailyChallenge.tsx
│   │   │   ├── FlashcardsModal.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MiniCell.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── NotebooksModal.tsx
│   │   │   ├── RightPanel.tsx
│   │   │   ├── ShortcutsHelp.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SpecimenGridModal.tsx
│   │   │   ├── SpecimenQuiz.tsx
│   │   │   ├── SpecimenStrip.tsx
│   │   │   ├── Stage.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── UserMenu.tsx
│   │   │   ├── WelcomeTour.tsx
│   │   │   └── XpBar.tsx
│   │   ├── data/
│   │   │   └── cells.ts
│   │   ├── hooks/
│   │   │   ├── useEscapeToClose.ts
│   │   │   ├── useKeyboardShortcuts.ts
│   │   │   ├── useOverlays.ts
│   │   │   └── useProgression.ts
│   │   ├── lib/
│   │   │   ├── cellMaterials.ts
│   │   │   ├── daily.test.ts
│   │   │   ├── daily.ts
│   │   │   ├── download.ts
│   │   │   ├── progression.test.ts
│   │   │   ├── progression.ts
│   │   │   ├── quizSound.ts
│   │   │   ├── storage.test.ts
│   │   │   ├── storage.ts
│   │   │   ├── storageKeys.ts
│   │   │   └── theme.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── .gitignore
│   ├── index.html
│   ├── LICENSE
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── vitest.config.ts
├── content/   # shared curriculum content (data, not code)
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
│   └── ravikishan/   # imported curriculum JSON (concepts, mindmaps, exams)
│       ├── class-11/
│       │   ├── biology/
│       │   │   ├── pyqs/
│       │   │   │   └── …
│       │   │   └── theory/
│       │   │       └── …
│       │   ├── chemistry/
│       │   │   ├── pyqs/
│       │   │   │   └── …
│       │   │   ├── theory/
│       │   │   │   └── …
│       │   │   ├── unit-2-stoichiometry/
│       │   │   │   └── …
│       │   │   └── unit-3-atomic-structure/
│       │   │       └── …
│       │   ├── english/
│       │   │   ├── pyqs/
│       │   │   │   └── …
│       │   │   ├── theory/
│       │   │   │   └── …
│       │   │   └── writing-and-composition/
│       │   │       └── …
│       │   ├── mathematics/
│       │   │   ├── analytic-geometry/
│       │   │   │   └── …
│       │   │   ├── calculus/
│       │   │   │   └── …
│       │   │   ├── pyqs/
│       │   │   │   └── …
│       │   │   └── theory/
│       │   │       └── …
│       │   ├── nepali/
│       │   │   ├── pyqs/
│       │   │   │   └── …
│       │   │   └── theory/
│       │   │       └── …
│       │   └── physics/
│       │       ├── pyqs/
│       │       │   └── …
│       │       ├── theory/
│       │       │   └── …
│       │       ├── thermodynamics/
│       │       │   └── …
│       │       ├── unit-1-physical-quantities/
│       │       │   └── …
│       │       ├── unit-11-quantity-of-heat/
│       │       │   └── …
│       │       ├── unit-2-vectors/
│       │       │   └── …
│       │       ├── unit-3-kinematics/
│       │       │   └── …
│       │       └── unit-4-dynamics/
│       │           └── …
│       ├── class-11-notes/
│       │   ├── biology/
│       │   │   ├── biomolecules-and-cell-biology/
│       │   │   │   └── …
│       │   │   ├── biota-and-environment/
│       │   │   │   └── …
│       │   │   ├── conservation-biology/
│       │   │   │   └── …
│       │   │   ├── ecology/
│       │   │   │   └── …
│       │   │   ├── evolutionary-biology/
│       │   │   │   └── …
│       │   │   ├── faunal-diversity/
│       │   │   │   └── …
│       │   │   ├── floral-diversity/
│       │   │   │   └── …
│       │   │   ├── introduction-to-biology/
│       │   │   │   └── …
│       │   │   ├── introductory-microbiology/
│       │   │   │   └── …
│       │   │   └── vegetation/
│       │   │       └── …
│       │   ├── chemistry/
│       │   │   ├── applied-chemistry/
│       │   │   │   └── …
│       │   │   ├── aromatic-hydrocarbons/
│       │   │   │   └── …
│       │   │   ├── atomic-structure/
│       │   │   │   └── …
│       │   │   ├── basic-concept-of-organic-chemistry/
│       │   │   │   └── …
│       │   │   ├── basic-concept-organic/
│       │   │   │   └── …
│       │   │   ├── bio-inorganic-chemistry/
│       │   │   │   └── …
│       │   │   ├── chemical-bonding/
│       │   │   │   └── …
│       │   │   ├── chemical-bonding-and-shapes-of-molecules/
│       │   │   │   └── …
│       │   │   ├── chemical-equilibrium/
│       │   │   │   └── …
│       │   │   ├── chemistry-of-metals/
│       │   │   │   └── …
│       │   │   ├── chemistry-of-non-metals/
│       │   │   │   └── …
│       │   │   ├── classification-of-elements/
│       │   │   │   └── …
│       │   │   ├── classification-of-elements-and-periodic-table/
│       │   │   │   └── …
│       │   │   ├── foundation-and-fundamentals/
│       │   │   │   └── …
│       │   │   ├── fundamental-principles-of-organic-chemistry/
│       │   │   │   └── …
│       │   │   ├── fundamental-principles-organic/
│       │   │   │   └── …
│       │   │   ├── fundamentals-of-applied-chemistry/
│       │   │   │   └── …
│       │   │   ├── hydrocarbons/
│       │   │   │   └── …
│       │   │   ├── modern-chemical-manufactures/
│       │   │   │   └── …
│       │   │   ├── modern-manufactures/
│       │   │   │   └── …
│       │   │   ├── oxidation-and-reduction/
│       │   │   │   └── …
│       │   │   ├── oxidation-reduction/
│       │   │   │   └── …
│       │   │   ├── states-of-matter/
│       │   │   │   └── …
│       │   │   └── stoichiometry/
│       │   │       └── …
│       │   ├── english/
│       │   │   ├── grammar/
│       │   │   │   └── …
│       │   │   ├── literature/
│       │   │   │   └── …
│       │   │   ├── reading-and-comprehension/
│       │   │   │   └── …
│       │   │   ├── vocabulary/
│       │   │   │   └── …
│       │   │   └── writing/
│       │   │       └── …
│       │   ├── mathematics/
│       │   │   ├── algebra/
│       │   │   │   └── …
│       │   │   ├── analytic-geometry/
│       │   │   │   └── …
│       │   │   ├── calculus/
│       │   │   │   └── …
│       │   │   ├── computational-methods-or-mechanics/
│       │   │   │   └── …
│       │   │   ├── limits-and-continuity/
│       │   │   │   └── …
│       │   │   ├── statistics-and-probability/
│       │   │   │   └── …
│       │   │   ├── trigonometry/
│       │   │   │   └── …
│       │   │   └── vectors/
│       │   │       └── …
│       │   ├── nepali/
│       │   │   ├── bhasha-ra-vyakarana/
│       │   │   │   └── …
│       │   │   └── sahitya-adhyayan/
│       │   │       └── …
│       │   └── physics/
│       │       ├── capacitor/
│       │       │   └── …
│       │       ├── circular-motion/
│       │       │   └── …
│       │       ├── dc-circuits/
│       │       │   └── …
│       │       ├── dispersion/
│       │       │   └── …
│       │       ├── dynamics/
│       │       │   └── …
│       │       ├── elasticity/
│       │       │   └── …
│       │       ├── electric-charges/
│       │       │   └── …
│       │       ├── electric-field/
│       │       │   └── …
│       │       ├── gravitation/
│       │       │   └── …
│       │       ├── heat-and-temperature/
│       │       │   └── …
│       │       ├── ideal-gas/
│       │       │   └── …
│       │       ├── kinematics/
│       │       │   └── …
│       │       ├── lenses/
│       │       │   └── …
│       │       ├── mechanics/
│       │       │   └── …
│       │       ├── nuclear-physics/
│       │       │   └── …
│       │       ├── optics/
│       │       │   └── …
│       │       ├── physical-quantities/
│       │       │   └── …
│       │       ├── potential-potential-difference-and-potential-energy/
│       │       │   └── …
│       │       ├── quantity-of-heat/
│       │       │   └── …
│       │       ├── rate-of-heat-flow/
│       │       │   └── …
│       │       ├── recent-trends-in-physics/
│       │       │   └── …
│       │       ├── reflection-at-curved-mirror/
│       │       │   └── …
│       │       ├── refraction-at-plane-surfaces/
│       │       │   └── …
│       │       ├── refraction-through-prisms/
│       │       │   └── …
│       │       ├── solids/
│       │       │   └── …
│       │       ├── thermal-expansion/
│       │       │   └── …
│       │       ├── vectors/
│       │       │   └── …
│       │       ├── work-energy-and-power/
│       │       │   └── …
│       │       └── work-energy-power/
│       │           └── …
│       ├── class-11e/
│       │   ├── biology/
│       │   │   ├── faunal-diversity/
│       │   │   │   └── …
│       │   │   └── unit-8-faunal-diversity/
│       │   │       └── …
│       │   ├── mathematics/
│       │   │   └── calculus/
│       │   │       └── …
│       │   └── physics/
│       │       ├── kinematics/
│       │       │   └── …
│       │       ├── unit-01-vectors/
│       │       │   └── …
│       │       ├── unit-3-kinematics/
│       │       │   └── …
│       │       └── vectors/
│       │           └── …
│       ├── class-12/
│       │   └── english/
│       │       └── writing-skills/
│       │           └── …
│       ├── class-12-notes/
│       │   ├── biology/
│       │   │   ├── biodiversity-conservation-12/
│       │   │   │   └── …
│       │   │   ├── biotech-applications/
│       │   │   │   └── …
│       │   │   ├── biotech-principles/
│       │   │   │   └── …
│       │   │   ├── environmental-issues-12/
│       │   │   │   └── …
│       │   │   ├── food-production/
│       │   │   │   └── …
│       │   │   ├── heredity-evolution/
│       │   │   │   └── …
│       │   │   ├── human-health-diseases/
│       │   │   │   └── …
│       │   │   ├── microbes-welfare/
│       │   │   │   └── …
│       │   │   └── organisms-environment-12/
│       │   │       └── …
│       │   ├── chemistry/
│       │   │   ├── alcohols-phenols-ethers-12/
│       │   │   │   └── …
│       │   │   ├── aldehydes-ketones-acids-12/
│       │   │   │   └── …
│       │   │   ├── amines-12/
│       │   │   │   └── …
│       │   │   ├── biomolecules-12/
│       │   │   │   └── …
│       │   │   ├── chemical-kinetics/
│       │   │   │   └── …
│       │   │   ├── chemistry-element-12/
│       │   │   │   └── …
│       │   │   ├── chemistry-everyday-life-12/
│       │   │   │   └── …
│       │   │   ├── electrochemistry/
│       │   │   │   └── …
│       │   │   ├── hydrocarbons-12/
│       │   │   │   └── …
│       │   │   ├── organic-fundamentals-12/
│       │   │   │   └── …
│       │   │   └── solutions/
│       │   │       └── …
│       │   ├── mathematics/
│       │   │   ├── differential-equations/
│       │   │   │   └── …
│       │   │   ├── differentiation/
│       │   │   │   └── …
│       │   │   ├── integration/
│       │   │   │   └── …
│       │   │   ├── limits-and-continuity/
│       │   │   │   └── …
│       │   │   ├── linear-programming/
│       │   │   │   └── …
│       │   │   ├── probability-12/
│       │   │   │   └── …
│       │   │   ├── three-dimensional-geometry/
│       │   │   │   └── …
│       │   │   └── vector-algebra/
│       │   │       └── …
│       │   └── physics/
│       │       ├── alternating-current/
│       │       │   └── …
│       │       ├── communication-systems/
│       │       │   └── …
│       │       ├── current-electricity/
│       │       │   └── …
│       │       ├── electrostatics/
│       │       │   └── …
│       │       ├── emi/
│       │       │   └── …
│       │       ├── magnetism/
│       │       │   └── …
│       │       ├── modern-physics-12/
│       │       │   └── …
│       │       ├── ray-optics-12/
│       │       │   └── …
│       │       └── wave-optics-12/
│       │           └── …
│       ├── _index.json
│       └── manifest.json
├── content-tools/   # migration/validation scripts for content/
│   ├── build-syllabus-notes.js
│   ├── debug-build.js
│   ├── enhance-mindmaps.js
│   ├── ensure-all-fields.js
│   ├── expand-confusion-practice-summary.js
│   ├── fill-all-fields.js
│   ├── fix-mindmap-tails.js
│   ├── fix-placeholders.js
│   ├── generate-chemistry-content.js
│   ├── generate-mindmaps.js
│   ├── generate-real-content.js
│   ├── migrate-biology.ts
│   ├── populate-neb-content-patched.js
│   ├── populate-neb-content.js
│   ├── refine-chemistry-content.js
│   ├── update-mindmaps-details.js
│   ├── validate-biology-content.ts
│   └── validate-mindmaps.js
├── db/
│   ├── schema.ts
│   └── seed.ts
├── deploy/
│   └── nginx/
│       ├── conf.d/
│       │   └── gzip.conf
│       ├── sites-available/
│       │   └── educational-platform
│       ├── snippets/
│       │   ├── proxy-params.conf
│       │   └── security-headers.conf
│       ├── nginx.conf
│       └── README.md
├── docs/   # architecture & process docs
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
├── drizzle/
│   ├── meta/
│   │   ├── _journal.json
│   │   └── 0000_snapshot.json
│   └── 0000_init.sql
├── frontend/   # Next.js app
│   ├── app/
│   │   ├── (app)/   # authenticated app shell (wraps pages in <AppShell>)
│   │   │   ├── ai-quiz/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── bookmarks/
│   │   │   │   └── page.tsx
│   │   │   ├── chat/
│   │   │   │   └── page.tsx
│   │   │   ├── class-11/
│   │   │   │   └── page.tsx
│   │   │   ├── class-11-notes/
│   │   │   │   ├── [subject]/
│   │   │   │   │   └── …
│   │   │   │   ├── biology/
│   │   │   │   │   └── …
│   │   │   │   ├── chemistry/
│   │   │   │   │   └── …
│   │   │   │   ├── english/
│   │   │   │   │   └── …
│   │   │   │   ├── mathematics/
│   │   │   │   │   └── …
│   │   │   │   ├── nepali/
│   │   │   │   │   └── …
│   │   │   │   ├── physics/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── class-12/
│   │   │   │   └── page.tsx
│   │   │   ├── class-12-notes/
│   │   │   │   ├── [subject]/
│   │   │   │   │   └── …
│   │   │   │   ├── biology/
│   │   │   │   │   └── …
│   │   │   │   ├── chemistry/
│   │   │   │   │   └── …
│   │   │   │   ├── english/
│   │   │   │   │   └── …
│   │   │   │   ├── mathematics/
│   │   │   │   │   └── …
│   │   │   │   ├── nepali/
│   │   │   │   │   └── …
│   │   │   │   ├── physics/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── controller/
│   │   │   │   └── page.tsx
│   │   │   ├── credits/
│   │   │   │   └── page.tsx
│   │   │   ├── exam-countdown/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── home/
│   │   │   │   └── page.tsx
│   │   │   ├── knowledge/
│   │   │   │   ├── biology-diagrams/
│   │   │   │   │   └── …
│   │   │   │   ├── byakaran/
│   │   │   │   │   └── …
│   │   │   │   ├── grammar/
│   │   │   │   │   └── …
│   │   │   │   ├── numerical-chemistry/
│   │   │   │   │   └── …
│   │   │   │   ├── numerical-physics/
│   │   │   │   │   └── …
│   │   │   │   ├── writing/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── lab/
│   │   │   │   ├── [labId]/
│   │   │   │   │   └── …
│   │   │   │   ├── 3d/
│   │   │   │   │   └── …
│   │   │   │   ├── biology/
│   │   │   │   │   └── …
│   │   │   │   ├── chemistry/
│   │   │   │   │   └── …
│   │   │   │   ├── class11/
│   │   │   │   │   └── …
│   │   │   │   ├── heat-determinations/
│   │   │   │   │   └── …
│   │   │   │   ├── math/
│   │   │   │   │   └── …
│   │   │   │   ├── physics/
│   │   │   │   │   └── …
│   │   │   │   ├── theory/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── legend/
│   │   │   │   ├── [classSlug]/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── levels/
│   │   │   │   ├── [levelSlug]/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── loksewa/
│   │   │   │   ├── environment/
│   │   │   │   │   └── …
│   │   │   │   ├── geography-of-nepal/
│   │   │   │   │   └── …
│   │   │   │   ├── history/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── notes/
│   │   │   │   └── page.tsx
│   │   │   ├── progress/
│   │   │   │   └── page.tsx
│   │   │   ├── quiz/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── r-notes-disabled/
│   │   │   │   └── page.tsx
│   │   │   ├── ravikishan-notes-disabled/
│   │   │   │   └── page.tsx
│   │   │   ├── resources/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── …
│   │   │   │   ├── new/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── subjects/
│   │   │   │   └── page.tsx
│   │   │   ├── syllabus/
│   │   │   │   ├── [subjectSlug]/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── theorems/
│   │   │   │   ├── [classSlug]/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
│   │   │   ├── world-knowledge/
│   │   │   │   ├── current-affairs/
│   │   │   │   │   └── …
│   │   │   │   ├── general-knowledge/
│   │   │   │   │   └── …
│   │   │   │   ├── global-topics/
│   │   │   │   │   └── …
│   │   │   │   └── page.tsx
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
│   │   ├── global-error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   ├── components/   # ui/ design-system + feature components
│   │   ├── chat/
│   │   │   └── study-chat.tsx
│   │   ├── content/
│   │   │   ├── topic-resources/
│   │   │   │   └── analytical-geometry-exercise.tsx
│   │   │   ├── analytical-geometry-resource-panel.tsx
│   │   │   ├── analytical-geometry-resources.tsx
│   │   │   ├── angle-between-lines.tsx
│   │   │   ├── antiderivatives-resources.tsx
│   │   │   ├── application-derivatives-resources.tsx
│   │   │   ├── complex-number-resources.tsx
│   │   │   ├── content-tabs.tsx
│   │   │   ├── curve-sketching-resources.tsx
│   │   │   ├── date-badge.tsx
│   │   │   ├── differentiation-resources.tsx
│   │   │   ├── distance-point-to-line.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── flashcard-viewer.tsx
│   │   │   ├── functions-resources.tsx
│   │   │   ├── imported-notes-section.tsx
│   │   │   ├── katex.tsx
│   │   │   ├── limits-continuity-resources.tsx
│   │   │   ├── logic-sets-resources.tsx
│   │   │   ├── math-markdown.tsx
│   │   │   ├── MathRenderer.tsx
│   │   │   ├── matrices-determinants-resources.tsx
│   │   │   ├── notes-viewer.tsx
│   │   │   ├── numerical-integration-resources.tsx
│   │   │   ├── numerical-viewer.tsx
│   │   │   ├── parallel-lines.tsx
│   │   │   ├── pyq-card.tsx
│   │   │   ├── quadratic-equation-resources.tsx
│   │   │   ├── quiz-viewer.tsx
│   │   │   ├── ravikishan-topic-resources.tsx
│   │   │   ├── rendered-imported-note.tsx
│   │   │   ├── resource-form.tsx
│   │   │   ├── resource-link-form.tsx
│   │   │   ├── sequence-series-resources.tsx
│   │   │   ├── statistics-probability-resources.tsx
│   │   │   ├── status-badge.tsx
│   │   │   ├── syllabus-section.tsx
│   │   │   ├── trigonometry-resources.tsx
│   │   │   ├── under-development.tsx
│   │   │   ├── vectors-resources.tsx
│   │   │   └── video-viewer.tsx
│   │   ├── home/
│   │   │   ├── biology-showcase.tsx
│   │   │   ├── cell-architecture-showcase.tsx
│   │   │   └── physics-showcase.tsx
│   │   ├── lab/
│   │   │   ├── annotation/
│   │   │   │   └── arrow-label.tsx
│   │   │   ├── chapters/
│   │   │   │   └── [chapterId]/
│   │   │   │       └── …
│   │   │   ├── class11/
│   │   │   │   ├── theory/
│   │   │   │   │   └── …
│   │   │   │   ├── class11-atomic-structure.tsx
│   │   │   │   ├── class11-biology-3d-plus.tsx
│   │   │   │   ├── class11-chemical-bonding.tsx
│   │   │   │   ├── class11-chemistry-3d-plus.tsx
│   │   │   │   ├── class11-chemistry-3d.tsx
│   │   │   │   ├── class11-electrochemistry-galvanic-cell.tsx
│   │   │   │   ├── class11-electromagnetic-induction.tsx
│   │   │   │   ├── class11-kinematics-motion-enhanced.tsx
│   │   │   │   ├── class11-kinematics-motion.tsx
│   │   │   │   ├── class11-laws-motion-enhanced.tsx
│   │   │   │   ├── class11-laws-motion.tsx
│   │   │   │   ├── class11-math-3d-plus.tsx
│   │   │   │   ├── class11-math-3d.tsx
│   │   │   │   ├── class11-physics-3d-plus.tsx
│   │   │   │   ├── class11-physics-3d.tsx
│   │   │   │   ├── class11-probability-3d.tsx
│   │   │   │   ├── class11-rotational-motion.tsx
│   │   │   │   ├── class11-sets-functions.tsx
│   │   │   │   ├── class11-statistics.tsx
│   │   │   │   ├── class11-thermodynamics.tsx
│   │   │   │   ├── class11-trigonometry.tsx
│   │   │   │   ├── class11-work-energy.tsx
│   │   │   │   └── index.ts
│   │   │   ├── motion-graphics/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── motion-calculus.tsx
│   │   │   │   ├── motion-class11-wave-interference.tsx
│   │   │   │   ├── motion-electromagnetism.tsx
│   │   │   │   ├── motion-em-waves.tsx
│   │   │   │   ├── motion-fluid-dynamics.tsx
│   │   │   │   ├── motion-optics.tsx
│   │   │   │   ├── motion-organic-chemistry.tsx
│   │   │   │   ├── motion-quantum.tsx
│   │   │   │   ├── motion-relativity.tsx
│   │   │   │   ├── motion-semiconductors.tsx
│   │   │   │   └── motion-thermodynamics.tsx
│   │   │   ├── topic-visuals/
│   │   │   │   ├── ac-circuits-3d.tsx
│   │   │   │   ├── algae.tsx
│   │   │   │   ├── angiosperm.tsx
│   │   │   │   ├── arrhenius-equation.tsx
│   │   │   │   ├── atomic-structure.tsx
│   │   │   │   ├── bayes-theorem.tsx
│   │   │   │   ├── benzene-ring.tsx
│   │   │   │   ├── binomial-dist.tsx
│   │   │   │   ├── biogeochemical-cycles.tsx
│   │   │   │   ├── biot-savart-3d.tsx
│   │   │   │   ├── bohr-model-3d.tsx
│   │   │   │   ├── bryophyta.tsx
│   │   │   │   ├── capacitor-3d.tsx
│   │   │   │   ├── cell-biology.tsx
│   │   │   │   ├── cell-division.tsx
│   │   │   │   ├── chemical-bond-characteristics-3d.tsx
│   │   │   │   ├── chemical-bond-covalent-3d.tsx
│   │   │   │   ├── chemical-bond-hybridization-3d.tsx
│   │   │   │   ├── chemical-bond-ionic-3d.tsx
│   │   │   │   ├── chemical-bond-lewis-3d.tsx
│   │   │   │   ├── chemical-bond-metallic-3d.tsx
│   │   │   │   ├── chemical-bond-resonance-3d.tsx
│   │   │   │   ├── chemical-bond-vbt-3d.tsx
│   │   │   │   ├── chemical-bond-vdw-3d.tsx
│   │   │   │   ├── chemical-bond-vsepr-3d.tsx
│   │   │   │   ├── chemical-bonding.tsx
│   │   │   │   ├── circular-motion-3d.tsx
│   │   │   │   ├── complex-quadratic.tsx
│   │   │   │   ├── conditional-prob.tsx
│   │   │   │   ├── continuity-3d.tsx
│   │   │   │   ├── coordinates-space.tsx
│   │   │   │   ├── coordination-compounds.tsx
│   │   │   │   ├── coulombs-law-3d.tsx
│   │   │   │   ├── crystal-lattice.tsx
│   │   │   │   ├── curve-sketching.tsx
│   │   │   │   ├── dc-circuits-3d.tsx
│   │   │   │   ├── derivative-geometric-3d.tsx
│   │   │   │   ├── derivative-higher-3d.tsx
│   │   │   │   ├── derivative-logarithmic-3d.tsx
│   │   │   │   ├── derivative-parametric-3d.tsx
│   │   │   │   ├── derivative-rules-3d.tsx
│   │   │   │   ├── derivative-visual.tsx
│   │   │   │   ├── differentiability-3d.tsx
│   │   │   │   ├── dnastucture.tsx
│   │   │   │   ├── dynamics.tsx
│   │   │   │   ├── earthworm.tsx
│   │   │   │   ├── ecosystem.tsx
│   │   │   │   ├── electric-field-3d.tsx
│   │   │   │   ├── electrolysis.tsx
│   │   │   │   ├── emi-induction-3d.tsx
│   │   │   │   ├── equilibrium.tsx
│   │   │   │   ├── evolution.tsx
│   │   │   │   ├── five-kingdom.tsx
│   │   │   │   ├── formation-de.tsx
│   │   │   │   ├── frog.tsx
│   │   │   │   ├── function-graphs.tsx
│   │   │   │   ├── fungi.tsx
│   │   │   │   ├── galvanic-cell.tsx
│   │   │   │   ├── gas-laws.tsx
│   │   │   │   ├── gauss-law-3d.tsx
│   │   │   │   └── … (75 more entries)
│   │   │   ├── topics/
│   │   │   │   └── [topicId]/
│   │   │   │       └── …
│   │   │   ├── ai-lab-tutor.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── animated-arrow-helper.ts
│   │   │   ├── animated-arrow.tsx
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
│   │   │   ├── chapter-animation.tsx
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
│   │   │   ├── dynamic-arrow-helper.ts
│   │   │   ├── dynamic-arrow-helper.tsx
│   │   │   ├── dynamic-arrow.tsx
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
│   │   │   ├── learning-section.tsx
│   │   │   ├── math-3d-geometry-labelledby.tsx
│   │   │   ├── math-3d-syllabus-suite.tsx
│   │   │   ├── math-3d-symbols.tsx
│   │   │   ├── math-advanced-3d.tsx
│   │   │   ├── math-geometry-3d.tsx
│   │   │   ├── math-interactive.tsx
│   │   │   └── … (61 more entries)
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
│   │   ├── pwa/
│   │   │   └── service-worker-registrar.tsx
│   │   ├── streak-badge/
│   │   │   └── index.tsx
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
│   ├── content/
│   │   └── ravikishan/
│   │       ├── class-11-notes/
│   │       │   ├── biology/
│   │       │   │   └── …
│   │       │   ├── chemistry/
│   │       │   │   └── …
│   │       │   ├── english/
│   │       │   │   └── …
│   │       │   ├── mathematics/
│   │       │   │   └── …
│   │       │   ├── nepali/
│   │       │   │   └── …
│   │       │   └── physics/
│   │       │       └── …
│   │       └── class-12-notes/
│   │           ├── biology/
│   │           │   └── …
│   │           ├── chemistry/
│   │           │   └── …
│   │           ├── english/
│   │           │   └── …
│   │           ├── mathematics/
│   │           │   └── …
│   │           ├── nepali/
│   │           │   └── …
│   │           └── physics/
│   │               └── …
│   ├── features/   # feature modules (auth, knowledge, mindmap, syllabus)
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── signup-form.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-session.ts
│   │   │   ├── actions.ts
│   │   │   ├── schema.ts
│   │   │   └── types.ts
│   │   ├── knowledge/
│   │   │   ├── components/
│   │   │   │   └── knowledge-section-view.tsx
│   │   │   ├── writing/
│   │   │   │   ├── data-creative.ts
│   │   │   │   ├── data-essays.ts
│   │   │   │   ├── data-grammar.ts
│   │   │   │   ├── data-ideas.ts
│   │   │   │   ├── data-letters.ts
│   │   │   │   ├── data-reports.ts
│   │   │   │   ├── data-textual.ts
│   │   │   │   ├── data-vocabulary.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── types.ts
│   │   │   └── data.ts
│   │   ├── mindmap/
│   │   │   ├── components/
│   │   │   │   ├── mindmap-gallery-view.tsx
│   │   │   │   ├── mindmap-interface.tsx
│   │   │   │   └── mindmap-viewer.tsx
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   ├── syllabus/
│   │   │   ├── components/
│   │   │   │   ├── chapter-detail-view.tsx
│   │   │   │   ├── chapters-index-view.tsx
│   │   │   │   ├── official-syllabus-panel.tsx
│   │   │   │   ├── subject-hub-view.tsx
│   │   │   │   ├── subject-section-nav.tsx
│   │   │   │   ├── subject-syllabus-view.tsx
│   │   │   │   ├── syllabus-viewer.tsx
│   │   │   │   ├── theory-section-view.tsx
│   │   │   │   └── topic-detail-view.tsx
│   │   │   ├── content-router.ts
│   │   │   ├── hooks.ts
│   │   │   ├── queries.ts
│   │   │   ├── schema.ts
│   │   │   └── types.ts
│   │   └── syllabus-history/
│   │       ├── components/
│   │       │   └── version-comparison.tsx
│   │       └── data/
│   │           ├── biology.ts
│   │           ├── chemistry.ts
│   │           ├── english.ts
│   │           ├── index.ts
│   │           ├── mathematics.ts
│   │           ├── nepali.ts
│   │           └── physics.ts
│   ├── lib/   # api/, auth/, content/, schemas/, types/
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
│   │   ├── streaks/
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── lab.ts
│   │   ├── api-client.ts
│   │   ├── api.ts
│   │   ├── curriculum.ts
│   │   ├── data-loader.ts
│   │   ├── hast-util-from-html-isomorphic.js
│   │   ├── imported-notes.ts
│   │   ├── lab-annotations.ts
│   │   ├── lab-learning-class11.ts
│   │   ├── lab-learning.ts
│   │   ├── lab-registry.tsx
│   │   ├── lab-types.ts
│   │   ├── legend.ts
│   │   ├── math-expression.ts
│   │   ├── misconception-questions-biology.ts
│   │   ├── misconception-questions-chemistry.ts
│   │   ├── misconception-questions.ts
│   │   ├── pyq-bank.ts
│   │   ├── queries.ts
│   │   ├── syllabus-history.ts
│   │   ├── syllabus-notes-manifest.ts
│   │   ├── syllabus.ts
│   │   ├── theorems.ts
│   │   ├── theory-content.ts
│   │   ├── topic-3d-map.tsx
│   │   ├── utils.ts
│   │   └── webgl.ts
│   ├── providers/
│   │   └── query-provider.tsx
│   ├── public/
│   │   ├── data/
│   │   │   ├── exams/
│   │   │   │   ├── exam-01.json
│   │   │   │   ├── exam-02.json
│   │   │   │   └── exam-03.json
│   │   │   ├── r-export/
│   │   │   │   └── manifest.json
│   │   │   ├── ravikishan/
│   │   │   │   ├── _index.json
│   │   │   │   └── manifest.json
│   │   │   └── syllabus-notes/
│   │   │       ├── biology/
│   │   │       │   └── …
│   │   │       ├── chemistry/
│   │   │       │   └── …
│   │   │       ├── english/
│   │   │       │   └── …
│   │   │       ├── mathematics/
│   │   │       │   └── …
│   │   │       ├── nepali/
│   │   │       │   └── …
│   │   │       └── physics/
│   │   │           └── …
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   ├── manifest.json
│   │   └── sw.js
│   ├── scripts/
│   │   ├── fix_index.py
│   │   └── write_pages.py
│   ├── tests/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       └── progress.test.tsx
│   │   ├── lib/
│   │   │   ├── auth/
│   │   │   │   └── roles.test.ts
│   │   │   ├── content/
│   │   │   │   ├── katex.test.ts
│   │   │   │   ├── math-coverage.test.ts
│   │   │   │   ├── note-status.test.ts
│   │   │   │   └── pipeline.test.ts
│   │   │   └── syllabus.test.ts
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
│   ├── generate-mindmaps.js
│   ├── invisible-utils.ps1
│   ├── MIGRATION_FILE_MAP.md
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── PROMPT_FOR_COMPETITOR.md
│   ├── proxy.ts
│   ├── scan-invisible.js
│   ├── scan-invisible.ps1
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.tsbuildinfo
│   ├── vercel.json
│   └── vitest.config.ts
├── media/
│   ├── images/
│   │   └── manim_3d_math_animations/
│   ├── Tex/
│   │   └── efbc164f55b4df91.tex
│   └── videos/
│       └── manim_3d_math_animations/
│           └── 480p15/
│               └── partial_movie_files/
│                   └── …
├── moecdc-extraction/
│   ├── out-biology/
│   │   ├── chapter-01-biomolecules-and-cell-biology.md
│   │   ├── chapter-02-floral-diversity.md
│   │   ├── chapter-03-introduction-to-microbiology.md
│   │   ├── chapter-04-ecology.md
│   │   ├── chapter-05-vegetation.md
│   │   ├── chapter-06-introduction-to-biology.md
│   │   ├── chapter-07-evolutionary-biology.md
│   │   ├── chapter-08-faunal-diversity.md
│   │   ├── chapter-09-biota-and-environment.md
│   │   └── chapter-10-conservation-biology.md
│   ├── biology-grade-11.pdf
│   ├── chapters-biology.json
│   ├── chapters.json
│   ├── download_biology_pdf.js
│   ├── download_pdf.js
│   ├── extract_biology_by_pages.js
│   ├── extract_chapters_biology.js
│   ├── extract_chapters_page_based.js
│   ├── extract_chapters.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── physicshub.github.io/
│   ├── .github/
│   │   ├── ISSUE_TEMPLATE/
│   │   │   ├── 1_bug_report.yml
│   │   │   ├── 2_feature_request.yml
│   │   │   └── 3_ask_question.yml
│   │   ├── workflows/
│   │   │   ├── contributors.yml
│   │   │   ├── prchecks.yml
│   │   │   ├── prcontributorbot.yaml
│   │   │   └── release.yml
│   │   ├── dependabot.yml
│   │   ├── FUNDING.yml
│   │   └── pull_request_template.md
│   ├── app/
│   │   ├── (core)/
│   │   │   ├── components/
│   │   │   │   ├── blog/
│   │   │   │   │   └── …
│   │   │   │   ├── controls/
│   │   │   │   │   └── …
│   │   │   │   ├── inputs/
│   │   │   │   │   └── …
│   │   │   │   ├── theory/
│   │   │   │   │   └── …
│   │   │   │   ├── Back.tsx
│   │   │   │   ├── BackToTop.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Chapter.jsx
│   │   │   │   ├── Comets.jsx
│   │   │   │   ├── ContributorsSection.jsx
│   │   │   │   ├── ContributorsSection.lazy.jsx
│   │   │   │   ├── ContributorsSectionSkeleton.tsx
│   │   │   │   ├── Controls.jsx
│   │   │   │   ├── Editor.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── FullLandingPage.tsx
│   │   │   │   ├── Funfact.jsx
│   │   │   │   ├── GitHubHeaderBadge.jsx
│   │   │   │   ├── GoogleTranslator.jsx
│   │   │   │   ├── GradientBackground.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── HeroBackground.tsx
│   │   │   │   ├── LandingPart.jsx
│   │   │   │   ├── LanguageSwitcher.jsx
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Logo.jsx
│   │   │   │   ├── Nav.tsx
│   │   │   │   ├── P5Wrapper.jsx
│   │   │   │   ├── Popup.tsx
│   │   │   │   ├── Screen.jsx
│   │   │   │   ├── ScrollDown.tsx
│   │   │   │   ├── Search.jsx
│   │   │   │   ├── SimInfoPanel.jsx
│   │   │   │   ├── SimulationLayout.jsx
│   │   │   │   ├── Stars.jsx
│   │   │   │   ├── Tag.jsx
│   │   │   │   ├── Theme.tsx
│   │   │   │   └── TopSim.tsx
│   │   │   ├── constants/
│   │   │   │   ├── Config.js
│   │   │   │   ├── Time.js
│   │   │   │   └── Utils.js
│   │   │   ├── context/
│   │   │   │   └── FeedbackProvider.tsx
│   │   │   ├── data/
│   │   │   │   ├── articles/
│   │   │   │   │   └── …
│   │   │   │   ├── configs/
│   │   │   │   │   └── …
│   │   │   │   ├── chapters.js
│   │   │   │   ├── facts.js
│   │   │   │   ├── initialContent.js
│   │   │   │   └── tags.js
│   │   │   ├── engine/
│   │   │   │   ├── collision/
│   │   │   │   │   └── …
│   │   │   │   ├── constraints/
│   │   │   │   │   └── …
│   │   │   │   ├── forces/
│   │   │   │   │   └── …
│   │   │   │   ├── interaction/
│   │   │   │   │   └── …
│   │   │   │   ├── render/
│   │   │   │   │   └── …
│   │   │   │   ├── runtime/
│   │   │   │   │   └── …
│   │   │   │   ├── utils/
│   │   │   │   │   └── …
│   │   │   │   ├── Body.js
│   │   │   │   ├── formulas.js
│   │   │   │   ├── index.js
│   │   │   │   ├── integrators.js
│   │   │   │   └── World.js
│   │   │   ├── hooks/
│   │   │   │   ├── useMobile.ts
│   │   │   │   ├── useSimInfo.ts
│   │   │   │   ├── useSimulationState.ts
│   │   │   │   ├── useSticky.ts
│   │   │   │   ├── useTheme.tsx
│   │   │   │   └── useTranslation.ts
│   │   │   ├── locales/
│   │   │   │   ├── ar.json
│   │   │   │   ├── de.json
│   │   │   │   ├── en.json
│   │   │   │   ├── es.json
│   │   │   │   ├── fr.json
│   │   │   │   ├── id.json
│   │   │   │   ├── it.json
│   │   │   │   ├── meta.json
│   │   │   │   └── rw.json
│   │   │   ├── styles/
│   │   │   │   ├── base/
│   │   │   │   │   └── …
│   │   │   │   ├── components/
│   │   │   │   │   └── …
│   │   │   │   ├── layout/
│   │   │   │   │   └── …
│   │   │   │   ├── pages/
│   │   │   │   │   └── …
│   │   │   │   └── index.css
│   │   │   └── utils/
│   │   │       ├── adjustColor.ts
│   │   │       ├── blogHandling.ts
│   │   │       ├── drawUtils.js
│   │   │       ├── getBackgroundColor.ts
│   │   │       └── sendFeedback.ts
│   │   ├── (pages)/
│   │   │   ├── about/
│   │   │   │   └── page.jsx
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── …
│   │   │   │   ├── create/
│   │   │   │   │   └── …
│   │   │   │   └── page.jsx
│   │   │   ├── contribute/
│   │   │   │   └── page.jsx
│   │   │   └── simulations/
│   │   │       ├── [id]/
│   │   │       │   └── …
│   │   │       ├── layout.tsx
│   │   │       └── page.jsx
│   │   ├── api/
│   │   │   └── publish/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── not-found.jsx
│   │   └── page.jsx
│   ├── content/
│   │   └── blogs/
│   │       ├── test-blog-publishing-workflow-1780904466785.json
│   │       └── writing-your-first-physicshub-blog-post-1783863009397.json
│   ├── images/
│   │   └── contributors.png
│   ├── public/
│   │   ├── icons/
│   │   │   ├── acceleration.png
│   │   │   ├── bouncingBall.png
│   │   │   ├── circular.png
│   │   │   ├── collision.png
│   │   │   ├── gravity.png
│   │   │   ├── inclined.png
│   │   │   ├── parabola.png
│   │   │   ├── pendulam.png
│   │   │   ├── spring.png
│   │   │   ├── test.png
│   │   │   ├── threebody.png
│   │   │   └── vector.png
│   │   ├── screenshots/
│   │   │   ├── fix-blogTitleGlow/
│   │   │   │   └── main.png
│   │   │   ├── issue-15-lightMode/
│   │   │   │   ├── Screenshot 2025-10-07 at 9.43.38 PM.png
│   │   │   │   ├── Screenshot 2025-10-07 at 9.43.50 PM.png
│   │   │   │   ├── Screenshot 2025-10-07 at 9.57.35 PM.png
│   │   │   │   └── Screenshot 2025-10-07 at 9.58.12 PM.png
│   │   │   ├── v1.0/
│   │   │   │   ├── main.png
│   │   │   │   └── Screenshot 2025-08-01 alle 23.42.10.png
│   │   │   ├── v1.1/
│   │   │   │   ├── main.png
│   │   │   │   ├── Screenshot 2025-08-13 alle 14.51.05.png
│   │   │   │   └── Screenshot 2025-08-13 alle 14.51.11.png
│   │   │   ├── v1.2/
│   │   │   │   ├── main.png
│   │   │   │   ├── Screenshot 2025-08-26 alle 18.18.56.png
│   │   │   │   ├── Screenshot 2025-08-26 alle 18.19.01.png
│   │   │   │   └── Screenshot 2025-08-26 alle 18.19.04.png
│   │   │   ├── v1.3/
│   │   │   │   ├── updated_input_screenshots/
│   │   │   │   │   └── …
│   │   │   │   ├── main.png
│   │   │   │   ├── Screenshot 2025-09-19 alle 22.16.28.png
│   │   │   │   └── Screenshot 2025-09-19 alle 22.16.34.png
│   │   │   ├── v2.15.0/
│   │   │   │   └── Screenshot 2025-12-08 alle 12.13.49.png
│   │   │   ├── v2.16.0/
│   │   │   │   └── main.png
│   │   │   └── v3.24.0/
│   │   │       └── main.png
│   │   ├── thumbnails/
│   │   │   ├── 1d-collision.webp
│   │   │   ├── ball-acceleration.webp
│   │   │   ├── ball-gravity.webp
│   │   │   ├── bouncing-ball.webp
│   │   │   ├── circular.webp
│   │   │   ├── double-pendulum.webp
│   │   │   ├── horizontal-spring.webp
│   │   │   ├── incline-plane.webp
│   │   │   ├── pi.webp
│   │   │   ├── projectile.webp
│   │   │   ├── simple-pendulum.webp
│   │   │   ├── spring-mass.webp
│   │   │   ├── test.webp
│   │   │   ├── three-body.webp
│   │   │   └── vector-operations.webp
│   │   ├── Icon.png
│   │   ├── Logo.ico
│   │   ├── Logo.png
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── Thumbnail.png
│   ├── scripts/
│   │   ├── contributors/
│   │   │   ├── models/
│   │   │   │   └── contributor.ts
│   │   │   ├── contributors.css
│   │   │   ├── contributors.html
│   │   │   └── contributors.ts
│   │   ├── helpers/
│   │   │   ├── gitStats.ts
│   │   │   ├── logger.ts
│   │   │   ├── painter.ts
│   │   │   ├── percentage.ts
│   │   │   ├── screenshots.ts
│   │   │   └── writeFile.ts
│   │   ├── check-package-lock.js
│   │   └── sitemap-generator.js
│   ├── simulations/
│   │   ├── BallAcceleration.jsx
│   │   ├── BallGravity.jsx
│   │   ├── BouncingBall.jsx
│   │   ├── CircularMotion.jsx
│   │   ├── CollisionSimulation.jsx
│   │   ├── DoublePendulum.jsx
│   │   ├── HorizontalSpring.jsx
│   │   ├── InclinedPlane.jsx
│   │   ├── ParabolicMotion.jsx
│   │   ├── PiCollisions.jsx
│   │   ├── SimplePendulum.jsx
│   │   ├── SpringConnection.jsx
│   │   ├── test.jsx
│   │   ├── ThreeBody.jsx
│   │   └── VectorsOperations.jsx
│   ├── .all-contributorsrc
│   ├── .env.example
│   ├── .gitattributes
│   ├── .gitignore
│   ├── .nvmrc
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── .stackfingerprint
│   ├── CLAUDE.md
│   ├── CODE_OF_CONDUCT.md
│   ├── CONTRIBUTING.md
│   ├── eslint.config.mjs
│   ├── instrumentation.ts
│   ├── LICENSE
│   ├── next.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── release.config.js
│   ├── routes.js
│   ├── SECURITY.md
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── tsconfig.tsbuildinfo
├── public/
│   └── data/
│       ├── exams/
│       │   ├── exam-01.json
│       │   ├── exam-02.json
│       │   └── exam-03.json
│       ├── r-export/
│       │   └── manifest.json
│       ├── ravikishan/
│       │   ├── _index.json
│       │   └── manifest.json
│       └── syllabus-notes/
│           ├── biology/
│           │   ├── biomolecules-and-cell-biology/
│           │   │   └── …
│           │   ├── biota-and-environment/
│           │   │   └── …
│           │   ├── conservation-biology/
│           │   │   └── …
│           │   ├── ecology/
│           │   │   └── …
│           │   ├── evolutionary-biology/
│           │   │   └── …
│           │   ├── faunal-diversity/
│           │   │   └── …
│           │   ├── floral-diversity/
│           │   │   └── …
│           │   ├── introduction-to-biology/
│           │   │   └── …
│           │   ├── introductory-microbiology/
│           │   │   └── …
│           │   ├── vegetation/
│           │   │   └── …
│           │   └── _manifest.json
│           ├── chemistry/
│           │   ├── aromatic-hydrocarbons/
│           │   │   └── …
│           │   ├── atomic-structure/
│           │   │   └── …
│           │   ├── basic-concept-of-organic-chemistry/
│           │   │   └── …
│           │   ├── bio-inorganic-chemistry/
│           │   │   └── …
│           │   ├── chemical-bonding-and-shapes-of-molecules/
│           │   │   └── …
│           │   ├── chemical-equilibrium/
│           │   │   └── …
│           │   ├── chemistry-of-metals/
│           │   │   └── …
│           │   ├── chemistry-of-non-metals/
│           │   │   └── …
│           │   ├── classification-of-elements-and-periodic-table/
│           │   │   └── …
│           │   ├── foundation-and-fundamentals/
│           │   │   └── …
│           │   ├── fundamental-principles-of-organic-chemistry/
│           │   │   └── …
│           │   ├── fundamentals-of-applied-chemistry/
│           │   │   └── …
│           │   ├── hydrocarbons/
│           │   │   └── …
│           │   ├── modern-chemical-manufactures/
│           │   │   └── …
│           │   ├── oxidation-and-reduction/
│           │   │   └── …
│           │   ├── states-of-matter/
│           │   │   └── …
│           │   ├── stoichiometry/
│           │   │   └── …
│           │   └── _manifest.json
│           ├── english/
│           │   ├── reading-and-comprehension/
│           │   │   └── …
│           │   └── _manifest.json
│           ├── mathematics/
│           │   ├── algebra/
│           │   │   └── …
│           │   ├── analytic-geometry/
│           │   │   └── …
│           │   ├── calculus/
│           │   │   └── …
│           │   ├── computational-methods-or-mechanics/
│           │   │   └── …
│           │   ├── statistics-and-probability/
│           │   │   └── …
│           │   ├── trigonometry/
│           │   │   └── …
│           │   ├── vectors/
│           │   │   └── …
│           │   └── _manifest.json
│           ├── nepali/
│           │   ├── bhasha-ra-vyakarana/
│           │   │   └── …
│           │   ├── sahitya-adhyayan/
│           │   │   └── …
│           │   └── _manifest.json
│           └── physics/
│               ├── capacitor/
│               │   └── …
│               ├── circular-motion/
│               │   └── …
│               ├── dc-circuits/
│               │   └── …
│               ├── dispersion/
│               │   └── …
│               ├── dynamics/
│               │   └── …
│               ├── elasticity/
│               │   └── …
│               ├── electric-charges/
│               │   └── …
│               ├── electric-field/
│               │   └── …
│               ├── gravitation/
│               │   └── …
│               ├── heat-and-temperature/
│               │   └── …
│               ├── ideal-gas/
│               │   └── …
│               ├── kinematics/
│               │   └── …
│               ├── lenses/
│               │   └── …
│               ├── mechanics/
│               │   └── …
│               ├── nuclear-physics/
│               │   └── …
│               ├── optics/
│               │   └── …
│               ├── physical-quantities/
│               │   └── …
│               ├── potential-potential-difference-and-potential-energy/
│               │   └── …
│               ├── quantity-of-heat/
│               │   └── …
│               ├── rate-of-heat-flow/
│               │   └── …
│               ├── recent-trends-in-physics/
│               │   └── …
│               ├── reflection-at-curved-mirror/
│               │   └── …
│               ├── refraction-at-plane-surfaces/
│               │   └── …
│               ├── refraction-through-prisms/
│               │   └── …
│               ├── solids/
│               │   └── …
│               ├── thermal-expansion/
│               │   └── …
│               ├── vectors/
│               │   └── …
│               ├── work-energy-and-power/
│               │   └── …
│               └── _manifest.json
├── scripts/   # build/deploy + blueprint tooling
│   ├── hooks/
│   │   └── pre-commit
│   ├── analyze-map.mjs
│   ├── apostrophe-check.mjs
│   ├── apostrophe-check.txt
│   ├── check-visual-coverage.mjs
│   ├── generate-blueprint.mjs
│   ├── install-hooks.mjs
│   ├── lint.log
│   ├── map-entries-output.txt
│   ├── resolve-check.txt
│   ├── stderr.log
│   ├── stdout.log
│   ├── test-write.txt
│   └── typecheck.log
├── supabase/   # Supabase project config & SQL
│   ├── migrations/
│   │   ├── 0001_init_schema.sql
│   │   ├── 0002_rls.sql
│   │   ├── 0003_seed_dev.sql
│   │   ├── 0004_credits_system.sql
│   │   ├── 0004_seed_content.sql
│   │   └── setup_all.sql
│   ├── .gitignore
│   └── config.toml
├── _write_json.py
├── .env
├── .env.example
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── .nfignore
├── .npmrc
├── .prettierrc
├── {const
├── 0
├── 0)
├── add_patterns.js
├── AGENT_RULES.md
├── agent.mjs
├── ai.bat
├── analytical_geometry.pdf
├── apply_physics_fix.js
├── ask-ai.mjs
├── AUDIT_REPORT.md
├── backend.log
├── cdc-bio-full.html
├── cdc-biology-page.html
├── check_physics_state.js
├── check_plan.js
├── check-invalid.js
├── check-json.js
├── check-output.txt
├── check-tir-status.js
├── ci-status.txt
├── cleanup_extra_files.js
├── components.json
├── create-components.js
├── CUsersASUSdesktoprntemp_matrices_page.html
├── debug_bytes.js
├── debug_dynamics02.js
├── debug_earthworm.js
├── debug_json.py
├── debug_regex.js
├── debug-all-remaining.js
├── debug-bytes.js
├── debug-categorize.js
├── debug-detailed.js
├── debug-essay-intro-v2.js
└── … (263 more entries)
```

## 🔁 Keeping this up to date

- Run manually after any change:  `npm run blueprint`
- A **pre-commit git hook** regenerates it automatically before every commit;
  if the tree changed, the new version is included in that commit.
- The tree above is generated by scanning the real filesystem — it cannot drift.

<!-- BLUEPRINT:END -->
