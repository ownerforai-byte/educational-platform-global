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
  {
    id: "essay-descriptive",
    name: "Descriptive Essay",
    category: "Paragraphs & Essays",
    icon: "🎨",
    marks: "8 marks",
    concept:
      "You paint a picture in words of a person, place, event, or scene. The examiner marks SENSORY DETAIL — show the reader through sight, sound, smell, taste, and touch, rather than telling them with abstract labels like 'beautiful' or 'nice'. Think of the page as a canvas.",
    format: [
      {
        label: "1. Introduction — name the subject + dominant impression",
        detail:
          "Open by naming what you describe and plant ONE first image that sets the mood. Give the reader a reason to keep reading.",
        example: "The Dashain tika ceremony in my grandmother's courtyard is not an event; it is a living portrait of home.",
      },
      {
        label: "2. Spatial sweep (place/person)",
        detail:
          "Describe from a fixed viewpoint and move logically: near → far, top → bottom, outside → inside. Anchor each detail with a location reference.",
        example: "Above the doorway hangs the sacred marigold garland; beside it, the brass kalash glows in the morning sun.",
      },
      {
        label: "3. Sensory richness",
        detail:
          "Weave at least three senses: the smell of bhogate, the sound of the panche baja, the feel of warm tika paste. Specific beats generic.",
        example: "The air smells of incense and ghee; the band's drums tremble through the courtyard.",
      },
      {
        label: "4. People and action",
        detail:
          "Add the human element — what people do, say, wear. A described scene without living movement feels like a museum.",
      },
      {
        label: "5. Closing reflection",
        detail:
          "End by returning to the dominant impression and adding a sentence of feeling or significance. Never end abruptly on the last physical detail.",
        example: "When the tika is placed on my forehead, the courtyard, the drums, and my grandmother's smile become one memory of belonging.",
      },
    ],
    startings: [
      "The most unforgettable [place/person] I know begins, for me, with [one detail].",
      "There is a place I carry inside me — [name it].",
      "If you walked into [place] at [time], the first thing you would notice is …",
      "[Person] is not tall or striking at first glance, but watch them [action].",
    ],
    connectors: [
      "To the right, …",
      "Just beyond that, …",
      "What strikes you next is …",
      "The sound/smell that defines it is …",
      "And then, suddenly, …",
    ],
    example:
      "The most unforgettable place I know is my grandmother's courtyard at Dashain. If you walked in at dawn, you would first notice the marigold garlands swaying above the doorway, their orange glowing even in the grey morning. To the right, the brass kalash gleams with holy water, and the smell of incense and ghee drifts from the kitchen. What strikes you next is the sound — the panche baja drums trembling through the walls as the tika procession begins. My grandmother sits on a low stool, a single red tika dot ready on her thumb, and as she presses it to my forehead, the music, the marigolds, and her smile fuse into one memory I can return to whenever I am far from home.",
    grammar: [
      "Present tense for a place that lives now; past tense for a memory. Choose ONE and stay consistent.",
      "Prepositional phrases of position do the heavy lifting: above, beneath, beside, beyond, through.",
      "Concrete nouns + strong verbs beat adjectives: 'the temple bell clangs' beats 'the bell is very loud'.",
      "Kennings and similes add colour: 'the courtyard is a stage', 'the drums tremble like thunder'.",
    ],
    tips: [
      "Choose 5–7 exact details instead of describing everything — selection creates focus.",
      "Include at least three senses. Two are average; one is too thin.",
      "Close with feeling, not furniture.",
    ],
  },
  {
    id: "essay-narrative",
    name: "Narrative Essay / Story-Based Essay",
    category: "Paragraphs & Essays",
    icon: "📖",
    marks: "8 marks",
    concept:
      "You tell a true-ish or invented incident as a story — but with the essay's purpose: to make a point or reveal a meaning. Structure follows story logic (setup → conflict → climax → resolution), and every event should exist because it moves the reader toward the meaning you want to land.",
    format: [
      {
        label: "Introduction — orientation (who, where, when) + hook",
        detail:
          "Set the scene in two or three sentences: the time, place, people, and the ordinary moment before everything changed. Skip 'Once upon a time'.",
        example: "It was the last evening of Dashain, and I was dawdling home from my uncle's house, swinging a bag of sel roti.",
      },
      {
        label: "Rising action — the incident/complication",
        detail:
          "Narrate the events leading to the turning point. Use vivid verbs and small details; slow down where tension builds.",
      },
      {
        label: "Climax — the turning moment",
        detail:
          "This is the point of greatest tension or emotion. Often a decision, an accident, a realisation, or a confrontation.",
        example: "I saw the old man stumble just as the bus slammed its brakes, and in that frozen second I understood what it meant to be responsible.",
      },
      {
        label: "Falling action + resolution",
        detail:
          "Show the immediate outcome — what happened next, how people reacted.",
      },
      {
        label: "Reflection / meaning (optional but powerful)",
        detail:
          "End with one or two sentences that state why this incident mattered — the lesson, the change, the memory. This converts a story into an essay.",
        example: "That small act of help taught me that courage is not loud; sometimes it is just stopping when no one else will.",
      },
    ],
    startings: [
      "It was [time of year/weather], and I remember it as if it were yesterday.",
      "I had always believed [general belief], until the day I …",
      "The [noun] arrived on a [time], and it changed everything.",
      "People often say [saying], and I learned exactly why on [specific day].",
    ],
    connectors: [
      "At first, …",
      "Then, without warning, …",
      "In that instant, …",
      "What happened next …",
      "Looking back now, …",
    ],
    example:
      "It was the last evening of Dashain, and I was dawdling home from my uncle's house, swinging a bag of sel roti. At first, the street was empty and quiet — just dust, a far-off radio, and my own footsteps. Then, without warning, an old man carrying a huge sack stumbled at the crossing just as a bus roared toward the corner. In that instant, time split: the driver slammed the brakes, the man froze, and I dropped my bag and ran, waving my arms to stop the traffic. What happened next was small — I helped him gather his scattered gourds, and he blessed me in a shaky voice. Looking back now, I understand that courage is not loud; sometimes it is just stopping when no one else will — and that one frozen moment taught me more about responsibility than any classroom ever has.",
    grammar: [
      "Past simple drives the plot; past continuous sets background scenes ('I was dawdling home').",
      "Past perfect marks earlier events for clarity: 'which I had never attempted before'.",
      "Time connectors sequence the story: at first, then, in that instant, afterwards, finally.",
      "Direct speech (or reported speech) at the climax adds immediacy: 'Stop!' I shouted.",
      "Keep ONE consistent narrator (I/he/she) — switching perspective breaks the story.",
    ],
    tips: [
      "Do not retell a whole trip — pick ONE incident with a clear turning point.",
      "Choose a climax and build everything toward it; cut details that do not serve it.",
      "A narrative essay earns top marks when it ends in reflection — tie the story to a truth.",
    ],
  },
  {
    id: "essay-expository",
    name: "Expository / Explanatory Essay",
    category: "Paragraphs & Essays",
    icon: "🔍",
    marks: "8 marks",
    concept:
      "You EXPLAIN a topic clearly and organise the explanation — no opinion required, just understanding and structure. The examiner wants to see that you can break a subject into logical parts and walk the reader through them without confusion. 'Explain how…', 'Describe the causes of…', 'Why…' prompts are expository.",
    format: [
      {
        label: "1. Introduction — define/announce + thesis map",
        detail:
          "Define the topic in your own words and end the intro with a 'map sentence' that lists the parts you will explain.",
        example: "Deforestation means the large-scale removal of forests, and its causes can be grouped into three forces: agriculture, infrastructure, and the timber trade.",
      },
      {
        label: "2. Body — one idea per paragraph, cause→effect order",
        detail:
          "Each body paragraph handles ONE cause/step/aspect: state it, explain it, give one concrete example. Order them by logic or importance.",
        example: "The first and oldest driver is agriculture — slash-and-burn farming converts forest into fields, often permanently.",
      },
      {
        label: "3. Body — link parts with connective tissue",
        detail:
          "Use phrases like 'a second factor', 'in addition', 'beyond this', 'as a consequence' so the reader always knows where they are.",
      },
      {
        label: "4. Conclusion — summarise the explanation + wider significance",
        detail:
          "Restate the map in fresh words, then add one sentence on why the explanation matters (impact, implication, possible outcome).",
        example: "Understanding these causes matters because only when we know how forests are lost can we design rules and habits that stop it.",
      },
    ],
    startings: [
      "[Topic] can best be understood by breaking it into its main parts.",
      "At its core, [topic] means …",
      "To explain [topic], we must first look at what actually happens when …",
      "Three factors, working together, explain why …",
    ],
    connectors: [
      "The first/second/third factor is …",
      "In practical terms, …",
      "This happens because …",
      "As a result, …",
      "Taken together, …",
    ],
    example:
      "Deforestation can best be understood by breaking it into its main parts. At its core, deforestation means the large-scale, permanent removal of forest cover, and its causes can be grouped into three forces: agriculture, infrastructure, and the timber trade. The first and oldest driver is agriculture — slash-and-burn farming converts forest into fields, and when soil is exhausted, farmers burn fresh patches, so the loss compounds over decades. A second factor is infrastructure: roads, dams, and settlements cut through forest, fragmenting habitat and opening remote areas to further clearing. The third driver is the commercial timber trade, where logging removes the tallest trees that anchor the ecosystem, and illegal exports make regulation difficult. In practical terms, these three forces feed one another — a new road eases both farming and logging. Taken together, they explain why Nepal's Terai forests have shrunk so sharply in one lifetime. Understanding these causes matters because only when we know how forests are lost can we design rules and habits that stop it.",
    grammar: [
      "Present simple carries general truths ('logging removes the tallest trees').",
      "Cause-and-effect connectors drive the logic: because, as a result, so, therefore, leads to.",
      "Quantifiers keep claims honest: 'large-scale', 'so sharply', 'in one lifetime' — measured language scores higher.",
      "Parallel structure inside lists ('roads, dams, and settlements') shows control and earns marks.",
    ],
    tips: [
      "Follow the prompt's verb: 'explain' wants causes/process; 'describe' wants features; match the demand.",
      "Number your factors openly ('first… second… third…') — examiners reward visible organisation.",
      "Finish with significance, not a repetition of the introduction.",
    ],
  },
];
