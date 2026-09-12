import type { WritingType } from "./types";

export const CREATIVE_TYPES: WritingType[] = [
  {
    id: "speech-writing",
    name: "Speech Writing",
    category: "Creative Writing",
    icon: "🎤",
    marks: "5–6 marks",
    concept:
      "A speech is meant to be SPOKEN aloud. That changes everything: sentences must be short and rhythm-friendly, and structure must help the audience hold the thread in their heads — because they cannot re-read. You greet, you hook, you develop, you land a message, and you thank. An examiner is checking for 'speakability'.",
    format: [
      {
        label: "1. Salutation (audience address)",
        detail:
          "Begin by addressing the audience, in order of seniority: 'Respected Chairperson, honourable judges, teachers, and my dear friends —'. This personally draws each listener in.",
        example: "Respected Principal, teachers, and my dear friends,",
      },
      {
        label: "2. Self-introduction (if required)",
        detail: "A single clear line naming yourself and your class/school; add it when the prompt says 'as the school captain…'.",
        example: "I am Anisha, the head girl of this college, and today I stand before you to speak on …",
      },
      {
        label: "3. Hook / opening statement",
        detail:
          "Open with a question, a striking fact, a quotation, or a tiny story — something the audience can latch onto in the first ten seconds.",
      },
      {
        label: "4. Body — 2–3 clear points (aim for rhythm)",
        detail:
          "Develop your topic in short paragraphs, each with a visible main point. Use 'First… Second… Finally…' so listeners can track the structure by ear.",
      },
      {
        label: "5. Persuasive devices",
        detail: "Triads ('reduce, reuse, recycle'), repetition, rhetorical questions, and a direct 'we' that pulls the audience into action.",
      },
      {
        label: "6. Conclusion — message + thanks",
        detail: "End with a strong closing appeal and a warm thank-you. Never trail off — a speech's last line is what the audience remembers.",
        example: "Let us pledge to be the change. Thank you.",
      },
    ],
    startings: [
      "Respected guests, teachers, and my dear friends, good morning. Today I want to talk about something we all carry but rarely discuss: …",
      "I stand before you not to give answers, but to share a question that has been troubling me — …",
      "'Be the change you wish to see.' These words have never been more urgent than today, and here is why …",
    ],
    connectors: [
      "First, let us consider …",
      "Second, look at what happens when …",
      "More importantly, …",
      "Some may object that …; to them I say …",
      "Finally, and most importantly, …",
    ],
    example:
      "Respected Principal, teachers, and my dear friends,\n\nI am Anisha Sharma, head girl of this college, and today I stand before you to speak on 'The Rising Menace of Screen Addiction'.\n\nHave you ever checked your phone 'for a minute' and surfaced forty minutes later? I know I have. That single experience is what this speech is about, because our generation is not lazy — we are distracted.\n\nFirst, let us accept the science: notifications are engineered to interrupt us, and every interruption steals a piece of our attention. Second, look at what this does to us socially — one study found that young people now spend more waking hours with screens than with family and friends combined.\n\nMore importantly, the cure is not abandoning technology; it is mastering it. If we set screen-free hours, keep phones out of study rooms, and spend evenings talking — actually talking — we reclaim a life that apps quietly take from us.\n\nSome may object that screens are necessary. To them I say: use them as tools, not as companions.\n\nLet us pledge today to be the masters of our screens, not their servants. Thank you.",
    grammar: [
      "Rhetorical questions do heavy lifting in speeches: 'truth the audience to answer in their heads'.",
      "Direct address 'we/you' creates togetherness — a speech is a conversation with a crowd.",
      "Short, punchy sentences sound powerful aloud; long clauses die on the ear.",
      "Imperatives command action: 'let us pledge', 'do not scroll at the dinner table'.",
      "Triads give rhetorical rhythm: 'not lazy — distracted — disconnected'.",
    ],
    tips: [
      "Write for the EAR, not the eye: read your draft aloud and where you gasp, revise.",
      "Repeat your core phrase ('masters of our screens') 2–3 times for memorability.",
      "Keep body points to three maximum; a speech that lists more is a lecture.",
    ],
  },
  {
    id: "dialogue-writing",
    name: "Dialogue Writing / Conversation",
    category: "Creative Writing",
    icon: "💬",
    marks: "3–4 marks (short format)",
    concept:
      "A dialogue is a conversation between two or more people written on the page. It must sound natural — people interrupt, reply briefly, use contractions and interjections. The examiner checks you show BOTH characters clearly, keep the exchange purposeful (making a request, giving news, solving a problem), and use correct speech punctuation.",
    format: [
      {
        label: "1. Heading / context line (optional)",
        detail:
          "State the setting and speakers once — 'In the school canteen, Rabin and Aasha discuss the upcoming science exhibition.' Then start immediately.",
      },
      {
        label: "2. Speaker names + colon",
        detail:
          "Write each speaker's name (or 'Rabin:') at the start of their line. In narrative dialogues use quotation marks and new lines instead.",
        example: "Rabin: Are you really entering the science exhibition this year?",
      },
      {
        label: "3. Short, natural turns",
        detail:
          "Real conversation is exchanges of 1–2 sentences, not monologues. Interruptions and short replies keep it authentic.",
        example: "Aasha: I am — but only if you stop laughing at my model!",
      },
      {
        label: "4. Purpose through the middle",
        detail:
          "Each line should push the exchange toward its aim: question → answer → problem → solution, or request → response → plan.",
      },
      {
        label: "5. Natural close",
        detail: "End with a decision, a goodbye, or a resolving line — not a dead silence.",
        example: "Aasha: Then we build it together. Deal? / Rabin: Deal." ,
      },
    ],
    startings: [
      "Hari: Have you heard what happened at the library yesterday?",
      "Teacher: Good morning, students. I have an announcement to make.",
      "Shiva: You look worried. What is wrong?",
    ],
    connectors: [
      "Well, actually …",
      "You know what, …",
      "Honestly speaking, …",
      "The thing is …",
      "So, anyway …",
    ],
    example:
      "In the school corridor, after the final bell, two friends plan their Dashain together.\n\nRabin: Hey, have you decided when you are leaving for your hometown?\nAasha: Probably on Friday, after the exam results are posted. You?\nRabin: Same week. Honestly speaking, I am dreading the bus journey — it is always packed.\nAasha: The thing is, if we travel together, it will be more fun. We can share a seat and snacks.\nRabin: You know what, that is actually a great idea. What time is your bus?\nAasha: Around 9 a.m. from the ring road.\nRabin: Perfect. So, anyway, let us meet at the stop by 8:30 and grab breakfast first.\nAasha: Deal. See you Friday, then!\nRabin: Deal — and do not be late this time!",
    grammar: [
      "Contractions are your friend: 'I'm', 'it's', 'what's' — real speech uses them constantly.",
      "Question tags and fillers give naturalness: 'You are coming, right?', 'You know what', 'The thing is'.",
      "Short responses mirror real rhythm: 'Deal.', 'Exactly!', 'No way!', 'Right.'",
      "Tense follows context: planning uses 'will/would', storytelling switches to past.",
      "Punctuate quotation dialogues separately ('\"I am leaving,\" she said.') from line-style dialogues.",
    ],
    tips: [
      "Give each character a distinguishable voice — one formal, one playful, for example.",
      "Keep turns short; a 6-line monologue inside a dialogue is a speech, not a dialogue.",
      "Read it aloud: if it sounds unnatural to you, it will read as unnatural to the examiner.",
    ],
  },
  {
    id: "story-writing",
    name: "Story Writing",
    category: "Creative Writing",
    icon: "📚",
    marks: "5 marks (NEB English — 'write a story')",
    concept:
      "A story in NEB exams is judged on plot, not polish. The examiner wants a COMPLETE narrative arc — a situation, a problem, a turning point, a resolution and (often) an implicit moral. Prompts give a title, a first line, or an opening sentence ('It was raining heavily when the stranger knocked…') that you MUST continue naturally.",
    format: [
      {
        label: "1. Opening — inherit the given start / set scene",
        detail:
          "If the question hands you a first line, copy it exactly and continue it. Otherwise open by placing your character in time, place and normal routine — then break the routine.",
        example: "It was raining heavily when the stranger knocked on our door…",
      },
      {
        label: "2. Introduce the complication",
        detail:
          "Give the character a problem or a mysterious/urgent arrival. This is what creates tension and makes the story unfold.",
      },
      {
        label: "3. Build rising action",
        detail:
          "Add obstacles, decisions and small discoveries that move the plot toward its peak. Keep it vivid — show, don't tell.",
      },
      {
        label: "4. Climax",
        detail:
          "The most intense or decisive moment — the confrontation, the revelation, the choice. This is where the story changes.",
      },
      {
        label: "5. Resolution + moral/realisation",
        detail:
          "End by resolving the situation and, if it fits, letting the character reflect on what the experience taught — the quiet mark-earner NEB rewards.",
      },
    ],
    startings: [
      "It was raining heavily when the stranger knocked on our door…",
      "Ramesh had never believed in luck, until the day he found the old brass key…",
      "The announcement came without warning: the school would close in three days…",
      "Deep inside the forest, where the path ends, someone was waiting…",
    ],
    connectors: [
      "Little did he know that …",
      "Just then, …",
      "Without thinking, …",
      "In that moment, …",
      "From that day on, …",
    ],
    example:
      "The Necklace That Remembers\n\nIt was raining heavily when the stranger knocked on our door, and for a moment no one dared to answer — no one, except my grandmother. She opened it without fear and found a soaked traveller holding a small box. 'This belongs to your family,' he said, thrusting it into her hands, and vanished into the rain.\n\nInside the box was a silver necklace, tarnished and old. My grandmother's hands trembled as she lifted it. Little did I know that it was the very necklace she had lost in the 2072 earthquake, when our house crumbled and our past scattered. Just then, she looked at me with tears in her eyes: 'Some things find their way home.'\n\nIn that moment, I understood that the traveller we had sheltered years ago — a young man we had fed and given clothes after the quake — had never forgotten our kindness. He had found the necklace among the ruins and had spent years searching for its owner.\n\nFrom that day on, my grandmother keeps the necklace on her dressing table, and our family believes in a simpler truth: that goodness travels. What you give away always finds its way back — sometimes wearing the shape of a silver necklace, in a stranger's hands, on a rainy night.",
    grammar: [
      "Past simple carries the narrative sequence; past continuous paints background ('we were sheltering…').",
      "Past perfect places earlier events: 'the very necklace she had lost in the 2072 earthquake'.",
      "Direct speech at key moments adds life: 'Some things find their way home.'",
      "Time connectors structure the arc: little did he know, just then, in that moment, from that day on.",
      "Keep ONE verb-tense zone — never drift into present while narrating past events.",
    ],
    tips: [
      "If a first line is given, USE it verbatim — copying it earns credit and preserves continuity.",
      "Under ~150 words unless specified; a complete arc beats a long unfinished one.",
      "Give the story a quiet turn toward a value (kindness, honesty, courage) without preaching.",
    ],
  },
  {
    id: "review-writing",
    name: "Review Writing (Book/Film)",
    category: "Creative Writing",
    icon: "🎬",
    marks: "5 marks",
    concept:
      "A review is your critical evaluation of a book, film, or play: what it is, what it does well, what it does poorly, and whether it is worth the reader's time. The trick is BALANCE — it is not a marketing blurb or a rant, but an organised judgement with reasons.",
    format: [
      {
        label: "1. Title + basic details",
        detail:
          "Head with the work's title, author/director, year and genre — one neat line that orients the reader.",
        example: "A Review of 'The Great Gatsby' (F. Scott Fitzgerald, 1925, novel)",
      },
      {
        label: "2. Brief, spoiler-free summary",
        detail: "In 2–3 sentences, describe what the work is ABOUT and its premise — without revealing the ending.",
      },
      {
        label: "3. Strengths",
        detail:
          "What stands out? Writing style, characters, cinematography, messages? Give at least ONE concrete example or quoted moment.",
      },
      {
        label: "4. Weaknesses / limitations",
        detail:
          "What falls short — pacing, one-dimensional characters, predictable plot? Be fair: state the weakness and why it matters.",
      },
      {
        label: "5. Recommendation + rating",
        detail:
          "Who would enjoy it? Do you recommend it? Add a star rating or a one-line verdict. Reviews are incomplete without judgement.",
        example: "Verdict: ★★★★ — a glittering classic that still mirrors our own world.",
      },
    ],
    startings: [
      "Some books age badly; others grow sharper with time. [Title] belongs to the second kind.",
      "Every generation deserves a review of [Title], because its questions never go out of date.",
      "In [Title], [author/director] serves us a story that appears simple on the surface — and is anything but.",
    ],
    connectors: [
      "At its core, the story is about …",
      "What impresses most is …",
      "On the downside, …",
      "Where it truly shines is …",
      "Overall, …",
    ],
    example:
      "A Review of 'The Alchemist' (Paulo Coelho, 1988, novel)\n\nSome books age badly; others grow sharper with time. The Alchemist belongs to the second kind. At its core, the story follows Santiago, a shepherd who dreams of treasure buried near the pyramids and, guided by omens, learns that the real fortune lies in following his 'Personal Legend'.\n\nWhat impresses most is Coelho's simplicity: proverb-like sentences that feel easy but carry real weight. The desert journey doubles as an inner journey, and the reader grows with every oasis the shepherd reaches.\n\nOn the downside, the plot is deliberately thin, and characters besides Santiago remain sketched rather than full. Readers who need dramatic stakes may find the pacing too gentle.\n\nWhere it truly shines is its philosophy of listening to one's own heart. In a world of noise, the book is a quiet classroom for courage.\n\nOverall, I recommend it to every student who feels lost between expectations and dreams. Verdict: ★★★★ — a fable that deserves to be read, marked, and lived.",
    grammar: [
      "Present simple dominates a review: 'the story follows', 'Coelho writes' — the book always lives in the present.",
      "Evaluative adjectives carry judgement: compelling, restrained, uneven, luminous.",
      "Concessive structures create fairness: 'although the plot is thin, the philosophy is profound'.",
      "Modal hedging softly: 'may find the pacing too gentle', 'readers might want…'.",
      "Comparative language orients: 'more human', 'less dramatic than his earlier work'.",
    ],
    tips: [
      "Never spoil the ending in a review — NEB rewards restraint and mature judgement.",
      "Give at least one concrete moment/quote as EVIDENCE for your opinion.",
      "End with a clear, personal recommendation; a review without a verdict is incomplete.",
    ],
  },
];