/**
 * Pro Knowledge — English Grammar chapters.
 */

import type { KnowledgeChapter } from "@/features/knowledge/types";

export const GRAMMAR_CHAPTERS: KnowledgeChapter[] = [
  {
    id: "parts-of-speech",
    title: "Parts of Speech",
    classLevel: "class-11",
    blurb:
      "Noun, pronoun, adjective, verb, adverb, preposition, conjunction and interjection — with the sub-classifications exams actually test.",
    theory: [
      {
        heading: "The eight classes and why the label depends on the job",
        level: "basic",
        body:
          "A word's part of speech is decided by the work it does in the sentence, not by the word itself. 'Light' is a noun in 'the light is out', an adjective in 'a light bag', a verb in 'light the lamp'. Whenever a question gives a single word in isolation, the answer is that it cannot be classified with certainty.",
      },
      {
        heading: "Nouns and their types",
        level: "standard",
        body:
          "Common nouns name a class, proper nouns name a particular one (always capitalised), collective nouns name a group, material nouns name a substance and abstract nouns name a quality or state. Countable nouns take a plural and a/an; uncountable nouns take quantifiers such as much, little, a piece of.",
        math: "\\text{Uncountable} + \\text{singular verb}",
      },
      {
        heading: "Adjectives and their order",
        level: "standard",
        body:
          "Adjectives follow a fixed order in English: opinion, size, age, shape, colour, origin, material, purpose. That is why 'a lovely little old round brown wooden table' sounds right and any reshuffle sounds wrong. Comparatives use -er/more and superlatives -est/most, with irregulars like good–better–best.",
      },
      {
        heading: "Verbs, finite vs non-finite",
        level: "pro",
        body:
          "Finite verbs change with the subject and tense and can stand alone as the main verb. Non-finite forms — infinitives, gerunds and participles — cannot. A sentence needs at least one finite verb, so recognising which verb is finite fixes the clause boundary, which is the foundation of all clause analysis.",
      },
      {
        heading: "Adverbs, prepositions and conjunctions",
        level: "pro",
        body:
          "Adverbs modify verbs, adjectives or other adverbs and answer how, when, where or how often. Prepositions show the relation of a noun to another word; the same word can be a preposition or a particle in a phrasal verb. Coordinating conjunctions join equals (FANBOYS), subordinating conjunctions join a dependent to an independent clause.",
      },
    ],
    formulas: [
      {
        name: "Adjective order",
        latex: "\\text{opinion} \\to \\text{size} \\to \\text{age} \\to \\text{shape} \\to \\text{colour} \\to \\text{origin} \\to \\text{material} \\to \\text{purpose}",
        symbols: [{ sym: "→", meaning: "the fixed left-to-right order before the noun" }],
        when: "Two or more adjectives before one noun.",
        hook: "OSASCOMP — opinion, size, age, shape, colour, origin, material, purpose.",
      },
      {
        name: "Countable vs uncountable quantifiers",
        latex: "\\text{many / few / number} \\ (\\text{count}) \\quad\\text{vs}\\quad \\text{much / little / amount} \\ (\\text{mass})",
        symbols: [{ sym: "few, little", meaning: "negative sense (not enough)" }],
        when: "Choosing between much and many, or few and little.",
        hook: "A few = some (positive); few = almost none (negative).",
      },
      {
        name: "Comparative and superlative",
        latex: "\\text{short: } -er/\\ -est; \\qquad \\text{long: } more/\\ most",
        symbols: [{ sym: "than", meaning: "used only with comparatives" }],
        when: "One-syllable words take -er; three or more use more/most; two-syllable vary.",
      },
      {
        name: "Subject–verb agreement basics",
        latex: "\\text{Singular subject} \\to s\\text{-verb}; \\qquad \\text{Plural} \\to \\text{base verb}",
        symbols: [{ sym: "s-verb", meaning: "verb with third-person -s" }],
        when: "Intervening phrases do not change the number of the subject.",
      },
    ],
    specialCases: [
      {
        title: "Collective nouns",
        condition: "Acting as one unit vs as individuals",
        result: "\\text{One unit} \\to \\text{singular}; \\ \\text{members} \\to \\text{plural}",
        why: "'The team is winning' treats it as one body; 'the team are arguing' treats the members separately.",
      },
      {
        title: "Either/neither + of",
        condition: "Followed by a plural noun",
        result: "\\text{Takes a singular verb}",
        why: "The grammatical head is 'either', which is singular even though the noun after 'of' is plural.",
      },
      {
        title: "Nouns plural in form, singular in sense",
        condition: "Physics, mathematics, news, measles",
        result: "\\text{Singular verb}",
        why: "These are names of subjects or conditions, not plural counts.",
      },
      {
        title: "Nouns always plural",
        condition: "Scissors, trousers, cattle, police",
        result: "\\text{Plural verb}",
        why: "They denote pairs or groups and have no singular form in English.",
      },
      {
        title: "Adjective used as a noun",
        condition: "'the rich', 'the poor'",
        result: "\\text{Plural verb}",
        why: "'The rich are…' refers to a whole class, so it takes a plural verb.",
      },
    ],
    tricks: [
      {
        title: "Verb test for word class",
        how:
          "If you can put 'to' before the word and it makes sense, it is a verb. Insert a describing word before a noun to test whether it is an adjective.",
        example: "Fast food (adjective) vs he fasts (verb) vs he runs fast (adverb).",
        saves: "~15 s",
      },
      {
        title: "OSASCOMP for adjective order",
        how: "Run through opinion → size → age → shape → colour → origin → material → purpose in that order.",
        example: "A beautiful big old round brown Italian wooden dining table.",
        saves: "Guarantees the arrangement mark",
      },
      {
        title: "Much/many by sight",
        how:
          "If it can be counted with numbers, use many/few/number; if it is measured, use much/little/amount.",
        example: "Information (mass) → much information; books (count) → many books.",
        saves: "~10 s",
      },
      {
        title: "Cross out the middle for agreement",
        how:
          "Delete prepositional phrases between subject and verb and check agreement on what remains.",
        example: "The box of chocolates (is/are) — 'box' governs → is.",
        saves: "~10 s",
      },
    ],
    mistakes: [
      {
        wrong: "'I have many informations.'",
        right: "'Information' is uncountable — 'a lot of information' or 'much information'.",
        why: "Uncountable nouns have no plural form.",
      },
      {
        wrong: "'He is more taller than me.'",
        right: "'He is taller than I am.' — one comparative form only, and the pronoun takes the subject case.",
        why: "Double comparatives are always wrong in standard English.",
      },
      {
        wrong: "Labelling a word's part of speech without context.",
        right: "Decide the class only after reading the sentence.",
        why: "Word class is a function of use, not of spelling.",
      },
      {
        wrong: "Mixing 'less' with countable nouns.",
        right: "'Fewer people', 'less water'.",
        why: "Less is for mass quantities; fewer for countable items.",
      },
    ],
  },

  {
    id: "tenses",
    title: "Tenses",
    classLevel: "both",
    blurb:
      "All twelve tenses, time markers, perfect vs continuous logic, sequence of tenses and the tense shifts examiners love to test.",
    theory: [
      {
        heading: "The two-axis system: time × aspect",
        level: "basic",
        body:
          "Tense is time (present, past, future) crossed with aspect (simple, continuous, perfect, perfect continuous) — twelve combinations. Simple states a fact or habitual action, continuous shows it in progress, perfect shows completion with relevance to a reference time, and perfect continuous joins duration to ongoing activity.",
      },
      {
        heading: "Present perfect vs simple past",
        level: "standard",
        body:
          "Simple past pins the action to finished time (yesterday, in 2019, last week). Present perfect links a past action to now with no finished-time marker and is used with just, already, yet, ever, never, since, for. If a sentence contains a finished-time adverb, the answer can never be present perfect.",
        math: "\\text{Finished time} \\to \\text{past simple}; \\quad \\text{Link to now} \\to \\text{present perfect}",
      },
      {
        heading: "Continuous forms and stative verbs",
        level: "standard",
        body:
          "Continuous tenses show an action in progress around a point in time. Stative verbs of thinking, liking, possession and appearance (know, believe, like, own, seem) normally resist continuous forms — 'I know' not 'I am knowing'. When they do take continuous, the meaning changes: 'I am seeing him' means meeting, not perceiving.",
      },
      {
        heading: "Sequence of tenses",
        level: "pro",
        body:
          "In reported speech and complex sentences the main clause's tense governs the subordinate clause: a past main verb usually pulls the subordinate verb back one step (present → past, past → past perfect, will → would). Exceptions are universal truths and habitual facts, which stay in the present.",
        math: "\\text{Past main} \\Rightarrow \\text{subordinate shifts one step back}",
      },
      {
        heading: "Future forms and their differences",
        level: "pro",
        body:
          "'Will' expresses a decision or prediction made now; 'going to' expresses a prior plan or strong evidence; the present continuous expresses a fixed arrangement; the present simple expresses a timetable. Choosing correctly is what advanced grammar questions test.",
      },
    ],
    formulas: [
      {
        name: "Twelve-tense grid",
        latex: "3 \\text{ times} \\times 4 \\text{ aspects} = 12 \\text{ tenses}",
        symbols: [{ sym: "aspect", meaning: "simple, continuous, perfect, perfect continuous" }],
        when: "Naming a tense; always give both time and aspect.",
      },
      {
        name: "Present perfect formula",
        latex: "has/have + \\text{past participle (V3)}",
        symbols: [{ sym: "V3", meaning: "third form of the verb" }],
        when: "Past action with present relevance; no finished-time adverb.",
      },
      {
        name: "Past perfect formula",
        latex: "had + V3",
        symbols: [{ sym: "had", meaning: "the earlier of two past actions" }],
        when: "The first of two past events, often with before/after/already/by the time.",
      },
      {
        name: "Future perfect formula",
        latex: "will have + V3",
        symbols: [{ sym: "by + future time", meaning: "the completion deadline" }],
        when: "Action finished before a stated future point: 'By 2030 I will have graduated.'",
      },
      {
        name: "Perfect continuous formula",
        latex: "has/have/had \\; been + V\\text{-ing}",
        symbols: [{ sym: "been", meaning: "the continuous marker inside the perfect" }],
        when: "Duration of an ongoing action up to a point: 'for two hours', 'since 2020'.",
      },
    ],
    specialCases: [
      {
        title: "'Since' vs 'for'",
        condition: "Point in time vs period of time",
        result: "since + \\text{point} (since 2019); \\quad for + \\text{period} (for 6 years)",
        why: "Since marks the starting point; for measures the length — using them interchangeably is the classic error.",
        askedIn: "Fill-in-the-blank questions.",
      },
      {
        title: "Universal truth in reported speech",
        condition: "Main verb past + general fact",
        result: "\\text{Subordinate stays present}",
        why: "'He said the earth revolves around the sun' — the truth is timeless, so no backshift.",
      },
      {
        title: "Time clause takes no 'will'",
        condition: "when, as soon as, until, before, after",
        result: "\\text{Use present simple for future meaning}",
        why: "'When he comes, we will start' — never 'when he will come'.",
      },
      {
        title: "Already, just, yet",
        condition: "Present perfect signals",
        result: "\\text{Present perfect, not past simple}",
        why: "These markers connect the action to the present moment.",
      },
      {
        title: "Habitual past with 'used to'",
        condition: "Past routine no longer true",
        result: "used\\ to + \\text{base verb}",
        why: "Distinguishes a former habit from a single past event; the negative is 'didn't use to'.",
      },
    ],
    tricks: [
      {
        title: "Time-marker decides the tense",
        how:
          "Scan for the time expression first; it eliminates wrong options instantly.",
        example: "yesterday → past simple; so far → present perfect; by next June → future perfect.",
        saves: "~20 s per question",
      },
      {
        title: "Backshift ladder",
        how:
          "Present → past, past → past perfect, will → would, can → could, may → might, must → had to.",
        example: "'I can swim' → 'He said he could swim'.",
        saves: "~15 s",
      },
      {
        title: "Since/for in one glance",
        how: "A year or clock time after the word → since. A number of days/weeks/years → for.",
        example: "since Monday, for three days.",
        saves: "~10 s",
      },
      {
        title: "Stative verbs never take -ing",
        how:
          "Memorise the stative list (know, believe, own, belong, contain, seem, prefer) and reject continuous options.",
        example: "'I am loving it' is informal; in exams choose 'I love it'.",
        saves: "~10 s",
      },
    ],
    mistakes: [
      {
        wrong: "'I have seen him yesterday.'",
        right: "'I saw him yesterday.'",
        why: "A finished-time adverb forbids the present perfect.",
      },
      {
        wrong: "'When she will arrive, call me.'",
        right: "'When she arrives, call me.'",
        why: "Time clauses use the present simple for future meaning.",
      },
      {
        wrong: "'He said he is busy.'",
        right: "'He said he was busy.'",
        why: "Reported speech backshifts unless the situation is still true right now.",
      },
      {
        wrong: "'I am knowing the answer.'",
        right: "'I know the answer.'",
        why: "Stative verbs are not used in continuous tenses.",
      },
      {
        wrong: "Mixing tenses within one narrative sentence.",
        right: "Keep a consistent reference time unless the sequence genuinely changes.",
        why: "Tense inconsistency is the single most penalised writing error.",
      },
    ],
  },

  {
    id: "voice-narration",
    title: "Voice & Narration",
    classLevel: "both",
    blurb:
      "Active to passive transformation, agent omission, special passive patterns, and direct to indirect speech with all sentence types.",
    theory: [
      {
        heading: "Active vs passive — the information shift",
        level: "basic",
        body:
          "Active voice makes the doer the subject; passive voice makes the receiver the subject and demotes the doer into a by-phrase or drops it. Passive is preferred when the doer is unknown, unimportant or obvious, which is why scientific writing uses it heavily.",
      },
      {
        heading: "The transformation steps",
        level: "standard",
        body:
          "Move the object to subject position, put the verb into be + past participle matching the original tense, and add 'by' + the original subject in the objective case. The tense does not change — only the voice. Continuous and perfect tenses keep their auxiliary structure inside the be-form.",
        math: "S + V + O \\Rightarrow O + \\text{be} + V3 + \\text{by S}",
      },
      {
        heading: "Special passive patterns",
        level: "pro",
        body:
          "Imperatives become 'Let + object + be + V3' or 'You are requested to…'. Interrogatives keep their question word and invert the auxiliary. Sentences with two objects allow two passives, with the person usually preferred as subject. 'There is no…' and intransitive verbs have no passive at all.",
      },
      {
        heading: "Direct to indirect speech",
        level: "pro",
        body:
          "Remove the quotation marks, introduce that (or if/whether for yes-no questions, or the wh-word for wh-questions), backshift the tense, change pronouns according to the rule SON (subject of reporting verb → object of reporting verb → no change), and adjust time and place adverbs. Imperatives use ordered/requested/advised + to + verb.",
        math: "\\text{said to} \\to \\text{told}; \\quad \\text{say} \\to \\text{says}",
      },
      {
        heading: "Adverb changes in narration",
        level: "pro",
        body:
          "now → then, today → that day, tomorrow → the next day, yesterday → the previous day, here → there, this → that, these → those, ago → before, thus → so. These changes are what most transformed sentences lose marks on.",
      },
    ],
    formulas: [
      {
        name: "Passive by tense",
        latex: "\\text{is/are + V3}, \\quad \\text{was/were + V3}, \\quad \\text{has/have been + V3}",
        symbols: [{ sym: "V3", meaning: "past participle" }],
        when: "Present, past and perfect passives respectively — tense always preserved.",
      },
      {
        name: "Imperative passive",
        latex: "\\text{Let} + O + \\text{be} + V3",
        symbols: [{ sym: "O", meaning: "original object" }],
        when: "'Open the door' → 'Let the door be opened.'",
      },
      {
        name: "Two-object passive",
        latex: "\\text{Two passives: person-first or thing-first}",
        symbols: [{ sym: "by", meaning: "agent dropped when unimportant" }],
        when: "'He gave me a book' → 'I was given a book' / 'A book was given to me.'",
      },
      {
        name: "Question passive",
        latex: "\\text{Wh-word} + \\text{be} + S + V3 + ?",
        symbols: [{ sym: "?", meaning: "keep interrogative order" }],
        when: "'Who wrote it?' → 'By whom was it written?'",
      },
      {
        name: "Narration backshift",
        latex: "\\text{Present} \\to \\text{Past}, \\quad \\text{Past} \\to \\text{Past perfect}, \\quad \\text{will} \\to \\text{would}",
        symbols: [{ sym: "→", meaning: "one step back in time" }],
        when: "Reporting verb in the past; keep present for universal truths.",
      },
      {
        name: "SON pronoun rule",
        latex: "S \\to \\text{Subject of reporting verb}, \\ O \\to \\text{Object}, \\ N = \\text{no change}",
        symbols: [{ sym: "1st/2nd/3rd person", meaning: "governed by S, O and N respectively" }],
        when: "Changing I / you / he-she in reported speech.",
      },
    ],
    specialCases: [
      {
        title: "Universal truth in narration",
        condition: "General fact",
        result: "\\text{Tense unchanged}",
        why: "'The teacher said that the sun rises in the east.'",
        askedIn: "Narration transformation questions.",
      },
      {
        title: "Reported speech with 'let'",
        condition: "Suggestion or proposal",
        result: "suggested\\ + \\text{that} + \\text{should}",
        why: "'Let us go' → 'He suggested that we should go.'",
      },
      {
        title: "Exclamatory sentences",
        condition: "Exclamation in direct speech",
        result: "exclaimed\\ with\\ joy/sorrow\\ + \\text{that}",
        why: "The emotion must be carried into the reporting verb.",
      },
      {
        title: "Intransitive verbs",
        condition: "Appear, arrive, sleep, die",
        result: "\\text{No passive exists}",
        why: "Passive requires an object to promote to subject.",
      },
      {
        title: "Passive with 'have to'",
        condition: "Obligation",
        result: "has/have\\ to\\ be + V3",
        why: "'You have to finish it' → 'It has to be finished.'",
      },
    ],
    tricks: [
      {
        title: "Tense never changes in voice",
        how:
          "Identify the original tense, then build be + V3 in that same tense. Trying to remember 12 passive patterns is unnecessary.",
        example: "Past continuous active → was/were being + V3.",
        saves: "~30 s",
      },
      {
        title: "Drop the agent when generic",
        how:
          "people, someone, they, we-in-general are usually omitted; a by-phrase with them sounds clumsy.",
        example: "'People speak English' → 'English is spoken.'",
        saves: "~10 s",
      },
      {
        title: "Narration: chop, shift, join",
        how:
          "Three mechanical steps — remove quotes, backshift, adjust pronouns and time words. Nothing more is required.",
        example: "He said, 'I am busy today.' → He said that he was busy that day.",
        saves: "~25 s",
      },
      {
        title: "Yes/no question marker",
        how: "Any yes/no direct question becomes if/whether in indirect speech — never 'that'.",
        example: "'Are you well?' → He asked if I was well.",
        saves: "Prevents a common lost mark",
      },
    ],
    mistakes: [
      {
        wrong: "Changing the tense while converting to passive.",
        right: "Tense is preserved; only the voice changes.",
        why: "Voice and tense are independent systems.",
      },
      {
        wrong: "Writing 'by' even when the agent is unknown.",
        right: "Omit the by-phrase entirely — 'The window was broken'.",
        why: "A vague or invented agent is worse than none.",
      },
      {
        wrong: "Using 'that' for yes/no questions in narration.",
        right: "Use if/whether.",
        why: "The reported clause was a closed question, not a statement.",
      },
      {
        wrong: "Forgetting time-adverb shifts.",
        right: "now → then, today → that day, tomorrow → the next day.",
        why: "The reference time moved, so the adverbs must move too.",
      },
      {
        wrong: "Passivising intransitive verbs.",
        right: "Only transitive verbs (with objects) can be made passive.",
        why: "There is nothing to promote to subject position.",
      },
    ],
  },

  {
    id: "clauses-conditionals",
    title: "Clauses & Conditionals",
    classLevel: "both",
    blurb:
      "Independent and dependent clauses, noun/adjective/adverb clauses, relative pronouns, and the four conditional types with mixed conditionals.",
    theory: [
      {
        heading: "Clause vs phrase",
        level: "basic",
        body:
          "A clause has a subject and a finite verb; a phrase does not. An independent clause stands alone as a sentence; a dependent clause has a subject and verb but cannot stand alone because it begins with a subordinator or a relative pronoun.",
        math: "\\text{Clause} = S + \\text{finite V}; \\quad \\text{Phrase} = \\text{no finite V}",
      },
      {
        heading: "The three dependent clause types",
        level: "standard",
        body:
          "A noun clause does the work of a noun (subject, object or complement) and often begins with that, what, whether. An adjective (relative) clause describes a noun and begins with who, whom, whose, which, that. An adverb clause modifies a verb and answers when, where, why, how, or under what condition.",
      },
      {
        heading: "Relative pronouns and defining vs non-defining",
        level: "standard",
        body:
          "Who is for people, which for things, that for either in defining clauses. A defining clause is essential and takes no commas; a non-defining clause adds extra information and is set off by commas. 'That' cannot be used in a non-defining clause, which is a favourite exam distinction.",
        math: "\\text{Non-defining} \\Rightarrow \\text{no 'that', use commas}",
      },
      {
        heading: "The four conditionals",
        level: "pro",
        body:
          "Type 1 (real future): if + present, will + verb. Type 2 (imaginary present): if + past simple, would + verb. Type 3 (impossible past): if + past perfect, would have + V3. Type 0 (general truth): if + present, present. Each type pairs a specific if-clause tense with a specific result clause — mixing them wrongly is the commonest error.",
        math: "T1: \\text{If } V_1, \\ will\\ V; \\quad T2: \\text{If } V_2, \\ would\\ V; \\quad T3: \\text{If had } V_3, \\ would\\ have\\ V_3",
      },
      {
        heading: "Mixed conditionals and other subordinators",
        level: "pro",
        body:
          "Mixed conditionals combine a Type 3 condition with a Type 2 result (or vice versa) when past cause meets present effect: 'If I had studied medicine, I would be a doctor now.' The subordinators unless (if not), provided that, in case, as long as and but for each impose their own patterns and are heavily tested.",
      },
    ],
    formulas: [
      {
        name: "Type 0 — general truth",
        latex: "\\text{If} + \\text{present simple}, \\ \\text{present simple}",
        symbols: [{ sym: "if", meaning: "can be replaced by 'when'" }],
        when: "Scientific facts: 'If you heat ice, it melts.'",
      },
      {
        name: "Type 1 — real future",
        latex: "\\text{If} + \\text{present simple}, \\ \\text{will} + V",
        symbols: [{ sym: "will", meaning: "result clause only; never in the if-clause" }],
        when: "Probable future condition.",
        hook: "If-clause never takes 'will'.",
      },
      {
        name: "Type 2 — unreal present",
        latex: "\\text{If} + \\text{past simple}, \\ \\text{would} + V",
        symbols: [{ sym: "were", meaning: "used for all persons in formal style" }],
        when: "'If I were rich, I would travel.'",
      },
      {
        name: "Type 3 — impossible past",
        latex: "\\text{If} + \\text{had} + V_3, \\ \\text{would have} + V_3",
        symbols: [{ sym: "had + V3", meaning: "unrealised past condition" }],
        when: "Regret about the past: 'If I had known, I would have come.'",
      },
      {
        name: "Unless",
        latex: "unless = if\\ \\ldots\\ not",
        symbols: [{ sym: "unless", meaning: "already negative; never add 'not' again" }],
        when: "'Unless you hurry, you will be late.'",
      },
      {
        name: "Clause subordinator list",
        latex: "\\text{time: when, while, after, before, until}",
        symbols: [{ sym: "adverb clause markers", meaning: "introduce time, reason, condition, contrast" }],
        when: "Identifying the type of dependent clause.",
      },
    ],
    specialCases: [
      {
        title: "Wish + past simple",
        condition: "Wish about the present",
        result: "I\\ wish\\ I\\ \\text{were} \\ldots",
        why: "Wish always takes one step back in tense to show unreality.",
      },
      {
        title: "Wish + past perfect",
        condition: "Wish about the past",
        result: "I\\ wish\\ I\\ \\text{had studied} \\ldots",
        why: "Regret about something already impossible to change.",
      },
      {
        title: "As if / as though",
        condition: "Unreal comparison",
        result: "\\text{Takes past tense}",
        why: "'He talks as if he knew everything' — present unreality.",
      },
      {
        title: "Non-defining relative clause with 'that'",
        condition: "Extra information in commas",
        result: "\\text{Wrong — use which or who}",
        why: "'That' cannot introduce a non-defining clause.",
        askedIn: "Error-correction questions.",
      },
      {
        title: "But for",
        condition: "Conditional without 'if'",
        result: "But\\ for + \\text{noun} = \\text{If it were not for}",
        why: "'But for your help, I would have failed.'",
      },
      {
        title: "In case vs if",
        condition: "Precaution vs condition",
        result: "in\\ case + \\text{present} (no 'will')",
        why: "In case states a precaution taken in advance, not a condition to be fulfilled.",
      },
    ],
    tricks: [
      {
        title: "If-clause never takes will/would",
        how:
          "The moment you see 'will' inside an if-clause in an option, reject that option.",
        example: "'If it will rain…' is wrong; 'If it rains…' is right.",
        saves: "~10 s per question",
      },
      {
        title: "Match the halves by tense pairing",
        how:
          "Present if → will result; past if → would result; past perfect if → would have result. The pairs are locked.",
        example: "Had + V3 pairs only with would have + V3.",
        saves: "~15 s",
      },
      {
        title: "Identify the clause by its question",
        how:
          "Ask what role the clause plays: answers 'which one?' → adjective; 'what?' → noun; 'when/why/under what condition?' → adverb.",
        example: "'I know what he wants' — answers 'what?' → noun clause.",
        saves: "~20 s",
      },
      {
        title: "Comma test for defining clauses",
        how:
          "No commas means the information is essential; then 'that' is allowed. With commas, use who/which.",
        example: "'My brother who lives in Pokhara' (one of several) vs 'My brother, who lives in Pokhara,' (the only one).",
      },
    ],
    mistakes: [
      {
        wrong: "'If I will study hard, I will pass.'",
        right: "'If I study hard, I will pass.'",
        why: "The if-clause takes a present form even when the meaning is future.",
      },
      {
        wrong: "Mixing Type 2 and Type 3 halves arbitrarily.",
        right: "Use mixed conditionals only when the times genuinely differ.",
        why: "Random mixing breaks the logical time relationship.",
      },
      {
        wrong: "Adding 'not' after unless.",
        right: "'Unless you hurry' — unless is already negative.",
        why: "Double negation inverts the intended meaning.",
      },
      {
        wrong: "Treating every clause beginning with 'that' as a noun clause.",
        right: "Check its function: it can also introduce a relative (adjective) clause.",
        why: "The same word introduces different clause types.",
      },
    ],
  },

  {
    id: "modals-determiners",
    title: "Modals, Determiners & Articles",
    classLevel: "both",
    blurb:
      "Modal verbs with their precise shades, semi-modals, determiners and quantifiers, and the complete article rules with their exceptions.",
    theory: [
      {
        heading: "Modal verbs and the absence of -s and 'to'",
        level: "basic",
        body:
          "Modals (can, could, may, might, shall, should, will, would, must, ought to) never take -s in the third person, are followed by a bare infinitive, and have no infinitive or participle forms. 'Ought' is the exception, requiring 'to'. They express ability, permission, possibility, obligation, advice or deduction rather than time.",
      },
      {
        heading: "Degrees of certainty and politeness",
        level: "standard",
        body:
          "For possibility, may is more formal and slightly stronger than might; could is weaker still. For deduction, must means near certainty, should means probability, may/might/could mean possibility, and can't means impossibility. For politeness, could and would are more tentative than can and will.",
        math: "\\text{Certainty ladder: must} > \\text{should} > \\text{may} > \\text{might} > \\text{could}",
      },
      {
        heading: "Obligation, prohibition and absence of necessity",
        level: "pro",
        body:
          "Must and have to express obligation but differ: must is the speaker's own authority, have to is external. Mustn't forbids, while needn't and don't have to say it is unnecessary — a distinction examiners exploit. Should and ought to express advice or mild duty; had better warns of a consequence.",
      },
      {
        heading: "Articles: a, an, the, or nothing",
        level: "pro",
        body:
          "Use a/an for one of many unspecified items, the for something already identified or unique, and no article for general plurals, uncountable nouns in a general sense, proper nouns, and most languages and meals. The choice between a and an follows the sound, not the letter: 'an hour', 'a university'.",
        math: "\\text{Sound rule: a + consonant sound, an + vowel sound}",
      },
      {
        heading: "Determiners and quantifiers",
        level: "pro",
        body:
          "Determiners come before adjectives and cannot combine freely: 'the my book' is impossible. Some and any follow polarity (some in affirmatives, any in negatives and questions, with exceptions for offers). Each/every, either/neither, all/both/none, few/a few/little/a little each carry distinct meanings that decide agreement.",
      },
    ],
    formulas: [
      {
        name: "Modal + bare infinitive",
        latex: "\\text{modal} + \\text{base verb (no 'to', no '-s')}",
        symbols: [{ sym: "exception", meaning: "ought to" }],
        when: "All modals except ought; 'He must go', never 'He musts go'.",
      },
      {
        name: "Perfect modal (past reference)",
        latex: "\\text{modal} + \\text{have} + V_3",
        symbols: [{ sym: "V3", meaning: "past participle" }],
        when: "Past regret or deduction: 'should have studied', 'must have forgotten'.",
        hook: "Modal + have + V3 always refers to the past.",
      },
      {
        name: "a vs an by sound",
        latex: "a + \\text{consonant sound}; \\quad an + \\text{vowel sound}",
        symbols: [{ sym: "sound", meaning: "pronunciation, not spelling" }],
        when: "'an hour', 'a university', 'an MBA'.",
      },
      {
        name: "Some vs any",
        latex: "some \\to \\text{affirmative}; \\quad any \\to \\text{negative / question}",
        symbols: [{ sym: "exceptions", meaning: "offers and requests prefer 'some'" }],
        when: "'Would you like some tea?' despite being a question.",
      },
      {
        name: "Few vs a few, little vs a little",
        latex: "a\\ few = \\text{some (positive)}; \\quad few = \\text{almost none (negative)}",
        symbols: [{ sym: "countable", meaning: "few/little pairs with count/mass nouns respectively" }],
        when: "Meaning-flip questions that hinge on the article.",
      },
      {
        name: "Neither/either + singular",
        latex: "either/neither + \\text{singular noun + singular verb}",
        symbols: [{ sym: "of + plural", meaning: "verb still agrees with either/neither" }],
        when: "'Neither of the answers is correct.'",
      },
    ],
    specialCases: [
      {
        title: "Mustn't vs needn't",
        condition: "Prohibition vs absence of necessity",
        result: "mustn't = \\text{forbidden}; \\quad needn't = \\text{not necessary}",
        why: "'You mustn't smoke' forbids it; 'You needn't come' merely says it is optional.",
        askedIn: "Modal-meaning MCQs.",
      },
      {
        title: "Can't for impossibility",
        condition: "Deduction about a fact",
        result: "can't = \\text{logically impossible}",
        why: "'He can't be at home — his car is gone.'",
      },
      {
        title: "Must for internal obligation",
        condition: "Speaker's own authority",
        result: "have\\ to = \\text{external rule}",
        why: "'I must stop smoking' (my decision) vs 'I have to wear a uniform' (school rule).",
      },
      {
        title: "Zero article with general plurals",
        condition: "General statement about a class",
        result: "\\text{No article: 'Books are useful.'}",
        why: "The definite article would wrongly specify particular books.",
      },
      {
        title: "The with superlatives and unique items",
        condition: "Only one of its kind",
        result: "the\\ best, the\\ sun, the\\ Himalayas",
        why: "Uniqueness is what 'the' signals.",
      },
      {
        title: "Used to vs would for past habits",
        condition: "Past routine",
        result: "used\\ to \\text{ for states and habits}; \\ would \\text{ for repeated actions only}",
        why: "'I used to live there' (state) cannot use would.",
      },
    ],
    tricks: [
      {
        title: "Certainty ladder",
        how:
          "Rank must > should > may > might > could on a scale and answer deduction questions by position.",
        example: "'The lights are on — he must be home.' vs 'He might be home.'",
        saves: "~15 s",
      },
      {
        title: "Sound, not spelling, for a/an",
        how:
          "Say the word aloud. Hour, honest, heir take an; university, European, one take a.",
        example: "an MBA, a UNESCO site.",
        saves: "~5 s each",
      },
      {
        title: "Perfect modal = past",
        how:
          "If the sentence criticises or deduces a past event, use modal + have + V3.",
        example: "'You should have told me.'",
        saves: "~10 s",
      },
      {
        title: "The 'my' test for determiners",
        how:
          "If 'my' fits comfortably before the noun, the position belongs to a determiner, and no second determiner can occupy it.",
        example: "'the my house' fails, so 'my house' or 'the house' only.",
      },
    ],
    mistakes: [
      {
        wrong: "'You mustn't come if you're busy.'",
        right: "'You needn't come if you're busy.'",
        why: "Mustn't forbids; the intended meaning is 'it is not necessary'.",
      },
      {
        wrong: "'She can sings well.'",
        right: "'She can sing well.'",
        why: "Modals take the bare infinitive with no -s.",
      },
      {
        wrong: "'An university' or 'a hour'.",
        right: "'A university', 'an hour' — the rule follows pronunciation.",
        why: "Spelling-based application fails with these words.",
      },
      {
        wrong: "Stacking determiners: 'the my book'.",
        right: "Only one central determiner is allowed.",
        why: "Determiners occupy a single slot.",
      },
      {
        wrong: "'Few people came, so we had fun.'",
        right: "'A few people came, so we had fun.'",
        why: "'Few' is negative — it means nearly none.",
      },
    ],
  },
];
