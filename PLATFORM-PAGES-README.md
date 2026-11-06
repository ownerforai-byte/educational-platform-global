# Platform footer pages implementation

Prepared for ownerforai-byte/educational-platform-global at commit da101f934b4973008fe7aad5cc11724a775702aa.
This package has NOT been applied, committed, pushed, or deployed to GitHub.

## What changes
- Replace six public UnderDevelopment pages with full responsive information pages.
- Add a shared public header, hero, footer, semantic sections, and keyboard focus states.
- Add three complete original study guides, each with its own article route and table of contents.
- Add a searchable/filterable Help Center with accessible native disclosures and empty-state recovery.
- Add an honest NEB/CDC verification resource: no fabricated live notices or dates.
- Make Contact useful without a fake submission form; use the existing owner contact route.
- Enhance the existing Plans page with metadata and access FAQs, preserving all cards, the runtime SectionMatrix, and existing layout/access rules.
- Add Playwright smoke-test source. No new package dependency or database migration.

## Apply from your repository root
1. Work on a branch and ensure the working tree is safe to change.
2. Run `git apply --check platform-pages.patch` to confirm the patch matches your current files.
3. Review `platform-pages.patch`, then run `git apply platform-pages.patch`.
4. From `frontend`, run `npm run typecheck`, `npm run lint`, and `npm run build`.
5. With a dev server on port 5173, run the supplied Playwright tests with a configuration whose baseURL is http://localhost:5173, or merge them into your existing browser-test setup.
6. Manually review all pages signed out and signed in at phone and desktop widths, and in both themes.
7. Review and commit only the intended files. Push/deploy only when you choose to do so.

Alternatively copy only the files under `source/` to the same repository-relative paths after comparing your local versions. The patch is safer for detecting changed baseline files. Do not create another /plans route: the existing one remains in app/(app)/plans.

## Scope and honest limitations
- Browser integration, actual API behaviour, full TypeScript checking against the repository, and production build require your local project and dependencies. Supplied tests are not proof that these checks passed.
- Plans intentionally remains in its existing route group; this package does not relax authentication, credit gates, or section rules. Verify signed-out Plans access separately against your current runtime.
- Footer links are already correct and are not rewritten. Public pages reuse the existing Footer without a user argument; study/account links therefore remain disabled to guests on those information pages.
- There is no live NEB/CDC feed, support-message backend, CMS, payment integration, or new claims of official affiliation.
- Study guides are original editorial content, not fabricated historical articles. No fake author biography, reviews, prices, publication dates, statistics, or official exam dates.
- Exact allowance numbers remain on the existing Plans page; new guidance refers readers to current balances because runtime settings may differ.
- No account approval duration or support-response guarantee is added.

## Acceptance checklist
- Six public pages replace their placeholders and preserve their existing URLs.
- Every blog Read link opens a complete article; unknown slugs return 404.
- Help search, topic buttons, accordion keyboard interaction, and no-results reset work.
- Contact navigates to the existing owner notice page; no fake success state.
- Plans keeps existing tier data and SectionMatrix and includes the new guidance.
- Check footer navigation, 375px horizontal overflow, contrast, and focus visibility.
