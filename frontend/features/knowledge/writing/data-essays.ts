import type { WritingType } from "./types";

export const ESSAY_TYPES: WritingType[] = [
  {
    id: "paragraph-writing",
    name: "Paragraph Writing",
    category: "Paragraphs & Essays",
    icon: "✍️",
    marks: "5–10 marks (NEB Compulsory English)",
    concept:
      "A paragraph is ONE complete thought written in 4–6 sentences. Think of it as a mini-essay: the topic sentence promises an idea, the supporting sentences prove/explain it, and the closing sentence lands it. If you can write one perfect paragraph, you already know the engine behind every essay, letter and report.",
    format: [
      {
        label: "1. Topic sentence (opener)",
        detail:
          "One sentence that states the main idea + your angle. It must be specific, not a worn-out generality. Everything that follows must serve THIS sentence.",
        example: "Bad: 'Pollution is bad.'  Good: 'Air pollution in Kathmandu has quietly become a public-health emergency.'",
      },
      {
        label: "2. Supporting sentences (2–4)",
        detail:
          "Each supporting sentence adds ONE fact, example, reason or detail. Order them logically: most important first (deductive) or save the strongest for last (climactic).",
        example: "Traffic dust raises PM2.5 levels; hospitals report rising asthma cases; children and the elderly suffer most.",
      },
      {
        label: "3. Concluding sentence",
        detail:
          "Close with a restatement, a consequence, or a forward-looking thought. Do NOT introduce a brand-new idea here.",
        example: "Without urgent action, the next generation will inherit lungs city dwellers can no longer trust.",
      },
    ],
    startings: [
      "X means more than …; it shapes …",
      "In a society where …, [topic] has become impossible to ignore.",
      "When people think of …, they rarely think of …",
      "One fact about … tells the whole story: …",
      "The word [topic] is simple; the reality behind it is not.",
    ],
    connectors: [
      "To begin with, …",
      "More importantly, …",
      "For example, …",
      "As a result, …",
      "In the end, …",
    ],
    example:
      "Air pollution in Kathmandu has quietly become a public-health emergency. To begin with, unregulated brick kilns and traffic dust drive PM2.5 levels far above WHO safety limits every winter. More importantly, hospitals report a steady rise in asthma and respiratory infections among children and senior citizens. For example, the past decade saw a near tripling of chronic-cough cases in valley-based clinics. Unless cleaner fuel and strict emission rules replace the current neglect, the next generation will inherit lungs no city dweller can trust.",
    grammar: [
      "Unity = every sentence points at the topic sentence. If a sentence could belong to another paragraph, delete it.",
      "Coherence = the reader can follow without re-reading. Achieve it with connectors and repeated key words.",
      "Tense: when describing facts/opinions use present simple ('rises', 'causes'); when narrating a past example, switch cleanly to past simple.",
      "Keep ONE controlling idea. Two ideas in one paragraph = two paragraphs.",
    ],
    tips: [
      "Under exam pressure: plan 30 seconds, write the topic sentence, fill support, finish with consequence.",
      "Never start a paragraph with 'The' if you can start with an idea ('Climate change is…').",
      "Word count: aim for 90–120 words; examiners reward tight logic, not padding.",
    ],
  },
  {
    id: "essay-argumentative",
    name: "Argumentative / Opinion Essay",
    category: "Paragraphs & Essays",
    icon: "⚖️",
    marks: "10–15 marks (most common NEB essay prompt)",
    concept:
      "You are given a statement ('Social media does more harm than good') and asked to agree or disagree. The examiner wants a CLEAR STANCE defended with reasons, examples and — crucially — an acknowledgement of the other side. Opinion is the engine; evidence is the fuel.",
    format: [
      {
        label: "Introduction (1 paragraph)",
        detail:
          "Hook + context + THESIS (your stance in one sentence). The thesis must say what YOU believe, not just restate the question.",
        example: "While social media connects millions, its unchecked design exploits attention and divides communities — on balance it harms more than it helps.",
      },
      {
        label: "Body paragraph 1 — strongest reason",
        detail:
          "Topic sentence (reason) → explanation → example/evidence → mini-conclusion that ties back to the thesis.",
      },
      {
        label: "Body paragraph 2 — second reason",
        detail:
          "Same anatomy as body 1 but a DIFFERENT reason. Never repeat the first reason in new words.",
      },
      {
        label: "Counter-argument paragraph",
        detail:
          "Acknowledge the opposite side honestly, then rebut it. This is what separates an 8 from a 15.",
        example: "Admittedly, social media has democratised information… However, this benefit is hollow when engineered misinformation reaches billions faster than fact-checkers can respond.",
      },
      {
        label: "Conclusion",
        detail:
          "Restate thesis (new words), summarise reasons, end with a consequence or call to action.",
      },
    ],
    startings: [
      "Few questions divide opinion more sharply than whether …",
      "[Topic] is not just a debate — it is a daily decision each of us makes.",
      "Supporters champion [topic] for its benefits; the evidence, however, tells a different story.",
      "Whenever [topic] is discussed, one question keeps returning: …",
    ],
    connectors: [
      "The strongest argument for/against X is …",
      "Critics may argue that …; however, …",
      "Consider, for instance, …",
      "This matters because …",
      "On balance, …",
    ],
    example: "Few questions divide opinion more sharply than whether social media does more harm than good. While it connects millions instantly, its attention-driven design amplifies outrage and erodes genuine community. This essay argues that, on balance, social media harms more than it helps. The strongest argument against social media is its effect on attention. Platforms are engineered to maximise screen time, not wellbeing; every notification is a carefully timed interruption. Consider, for instance, the average student who \u2018glances at a feed\u2019 and resurfaces forty minutes later. This matters because attention is the raw material of a life well lived, and social media spends it without consent. Critics may argue that social media has democratised information, giving the voiceless a stage. However, this benefit is hollow when unverified content reaches billions faster than fact-checkers can respond. On balance, the architecture of these platforms — not the people using them — is the problem. Unless accountability replaces virality as the design goal, students will keep paying the real price: the hours that should have built their future.",
    grammar: [
      "Use modal verbs to express stance: 'must', 'should', 'cannot', 'might' — they show reasoned judgement, not shouting.",
      "Conditionals are gold in arguments: 'If X continues, then Y will follow' (type 1) or 'Were X to change, Y would…' (type 2).",
      "Hedging shows sophistication: 'tends to', 'arguably', 'in most cases' — examiners reward measured language over absolute claims.",
      "Keep the thesis in present tense; keep examples in past simple; keep predictions in will/would.",
    ],
    tips: [
      "Always give BOTH sides airtime — a one-sided essay reads as an opinion, not an argument.",
      "One argument per paragraph. Three developed paragraphs beat five shallow ones.",
      "End with a 'So what?' — connect your argument to the reader's life or Nepal's context.",
    ],
  },
];
