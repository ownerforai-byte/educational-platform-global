# UX-visual findings — Community feed (production, signed in as owner)

Environment: https://harindrasah.com.np/ai/community · Chrome 158 · 1440×900 + 390×844 · signed-in session (owner).
Benchmarks: Twitter/X, Facebook, Instagram.

## What is already good
- Three-column shell (sections nav / feed / discovery rail) matches Twitter's layout grammar; sticky rail works.
- Post cards have clean hierarchy: type pill → author → badges → title → body → action row with counts.
- Comment threading (tight indent, border-l-2) reads like X replies; context labels render on replies.
- Composer has Write/Preview + markdown toolbar + attachment rules; Publish is prominent.
- Notifications rows have actor name bolding, kind icons, unread dots, Mark-all-read.
- No horizontal overflow at 390px; no offscreen primary content; overlap list is small.

## Findings (clustered)

### A. Comment row header (PostAuthorHeader compact) — highest severity
- **A1 BUG:** When a profile has no username, the handle slot renders a raw Firebase uid prefix as a link — observed `Rocky Sah [Creator] HoI3UrsD`. Looks broken; leaks internal ids.
- **A2 BUG/UX:** Comment timestamps render absolute ("Nov 23, 2026, 2:40 PM") while post rows use relative ("3m", "2h"). Inconsistent and verbose in a compact row.
- **A3 Clutter:** Every comment row carries a "View profile" link — X/Facebook never do this; the name already links.
- **A4 Gap vs X:** Comments have no Like action (posts do). Twitter's reply row is `Reply · Like · time`.

### B. Feed density & controls
- **B1:** Subject filter chips ("All/General/Physics…") measure 22px tall — below the 24px minimum target; audit flagged all of them.
- **B2:** Sort tabs row ("Latest/No comments/Following/Solved") has uneven widths (63/112/84/66) — acceptable for text tabs, no fix.
- **B3:** Action-row icons read ~12–16px on mobile; hit areas are 36px (min-h-9) so taps are safe, but the icons look faint vs X. Small bump justified.

### C. Mobile floating clutter (390×844)
- **C1:** Focus-timer button (`fixed left-6 bottom`) overlaps the post action row on phones. Root-layout component; should hide on <sm.
- **C2:** "Go back" fixed button + "Quick tools" pill both sit bottom-right and compete with the bottom nav. "Go back" is redundant on mobile (bottom nav + browser back).
- **C3:** No floating compose button on mobile; "+ New post" is inside the panel header. X uses a persistent FAB. (Defer — bottom nav "Community" tab + New post is acceptable; FAB is a bigger change.)

### D. Content defect (data, not CSS)
- **D1:** The bot's public welcome post body contains an admin note: "…[add GOOGLE CSE API KEY for…". Leaks setup instructions into the public feed. Fix the row in the DB.

### E. Composer (lower priority)
- Native file input ("Choose Files / No file chosen") looks dated vs styled dropzones. Defer.
- No avatar/audience row like FB compose. Defer — form is clear and functional.

### Won't fix / matches platform norms
- Right rail starting at y=93 vs feed heading y=125 — sticky `top-20` is standard (X aligns rail to column top, not first item).
- Low-contrast "ratio 1.05" hits on primary buttons/logo "R" — false positives (gradient/brand backgrounds).
- Off-scale spacing values 6/10/14 — internal to one component family, consistent within it.

## Decisions
- Implement: A1, A2, A3, B1, B3, C1, C2, D1 now.
- Implement this round if budget allows: A4 (comment likes: migration 034 + endpoints + UI).
- Defer: C3 (FAB), E1 (file input), E2 (composer avatar row).
