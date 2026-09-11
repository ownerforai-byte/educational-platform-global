const fs = require("fs");
const letters = {
  title: "Formal & Informal Letters — two registers, two formats",
  unitSlug: "writing-and-composition",
  topicSlug: "formal-and-informal-letters",
  topicTitle: "Formal & Informal Letters",
  relevance: 100,
  notes: [
    "**The core idea — REGISTER:** a letter is formal or informal depending on the RELATIONSHIP with the reader. Same information, different clothes. Choosing the wrong register loses more marks than any grammar slip.",
    "**FORMAL letter — used for:** applications (jobs, scholarships), letters to editors, complaints to authorities, inquiries to institutions, official requests. Reader = someone you do NOT know personally or someone with authority.",
    "**Formal format (in order):** sender's address (top-right or top-left) → date → recipient's name/designation/address → SUBJECT line (one line, the letter in miniature) → salutation 'Dear Sir/Madam' → body (intro → details → expected action) → 'Yours faithfully/sincerely' → full name. NO first names, NO contracted forms.",
    "**Formal body plan — the 3-paragraph rule:** P1 states purpose ('I am writing to apply for...'), P2 gives supporting detail/facts, P3 requests action and closes politely ('I look forward to your response'). Never mix purposes across paragraphs.",
    "**Formal language kit:** 'I am writing to inquire/apply/complain...', 'I would be grateful if you could...', 'Thank you for your consideration.' Replace contractions: cannot, do not, I am. Replace casual words: get→receive, buy→purchase, help→assist.",
    "**INFORMAL letter — used for:** letters to friends, siblings, cousins, close relatives. Reader = someone you address by first name.",
    "**Informal format:** address (top-right) → date → salutation 'Dear Raksha,' → body → closing 'Yours lovingly / With love / Your friend' → first name only. NO subject line, NO recipient's full address, NO formal titles.",
    "**Informal body plan:** open with warmth and acknowledgement ('It's been ages since I heard from you... I was thrilled to get your letter'), develop the main news/topic in a friendly, flowing style, close with regards and an invitation to reply ('Write back soon and tell me all about...').",
    "**Contractions are correct here:** it's, I'm, can't, won't — contractions are a signal of informality and are expected. Formal letters forbid them.",
    "**Compare side by side — asking for information:** Formal: 'I would be grateful if you could send me the prospectus for the coming session.' Informal: 'Could you send me the prospectus when you get a chance? Really curious about the courses!'",
    "**Compare — complaint:** Formal: 'I wish to draw your attention to the poor condition of the road outside our school, which has caused several accidents.' Informal (to a friend about the same): 'You won't believe how terrible the road outside school has become — Rajan actually fell off his bike there last week!'",
    "**Exam marking:** format ~2 (all parts present, correct order), register & tone ~2 (formal stays formal, informal stays warm), content & organisation ~2, grammar ~1. The subject line in formal letters is scored content — never omit it."
  ],
  confusion: [
    "❌ 'Dear Sir' in a letter to your friend. ✅ Informal letters use first names: 'Dear Sita,'.",
    "❌ 'Yours lovingly' in a job application. ✅ Formal closings: 'Yours faithfully' (name unknown) or 'Yours sincerely' (name known).",
    "❌ Subject line in an informal letter. ✅ Subject lines exist ONLY in formal letters.",
    "❌ Contractions in formal letters ('I can't attend'). ✅ Write in full: 'I cannot attend'.",
    "❌ 'Dear Mr. Ram Sir' — mixing title and 'Sir'. ✅ Either 'Dear Mr. Sharma' or 'Dear Sir', never both."
  ],
  examples: [
    "Formal application: introduce yourself → state the post and where you saw it advertised → summarise qualifications → request interview.",
    "Letter to the editor: state the issue → give evidence/examples of its impact → suggest a solution → urge authorities to act.",
    "Informal letter to a cousin: acknowledge their last letter → share your news (exam results, festival) → ask about their life → promise to meet."
  ],
  keyPoints: [
    "Register decides everything: audience first, format second.",
    "Formal = subject line, no contractions, 3-paragraph plan, faithfully/sincerely.",
    "Informal = first name, contractions fine, warm open and close, no subject line.",
    "In formal letters every paragraph has ONE job: purpose → support → action."
  ],
  summary: "Formal and informal letters differ in reader relationship (register), format (subject line, address order, salutation, closing), and language (no contractions vs contractions welcome). Master the 3-paragraph formal plan and the warm informal arc.",
  practiceQuestions: [
    "Write a formal letter to the principal requesting a week's leave for a family function.",
    "Write a letter to the editor about the need for a pedestrian crossing near your school.",
    "Rewrite a given informal letter as a formal complaint — spot every register change needed."
  ]
};
fs.writeFileSync("content/ravikishan/class-11/english/writing-and-composition/concepts/01-formal-and-informal-letters.json", JSON.stringify(letters, null, 2) + "\n");
console.log("formal-and-informal-letters.json created");