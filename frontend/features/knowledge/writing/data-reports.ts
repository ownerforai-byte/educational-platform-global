import type { WritingType } from "./types";

export const REPORT_TYPES: WritingType[] = [
  {
    id: "report-writing",
    name: "Report Writing",
    category: "Reports & Articles",
    icon: "📰",
    marks: "5–6 marks (NEB English)",
    concept:
      "A report tells a reader what happened at an event — sports day, blood donation camp, science exhibition — in a factual, third-person, past-tense style. It is NOT a story and NOT an opinion; it is newspaper-style factual writing. Two fixed layouts feature in exams: newspaper report and school magazine/notice-style report.",
    format: [
      {
        label: "1. Headline (bold, catch the eye)",
        detail:
          "A short title summarising the event. Under it, newspapers add a 'byline' and sometimes place + date. Capturing the 'who, what, where, when' early is the winning move.",
        example: "Annual Sports Day Celebrated with Splendour",
      },
      {
        label: "2. Byline (+ place, date for newspaper reports)",
        detail:
          "Newspaper reports carry 'By a Staff Reporter' or a writer name; exams often start the body with \"Kathmandu, 12 May:\" style dateline. A school-report usually opens straight with the purpose.",
        example: "By a Staff Reporter\nKathmandu, 12 May: …",
      },
      {
        label: "3. Opening paragraph — 5 Ws compressed",
        detail:
          "The FIRST paragraph answers WHO did WHAT, WHERE, WHEN, and WHY — in 2–3 sentences. This is the 'lead'. Do not make the reader dig for the essentials.",
      },
      {
        label: "4. Body — chronological highlights",
        detail:
          "Describe the event in sequence: inauguration, chief guest, main activities, participants, results. Use vivid nouns and verbs; stay third-person.",
      },
      {
        label: "5. Quotation / reaction (adds authenticity)",
        detail:
          "A short line from the chief guest or organiser ('In his address, the principal remarked that…') shows the report is eyewitness-based and earns full marks.",
      },
      {
        label: "6. Closing — outcome/remark",
        detail:
          "End with the conclusion/result of the event or a forward statement, then sign off '— Rep.' or the writer's initials when asked.",
      },
    ],
    startings: [
      "A [event] was organised on [date] at [venue] in order to …",
      "[School/College] held its [event] on [date], bringing together …",
      "The inauguration ceremony began with …",
      "More than [number] participants took part in …",
    ],
    connectors: [
      "The programme commenced with …",
      "In his/her opening remarks, …",
      "Following this, …",
      "The highlight of the event was …",
      "The ceremony concluded with …",
    ],
    example:
      "Annual Sports Day Celebrated with Splendour\n\nKathmandu, 12 May: Suryodaya Higher Secondary School organised its annual sports day on 11 May in its college grounds. The chief guest, the Ward Chairperson, hoisted the flag and declared the meet open.\n\nThe programme commenced with a colourful march-past by four houses, followed by a thrilling tug-of-war and a 100-metre sprint final. The highlight was the long-jump competition, in which the school's team leader broke the school record with a leap of 5.9 metres.\n\nIn his closing address, the principal remarked that sports build discipline and spirit as much as academics, and congratulated all winners. Trophies and certificates were distributed by the chief guest, and the ceremony concluded with the national anthem. — Staff Reporter",
    grammar: [
      "Past simple carries every main event: 'was organised', 'concluded' — never switch to present mid-report.",
      "Passive voice is standard for ceremony facts: 'the meet was opened', 'trophies were distributed'.",
      "Third-person only — never 'I'. Even witnesses phrase as 'the writer observed'.",
      "Reported speech for quotes: 'he remarked that sports build discipline…' (tense shifts back).",
      "Sequence connectors keep chronology clear: commenced, followed, subsequently, at last.",
    ],
    tips: [
      "Own the 5-Ws lead: examiners literally scan the first two lines for who/what/where/when.",
      "Write in ONE tense zone (past), one voice (third-person), one register (neutral-formal).",
      "2 marks are usually layout-specific: keep the headline, byline, and sign-off.",
    ],
  },
  {
    id: "article-writing",
    name: "Article Writing",
    category: "Reports & Articles",
    icon: "📝",
    marks: "5–8 marks",
    concept:
      "An article is your informed OPINION on a contemporary issue — pollution, social media, student life — published for readers. Unlike a report, it carries a viewpoint and persuasive tone, and unlike an essay, it speaks to a general audience with a hook that keeps them reading. It is 'newspaper essay'.",
    format: [
      {
        label: "1. Striking heading",
        detail:
          "Short, catchy, and thematic — a question, a bold statement, or a phrase with punch. It must make the reader want the article.",
        example: "Why Our Rivers Are Crying",
      },
      {
        label: "2. Byline (name)",
        detail: "Often 'By [Your Name]' right under the heading. Exams ask you to write for a magazine/newspaper — supply a plausible byline.",
      },
      {
        label: "3. Introduction — hook + stance",
        detail:
          "Open with a startling fact, a question, a short anecdote, or a scenario. End the intro by introducing the issue and your angle.",
      },
      {
        label: "4. Body — 2–3 developed points",
        detail:
          "Each body paragraph: ONE point (cause/effect/solution) built as topic sentence + explanation + example. Vary your approach — data, personal observation, what experts say.",
      },
      {
        label: "5. Conclusion — call to action / thought",
        detail:
          "Close with a memorable appeal, a question to the reader, or an invitation to act. Articles should leave the reader with something.",
      },
    ],
    startings: [
      "Every morning, thousands of commuters breathe air that harms them — and no one speaks for them.",
      "Have you ever wondered why …?",
      "The numbers are staggering: …",
      "Not long ago, [place] was …; today it is …",
    ],
    connectors: [
      "According to experts, …",
      "Equally concerning is …",
      "On the other hand, …",
      "The solution, however, is not beyond us …",
      "In the end, …",
    ],
    example:
      "Why Our Rivers Are Crying\n\nBy Anisha Sharma\n\nEvery Dashain, thousands of families stream to the riversides to pray — but how many realise the water they bow to is already sick? Our rivers, which once carried life from the Himalayas to the sea, are today choked with plastic, sewage and industrial waste. This is not merely an aesthetic problem; it is a health emergency unfolding slowly.\n\nConsider the Bagmati alone. Although it is venerated as sacred, sections of it test at pollution levels that make bathing unsafe. According to experts, most of this damage comes from unregulated factory discharge and raw sewage dumped directly into the stream. Equally concerning is the steady flow of non-biodegradable plastic, which clogs the waterways and harms fish and birds.\n\nOn the other hand, the solution is not beyond us. Rivers in cities like Singapore and Seoul were revived through treatment plants, public campaigns, and strict fines. Nepal already has such laws; what is missing is enforcement and civic habit.\n\nIn the end, a river is a community's biography. If we keep writing ours in garbage, future generations will inherit a story of neglect. The choice is ours — we can restore the rivers, or watch them cry silent, chemical tears.",
    grammar: [
      "Present simple states general truths: 'our rivers are choked', 'plastic clogs the waterways'.",
      "Rhetorical questions engage the reader: 'but how many realise…?', 'what is missing is…'.",
      "Concessive clauses show balance: 'Although it is venerated…, sections of it test…'.",
      "Modals of recommendation: 'can be revived', 'we can restore' — measured, not shouting.",
      "Parallel structures add rhythm to lists: 'choked with plastic, sewage and industrial waste'.",
    ],
    tips: [
      "Write a heading that would make YOU read the article if you saw it on a newspaper page.",
      "Articles are persuasive but fair: acknowledging the other side ('on the other hand') wins marks.",
      "End with action, not a shrug — a call to responsibility feels like a real article.",
    ],
  },
];