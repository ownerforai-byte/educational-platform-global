import type { HighYieldTopicData } from "@/lib/high-yield-topic-facts";

/**
 * Language bank — Nepali grammar and the English language track.
 *
 * Every other bank is scoped to a science/maths unit; these entries cover the
 * language units that had none. For Nepali `bhasha-ra-vyakarana`, "facts" are
 * the counted facts examiners actually ask for — वर्ण counts, शब्द-स्रोत
 * classification, कारक-विभक्ति pairings — not prose summaries. The English
 * entries do the same for grammar/usage, literature interpretation, composition
 * writing and critical reasoning, so no shipped Grade 11 topic renders without
 * a Fact Bank section (guarded by tests/lib/high-yield-topic-facts.test.ts).
 */
export const HIGH_YIELD_TOPIC_BANK_LANGUAGES: HighYieldTopicData[] = [
  {
    topicKeywords: [
      "swar-varna",
      "vyanjan-varna",
      "vyanjan-vargikaran",
      "aagantuk-shabda",
      "tadbhav-shabda",
      "tatsam",
      "shabda-srot",
      "vyakarana",
      "bhasha",
    ],
    unitSlugs: ["bhasha-ra-vyakarana"],
    subject: "nepali",
    title: "नेपाली भाषा र व्याकरण — वर्ण, शब्द र कारक",
    category: "भाषा, व्याकरण र शब्दभण्डार",
    governingLaws: [
      {
        name: "वर्णमालाको संरचना नियम",
        statement:
          "नेपाली वर्णमाला अयोगवाहबाट सुरु भई स्वर, व्यञ्जन र अन्त्यमा संयुक्त वर्णसम्म जान्छ। उच्चारण-स्थान (कण्ठ, तालु, मूर्धा, दन्त, ओष्ठ) अनुसार व्यञ्जन वर्गीकृत हुन्छन्।",
        formula:
          "\\text{वर्णमाला} = \\text{स्वर } 11 + \\text{व्यञ्जन } 33 + \\text{अयोगवाह } 2",
        conditions:
          "स्वर ११ = ह्रस्व ५ + दीर्घ ५ + प्लुत १ (अः)। व्यञ्जन ३३ = स्पर्श २५ + अन्तःस्थ ४ + ऊष्म ४। ज्ञ र क्ष लाई संयुक्त वर्ण मानिन्छ।",
      },
      {
        name: "समास नियम — पूर्वपद र उत्तरपद",
        statement:
          "दुई वा दुईभन्दा बढी शब्द मिली एक शब्द बन्दा अगाडिको पद पूर्वपद र पछाडिको पद उत्तरपद हुन्छ; समासमा विभक्ति लोप हुन्छ।",
        formula: "\\text{समस्त पद} = \\text{पूर्वपद} + \\text{उत्तरपद}",
        conditions:
          "विभक्ति लुप्त हुनु समासको अनिवार्य लक्षण हो। समासजन्य कृदन्त वा सुप्-प्रत्यय लोप नभए समास होइन।",
      },
    ],
    speedFormulas: [
      {
        name: "वर्ण संख्या (ह्रस्व स्वर)",
        formula:
          "\\text{ह्रस्व स्वर} = \\{\\text{अ, इ, उ, ऋ, ऌ\\}",
        description:
          "छोटो उच्चारण हुने स्वर। CEE र NEB दुवैमा 'ह्रस्व स्वर कति?' भन्ने प्रश्न बारम्बार आउँछ — उत्तर ५ हो।",
        unit: "स्वर",
      },
      {
        name: "वर्ण संख्या (दीर्घ स्वर)",
        formula:
          "\\text{दीर्घ स्वर} = \\{\\text{आ, ई, ऊ, ॠ, ॡ\\}",
        description: "तानिएर उच्चारण हुने स्वर। दीर्घ स्वर पनि ५ वटै हुन्छन्।",
        unit: "स्वर",
      },
      {
        name: "व्यञ्जन वर्गीकरण",
        formula:
          "\\text{व्यञ्जन } 33 = \\text{स्पर्श } 25 + \\text{अन्तःस्थ } 4 + \\text{ऊष्म } 4",
        description:
          "स्पर्श २५ = ५ वर्ग × ५ वर्ण (क-वर्ग, च-वर्ग, ट-वर्ग, त-वर्ग, प-वर्ग)। अन्तःस्थ = य, र, ल, व। ऊष्म = श, ष, स, ह।",
        unit: "व्यञ्जन",
      },
      {
        name: "शब्द-स्रोत को अनुपात",
        formula:
          "\\text{तत्सम} + \\text{तद्भव} + \\text{देशज} + \\text{आगन्तुक} = \\text{कुल शब्द}",
        description:
          "संस्कृतबाट अपरिवर्तित आएको तत्सम, परिवर्तित भएर आएको तद्भव, देशमै जन्मेको देशज र विदेशी भाषाबाट आएको आगन्तुक — चारै स्रोत पहिचान गर्न सक्नु exam-trick हो।",
        unit: "शब्द",
      },
      {
        name: "कारक-विभक्ति जोडी",
        formula:
          "\\text{कर्ता }\\to\\text{ले} \\quad \\text{कर्म }\\to\\text{लाई} \\quad \\text{सम्बन्ध }\\to\\text{को/का/की}",
        description:
          "कर्ता कारकमा 'ले', कर्म कारकमा 'लाई', सम्बन्ध कारकमा 'को/का/की'। अपादानमा 'बाट/देखि', अधिकरणमा 'मा/भित्र'।",
        unit: "कारक",
      },
      {
        name: "काल पहिचान सूत्र",
        formula:
          "\\text{वर्तमान}=छ/छु \\quad \\text{भूत}=थियो/भयो \\quad \\text{भविष्यत्}=हुनेछ",
        description:
          "क्रियापदको रूप हेरी काल पहिचान गर्नु नै सबैभन्दा छिटो उपाय — 'छ' वर्तमान, 'थियो' भूत, 'हुनेछ' भविष्यत्।",
        unit: "काल",
      },
    ],
    constantsAndValues: [
      { symbol: "स्वर", name: "कुल स्वर वर्ण", value: "11", unit: "वर्ण" },
      { symbol: "व्यञ्जन", name: "कुल व्यञ्जन वर्ण", value: "33", unit: "वर्ण" },
      { symbol: "अयोगवाह", name: "अयोगवाह (ं, ः)", value: "2", unit: "वर्ण" },
      { symbol: "स्पर्श", name: "स्पर्श व्यञ्जन", value: "25", unit: "वर्ण" },
      { symbol: "अन्तःस्थ", name: "अन्तःस्थ व्यञ्जन", value: "4", unit: "वर्ण" },
      { symbol: "ऊष्म", name: "ऊष्म (संघर्षी) व्यञ्जन", value: "4", unit: "वर्ण" },
      { symbol: "लिङ्ग", name: "नेपाली लिङ्ग", value: "3", unit: "पुलिङ्ग/स्त्रीलिङ्ग/नपुंसकलिङ्ग" },
      { symbol: "वचन", name: "नेपाली वचन", value: "2", unit: "एकवचन/बहुवचन" },
    ],
    entranceTraps: [
      {
        trap: "'व्यञ्जन ३६ वटा हुन्छन्' भनी लेख्नु।",
        truth:
          "शुद्ध व्यञ्जन ३३ हो। ज्ञ, क्ष, त्र लाई संयुक्त वर्ण मानिन्छ, स्वतन्त्र वर्ण होइन — जोड्दा ३६ पुग्छ तर उत्तर ३३ नै लेख्नुपर्ने हुन्छ।",
        examRef: "NEB Grade 11 Nepali व्याकरण खण्ड, बहुवैकल्पिक",
      },
      {
        trap: "'अः' लाई व्यञ्जन भनी गणना गर्नु।",
        truth:
          "'अः' अयोगवाह हो र स्वर वर्णभित्रको प्लुत मानिन्छ; अयोगवाह (ं, ः) लाई छुट्टै गणना गर्दा स्वर र व्यञ्जनको संख्या मिल्दैन।",
        examRef: "IOE/CEE भाषा खण्ड, वर्ण-गणना प्रश्न",
      },
      {
        trap: "'आगन्तुक शब्द' भनेको नेपाली मूलको शब्द हो भनी बुझ्नु।",
        truth:
          "आगन्तुक शब्द विदेशी (अरबी, फारसी, अङ्ग्रेजी, तिब्बती) भाषाबाट नेपालीमा आएका शब्द हुन्। देशज शब्द भने नेपालीमै जन्मेका मूल शब्द हुन्।",
        examRef: "NEB Grade 11 Nepali, शब्द-वर्गीकरण",
      },
      {
        trap: "'तत्सम' र 'तद्भव' एकै हुन् भनी मान्नु।",
        truth:
          "तत्सम संस्कृतबाट जस्ताको तस्तै आएका शब्द (विद्या, सूर्य) हुन्; तद्भव संस्कृतबाट परिवर्तित भएर आएका शब्द (बिजुली ← विद्युत्) हुन्।",
        examRef: "NEB/प्रवेश परीक्षा, शब्द-स्रोत पहिचान",
      },
      {
        trap: "समासमा पनि विभक्ति रहन्छ भनी लेख्नु।",
        truth:
          "समास भएपछि पूर्वपदको विभक्ति लोप हुन्छ — विभक्ति देखिएमा त्यो समास नभई शब्दसमूह मात्र हो।",
        examRef: "NEB Grade 11 Nepali, समास प्रश्न",
      },
    ],
    workedNumericals: [
      {
        problem:
          "एउटा प्रश्नमा 'नेपाली वर्णमालामा कति अयोगवाह, कति ऊष्म र कति संयुक्त वर्ण छन्?' भनिएको छ। उत्तर निकाल्नुहोस्।",
        given:
          "स्वर = 11, व्यञ्जन = 33, अयोगवाह = 2, संयुक्त वर्ण = 3 (ज्ञ, क्ष, त्र)",
        steps: [
          "अयोगवाह: अनुस्वार (ं) र विसर्ग (ः) — जम्मा 2।",
          "ऊष्म (संघर्षी) व्यञ्जन: श, ष, स, ह — जम्मा 4।",
          "संयुक्त वर्ण: ज्ञ, क्ष, त्र — जम्मा 3।",
          "जाँच: 11 + 33 + 3 = 47 वर्ण; अयोगवाह स्वरभित्र गनिने भएकाले छुट्टै नजोडिने।",
        ],
        answer: "अयोगवाह = 2, ऊष्म = 4, संयुक्त वर्ण = 3",
      },
      {
        problem:
          "तलका शब्दहरूलाई शब्द-स्रोत अनुसार वर्गीकरण गर्नुहोस्: विद्या, बिजुली, किताब, ढुङ्गा।",
        given: "चार शब्द र चार स्रोत: तत्सम, तद्भव, आगन्तुक, देशज",
        steps: [
          "विद्या — संस्कृतबाट अपरिवर्तितः तत्सम।",
          "बिजुली ← विद्युत् — परिवर्तित भएर आएकोः तद्भव।",
          "किताब — अरबी/फारसीबाट आएकोः आगन्तुक।",
          "ढुङ्गा — नेपालीमै जन्मेको मूल शब्दः देशज।",
        ],
        answer: "विद्या = तत्सम, बिजुली = तद्भव, किताब = आगन्तुक, ढुङ्गा = देशज",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "वर्ण",
        definition: "भाषाको सबैभन्दा सानो अविभाज्य ध्वनि इकाई, जो लेख्दा पनि छुट्ट्याउन सकिँदैन।",
        significance: "वर्ण-गणना र वर्गीकरणका प्रश्नमा आधारभूत अवधारणा।",
      },
      {
        term: "स्वर",
        definition: "अरू वर्णको सहायता बिना स्वतन्त्र रूपमा उच्चारण हुने वर्ण (अ, आ, इ, ई …)।",
        significance: "ह्रस्व-दीर्घ भेद र प्लुत स्वर 'अः' को पहिचान exam-trick हो।",
      },
      {
        term: "व्यञ्जन",
        definition: "स्वरको सहायताले मात्र उच्चारण हुने वर्ण, उच्चारण-स्थान अनुसार वर्गीकृत।",
        significance: "क-वर्गदेखि प-वर्गसम्म पाँच-पाँच वर्ण हुने नियम बहुवैकल्पिकमा सोधिन्छ।",
      },
      {
        term: "तत्सम",
        definition: "संस्कृतबाट कुनै परिवर्तन नगरी नेपालीमा प्रयोग हुने शब्द।",
        significance: "तत्सम/तद्भव छुट्याउने प्रश्न दुवै तहमा निश्चित अंक दिन्छ।",
      },
      {
        term: "तद्भव",
        definition: "संस्कृतबाट ध्वनि-परिवर्तन भई नेपाली रूपमा ढल्किएका शब्द।",
        significance: "उदाहरणसहित पहिचान गर्न सक्नु प्रवेश परीक्षाको सामान्य प्रश्न ढाँचा हो।",
      },
      {
        term: "देशज",
        definition: "कुनै बाहिरी भाषाबाट नआई नेपाली भाषामै जन्मेका मूल शब्द।",
        significance: "आगन्तुकसँग भ्रमित हुने ठाउँ — स्रोत पहिचान गर्नु नै मुख्य सीप।",
      },
      {
        term: "आगन्तुक",
        definition: "विदेशी भाषाबाट नेपालीमा प्रवेश गरी प्रचलनमा आएका शब्द।",
        significance: "अरबी-फारसी र अङ्ग्रेजी स्रोतका शब्द चिन्नुपर्ने प्रश्न आउँछ।",
      },
      {
        term: "कारक",
        definition: "वाक्यमा क्रियासँग नामको सम्बन्ध देखाउने व्याकरणिक कोटि (कर्ता, कर्म, करण …)।",
        significance: "विभक्ति-चिह्नसँग जोडेर सम्झनु सबैभन्दा छिटो उपाय।",
      },
      {
        term: "समास",
        definition: "दुई वा बढी शब्द मिली विभक्ति लोप भई एक शब्द बन्ने प्रक्रिया।",
        significance: "विभक्ति लोप हुनु अनिवार्य शर्त — यही लक्षणले समास पहिचान गर्न सकिन्छ।",
      },
      {
        term: "सन्धि",
        definition: "दुई वर्ण वा पद नजिकिँदा हुने ध्वनि-परिवर्तन।",
        significance: "स्वर, व्यञ्जन र विसर्ग सन्धिका प्रकार पहिचान गर्नुपर्ने प्रश्न निश्चित आउँछ।",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // ENGLISH: GRAMMAR, USAGE & COMMUNICATION
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "grammar",
      "grammar-and-usage",
      "vocabulary-building",
      "communication-skills",
      "tense",
      "concord",
      "subject-verb",
      "preposition",
      "narration",
      "word-formation",
    ],
    unitSlugs: ["language-and-grammar"],
    subject: "english",
    title: "English Grammar, Usage and Communication",
    category: "Language Development — Grammar and Vocabulary",
    governingLaws: [
      {
        name: "Subject–Verb Agreement (Concord)",
        statement:
          "A finite verb agrees with its subject in person and number: a singular subject takes a singular verb and a plural subject a plural verb — an intervening phrase, comma or parenthetical never changes the number of the subject.",
        formula: "Singular subject + V-s  |  Plural subject + base verb",
        conditions:
          "One of + plural noun takes a singular verb; The number of + plural noun is singular, A number of + plural noun is plural; each, every, either, neither and everybody take a singular verb.",
      },
      {
        name: "Tense and Aspect Sequence",
        statement:
          "Tense is carried by the first auxiliary; the simple, continuous, perfect and perfect-continuous aspects combine with present, past and future to build the twelve active tenses, and a past-tense reporting clause pulls the reported clause one step back.",
        formula: "have + V3 (perfect)  |  be + V-ing (continuous)  |  will + base (future)",
        conditions:
          "Stative verbs (know, believe, own, contain, belong) reject the continuous aspect; time and if clauses use the present for future meaning — when he comes, if it rains.",
      },
      {
        name: "Reported Speech (Narration)",
        statement:
          "With a past reporting verb the reported clause shifts one tense back, pronouns shift to the reporter's viewpoint, and time and place words change scale (now → then, here → there, tomorrow → the next day).",
        formula: "say/tell + (object) + that + backshifted clause",
        conditions:
          "Universal truths and habitual facts do not backshift; questions keep the interrogative word with statement order, and commands become to + infinitive.",
      },
    ],
    speedFormulas: [
      {
        name: "Fewer vs Less",
        formula: "fewer + countable plural  |  less + uncountable",
        description:
          "Fewer books but less water. NEB error-correction items plant this pair deliberately; the same split governs many/much.",
        unit: "Determiner",
      },
      {
        name: "Since vs For",
        formula: "since + point of time  |  for + period of time",
        description:
          "Since 2019 (point) and for five years (duration) pair with the present perfect — I have studied here for three years.",
        unit: "Preposition + tense",
      },
      {
        name: "Between vs Among",
        formula: "between + two  |  among + three or more",
        description:
          "Between the twins names two; among the students names many. Between is also used for one-to-one relationships however many they are.",
        unit: "Preposition",
      },
      {
        name: "Article Choice",
        formula: "a/an by initial SOUND  |  the for unique, superlative, specified",
        description:
          "An hour, a university — spelling is irrelevant, sound decides. The is required before superlatives (the best), unique things (the sun) and second mentions.",
        unit: "Article",
      },
      {
        name: "Word Formation",
        formula: "prefix + root + suffix",
        description:
          "Prefixes change meaning (un-, dis-, re-, mis-, pre-), suffixes change word class (-tion, -ment, -ness, -able, -ly, -ise). Use both to fill word-form gaps.",
        unit: "Vocabulary",
      },
    ],
    constantsAndValues: [
      { symbol: "advice / information / furniture / luggage", name: "Uncountable nouns that stay singular", value: "no -s, no a/an", unit: "Grammar convention" },
      { symbol: "one of + plural noun", name: "Concord pattern", value: "singular verb", unit: "Grammar convention" },
      { symbol: "a number of + plural noun", name: "Concord pattern", value: "plural verb", unit: "Grammar convention" },
      { symbol: "depend / consist / married / good", name: "Fixed preposition collocations", value: "depend on, consist of, married to, good at", unit: "Collocation" },
      { symbol: "V3", name: "Past participle used after have/has/had", value: "third column of the verb table", unit: "Verb form" },
    ],
    entranceTraps: [
      {
        trap: "One of my friend came late.",
        truth:
          "One of takes a plural noun: one of my friends. The verb stays singular because the subject is one, not friends.",
        examRef: "NEB Grade 11 error correction",
      },
      {
        trap: "The number of students are rising every year.",
        truth:
          "The number of is singular — takes is. Only a number of takes a plural verb, so the pair must be read together.",
        examRef: "NEB/entrance concord item",
      },
      {
        trap: "She is married with a doctor and depends in her parents.",
        truth:
          "Fixed collocations: married to a doctor, depends on her parents (and consists of, good at, interested in).",
        examRef: "Entrance use-of-English item",
      },
      {
        trap: "I have been knowing him since childhood.",
        truth:
          "Know is stative: I have known him since childhood. Stative verbs take simple forms, not continuous, even with since/for.",
        examRef: "NEB Grade 11 tense item",
      },
      {
        trap: "If it will rain, we will cancel the trip.",
        truth:
          "Time and if clauses take the present for future meaning: If it rains, we will cancel the trip.",
        examRef: "NEB Grade 11 conditionals",
      },
    ],
    workedNumericals: [
      {
        problem: "Correct the sentence: Each of the boys have submitted their assignment.",
        given: "Quantifier Each of + plural noun; possessive their",
        steps: [
          "Each of is a singular subject whatever follows it.",
          "So have becomes has.",
          "Their disagrees with each — use his, or recast as All the boys have submitted their assignments.",
        ],
        answer: "Each of the boys has submitted his assignment.",
      },
      {
        problem: "Complete with the correct tense: When he ___ (arrive), we ___ (leave) for Pokhara.",
        given: "Time clause with when + future plan",
        steps: [
          "The when-clause takes the present for future meaning: arrives.",
          "The main clause keeps will + base: will leave.",
        ],
        answer: "When he arrives, we will leave for Pokhara.",
      },
    ],
    keyTermsAndDefinitions: [
      { term: "Concord", definition: "Agreement between subject and verb in number and person.", significance: "The single most tested grammar point in NEB and entrance papers." },
      { term: "Aspect", definition: "How a verb shows whether an action is simple, continuing, completed or continuing-to-completion.", significance: "Separates tense form from meaning — the key to continuous vs perfect items." },
      { term: "Voice", definition: "Active presents the doer as subject; passive promotes the receiver and adds be + V3.", significance: "Transformation items ask for both directions, including with modals (must be done)." },
      { term: "Collocation", definition: "A word pairing that native usage fixes, such as depend on or married to.", significance: "Cannot be guessed from meaning; exam items target the pairing directly." },
      { term: "Register", definition: "The level of formality a situation demands.", significance: "Decides contractions, slang and politeness forms in letters, emails and speeches." },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // ENGLISH: READING, LITERATURE & INTERPRETATION
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "reading-and-comprehension",
      "reading comprehension",
      "short-story",
      "drama-and-novel",
      "literary",
      "poem",
      "poetry",
      "narrative",
      "character",
      "imagery",
    ],
    unitSlugs: ["reading-and-comprehension"],
    subject: "english",
    title: "Reading, Short Story, Poetry and Drama Analysis",
    category: "Literature — Reading and Interpretation",
    governingLaws: [
      {
        name: "Elements of Fiction",
        statement:
          "A story works through six elements — plot, character, setting, point of view, conflict and theme — and the plot itself moves through exposition, rising action, climax, falling action and resolution.",
        formula: "Exposition → Rising action → Climax → Falling action → Resolution",
        conditions:
          "Theme is the idea the whole arc proves, not a retelling of the plot; an answer must name the idea and the incident that shows it.",
      },
      {
        name: "Poetic Devices",
        statement:
          "Poetry builds meaning through figurative language (simile, metaphor, personification) and sound devices (alliteration, assonance, onomatopoeia), shaped by line breaks, enjambment and rhyme scheme.",
        formula: "simile = like/as comparison  |  metaphor = direct comparison  |  personification = human trait on non-human",
        conditions:
          "A device answer is credited only when it names the device, quotes the words and states the effect, not merely when it spots a like.",
      },
      {
        name: "Drama and One-Act Play",
        statement:
          "Drama tells its story entirely through dialogue, stage directions and action; exposition, character and conflict must be inferred from what is spoken and done on stage.",
        formula: "dialogue + stage direction + dramatic action = story on stage",
        conditions:
          "Dramatic irony depends on the audience knowing what a character does not — never confuse it with verbal irony in a line of dialogue.",
      },
    ],
    speedFormulas: [
      {
        name: "Story Analysis Frame",
        formula: "Setting → Characters → Conflict → Climax → Theme + evidence",
        description:
          "Answers long-answer literature questions in that order; each step quotes one phrase from the text as evidence.",
        unit: "Analysis method",
      },
      {
        name: "Theme Statement",
        formula: "The text shows that … because … (quoted incident)",
        description:
          "Turns a vague one-word theme into a claim with support — the shape NEB marking looks for.",
        unit: "Analysis method",
      },
      {
        name: "Tone vs Mood",
        formula: "tone = writer's attitude  |  mood = reader's feeling",
        description:
          "Both are named with adjectives (bitter, nostalgic, tense) and justified with diction from the passage.",
        unit: "Style",
      },
      {
        name: "Rhyme Scheme Notation",
        formula: "AABB (couplet)  |  ABAB (alternate)  |  ABCB (ballad)",
        description:
          "Label the last sound of each line with letters; only repeated end-sounds get the same letter.",
        unit: "Poetry",
      },
    ],
    constantsAndValues: [
      { symbol: "Point of view", name: "Narrative angles", value: "first person / third limited / third omniscient / objective", unit: "Fiction" },
      { symbol: "Narrative arc", name: "Plot stages", value: "5 (exposition to resolution)", unit: "Fiction" },
      { symbol: "Irony", name: "Types of irony", value: "3 (verbal, situational, dramatic)", unit: "Style" },
      { symbol: "Sound devices", name: "Repetition of sound", value: "alliteration (consonants) / assonance (vowels) / onomatopoeia", unit: "Poetry" },
    ],
    entranceTraps: [
      {
        trap: "The narrator is the author.",
        truth:
          "The narrator is a created voice; a first-person narrator can be limited, biased or even unreliable, so the author's own view is never assumed.",
        examRef: "NEB literature interpretation",
      },
      {
        trap: "Retelling what happened and calling it the theme.",
        truth:
          "Theme is a general idea the incidents prove — isolation destroys, kindness outlives cruelty — supported by one named incident, not a summary.",
        examRef: "NEB long-answer marking",
      },
      {
        trap: "Calling any comparison a simile.",
        truth:
          "A simile signals the comparison with like or as; a metaphor equates directly (the moon a coin). Naming the wrong device loses the mark even when the effect is right.",
        examRef: "NEB/entrance device item",
      },
      {
        trap: "Reading dramatic irony as coincidence.",
        truth:
          "Dramatic irony is structural: the audience holds information the character lacks, so every innocent line lands with a second meaning.",
        examRef: "NEB one-act play item",
      },
    ],
    workedNumericals: [
      {
        problem: "Identify the rhyme scheme of a four-line stanza whose line endings are rose/June/snow/tune.",
        given: "End words: rose, June, snow, tune",
        steps: [
          "Rose and snow do not chime with June and tune, so the first pair gets A, the second pair B.",
          "The pattern is A, B, A, B — alternate rhyme.",
        ],
        answer: "ABAB (alternate rhyme)",
      },
      {
        problem: "State the theme of a story in which a selfish character loses his garden's spring until he learns to share.",
        given: "Conflict: selfishness vs warmth; turning point: the share",
        steps: [
          "Name the general idea: selfishness isolates and generosity restores.",
          "Attach evidence: the garden stays winter until the character opens it to the children.",
        ],
        answer: "Kindness and sharing restore what selfishness freezes — shown by the garden blooming only after the character shares it.",
      },
    ],
    keyTermsAndDefinitions: [
      { term: "Theme", definition: "The central idea a text develops about life or human nature.", significance: "The most weighted long-answer demand in the literature section." },
      { term: "Plot", definition: "The arranged sequence of incidents that carries the conflict to its resolution.", significance: "Turning point and climax questions are answered by locating the arc stage." },
      { term: "Conflict", definition: "The opposition that drives the story — person vs person, self, society or nature.", significance: "Naming the conflict type anchors every character and theme answer." },
      { term: "Imagery", definition: "Language that appeals to the senses and builds a picture.", significance: "The evidence base for tone, mood and atmosphere claims." },
      { term: "Irony", definition: "A gap between what is said or expected and what is true or happens.", significance: "Frequent in NEB satire and one-act play questions." },
      { term: "Point of view", definition: "The narrative angle from which the reader receives the story.", significance: "Decides how much the reader can trust and know." },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // ENGLISH: WRITING AND COMPOSITION
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "writing-and-composition",
      "essay-writing",
      "paragraph-writing",
      "letter-writing",
      "email-writing",
      "report-writing",
      "article-writing",
      "story-writing",
      "speech-writing",
      "dialogue-writing",
      "review-writing",
      "summary",
      "comprehension",
      "punctuation",
    ],
    unitSlugs: ["writing-and-composition"],
    subject: "english",
    title: "Writing and Composition — Essays, Letters, Reports, Summaries",
    category: "Composition — NEB Writing Section",
    governingLaws: [
      {
        name: "Paragraph and Essay Structure",
        statement:
          "A paragraph develops one idea in a topic sentence, supports it with detail or example, and closes the thought; an essay stacks such paragraphs behind an introduction and a conclusion.",
        formula: "Introduction (thesis) + body paragraphs (one idea each) + conclusion",
        conditions:
          "A new idea needs a new paragraph; a paragraph without a topic sentence reads as a list and loses organisation marks.",
      },
      {
        name: "Formal Letter Format",
        statement:
          "A formal letter carries the sender's address, date, receiver's designation, salutation, subject line, a three-paragraph body and the complimentary close, in that order.",
        formula: "Address → Date → Receiver → Dear Sir/Madam → Subject → Body → Yours faithfully → Name",
        conditions:
          "Yours faithfully pairs with Dear Sir/Madam; Yours sincerely pairs with a named addressee — swapping them is an automatic loss.",
      },
      {
        name: "Summary and Note-making",
        statement:
          "A summary restates only the main ideas of a passage in the writer's own words at roughly one-third length; notes reduce the same passage to headings and sub-points with abbreviations.",
        formula: "summary ≈ one-third of the passage, main ideas only, no examples",
        conditions:
          "Copied sentences are not a summary; note-making keeps the original order but drops full sentences entirely.",
      },
    ],
    speedFormulas: [
      {
        name: "Five-Paragraph Essay",
        formula: "1 intro + 3 body + 1 conclusion",
        description:
          "The default structure for argumentative and expository essays; each body paragraph carries one reason plus one example.",
        unit: "Essay",
      },
      {
        name: "Report Structure",
        formula: "Headline → By-line → Lead (who/what/when/where/why) → Body → Conclusion",
        description:
          "The lead answers the five W-questions in one or two sentences; the body adds quotes and detail in order of importance.",
        unit: "Report",
      },
      {
        name: "Review Framework",
        formula: "Brief summary + analysis of strengths/weaknesses + recommendation",
        description:
          "A book or film review spends most of its words on judgement and evidence, not on retelling the plot.",
        unit: "Review",
      },
      {
        name: "Email Skeleton",
        formula: "To / Subject / Salutation / Body / Sign-off / Name",
        description:
          "A subject line that names the purpose, one topic per email, and no contractions keep an email formal.",
        unit: "Email",
      },
      {
        name: "Sentence Variety for Writing",
        formula: "simple + compound + complex + compound-complex",
        description:
          "Mixing the four sentence types, joined with correct punctuation, is what raises a composition from correct to effective.",
        unit: "Sentences",
      },
    ],
    constantsAndValues: [
      { symbol: "Yours faithfully", name: "Formal close for unnamed addressee", value: "pairs with Dear Sir/Madam", unit: "Convention" },
      { symbol: "Yours sincerely", name: "Formal close for a named addressee", value: "pairs with Dear Mr/Ms + name", unit: "Convention" },
      { symbol: "Essay types", name: "Argumentative, descriptive, narrative, expository", value: "4", unit: "Composition" },
      { symbol: "Punctuation set", name: "Marks the writing section tests", value: "comma, semicolon, colon, dash, apostrophe, quotation marks", unit: "Mechanics" },
    ],
    entranceTraps: [
      {
        trap: "Ending a letter to an unnamed officer with Yours sincerely.",
        truth:
          "Unnamed addressee takes Yours faithfully; only a letter addressed to a named person takes Yours sincerely.",
        examRef: "NEB Grade 11 letter-writing item",
      },
      {
        trap: "A paragraph that lists five points with no topic sentence.",
        truth:
          "One paragraph carries one idea, opened by its topic sentence; extra ideas move to new paragraphs instead of being crammed in.",
        examRef: "NEB writing assessment rubric",
      },
      {
        trap: "Writing a summary by copying the first and last sentences of the passage.",
        truth:
          "A summary is written in your own words and keeps only main ideas; quoted sentences are penalised even when they are the key lines.",
        examRef: "NEB summary/note-making item",
      },
      {
        trap: "Running two independent clauses together with only a comma.",
        truth:
          "A comma splice is a punctuation error: join with a semicolon, a coordinating conjunction, or split into two sentences.",
        examRef: "NEB grammar-for-writing item",
      },
    ],
    workedNumericals: [
      {
        problem: "Plan a formal letter to the editor about noise pollution in your town.",
        given: "Formal letter to an unnamed editor",
        steps: [
          "Open with your address and date, then The Editor, The Rising Nepal, Kathmandu.",
          "Salute with Dear Sir/Madam and state one subject line: Noise pollution in Bhaktapur.",
          "Body, three paragraphs: the problem and its cause; its effects on students and patients; a concrete request for a decibel rule and enforcement.",
          "Close with Yours faithfully and your name below your signature.",
        ],
        answer: "A three-paragraph formal letter with subject line, factual complaint and a specific demand, closed by Yours faithfully.",
      },
      {
        problem: "Reduce a 120-word passage to a 40-word summary.",
        given: "One paragraph of 120 words with examples and statistics",
        steps: [
          "Find the topic sentence and the concluding idea — they usually carry the main claim.",
          "Drop examples, figures and repetitions, keeping only why/how statements.",
          "Paraphrase the kept ideas in your own words and check the count is about one-third.",
        ],
        answer: "A 40-word passage-restatement with no copied sentences and no examples.",
      },
    ],
    keyTermsAndDefinitions: [
      { term: "Thesis statement", definition: "The sentence that declares the central claim of an essay.", significance: "Everything after it must serve this claim or the essay drifts off-topic." },
      { term: "Topic sentence", definition: "The opening sentence that announces a paragraph's single idea.", significance: "The anchor of organisation marks in every writing answer." },
      { term: "Register", definition: "The formality level a situation demands.", significance: "Decides contractions, slang and politeness in letters, emails and speeches." },
      { term: "Summary", definition: "A shorter restatement that keeps only the main ideas, in the writer's own words.", significance: "Both summary and note-making are compulsory NEB writing items." },
      { term: "Clause", definition: "A group of words with a subject and a finite verb.", significance: "Classifying clauses is the entry point to punctuation and sentence variety." },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // ENGLISH: CRITICAL THINKING & LITERARY ANALYSIS
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "critical-thinking",
      "critical thinking",
      "literary-analysis",
      "literary analysis",
      "argument",
      "fallacy",
      "reasoning",
      "evidence",
    ],
    unitSlugs: ["critical-thinking"],
    subject: "english",
    title: "Critical Thinking, Logic and Literary Analysis",
    category: "Thinking Skills — Argument and Interpretation",
    governingLaws: [
      {
        name: "Argument Structure",
        statement:
          "A reasoned argument links a claim to evidence through a warrant — the unstated principle that makes the evidence relevant — and a conclusion follows only when both hold.",
        formula: "Claim + Evidence + Reasoning = Argument",
        conditions:
          "An assertion without evidence is an opinion, not an argument; evidence without reasoning is a fact sitting beside a claim.",
      },
      {
        name: "Fallacy Recognition",
        statement:
          "A fallacy is an argument that persuades through a defect in form rather than through support: attacking the person, distorting the position, or forcing a false choice are common NEB items.",
        formula: "ad hominem  |  straw man  |  false dilemma  |  slippery slope  |  appeal to popularity or authority  |  hasty generalisation",
        conditions:
          "Name the fallacy and state why the move is illegitimate; mere disagreement with the claim is not a fallacy diagnosis.",
      },
      {
        name: "Close Reading for Interpretation",
        statement:
          "Literary analysis moves through three levels — literal (what is said), inferential (what it implies) and evaluative (how far it succeeds) — using diction, imagery, symbolism and tone as evidence.",
        formula: "literal → inferential → evaluative",
        conditions:
          "An interpretation is only as good as the textual detail it cites; a claim with no quoted detail is an unanchored opinion.",
      },
    ],
    speedFormulas: [
      {
        name: "Fact vs Opinion Test",
        formula: "verifiable statement = fact  |  value or judgement word = opinion",
        description:
          "Apply the test by asking what evidence would settle the sentence — if none could, it is an opinion however confidently it is phrased.",
        unit: "Reasoning",
      },
      {
        name: "Source Evaluation",
        formula: "authority + accuracy + currency + bias + purpose",
        description:
          "A credible source names its author, can be checked, is recent for the claim and declares its interest.",
        unit: "Evidence",
      },
      {
        name: "Counterargument Move",
        formula: "State objection → concede the valid part → rebut with evidence",
        description:
          "Addressing the strongest objection raises an argument above one-sided assertion and is what evaluative answers reward.",
        unit: "Argument",
      },
      {
        name: "Bloom's Question Ladder",
        formula: "remember → understand → apply → analyse → evaluate → create",
        description:
          "Higher-order exam verbs (analyse, evaluate, justify) demand reasoning and judgement, not recall of definitions.",
        unit: "Thinking skills" },
    ],
    constantsAndValues: [
      { symbol: "Bloom's levels", name: "Cognitive order", value: "6 (remember to create)", unit: "Thinking skills" },
      { symbol: "Irony", name: "Types", value: "3 (verbal, situational, dramatic)", unit: "Analysis" },
      { symbol: "Argument parts", name: "Claim, evidence, warrant", value: "3", unit: "Logic" },
      { symbol: "Logical connectors", name: "Signals of reasoning", value: "therefore, however, moreover, thus, nevertheless", unit: "Cohesion" },
    ],
    entranceTraps: [
      {
        trap: "Everyone in my class uses this app, so it must be safe.",
        truth:
          "Appeal to popularity: a belief being widespread says nothing about its truth; safety is a claim needing evidence.",
        examRef: "NEB critical thinking item",
      },
      {
        trap: "Correlation proves causation.",
        truth:
          "Two trends moving together may share a hidden third cause or coincide by chance; causation needs a mechanism and controlled comparison.",
        examRef: "NEB reasoning item" },
      {
        trap: "An expert says it, so it is settled.",
        truth:
          "Appeal to authority is strong only when the expert's field matches the claim and the consensus is real; a celebrity opinion on medicine is still an opinion.",
        examRef: "Entrance reasoning item" },
      {
        trap: "Conceding a point weakens your argument.",
        truth:
          "Conceding a genuinely valid part and then rebutting it shows control; ignoring the strongest objection makes the case one-sided and weaker.",
        examRef: "NEB evaluative writing" },
    ],
    workedNumericals: [
      {
        problem: "Diagnose the flaw: You cannot trust her climate report — she failed her driving test twice.",
        given: "Attack on the person, not the report",
        steps: [
          "Identify the move: the argument attacks the speaker's unrelated past.",
          "Name it: ad hominem.",
          "Repair it: engage the report's data and sources instead.",
        ],
        answer: "Ad hominem — the driving record is irrelevant to the report's accuracy." },
      {
        problem: "Build a short argument that reading fiction improves empathy.",
        given: "Claim + evidence + reasoning",
        steps: [
          "Claim: reading fiction develops empathy.",
          "Evidence: readers of character-driven stories report recognising others' emotions more readily.",
          "Warrant: inhabiting a character's perspective rehearses the skill of imagining another mind.",
        ],
        answer: "Fiction builds empathy because inhabiting a character's viewpoint rehearses perspective-taking, as shown by readers' improved emotion recognition." },
    ],
    keyTermsAndDefinitions: [
      { term: "Claim", definition: "The statement an argument sets out to establish.", significance: "Every paragraph of a reasoned answer should trace back to it." },
      { term: "Inference", definition: "A conclusion drawn from evidence plus reasoning, not stated outright.", significance: "Distinguishing inference from fact is a standard comprehension and logic item." },
      { term: "Fallacy", definition: "A flaw in reasoning that makes an argument invalid or weak.", significance: "Naming the fallacy and the flaw earns both halves of the mark." },
      { term: "Bias", definition: "A leaning that shapes selection or wording of evidence.", significance: "Source evaluation asks for the interest behind the claim." },
      { term: "Counterargument", definition: "The strongest objection to a claim, stated fairly before it is answered.", significance: "Concession followed by rebuttal is what evaluative responses reward." },
      { term: "Symbolism", definition: "A concrete object carrying an abstract meaning in a text.", significance: "The evidence base for theme and interpretation answers." },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // नेपाली: निर्धारित पाठ (साहित्य अध्ययन)
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "sahitya-adhyayan",
      "निर्धारित पाठ",
      "कविता",
      "कथा",
      "निबन्ध",
      "जीवनी",
      "चिठी",
      "नाटक",
      "दैनिकी",
      "वक्तृता",
      "रिपोर्ताज",
    ],
    unitSlugs: ["sahitya-adhyayan"],
    subject: "nepali",
    title: "निर्धारित पाठ — विधा, केन्द्रीय भाव र विश्लेषण",
    category: "साहित्य — पाठ १–१२ को अध्ययन",
    governingLaws: [
      {
        name: "पाठ-विश्लेषणको क्रम",
        statement:
          "कुनै पनि पाठको उत्तर लेख्दा पहिले विधा पहिचान गरी कथावस्तु, केन्द्रीय भाव, पात्र वा वक्ता र भाषा-शिल्पको क्रममा अघि बढ्नुपर्छ।",
        formula: "विधा → कथावस्तु → केन्द्रीय भाव → पात्र/वक्ता → शिल्प + प्रमाण",
        conditions:
          "हरेक दाबीका साथ पाठको एक हरफ वा घटना प्रमाणका रूपमा उल्लेख गर्नुपर्छ; प्रमाण बिनाको दाबीलाई पूर्ण अंक दिइँदैन।",
      },
      {
        name: "काव्यका तत्व",
        statement:
          "कवितामा भाव (अर्थ), लय, छन्द, अलङ्कार र बिम्ब मिली काव्य-सौन्दर्य बनाउँछन्; वीर, करुण, श्रृंगार, हास्य आदि रस भावबाटै पहिचान हुन्छन्।",
        formula: "काव्य = भाव + लय + छन्द + अलङ्कार + बिम्ब",
        conditions:
          "अलङ्कार नाम लेख्दा प्रयोग भएको शब्द-समूह उद्धृत गर्नु अनिवार्य हो — उपमामा 'झैं/जस्तै' र रूपकमा सोझो सम्बन्ध चिनिन्छ।",
      },
      {
        name: "गद्य विधाका तत्व",
        statement:
          "कथा, निबन्ध, जीवनी, रिपोर्ताज र दैनिकी सबै गद्य विधा हुन्; कथामा कथावस्तु-पात्र-द्वन्द्व, निबन्धमा विचार-तर्क, जीवनीमा व्यक्तिको जीवनक्रम र दैनिकीमा तिथि-अनुसारको घटनाक्रम प्रमुख हुन्छ।",
        formula: "कथा = घटना + पात्र + द्वन्द्व  |  निबन्ध = विचार + उदाहरण + तर्क",
        conditions:
          "विधा पहिचान गर्दा लेखन-शैली हेर्नुपर्छ: संवाद-प्रधान रचना नाटक हो, तिथि-क्रममा लेखिएको आत्मपरक टिप्पणी दैनिकी हो।",
      },
    ],
    speedFormulas: [
      {
        name: "पाठ १–१२ को विधा-स्मरण",
        formula:
          "वीर पुर्खा-कविता | गाउँको माया-कथा | संस्कृतिको नयाँ यात्रा-निबन्ध | योगमाया-जीवनी | साथीलाई चिठी-चिठी | त्यो फेरि फर्कला?-कथा | पर्यापर्यटन-निबन्ध | लौ आयो ताजा खबर-लघु नाटक | सफलताको कथा-रिपोर्ताज | कृषिशालामा एक दिन-संवाद | रारा भ्रमण-दैनिकी | जलस्रोत र ऊर्जा-वक्तृता",
        description:
          "विधा पहिचानको प्रश्नमा यही तालिका कण्ठ गर्नु सबैभन्दा छिटो उपाय हो; विधा र पाठ नम्बर जोडी बनाएर सम्झनुहोस्।",
        unit: "विधा",
      },
      {
        name: "केन्द्रीय भाव लेख्ने सूत्र",
        formula: "पाठले ... भन्ने सन्देश दिन्छ, किनभने ... (घटना/हरफ)",
        description:
          "भावलाई कथावस्तुको पुनर्कथन नबनाई एउटा वाक्यमा निचोड्नुहोस् र प्रमाण जोड्नुहोस्।",
        unit: "विश्लेषण",
      },
      {
        name: "पात्र-चित्रणका आयाम",
        formula: "शारीरिक + मानसिक + सामाजिक + नैतिक विशेषता",
        description:
          "पात्र-चित्रणको प्रश्नमा यही चार आयाममा व्यवहार र संवादबाट उदाहरण दिनुहोस्।",
        unit: "चरित्र",
      },
      {
        name: "अलङ्कार पहिचान",
        formula: "उपमा = झैं/जस्तै  |  रूपक = सोझो तुलना  |  अनुप्रास = वर्ण पुनरावृत्ति  |  मानवीकरण = प्रकृतिलाई मानव-क्रिया",
        description:
          "अलङ्कारको नामसँगै उद्धरण र प्रभाव लेख्नुहोस् — नाम मात्र लेख्दा आधा अंक मात्र पाइन्छ।",
        unit: "शिल्प",
      },
    ],
    constantsAndValues: [
      { symbol: "निर्धारित पाठ", name: "पाठ्यक्रमभित्रका पाठ", value: "१२", unit: "पाठ" },
      { symbol: "द्वन्द्व", name: "द्वन्द्वका प्रकार", value: "४ (मनुष्य–मनुष्य, मनुष्य–प्रकृति, मनुष्य–समाज, आन्तरिक)", unit: "तत्व" },
      { symbol: "अलङ्कार", name: "प्रमुख अलङ्कार", value: "उपमा, रूपक, अनुप्रास, मानवीकरण", unit: "शिल्प" },
      { symbol: "भानुभक्त आचार्य", name: "आदिकवि — भानुभक्तीय रामायणका रचनाकार", value: "आदिकवि", unit: "साहित्यकार" },
      { symbol: "लक्ष्मीप्रसाद देवकोटा", name: "महाकवि — मुनामदन, लक्ष्मी निबन्धसङ्ग्रहका रचनाकार", value: "महाकवि", unit: "साहित्यकार" },
      { symbol: "मोतीराम भट्ट", name: "भानुभक्तको जीवनी लेखी साहित्य-प्रकाशनमा ल्याउने साहित्यकार", value: "आधुनिक परम्पराका प्रवर्तक", unit: "साहित्यकार" },
    ],
    entranceTraps: [
      {
        trap: "पाठको विधा नै गलत पहिचान गर्नु — रिपोर्ताजलाई कथा वा दैनिकीलाई निबन्ध भन्नु।",
        truth:
          "विधा लेखन-शैलीले छुट्टिन्छ: तिथि-क्रम = दैनिकी, प्रत्यक्ष घटनास्थल + तथ्याङ्क = रिपोर्ताज, संवाद र दृश्य = नाटक।",
        examRef: "NEB कक्षा ११ नेपाली, पाठ-आधारित प्रश्न",
      },
      {
        trap: "केन्द्रीय भाव सोधिएको ठाउँमा कथावस्तुको पुनर्कथन लेख्नु।",
        truth:
          "कथावस्तु 'के भयो' हो, केन्द्रीय भाव 'के सन्देश दिन्छ' हो — भाव एउटा वाक्यमा कथन गरी प्रमाण जोड्नुपर्छ।",
        examRef: "NEB नेपाली, दीर्घोत्तर प्रश्न",
      },
      {
        trap: "अलङ्कारको नाम मात्र लेखी उदाहरण नदिनु।",
        truth:
          "उपमा, रूपक आदिको पहिचानमा उद्धृत शब्द-समूह नै प्रमाण हो; उदाहरण बिना नामको अंक मात्र पाइन्छ।",
        examRef: "NEB नेपाली, शिल्प-आधारित प्रश्न",
      },
      {
        trap: "कथावाचकलाई लेखक मान्नु।",
        truth:
          "कथावाचक रचनाको स्वर हो; प्रथम पुरुषको कथावाचक सीमित वा पक्षपाती हुन सक्छ, त्यसैले लेखकको आफ्नै भनाइ मान्न मिल्दैन।",
        examRef: "NEB नेपाली, विश्लेषणात्मक प्रश्न",
      },
    ],
    workedNumericals: [
      {
        problem: "'त्यो फेरि फर्कला?' पाठको विधा र केन्द्रीय भाव पहिचान गर्नुहोस्।",
        given: "पाठ ६ — मनोवैज्ञानिक कथा (पाठ्यक्रमानुसार)",
        steps: [
          "विधा पहिचान: पात्रको मनोभाव र प्रतीक्षालाई प्रधान बनाइएकाले यो मनोवैज्ञानिक कथा हो।",
          "कथावस्तु संक्षेप: प्रिय व्यक्तिको प्रतीक्षा र सम्झनामा उभिएको मन।",
          "केन्द्रीय भाव: प्रतीक्षा र सम्झनाले मनलाई बाँधिराख्छ — पात्रको आशा र वेदनाबाट पुष्टि।",
        ],
        answer: "मनोवैज्ञानिक कथा; भाव = प्रतीक्षा/सम्झनाको मनोवैज्ञानिक प्रभाव, पात्रको आन्तरिक द्वन्द्वले पुष्टि।",
      },
      {
        problem: "पाठ १ 'वीर पुर्खा' कविताको भाव र शिल्प पहिचान गर्नुहोस्।",
        given: "पाठ १ — कविता (राष्ट्रिय भाव)",
        steps: [
          "भाव: पुर्खाको वीरता र बलिदानप्रति श्रद्धा, राष्ट्रिय गौरव।",
          "शिल्प: राष्ट्रिय भाव बोकेको लयात्मक काव्य-भाषा; बिम्ब र सम्बोधन-शैली।",
          "प्रमाण: जातीय गौरव जगाउने हरफ उद्धृत गर्नु।",
        ],
        answer: "वीरता/राष्ट्रिय गौरवको भाव; शिल्प = लयात्मक सम्बोधन र बिम्ब, हरफ उद्धरणसहित।",
      },
    ],
    keyTermsAndDefinitions: [
      { term: "केन्द्रीय भाव", definition: "रचनाले दिन खोजेको मूल सन्देश वा भावना।", significance: "दीर्घोत्तर प्रश्नको केन्द्र — प्रमाण जोडेर लेख्नुपर्ने अंश।" },
      { term: "कथावस्तु", definition: "कथामा घटनाहरूको क्रमबद्ध रूप।", significance: "केन्द्रीय भावसँग भ्रमित हुने ठाउँ — 'के भयो' र 'के सन्देश' छुट्ट्याउनुहोस्।" },
      { term: "अलङ्कार", definition: "भाषालाई सुन्दर र प्रभावकारी बनाउने शब्द-रचना।", significance: "उपमा, रूपक, अनुप्रास प्रायः सोधिने अलङ्कार हुन्।" },
      { term: "द्वन्द्व", definition: "पात्रको चाहना र बाधाबीचको संघर्ष।", significance: "कथाको गति र पात्रको विकास यहीबाट हुन्छ।" },
      { term: "विधा", definition: "कविता, कथा, निबन्ध, नाटक जस्ता रचना-प्रकार।", significance: "विधा पहिचान नै धेरै प्रश्नको पहिलो चरण हो।" },
      { term: "शिल्प", definition: "रचना-कौशल — भाषा, लय, बिम्ब र अलङ्कारको प्रयोग।", significance: "भाव र शिल्प दुवै परीक्षामा छुट्टाछुट्टै सोधिन्छन्।" },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // नेपाली: लेखन र रचना
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "lekhan-ra-rachana",
      "निबन्ध",
      "चिठी",
      "संवाद",
      "दैनिकी",
      "वक्तृता",
      "रिपोर्ताज",
    ],
    unitSlugs: ["lekhan-ra-rachana"],
    subject: "nepali",
    title: "लेखन र रचना — निबन्ध, चिठी, संवाद, दैनिकी र वक्तृता",
    category: "सिर्जनात्मक लेखन",
    governingLaws: [
      {
        name: "निबन्धको त्रि-खण्ड संरचना",
        statement:
          "निबन्ध भूमिका, विषय-विस्तार र उपसंहार गरी तीन खण्डमा लेखिन्छ; भूमिकाले विषय प्रस्तुत गर्छ, मुख्य खण्डले तर्क-उदाहरण दिन्छ र उपसंहारले निष्कर्ष निकाल्छ।",
        formula: "भूमिका + विषय-विस्तार (मुख्य खण्ड) + उपसंहार",
        conditions:
          "एउटै अनुच्छेदमा एउटै विचार — नयाँ विचारका लागि नयाँ अनुच्छेद; आत्मपरक निबन्धमा 'म', वस्तुपरकमा तथ्य र तर्क प्रधान हुन्छ।",
      },
      {
        name: "औपचारिक चिठीको ढाँचा",
        statement:
          "औपचारिक चिठीमा प्रेषकको ठेगाना, मिति, प्रापकको पद/ठेगाना, सम्बोधन, विषय, मुख्य भाग, समापन र हस्ताक्षर क्रमैले लेखिन्छ।",
        formula: "ठेगाना → मिति → प्रापक → सम्बोधन → विषय → मुख्य भाग → समापन → हस्ताक्षर",
        conditions:
          "औपचारिक चिठीमा संक्षिप्त र औपचारिक भाषा; अनौपचारिक चिठीमा आत्मीयता र स्वाभाविक बोली-चाली रहन्छ।",
      },
      {
        name: "दैनिकी र रिपोर्ताजको पृथक्‍ता",
        statement:
          "दैनिकी तिथि-अनुसार घटना, भावना र अनुभूति क्रमैले लेखिन्छ; रिपोर्ताज घटनास्थलको प्रत्यक्ष वर्णन, साक्षात्कार र तथ्याङ्कमा आधारित हुन्छ।",
        formula: "दैनिकी = तिथि + घटना + व्यक्तिगत भावना  |  रिपोर्ताज = स्थल-वर्णन + साक्षात्कार + तथ्य",
        conditions:
          "दैनिकीमा भूतकाल प्रयोग प्रचलित छ; रिपोर्टाजमा दृश्य-विवरण यति प्रत्यक्ष हुनुपर्छ कि पाठक घटनास्थलै पुगेको अनुभूति गरोस्।",
      },
    ],
    speedFormulas: [
      {
        name: "संवाद लेखन",
        formula: "पात्र-अनुसार स्वर + छोटा वाक्य + दृश्य-निर्देशन",
        description:
          "संवाद दुई पात्रबीचको कुराकानी हो; हरेक पात्रको बोली उसको पृष्ठभूमि अनुसार फरक पार्नु र संक्षिप्त राख्नु मुख्य सीप हो।",
        unit: "संवाद",
      },
      {
        name: "वक्तृता संरचना",
        formula: "सम्बोधन → विषय-प्रवेश → तर्क र उदाहरण → निष्कर्ष/आह्वान",
        description:
          "वक्तृता सम्बोधनबाट सुरु भई श्रोतालाई सीधा सम्बोधन गर्ने शैलीमा लेखिन्छ; अन्त्यमा स्पष्ट आह्वान हुनुपर्छ।",
        unit: "वक्तृता",
      },
      {
        name: "रिपोर्ताजका तत्व",
        formula: "प्रत्यक्ष वर्णन + साक्षात्कार + तथ्याङ्क + लेखकको दृष्टि",
        description:
          "घटनास्थलको घाम-पानीसम्मको वर्णन, सम्बन्धित व्यक्तिसँगको कुराकानी र तथ्याङ्क जोड्दा रिपोर्टाज प्रामाणिक बन्छ।",
        unit: "रिपोर्ताज",
      },
      {
        name: "अनुच्छेदको केन्द्रविन्दु",
        formula: "एक अनुच्छेद = एक केन्द्रीय विचार",
        description:
          "अनुच्छेदलाई निबन्ध वा चिठी जुनसुकै भए पनि एक अनुच्छेदले एउटै विचार विकास गर्नुपर्छ।",
        unit: "संरचना" },
    ],
    constantsAndValues: [
      { symbol: "निबन्ध", name: "निबन्धका प्रकार", value: "२ (आत्मपरक, वस्तुपरक)", unit: "लेखन" },
      { symbol: "चिठी", name: "चिठीका प्रकार", value: "२ (औपचारिक, अनौपचारिक)", unit: "लेखन" },
      { symbol: "सम्बोधन", name: "औपचारिक सम्बोधनका रूप", value: "माननीय, आदरणीय, श्री, श्रीमती, सम्पादकज्यू", unit: "शिष्टाचार" },
      { symbol: "मिति", name: "दैनिकी/चिठीमा मितिको स्थान", value: "दैनिकीमा हरेक दिनको शीर्षकमा, चिठीमा ठेगानापछि", unit: "ढाँचा" },
    ],
    entranceTraps: [
      {
        trap: "औपचारिक चिठीमा 'प्रिय साथी' जस्तो अनौपचारिक सम्बोधन लेख्नु।",
        truth:
          "औपचारिक चिठीमा पद र सम्बोधन औपचारिक हुनुपर्छ — माननीय/आदरणीय + पद; आत्मीय सम्बोधन अनौपचारिक चिठीमा मात्र।",
        examRef: "NEB कक्षा ११ नेपाली, चिठी लेखन",
      },
      {
        trap: "दैनिकीमा वर्तमान कालमा घटना बताउनु।",
        truth:
          "दैनिकी बितेका दिनको विवरण हो — भूतकालमा लेखिन्छ; तिथि र दिन-क्रम अनिवार्य हुन्छ।",
        examRef: "NEB नेपाली, दैनिकी लेखन",
      },
      {
        trap: "निबन्धमा भूमिका र उपसंहार छुटाउनु।",
        truth:
          "त्रि-खण्ड संरचना नै निबन्धको लक्षण हो; भूमिका-उपसंहार बिना लेखिएको लेखनलाई संरचनाको अंक दिइँदैन।",
        examRef: "NEB नेपाली, निबन्ध लेखन",
      },
      {
        trap: "संवादलाई निबन्ध जसरी लेख्नु।",
        truth:
          "संवाद पात्रहरूबीचको प्रत्यक्ष कुराकानी हो — छोटा वाक्य, पालैपालो बोली र आवश्यक परे दृश्य-निर्देशन।",
        examRef: "NEB नेपाली, संवाद लेखन",
      },
    ],
    workedNumericals: [
      {
        problem: "'पर्यापर्यटनका सम्भावना' विषयमा वस्तुपरक निबन्धको रूपरेखा बनाउनुहोस्।",
        given: "विषय: पर्यापर्यटन; निबन्ध प्रकार: वस्तुपरक",
        steps: [
          "भूमिका: पर्यापर्यटन भनेको के हो र नेपालमा यसको सान्दर्भिकता।",
          "मुख्य खण्ड: सम्भावना (प्राकृतिक सुन्दरता, संस्कृति, पदयात्रा) र आयाम (रोजगारी, स्थानीय अर्थतन्त्र) — प्रत्येकलाई छुट्टै अनुच्छेदमा।",
          "उपसंहार: नीति, पूर्वाधार र स्थानीय सहभागिताको सिफारिससहित निष्कर्ष।",
        ],
        answer: "भूमिका-विस्तार-उपसंहार ढाँचाको रूपरेखा, तथ्य र तर्क प्रधान।",
      },
      {
        problem: "प्रधानाध्यापकलाई पुस्तकालय सुधारको माग गर्दै औपचारिक चिठीको रूपरेखा बनाउनुहोस्।",
        given: "प्रापक: प्रधानाध्यापक (औपचारिक)",
        steps: [
          "ठेगाना र मिति लेखी प्रापकको पद उल्लेख गर्नुहोस्।",
          "सम्बोधन 'आदरणीय महोदय' र विषय 'पुस्तकालय सुधार सम्बन्धमा' लेख्नुहोस्।",
          "मुख्य भाग: समस्या, प्रभाव र माग — तीन अनुच्छेदमा।",
          "समापन र हस्ताक्षरसहित औपचारिक शैली कायम राख्नुहोस्।",
        ],
        answer: "औपचारिक ढाँचाको चिठी: ठेगाना-मिति-प्रापक-सम्बोधन-विषय-मुख्य भाग-समापन-हस्ताक्षर।",
      },
    ],
    keyTermsAndDefinitions: [
      { term: "भूमिका", definition: "निबन्धको सुरुवाती खण्ड जसले विषय प्रस्तुत गर्छ।", significance: "पहिलो अनुच्छेदले नै प्रभाव पार्ने भएकाले स्पष्ट र सान्दर्भिक हुनुपर्छ।" },
      { term: "उपसंहार", definition: "निबन्धको अन्तिम खण्ड जसले निष्कर्ष निकाल्छ।", significance: "निष्कर्ष बिना निबन्ध अपूर्ण मानिन्छ।" },
      { term: "सम्बोधन", definition: "चिठी वा वक्तृतामा प्रापकलाई गरिने औपचारिक सम्बोधन।", significance: "औपचारिकता जनाउने पहिलो सङ्केत — गलत भए अंक कट्छ।" },
      { term: "रिपोर्ताज", definition: "घटनास्थलको प्रत्यक्ष वर्णन र साक्षात्कारमा आधारित रचना।", significance: "प्रत्यक्ष वर्णन नै यस विधाको प्राण हो।" },
      { term: "संवाद", definition: "दुई वा बढी पात्रबीचको प्रत्यक्ष कुराकानी।", significance: "पात्र-चरित्र र स्वर फरक पार्ने सीप संवादमा सोधिन्छ।" },
      { term: "आत्मपरक", definition: "लेखकको व्यक्तिगत अनुभूति र भावना प्रधान हुने लेखन।", significance: "आत्मपरक र वस्तुपरक निबन्धको भेद परीक्षामा सोधिन्छ।" },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // नेपाली: कथा, नाटक र संस्कृति
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "katha-natak-ra-sanskriti",
      "कथा",
      "नाटक",
      "व्यंग्य",
      "हास्य",
      "संस्कृति",
      "चाडपर्व",
      "साहित्यकार",
    ],
    unitSlugs: ["katha-natak-ra-sanskriti"],
    subject: "nepali",
    title: "कथा, नाटक, व्यंग्य र नेपाली सांस्कृतिक विविधता",
    category: "साहित्यिक विधा र संस्कृति",
    governingLaws: [
      {
        name: "कथाका तत्व",
        statement:
          "कथा कथावस्तु, पात्र, द्वन्द्व, वातावरण, दृष्टिबिन्दु र भाषा-शैलीले बन्छ; द्वन्द्व नै कथालाई अघि बढाउने इन्धन हो।",
        formula: "कथा = कथावस्तु + पात्र + द्वन्द्व + वातावरण + दृष्टिबिन्दु",
        conditions:
          "द्वन्द्व नभएको घटना-वर्णन कथा होइन; पात्रको चाहना र बाधा जुध्नु अनिवार्य हो।",
      },
      {
        name: "नाटकका तत्व",
        statement:
          "नाटक संवाद, दृश्य र अङ्क, पात्र-चरित्र, द्वन्द्व र मञ्च-निर्देशनमा प्रस्तुत हुन्छ; कथा दृश्यमा देखाइन्छ, वर्णन गरिँदैन।",
        formula: "नाटक = संवाद + दृश्य/अङ्क + पात्र + द्वन्द्व + मञ्च-निर्देशन",
        conditions:
          "मञ्च-निर्देशनले वातावरण, भाव र क्रिया देखाउँछ; लघु नाटकमा दृश्य एक वा दुईमै कथा टुङ्गिन्छ।",
      },
      {
        name: "सांस्कृतिक विविधता",
        statement:
          "नेपालका चाडपर्व क्षेत्र, धर्म र समुदाय अनुसार फैलिएका छन्; राष्ट्रिय, हिमाली, मधेसी, किरात र मुस्लिम पर्वहरू मिली साझा संस्कृति बन्छ।",
        formula: "दशैं-तिहार (राष्ट्रिय) + छठ-माघी (मधेस/तराई) + ल्होसार-उधौली (हिमाली/किरात) + इद (मुस्लिम) = साझा नेपाली संस्कृति",
        conditions:
          "कुनै पर्व कुन समुदाय वा क्षेत्रसँग जोडिएको हो भन्ने पहिचान गर्नु नै सांस्कृतिक प्रश्नको मुख्य सीप हो।",
      },
    ],
    speedFormulas: [
      {
        name: "व्यंग्य र हास्यका साधन",
        formula: "श्लेष + वक्रोक्ति + विरोधाभास + अतिशयोक्ति + व्याजस्तुति",
        description:
          "व्यंग्यमा भित्री अर्थ मुख्य हो; हास्यमा हँसाउने शिल्प मात्र। श्लेष, वक्रोक्ति र विरोधाभास व्यंग्यका प्रमुख साधन हुन्।",
        unit: "शिल्प",
      },
      {
        name: "विधागत भेद तालिका",
        formula: "कथा = घटना-द्वन्द्व | कविता = भाव-लय | नाटक = संवाद-दृश्य | निबन्ध = विचार-तर्क",
        description:
          "विधा पहिचानको प्रश्नमा पहिलो लक्षण हेर्नुहोस्: संवाद छ भने नाटक, लय छ भने कविता, द्वन्द्व छ भने कथा।",
        unit: "विधा",
      },
      {
        name: "पर्व-क्षेत्र जोडी",
        formula: "दशैं/तिहार = राष्ट्रिय  |  छठ/माघी = तराई-मधेस  |  ल्होसार/उधौली-उभौली = हिमाली-किरात  |  इद = मुस्लिम समुदाय",
        description:
          "पर्व र क्षेत्र/समुदायको जोडी सम्झनु — सांस्कृतिक विविधताका प्रश्न यहीबाट सजिलै हल हुन्छन्।",
        unit: "संस्कृति",
      },
      {
        name: "साहित्यकार पहिचान",
        formula: "आदिकवि = भानुभक्त आचार्य | महाकवि = लक्ष्मीप्रसाद देवकोटा | भानुभक्त-प्रवर्तक = मोतीराम भट्ट",
        description:
          "साहित्यकारको योगदान सोध्दा उपाधि, कृति र युग तीनै सम्झनुहोस्; उपाधि मात्र लेख्दा अंक पुग्दैन।",
        unit: "साहित्यकार",
      },
    ],
    constantsAndValues: [
      { symbol: "द्वन्द्व", name: "द्वन्द्वका प्रकार", value: "४ (मनुष्य–मनुष्य, मनुष्य–प्रकृति, मनुष्य–समाज, आन्तरिक)", unit: "कथा" },
      { symbol: "चाडपर्व", name: "राष्ट्रिय पर्व", value: "दशैं, तिहार, बुद्ध जयन्ती", unit: "संस्कृति" },
      { symbol: "ल्होसार", name: "हिमाली समुदायको नयाँ वर्ष", value: "शेर्पा/तामाङ/मगर आदि", unit: "संस्कृति" },
      { symbol: "छठ", name: "तराई-मधेसको सूर्य-उपासना पर्व", value: "कार्तिक शुक्ल पक्ष", unit: "संस्कृति" },
      { symbol: "उधौली/उभौली", name: "किरात समुदायको पर्व", value: "मङ्सिर/बैशाख", unit: "संस्कृति" },
    ],
    entranceTraps: [
      {
        trap: "व्यंग्य र हास्यलाई एउटै ठान्नु।",
        truth:
          "हास्य हँसाउनमा सीमित हुन्छ, व्यंग्यले मूल्य र विचारको खिल्ली उडाउँछ; एउटै श्लेष दुवैतर्फ प्रयोग भए पनि उद्देश्य फरक हुन्छ।",
        examRef: "NEB नेपाली, व्यंग्य-आधारित प्रश्न",
      },
      {
        trap: "पात्रलाई लेखक मानी उद्धरण जोड्नु।",
        truth:
          "पात्र र लेखक फरक हुन् — पात्रको भनाइ लेखकको विचार नहुन सक्छ, विशेषतः व्यंग्यमा।",
        examRef: "NEB नेपाली, विश्लेषणात्मक प्रश्न",
      },
      {
        trap: "चाडपर्वको क्षेत्रीय पहिचान गलत मिलाउनु (जस्तै ल्होसारलाई तराईको पर्व भन्नु)।",
        truth:
          "ल्होसार हिमाली समुदायको, छठ तराई-मधेसको र उधौली-उभौली किरात समुदायको पर्व हो।",
        examRef: "NEB नेपाली, संस्कृति-आधारित प्रश्न",
      },
      {
        trap: "साहित्यकारको उपाधि र कृति नमिलाउनु।",
        truth:
          "आदिकवि भानुभक्त आचार्य (भानुभक्तीय रामायण) र महाकवि लक्ष्मीप्रसाद देवकोटा (मुनामदन) को योगदानसँग उपाधि जोडेर सम्झनुहोस्।",
        examRef: "NEB नेपाली, साहित्यकार परिचय",
      },
    ],
    workedNumericals: [
      {
        problem: "एक-दृश्यको नाटकमा संवाद र मञ्च-निर्देशनले कथा कसरी अघि बढाउँछन्, विश्लेषण गर्नुहोस्।",
        given: "लघु नाटक — सीमित दृश्य, संवाद-प्रधान",
        steps: [
          "संवादबाट पात्र-परिचय र द्वन्द्व स्थापना हुन्छ (वर्णनको अवसर नहुने भएकाले)।",
          "मञ्च-निर्देशनले वातावरण, भाव र क्रिया देखाउँछ।",
          "द्वन्द्वको चरमबिन्दु संवादको टकरावमै आउँछ र दृश्यान्त्यमा समाधान हुन्छ।",
        ],
        answer: "संवादले कथावस्तु र चरित्र बोल्छ, मञ्च-निर्देशनले दृश्य र भाव; दुवै मिली दृश्यमै कथा पूरा हुन्छ।",
      },
      {
        problem: "नेपालका पाँच पर्व क्षेत्र/समुदायसँग जोडेर तालिका बनाउनुहोस्।",
        given: "दशैं, छठ, ल्होसार, उधौली, इद",
        steps: [
          "दशैं — राष्ट्रिय पर्व, सबै समुदायमा प्रचलित।",
          "छठ — तराई-मधेस, सूर्य-उपासना।",
          "ल्होसार — हिमाली समुदायको नयाँ वर्ष।",
          "उधौली — किरात समुदायको मङ्सिरको पर्व; इद — मुस्लिम समुदायको पर्व।",
        ],
        answer: "दशैं=राष्ट्रिय, छठ=मधेस, ल्होसार=हिमाली, उधौली=किरात, इद=मुस्लिम — साझा सांस्कृतिक विविधता।",
      },
    ],
    keyTermsAndDefinitions: [
      { term: "द्वन्द्व", definition: "कथाको गतिलाई अघि बढाउने संघर्ष।", significance: "पात्रको चाहना र बाधाबीचको जुधाइ नै कथाको इन्धन हो।" },
      { term: "वक्रोक्ति", definition: "शब्दको सोझो अर्थ नलिई उल्टो अर्थ जनाउने व्यंग्य-शैली।", significance: "व्यंग्य पहिचानको सबैभन्दा सोधिने साधन।" },
      { term: "श्लेष", definition: "एउटै शब्दले दुई अर्थ दिने अलङ्कार।", significance: "हास्य-व्यंग्य रचनामा दोहोरो अर्थ सिर्जना गर्छ।" },
      { term: "मञ्च-निर्देशन", definition: "नाटकमा वातावरण, भाव र क्रिया देखाउने सङ्केत।", significance: "दृश्यमा कथा बुझाउने मुख्य साधन।" },
      { term: "लोकसंस्कृति", definition: "जनसमुदायमा लामो समयदेखि चलिआएको पर्व-परम्परा र विश्वास।", significance: "चाडपर्व र परम्पराका प्रश्नको आधार।" },
      { term: "दृष्टिबिन्दु", definition: "कथा भनिने दृष्टि — कथावाचकको स्थान।", significance: "कथावाचक कति जान्छ/देख्छ भन्ने निर्धारण गर्छ।" },
    ],
  },
];
