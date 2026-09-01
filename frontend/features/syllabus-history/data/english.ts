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
        meaning?: string;
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
            { slug: "grammar-usage", title: "Grammar and Usage: Tenses, voices, clauses, sentence structure", hours: 8, meaning: "Students master tenses, voice, clauses, and sentence patterns — the foundation for correct writing and speaking in all academic contexts." },
            { slug: "vocabulary-building", title: "Vocabulary Building: Word formation, synonyms, antonyms, homophones, idioms", hours: 6, meaning: "Students learn word formation and vocabulary strategies including synonyms, antonyms, homophones, and idioms to expand their expressive range for exams and daily communication." },
            { slug: "communication-skills", title: "Communication Skills: Oral and written expression, listening comprehension", hours: 6, meaning: "Students develop oral, written, and listening skills essential for classroom participation, presentations, and real-life interactions." },
          ],
        },
        {
          id: "reading-and-comprehension",
          title: "Reading and Comprehension",
          hours: 40,
          topics: [
            { slug: "passage-education-humanity", title: "Education and Humanity (Text 1)", hours: 2, meaning: "Students read and analyse a text on education and humanity, building reading comprehension and critical thinking skills tested in NEB exams." },
            { slug: "passage-communication", title: "Communication (Text 2)", hours: 2, meaning: "Students practise extracting key ideas from a passage on communication, improving their ability to comprehend and respond to unseen texts." },
            { slug: "passage-media-society", title: "Media and Society (Text 3)", hours: 2, meaning: "Students analyse media's role in society through reading exercises, developing awareness of information literacy — crucial for the modern Nepali student." },
            { slug: "passage-history-culture", title: "History and Culture (Text 4)", hours: 2, meaning: "Students engage with texts on history and culture, strengthening reading skills while connecting English learning to Nepali heritage." },
            { slug: "passage-life-love", title: "Life and Love (Text 5)", hours: 2, meaning: "Students read passages on life and love themes, building comprehension and empathetic interpretation skills useful in literature and exams." },
            { slug: "passage-health-exercise", title: "Health and Exercise (Text 6)", hours: 2, meaning: "Students practise reading on health topics, gaining vocabulary and comprehension skills relevant to everyday awareness and NEB exam passages." },
            { slug: "passage-ecology-development", title: "Ecology and Development (Text 7)", hours: 2, meaning: "Students analyse texts linking ecology and development, sharpening critical reading skills while engaging with environmental issues important to Nepal." },
            { slug: "passage-humor-satire", title: "Humor and Satire (Text 8)", hours: 2, meaning: "Students encounter humor and satire in reading passages, learning to identify tone and authorial intent — key skills for literature and comprehension questions." },
            { slug: "passage-democracy-rights", title: "Democracy and Human Rights (Text 9)", hours: 2, meaning: "Students read on democracy and human rights, building civic awareness and the comprehension skills needed for NEB exam passages." },
            { slug: "passage-human-life-family", title: "Human Life and Family Relationship (Text 10)", hours: 2, meaning: "Students analyse family relationship themes in texts, improving reading fluency and interpretive skills tested in NEB examinations." },
            { slug: "passage-arts-creations", title: "Arts and Creations (Text 11)", hours: 2, meaning: "Students engage with texts on arts and creativity, broadening cultural perspective while practising reading comprehension for exams." },
            { slug: "passage-fantasy", title: "Fantasy (Text 12)", hours: 2, meaning: "Students read fantasy passages, developing imagination-based interpretation skills and familiarity with genre-specific vocabulary for NEB exams." },
            { slug: "passage-career-entrepreneurship", title: "Career and Entrepreneurship (Text 13)", hours: 2, meaning: "Students explore career and entrepreneurship themes through reading, building vocabulary and analytical skills relevant to future planning and exams." },
            { slug: "passage-power-politics", title: "Power and Politics (Text 14)", hours: 2, meaning: "Students analyse texts on power and politics, strengthening critical reading and the ability to interpret complex ideas for NEB assessments." },
            { slug: "passage-war-peace", title: "War and Peace (Text 15)", hours: 2, meaning: "Students read passages on war and peace, developing empathetic and analytical reading skills that are essential for literature and comprehension sections." },
            { slug: "passage-critical-thinking", title: "Critical Thinking (Text 16)", hours: 2, meaning: "Students practise critical thinking through reading comprehension, a skill directly tested in NEB exams and vital for academic success across subjects." },
            { slug: "passage-globalisation-diaspora", title: "Globalisation and Diaspora (Text 17)", hours: 2, meaning: "Students engage with texts on globalisation and diaspora, connecting English learning to Nepal's migration context while building exam-ready comprehension skills." },
            { slug: "passage-immigration-identity", title: "Immigration and Identity (Text 18)", hours: 2, meaning: "Students analyse identity and immigration themes in passages, deepening reading comprehension while reflecting on issues central to contemporary Nepal." },
            { slug: "passage-travel-tourism", title: "Travel and Tourism (Text 19)", hours: 2, meaning: "Students read on travel and tourism — a sector vital to Nepal's economy — while practising reading comprehension and related vocabulary for NEB exams." },
            { slug: "passage-science-technology", title: "Science and Technology (Text 20)", hours: 2, meaning: "Students engage with science and technology passages, building technical vocabulary and comprehension skills essential for competitive exams and higher education." },
          ],
        },
        {
          id: "writing-and-composition",
          title: "Writing and Composition",
          hours: 20,
          topics: [
            { slug: "essay-writing", title: "Essay Writing: Narrative, descriptive, expository, argumentative", hours: 6, meaning: "Students learn to write well-structured essays across multiple forms — a core NEB exam skill and essential for academic and professional communication." },
            { slug: "letter-writing", title: "Letter Writing: Formal and informal letters", hours: 4, meaning: "Students practise writing formal and informal letters, building practical writing skills tested in NEB exams and useful in daily life." },
            { slug: "paragraph-writing", title: "Paragraph Writing: Coherence, cohesion, topic sentences", hours: 4, meaning: "Students master paragraph structure with topic sentences and logical flow — foundational for essay writing and NEB exam success." },
            { slug: "summary-note-making", title: "Summary and Note-making", hours: 3, meaning: "Students learn to condense passages into summaries and structured notes, a high-weight NEB exam skill that also supports study habits across subjects." },
            { slug: "article-writing", title: "Article Writing", hours: 3, meaning: "Students practise writing articles on social and contemporary topics, developing persuasive and informative writing skills for NEB exams and real-world communication." },
          ],
        },
        {
          id: "critical-thinking",
          title: "Critical Thinking",
          hours: 15,
          topics: [
            { slug: "literary-devices", title: "Literary Devices: Figure of speech, symbolism, irony, metaphor", hours: 5, meaning: "Students identify and analyse literary devices in texts, a skill essential for interpreting literature and answering NEB exam questions accurately." },
            { slug: "literary-analysis", title: "Literary Analysis and Interpretation", hours: 5, meaning: "Students learn to analyse and interpret literary texts critically, building deeper understanding required for NEB exams and university-level English studies." },
            { slug: "poetic-appreciation", title: "Poetic Appreciation: Meter, rhyme, tone, theme", hours: 5, meaning: "Students develop the ability to appreciate poetry by analysing meter, rhyme, tone, and theme — directly tested in NEB literature papers." },
          ],
        },
        {
          id: "short-stories",
          title: "Short Stories",
          hours: 21,
          topics: [
            { slug: "story-selfish-giant", title: "The Selfish Giant by Oscar Wilde", hours: 3, meaning: "Students analyse Wilde's tale of redemption and compassion, learning to interpret themes, characters, and moral messages — key skills for NEB literature exams." },
            { slug: "story-oval-portrait", title: "The Oval Portrait by Edgar Allan Poe", hours: 3, meaning: "Students study Poe's Gothic short story, developing skills in analysing symbolism, suspense, and the relationship between art and life for NEB assessments." },
            { slug: "story-god-sees-truth", title: "God Sees the Truth but Waits by Leo Tolstoy", hours: 3, meaning: "Students explore Tolstoy's story of injustice and patience, building interpretive skills and understanding of moral themes tested in NEB literature papers." },
            { slug: "story-the-wish", title: "The Wish by Roald Dahl", hours: 3, meaning: "Students analyse Dahl's darkly humorous tale, learning to identify narrative voice, irony, and theme — skills directly applicable to NEB exam questions." },
            { slug: "story-civil-peace", title: "Civil Peace by Chinua Achebe", hours: 3, meaning: "Students examine Achebe's post-war narrative, developing comprehension of theme, character, and social context — essential for NEB literature analysis." },
            { slug: "story-little-soldiers", title: "The Little Soldiers by Guy de Maupassant", hours: 3, meaning: "Students study Maupassant's portrayal of childhood and war, building literary interpretation skills required for NEB exam passage and prose questions." },
            { slug: "story-astrologers-day", title: "An Astrologer's Day by R.K. Narayan", hours: 3, meaning: "Students analyse Narayan's story of fate and identity, developing skills in interpreting character motivation and thematic depth for NEB literature exams." },
          ],
        },
        {
          id: "poems",
          title: "Poems",
          hours: 15,
          topics: [
            { slug: "poem-corona-says", title: "Corona Says by Vishnu S. Rai", hours: 3, meaning: "Students analyse a contemporary Nepali poem in English about the pandemic, connecting literature to current events while building appreciation skills for NEB exams." },
            { slug: "poem-red-red-rose", title: "A Red, Red Rose by Robert Burns", hours: 3, meaning: "Students study Burns' classic love poem, learning to appreciate imagery, metaphor, and romantic themes — a staple of NEB poetry papers." },
            { slug: "poem-all-worlds-stage", title: "All the World's a Stage by William Shakespeare", hours: 3, meaning: "Students analyse Shakespeare's famous soliloquy on life's stages, developing poetic interpretation skills essential for NEB literature examinations." },
            { slug: "poem-who-are-you-little-i", title: "Who are you, little i? by E.E. Cummings", hours: 3, meaning: "Students explore Cummings' nature-themed poem about identity and the self, building modern poetry appreciation skills tested in NEB exams." },
            { slug: "poem-gift-war-time", title: "The Gift in War Time by Tran Mong Tu", hours: 3, meaning: "Students analyse a Vietnamese war poem translated into English, developing cross-cultural literary appreciation and skills for NEB poetry questions." },
          ],
        },
        {
          id: "essays",
          title: "Essays",
          hours: 15,
          topics: [
            { slug: "essay-sharing-tradition", title: "Sharing Tradition by Frank LaPena", hours: 3, meaning: "Students analyse an essay on cultural tradition and sharing, building skills in understanding authorial purpose and thematic depth for NEB exam preparation." },
            { slug: "essay-how-to-live", title: "How To Live Before You Die by Steve Jobs", hours: 3, meaning: "Students read Jobs' reflective essay on purpose and living fully, connecting personal narrative to literary analysis skills required in NEB examinations." },
            { slug: "essay-what-i-require", title: "What I Require from Life by J.B.S. Haldane", hours: 3, meaning: "Students explore Haldane's essay on scientific curiosity and life values, developing appreciation for essay form and thematic analysis for NEB papers." },
            { slug: "essay-what-is-poverty", title: "What is Poverty? by Joe Goodwin Parker", hours: 3, meaning: "Students analyse an essay on poverty, building critical reading and social awareness skills essential for NEB exam comprehension and essay questions." },
            { slug: "essay-scientific-research", title: "Scientific Research is a Token of Humankind's Survival by Vladimir Keilis-Borok", hours: 3, meaning: "Students engage with a scientific essay on research importance, developing expository reading skills and vocabulary relevant to NEB literature and language papers." },
          ],
        },
        {
          id: "one-act-plays",
          title: "One Act Plays",
          hours: 15,
          topics: [
            { slug: "play-trifles", title: "Trifles by Susan Glaspell", hours: 5, meaning: "Students analyse Glaspell's one-act play on gender and justice, developing dramatic interpretation skills essential for NEB literature exams and critical thinking." },
            { slug: "play-sunny-morning", title: "A Sunny Morning by Serafin and Foaquin Alvarez Quintero", hours: 5, meaning: "Students study this Spanish one-act play's depiction of love and misunderstanding, building戏剧 analysis skills required for NEB exam questions on drama." },
            { slug: "play-refund", title: "Refund by Fritz Karinthy", hours: 5, meaning: "Students analyse Karinthy's satirical play on language and communication, developing dramatic appreciation and thematic interpretation skills for NEB literature papers." },
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
            { slug: "poem-grand-mother", title: "Grand Mother", hours: 3, meaning: "Students analyse this poem on generational bonds and memory, building poetic appreciation skills essential for NEB literature examinations." },
            { slug: "poem-about-love", title: "About Love", hours: 3, meaning: "Students explore thematic interpretations of love in poetry, developing analytical skills tested in NEB literature papers." },
            { slug: "poem-every-morning-i-wake", title: "Every Morning I Wake", hours: 3, meaning: "Students study this daily-life poem, practising thematic analysis and appreciation skills required for NEB poetry questions." },
            { slug: "story-neighbours", title: "Neighbours", hours: 3, meaning: "Students analyse a short story on community and relationships, building prose interpretation skills for NEB literature exams." },
            { slug: "story-respectable-woman", title: "A Respectable Woman", hours: 3, meaning: "Students examine Hemon's story on cultural identity and respectability, developing literary analysis skills essential for NEB assessments." },
            { slug: "story-devoted-son", title: "A Devoted Son", hours: 3, meaning: "Students analyse Varadarajan's story on filial duty and cultural clash, building interpretive skills for NEB exam literature sections." },
            { slug: "story-hurried-trip", title: "Hurried Trip to Avoid a Bad Star", hours: 3, meaning: "Students study a story exploring fate and human agency, developing narrative comprehension skills required for NEB literature exams." },
            { slug: "story-a-story", title: "A Story", hours: 3, meaning: "Students analyse a short narrative, practising identification of theme, character, and plot structure for NEB examination success." },
            { slug: "story-board House", title: "The Boarding House", hours: 3, meaning: "Students study Joyce's story on social constraints and choice, building modernist literature interpretation skills for NEB exams." },
            { slug: "play-purgatory", title: "Purgatory", hours: 4, meaning: "Students analyse Yeats' one-act play on memory and redemption, developing dramatic interpretation skills tested in NEB literature papers." },
            { slug: "play-marriage-social-institution", title: "Marriage as a Social Institution", hours: 4, meaning: "Students examine a play critiquing marriage conventions, building critical analysis and戏剧 appreciation skills for NEB exams." },
            { slug: "play-very-old-man-wings", title: "A Very Old Man with Enormous Wings", hours: 4, meaning: "Students study Marquez's magical realist play, developing skills in interpreting symbolism, genre, and thematic depth for NEB literature papers." },
            { slug: "play-facing-death", title: "Facing Death", hours: 4, meaning: "Students analyse Strindberg's drama on mortality and human connection, building dramatic interpretation skills essential for NEB examinations." },
            { slug: "essay-womens-business", title: "Women's Business", hours: 3, meaning: "Students read an essay on women's roles and entrepreneurship, developing expository comprehension skills for NEB literature and language papers." },
            { slug: "essay-child-born", title: "A Child is Born", hours: 3, meaning: "Students analyse an essay on new life and parental responsibility, building reading comprehension and thematic analysis skills for NEB exams." },
          ],
        },
        {
          id: "writing-skills",
          title: "Writing Skills",
          hours: 32,
          topics: [
            { slug: "essay-writing-arg", title: "Essay Writing — argumentative, descriptive, narrative, expository", hours: 8, meaning: "Students master all major essay forms — a high-weight NEB exam skill and a foundational communication ability for university and professional life." },
            { slug: "letter-writing-formal", title: "Formal Letter Writing: job application, complaint, inquiry", hours: 6, meaning: "Students practise formal letter formats for jobs, complaints, and inquiries — practical writing skills tested in NEB exams and essential for real-world communication." },
            { slug: "letter-writing-informal", title: "Informal Letter Writing", hours: 4, meaning: "Students learn to write personal letters with appropriate tone and structure, building versatile writing skills for NEB exams and everyday use." },
            { slug: "report-writing", title: "Report Writing and Summarisation", hours: 6, meaning: "Students develop report-writing and summarisation skills, key competencies for NEB exams and academic research across all subjects." },
            { slug: "note-making", title: "Note-making and Article Writing", hours: 8, meaning: "Students master note-making techniques and article writing — high-weight NEB exam skills that also support effective studying and communication." },
          ],
        },
        {
          id: "oral-communication",
          title: "Oral Communication",
          hours: 16,
          topics: [
            { slug: "conversation-role-play", title: "Conversation and Role Play", hours: 4, meaning: "Students practise interactive spoken English through conversations and role plays, building fluency and confidence for NEB oral assessments and real-life situations." },
            { slug: "presentation-skills", title: "Presentation Skills", hours: 4, meaning: "Students learn to organise and deliver presentations effectively, a skill tested in NEB oral exams and vital for academic and professional success." },
            { slug: "debate-discussion", title: "Debate and Discussion", hours: 4, meaning: "Students develop argumentative speaking skills through debates and discussions, building critical thinking and fluency tested in NEB oral examinations." },
            { slug: "listening-comprehension", title: "Listening Comprehension", hours: 4, meaning: "Students practise understanding spoken English on various topics, building the listening skills assessed in NEB oral papers and essential for real-world communication." },
          ],
        },
        {
          id: "grammar",
          title: "Grammar",
          hours: 24,
          topics: [
            { slug: "grammar-tenses", title: "Tenses and their uses", hours: 4, meaning: "Students master tense usage — the most frequently tested grammar topic in NEB exams and essential for accurate written and spoken English." },
            { slug: "grammar-clauses", title: "Clauses and sentence types", hours: 4, meaning: "Students learn to identify and construct clauses and sentence types, building the grammatical foundation required for NEB transformations and composition questions." },
            { slug: "grammar-voice-narration", title: "Voice and Narration (Direct & Indirect)", hours: 4, meaning: "Students practise changing active to passive voice and direct to indirect narration — staple NEB exam topics with high marking weight." },
            { slug: "grammar-modals-conditionals", title: "Modals and conditionals", hours: 4, meaning: "Students master modal verbs and conditional structures, commonly tested in NEB exams and essential for expressing nuance in English communication." },
            { slug: "grammar-punctuation", title: "Punctuation and capitalisation", hours: 2, meaning: "Students learn correct punctuation and capitalisation rules, a fundamental skill for NEB writing exams and clear written communication." },
            { slug: "grammar-word-class", title: "Word classes, prefixes, suffixes, dictionary skills", hours: 2, meaning: "Students study word classes and affixation, building vocabulary and grammatical awareness tested in NEB language papers." },
            { slug: "grammar-transformations", title: "Sentence transformation and correction", hours: 4, meaning: "Students practise transforming and correcting sentences — one of the highest-weight grammar sections in NEB examinations." },
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
            { slug: "prose-magical-library", title: "The Magical Library (Reading Comprehension Passage)", hours: 3, meaning: "Students practise reading comprehension on an original prose passage, building the core skill directly tested in NEB exam Section I." },
            // Short Stories — new course additions marked
            { slug: "story-selfish-giant", title: "The Selfish Giant by Oscar Wilde", hours: 3, addedInYear: 2083, meaning: "Students analyse Wilde's tale of redemption and compassion — a new addition to the 2083 course that builds literary interpretation skills for NEB exams." },
            { slug: "story-oval-portrait", title: "The Oval Portrait by Edgar Allan Poe", hours: 3, addedInYear: 2083, meaning: "Students study Poe's Gothic short story, developing skills in analysing symbolism and the art-life relationship for NEB literature assessments." },
            { slug: "story-god-sees-truth", title: "God Sees the Truth but Waits by Leo Tolstoy", hours: 3, addedInYear: 2083, meaning: "Students explore Tolstoy's story of injustice and moral patience, building interpretive skills required for NEB literature exam questions." },
            { slug: "story-the-wish", title: "The Wish by Roald Dahl", hours: 3, addedInYear: 2083, meaning: "Students analyse Dahl's darkly humorous tale, learning to identify narrative voice and irony — skills directly applicable to NEB exam questions." },
            { slug: "story-civil-peace", title: "Civil Peace by Chinua Achebe", hours: 3, addedInYear: 2083, meaning: "Students examine Achebe's post-war narrative, developing comprehension of theme, character, and social context essential for NEB literature analysis." },
            { slug: "story-little-soldiers", title: "The Little Soldiers by Guy de Maupassant", hours: 3, addedInYear: 2083, meaning: "Students study Maupassant's portrayal of childhood and war, building literary interpretation skills required for NEB exam prose questions." },
            { slug: "story-astrologers-day", title: "An Astrologer's Day by R.K. Narayan", hours: 3, addedInYear: 2083, meaning: "Students analyse Narayan's story of fate and identity, developing skills in interpreting character motivation and thematic depth for NEB literature exams." },
            // Poems — new course additions marked
            { slug: "poem-corona-says", title: "Corona Says by Vishnu S. Rai", hours: 3, addedInYear: 2083, meaning: "Students analyse a contemporary Nepali poem in English about the pandemic, connecting literature to current events while building appreciation skills for NEB exams." },
            { slug: "poem-red-red-rose", title: "A Red, Red Rose by Robert Burns", hours: 3, addedInYear: 2083, meaning: "Students study Burns' classic love poem, learning to appreciate imagery, metaphor, and romantic themes — a staple of NEB poetry papers." },
            { slug: "poem-all-worlds-stage", title: "All the World's a Stage by William Shakespeare", hours: 3, addedInYear: 2083, meaning: "Students analyse Shakespeare's famous soliloquy on life's stages, developing poetic interpretation skills essential for NEB literature examinations." },
            { slug: "poem-who-are-you-little-i", title: "Who are you, little i? by E.E. Cummings", hours: 3, addedInYear: 2083, meaning: "Students explore Cummings' nature-themed poem about identity and the self, building modern poetry appreciation skills tested in NEB exams." },
            { slug: "poem-gift-war-time", title: "The Gift in War Time by Tran Mong Tu", hours: 3, addedInYear: 2083, meaning: "Students analyse a Vietnamese war poem translated into English, developing cross-cultural literary appreciation and skills for NEB poetry questions." },
            // Retained from old course
            { slug: "poem-every-morning-i-wake", title: "Every Morning I Wake", hours: 3, meaning: "Students study this daily-life poem, practising thematic analysis and appreciation skills required for NEB poetry questions." },
            { slug: "poem-a-day", title: "A Day by Emily Dickinson", hours: 3, addedInYear: 2083, meaning: "Students analyse Dickinson's concise poem on the cycle of a day, building modern poetry interpretation skills added to the 2083 NEB syllabus." },
            { slug: "story-neighbours", title: "Neighbours", hours: 3, meaning: "Students analyse a short story on community and relationships, building prose interpretation skills for NEB literature exams." },
            { slug: "story-respectable-woman", title: "A Respectable Woman", hours: 3, meaning: "Students examine Hemon's story on cultural identity and respectability, developing literary analysis skills essential for NEB assessments." },
            { slug: "story-devoted-son", title: "A Devoted Son", hours: 3, meaning: "Students analyse Varadarajan's story on filial duty and cultural clash, building interpretive skills for NEB exam literature sections." },
            { slug: "story-hurried-trip", title: "Hurried Trip to Avoid a Bad Star", hours: 3, meaning: "Students study a story exploring fate and human agency, developing narrative comprehension skills required for NEB literature exams." },
            { slug: "story-a-story", title: "A Story", hours: 3, meaning: "Students analyse a short narrative, practising identification of theme, character, and plot structure for NEB examination success." },
            { slug: "story-board-house", title: "The Boarding House", hours: 3, meaning: "Students study Joyce's story on social constraints and choice, building modernist literature interpretation skills for NEB exams." },
            // Essays
            { slug: "essay-sharing-tradition", title: "Sharing Tradition by Frank LaPena", hours: 3, addedInYear: 2083, meaning: "Students analyse an essay on cultural tradition and sharing, building skills in understanding authorial purpose and thematic depth for NEB exam preparation." },
            { slug: "essay-how-to-live", title: "How To Live Before You Die by Steve Jobs", hours: 3, addedInYear: 2083, meaning: "Students read Jobs' reflective essay on purpose and living fully, connecting personal narrative to literary analysis skills required in NEB examinations." },
            { slug: "essay-what-i-require", title: "What I Require from Life by J.B.S. Haldane", hours: 3, addedInYear: 2083, meaning: "Students explore Haldane's essay on scientific curiosity and life values, developing appreciation for essay form and thematic analysis for NEB papers." },
            { slug: "essay-what-is-poverty", title: "What is Poverty? by Joe Goodwin Parker", hours: 3, addedInYear: 2083, meaning: "Students analyse an essay on poverty, building critical reading and social awareness skills essential for NEB exam comprehension and essay questions." },
            { slug: "essay-scientific-research", title: "Scientific Research is a Token of Humankind's Survival by Vladimir Keilis-Borok", hours: 3, addedInYear: 2083, meaning: "Students engage with a scientific essay on research importance, developing expository reading skills and vocabulary relevant to NEB literature and language papers." },
            { slug: "essay-on-libraries", title: "On Libraries", hours: 3, meaning: "Students analyse an essay on the value of libraries, building expository comprehension and thematic interpretation skills for NEB exam preparation." },
            { slug: "essay-human-rights-inequality", title: "Human Rights and the Age of Inequality", hours: 3, meaning: "Students read an essay on human rights and inequality, developing critical reading skills and civic awareness relevant to NEB literature and language papers." },
            { slug: "essay-womens-business", title: "Women's Business", hours: 3, meaning: "Students read an essay on women's roles and entrepreneurship, developing expository comprehension skills for NEB literature and language papers." },
            { slug: "essay-child-born", title: "A Child is Born", hours: 3, meaning: "Students analyse an essay on new life and parental responsibility, building reading comprehension and thematic analysis skills for NEB exams." },
            // One Act Plays
            { slug: "play-trifles", title: "Trifles by Susan Glaspell", hours: 5, addedInYear: 2083, meaning: "Students analyse Glaspell's one-act play on gender and justice — a 2083 course addition that builds dramatic interpretation skills for NEB literature exams." },
            { slug: "play-sunny-morning", title: "A Sunny Morning by Serafin and Foaquin Alvarez Quintero", hours: 5, addedInYear: 2083, meaning: "Students study this Spanish one-act play's depiction of love and misunderstanding, building戏剧 analysis skills required for NEB exam questions on drama." },
            { slug: "play-refund", title: "Refund by Fritz Karinthy", hours: 5, addedInYear: 2083, meaning: "Students analyse Karinthy's satirical play on language and communication — a 2083 addition that develops dramatic appreciation for NEB literature papers." },
            { slug: "play-purgatory", title: "Purgatory", hours: 4, meaning: "Students analyse Yeats' one-act play on memory and redemption, developing dramatic interpretation skills tested in NEB literature papers." },
            { slug: "play-marriage-social-institution", title: "Marriage as a Social Institution", hours: 4, meaning: "Students examine a play critiquing marriage conventions, building critical analysis and戏剧 appreciation skills for NEB exams." },
            { slug: "play-very-old-man-wings", title: "A Very Old Man with Enormous Wings", hours: 4, meaning: "Students study Marquez's magical realist play, developing skills in interpreting symbolism, genre, and thematic depth for NEB literature papers." },
            { slug: "play-facing-death", title: "Facing Death by August Strindberg", hours: 4, meaning: "Students analyse Strindberg's drama on mortality and human connection, building dramatic interpretation skills essential for NEB examinations." },
          ],
        },
        {
          id: "writing-skills",
          title: "Writing Skills",
          hours: 32,
          topics: [
            { slug: "writing-essay-arg", title: "Essay Writing — argumentative, descriptive, narrative, expository", hours: 8, meaning: "Students master all major essay forms — a high-weight NEB exam skill and a foundational communication ability for university and professional life." },
            { slug: "writing-letter-formal", title: "Formal Letter Writing: letter to editor, job application, complaint", hours: 6, meaning: "Students practise formal letter formats including letters to editors, job applications, and complaints — practical writing skills tested in NEB exams and essential for real-world communication." },
            { slug: "writing-letter-informal", title: "Informal Letter Writing", hours: 4, meaning: "Students learn to write personal letters with appropriate tone and structure, building versatile writing skills for NEB exams and everyday use." },
            { slug: "writing-report", title: "Report Writing and Summarisation", hours: 6, meaning: "Students develop report-writing and summarisation skills, key competencies for NEB exams and academic research across all subjects." },
            { slug: "writing-note-making", title: "Note-making and Article Writing", hours: 8, meaning: "Students master note-making techniques and article writing — high-weight NEB exam skills that also support effective studying and communication." },
          ],
        },
        {
          id: "oral-communication",
          title: "Oral Communication",
          hours: 16,
          topics: [
            { slug: "oral-conversation", title: "Conversation and Role Play", hours: 4, meaning: "Students practise interactive spoken English through conversations and role plays, building fluency and confidence for NEB oral assessments and real-life situations." },
            { slug: "oral-presentation", title: "Presentation Skills", hours: 4, meaning: "Students learn to organise and deliver presentations effectively, a skill tested in NEB oral exams and vital for academic and professional success." },
            { slug: "oral-debate", title: "Debate and Discussion", hours: 4, meaning: "Students develop argumentative speaking skills through debates and discussions, building critical thinking and fluency tested in NEB oral examinations." },
            { slug: "oral-listening", title: "Listening Comprehension", hours: 4, meaning: "Students practise understanding spoken English on various topics, building the listening skills assessed in NEB oral papers and essential for real-world communication." },
          ],
        },
        {
          id: "grammar",
          title: "Grammar",
          hours: 24,
          topics: [
            { slug: "grammar-tenses", title: "Tenses and their uses", hours: 4, meaning: "Students master tense usage — the most frequently tested grammar topic in NEB exams and essential for accurate written and spoken English." },
            { slug: "grammar-clauses-types", title: "Clauses and sentence types", hours: 4, meaning: "Students learn to identify and construct clauses and sentence types, building the grammatical foundation required for NEB transformations and composition questions." },
            { slug: "grammar-voice", title: "Voice (Active and Passive)", hours: 3, meaning: "Students practise changing between active and passive voice — a staple NEB exam topic with consistent marking weight across all sessions." },
            { slug: "grammar-narration", title: "Narration (Direct and Indirect)", hours: 3, meaning: "Students master direct and indirect narration conversion, one of the highest-frequency grammar topics tested in NEB examinations." },
            { slug: "grammar-modals", title: "Modals and conditionals", hours: 4, meaning: "Students master modal verbs and conditional structures, commonly tested in NEB exams and essential for expressing nuance in English communication." },
            { slug: "grammar-punctuation", title: "Punctuation and capitalisation", hours: 2, meaning: "Students learn correct punctuation and capitalisation rules, a fundamental skill for NEB writing exams and clear written communication." },
            { slug: "grammar-word-formation", title: "Word formation: prefixes, suffixes, word classes", hours: 2, meaning: "Students study word formation through affixation and word classes, building vocabulary and grammatical awareness tested in NEB language papers." },
            { slug: "grammar-transform", title: "Sentence transformation and correction", hours: 4, meaning: "Students practise transforming and correcting sentences — one of the highest-weight grammar sections in NEB examinations." },
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
