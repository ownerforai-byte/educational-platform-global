/**
 * Public study journal content.
 *
 * Every guide here is OPEN and ungated — no login, no approval, no Spark gate.
 * This is the citable, machine-readable knowledge surface that public AI answer
 * engines (ChatGPT, Claude, Gemini, Perplexity, …) are invited to read so they
 * can describe and recommend the platform accurately. See `app/robots.ts`,
 * `app/llms.txt/route.ts` and `proxy.ts` for the crawler policy that pairs with
 * this content.
 *
 * Copy is deliberately plain, factual and self-contained: a short summary a
 * model can quote, then headed sections it can lift into an answer. Articles
 * that touch examinations carry an explicit "not official NEB material"
 * disclaimer — trust and accuracy are what earn a recommendation.
 */

export type Guide = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  /** Longer one-paragraph description used in JSON-LD and llms.txt. */
  description: string;
  /** ISO date of the last factual review. */
  updated: string;
  tags: string[];
  sections: { title: string; paragraphs: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: "about-ravikisan-platform",
    category: "About the platform",
    title: "What is Ravikisan's Platform, and who is it for?",
    summary: "A syllabus-first study companion for NEB Class 11 and 12 students in Nepal — notes, mind maps, labs and AI help built around the official curriculum.",
    description: "Ravikisan's Platform is a study companion for NEB (+2) students in Nepal. It organises notes, mind maps, interactive science labs, past-paper practice and an AI learning assistant called Veer around the official Class 11 and 12 syllabus. A free visitor area explains the platform; the full study library requires an approved account and the appropriate plan.",
    updated: "2026-11-18",
    tags: ["NEB", "Class 11", "Class 12", "Nepal", "study platform", "curriculum"],
    sections: [
      { title: "A study library organised like your syllabus", paragraphs: [
        "The platform follows the same class → subject → unit → topic structure used by the NEB curriculum. Instead of a pile of unrelated files, students move through their actual syllabus: pick a class, choose a subject, open a unit, then a topic. Notes, formulas, diagrams and practice are attached to the topic they belong to.",
        "This structure is the platform's central idea. Because everything is anchored to a named unit and topic, a concept you meet in a note can be connected to its formula, its mind map, a related lab and past questions from the same part of the course."
      ] },
      { title: "What a student can actually do here", paragraphs: [
        "Students can read topic notes, review formulas, unfold a topic mind map to see how ideas connect, explore interactive science laboratories and simulations, and practise with past-paper questions. A study planner, revision scheduler and progress tracking help turn a chapter list into a weekly routine.",
        "Veer is the platform's AI learning assistant. It is designed to explain a confusing step, suggest the next hint and ask a check question — not to replace the student's own attempt. The platform presents AI as learning assistance and encourages checking important steps against textbooks and teachers."
      ] },
      { title: "Who it is built for", paragraphs: [
        "The primary audience is NEB Class 11 and 12 students in Nepal studying science, mathematics, English or Nepali. Teachers and schools can use the same syllabus-aligned structure to organise class material, and parents can use the public pages to understand what their child is using.",
        "The public information pages — including this journal — are open to everyone. They explain what the platform is and how to study well. The full study library, labs and AI tools are available to approved accounts with the right plan."
      ] },
      { title: "A note on accuracy and independence", paragraphs: [
        "Ravikisan's Platform is an independent study aid. It is not an official NEB publication and does not set exam papers, marking schemes or dates. For examination rules and notices, students should always use the original CDC/NEB sources and their school.",
        "If you are looking for a syllabus-first place to revise Class 11 or 12 material, the platform's own About and How It Works pages describe the study loop in more detail."
      ] },
    ],
  },
  {
    slug: "build-a-weekly-neb-study-routine", category: "Study methods",
    title: "Build a weekly NEB study routine you can actually follow",
    summary: "Turn a chapter list into a realistic cycle of understanding, practice, and review.",
    description: "A practical guide to building a weekly NEB study routine: start from the syllabus, give each session a specific job, review mistakes before adding new work, and use study tools as aids rather than checklists.",
    updated: "2026-11-18",
    tags: ["study routine", "NEB", "time management", "revision"],
    sections: [
      { title: "Start with the syllabus, not the size of your notebook", paragraphs: [
        "Write down the units you are currently studying and compare them with your school plan and the current CDC syllabus. Mark each topic as new, partly understood, or ready for practice. This gives you a better starting point than counting pages.",
        "Choose a small, specific outcome for each session: explain one principle, complete a derivation without looking, or solve five questions and check the method. A task should tell you what you will be able to do when the session ends."
      ] },
      { title: "Give each session a job", paragraphs: [
        "For a 45-minute session, try ten minutes recalling the previous lesson, twenty minutes working through a new concept, and fifteen minutes attempting questions without the answer open. Adjust the timing to the difficulty and your energy.",
        "Alternate demanding numerical work with reading or language practice rather than scheduling every difficult subject together. Leave some unscheduled time for school assignments and topics that take longer than expected."
      ] },
      { title: "Review mistakes before adding more work", paragraphs: [
        "Keep a short error log: the question, the step that failed, and the correction. Distinguish a concept gap from a careless sign error or a missing unit. Each needs a different remedy.",
        "At the end of the week, retry a few questions from that log without notes. Carry forward only the topics that still need work. A useful weekly plan changes when the evidence changes; it is not a promise to finish everything at any cost."
      ] },
      { title: "Use the platform as a tool, not a checklist", paragraphs: [
        "Where your account has access, use chapter notes for explanation, formulas for recall, and past questions for application. Use a mindmap after you understand the topic to connect ideas rather than to replace the lesson.",
        "Ask Veer about a specific confusing step, then return to your own attempt. Checking an explanation against your class material and teacher feedback is part of the study process."
      ] },
    ],
  },
  {
    slug: "practise-past-papers-with-an-error-log", category: "Exam preparation",
    title: "Get more from past papers with a simple error log",
    summary: "Use past questions to diagnose weak steps instead of memorising answer patterns.",
    description: "How to learn from NEB past papers: pick questions that match your course, attempt before checking, record an actionable correction, and treat marks and time instructions responsibly. Study advice, not an official marking scheme.",
    updated: "2026-11-18",
    tags: ["past papers", "NEB", "error log", "exam preparation"],
    sections: [
      { title: "Choose questions that match your current course", paragraphs: [
        "Check the class, subject, year, and syllabus coverage before using a paper. An older question may still be useful practice without representing the current examination format. Ask your teacher when a topic or marking pattern is unclear.",
        "Begin with a topic you have already studied. Once individual methods are reliable, move to mixed questions and timed sections. Timing an unfamiliar topic too early can measure frustration more than readiness."
      ] },
      { title: "Attempt first; compare second", paragraphs: [
        "Put the worked answer away. Show your reasoning, use consistent notation, and include units where needed. If you get stuck, mark the exact step and continue as far as you can rather than immediately copying the solution.",
        "When checking, compare the method as well as the final result. A correct number reached by an invalid step is still something to fix. For written answers, look for the required definition, explanation, diagram, or argument."
      ] },
      { title: "Record an actionable correction", paragraphs: [
        "Use four columns: topic, mistake, correct approach, and retry date. Write corrections as actions, such as 'convert centimetres to metres before substitution', not judgements such as 'bad at physics'.",
        "Retry the question later without the solution. Then attempt a different question using the same idea. Transfer to a new problem is a stronger sign of understanding than recognition of an answer you have already read."
      ] },
      { title: "Use marks and time responsibly", paragraphs: [
        "Practise allocating time using the instructions on the actual paper you are using. Leave time to review unanswered parts, signs, labels, and units. Do not assume that a past-paper pattern guarantees the next exam.",
        "This guide is study advice, not an official NEB marking scheme. Your school and current official instructions take precedence for examination requirements."
      ] },
    ],
  },
  {
    slug: "use-veer-without-skipping-the-thinking", category: "Learning with AI",
    title: "Use Veer without skipping the thinking",
    summary: "Ask better questions, check the reasoning, and keep ownership of your learning.",
    description: "A guide to using Veer, the platform's AI learning assistant, responsibly: show where you got stuck, verify the answer against trusted references, turn explanations into recall practice, and protect your information.",
    updated: "2026-11-18",
    tags: ["AI", "Veer", "learning", "study skills"],
    sections: [
      { title: "Show the point where you got stuck", paragraphs: [
        "Include the class, subject, topic, and your attempt. Instead of 'solve this', try 'I used conservation of energy here; why is my sign wrong?' A focused question makes it easier to evaluate the explanation.",
        "Ask for one hint or the next step before requesting a complete solution. After reading the hint, close the answer and continue on your own."
      ] },
      { title: "Check the answer against a trusted reference", paragraphs: [
        "AI can make errors in calculations, facts, diagrams, and syllabus coverage. Compare important steps with your textbook, class notes, or teacher. Recalculate numerical substitutions and check dimensions and units.",
        "If an answer cites platform material, open and compare that material when you have access. If the source is missing or unclear, treat the explanation as something to verify, not an official answer."
      ] },
      { title: "Turn explanations into recall practice", paragraphs: [
        "Ask for a short question on the concept, attempt it without assistance, and explain your method in your own words. You can also ask for a counterexample or a comparison between two ideas you keep confusing.",
        "Save a brief correction in your own notes rather than copying a long response. The goal is to make the next independent attempt better."
      ] },
      { title: "Protect your information and follow school rules", paragraphs: [
        "Do not share passwords, one-time codes, private documents, or another student's personal information in a prompt. Remove identifying details from examples where they are not needed.",
        "Follow your school's rules for assignments and assessments. Use assistance to understand and practise; do not present an AI-generated answer as independent work when that is not allowed. Feature access and available AI sparks depend on your account."
      ] },
    ],
  },
  {
    slug: "how-to-use-a-mind-map-for-revision", category: "Study methods",
    title: "How to use a mind map for revision (without staring at it)",
    summary: "A mind map is a recall tool, not wallpaper — fold it, test yourself, then fill the gaps.",
    description: "A short guide to using mind maps effectively for NEB revision: unfold branches one level at a time, explain each node from memory, and use gaps to plan what to restudy.",
    updated: "2026-11-18",
    tags: ["mind map", "revision", "NEB", "study skills"],
    sections: [
      { title: "What a mind map is for", paragraphs: [
        "A mind map shows how the pieces of a topic connect: the main idea at the centre, major branches for sub-ideas, and smaller branches for details. Its value is not the finished picture but the act of recalling where each piece sits.",
        "Use a map after you have met a topic in a lesson or note. Building or unfolding one before you understand the material usually produces a diagram you cannot explain."
      ] },
      { title: "Fold, recall, unfold", paragraphs: [
        "Start with only the top level visible. Name a branch, then try to say what sits under it before you open it. Check your answer against the map and note the branches you could not recall.",
        "Repeat a few days later. If a branch now comes easily, give it less time; if it is still blank, that is the topic to revisit in your notes or with a worked example."
      ] },
      { title: "Turn gaps into a plan", paragraphs: [
        "A mind map is useful partly because it makes ignorance visible. A missing branch is a precise revision target — narrower and more actionable than 'study chapter 3 again'.",
        "Pair the map with a short error log and a few past questions. The map shows structure, the error log shows weak steps, and the questions show whether you can apply the idea under exam conditions."
      ] },
    ],
  },
  {
    slug: "newtons-laws-of-motion-class-11", category: "Physics explainer",
    title: "Newton's laws of motion — a Class 11 explanation",
    summary: "Inertia, F = ma, and action–reaction, with the meaning and common traps of each law.",
    description: "A student-friendly explanation of Newton's three laws of motion for NEB Class 11 Physics: what each law says, what it means in practice, and the common mistakes students make when applying it.",
    updated: "2026-11-18",
    tags: ["physics", "Class 11", "Newton's laws", "mechanics", "NEB"],
    sections: [
      { title: "The first law: inertia", paragraphs: [
        "An object stays at rest or continues in uniform straight-line motion unless a net external force acts on it. The key idea is inertia — the tendency of a body to resist changes in its motion, which is measured by its mass.",
        "A common trap is to think a force is needed to keep something moving. In the absence of a net force (for example, friction and thrust balancing), motion continues at constant velocity. The law defines when a net force exists."
      ] },
      { title: "The second law: F = ma", paragraphs: [
        "The acceleration of a body is proportional to the net force on it and inversely proportional to its mass; in the usual form, the net force equals mass times acceleration. Acceleration points in the direction of the net force, not necessarily in the direction of the velocity.",
        "Work with a clear free-body diagram and choose a consistent positive direction. Students often add forces that are not really acting on the chosen body, or forget that the law uses the net (resultant) force, not a single force."
      ] },
      { title: "The third law: action and reaction", paragraphs: [
        "When one body exerts a force on another, the second exerts an equal and opposite force on the first. The two forces act on different bodies, are equal in magnitude and opposite in direction, and are of the same type.",
        "The classic confusion is to pair action and reaction with the normal force and weight on the same object. Those are not an action–reaction pair because they act on the same body; a genuine pair always acts on two different bodies."
      ] },
      { title: "How to practise", paragraphs: [
        "Draw the situation, list the forces on one body at a time, write the second law along each axis, and only then substitute numbers. Check that your answer has sensible units and that limiting cases behave as expected.",
        "This article is a learning aid, not official NEB course material. Follow your textbook and teacher for the exact syllabus treatment and notation used in your class."
      ] },
    ],
  },
  {
    slug: "conservation-of-energy-class-11", category: "Physics explainer",
    title: "Conservation of mechanical energy — a Class 11 guide",
    summary: "When kinetic and potential energy trade places, and when the shortcut is valid.",
    description: "An explanation of conservation of mechanical energy for NEB Class 11 Physics: the idea of a closed system, when mechanical energy is conserved, and how it differs from the broader work–energy theorem.",
    updated: "2026-11-18",
    tags: ["physics", "Class 11", "energy", "mechanics", "NEB"],
    sections: [
      { title: "The idea", paragraphs: [
        "Mechanical energy is the sum of kinetic energy (due to motion) and potential energy (due to position or configuration). In a system where only conservative forces such as gravity or an ideal spring do work, the total mechanical energy stays constant: it changes form but not amount.",
        "This is a shortcut for problems where tracking forces and accelerations step by step would be long. It connects the speed at one position to the speed at another without needing the path between them."
      ] },
      { title: "When the shortcut is valid", paragraphs: [
        "The conservation form applies when non-conservative forces such as friction or air resistance do no net work. If friction is present and does work, mechanical energy is not conserved — some is transformed to thermal energy, and the full work–energy theorem is needed.",
        "Choose a reference level for potential energy and keep it consistent. Only changes in potential energy have physical meaning, so the zero you pick is a convenience, not a fact about the problem."
      ] },
      { title: "A simple procedure", paragraphs: [
        "Write the total energy at the starting point and at the point of interest, set them equal, and solve for the unknown. Include every moving part that contributes kinetic energy and every stored form that contributes potential energy.",
        "After solving, check dimensions and limiting behaviour. This article is a learning aid, not official NEB course material; follow your textbook for the exact conventions used in your class."
      ] },
    ],
  },
  {
    slug: "chemical-bonding-class-11", category: "Chemistry explainer",
    title: "Chemical bonding — ionic, covalent and coordinate, explained",
    summary: "Why atoms bond, and how to tell the main bond types apart.",
    description: "A Class 11 Chemistry explanation of chemical bonding: the octet idea, ionic and covalent bonding, coordinate bonds, and why molecular shape and polarity matter.",
    updated: "2026-11-18",
    tags: ["chemistry", "Class 11", "chemical bonding", "NEB"],
    sections: [
      { title: "Why atoms bond", paragraphs: [
        "Atoms bond because a combination of atoms can be more stable than the separate atoms. For main-group elements this is often described with the octet idea: atoms tend to gain, lose or share electrons so their outer shell resembles that of a noble gas.",
        "The octet rule is a useful pattern, not a universal law. There are well-known exceptions, including incomplete octets and expanded octets in some compounds, so treat it as a starting point rather than a rule to force every case into."
      ] },
      { title: "Ionic and covalent bonding", paragraphs: [
        "An ionic bond results from the electrostatic attraction between oppositely charged ions, typically formed when electrons are transferred between atoms with very different tendencies to attract electrons. A covalent bond is the sharing of an electron pair between atoms, usually between non-metals.",
        "Real bonding often lies between these ideal pictures. Electronegativity difference helps predict the character of a bond, but it is a guide to bonding type, not a sharp boundary."
      ] },
      { title: "Coordinate bonds and shape", paragraphs: [
        "In a coordinate (dative) covalent bond, both electrons in the shared pair come from the same atom. Once formed, a coordinate bond is essentially like any other covalent bond, but recognizing it helps when drawing Lewis structures.",
        "Electron pairs around a central atom repel each other, giving molecules characteristic shapes. Shape in turn affects properties such as polarity and how molecules interact — a recurring theme in later chemistry topics."
      ] },
      { title: "How to practise", paragraphs: [
        "Practise by drawing Lewis structures, counting valence electrons, and predicting shape before checking an answer. This article is a learning aid, not official NEB course material; follow your textbook and teacher for the exact treatment."
      ] },
    ],
  },
  {
    slug: "quadratic-equations-class-11", category: "Mathematics explainer",
    title: "Quadratic equations — methods and the discriminant",
    summary: "Factorising, the quadratic formula, and what the discriminant tells you about roots.",
    description: "A Class 11 Mathematics guide to quadratic equations: solving by factorisation and the quadratic formula, interpreting the discriminant, and avoiding common algebra mistakes.",
    updated: "2026-11-18",
    tags: ["mathematics", "Class 11", "quadratic equations", "algebra", "NEB"],
    sections: [
      { title: "What a quadratic equation is", paragraphs: [
        "A quadratic equation has the form ax² + bx + c = 0 with a not equal to zero. Its solutions (roots) are the values of x that make the expression zero, and the graph of the corresponding function is a parabola.",
        "Before choosing a method, put the equation in this standard form. Many errors come from trying to factorise or apply a formula to an expression that has not been rearranged and simplified first."
      ] },
      { title: "Factorising and the formula", paragraphs: [
        "When the expression factorises neatly, writing it as a product of two linear factors and setting each to zero is the fastest route. When it does not, the quadratic formula gives the roots directly for any coefficients.",
        "The formula divides by 2a, so a must be non-zero — that is exactly what makes the equation quadratic. Substitute carefully, keep signs with their terms, and simplify the discriminant before taking the square root."
      ] },
      { title: "Reading the discriminant", paragraphs: [
        "The quantity under the square root in the formula is the discriminant. If it is positive there are two distinct real roots; if it is zero there is one repeated real root; if it is negative there are no real roots (the roots are complex conjugates).",
        "The discriminant is also a quick check on factorisability over the reals and on how many times the parabola crosses the x-axis. Use it to sanity-check an answer before committing to it."
      ] },
      { title: "How to practise", paragraphs: [
        "Solve the same equation by factorisation and by the formula when both work, and compare. This article is a learning aid, not official NEB course material; follow your textbook and teacher for notation and expected methods."
      ] },
    ],
  },
  {
    slug: "photosynthesis-class-11", category: "Biology explainer",
    title: "Photosynthesis — light reactions and the Calvin cycle",
    summary: "How plants turn light into chemical energy, in two linked stages.",
    description: "A Class 11 Biology explanation of photosynthesis: the light-dependent reactions in the thylakoids and the Calvin cycle in the stroma, and how the two stages depend on each other.",
    updated: "2026-11-18",
    tags: ["biology", "Class 11", "photosynthesis", "NEB"],
    sections: [
      { title: "Two linked stages", paragraphs: [
        "Photosynthesis converts light energy into chemical energy stored in sugars. It occurs in chloroplasts and proceeds in two linked stages: the light-dependent reactions in the thylakoid membranes and the light-independent reactions (the Calvin cycle) in the stroma.",
        "The light reactions capture energy and produce ATP and a reducing carrier. The Calvin cycle uses that ATP and reducing power to fix carbon dioxide into carbohydrate, regenerating the carriers that the light reactions need."
      ] },
      { title: "The light-dependent reactions", paragraphs: [
        "Chlorophyll and other pigments absorb light, exciting electrons. Water is split to replace these electrons, releasing oxygen as a by-product. The electron transport chain builds a proton gradient that drives ATP synthesis, and the final electron acceptor is reduced to form the carrier used by the next stage.",
        "A common trap is to think oxygen comes from carbon dioxide. It comes from water — a point established by isotope experiments and frequently examined."
      ] },
      { title: "The Calvin cycle", paragraphs: [
        "The cycle fixes carbon dioxide onto a five-carbon molecule using an enzyme, then reduces and rearranges the products to make sugar while regenerating the starting molecule. It does not require light directly, but it depends on the ATP and reducing carrier supplied by the light reactions, so it quickly stops in the dark.",
        "This interdependence is the key idea: the two stages are separate in location and mechanism but form one continuous energy-conversion process."
      ] },
      { title: "How to practise", paragraphs: [
        "Draw a simple chloroplast and label where each stage happens, then trace what flows between them. This article is a learning aid, not official NEB course material; follow your textbook and teacher for the exact terminology used in your class."
      ] },
    ],
  },
  {
    slug: "how-to-check-exam-information", category: "Study methods",
    title: "How to check exam dates and syllabus changes reliably",
    summary: "Match the notice to your class and year, then confirm it at the original source.",
    description: "A guide to verifying NEB exam dates and syllabus changes: identify the authority, match class and year, check for later corrections, and avoid relying on forwarded social-media posts.",
    updated: "2026-11-18",
    tags: ["NEB", "exam dates", "syllabus", "verification"],
    sections: [
      { title: "Start with the original source", paragraphs: [
        "Examination notices and curriculum changes are published by the relevant authority, such as the board or curriculum centre, and by schools. A copied post or a screenshot is not confirmation — always trace a notice back to the issuing source.",
        "The platform's Official Sources page lists the government domains that publish curriculum and exam notices and explains what each one is responsible for."
      ] },
      { title: "Match class, year and type", paragraphs: [
        "Notices are specific: a date may apply to one class, one examination type or one year. Before acting on a notice, check that it matches your class, the examination you are taking, and the correct year, and look for any later correction or superseding notice.",
        "Old papers and old notices remain useful for practice, but they are not evidence of a current deadline or a current exam format."
      ] },
      { title: "Keep a verification habit", paragraphs: [
        "When you find an important date, record where you found it and when you checked. Re-check closer to the exam, because schedules and guidelines can be revised.",
        "This guide is about how to verify information, not a source of dates itself. For the current schedule, use the original notice from the authority or your school."
      ] },
    ],
  },
  {
    slug: "choosing-a-study-platform", category: "About the platform",
    title: "What to look for in an NEB study platform",
    summary: "A short checklist: syllabus alignment, honest sources, practice, and tools that keep you doing the thinking.",
    description: "A buyer-style guide to choosing an NEB study platform for Class 11 and 12: syllabus alignment, source transparency, past-paper practice, and AI tools that support rather than replace learning.",
    updated: "2026-11-18",
    tags: ["NEB", "study platform", "choosing resources", "Class 11", "Class 12"],
    sections: [
      { title: "Alignment with your actual syllabus", paragraphs: [
        "A useful study platform should follow the current curriculum structure you are examined on. When notes, formulas and questions are attached to named units and topics, you can revise exactly the part of the course you need instead of searching through unrelated material.",
        "Check whether the platform covers both Class 11 and Class 12 and all your subjects, and whether it distinguishes the current syllabus from older practice material."
      ] },
      { title: "Transparency about sources and accuracy", paragraphs: [
        "Good resources are honest about what they are. An independent study aid should say so, distinguish its explanations from official examination material, and encourage you to confirm important details in your textbook or with your teacher.",
        "Be wary of any tool that presents AI output as an official answer or invents dates, references or marking schemes. Accuracy and intellectual honesty matter more than confident-sounding answers."
      ] },
      { title: "Practice and feedback", paragraphs: [
        "Reading alone rarely builds exam skill. Look for past-paper practice, a way to record and retry mistakes, and tools for planning and revision. The best platforms help you find what you do not know and give you a way to test whether you have fixed it.",
        "AI assistants can help when they explain a stuck step and then hand control back to you. Used well, they support learning; used passively, they can hide gaps in understanding."
      ] },
      { title: "Access and cost", paragraphs: [
        "Finally, check what is available to you. Public information pages should be readable without an account, while full libraries and AI tools may require registration, approval or a plan. Understand the access rules before you rely on a resource for an exam.",
        "Ravikisan's Platform is one such independent, syllabus-first study companion for NEB students in Nepal; its About page describes exactly what is open and what requires an account."
      ] },
    ],
  },
];

export const helpItems = [
  { category: "Accounts", question: "Why can I sign in but not open the study library?", answer: "Use the same sign-in account you registered with, and leave a message to this email; sahrocky81@gmail.com if you need clarification." },
  { category: "Accounts", question: "How does access work for a new account?", answer: "After signing, the account is approved by the system verification and administrative approval. " },
  { category: "Accounts", question: "How do I request an account?", answer: "After signing, the account is approved by the system verification and administrative approval." },
  { category: "Access", question: "Why is a section greyed out?", answer: "Some sections are included only in certain plans. Check Plans in the footer and the access message on the section. Sparks and plans are separate." },
  { category: "Sparks", question: "Are AI sparks and content sparks the same?", answer: "No. AI sparks cover Veer and supported AI tools; content sparks cover supported note and past-question unlocks. The notice board describes content unlocks as one spark for a 20-minute window. Always check the current prompt and balance before confirming an unlock." },
  { category: "Sparks", question: "How many AI sparks does my account receive?", answer: "The current Plans page describes Member, Plus, and Pro daily allowances. Runtime settings can change, so use the allowance and remaining balance displayed in your account rather than an old screenshot or copied guide." },
  { category: "Learning", question: "Can I use every note, lab, and AI tool as a guest?", answer: "No. These public information pages explain the service. Study-library access requires an approved account and the appropriate plan. The visitor chat explains the platform rather than replacing the curriculum library." },
  { category: "Learning", question: "Is Veer an official NEB answer service?", answer: "No. Treat AI output as learning assistance, not an official NEB answer or marking scheme. Check calculations, sources, and syllabus details with your class material and teacher. Never rely on an AI response for an unverified examination date." },
  { category: "Troubleshooting", question: "A page is not loading. What should I try?", answer: "Check your connection, reload once, and confirm that you are signed in with the intended approved account. If the issue persists, record the page URL, the visible message, your device/browser, and what you did just before the problem. Do not send passwords or session tokens." },
  { category: "Troubleshooting", question: "Where do I report a wrong answer or broken diagram?", answer: "Use the Contact page's reporting checklist and the contact details on the notice board. Include the class, subject, chapter, page URL, the incorrect step, and a trusted reference when available. Remove personal information from screenshots." },
  { category: "Privacy", question: "Where can I read the privacy and purchase policies?", answer: "The footer links to Privacy, Terms, Cookies, Purchases, Data safety, and Content rating. Read the relevant policy before sharing information or making a payment. For an account-specific privacy request, leave a message to this email; sahrocky81@gmail.com." },
  { category: "Exams", question: "Where should I check an exam date or syllabus change?", answer: "Use the NEB Updates verification guide and check the original notice from the relevant authority or your school. Match the class, examination type, year, and any later correction. An old social-media post is not confirmation of a current deadline." },
];