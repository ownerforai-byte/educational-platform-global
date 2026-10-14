# Google Play — Data Safety & Monetization Answers

**App:** Ravikisan's Platform
**Date:** 14 October 2026

> Use this to fill the **Data safety** section of Play Console. Every "Yes/No"
> must match the Privacy Policy (`privacy-policy.md`). Where the app is truly
> free with no in-app purchases, the Data Sensitive / Ads answers can be "No".
> Update answers as features change.

---

## A. Data the app collects or shares

### 1. Data collected
- **Name** → Yes (account sign-up, optional)
- **Email address** → Yes (account creation)
- **User ID** → Yes (Supabase account ID)
- **Other content** → Yes (study progress, bookmarks, AI chat/figure history,
  uploaded files) — *include "AI prompts" in "Other content" and note it is
  user-generated study content*
- **App interaction** → Yes (features used, errors/crashes)

### 2. Data shared with third parties (our processors)
- **Supabase** — Name, Email, User ID, Other content (all data we store)
- **Vercel / Render** (hosting) — App interaction / technical logs
- **AI provider** (used by "Veer") — **Prompts / generated content** (Other
  content) and, for a logged-in user, their User ID

> In Play Console, list each third party and tick which of your collected data
> items you share with it. Match the Privacy Policy §5 table.

## B. Data protection practices
- **Is the data encrypted during transit?** → Yes (HTTPS/TLS)
- **Can users delete their data?** → Yes (account deletion; "I can't, I don't
  know" is NOT acceptable — we do support deletion)
- **Is the data deleted when the user deletes their account?** → Yes

## C. Is the data used in ways that are sensitive?
- **Can the data be used to identify a person?** → Yes (Name/Email/User ID)
- **Does the data reveal sensitive info (health, religion, etc.)?** → No
- **Does the data include financial info?** → No (unless you add Play Billing —
  in that case, "Financial info" = No for app-collected data; Google processes
  the payment)

## D. Do you use or collect data from third-party sources?
- If only using our own Supabase/our data → **No**
- If the AI provider returns external web-grounded content → note it under
  "Other content" in section A, not a separate third-party source

## E. Ads
- **Are you running ads?** → **No** (we do not run third-party ad SDKs)
- **Do you use ads in educational content?** → N/A (No)

## F. Monetization (fill only if the app has in-app purchases/subscriptions)
- **Are you using in-app purchases or subscriptions?** → Yes/No
- If **Yes**, complete:
  - The item name(s), price, and whether it's consumable (credits) or
    subscription (premium).
  - Link to your **Purchase / Refund Policy** (`purchase-refund-policy.md`).
- If the app is **currently free**, mark **No** — the Data Safety form
  simplifies and the purchase section is optional.

## G. Data safety declaration checklist
- [ ] All "Yes" answers have a matching Privacy Policy section
- [ ] Third-party names (Supabase, Vercel, Render, AI provider) are spelled
      exactly as registered
- [ ] "Sensitive data" set to No (we collect no health/financial/financial
      identity data from the user directly)
- [ ] "Ads" set to No
- [ ] Monetization answers match whether IAP/subscriptions are actually enabled
- [ ] Data deletion is declared Yes

---

*After filling Play Console, re-read the generated Data Safety section on the
public listing and confirm it matches `privacy-policy.md`.*
