import type { WritingType } from "./types";

/**
 * PRO VOCABULARY & FLOW — the words professional writers actually use.
 * Each entry is a portable word-bank: memorise the groups, reuse them in
 * every essay, letter, report, article and speech.
 */
export const VOCABULARY_TYPES: WritingType[] = [
  {
    id: "connectors-addition-contrast-cause",
    name: "Connector Mega-Bank I — Addition, Contrast & Cause",
    category: "Pro Vocabulary & Flow",
    icon: "🔗",
    marks: "Used in every writing task — examiners actively look for these",
    concept:
      "Connectors (linking words / discourse markers) are the hinges of professional writing. They tell the reader the LOGICAL DIRECTION of the next sentence before they read it: am I adding more support, turning against my previous point, or explaining a consequence? Strong writers pick the exact hinge; weak writers recycle 'and', 'but' and 'so'.",
    format: [
      {
        label: "➕ Adding information (build support)",
        detail:
          "furthermore · moreover · in addition · additionally · what is more · besides this · as well as · not only … but also · above all · likewise · similarly · in the same way · by the same token · equally · coupled with · together with · on top of that · to say nothing of · not to mention · another key point is · more importantly · most importantly",
        example: "The dam would generate electricity. Moreover, it would control the floods that destroy crops every monsoon.",
      },
      {
        label: "⚔️ Contrasting & conceding (turn the direction)",
        detail:
          "however · nevertheless · nonetheless · on the other hand · in contrast · by contrast · conversely · on the contrary · whereas · while · although · even though · despite + noun · in spite of + noun · yet · even so · still · having said that · be that as it may · admittedly … but · all the same · instead of · rather than · unlike · in reality · in fact",
        example: "Admittedly, tourism brings foreign currency. Nevertheless, unregulated trekking erodes mountain trails faster than they can be repaired.",
      },
      {
        label: "🎯 Cause & effect (explain WHY and WHAT FOLLOWS)",
        detail:
          "because · since · as · due to + noun · owing to + noun · on account of · as a result · consequently · therefore · thus · hence · accordingly · for this reason · which is why · thereby · leads to · results in · brings about · gives rise to · stems from · arises from · is caused by · thanks to · so … that",
        example: "Because brick kilns operate unchecked, PM2.5 levels soar; consequently, respiratory illness rises every winter.",
      },
    ],
    startings: [
      "What is more, …",
      "This matters because …",
      "Despite its obvious benefits, …",
      "The consequences are impossible to ignore: …",
      "Not only does X harm Y, but it also …",
    ],
    connectors: [
      "furthermore / moreover / in addition (add)",
      "however / nevertheless / on the other hand (contrast)",
      "therefore / consequently / as a result (effect)",
      "whereas / while / although (balance two sides)",
      "due to / owing to + NOUN (cause — never 'due to' + clause)",
    ],
    example:
      "Social media has transformed how young Nepalis communicate. What is more, it has opened small businesses to national markets at almost no cost. Admittedly, platforms can spread misinformation at alarming speed. However, the answer is digital literacy, not prohibition, because an informed user community neutralises fake news far more effectively than any ban. Therefore, schools should teach media evaluation as a core skill rather than treating phones as contraband.",
    grammar: [
      "Punctuation: use a comma after a long introductory connector — 'However, …' / 'As a result, …'.",
      "'Despite' and 'in spite of' take a NOUN or gerund (despite the rain / in spite of failing); 'although' takes a full clause (although it rained).",
      "'Not only' at the start of a sentence forces inversion: 'Not only does exercise improve mood, but it also sharpens memory.'",
      "'Due to' follows the noun rule of 'caused by'; 'because of' and 'owing to' are safer substitutes in formal writing.",
    ],
    tips: [
      "One connector per sentence is usually enough — stacking 'Moreover, furthermore, in addition …' reads as padding.",
      "Vary position: connectors can open, interrupt ('This, however, is unlikely') or close ('…and therefore must be regulated').",
      "In balance-style essays, pair ONE concessive connector (admittedly / although) with ONE contrastive connector (however / nevertheless) per paragraph.",
    ],
  },
  {
    id: "connectors-sequence-example-emphasis",
    name: "Connector Mega-Bank II — Sequence, Example, Emphasis & Conclusion",
    category: "Pro Vocabulary & Flow",
    icon: "🧭",
    concept:
      "The second half of the connector arsenal: markers that ORDER your ideas (sequence), ground them in evidence (example), signal confidence (emphasis) and close with authority (conclusion). These four families map directly onto exam structure: intro → ordered body points → evidence → conclusion.",
    format: [
      {
        label: "🔢 Sequencing & ordering (give the reader a roadmap)",
        detail:
          "first of all · firstly · to begin with · in the first place · secondly · thirdly · subsequently · meanwhile · afterwards · later · then · next · before that · after that · following this · prior to · finally · lastly · eventually · ultimately · at this point · as soon as · once · until · by the time · during · throughout · gradually",
        example: "To begin with, the bridge improves trade. Subsequently, schools and clinics follow the road. Ultimately, the entire district develops.",
      },
      {
        label: "📎 Giving examples (evidence on the page)",
        detail:
          "for example · for instance · to illustrate · such as · namely · in particular · notably · especially · a case in point is · take … for example · this is best seen in · consider · specifically · including · as evidenced by · one striking example is · to give a concrete illustration",
        example: "Several Nepali innovations deserve attention — a case in point is the spread of digital wallet apps connecting rural vendors to city buyers.",
      },
      {
        label: "❗ Emphasising (signal confidence and weight)",
        detail:
          "indeed · clearly · obviously · undoubtedly · unquestionably · above all · most importantly · notably · significantly · remarkably · in fact · as a matter of fact · it cannot be denied that · without doubt · admittedly · certainly · needless to say · crucially · essentially · fundamentally · what matters most is",
        example: "Indeed, no single reform matters more than teacher training; crucially, technology without trained teachers is merely expensive furniture.",
      },
      {
        label: "🏁 Concluding (close with authority)",
        detail:
          "in conclusion · to conclude · to sum up · in summary · all in all · overall · on the whole · in the final analysis · taking everything into account · weighing both sides · ultimately · in the end · as has been noted · given these points · to bring matters to a close · for these reasons · the evidence suggests that",
        example: "Weighing both sides, the benefits of disciplined social-media use clearly outweigh its harms — provided digital literacy is taught early.",
      },
    ],
    startings: [
      "To begin with, …",
      "A case in point is …",
      "What matters most, however, is …",
      "Taking everything into account, …",
      "The evidence, on balance, suggests that …",
    ],
    connectors: [
      "first of all / secondly / finally (roadmap)",
      "for instance / a case in point is (evidence)",
      "indeed / most importantly (emphasis)",
      "in conclusion / to sum up (close)",
      "eventually / ultimately (long-run result)",
    ],
    example:
      "To begin with, Nepal must invest in vocational education. For instance, Germany's apprenticeship model places students in paid industry training, and youth unemployment there remains among Europe's lowest. Moreover, such programmes honour students who learn better by doing. Indeed, no country has industrialised on university degrees alone. Given these points, Nepal should ultimately treat skills — not certificates — as the true currency of development.",
    grammar: [
      "Sequence adverbs are followed by a comma when they open a sentence: 'Firstly, …' 'Next, …'.",
      "'Such as' introduces examples inside a sentence without a comma in restrictive use: 'crops such as rice and maize'.",
      "'Eventually' = after a long time (finally happened); do not confuse it with 'ultimately' (in the end, fundamentally).",
      "Conclusive connectors signal paragraph endings — never follow 'In conclusion' with a NEW argument.",
    ],
    tips: [
      "In essays, number your body paragraphs with sequence markers — examiners reward visible structure.",
      "Support EVERY major claim with one 'for instance' — unsupported claims lose marks.",
      "Reserve 'in conclusion' for the actual final paragraph; 'overall' and 'on the whole' work for mid-essay summaries.",
    ],
  },
  {
    id: "formal-vocabulary-upgrade",
    name: "Formal Vocabulary Upgrade — Informal → Professional",
    category: "Pro Vocabulary & Flow",
    icon: "⬆️",
    concept:
      "Professional writing is not about long words — it is about PRECISE words. Each informal word has a formal twin that sounds calm, exact and educated. Memorise these substitution pairs and your writing instantly upgrades from chat to essay. Rule of thumb: if you would say it to a friend, find its twin before you write it in an exam.",
    format: [
      {
        label: "🗣️ Verbs of speaking & asking",
        detail:
          "say → state, remark, note, observe, declare, assert, express, point out, convey · tell → inform, notify, advise · ask → enquire, request, seek · answer → respond, reply · talk about → discuss, address, examine · think → believe, consider, maintain, contend · want to know → wish to ascertain",
        example: "The report states that… · I am writing to enquire about… · The minister noted that…",
      },
      {
        label: "📦 Verbs of getting & giving",
        detail:
          "get → obtain, acquire, receive, secure, gain · give → provide, supply, offer, grant, deliver, present · buy → purchase, acquire · put up with → tolerate, endure, withstand · give up → abandon, relinquish, discontinue · keep → retain, preserve, maintain · set up → establish, found, institute",
        example: "Applicants must obtain consent… · The council provides clean water… · The company established a scholarship.",
      },
      {
        label: "🔍 Verbs of showing & proving",
        detail:
          "show → demonstrate, reveal, indicate, illustrate, exhibit, underscore, highlight · prove → establish, verify, confirm, substantiate, corroborate · make clear → clarify, elucidate · look into → investigate, examine, scrutinise · find out → determine, ascertain, discover · point out → highlight, identify, draw attention to",
        example: "The study demonstrates that… · Scientists confirmed the theory… · The audit scrutinised every transaction.",
      },
      {
        label: "📏 Describing words (adjectives & quantifiers)",
        detail:
          "good → beneficial, advantageous, favourable, constructive, valuable · bad → detrimental, adverse, harmful, counterproductive · big → substantial, considerable, significant · small → minimal, marginal, modest, negligible · important → crucial, vital, essential, pivotal, paramount, indispensable · a lot of → numerous, a great deal of, considerable, an abundance of · many → numerous, countless, a host of · enough → sufficient, adequate · cheap → inexpensive, affordable · rich → affluent, prosperous",
        example: "a substantial improvement · detrimental to health · paramount importance · numerous obstacles · sufficient evidence",
      },
    ],
    startings: [
      "I am writing to enquire about / request / express my concern regarding …",
      "The evidence clearly demonstrates that …",
      "This issue warrants immediate attention for several reasons.",
      "Numerous studies indicate that …",
      "It is widely acknowledged that …",
    ],
    connectors: [
      "state / note / observe (instead of 'say')",
      "obtain / provide / establish (instead of 'get / give / show')",
      "detrimental / beneficial (instead of 'bad / good')",
      "crucial / paramount (instead of 'very important')",
      "numerous / considerable (instead of 'many / a lot of')",
    ],
    example:
      "INFORMAL: 'The survey shows that lots of kids get sick because of dirty water, and the government doesn't really do anything about this big problem.'  →  FORMAL: 'The survey demonstrates that numerous children suffer illness attributable to contaminated water, and the government has yet to implement adequate measures to address this pressing issue.' — Notice: every informal word has been replaced by a precise professional twin, contractions removed, and vagueness ('really anything') replaced by a concrete claim ('adequate measures').",
    grammar: [
      "Never use contractions in formal writing: do not → don't is forbidden; cannot → can't is forbidden.",
      "Avoid 'get' entirely — it has a formal twin for every meaning (obtain, receive, become, arrive).",
      "Prefer ONE-word formal verbs over phrasal verbs: 'establish' not 'set up', 'postpone' not 'put off', 'reduce' not 'cut down'.",
      "Precise adjectives beat weak adverb + weak adjective: 'substantial' not 'very big', 'crucial' not 'very important'.",
    ],
    tips: [
      "In letters: 'I would be grateful if you could…' replaces 'Please can you…'.",
      "In reports: 'The figures indicate…' replaces 'The numbers say…'.",
      "Do not over-formalise: 'utilise' for every 'use' sounds pompous — use 'use', and save 'utilise' for technical contexts.",
    ],
  },
  {
    id: "powerful-verbs-bank",
    name: "Powerful Verbs & Reporting Verbs",
    category: "Pro Vocabulary & Flow",
    icon: "💪",
    concept:
      "Weak verbs ('is', 'has', 'makes', 'gets') are invisible; powerful verbs carry meaning on their own. Professional writers choose verbs that paint the exact picture: figures don't just 'go up' — they surge, climb or soar. This bank covers the three verb zones examined at NEB level: arguing a position, reporting data, and describing effects.",
    format: [
      {
        label: "⚖️ Verbs for arguments (essays, letters to the editor)",
        detail:
          "argue · contend · maintain · assert · claim · insist · stress · emphasise · underscore · highlight · affirm · uphold · defend · justify · support · substantiate · corroborate · validate · demonstrate · refute · counter · dispute · challenge · question · undermine · weaken · cast doubt on · call into question · advocate · endorse · oppose · condemn",
        example: "Critics contend that the project wastes funds; supporters counter that it will corroborate Nepal's energy independence.",
      },
      {
        label: "📈 Verbs for data & trends (reports, surveys, graphs)",
        detail:
          "rise · increase · climb · surge · soar · rocket · grow · expand · improve · recover · double · triple · peak · fall · decline · decrease · drop · dip · plummet · plunge · collapse · shrink · deteriorate · bottom out · remain stable · level off · plateau · fluctuate · vary · account for · constitute · comprise · represent · amount to · exceed",
        example: "Enrolment surged by 40% and then plateaued; female participation, by contrast, plummeted during the same period.",
      },
      {
        label: "🌡️ Verbs for effects & change (cause → result)",
        detail:
          "affect · influence · impact · shape · transform · reshape · drive · fuel · trigger · spark · generate · produce · yield · foster · promote · encourage · enable · empower · hinder · impede · obstruct · undermine · curb · mitigate · alleviate · ease · worsen · exacerbate · compound · reverse · eliminate · eradicate",
        example: "Remittances fuel household spending but can undermine local farming; well-designed policy could mitigate the damage.",
      },
      {
        label: "📊 Reporting verbs (what the source 'says' — choose the attitude)",
        detail:
          "neutral: states, notes, observes, reports, describes, outlines, finds · positive: shows, demonstrates, reveals, establishes, confirms, proves · tentative: suggests, indicates, appears to, implies, points to · critical: claims, alleges, asserts (without proof), questions, disputes · comparing: contrasts, distinguishes, challenges, contradicts, supports",
        example: "The WHO reports rising infection rates, while a dissenting study suggests the trend may reflect better reporting.",
      },
    ],
    startings: [
      "The figures reveal a …",
      "Proponents maintain that …, whereas opponents contend that …",
      "Three factors drive this trend: …",
      "Evidence suggests that …",
      "Nothing underscores this better than …",
    ],
    connectors: [
      "demonstrate / reveal / underscore (show)",
      "surge / soar / plummet (exact direction verbs)",
      "foster / hinder (help / harm)",
      "mitigate / exacerbate (soften / worsen)",
      "contend / refute (argue / disprove)",
    ],
    example:
      "The national census REVEALS a dramatic transformation: urban populations HAVE SURGED while hill villages HEMORRHAGE youth. This migration FUELS city growth but UNDERMINES agriculture, and merely building roads will not REVERSE it. Policymakers who IGNORE such data RISK exacerbating inequality; those who ACT can still MITIGATE the damage.",
    grammar: [
      "Trend verbs pair with prepositions: rise BY 20% (amount) / rise TO 50% (level) / rise FROM 30% TO 50% (range).",
      "'Comprise' vs 'compose': The committee comprises seven members (the whole comprises parts); seven members compose the committee.",
      "Transitive reporting verbs need an object: 'The study demonstrates THAT…' or 'demonstrates the link' — never 'The study demonstrates.'",
      "Tentative verbs (suggest, indicate) soften claims — use them when evidence is partial; assertive verbs (prove, establish) need strong evidence.",
    ],
    tips: [
      "In report writing, one precise trend verb per sentence beats 'went up' repeated ten times.",
      "In argumentative essays, alternate assertive verbs (maintain, assert) with evidence verbs (demonstrate, corroborate) to sound confident but fair.",
      "Never write 'very big increase' — write 'surge', 'substantial increase' or 'dramatic rise'.",
    ],
  },
  {
    id: "precise-adjectives-collocations",
    name: "Precise Adjectives, Adverbs & Collocations",
    category: "Pro Vocabulary & Flow",
    icon: "🎯",
    concept:
      "Collocations are word partnerships native writers use automatically: we 'conduct research' (not 'make research'), 'raise awareness' (not 'lift awareness'), 'pose a threat' (not 'make a threat'). Precise adjectives and adverbs add exactness without wordiness. Master these three layers and your sentences sound professional instantly.",
    format: [
      {
        label: "🎨 Exact adjectives (replace good/bad/nice/very)",
        detail:
          "change: dramatic, rapid, gradual, steady, sharp, slight, marginal, sweeping, unprecedented · problems: pressing, urgent, alarming, daunting, formidable, chronic, deep-rooted, multifaceted, intricate · benefits: beneficial, promising, encouraging, sustainable, viable, tangible, far-reaching · dangers: detrimental, adverse, severe, irreversible, catastrophic, pervasive, widespread · qualities: remarkable, invaluable, indispensable, resilient, inclusive, equitable, transparent, accountable",
        example: "a pressing challenge · sweeping reforms · tangible benefits · an irreversible loss · equitable access",
      },
      {
        label: "📐 Exact adverbs (calibrate the claim)",
        detail:
          "quantity: considerably, substantially, significantly, markedly, vastly, slightly, marginally, somewhat · speed: rapidly, steadily, dramatically, sharply, gradually, abruptly · extent: largely, predominantly, overwhelmingly, increasingly, exceptionally · caution: arguably, presumably, apparently, seemingly, relatively, comparatively · certainty: undoubtedly, unquestionably, indisputably, unequivocally",
        example: "costs rose sharply · demand fell marginally · the policy is arguably the most equitable to date",
      },
      {
        label: "🤝 Verb + noun collocations (academic power pairs)",
        detail:
          "conduct research · pose a threat · raise awareness · play a role in · meet a need · draw a conclusion · reach a consensus · shed light on · pave the way for · take measures · adopt an approach · address an issue · tackle a problem · bridge the gap · strike a balance · bear in mind · reap benefits · incur costs · face challenges · gain momentum · attract attention · fuel debate",
        example: "The campaign raised awareness and gained momentum; the government was forced to tackle the problem.",
      },
      {
        label: "🧲 Adjective + noun collocations (write like a newspaper)",
        detail:
          "a pressing issue · a viable alternative · a widespread belief · a profound impact · a stark contrast · a daunting task · a feasible solution · alarming rates · sustainable development · equal opportunities · adequate resources · legitimate concerns · overwhelming evidence · widespread support · rampant corruption · acute shortage · chronic unemployment · rapid urbanisation",
        example: "overwhelming evidence · an acute shortage of safe water · chronic youth unemployment",
      },
    ],
    startings: [
      "There is overwhelming evidence that …",
      "This raises pressing concerns about …",
      "The plan strikes a balance between … and …",
      "A viable alternative would be to …",
      "At its core, the issue is one of equity.",
    ],
    connectors: [
      "conduct research / pose a threat (verb pairs)",
      "pressing / daunting / formidable (problems)",
      "tangible / far-reaching (benefits)",
      "considerably / markedly (quantity)",
      "arguably / presumably (cautious claims)",
    ],
    example:
      "Chronic unemployment poses a pressing threat to social stability. There is overwhelming evidence that vocational training yields tangible benefits: graduates not only secure adequate incomes but also pave the way for sustainable local enterprise. Striking a balance between academic and practical education is therefore a daunting but viable reform.",
    grammar: [
      "Collocations are fixed: 'strong tea' not 'powerful tea'; 'heavy rain' not 'strong rain'; 'make a decision' not 'do a decision'.",
      "Adverb order: manner + place + time ('worked diligently at the office yesterday'); mid-position adverbs go before the main verb ('has largely disappeared').",
      "'Very' + weak adjective is a wasted pair — replace with one exact adjective: very important → crucial; very tired → exhausted.",
      "Some adjectives are absolute — avoid 'very unique' and 'more perfect'; say 'truly unique' or just 'unique'.",
    ],
    tips: [
      "Learn collocations in pairs, never as single words — vocabulary grows in chunks.",
      "In essays, one 'adjective + noun' collocation per sentence keeps prose dense but readable.",
      "For charts/reports, memorise the calibration scale: slightly < marginally < considerably < substantially < dramatically.",
    ],
  },
  {
    id: "sentence-flow-toolkit",
    name: "Sentence Flow & Rhythm Toolkit",
    category: "Pro Vocabulary & Flow",
    icon: "🌊",
    concept:
      "Flow is what readers feel when sentences connect so smoothly they never stop to re-read. Professional flow comes from three habits: varying how sentences OPEN (rhythm), connecting each sentence's END to the next sentence's START (the given–new chain), and embedding evidence inside sentences instead of bolting it on.",
    format: [
      {
        label: "🚀 Vary your sentence openers (kill the 'The… The… It…' rhythm)",
        detail:
          "participle: 'Having recognised the problem, the council…' · prepositional: 'Despite decades of progress, girls still…' · adverb: 'Remarkably, enrolment doubled.' · subordinate clause: 'While critics argue otherwise, the data…' · appositive: 'Nepal, a nation of extraordinary diversity, …' · conditional: 'Should the trend continue, …' · inverted: 'Rarely does a single policy change so much.'",
        example: "SAME MEANING, FIVE OPENERS: 'Pollution affects health.' → 'Affecting millions silently, pollution…' → 'In Kathmandu, pollution…' → 'Alarmingly, pollution…' → 'While development accelerates, pollution…'",
      },
      {
        label: "⛓️ The given–new chain (this is REAL flow)",
        detail:
          "End each sentence with the NEW information, then begin the next sentence referring back to it with 'this/these + summary noun': '…created a skills gap. This gap, in turn,…' / '…attracted foreign investors. These investors, however,…' Summary nouns: this shift, these challenges, such measures, this approach, the latter, the former.",
        example: "Tourism generated record revenue. This revenue, in turn, funded trail maintenance. Such maintenance, however, lagged behind visitor growth.",
      },
      {
        label: "📎 Embed evidence inside the sentence (don't bolt it on)",
        detail:
          "According to X, … · As X notes, … · X demonstrates that … · A study by X found that … · Data from X reveal … · For X, writing in [year], … · …, according to a recent survey. · … — a figure that dwarfs earlier estimates. Weak: 'Pollution is bad. A survey says 80% are affected.' Strong: 'A recent survey found that 80% of valley residents report pollution-related illness.'",
        example: "Evidence embedded = authority without extra sentences.",
      },
      {
        label: "🎼 Sentence music (length, punctuation, combining)",
        detail:
          "Mix LONG and SHORT: a 30-word sentence followed by a 6-word one lands like a drumbeat. · Use a semicolon to bind balanced halves: 'Urban centres thrived; rural districts emptied.' · Use a colon to reveal: 'One obstacle remained: money.' · Use dashes for drama: 'The results — all of them — defied expectations.' · Combine short choppy sentences with relative clauses: 'The boy won a scholarship. He lives in Solukhumbu.' → 'The boy, who lives in Solukhumbu, won a scholarship.'",
        example: "Long: 'Despite three decades of reforms, repeated political instability, chronic underfunding and frequent teacher strikes have left public education struggling to compete.' Short: 'Students pay the price.'",
      },
    ],
    startings: [
      "Having considered both sides, …",
      "This shift, in turn, …",
      "Remarkably, …",
      "Should the trend continue, …",
      "One obstacle remained: …",
    ],
    connectors: [
      "this shift / these challenges / such measures (chain-backs)",
      "in turn / meanwhile / by contrast (flow bridges)",
      "the former … the latter (pair links)",
      "According to X, … / As X notes, … (evidence embeds)",
      "…; … (semicolon balance) · …: … (colon reveal)",
    ],
    example:
      "Nepal's cities are swelling with newcomers. These newcomers — mostly young job-seekers — arrive with hope and little else. According to the last census, urban populations grew twice as fast as rural ones, a gap that widens every year. Villages, meanwhile, emptied of their most energetic residents. The consequence is a nation splitting in two: one youth-rich and crowded, the other ageing and quiet. Both, ultimately, pay the price.",
    grammar: [
      "Dangling modifiers: the opener phrase must describe the SUBJECT — 'Having finished the exam, the bell rang' is wrong (the bell didn't finish).",
      "Semicolons join two COMPLETE related sentences; a comma alone creates a run-on.",
      "'This' must point to something specific — follow it with a summary noun ('this decision', 'these losses') for professional clarity.",
      "Read your paragraph aloud: if two sentences share the same opener or length twice in a row, vary one.",
    ],
    tips: [
      "Paragraph checklist: varied openers ✓, chain-back words ✓, embedded evidence ✓, one short punch sentence ✓.",
      "In exams, flow is free marks: same ideas, better rhythm, higher band.",
      "Practise the given–new chain by rewriting any paragraph so every sentence starts with something from the previous sentence.",
    ],
  },
  {
    id: "tone-control-bank",
    name: "Tone Control Bank — One Idea, Eight Tones",
    category: "Pro Vocabulary & Flow",
    icon: "🎚️",
    concept:
      "Tone is your ATTITUDE made audible in word choice. The same fact — 'many students fail' — can sound neutral, urgent, hopeful or accusing depending on the words you wrap it in. Professional writers shift tone deliberately; this bank gives you the word-sets for the eight tones an exam task can demand, each built in the fast-recall a / b / c format.",
    format: [
      {
        label: "😐 Neutral / factual (reports, surveys)",
        detail:
          "indicates / shows / reveals / records / suggests · according to / as reported by / data from · approximately / roughly / an estimated · a majority of / a significant proportion of · remained unchanged / held steady / was recorded at",
        example: "The survey indicates that approximately 60% of respondents held steady in their habits.",
      },
      {
        label: "🎩 Formal / academic (essays, applications)",
        detail:
          "it is widely acknowledged that / it is generally accepted that / there is considerable evidence that / scholars maintain that · furthermore / moreover / in addition · consequently / hence / therefore · warrants attention / merits consideration / demands scrutiny",
        example: "It is widely acknowledged that the issue warrants immediate and systematic consideration.",
      },
      {
        label: "🗣️ Persuasive (speeches, opinion pieces)",
        detail:
          "surely / clearly / unquestionably / make no mistake · we must / we cannot afford to / the time has come to · ask yourself / consider this / imagine · every one of us / each and every · join me in / stand with / act now",
        example: "Make no mistake: the time has come to act, and every one of us must join in.",
      },
      {
        label: "💔 Emotional / moving (stories, appeals)",
        detail:
          "heartbreaking / devastating / shattering · behind every statistic lies / each number is a family · struggle / suffering / hardship / adversity · hope / courage / resilience / perseverance · no child should / no parent should / no one deserves",
        example: "Behind every statistic lies a family; behind every closed school, a childhood paused.",
      },
      {
        label: "🚨 Urgent / warning (campaigns, letters to authority)",
        detail:
          "time is running out / the window is closing / every day counts / the clock is ticking · at stake / in peril / on the brink / hanging by a thread · without immediate action / if we delay / unless we act now · irreversible / catastrophic / irreparable damage / beyond repair",
        example: "Every day counts: without immediate action, the damage may become irreversible.",
      },
      {
        label: "🙏 Apologetic / regretful (formal letters)",
        detail:
          "I sincerely regret / I deeply apologise for / please accept my apologies / I apologise unreservedly · I take full responsibility / the oversight was entirely mine / I acknowledge the inconvenience caused · I assure you that / rest assured / going forward, I will ensure · I would be grateful for your understanding / I hope to make amends",
        example: "I sincerely regret the oversight, take full responsibility, and assure you it will not recur.",
      },
      {
        label: "🌤️ Optimistic / hopeful (conclusions)",
        detail:
          "there is every reason to believe / the outlook is encouraging / signs of progress abound · steadily improving / gaining momentum / turning the corner / on the mend · with sustained effort / given time and will / step by step · a brighter future / the first steps of a long journey / the seeds of change / dawn of a new era",
        example: "With sustained effort, the seeds of change already planted are steadily gaining momentum.",
      },
      {
        label: "⚖️ Cautionary / balanced (evaluations)",
        detail:
          "while X brings benefits, … / although X has merit, … / granted, … however · on balance / all things considered / weighing both sides / on reflection · a double-edged sword / not without drawbacks / a mixed blessing / a qualified success · proceed with care / adopt with safeguards / temper enthusiasm with realism",
        example: "On balance, the scheme is a mixed blessing: promising, yet not without drawbacks that demand safeguards.",
      },
    ],
    startings: [
      "It is widely acknowledged that …",
      "Make no mistake: …",
      "Behind every statistic lies …",
      "I sincerely regret …",
      "On balance, …",
    ],
    connectors: [
      "indicates / suggests / reveals (neutral set)",
      "we must / the time has come to (persuasive set)",
      "heartbreaking / devastating / resilient (emotional set)",
      "unless we act now / the window is closing (urgent set)",
      "on balance / a mixed blessing (balanced set)",
    ],
    example:
      "ONE FACT, FOUR TONES — 'Many students fail maths.' · Neutral: Data indicate that a significant proportion of students underperform in mathematics. · Persuasive: Make no mistake — every failed exam is a future we forfeit; the time has come to rethink how we teach maths. · Emotional: Behind every failed exam lies a discouraged child, and no child deserves to feel discarded. · Formal: It is widely acknowledged that current methods merit systematic reconsideration.",
    grammar: [
      "Tone lives in VERBS and ADJECTIVES more than nouns: 'slammed' vs 'closed' vs 'shut' — same door, three tones.",
      "Modal verbs calibrate tone: 'may' (tentative) / 'can' (confident) / 'must' (urgent) / 'shall' (formal resolve).",
      "Exclamation marks almost never belong in formal writing — urgency comes from word choice, not punctuation.",
    ],
    tips: [
      "Before writing, pick your tone and its 5 signature words; keep them visible as you draft.",
      "Never mix urgent and optimistic in the same paragraph — tone consistency is a marker of control.",
      "For letters, match tone to recipient: principal = formal/urgent; friend = warm/casual.",
    ],
  },
  {
    id: "style-transformer",
    name: "Style Transformer — 5 Registers, Same Subject",
    category: "Pro Vocabulary & Flow",
    icon: "🎨",
    concept:
      "Style is HOW you write; tone is how you FEEL. The five styles below each have their own sentence rhythm, vocabulary fields and structure habits. Exam tasks quietly name the style they want: a report = journalistic, a story = narrative, an essay = analytical. Recognise the register, borrow its word-set, and half your marks are secured before the first full stop.",
    format: [
      {
        label: "📖 Narrative style (stories, 'A memorable day…')",
        detail:
          "hallmarks: past-tense action verbs / sensory detail / dialogue / time markers · verbs: dashed / wandered / trembled / whispered / glimpsed / stumbled / darted · time glue: meanwhile / shortly afterwards / by the time / before long / in the end / just as · feeling words: exhilarated / crestfallen / speechless / overwhelmed · structure: opening scene → rising action → climax → resolution",
        example: "Just as the bus lurched forward, I glimpsed her waving figure vanishing in the dust — and my heart sank.",
      },
      {
        label: "🖼️ Descriptive style (people, places, festivals)",
        detail:
          "hallmarks: five senses / spatial order / imagery + figurative language / present tense often · sight: glittering / weathered / towering / sprawling · sound: buzzing / chiming / roaring / hushed · smell-taste: fragrant / smoky / tangy / bitter-sweet · touch: damp / velvety / scorching / gritty · devices: simile / metaphor / personification / alliteration",
        example: "The bazaar roared beneath strings of saffron marigolds; incense drifted sweet and smoky over the damp, cobbled lane.",
      },
      {
        label: "🔬 Analytical style (essays, 'causes and effects…')",
        detail:
          "hallmarks: thesis-driven / PEEL paragraphs / hedged claims / abstract nouns · framing: the primary cause / a contributing factor / the underlying reason / a direct consequence · hedging: tends to / is likely to / may partly explain / arguably · linking: therefore / consequently / this stems from / which in turn · verbs: analyse / examine / attribute / derive / correlate / undermine / reinforce",
        example: "The primary cause appears to be underfunding, which in turn reinforces teacher attrition.",
      },
      {
        label: "📰 Journalistic style (reports, news, articles)",
        detail:
          "hallmarks: inverted pyramid (most important first) / short factual sentences / passive for objectivity / no emotion · openers: A recent survey has found… / Authorities confirmed on Tuesday that… · data verbs: reported / recorded / documented / estimated / attributed · structure: headline → lead (who/what/when/where) → details → background → comment · quotes: according to X, … / X stated that …",
        example: "Flash floods displaced an estimated 400 families in Sindhupalchok on Tuesday, authorities confirmed, with rescue operations ongoing.",
      },
      {
        label: "📣 Persuasive / speech style (speeches, adverts, campaigns)",
        detail:
          "hallmarks: direct address / rhetorical questions / rule of three / repetition / calls to action · address: look around you / my friends / fellow students / ladies and gentlemen · devices: anaphora ('We will fight… We will build…') / tricolon / rhetorical question / anecdote · force: must / will / cannot stand by / now is the moment · close: pledge / promise / challenge the audience",
        example: "We can complain, or we can act; we can watch, or we can build; we can wait for change — or become it.",
      },
    ],
    startings: [
      "The bus hissed to a halt, and my new life began. (narrative)",
      "High above the valley, the peak burned gold in the last light. (descriptive)",
      "Three interlocking factors explain this decline. (analytical)",
      "A record 1.2 million students sat the examination this year. (journalistic)",
      "My friends, the future is not something we enter — it is something we build. (speech)",
    ],
    connectors: [
      "meanwhile / shortly afterwards / before long (narrative time)",
      "towering / fragrant / hushed / gritty (descriptive senses)",
      "the primary cause / which in turn / is likely to (analytical)",
      "authorities confirmed / according to X (journalistic sourcing)",
      "my friends / ask yourself / act now (speech address)",
    ],
    example:
      "ONE EVENT, THREE STYLES — Flood hits village. · Narrative: 'By the time Sita reached the door, the river had already taken the courtyard; she grabbed her brother's hand and ran.' · Journalistic: 'Flash floods struck Sindhupalchok on Tuesday, displacing an estimated 400 families, authorities confirmed.' · Speech: 'Last Tuesday, the river stole 400 homes while we watched on our screens. My friends, when will we build the embankments our neighbours deserve?'",
    grammar: [
      "Tense anchors style: narrative = past simple + past continuous interruptions; descriptive = present; journalistic = present perfect + past; speech = present + will.",
      "Passive voice serves journalistic objectivity ('400 families were displaced'); active voice serves narrative energy ('The river took the courtyard').",
      "Figurative language (simile / metaphor / personification) belongs to descriptive and speech styles — keep it out of reports.",
    ],
    tips: [
      "Read the question's task words: 'describe' = descriptive style; 'report' = journalistic; 'argue' = analytical/persuasive.",
      "Blend at most two styles per piece — narrative + descriptive for stories, analytical + persuasive for essays.",
      "Examiners spot style-mismatch instantly: no dialogue in reports, no 'I' in analytical essays (unless narrative).",
    ],
  },
  {
    id: "synonym-power-sets",
    name: "Synonym Power Sets — 45 Concepts × 6+ Words",
    category: "Pro Vocabulary & Flow",
    icon: "🧱",
    concept:
      "Repetition kills essays: 'important… important… very important'. Each set below is one CONCEPT and every word you can swap in for it, in '/' format for fast revision. Cycle through a set across a paragraph and your prose never repeats itself. This is the fastest vocabulary upgrade in the entire section.",
    format: [
      {
        label: "⚡ Set 1 — Size, importance, quality",
        detail:
          "important: crucial / vital / essential / pivotal / paramount / indispensable / critical · big: substantial / considerable / vast / immense / sizable / monumental · small: minimal / marginal / modest / negligible / minute · good: beneficial / advantageous / favourable / constructive / rewarding · bad: detrimental / adverse / harmful / damaging / counterproductive · easy: straightforward / effortless / manageable · hard: demanding / challenging / arduous / formidable / taxing",
        example: "a pivotal moment · considerable growth · negligible risk · a formidable challenge",
      },
      {
        label: "⚡ Set 2 — Speaking, thinking, knowing",
        detail:
          "say: state / remark / note / observe / declare / assert / convey · think: believe / consider / maintain / contend / reckon / suppose · know: recognise / comprehend / grasp / be aware of / fathom · show: demonstrate / reveal / indicate / illustrate / disclose / manifest · explain: clarify / elucidate / account for / spell out · ask: enquire / request / query / solicit · answer: respond / reply / retort",
        example: "The minister noted that… · Researchers maintain that… · She elucidated the mechanism.",
      },
      {
        label: "⚡ Set 3 — Change, movement, trends",
        detail:
          "increase: rise / grow / climb / surge / soar / escalate / expand · decrease: fall / decline / drop / dip / plummet / plunge / shrink / dwindle · change: alter / transform / reshape / modify / revolutionise / overhaul · stay: remain / persist / endure / hold steady / linger · return: rebound / recover / bounce back / rally · start: emerge / arise / commence / originate · end: conclude / cease / terminate / draw to a close",
        example: "Prices soared, demand dwindled, and the boom finally drew to a close.",
      },
      {
        label: "⚡ Set 4 — Help, harm, effort",
        detail:
          "help: assist / aid / support / facilitate / bolster / shore up · harm: undermine / hinder / impede / sabotage / thwart / jeopardise · try: strive / endeavour / attempt / venture / pursue · succeed: accomplish / attain / achieve / secure / pull off · fail: falter / collapse / fall short / backfire · need: require / demand / call for / necessitate / entail · use: employ / utilise / harness / deploy / draw on",
        example: "The grant facilitated research that might otherwise have faltered; success required relentless endeavour.",
      },
      {
        label: "⚡ Set 5 — Feelings & people",
        detail:
          "happy: delighted / thrilled / elated / content / overjoyed / cheerful · sad: dejected / crestfallen / disheartened / gloomy / melancholy · angry: infuriated / indignant / furious / resentful · afraid: apprehensive / fearful / anxious / terrified / uneasy · tired: exhausted / drained / fatigued / worn out · clever: ingenious / astute / resourceful / shrewd / quick-witted · brave: courageous / valiant / daring / intrepid · determined: resolute / tenacious / steadfast / unwavering",
        example: "crestfallen yet resolute · an astute and resourceful negotiator",
      },
      {
        label: "⚡ Set 6 — Amount, time, certainty",
        detail:
          "many: numerous / countless / a host of / a multitude of / myriad · few: scant / scarce / a handful of / sparse · fast: rapid / swift / brisk / hasty / speedy · slow: gradual / sluggish / leisurely / unhurried · often: frequently / repeatedly / routinely / time and again · always: invariably / consistently / without exception · certain: undeniable / indisputable / unequivocal / beyond doubt · possible: feasible / conceivable / plausible / attainable",
        example: "numerous attempts · scant evidence · invariably consistent · a plausible alternative",
      },
    ],
    startings: [
      "A pivotal shift is underway: …",
      "Numerous obstacles once seemed insurmountable.",
      "The evidence is indisputable.",
      "Enrolment soared whilst funding dwindled.",
      "An astute policy could accomplish what enforcement alone could not.",
    ],
    connectors: [
      "crucial / pivotal / paramount (importance)",
      "surge / soar / escalate (increase) · plummet / dwindle (decrease)",
      "facilitate / bolster (help) · thwart / jeopardise (harm)",
      "elated / crestfallen / apprehensive (feelings)",
      "invariably / consistently / beyond doubt (certainty)",
    ],
    example:
      "DRAFT 1: 'The big problem is that many students get tired and fail, and the government does not give enough help.' → UPGRADED: 'The formidable challenge is that numerous students grow fatigued and falter, and the government provides scant support.' — Notice: six swaps (formidable / numerous / grow / falter / scant / provides), zero repetition, identical meaning.",
    grammar: [
      "Register check: some synonyms are formal only — 'kids' → children/pupils; 'a lot of' → numerous/considerable.",
      "Collocation beats beauty: 'swift decision' works, 'swift rain' does not — verify each swap inside a phrase, not alone.",
      "Connotation: 'slim / slender / skinny' all mean thin but feel different — choose the feeling, not just the meaning.",
      "Goldilocks rule: one synonym swap per idea is elegant; five in a sentence is a thesaurus explosion.",
    ],
    tips: [
      "Revise 5 sets a day by covering the words and recalling them from the concept.",
      "In exams, reuse the EXACT prompt words once, then vary with synonyms — it shows range without confusion.",
      "Build your personal top-20 list: the swaps you can produce under pressure are the only ones that count.",
    ],
  },
  {
    id: "sentence-structure-library",
    name: "Sentence Structure Library — 12 Structures to Steal",
    category: "Pro Vocabulary & Flow",
    icon: "🏛️",
    concept:
      "Top-band writing is built from a repertoire of sentence SHAPES, not just words. Each structure below is a fill-in frame: learn the frame, pour any topic into it, and instantly produce a sentence that sounds professional. Twelve structures cover every exam need — emphasis, balance, conditions, concessions and drama.",
    format: [
      {
        label: "🏛️ Frames 1–4: emphasis & inversion",
        detail:
          "1. Not only + auxiliary + subject + verb, but … also … → 'Not only does exercise build bodies, but it also disciplines minds.' · 2. It is X that Y (cleft) → 'It is discipline, not talent, that separates toppers from dreamers.' · 3. Negative adverb + inversion → 'Rarely does a single reform change so much.' / 'Never have fees risen so fast.' · 4. What X is/does is Y (wh-cleft) → 'What Nepal needs is not charity but investment.'",
        example: "Rarely has one decision shaped so many futures.",
      },
      {
        label: "🏛️ Frames 5–8: conditions & concession",
        detail:
          "5. Had it not been for X, … would have … → 'Had it not been for community forests, the hills would have turned barren.' · 6. Should + subject + verb, … (formal if) → 'Should the trend continue, rural schools will empty.' · 7. Despite / In spite of + noun, … → 'Despite limited resources, the clinic serves thousands.' · 8. Admittedly …, however /Granted …, yet … → 'Admittedly the scheme is costly; however, the alternatives cost more.'",
        example: "Should the rains fail again, the harvest will fail with them.",
      },
      {
        label: "🏛️ Frames 9–12: balance, result & drama",
        detail:
          "9. The + comparative …, the + comparative … → 'The more we delay, the heavier the bill becomes.' · 10. So / Such … that … → 'The shortage is so acute that classes run in shifts.' / 'It was such a triumph that the whole valley celebrated.' · 11. …, which is why / …, by which I mean … → 'Fees doubled, which is why dropouts followed.' · 12. X is not Y; it is Z (definition flip) → 'Education is not a cost; it is the highest-yield investment a nation can make.'",
        example: "The more we delay, the heavier the bill becomes.",
      },
    ],
    startings: [
      "Not only does X …, but it also …",
      "It is X, not Y, that …",
      "Rarely / Never has …",
      "Had it not been for …, …",
      "X is not Y; it is Z.",
    ],
    connectors: [
      "not only … but also (addition with drama)",
      "it is … that … (emphasis cleft)",
      "had it not been for / should (formal conditions)",
      "the more … the more … (proportion)",
      "is not X; it is Y (definition flip)",
    ],
    example:
      "One topic, four frames — 'Tourism helps Nepal.' · Cleft: 'It is tourism, more than any other sector, that carries foreign currency into remote valleys.' · Inversion: 'Rarely does an industry touch so many lives at once.' · Conditional: 'Should visitor numbers double again, waste management must double with them.' · Definition flip: 'Tourism is not merely an income stream; it is a mirror in which the nation sees itself.'",
    grammar: [
      "'Not only' at sentence start forces auxiliary inversion: 'Not only DOES he teach…' — a favourite examiner checkpoint.",
      "'Had it not been for' = inverted third conditional; the main clause uses would have + participle.",
      "'Should you require…' replaces 'If you require…' in formal letters — same meaning, elevated register.",
      "Cleft sentences ('It is X that…') spotlight the exact element you want emphasised — use one per essay, not per sentence.",
    ],
    tips: [
      "Memorise 4 frames deeply rather than 12 shallowly — usable beats known.",
      "Deploy at least one inversion and one cleft per essay; they mark 'top band' instantly.",
      "The definition flip ('X is not Y; it is Z') is the perfect thesis or concluding sentence — short, punchy, memorable.",
    ],
  },
];