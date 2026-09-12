import type { WritingType } from "./types";

export const TEXTUAL_TYPES: WritingType[] = [
  {
    id: "summary-writing",
    name: "Summary Writing",
    category: "Textual Skills",
    icon: "📝",
    marks: "4–5 marks",
    concept:
      "A summary compresses a longer passage into its CORE ideas in your own words, usually within a word limit. It is not a copy-paste or a list of fragments — it is a small, complete, well-written paragraph that captures the author's main point and key supports without examples/repetition.",
    format: [
      {
        label: "1. Read once for gist",
        detail:
          "First read = find the main point. The main idea is usually in the first or last sentence of each paragraph — collect those, then discard the examples.",
      },
      {
        label: "2. Underline key ideas (2nd read)",
        detail:
          "Highlight the words that carry meaning: the topic, the claim, the reasons, the conclusion. Ignore statistics, anecdotes, and repeated calls to action.",
      },
      {
        label: "3. Draft in your own words",
        detail:
          "Write a paragraph that begins with the author's main idea, then follows with 2–4 most important supporting points. Change vocabulary and break long sentences.",
      },
      {
        label: "4. Respect the word limit",
        detail:
          "NEB often says 'in about 80 words'. Count as you edit: cut modifiers and examples, never cut the conclusion/main idea.",
      },
      {
        label: "5. Self-check",
        detail:
          "Reread your summary against the original — same meaning? No copied phrases? No new opinions? Tense consistent? Then it passes.",
      },
    ],
    startings: [
      "The passage argues that …",
      "In essence, the text explains how/why …",
      "According to the writer, …",
      "The main point of the passage is that …",
    ],
    connectors: [
      "First, …",
      "More importantly, …",
      "In addition, …",
      "However, …",
      "In conclusion, …",
    ],
    example:
      "Original (abridged): 'Plastic pollution has become one of the greatest environmental threats, because single-use plastic takes centuries to decompose and breaks into microplastics that enter food and water. Although recycling is often promoted, only a small fraction of plastic is actually recycled, while the rest ends up in landfills or the ocean. The solution, many experts argue, lies not only in better waste management but in reducing plastic production at the source.'\n\nSummary (~50 words): The passage argues that plastic pollution poses a serious environmental threat, as plastic decomposes very slowly and fragments into microplastics that contaminate food and water. Because recycling handles only a small share, experts maintain that the real solution is to reduce plastic production itself, not merely manage waste.",
    grammar: [
      "Paraphrasing grammar = 4 moves: synonym swap (threat→danger), word-class change (pollute→pollution), voice change (active→passive), sentence merge.",
      "Keep the ORIGINAL tense skeleton: present-simple claims stay present-simple in the summary.",
      "Report verbs structure the summary: 'the passage argues', 'experts maintain', 'the writer claims'.",
      "Compress by deleting: modifiers, examples, 'there is/are' frames — never delete the conclusion.",
    ],
    tips: [
      "Write the summary WITHOUT looking at the passage — if you can, you understood it.",
      "Stay inside the limit: underline your draft's word count as you edit.",
      "Never add your own opinion — a summary is the author's idea, not yours.",
    ],
  },
  {
    id: "note-making",
    name: "Note-making",
    category: "Textual Skills",
    icon: "🗂️",
    marks: "4 marks",
    concept:
      "Note-making turns a passage into a neat structural outline: a title, numbered headings, indented sub-points, and abbreviations. It is a STUDY skill that appears in NEB exams — the examiner checks that you can identify the backbone of a text (headings) and pack each with compact facts.",
    format: [
      {
        label: "1. Title",
        detail: "A short title that captures the WHOLE passage in a few words.",
        example: "CAUSES OF DEFORESTATION",
      },
      {
        label: "2. Sub-headings (numbered 1, 2, 3…)",
        detail:
          "Identify the 3–4 main blocks of the passage, and label each with a noun-phrase subheading, not a full sentence.",
        example: "1. AGRICULTURAL EXPANSION",
      },
      {
        label: "3. Points under each sub-heading (a, b, c…)",
        detail:
          "Under each heading, list compact KEY-PHRASE points (not sentences). Indent them clearly; keep each row short.",
        example: "a. slash-and-burn farming   b. soil exhaustion → new burning",
      },
      {
        label: "4. Abbreviations & symbols",
        detail:
          "Use standard abbreviations and arrows to save space: e.g., i.e., etc., →, &, w/, b/c. Add 'Abbreviations used' at the end if the exam asks.",
      },
      {
        label: "5. Summary sentence (optional)",
        detail:
          "Some exam formats ask for a 'summary' after the notes. Write one tidy line capturing the whole text's message.",
      },
    ],
    startings: [
      "TITLE: [topic in caps]",
      "1. [FIRST MAIN IDEA]",
    ],
    connectors: [
      "→ (leads to)",
      "& (and)",
      "w/ (with)",
      "e.g./i.e.",
      "b/c (because)",
      "vs (against)",
    ],
    example:
      "TITLE: CAUSES OF DEFORESTATION\n\n1. AGRICULTURAL EXPANSION\na. slash-&-burn farming → permanent fields\nb. soil exhaustion → new forest burning\n\n2. INFRASTRUCTURE GROWTH\na. roads cut through forest\nb. dams & settlements fragment habitat\nc. new roads open areas for further clearing\n\n3. COMMERCIAL TIMBER TRADE\na. logging removes tallest trees\nb. illegal exports → weak regulation\n\n4. COMBINED EFFECT\na. factors feed each other\nb. Terai forests shrank sharply in one lifetime\n\nAbbreviations: & (and), → (leads to).",
    grammar: [
      "Nominalise verbs for headings: 'agricultural expansion', not 'farmers expand agriculture'.",
      "Drop articles and auxiliaries in points: 'roads cut through forest', not 'The roads are cutting…'.",
      "Arrow + compact phrase syntax is the note-maker's grammar: 'soil exhaustion → new burning'.",
      "Consistent capitalisation (headings in CAPS, points lowercase) shows organisational control.",
    ],
    tips: [
      "Count the passage's paragraphs — that usually equals your number of sub-headings.",
      "Keep every point under 7 words; if it reads like a sentence, it is not a note.",
      "Always fill the title — a missing title is an automatic mark lost in some rubrics.",
    ],
  },
  {
    id: "comprehension",
    name: "Comprehension / Unseen Passage Answers",
    category: "Textual Skills",
    icon: "🔎",
    marks: "10+ marks (Section A paper 1)",
    concept:
      "Comprehension questions test whether you can extract and restate information from a passage. The trap students fall into is COPYING whole sentences. The skill is: locate the relevant line, then ANSWER in your own words, in complete but concise sentences, matching the question's demand.",
    format: [
      {
        label: "1. Skim the passage first",
        detail: "30-second skim for gist: topic, key names/dates/numbers, structure. Then read each question.",
      },
      {
        label: "2. Scan for the question's keywords",
        detail:
          "Find the sentence in the passage that contains the question's main words. The answer sits in that neighbourhood almost always.",
      },
      {
        label: "3. Restate in your own words",
        detail:
          "Answer in a complete sentence using synonyms and flipped structures — this proves understanding and avoids 'copying' penalties.",
      },
      {
        label: "4. Match the question type",
        detail:
          "WH- question → answer the WH. 'Why…?' → start 'Because…'. 'Define…' → give the definition. 'True/false with justification' → quote the evidence line.",
      },
      {
        label: "5. Verify against the passage",
        detail: "Reread your answer with the passage beside it — every claim you make must be supported by the text. No invention.",
      },
    ],
    startings: [
      "The passage states that …",
      "According to the writer, …",
      "This is because …",
      "In the text's view, …",
    ],
    connectors: [
      "This is supported by …",
      "Which is shown when …",
      "As the writer notes, …",
      "In other words, …",
    ],
    example:
      "Passage line: 'The Yeti, or Abominable Snowman, is a mythical creature said to dwell in the Himalayas; despite decades of expeditions, no scientific evidence of its existence has ever been confirmed.'\n\nQ. What is the Yeti, according to the passage?\nA. The Yeti is a legendary Himalayan creature that, according to the text, no expedition has scientifically proven to exist.\n\nQ. Why has it remained unconfirmed?\nA. Because, as the passage notes, decades of expeditions have failed to produce any scientific evidence of its existence.",
    grammar: [
      "Sentence-frame grammar: convert passage nouns into clauses ('its existence' → 'that it exists').",
      "Report structures distance you from copying: 'the passage claims…', 'the writer argues…'.",
      "Tense lift from passage: if the passage is about a timeless claim, keep present; if past event, keep past.",
      "Quote marks only for exact evidence lines when a question demands 'quote from the passage'.",
    ],
    tips: [
      "Answer length = question demand: 1-mark answers are one sentence; 2-mark answers add a reason/evidence.",
      "Do not echo the question's wording; use your own.",
      "For 'in your own words' questions — copying will cost marks even if content is correct.",
    ],
  },
];