# Privacy Policy — Ravikisan's Platform

**Last updated:** 14 October 2026
**Effective date:** 14 October 2026
**Website:** https://ravikisan.vercel.app
**Contact:** ravikisan1814@gmail.com

> This policy explains what information Ravikisan's Platform ("the App", "we", "us")
> collects, why, and what choices you have. It is written for Google Play review
> and for students. Where a specific developer/legal name is shown in brackets
> `[LIKE_THIS]`, replace it with the real value before submitting to Play.

---

## 1. Who we are

Ravikisan's Platform is a free, offline-capable study service for **NEB Class 11 & 12
(Nepali +2)** students in Nepal. It provides curriculum-aligned notes, interactive labs,
past-year questions, and an AI study assistant ("Veer").

- **Operator / developer:** `Ravikisan`
- **Country:** Nepal
- **Support email:** ravikisan1814@gmail.com
- **App data store (for Data Safety form):** `ravikisan1814@gmail.com`

## 2. Information we collect

### Account information (required to create an account)
When you sign up we collect:
- Full name (optional)
- Email address (required)
- A password (stored only as a one-way cryptographic hash — we never see it)

Accounts are provisioned as **pending** and activated after administrative approval.

### Usage and learning information (only with an account)
- Your study progress, completed topics, and study statistics
- Bookmarks / saved resources
- AI chat history and generated figures/images you create
- Uploaded files (notes/resources) you or a teacher uploads
- Lab and quiz activity data

### AI-assistant data
When you use the AI tutor or AI features, your prompts and the AI-generated responses
are sent to a **third-party AI provider** (see §5) to produce answers and figures.
Your study content is used to ground those answers. We do not sell your prompts.

### Device and technical information
- Browser/app type, device and OS version, screen size (used for mobile layout)
- Crash and error reports (technical logs only, no personal content)

## 3. How we use your information

- To create, secure, and manage your account (including login sessions and
  automatic sign-in via refresh tokens)
- To provide the study content, labs, quizzes, and AI features
- To track your learning progress and keep your bookmarks
- To keep the service safe (rate-limiting abuse, blocking malicious traffic)
- To operate the service on our infrastructure providers (see §5)

## 4. How we store and protect it

- Account and learning data is stored on **Supabase** (hosted PostgreSQL, auth,
  and file storage). Supabase is our processor for this data.
- We use industry-standard protections: encrypted connections (HTTPS/TLS),
  hashed passwords, per-user data isolation (row-level security), strict CORS,
  and per-IP rate limiting.
- In production, session cookies are flagged `secure` and `httpOnly`.
- We limit who can access your data to the account owner and approved admins.

## 5. Who we share it with (our processors)

We do **not sell** personal data. We use the following third-party service
providers to operate the App. Each processes data under standard agreements and
only to the extent needed to run the service:

| Provider | What it handles | Role |
|---|---|---|
| **Supabase** (auth, database, storage, transactional email) | Accounts, learning data, uploads, password emails | Processor / data host |
| **Vercel** | Hosts the front-end web app | Hosting provider |
| **Render** | Hosts the back-end API server | Hosting provider |
| **AI provider** (LLM + image generation used by "Veer") | AI prompt/response processing to produce answers & figures | Third-party AI service |

Data may be processed and stored on servers located in **multiple countries**,
including **Nepal** and **India/US** data centers depending on the provider.

## 6. Cookies and session storage

We use `httpOnly` session cookies (an access token and a 30-day refresh token)
to keep you signed in. This is a **functionally essential** use only — we do
not run third-party advertising or analytics cookies. See the **Cookie Policy**
for details.

## 7. Data we do NOT collect

- We do not collect advertising or marketing identifiers.
- We do not run third-party analytics or advertising trackers.
- We do not collect precise GPS location.
- We do not sell or share data for advertising.

## 8. Your rights

Subject to applicable law, you can:
- **Access** your data (your profile, progress, and history pages)
- **Correct** your name / account details
- **Delete** your account and associated data
- **Export** your learning records

To exercise any of these, email **ravikisan1814@gmail.com** from your account
address. We will respond within a reasonable time.

## 9. Children's privacy

The App is a general study tool for +2 (secondary-school) students. We do not
knowingly collect personal information from children under 13, except standard
account details created under parental guidance. If you believe a child's data
was collected by mistake, contact us and we will delete it.

## 10. Data retention

- Account + learning data: kept while your account exists; deleted on request.
- AI chat / figure history: kept with your account; cleared on deletion.
- Uploaded files: kept until you or a teacher/admin removes them.

## 11. Security

We use reasonable safeguards, but no method of transmission or storage is 100%
secure. Report vulnerabilities to ravikisan1814@gmail.com.

## 12. Changes to this policy

We may update this policy. Material changes will be reflected on this page with
a new "Last updated" date. Continued use of the App after changes means you accept
the updated policy.

## 13. Contact

**Email:** ravikisan1814@gmail.com
**Address:** `Kalaiya-25, Bara, Madhesh Province, Nepal`

---
*This policy supports the Google Play Data Safety declaration. If anything in the
Data Safety form (see `data-safety.md`) changes, update this policy to match.*
