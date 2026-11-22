# Website Resources — free academic sources for images, notes and content

> Purpose: one-stop reference so future sessions never roam for resources again.
> Scope: **free only** (no paywalls, no paid tiers), and **agent-accessible** (no login wall, no hard JS-only gate; direct fetch, API or downloadable file preferred).
> Last verified: 2026. Re-check a site before relying on a new workflow.

---

## 1. Golden rules before using any site

1. **Never use Google Images / random web images.** License is unverifiable and copying is a copyright risk. Use the openly-licensed sources below instead.
2. **Check the license tag on every asset**: `Public domain` / `CC0` → free to reuse; `CC BY` / `CC BY-SA` → reuse with attribution; anything marked "all rights reserved" → do **not** copy, use only as reading reference.
3. **Prefer APIs over scraping**: Wikipedia/Wikimedia, PubChem, Openverse and RCSB all have free REST APIs — use those from agents.
4. **For this repo's figures**: our figures are **original textbook-convention SVGs** (theme-aware, license-clean). External sources are for **reference reading and verification of conventions**, not for hot-linking or copying pixels.

---

## 2. Images & diagrams (openly licensed, agent-fetchable)

| Site | URL | What you get | License | Agent access |
|---|---|---|---|---|
| **Wikimedia Commons** | https://commons.wikimedia.org | Millions of scientific diagrams (orbitals, structures, apparatus, biology), maps, SVG/PNG | CC BY-SA / CC0 / PD (per file) | Free API: `https://commons.wikimedia.org/w/api.php` — search, get file URLs, download directly |
| **Wikipedia** | https://en.wikipedia.org | Same media pool plus concise verified text per topic | CC BY-SA | Free REST API (`/w/api.php`, `Special:FilePath/<File>` serves the raw image) |
| **Openverse (CC Search)** | https://openverse.org | Federated search across CC-licensed images from many collections | CC-licensed only | Free API: `https://api.openverse.org/v1/` (no key for light use) |
| **NIH Flickr albums** | https://www.flickr.com/photos/nihgov/albums | Public-health and biomedical images | Mostly PD/CC (check per album) | Direct image fetch |
| **CDC Public Health Image Library (PHIL)** | https://phil.cdc.gov | Microbiology, disease, lab imagery | Mostly PD | Direct fetch |
| **Biodiversity Heritage Library** | https://www.biodiversitylibrary.org | Historic natural-history plates and illustrations | PD (pre-1929 scans) | Free API + IIIF images |
| **NASA Image Library** | https://images.nasa.gov | Space/earth-science imagery | Mostly PD | Free API |
| **Pexels / Unsplash / Pixabay** | https://pexels.com · https://unsplash.com · https://pixabay.com | General **photos** (lab glassware, nature) — not technical diagrams | Their own free licenses | Direct fetch; good for hero/banner photos only |

> Best default for academic diagrams: **Wikimedia Commons first**, then Openverse search, then CDC/NIH for biomedical.

---

## 3. Chemistry-specific (structures, data, reference)

| Site | URL | What you get | License | Agent access |
|---|---|---|---|---|
| **PubChem** | https://pubchem.ncbi.nlm.nih.gov | Compound structures, properties, safety; **ready-made 2D/3D structure images** | PD (US Gov data) | **PUG REST** — e.g. `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2244/PNG` (also `?image_size=500x500`, `record_type=3d`); name→CID lookup free |
| **NIST Chemistry WebBook** | https://webbook.nist.gov/chemistry | Thermochemical, spectra, ion-energetics data | PD (US Gov) | Direct URL fetch per compound |
| **Chemistry LibreTexts** | https://chem.libretexts.org | University-grade chemistry text library (general, organic, analytical, bio) | CC BY-NC-SA unless noted | MediaWiki API + direct page fetch |
| **MolView** | https://molview.org | Draw/inspect 2D & 3D molecules in browser | Free tool | Use for **sketching reference structures**, not bulk fetch |
| **Ptable** | https://ptable.com | Interactive periodic table with trends | Free to view | Reference while writing periodicity content |
| **ChemCollective** | https://chemcollective.org | Virtual labs, tutorials (CMU) | CC BY-NC-SA | Page fetch |
| **Chemistry2u API** | https://chemistry2u.com/api/ | Lessons + quizzes as JSON (keyless, CORS-open) | CC-licensed (see `meta`) | REST: `/api/v1/lessons`, `/api/v1/search?q=` |
| **RCSB Protein Data Bank** | https://www.rcsb.org | 3D macromolecule structures | CC0 (data) | Free REST/GraphQL API |

---

## 4. Textbooks, notes & structured content (free, open-licensed)

| Site | URL | What you get | License | Agent access |
|---|---|---|---|---|
| **OpenStax** | https://openstax.org | Peer-reviewed full textbooks: **Chemistry 2e, Chemistry: Atoms First, Biology 2e, University Physics, Concepts of Biology** — with worked examples and end-of-chapter questions | CC BY 4.0 | **Direct HTML/PDF download per chapter** — no login, fetchable |
| **LibreTexts** (all fields) | https://libretexts.org | Huge multi-institution library: chemistry, biology, physics, maths | CC BY-NC-SA (mostly) | Direct page fetch + MediaWiki API |
| **NCERT textbooks** | https://ncert.nic.in/textbook.php | **Class 11–12 Chemistry, Physics, Biology, Maths** official Indian textbooks — closest free match to NEB syllabus depth | Free PDFs | Direct chapter PDF download |
| **CDC Nepal (Curriculum Development Centre)** | https://moecdc.gov.np | Nepal's own curriculum + textbooks (NEB-aligned) | Free (Govt) | Direct PDF fetch |
| **Khan Academy** | https://khanacademy.org | Chemistry/physics/biology lessons, articles, practice | Free (CC BY-NC-SA content) | Page fetch; some content needs JS — prefer articles over embedded players |
| **MIT OpenCourseWare** | https://ocw.mit.edu | Full university courses: notes, assignments, **with solutions** | CC BY-NC-SA | Direct page/PDF fetch |
| **Open Textbook Library** | https://open.umn.edu/opentextbooks | Catalogue of reviewed open textbooks | Various CC | Direct fetch |
| **OER Commons** | https://oercommons.org | Multi-discipline OER repository (lessons, activities) | CC | Direct fetch |
| **MERLOT** | https://www.merlot.org | Peer-reviewed learning materials index | Various | Direct fetch |
| **OASIS** | https://oasis.geneseo.edu | Meta-search across ~79 OER sources | — | Direct fetch |
| **Wikibooks** | https://en.wikibooks.org | Community textbooks (Organic Chemistry, General Chemistry) | CC BY-SA | MediaWiki API |
| **CK-12** | https://www.ck12.org | K-12 science/maths flexbooks with practice | CC BY-NC | Page fetch |
| **BCcampus Open Collection** | https://collection.bccampus.ca | Reviewed open textbooks | CC | Direct fetch |
| **Saylor Academy** | https://www.saylor.org | Free full courses with readings | CC BY | Direct fetch |
| **The Free High School Science Texts / Siyavula** | https://www.siyavula.com | Gr 10–12 physical science texts | CC BY | Direct fetch |

> Best default for NEB Class 11–12 depth: **NCERT PDFs + OpenStax Chemistry 2e + Chemistry LibreTexts**.

---

## 5. Practice questions & assessment material

| Site | URL | Notes |
|---|---|---|
| **OpenStax** end-of-chapter problems | per-book pages | Free, with selected solutions |
| **MIT OCW** assignments/exams | https://ocw.mit.edu | With solutions — good for harder numericals |
| **Khan Academy** practice sets | per-topic pages | Interactive; fetchable text |
| **Chemistry2u quiz API** | https://chemistry2u.com/api/ | Quiz JSON with worked solutions, keyless |
| **NCERT exemplar problems** | https://ncert.nic.in/exemplar-problems.php | Class 11–12 science exemplars, free PDF |

> Repo rule stands: **only verified PYQs** from `content/practice/questions/...` get the "NEB YYYY (verified PYQ)" label; anything sourced from these sites is labelled **"NEB-style practice"**.

---

## 6. Quick agent-access cheat-sheet

| Need | First choice | Call |
|---|---|---|
| Academic diagram (e.g. "benzene resonance") | Wikimedia Commons | `commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=...` → fetch file via `Special:FilePath` |
| Chemical structure image | PubChem | `pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/benzene/PNG?image_size=500x500` |
| Compound properties/data | PubChem PUG REST / NIST WebBook | name→CID→properties JSON |
| Textbook passage (chemistry) | OpenStax Chemistry 2e / LibreTexts | direct HTML fetch of chapter page |
| Class 11 syllabus-level text | NCERT PDF | direct chapter PDF download |
| CC image search across collections | Openverse | `api.openverse.org/v1/images/?q=...` |
| Quiz/lesson JSON | Chemistry2u | `/api/v1/search?q=...` |
| Nepal curriculum alignment | CDC Nepal / NCERT | direct PDF |

---

## 7. Attribution quick-templates

- Wikimedia/Wikipedia image: `Image: <Title> by <Author>, via Wikimedia Commons, CC BY-SA 4.0`
- OpenStax: `Adapted from OpenStax Chemistry 2e (CC BY 4.0), openstax.org`
- NCERT: `Based on NCERT Class 11 Chemistry, Chapter N (free textbook, ncert.nic.in)`
- PubChem: `Structure image from PubChem (CID xxxx), U.S. National Library of Medicine, public domain`

---

## 8. Sites deliberately NOT listed (and why)

- **Google Images / Bing Images** — license unverifiable, copying risk.
- **Chegg, Course Hero, Scribd, Quizlet Plus, Photomath paid tiers** — paywalled.
- **Publisher sites (Pearson, McGraw-Hill Connect, WileyPLUS)** — paid/login.
- **ResearchGate full-texts of paywalled papers** — legally grey; use arXiv/ChemRxiv instead (https://arxiv.org, https://chemrxiv.org — free, open access).
