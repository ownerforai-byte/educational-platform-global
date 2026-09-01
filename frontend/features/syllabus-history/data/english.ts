/**
 * NEB English Syllabus — Grade 11 & Grade 12 Compulsory
 *
 * Sources:
 *   - https://www.dhanraj.com.np/2026/05/NEB-Grade-11-Compulsory-English-All-Units-Notes.html
 *     (Grade 11 full unit list with Section I Language Development + Section II Literature)
 *   - https://www.dhanraj.com.np/2026/04/NEB-Grade-12-Compulsory-English-Exam-Question-Paper-2083-2026.html
 *     (Grade 12 new course 2083 paper — reveals updated literature list)
 *   - https://www.dhanraj.com.np/2025/08/Compulsory-English-Question-Paper-2080-2023-of-Class-12-NEB-Old-Course-Code-004-PDF-Download.html
 *     (Grade 12 old course 2080 paper — reveals previous literature list)
 *   - https://esikhcha.com/hseb/ (subject codes: Eng. 003 for Gr 11, Eng. 004 for Gr 12)
 *   - https://esikhcha.com/hseb-syllabus-nepal/ (PDF syllabus links)
 *
 * microbenotes.com does not cover English syllabus.
 */

export type SyllabusVersion = {
  year: number;
  bsYear: string;
  isLatest: boolean;
  notes?: string;
  units: {
    id: string;
    title: string;
    hours: number;
    topics: {
      slug: string;
      title: string;
      hours?: number;
      addedInYear?: number;
      removedInYear?: number;
      modifiedInYear?: number;
    }[];
  }[];
};

export type SubjectEnglishData = {
  grade: "11" | "12";
  subjectCode: string;
  versions: SyllabusVersion[];
};

/**
 * NEB Grade 11 Compulsory English (Eng. 003)
 * Section I: Language Development — 20 reading texts
 * Section II: Literature — Short Stories, Poems, Essays, One Act Plays
 * Source: dhanraj.com.np Grade 11 English All Units Notes (June 2026)
 */
export const ENGLISH_11_DATA: SubjectEnglishData = {
  grade: "11",
  subjectCode: "Eng. 003",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: true,
      notes:
        "NCF 2076 curriculum. Section I contains 20 language development texts; Section II covers short stories, poems, essays and one-act plays.",
      units: [
        {
          id: "language-and-grammar",
          title: "Language and Grammar",
          hours: 20,
          topics: [
            { slug: "grammar-usage", title: "Grammar and Usage: Tenses, voices, clauses, sentence structure", hours: 8 },
            { slug: "vocabulary-building", title: "Vocabulary Building: Word formation, synonyms, antonyms, homophones, idioms", hours: 6 },
            { slug: "communication-skills", title: "Communication Skills: Oral and written expression, listening comprehension", hours: 6 },
          ],
        },
        {
          id: "reading-and-comprehension",
          title: "Reading and Comprehension",
          hours: 40,
          topics: [
            { slug: "passage-education-humanity", title: "Education and Humanity (Text 1)", hours: 2 },
            { slug: "passage-communication", title: "Communication (Text 2)", hours: 2 },
            { slug: "passage-media-society", title: "Media and Society (Text 3)", hours: 2 },
            { slug: "passage-history-culture", title: "History and Culture (Text 4)", hours: 2 },
            { slug: "passage-life-love", title: "Life and Love (Text 5)", hours: 2 },
            { slug: "passage-health-exercise", title: "Health and Exercise (Text 6)", hours: 2 },
            { slug: "passage-ecology-development", title: "Ecology and Development (Text 7)", hours: 2 },
            { slug: "passage-humor-satire", title: "Humor and Satire (Text 8)", hours: 2 },
            { slug: "passage-democracy-rights", title: "Democracy and Human Rights (Text 9)", hours: 2 },
            { slug: "passage-human-life-family", title: "Human Life and Family Relationship (Text 10)", hours: 2 },
            { slug: "passage-arts-creations", title: "Arts and Creations (Text 11)", hours: 2 },
            { slug: "passage-fantasy", title: "Fantasy (Text 12)", hours: 2 },
            { slug: "passage-career-entrepreneurship", title: "Career and Entrepreneurship (Text 13)", hours: 2 },
            { slug: "passage-power-politics", title: "Power and Politics (Text 14)", hours: 2 },
            { slug: "passage-war-peace", title: "War and Peace (Text 15)", hours: 2 },
            { slug: "passage-critical-thinking", title: "Critical Thinking (Text 16)", hours: 2 },
            { slug: "passage-globalisation-diaspora", title: "Globalisation and Diaspora (Text 17)", hours: 2 },
            { slug: "passage-immigration-identity", title: "Immigration and Identity (Text 18)", hours: 2 },
            { slug: "passage-travel-tourism", title: "Travel and Tourism (Text 19)", hours: 2 },
            { slug: "passage-science-technology", title: "Science and Technology (Text 20)", hours: 2 },
          ],
        },
        {
          id: "writing-and-composition",
          title: "Writing and Composition",
          hours: 20,
          topics: [
            { slug: "essay-writing", title: "Essay Writing: Narrative, descriptive, expository, argumentative", hours: 6 },
            { slug: "letter-writing", title: "Letter Writing: Formal and informal letters", hours: 4 },
            { slug: "paragraph-writing", title: "Paragraph Writing: Coherence, cohesion, topic sentences", hours: 4 },
            { slug: "summary-note-making", title: "Summary and Note-making", hours: 3 },
            { slug: "article-writing", title: "Article Writing", hours: 3 },
          ],
        },
        {
          id: "critical-thinking",
          title: "Critical Thinking",
          hours: 15,
          topics: [
            { slug: "literary-devices", title: "Literary Devices: Figure of speech, symbolism, irony, metaphor", hours: 5 },
            { slug: "literary-analysis", title: "Literary Analysis and Interpretation", hours: 5 },
            { slug: "poetic-appreciation", title: "Poetic Appreciation: Meter, rhyme, tone, theme", hours: 5 },
          ],
        },
        {
          id: "short-stories",
          title: "Short Stories",
          hours: 21,
          topics: [
            { slug: "story-selfish-giant", title: "The Selfish Giant by Oscar Wilde", hours: 3 },
            { slug: "story-oval-portrait", title: "The Oval Portrait by Edgar Allan Poe", hours: 3 },
            { slug: "story-god-sees-truth", title: "God Sees the Truth but Waits by Leo Tolstoy", hours: 3 },
            { slug: "story-the-wish", title: "The Wish by Roald Dahl", hours: 3 },
            { slug: "story-civil-peace", title: "Civil Peace by Chinua Achebe", hours: 3 },
            { slug: "story-little-soldiers", title: "The Little Soldiers by Guy de Maupassant", hours: 3 },
            { slug: "story-astrologers-day", title: "An Astrologer's Day by R.K. Narayan", hours: 3 },
          ],
        },
        {
          id: "poems",
          title: "Poems",
          hours: 15,
          topics: [
            { slug: "poem-corona-says", title: "Corona Says by Vishnu S. Rai", hours: 3 },
            { slug: "poem-red-red-rose", title: "A Red, Red Rose by Robert Burns", hours: 3 },
            { slug: "poem-all-worlds-stage", title: "All the World's a Stage by William Shakespeare", hours: 3 },
            { slug: "poem-who-are-you-little-i", title: "Who are you, little i? by E.E. Cummings", hours: 3 },
            { slug: "poem-gift-war-time", title: "The Gift in War Time by Tran Mong Tu", hours: 3 },
          ],
        },
        {
          id: "essays",
          title: "Essays",
          hours: 15,
          topics: [
            { slug: "essay-sharing-tradition", title: "Sharing Tradition by Frank LaPena", hours: 3 },
            { slug: "essay-how-to-live", title: "How To Live Before You Die by Steve Jobs", hours: 3 },
            { slug: "essay-what-i-require", title: "What I Require from Life by J.B.S. Haldane", hours: 3 },
            { slug: "essay-what-is-poverty", title: "What is Poverty? by Joe Goodwin Parker", hours: 3 },
            { slug: "essay-scientific-research", title: "Scientific Research is a Token of Humankind's Survival by Vladimir Keilis-Borok", hours: 3 },
          ],
        },
        {
          id: "one-act-plays",
          title: "One Act Plays",
          hours: 15,
          topics: [
            { slug: "play-trifles", title: "Trifles by Susan Glaspell", hours: 5 },
            { slug: "play-sunny-morning", title: "A Sunny Morning by Serafin and Foaquin Alvarez Quintero", hours: 5 },
            { slug: "play-refund", title: "Refund by Fritz Karinthy", hours: 5 },
          ],
        },
      ],
    },
  ],
};

/**
 * NEB Grade 12 Compulsory English (Eng. 004)
 *
 * Two versions:
 *   - 2076 BS (Old Course, Code-004): baseline curriculum
 *   - 2083 BS (New Course, Code-0041C): updated with new literature selections
 *
 * Sources:
 *   - Old course paper (2080/2023): dhanraj.com.np Compulsory English Code-004
 *   - New course paper (2083/2026): dhanraj.com.np Code-0041C
 */
export const ENGLISH_12_DATA: SubjectEnglishData = {
  grade: "12",
  subjectCode: "Eng. 004",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes:
        "Old course (Code-004). Based on NEB Class 12 Compulsory English exam paper 2080 (2023). Literature includes Grand Mother, About Love, Neighbours, A Respectable Woman, Purgatory, etc.",
      units: [
        {
          id: "literary-analysis",
          title: "Literary Analysis",
          hours: 40,
          topics: [
            { slug: "poem-grand-mother", title: "Grand Mother", hours: 3 },
            { slug: "poem-about-love", title: "About Love", hours: 3 },
            { slug: "poem-every-morning-i-wake", title: "Every Morning I Wake", hours: 3 },
            { slug: "story-neighbours", title: "Neighbours", hours: 3 },
            { slug: "story-respectable-woman", title: "A Respectable Woman", hours: 3 },
            { slug: "story-devoted-son", title: "A Devoted Son", hours: 3 },
            { slug: "story-hurried-trip", title: "Hurried Trip to Avoid a Bad Star", hours: 3 },
            { slug: "story-a-story", title: "A Story", hours: 3 },
            { slug: "story-board House", title: "The Boarding House", hours: 3 },
            { slug: "play-purgatory", title: "Purgatory", hours: 4 },
            { slug: "play-marriage-social-institution", title: "Marriage as a Social Institution", hours: 4 },
            { slug: "play-very-old-man-wings", title: "A Very Old Man with Enormous Wings", hours: 4 },
            { slug: "play-facing-death", title: "Facing Death", hours: 4 },
            { slug: "essay-womens-business", title: "Women's Business", hours: 3 },
            { slug: "essay-child-born", title: "A Child is Born", hours: 3 },
          ],
        },
        {
          id: "writing-skills",
          title: "Writing Skills",
          hours: 32,
          topics: [
            { slug: "essay-writing-arg", title: "Essay Writing — argumentative, descriptive, narrative, expository", hours: 8 },
            { slug: "letter-writing-formal", title: "Formal Letter Writing: job application, complaint, inquiry", hours: 6 },
            { slug: "letter-writing-informal", title: "Informal Letter Writing", hours: 4 },
            { slug: "report-writing", title: "Report Writing and Summarisation", hours: 6 },
            { slug: "note-making", title: "Note-making and Article Writing", hours: 8 },
          ],
        },
        {
          id: "oral-communication",
          title: "Oral Communication",
          hours: 16,
          topics: [
            { slug: "conversation-role-play", title: "Conversation and Role Play", hours: 4 },
            { slug: "presentation-skills", title: "Presentation Skills", hours: 4 },
            { slug: "debate-discussion", title: "Debate and Discussion", hours: 4 },
            { slug: "listening-comprehension", title: "Listening Comprehension", hours: 4 },
          ],
        },
        {
          id: "grammar",
          title: "Grammar",
          hours: 24,
          topics: [
            { slug: "grammar-tenses", title: "Tenses and their uses", hours: 4 },
            { slug: "grammar-clauses", title: "Clauses and sentence types", hours: 4 },
            { slug: "grammar-voice-narration", title: "Voice and Narration (Direct & Indirect)", hours: 4 },
            { slug: "grammar-modals-conditionals", title: "Modals and conditionals", hours: 4 },
            { slug: "grammar-punctuation", title: "Punctuation and capitalisation", hours: 2 },
            { slug: "grammar-word-class", title: "Word classes, prefixes, suffixes, dictionary skills", hours: 2 },
            { slug: "grammar-transformations", title: "Sentence transformation and correction", hours: 4 },
          ],
        },
      ],
    },
    {
      year: 2083,
      bsYear: "2083 BS",
      isLatest: true,
      notes:
        "New course (Code-0041C). Updated per NEB 2083 exam paper (April 2026). New literature additions include The Selfish Giant, Corona Says, Trifles, Refund; some old texts deprecated.",
      units: [
        {
          id: "literary-analysis",
          title: "Literary Analysis",
          hours: 40,
          topics: [
            // Prose / Reading Comprehension passages
            { slug: "prose-magical-library", title: "The Magical Library (Reading Comprehension Passage)", hours: 3 },
            // Short Stories — new course additions marked
            { slug: "story-selfish-giant", title: "The Selfish Giant by Oscar Wilde", hours: 3, addedInYear: 2083 },
            { slug: "story-oval-portrait", title: "The Oval Portrait by Edgar Allan Poe", hours: 3, addedInYear: 2083 },
            { slug: "story-god-sees-truth", title: "God Sees the Truth but Waits by Leo Tolstoy", hours: 3, addedInYear: 2083 },
            { slug: "story-the-wish", title: "The Wish by Roald Dahl", hours: 3, addedInYear: 2083 },
            { slug: "story-civil-peace", title: "Civil Peace by Chinua Achebe", hours: 3, addedInYear: 2083 },
            { slug: "story-little-soldiers", title: "The Little Soldiers by Guy de Maupassant", hours: 3, addedInYear: 2083 },
            { slug: "story-astrologers-day", title: "An Astrologer's Day by R.K. Narayan", hours: 3, addedInYear: 2083 },
            // Poems — new course additions marked
            { slug: "poem-corona-says", title: "Corona Says by Vishnu S. Rai", hours: 3, addedInYear: 2083 },
            { slug: "poem-red-red-rose", title: "A Red, Red Rose by Robert Burns", hours: 3, addedInYear: 2083 },
            { slug: "poem-all-worlds-stage", title: "All the World's a Stage by William Shakespeare", hours: 3, addedInYear: 2083 },
            { slug: "poem-who-are-you-little-i", title: "Who are you, little i? by E.E. Cummings", hours: 3, addedInYear: 2083 },
            { slug: "poem-gift-war-time", title: "The Gift in War Time by Tran Mong Tu", hours: 3, addedInYear: 2083 },
            // Retained from old course
            { slug: "poem-every-morning-i-wake", title: "Every Morning I Wake", hours: 3 },
            { slug: "poem-a-day", title: "A Day by Emily Dickinson", hours: 3, addedInYear: 2083 },
            { slug: "story-neighbours", title: "Neighbours", hours: 3 },
            { slug: "story-respectable-woman", title: "A Respectable Woman", hours: 3 },
            { slug: "story-devoted-son", title: "A Devoted Son", hours: 3 },
            { slug: "story-hurried-trip", title: "Hurried Trip to Avoid a Bad Star", hours: 3 },
            { slug: "story-a-story", title: "A Story", hours: 3 },
            { slug: "story-board-house", title: "The Boarding House", hours: 3 },
            // Essays
            { slug: "essay-sharing-tradition", title: "Sharing Tradition by Frank LaPena", hours: 3, addedInYear: 2083 },
            { slug: "essay-how-to-live", title: "How To Live Before You Die by Steve Jobs", hours: 3, addedInYear: 2083 },
            { slug: "essay-what-i-require", title: "What I Require from Life by J.B.S. Haldane", hours: 3, addedInYear: 2083 },
            { slug: "essay-what-is-poverty", title: "What is Poverty? by Joe Goodwin Parker", hours: 3, addedInYear: 2083 },
            { slug: "essay-scientific-research", title: "Scientific Research is a Token of Humankind's Survival by Vladimir Keilis-Borok", hours: 3, addedInYear: 2083 },
            { slug: "essay-on-libraries", title: "On Libraries", hours: 3 },
            { slug: "essay-human-rights-inequality", title: "Human Rights and the Age of Inequality", hours: 3 },
            { slug: "essay-womens-business", title: "Women's Business", hours: 3 },
            { slug: "essay-child-born", title: "A Child is Born", hours: 3 },
            // One Act Plays
            { slug: "play-trifles", title: "Trifles by Susan Glaspell", hours: 5, addedInYear: 2083 },
            { slug: "play-sunny-morning", title: "A Sunny Morning by Serafin and Foaquin Alvarez Quintero", hours: 5, addedInYear: 2083 },
            { slug: "play-refund", title: "Refund by Fritz Karinthy", hours: 5, addedInYear: 2083 },
            { slug: "play-purgatory", title: "Purgatory", hours: 4 },
            { slug: "play-marriage-social-institution", title: "Marriage as a Social Institution", hours: 4 },
            { slug: "play-very-old-man-wings", title: "A Very Old Man with Enormous Wings", hours: 4 },
            { slug: "play-facing-death", title: "Facing Death by August Strindberg", hours: 4 },
          ],
        },
        {
          id: "writing-skills",
          title: "Writing Skills",
          hours: 32,
          topics: [
            { slug: "writing-essay-arg", title: "Essay Writing — argumentative, descriptive, narrative, expository", hours: 8 },
            { slug: "writing-letter-formal", title: "Formal Letter Writing: letter to editor, job application, complaint", hours: 6 },
            { slug: "writing-letter-informal", title: "Informal Letter Writing", hours: 4 },
            { slug: "writing-report", title: "Report Writing and Summarisation", hours: 6 },
            { slug: "writing-note-making", title: "Note-making and Article Writing", hours: 8 },
          ],
        },
        {
          id: "oral-communication",
          title: "Oral Communication",
          hours: 16,
          topics: [
            { slug: "oral-conversation", title: "Conversation and Role Play", hours: 4 },
            { slug: "oral-presentation", title: "Presentation Skills", hours: 4 },
            { slug: "oral-debate", title: "Debate and Discussion", hours: 4 },
            { slug: "oral-listening", title: "Listening Comprehension", hours: 4 },
          ],
        },
        {
          id: "grammar",
          title: "Grammar",
          hours: 24,
          topics: [
            { slug: "grammar-tenses", title: "Tenses and their uses", hours: 4 },
            { slug: "grammar-clauses-types", title: "Clauses and sentence types", hours: 4 },
            { slug: "grammar-voice", title: "Voice (Active and Passive)", hours: 3 },
            { slug: "grammar-narration", title: "Narration (Direct and Indirect)", hours: 3 },
            { slug: "grammar-modals", title: "Modals and conditionals", hours: 4 },
            { slug: "grammar-punctuation", title: "Punctuation and capitalisation", hours: 2 },
            { slug: "grammar-word-formation", title: "Word formation: prefixes, suffixes, word classes", hours: 2 },
            { slug: "grammar-transform", title: "Sentence transformation and correction", hours: 4 },
          ],
        },
      ],
    },
  ],
};

export type SubjectEnglishDataMap = {
  "class-11-notes": SubjectEnglishData;
  "class-12-notes": SubjectEnglishData;
};

export const ENGLISH_DATA_MAP: SubjectEnglishDataMap = {
  "class-11-notes": ENGLISH_11_DATA,
  "class-12-notes": ENGLISH_12_DATA,
};
