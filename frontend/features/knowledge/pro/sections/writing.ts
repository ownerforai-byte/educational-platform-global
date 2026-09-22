/**
 * Pro Knowledge — English Writing chapters.
 */

import type { KnowledgeChapter } from "@/features/knowledge/types";

export const WRITING_CHAPTERS: KnowledgeChapter[] = [
  {
    id: "essay-paragraph",
    title: "Paragraph & Essay Craft",
    classLevel: "both",
    blurb:
      "Topic sentences, PEEL structure, essay types, introductions and conclusions, coherence devices and the exact mark-earning skeleton.",
    theory: [
      {
        heading: "The paragraph as a mini-essay",
        level: "basic",
        body:
          "Every strong paragraph makes one promise (the topic sentence), proves it (two to four supporting sentences with example or reason) and closes it (a concluding or linking sentence). A paragraph containing two unrelated ideas is two paragraphs. In NEB writing, paragraph marks are largely awarded for this invisible skeleton rather than vocabulary.",
      },
      {
        heading: "Intextual coherence devices",
        level: "standard",
        body:
          "Cohesion comes from four tools: pronouns and reference (this, such, they), repetition of key nouns, transition signals (moreover, however, therefore, in contrast), and parallel structure. Coherence is logical ordering — chronological, cause-effect, or general-to-specific. Examiners see cohesion instantly by looking only at the first word of each sentence.",
      },
      {
        heading: "Essay types and their argument engines",
        level: "pro",
        body:
          "A descriptive essay builds sensory detail around one dominant impression. A narrative essay moves chronologically with a turning point. An expository essay explains a process or idea in neutral register. A persuasive essay uses claim, evidence, reasoning and refutation of the counterargument. Choosing the wrong engine for the prompt is the most costly structural error.",
      },
      {
        heading: "Introduction and conclusion formulas",
        level: "pro",
        body:
          "An introduction moves from a general hook to a narrowed thesis — the funnel. It should never open with a dictionary definition or 'Nowadays'. A conclusion restates the thesis in fresh words, summarises the strongest point, and ends with a forward-looking thought, never with a new argument.",
      },
    ],
    formulas: [
      {
        name: "PEEL paragraph structure",
        latex: "P\\text{oint} \\to E\\text{vidence} \\to E\\text{xplanation} \\to L\\text{ink}",
        symbols: [
          { sym: "P", meaning: "topic sentence stating one claim" },
          { sym: "L", meaning: "link to the next paragraph or to the question" },
        ],
        when: "Every body paragraph of any essay type.",
        hook: "One paragraph, one claim — always.",
      },
      {
        name: "Essay length budget",
        latex: "\\text{Intro:} 20\\% \\ + \\ \\text{Body:} 60\\% \\ + \\ \\text{Conclusion:} 20\\%",
        symbols: [{ sym: "%", meaning: "share of total words" }],
        when: "Planning a 250–300 word NEB essay.",
      },
      {
        name: "Thesis formula",
        latex: "\\text{Topic} + \\text{Position} + \\text{Why (preview of 2 reasons)}",
        symbols: [{ sym: "Position", meaning: "what you will prove" }],
        when: "Persuasive and expository essays.",
        hook: "If the thesis could be copied from the prompt, it is not a thesis.",
      },
      {
        name: "Transition signal families",
        latex: "\\text{Add: moreover}; \\ \\text{Contrast: however}; \\ \\text{Cause: therefore}; \\ \\text{Example: for instance}",
        symbols: [{ sym: "families", meaning: "choose by relationship, not by habit" }],
        when: "Joining every paragraph and most sentences.",
      },
    ],
    specialCases: [
      {
        title: "Prompt says 'discuss both views'",
        condition: "Two-sided prompt",
        result: "\\text{One paragraph per view + your verdict}",
        why: "A one-sided response loses the balance marks even if the writing is flawless.",
      },
      {
        title: "Word limit under 200",
        condition: "Short essay",
        result: "\\text{Two body paragraphs, no filler}",
        why: "Depth on two points beats shallow coverage of five.",
      },
      {
        title: "Definition-style topic",
        condition: "'What is…' prompt",
        result: "\\text{Define in own words, do not quote a dictionary}",
        why: "Examiners penalise dictionary openings as formulaic.",
      },
      {
        title: "Narrative with a moral",
        condition: "Story prompt",
        result: "\\text{Imply the lesson; state it only in the last line if asked}",
        why: "A moral stated repeatedly turns the narrative into a lecture.",
      },
    ],
    tricks: [
      {
        title: "Plan three verbs, not three topics",
        how:
          "Before writing, jot the exact action each paragraph will prove (argue, illustrate, refute). It fixes structure in 30 seconds.",
        example: "Para 1: pollution is measurable. Para 2: it harms health. Para 3: solutions exist and work.",
        saves: "~3 min of mid-essay confusion",
      },
      {
        title: "First-word scan test",
        how:
          "Read only the first word of each sentence. If many repeat, your cohesion needs work.",
        example: "Replace 'Also…' repetitions with 'Moreover, In addition, Furthermore'.",
        saves: "~2 min revision",
      },
      {
        title: "Hook without cliché",
        how:
          "Open with a statistic, a scenario, or a contrast — never with a dictionary definition or 'Since the dawn of time'.",
        example: "'Every winter, Kathmandu's air turns the colour of weak tea.'",
        saves: "Protects the first impression mark",
      },
      {
        title: "Bookmark the thesis",
        how:
          "Write the thesis on your rough sheet and tick it off when the conclusion restates it — guarantees task fulfilment.",
        example: "Thesis: tourism harms unless regulated. Conclusion: regulation, not prohibition, is the answer.",
      },
    ],
    mistakes: [
      {
        wrong: "Two ideas in one paragraph.",
        right: "Split into two paragraphs with two topic sentences.",
        why: "Unity of idea is what the paragraph mark measures.",
      },
      {
        wrong: "Ending with a brand-new argument.",
        right: "Restate, summarise, then look forward.",
        why: "A new point in the conclusion is left undeveloped and reads as unfinished.",
      },
      {
        wrong: "Filling word count with repetition.",
        right: "Add a concrete example or a consequence instead.",
        why: "Examiners deduct for padding more than for shortness.",
      },
      {
        wrong: "Ignoring the instructed format or register.",
        right: "Match the prompt's register: formal for essays, semi-formal for letters.",
        why: "Register mismatch is graded as a task-fulfilment failure.",
      },
    ],
  },

  {
    id: "letters-emails",
    title: "Letters, Emails & Applications",
    classLevel: "both",
    blurb:
      "Formal, semi-formal and informal letters, job and leave applications, complaint and enquiry letters, and modern email structure.",
    theory: [
      {
        heading: "The three registers",
        level: "basic",
        body:
          "Formal letters go to officials and unknown readers, with no contractions and a respectful tone. Semi-formal letters go to teachers or acquaintances. Informal letters go to friends and family, allowing contractions, idioms and personal detail. The register decides salutation, closing and vocabulary — and mismatching it costs more than a spelling error.",
      },
      {
        heading: "The standard block structure",
        level: "standard",
        body:
          "Sender's address, date, receiver's designation and address, salutation, a subject line in formal letters, an opening that states the purpose, a body of one to three paragraphs, a closing line of action or expectation, and the complimentary close with the name. Everything is left-aligned in block format, which is now standard.",
      },
      {
        heading: "Application letters that actually persuade",
        level: "pro",
        body:
          "A job application has three moves: who you are and what you are applying for, why you fit (skills and evidence, not adjectives), and what you enclose or expect next. Vague self-praise ('I am hardworking and honest') carries no weight; a concrete claim ('I raised my school's blood-donation collection by 40%') does.",
      },
      {
        heading: "Email conventions",
        level: "pro",
        body:
          "An email needs a clear subject line, a one-line greeting, a purpose sentence in the first two lines, short paragraphs, a clear call to action, and a signature block. Attachments must be announced in the body. Emails are shorter and more direct than printed letters; emulating letter length in an email loses concision marks.",
      },
    ],
    formulas: [
      {
        name: "Formal letter skeleton",
        latex: "\\text{Address} \\to \\text{Date} \\to \\text{Receiver} \\to \\text{Salutation} \\to \\text{Subject} \\to \\text{Body} \\to \\text{Close} \\to \\text{Name}",
        symbols: [{ sym: "Subject", meaning: "required in formal letters" }],
        when: "All official correspondence.",
        hook: "Subject line is the first thing an examiner looks for.",
      },
      {
        name: "Purpose statement formula",
        latex: "I\\ \\text{am writing to} + \\text{verb} + \\text{the matter}",
        symbols: [{ sym: "verb", meaning: "apply / complain / enquire / request" }],
        when: "Opening line of any formal letter or email.",
      },
      {
        name: "Complimentary close by register",
        latex: "\\text{Formal: Yours faithfully/sincerely}; \\quad \\text{Informal: Yours affectionately/Love}",
        symbols: [{ sym: "faithfully", meaning: "used with Dear Sir/Madam" }],
        when: "Faithfully pairs with unnamed readers, sincerely with named ones.",
      },
      {
        name: "Email compact structure",
        latex: "\\text{Subject} + \\text{Greeting} + \\text{Purpose} + \\text{Detail} + \\text{Action} + \\text{Signature}",
        symbols: [{ sym: "Action", meaning: "what you want the reader to do" }],
        when: "Business and academic email.",
      },
    ],
    specialCases: [
      {
        title: "Letter to the editor",
        condition: "Public concern",
        result: "\\text{Subject + problem + impact + appeal}",
        why: "The purpose is to raise awareness, so a concrete appeal to authority or readers must close it.",
        askedIn: "NEB writing section favourites.",
      },
      {
        title: "Application with no advertised vacancy",
        condition: "Speculative application",
        result: "\\text{State interest + enquire about openings}",
        why: "Without a vacancy the purpose shifts from applying to enquiring.",
      },
      {
        title: "Letter of complaint",
        condition: "Faulty product or poor service",
        result: "\\text{Describe + evidence + requested remedy}",
        why: "A remedy request (replacement, refund, apology) is what makes it a complaint rather than a rant.",
      },
      {
        title: "Email to a professor",
        condition: "Academic request",
        result: "\\text{Formal register even in email}",
        why: "The medium does not reduce the register; salutation and full signature remain.",
      },
    ],
    tricks: [
      {
        title: "Purpose in line one",
        how:
          "Never open with 'I hope this letter finds you in good health' in exams — it wastes the most read line.",
        example: "'I am writing to bring to your notice the irregular water supply in Ward 5.'",
        saves: "Gains the organisation mark immediately",
      },
      {
        title: "Three-paragraph body map",
        how:
          "Paragraph 1: context and problem. Paragraph 2: details and evidence. Paragraph 3: request or suggestion.",
        example: "Complaint letter: order details → defect → replacement request.",
        saves: "~4 min planning",
      },
      {
        title: "Register lock",
        how:
          "Decide formal or informal before writing and never mix: no contractions in formal, no 'Dear Sir' in informal.",
        example: "Formal: 'I would be grateful if…'; Informal: 'It'd be great if…'",
        saves: "Prevents register deductions",
      },
      {
        title: "Name the attachment",
        how:
          "List enclosures or attachments explicitly; it shows completeness and reads as professional.",
        example: "'I have attached my CV and academic transcripts.'",
      },
    ],
    mistakes: [
      {
        wrong: "Mixing 'Yours faithfully' with a named addressee.",
        right: "Named receiver → 'Yours sincerely'; unnamed (Dear Sir/Madam) → 'Yours faithfully'.",
        why: "The close must match the salutation.",
      },
      {
        wrong: "Omitting the subject line in a formal letter.",
        right: "Always include a concise subject line after the salutation.",
        why: "It is an explicit item in the marking scheme.",
      },
      {
        wrong: "Using contractions in a formal application.",
        right: "Write 'I am', 'do not', 'cannot' in full.",
        why: "Contractions signal informal register.",
      },
      {
        wrong: "Writing an email as long as a printed letter.",
        right: "Keep emails short with a clear action line.",
        why: "Emails are read for action, not for narrative.",
      },
    ],
  },

  {
    id: "reports-articles",
    title: "Reports, News Stories & Articles",
    classLevel: "both",
    blurb:
      "News report structure, the inverted pyramid, headlines and bylines, feature articles, and interpretation of charts and data.",
    theory: [
      {
        heading: "The inverted pyramid",
        level: "basic",
        body:
          "A news report puts the most important information first so it survives editing: headline, byline, lead paragraph answering who, what, when, where, why and how, then supporting detail in descending importance. This is the opposite of an essay's build-up, and reversing the two is the commonest structure error in report writing.",
      },
      {
        heading: "Headline, byline and lead",
        level: "standard",
        body:
          "The headline is short, active and without a full stop. The byline names the reporter and often the place and date. The lead is one paragraph that captures the entire story, written in past tense, third person and without opinion — opinion belongs in quoted speech only.",
        math: "\\text{Lead} = 5W + H \\ \\text{in one paragraph}",
      },
      {
        heading: "Feature articles and their angle",
        level: "pro",
        body:
          "A feature article is not news; it explores an angle with description, background, interviews and a considered conclusion. It needs a headline, an engaging opening anecdote, a subtopic per paragraph, and a closing that returns to the opening image. The writer's voice is visible, unlike in a news report.",
      },
      {
        heading: "Interpreting charts and graphs",
        level: "pro",
        body:
          "A chart interpretation must state what the chart shows, identify the trend (rise, fall, fluctuation, plateau), quantify it with figures from the chart, account for oddities, and conclude. Describing every bar is not interpretation — selection of the significant pattern is what earns marks.",
        math: "\\%\\text{change} = \\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100",
      },
    ],
    formulas: [
      {
        name: "News report structure",
        latex: "\\text{Headline} \\to \\text{Byline} \\to \\text{Lead} \\to \\text{Details} \\to \\text{Quotes} \\to \\text{Closing}",
        symbols: [{ sym: "Lead", meaning: "most important facts, one paragraph" }],
        when: "All newspaper report questions.",
      },
      {
        name: "Percentage change",
        latex: "\\%\\text{change} = \\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100",
        symbols: [{ sym: "new, old", meaning: "the two values being compared" }],
        when: "Interpreting growth, decline or comparison charts.",
      },
      {
        name: "Passive for news tone",
        latex: "\\text{Active} \\to \\text{Passive when the doer is unknown}",
        symbols: [{ sym: "by", meaning: "omit unless the agent matters" }],
        when: "'Three arrested after highway robbery' — the news idiom.",
      },
      {
        name: "Feature article skeleton",
        latex: "\\text{Hook} \\to \\text{Context} \\to \\text{Subtopic} \\times 2{-}3 \\to \\text{Echo}",
        symbols: [{ sym: "Echo", meaning: "conclusion returning to the opening image" }],
        when: "Magazine-style opinions and human-interest pieces.",
      },
    ],
    specialCases: [
      {
        title: "Quotes in a report",
        condition: "Eyewitness or official statement",
        result: "\\text{Use quotation marks + attribution}",
        why: "Quotes separate fact from the reporter's voice and prove direct sourcing.",
      },
      {
        title: "Chart with no overall trend",
        condition: "Fluctuating data",
        result: "\\text{Describe the fluctuation and identify peak/trough points}",
        why: "Pretending there is a trend where none exists is a factual error.",
      },
      {
        title: "Report on an accident",
        condition: "Event reporting",
        result: "\\text{Casualties and cause first}",
        why: "Readers need the most consequential fact immediately.",
      },
      {
        title: "Article on a social issue",
        condition: "Opinion with evidence",
        result: "\\text{Angle stated in the opening, defended throughout}",
        why: "An article without a clear angle reads as a rambling essay.",
      },
    ],
    tricks: [
      {
        title: "Write the lead last, place it first",
        how:
          "Draft the whole report, then compress the most important facts into one paragraph and put it at the top.",
        example: "'Two students were injured when a bus overturned at Kalanki on Monday morning.'",
        saves: "~2 min",
      },
      {
        title: "Headline in five words",
        how:
          "Verb-first, no articles, no full stop, active voice.",
        example: "'Flood Displaces 300 in Terai' rather than 'There was a flood that displaced…'",
        saves: "~1 min",
      },
      {
        title: "Quantify every trend",
        how:
          "Attach at least two figures and one comparison to each trend statement.",
        example: "'Exports rose from Rs 12 bn to Rs 16 bn, a 33% increase.'",
        saves: "Lifts a descriptive answer to an analytical one",
      },
      {
        title: "Attribute all opinions",
        how:
          "Any judgement must be quoted or attributed; the reporter stays neutral.",
        example: "'According to the ward chair, the delay was unavoidable.'",
      },
    ],
    mistakes: [
      {
        wrong: "Writing a report like an essay with an introduction build-up.",
        right: "Use the inverted pyramid: most important first.",
        why: "Report structure is part of the marking scheme.",
      },
      {
        wrong: "Injecting personal opinion into a news report.",
        right: "Report facts and attribute opinions to sources.",
        why: "Neutrality is the defining feature of news writing.",
      },
      {
        wrong: "Describing every data point in a chart.",
        right: "Select and interpret the significant pattern.",
        why: "Interpretation, not transcription, is what is being tested.",
      },
      {
        wrong: "Forgetting the headline or byline.",
        right: "Always include both in report questions.",
        why: "They are separate marks.",
      },
    ],
  },

  {
    id: "creative-writing",
    title: "Creative Writing & Textual Skills",
    classLevel: "both",
    blurb:
      "Story writing, dialogue, description, summary writing, paraphrasing, note-making, interpreting poems, and the tricks that make prose vivid.",
    theory: [
      {
        heading: "Story arc in five beats",
        level: "basic",
        body:
          "Every short story has an exposition (setting and character), an inciting incident, rising complication, a climax and a resolution. Cutting any beat leaves the story flat; adding more than five makes it sprawling. For a 200–250 word exam story, each beat occupies roughly one paragraph.",
      },
      {
        heading: "Show, don't tell",
        level: "standard",
        body:
          "'She was nervous' tells; 'She readjusted her dupatta three times before the door opened' shows. Showing means using action, dialogue, sensory detail and specific nouns instead of adjectives of emotion. One concrete object is worth three abstract adjectives.",
      },
      {
        heading: "Dialogue mechanics",
        level: "pro",
        body:
          "Each new speaker gets a new paragraph. Punctuation sits inside the quotation marks. Speech tags should be 'said' or action beats rather than adverbs: 'he said quietly' is weaker than 'he said, lowering his voice'. Interruptions and unfinished sentences use ellipses or dashes purposefully, not decoration.",
      },
      {
        heading: "Summary, paraphrase and note-making",
        level: "pro",
        body:
          "A summary compresses to about one third, keeps the original order and the writer's viewpoint, and uses no examples. A paraphrase rewrites in your own words at similar length. Note-making extracts headings and sub-points, usually with abbreviations and indentation. Summary keeps the author's voice; paraphrase changes the wording; note-making changes the form.",
        math: "\\text{Summary} \\approx \\frac{1}{3} \\text{ of the original}",
      },
      {
        heading: "Interpreting a poem or passage",
        level: "pro",
        body:
          "Interpretation moves from literal meaning to figurative meaning to the effect on the reader: what is said, how it is said (imagery, sound, structure) and why it matters. Quoting a short phrase and explaining its effect scores better than retelling the poem in prose.",
      },
    ],
    formulas: [
      {
        name: "Five-beat story arc",
        latex: "\\text{Exposition} \\to \\text{Inciting} \\to \\text{Complication} \\to \\text{Climax} \\to \\text{Resolution}",
        symbols: [{ sym: "Climax", meaning: "the highest point of tension" }],
        when: "Plotting any short story.",
      },
      {
        name: "Summary length rule",
        latex: "\\text{Length} \\approx \\frac{1}{3} \\times \\text{original}",
        symbols: [{ sym: "1/3", meaning: "standard compression ratio" }],
        when: "Summarising prose or dialogue.",
      },
      {
        name: "Show-don't-tell conversion",
        latex: "\\text{Emotion adjective} \\to \\text{physical action or detail}",
        symbols: [{ sym: "→", meaning: "replace abstraction with evidence" }],
        when: "Revising any descriptive paragraph.",
        hook: "'He was angry' → 'He set the cup down hard enough to spill.'",
      },
      {
        name: "Note-making format",
        latex: "\\text{Main heading} \\to \\text{sub-points} \\to \\text{abbreviations}",
        symbols: [{ sym: "indentation", meaning: "shows hierarchy of ideas" }],
        when: "Note-making and note-taking questions.",
      },
    ],
    specialCases: [
      {
        title: "Story beginning given",
        condition: "Prompted opening line",
        result: "\\text{Continue seamlessly in the same tense and person}",
        why: "Changing tense or viewpoint breaks continuity and is immediately visible.",
      },
      {
        title: "Story ending given",
        condition: "Prompted closing line",
        result: "\\text{Work backwards to plot the arc}",
        why: "The final line determines what must be foreshadowed.",
      },
      {
        title: "Summary of a dialogue",
        condition: "Conversational text",
        result: "\\text{Convert to reported speech}",
        why: "Summaries use third person and indirect speech.",
      },
      {
        title: "Paraphrasing a poem",
        condition: "Verse passage",
        result: "\\text{Keep line-by-line meaning, drop the rhyme}",
        why: "Meaning is preserved; the poetic form is not retained.",
      },
      {
        title: "Description of a place",
        condition: "Sensory prompt",
        result: "\\text{Use at least three senses, one dominant impression}",
        why: "Multi-sensory detail is what makes a description vivid rather than a list.",
      },
    ],
    tricks: [
      {
        title: "Open in the middle of action",
        how:
          "Start with a line of dialogue or a moving image — never with weather or a waking-up scene.",
        example: "'The bus was already moving when she reached the gate.'",
        saves: "Wins the reader in one line",
      },
      {
        title: "One object as a symbol",
        how:
          "Carry one concrete object through the story; it gives coherence without exposition.",
        example: "A cracked watch appears in the opening and the ending.",
        saves: "Adds unity cheaply",
      },
      {
        title: "Tense lock",
        how:
          "Choose past simple and stay there. Mixing tenses is the most penalised creative error.",
        example: "Flashbacks use past perfect, and only briefly.",
        saves: "Protects the language mark",
      },
      {
        title: "Summary by topic sentence harvesting",
        how:
          "Underline the topic sentence of each paragraph and join them with connectives — the fastest accurate summary method.",
        example: "Five paragraphs → five joined sentences → compress once more.",
        saves: "~4 min",
      },
      {
        title: "Quote-analyse, don't retell",
        how:
          "In interpretation, use one short quotation per point and explain its effect.",
        example: "'The image of a 'broken wing' suggests helplessness that cannot be repaired.'",
        saves: "Converts retelling into analysis",
      },
    ],
    mistakes: [
      {
        wrong: "Ending a story with '…and then I woke up.'",
        right: "Resolve the tension within the fictional world.",
        why: "It is treated as an evasion of the resolution.",
      },
      {
        wrong: "Summary that includes examples and repetitions.",
        right: "Keep only main ideas in original order.",
        why: "Including detail proves the original was not understood at the idea level.",
      },
      {
        wrong: "Dialogue from several speakers in one paragraph.",
        right: "New speaker, new paragraph.",
        why: "Readers lose track of who is speaking, and it is a formatting error.",
      },
      {
        wrong: "Paraphrase that copies phrases verbatim.",
        right: "Change both wording and sentence structure.",
        why: "Copied phrases are penalised as not being a paraphrase.",
      },
      {
        wrong: "Retelling a poem instead of interpreting it.",
        right: "State the meaning, then explain how the language creates it.",
        why: "Interpretation is scored on analysis, not summary.",
      },
    ],
  },
];
