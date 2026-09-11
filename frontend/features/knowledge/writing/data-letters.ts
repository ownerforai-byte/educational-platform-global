import type { WritingType } from "./types";

export const LETTER_TYPES: WritingType[] = [
  {
    id: "letter-formal",
    name: "Formal Letter",
    category: "Letters & Emails",
    icon: "📨",
    marks: "5–6 marks (NEB English)",
    concept:
      "A formal letter is written to someone you do not know personally — an editor, a manager, a bank, a government office. The examiner checks that you follow the fixed BLOCK LAYOUT exactly and keep a polite, business tone. The structure is like a recipe: if every ingredient is in the right place, nothing else matters more.",
    format: [
      {
        label: "1. Sender's address (top left)",
        detail:
          "Write your full address in 2–3 lines, NO name, and do NOT put a comma after your name. Start with house/street, then village/town, then district.",
        example: "Salleri, Solukhumbu",
      },
      {
        label: "2. Date (below address)",
        detail:
          "One line under the address. NEB accepts both styles — use the standard American or British layout but be tidy.",
        example: "5 March 2026",
      },
      {
        label: "3. Recipient's designation + address",
        detail:
          "The receiver's title/role and address. No name is needed — the designation is enough because you don't know the person's identity.",
        example: "The Editor,\nThe Rising Nepal,\nKathmandu",
      },
      {
        label: "4. Subject line",
        detail: "A short phrase summarising the letter's purpose. Always on its own line after the receiver address.",
        example: "Subject: Request for an interview with the chief guest",
      },
      {
        label: "5. Salutation",
        detail: "Formal letters open with 'Dear Sir' or 'Dear Madam' — and then the sign-off changes too (see closing) — so these two steps are a pair.",
        example: "Dear Sir,",
      },
      {
        label: "6. Body (3 short paragraphs)",
        detail:
          "Para 1: introduce yourself + state your purpose. Para 2: give the details/request/complaint clearly in a few sentences. Para 3: close politely, asking for action and thanking.",
        example: "I am a student of grade eleven at … I am writing to request …",
      },
      {
        label: "7. Complimentary close",
        detail:
          "IMPORTANT rule: 'Dear Sir/Madam' → end 'Yours faithfully'; 'Dear Mr/Ms Smith' (a real name) → end 'Yours sincerely'. Then sign and write your full name below, in capitals.",
        example: "Yours faithfully,\n(Your signature)\nRAM THAPA",
      },
    ],
    startings: [
      "I am writing to draw your attention to …",
      "I would like to bring to your notice the matter of …",
      "I am a regular reader of your newspaper and wish to raise a concern…",
      "I am writing to apply for the post of … advertised in …",
    ],
    connectors: [
      "First of all, …",
      "Besides this, …",
      "In addition, …",
      "Moreover, …",
      "I would be grateful if …",
      "I look forward to your prompt response.",
    ],
    example:
      "Kritipur, Kathmandu\n\n12 March 2026\n\nThe Editor,\nThe Himalayan Times,\nKathmandu\n\nSubject: Rising noise pollution in the city\n\nDear Sir,\n\nI am a resident of Kritipur and write to draw the attention of the concerned authorities to the alarming rise in noise pollution in our ward. Daytime traffic and construction create an unbearable din, and loudspeakers are played without permission late into the night. Besides this, schools and hospitals in the locality are severely affected.\n\nMoreover, studies show chronic noise raises stress, disturbs sleep and harms children's learning. I would therefore request the local authorities to implement existing sound-level rules, restrict loudspeaker hours and enforce penalties for violators.\n\nI look forward to your prompt action and remain,\n\nYours faithfully,\nSITA RAI",
    grammar: [
      "Tone = polite but not pleading: use modals 'would', 'could', 'may' ('I would be grateful', 'I could not attend').",
      "Avoid contractions in formal writing: write do not, cannot, I am, not don't, can't, I'm.",
      "Passive voice is natural for formality: 'the matter is being investigated', 'rules are not enforced'.",
      "No need for a closing 'have a nice day' — close with a business sentence like 'I look forward to your favourable response'.",
    ],
    tips: [
      "Copy the block layout exactly — the address→date→receiver→subject→salutation→body→close skeleton is half the marks.",
      "Keep the body under ~120 words. Examiners punish long rambling letters.",
      "Learn the one rule that trips everyone: Dear Sir/Madam ✗ 'Yours faithfully' ≠ Dear Mr/Ms ✗ 'Yours sincerely'.",
    ],
  },
  {
    id: "letter-informal",
    name: "Informal / Personal Letter",
    category: "Letters & Emails",
    icon: "💌",
    marks: "4–5 marks",
    concept:
      "An informal letter goes to someone you know well — a friend, family member. The examiner wants a warm, natural, personal tone. It STILL has a set layout, but the tone is completely different: friendly, relaxed, personal, with contractions and everyday language.",
    format: [
      {
        label: "1. Sender's address",
        detail: "Same as formal — top-left. Many informal letter writers skip it in exams, but NEB mostly accepts it. Include it to be safe.",
        example: "Birgunj\nParsa",
      },
      {
        label: "2. Date",
        detail: "Below the address. Personal letters often put the date on top, in the corner.",
        example: "14 April 2026",
      },
      {
        label: "3. Salutation",
        detail: "You can use first names and warm openings: 'Dear Ramesh,' 'My dear Sita,' 'Dearest Mama,'.",
        example: "Dear Rahul,",
      },
      {
        label: "4. Warm opening",
        detail:
          "Start warmly — ask about them, about their health/family, or mention that you remember them. This is what makes it personal.",
        example: "I hope this letter finds you well. I was so happy to receive your letter last week.",
      },
      {
        label: "5. Main body",
        detail:
          "This is your real content — news, an invitation, a reply to their question, a story. Write naturally, in paragraphs, as if you're chatting.",
      },
      {
        label: "6. Closing lines + sign-off",
        detail: "Wrap up with a warm personal close and a signature with only your first name.",
        example: "Give my love to everyone at home.\nYour loving friend,\nPrakash",
      },
    ],
    startings: [
      "I hope this letter finds you in great spirits.",
      "It's been a while since I wrote — I've been busy with exams.",
      "I was thrilled to read about your success in the competition.",
      "Guess what? Something wonderful happened lately.",
    ],
    connectors: [
      "By the way, …",
      "Anyway, …",
      "On a different note, …",
      "Apart from that, …",
      "The best part was …",
    ],
    example:
      "Kathmandu\n\n16 April 2026\n\nDear Rahul,\n\nI hope this letter finds you in great spirits. It's been ages since we last met, and I keep thinking about our school days. I was so glad to hear from you.\n\nAnyway, I have exciting news — our college is organising a two-day study tour to Pokhara next month, and the class teacher has allowed us to bring one guest each. Would you like to join me? The trip is on 22–23 May, and we'll visit Fewa Lake, the World Peace Pagoda, and the caves. It would be wonderful to have you along, just like old times.\n\nOn a different note, how is your cricket team doing? I read that your school reached the district finals — congratulations! Do write back and let me know if you can come.\n\nGive my love to your family. Looking forward to your reply.\n\nYour loving friend,\nPrakash",
    grammar: [
      "Contractions are allowed and natural here: it's, don't, I'm, we'll.",
      "Question tags create warmth: 'You remember that day, don't you?'",
      "Use a mix of tenses naturally — past for news, present for feelings, future for plans.",
      "Personal tone does NOT mean careless grammar: the letter should still read cleanly.",
    ],
    tips: [
      "Adopt a consistent voice — don't suddenly switch to extremely formal phrases mid-letter.",
      "Answer anything the friend asked you in their last letter — examiners check that you responded.",
      "Keep it within 130 words in exams unless told otherwise.",
    ],
  },
  {
    id: "email-writing",
    name: "Email Writing",
    category: "Letters & Emails",
    icon: "📧",
    marks: "4–5 marks",
    concept:
      "An email is a letter sent digitally — the format borrows the block layout but adds the To/Subject fields. Tone depends entirely on the receiver: formal for a principal/employer, informal for a friend. The examiner mainly checks that the Subject is meaningful and the body is appropriately phrased for the receiver.",
    format: [
      {
        label: "1. To / Cc (from the prompt)",
        detail: "You are usually told the receiver. If not given, invent a sensible email address for the context.",
        example: "To: principal@example.edu.np",
      },
      {
        label: "2. Subject line (always needed)",
        detail:
          "A short, clear phrase — not a full sentence. It is the 'headline' of your email and tells the reader what to expect.",
        example: "Subject: Application for the post of junior clerk",
      },
      {
        label: "3. Salutation",
        detail: "Match the receiver: 'Dear Principal,' for formal, 'Hi Anisha,' for informal. A wrong salutation signals wrong tone.",
      },
      {
        label: "4. Body",
        detail:
          "1–2 short paragraphs. Opening states purpose; middle gives details; closing thanks/requests. Keep each sentence short.",
      },
      {
        label: "5. Closing + signature",
        detail: "Formal: 'Yours faithfully' + full name. Informal: 'Best wishes' / 'See you' + first name. Add phone/class under your name if expected.",
        example: "Yours faithfully,\nSushma Gurung\nClass 11 'A'",
      },
    ],
    startings: [
      "I am writing to inform you that …",
      "I am writing to request information about …",
      "Hope you are doing well — I wanted to share some great news about …",
    ],
    connectors: [
      "Regarding your offer, …",
      "As requested, …",
      "Please find attached …",
      "Do not hesitate to …",
      "I would appreciate an early reply.",
    ],
    example:
      "To: principal@jup.edu.np\nSubject: Request for leave of absence\n\nDear Principal,\n\nI am writing to request leave for two days, from 10 to 11 May, as I must attend my sister's wedding in my home village.\n\nI have already copied the week's notes from a classmate and will submit all missed assignments on my return. I would be grateful for your permission.\n\nThank you for your kind consideration.\n\nYours faithfully,\nSushma Gurung\nClass 11 'A'",
    grammar: [
      "Register decides grammar: the SAME message changes formality — 'could you please' vs 'can you', 'I require' vs 'I need'.",
      "Present perfect introduces news: 'I have prepared…', 'We have scheduled…'.",
      "Impersonal openings distance politely: 'It has been noted that…', 'This is to inform you that…'.",
      "Use short crisp sentences; long paragraphs look unprofessional in email.",
    ],
    tips: [
      "Always write a real Subject — 'Queries' as a subject reads as lazy in an exam.",
      "Decide formal/informal FIRST and keep it consistent in salutation + body + closing.",
      "For job/leave emails, end with a courteous request for reply.",
    ],
  },
];