export type Guide = {
  slug: string; category: string; title: string; summary: string;
  sections: { title: string; paragraphs: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: "build-a-weekly-neb-study-routine", category: "Study methods",
    title: "Build a weekly NEB study routine you can actually follow",
    summary: "Turn a chapter list into a realistic cycle of understanding, practice, and review.",
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
];

export const helpItems = [
  { category: "Accounts", question: "Why can I sign in but not open the study library?", answer: "Signing in and receiving approval are separate steps. Accounts require owner approval and system verification. Check the status shown on your account, use the same sign-in account you registered with, and leave a message to this email; sahrocky81@gmail.com if you need clarification. Repeated sign-up attempts do not grant approval." },
  { category: "Accounts", question: "How does access work for a new account?", answer: "Everyone except the owner signs in as a Member and then waits for approval. Signing in and being approved are separate steps: the owner reviews the account, and only an approved Member account can later be granted Plus or Pro. A pending account is a normal stage, not a fault. Email sahrocky81@gmail.com if the account stays pending or was rejected." },
  { category: "Accounts", question: "How do I request an account?", answer: "Open Request an account and follow the sign-up instructions. Use an account you control, then wait for the approval status shown by the platform. There is no guaranteed approval time stated here." },
  { category: "Access", question: "Why is a section greyed out?", answer: "Your account may be approved but below the section's required access level. Plus and Pro open different parts of the platform. Check Plans in the footer and the access message on the section. Buying or receiving sparks does not automatically change your plan." },
  { category: "Sparks", question: "Are AI sparks and content sparks the same?", answer: "No. AI sparks cover Veer and supported AI tools; content sparks cover supported note and past-question unlocks. The notice board describes content unlocks as one spark for a 20-minute window. Always check the current prompt and balance before confirming an unlock." },
  { category: "Sparks", question: "How many AI sparks does my account receive?", answer: "The current Plans page describes Member, Plus, and Pro daily allowances. Runtime settings can change, so use the allowance and remaining balance displayed in your account rather than an old screenshot or copied guide." },
  { category: "Learning", question: "Can I use every note, lab, and AI tool as a guest?", answer: "No. These public information pages explain the service. Study-library access requires an approved account and the appropriate plan; some content also requires an unlock. The visitor chat explains the platform rather than replacing the curriculum library." },
  { category: "Learning", question: "Is Veer an official NEB answer service?", answer: "No. Treat AI output as learning assistance, not an official NEB answer or marking scheme. Check calculations, sources, and syllabus details with your class material and teacher. Never rely on an AI response for an unverified examination date." },
  { category: "Troubleshooting", question: "A page is not loading. What should I try?", answer: "Check your connection, reload once, and confirm that you are signed in with the intended approved account. If the issue persists, record the page URL, the visible message, your device/browser, and what you did just before the problem. Do not send passwords or session tokens." },
  { category: "Troubleshooting", question: "Where do I report a wrong answer or broken diagram?", answer: "Use the Contact page's reporting checklist and the owner's contact details on the notice board. Include the class, subject, chapter, page URL, the incorrect step, and a trusted reference when available. Remove personal information from screenshots." },
  { category: "Privacy", question: "Where can I read the privacy and purchase policies?", answer: "The footer links to Privacy, Terms, Cookies, Purchases, Data safety, and Content rating. Read the relevant policy before sharing information or making a payment. For an account-specific privacy request, leave a message to this email; sahrocky81@gmail.com." },
  { category: "Exams", question: "Where should I check an exam date or syllabus change?", answer: "Use the NEB Updates verification guide and check the original notice from the relevant authority or your school. Match the class, examination type, year, and any later correction. An old social-media post is not confirmation of a current deadline." },
];
