# Platform Upgrade Master Plan
## Ravikisan's Platform — NEB Study Vault

> **Location:** `plans/PLATFORM_UPGRADE_MASTER_PLAN.md`  
> **Created:** 2025  
> **Purpose:** Comprehensive architectural upgrade roadmap for agent coordination

---

## Executive Summary

This document outlines a **phased upgrade plan** for the NEB Study Vault platform, addressing technical debt, scalability concerns, and modernization opportunities while maintaining production stability.

### Current State
- **Frontend:** Next.js 16, React 19, TypeScript, 200+ routes, features/ + lib/core architecture
- **Backend:** Express 5, TypeScript ESM, Firebase Cloud Functions, Supabase PostgreSQL
- **AI:** Agnes primary + 10 free-tier LLM fallbacks, provider chain architecture
- **Content:** ~1,000 concept notes, PYQ banks, gated behind spark-metered endpoints
- **Knowledge Graph:** 22,016 nodes, 53,074 edges, 2,056 communities

---

## Architecture Overview

### Current Structure

```
rn/
├── frontend/              # Next.js 16 (Vercel)
│   ├── app/(app)/         # 150+ authenticated routes
│   ├── features/          # Domain modules (Phase 5 extraction)
│   ├── lib/               # core/, state/, streams/ + shims
│   ├── types/             # Shared hub (api, lab, content)
│   └── tests/             # Vitest
├── backend/               # Express 5 (Firebase Functions)
│   ├── src/api/           # Domain controllers
│   ├── src/ai/            # Provider chain, prompts, corpus
│   ├── src/middleware/    # Auth, rate limits, spark gates
│   └── tests/             # Unit + integration
├── content/               # Authored JSON corpus
├── content-tools/         # Generators, validators, migrators
├── scripts/               # CI, build, audit, deploy
├── packages/shared/       # Cross-app types (@rn/shared)
├── infra/                 # Docker packaging
└── docs/                  # Architecture docs
```

---

## Phase 1: Foundation Strengthening (Weeks 1-2)

### 1.1 Testing Infrastructure
**Priority:** Critical  
**Owner:** Platform Team

| Task | Description | Acceptance Criteria |
|------|-------------|---------------------|
| T1.1 | Complete unit test coverage for lib/core | 80%+ coverage on navigation, access-level, syllabus |
| T1.2 | API contract tests | Zod schema validation for all endpoints |
| T1.3 | E2E critical path tests | Login → Content Access → AI Chat flow |
| T1.4 | AI regression suite expansion | Golden set covers all provider fallbacks |

### 1.2 CI/CD Pipeline
| Task | Description | Acceptance Criteria |
|------|-------------|---------------------|
| T1.5 | Parallelize GitHub Actions | Frontend + Backend + Content checks run parallel |
| T1.6 | Deployment staging gates | Preview deploys for every PR |
| T1.7 | Cache optimization | npm/node_modules caching reduces build time 50%+ |

---

## Phase 2: Backend Modernization (Weeks 3-5)

### 2.1 API Restructuring
**Priority:** High  
**Technical Debt:** Medium

```
Current:           Target:
src/api/           src/domains/
├── auth/          ├── auth/
├── content/       ├── content/
├── ai/            ├── ai/
└── ...            │   ├── providers/
                   │   ├── prompts/
                   │   └── corpus/
                   ├── practice/
                   └── user/
```

| Task | Description | Risk Level |
|------|-------------|------------|
| T2.1 | Extract service layer | Low |
| T2.2 | Repository pattern for DB access | Medium |
| T2.3 | Route versioning (/api/v2/) | Medium |
| T2.4 | OpenAPI spec generation | Low |

### 2.2 AI System Enhancements
| Task | Description | Impact |
|------|-------------|--------|
| T2.5 | Streaming response optimization | Better UX |
| T2.6 | Citation accuracy improvements | Trust |
| T2.7 | Multi-modal input (images) | Feature |
| T2.8 | Conversation memory | UX |

---

## Phase 3: Frontend Architecture Evolution (Weeks 6-9)

### 3.1 Component System Upgrade
**Priority:** High

| Task | Description | Owner |
|------|-------------|-------|
| T3.1 | shadcn/ui v2 migration | UI Team |
| T3.2 | Design token standardization | Design System |
| T3.3 | Dark mode completion | UI Team |
| T3.4 | Accessibility audit (WCAG 2.1 AA) | QA |

### 3.2 State Management
```
Current (mixed):                    Target (unified):
- useState (local)                  - Zustand (client state)
- Context (auth)                    - TanStack Query (server)
- Jotai (streams)                   - Jotai (derived/computed)
- TanStack Query (server)
```

| Task | Description | Effort |
|------|-------------|--------|
| T3.5 | Consolidate to Zustand + TanStack Query | 2 weeks |
| T3.6 | Remove legacy context providers | 1 week |
| T3.7 | State persistence layer | 3 days |

### 3.3 Route Optimization
| Task | Description | Impact |
|------|-------------|--------|
| T3.8 | ISR for static content routes | Performance |
| T3.9 | Route prefetching strategy | UX |
| T3.10 | Bundle splitting by domain | 30% smaller initial |

---

## Phase 4: Content & Data Pipeline (Weeks 10-12)

### 4.1 Content Management
| Task | Description | Status |
|------|-------------|--------|
| T4.1 | CMS interface for content editors | New |
| T4.2 | Version control for content changes | New |
| T4.3 | Automated content validation | Enhance |
| T4.4 | Multi-language support foundation | New |

### 4.2 Data Layer
| Task | Description | Priority |
|------|-------------|----------|
| T4.5 | Edge caching for content | High |
| T4.6 | CDN optimization | Medium |
| T4.7 | Search indexing (Algolia/Typesense) | High |
| T4.8 | Real-time sync for collaborative features | Medium |

---

## Phase 5: Performance & Scalability (Weeks 13-15)

### 5.1 Frontend Performance
| Metric | Current | Target | Task |
|--------|---------|--------|------|
| First Contentful Paint | ~1.8s | <1.0s | T5.1 |
| Time to Interactive | ~3.5s | <2.0s | T5.2 |
| Bundle size (gzipped) | ~450KB | <300KB | T5.3 |
| Lighthouse Score | ~75 | >90 | T5.4 |

### 5.2 Backend Scalability
| Task | Description | Scaling Factor |
|------|-------------|----------------|
| T5.5 | Function concurrency limits | 10x |
| T5.6 | Database connection pooling | 5x |
| T5.7 | Redis caching layer | Read-heavy ops |
| T5.8 | Rate limiting refinement | Protection |

---

## Phase 6: Developer Experience (Weeks 16-17)

### 6.1 Tooling
| Task | Description | Impact |
|------|-------------|--------|
| T6.1 | Storybook integration | Component docs |
| T6.2 | API client generation | Type safety |
| T6.3 | Enhanced graphify queries | Agent productivity |
| T6.4 | Automated migration scripts | Refactoring |

### 6.2 Documentation
| Task | Description | Priority |
|------|-------------|----------|
| T6.5 | API documentation | High |
| T6.6 | Architecture decision records | Medium |
| T6.7 | Onboarding guide | Medium |
| T6.8 | Contribution guidelines | Low |

---

## Phase 7: Security Hardening (Week 18)

### 7.1 Security Audit
| Task | Description | Status |
|------|-------------|--------|
| T7.1 | Dependency vulnerability scan | Quarterly |
| T7.2 | Penetration testing | Annual |
| T7.3 | Auth flow security review | Bi-annual |
| T7.4 | Content injection prevention | Ongoing |

### 7.2 Compliance
| Task | Description | Required |
|------|-------------|----------|
| T7.5 | Data retention policies | Yes |
| T7.6 | GDPR compliance review | Optional |
| T7.7 | COPPA compliance (if applicable) | Conditional |

---

## Phase 8: Feature Expansion (Ongoing)

### 8.1 AI Features
- Advanced tutoring modes
- Personalized study plans
- Automated quiz generation
- Progress prediction

### 8.2 Community Features
- Study groups
- Peer tutoring
- Discussion forums
- Leaderboards v2

### 8.3 Content Expansion
- Class 9-10 curriculum
- University entrance prep
- Loksewa exam prep
- Skill-based courses

---

## Agent Workflow Integration

### Worktree Branches
Per `BRANCHES.md` — create feature branches:
```
area/upgrade-phase-{N}-{component}
```

### Check Gates
Before any commit:
```bash
npm run check           # Scoped checks
npm run check:all       # Full gate (before main push)
```

### Knowledge Graph Usage
```bash
# Before changes: understand impact
graphify query "what depends on navigation.ts"
graphify path "auth-provider" "billing-service"

# After changes: verify coverage
npm run test:affected -- <paths>
```

---

## Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Regression in auth | Low | Critical | E2E tests, gradual rollout |
| AI provider failures | Medium | High | Fallback chain, monitoring |
| Performance degradation | Low | Medium | Benchmarks, profiling |
| Content pipeline break | Low | High | Build checks, rollback |
| Database migration issues | Low | Critical | Backup, dry-run |

---

## Success Metrics

### Technical
- [ ] 90%+ test coverage on critical paths
- [ ] Lighthouse score >90
- [ ] API response time p95 <200ms
- [ ] Zero critical security vulnerabilities
- [ ] 100% TypeScript strict mode compliance

### Business
- [ ] Page load time reduction 50%
- [ ] User engagement +20%
- [ ] Content delivery reliability 99.9%
- [ ] Developer velocity +30%

---

## Appendix

### File Classification
All changes must classify files:
- **[IMPORTANT CORE FILE]** — Routes, UI, libraries, APIs, tests, build/config
- **[CONTENT FILE]** — Curriculum data under `content/`, `public/data/`

### Key Documentation
- `AGENTS.md` — Agent workflow guide
- `AGENT_RULES.md` — Mandatory rules
- `BRANCHES.md` — Branch workflow
- `CORE_FILES.md` — Route/architecture registry
- `SECURITY.md` — Security policy

### Tools
- **Graphify:** `graphify query`, `graphify path`, `graphify god-nodes`
- **Testing:** Vitest, Playwright
- **Linting:** ESLint, Prettier
- **Types:** TypeScript strict

---

## Approval

| Role | Name | Status |
|------|------|--------|
| Tech Lead | | |
| Product Owner | | |
| Security Review | | |

---

*This plan is a living document. Update as requirements evolve.*
