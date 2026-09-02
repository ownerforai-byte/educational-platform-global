import type { WritingType } from "./types";

/**
 * IDEA BANKS & FLOW PLANS — never stare at a blank page again.
 * Each entry stores ready-made ideas (for/against, causes/effects/solutions),
 * the exact vocabulary that expresses them, and a paragraph-by-paragraph flow
 * plan for the most common NEB topic families.
 */
export const IDEA_TYPES: WritingType[] = [
  {
    id: "seven-lens-idea-generator",
    name: "The 7-Lens Idea Generator (ideas for ANY topic)",
    category: "Idea Banks & Flow Plans",
    icon: "🔦",
    marks: "Works for every essay, article, speech and letter topic",
    concept:
      "You never run out of ideas if you interrogate a topic from SEVEN fixed angles, or 'lenses'. Take any exam topic — mobile phones, tourism, exams, social media — and ask how it affects each lens. Each lens almost always yields one full PEEL paragraph. This is how professional columnists produce ideas on demand.",
    format: [
      {
        label: "1️⃣ Economy & Work",
        detail:
          "Ask: does it create or destroy jobs, income, trade, productivity? Words: employment, income, productivity, entrepreneurship, investment, revenue, cost-effective, livelihood, skilled workforce, foreign exchange, market.",
        example: "Topic 'mobile phones' → apps create thousands of digital jobs; but screen distraction cuts workplace productivity.",
      },
      {
        label: "2️⃣ Health & Well-being",
        detail:
          "Ask: does it help or harm body and mind? Words: physical health, mental well-being, sedentary lifestyle, addiction, stress, hygiene, nutrition, life expectancy, quality of life, balanced diet, screen time, anxiety.",
        example: "Topic 'social media' → connection supports mental health; endless scrolling fuels anxiety and sleep loss.",
      },
      {
        label: "3️⃣ Environment",
        detail:
          "Ask: what does it do to air, water, land, forests, wildlife, climate? Words: pollution, emissions, carbon footprint, deforestation, conservation, biodiversity, waste management, sustainability, renewable energy, climate change, ecosystem.",
        example: "Topic 'tourism' → trekking routes erode and litter accumulates; but park fees fund conservation.",
      },
      {
        label: "4️⃣ Education & Knowledge",
        detail:
          "Ask: does it teach, inform, skill or mislead? Words: literacy, curriculum, pedagogy, critical thinking, vocational training, lifelong learning, digital divide, e-learning, awareness, misinformation, research.",
        example: "Topic 'television' → documentaries educate; but passive watching replaces reading and homework.",
      },
      {
        label: "5️⃣ Society & Culture",
        detail:
          "Ask: how does it change families, communities, traditions, equality? Words: social cohesion, community, tradition, heritage, equality, discrimination, urbanisation, family bonds, cultural identity, values, inclusion.",
        example: "Topic 'foreign films' → exposure to world cultures; but local languages and stories lose screen time.",
      },
      {
        label: "6️⃣ Technology & Progress",
        detail:
          "Ask: does it modernise life, and who is left behind? Words: innovation, automation, artificial intelligence, digital literacy, infrastructure, connectivity, efficiency, obsolescence, cybercrime, privacy, digital divide.",
        example: "Topic 'online shopping' → convenience and reach; but small local shops and elderly customers fall behind.",
      },
      {
        label: "7️⃣ Morality & Character",
        detail:
          "Ask: what does it do to honesty, discipline, responsibility, values? Words: integrity, discipline, responsibility, ethics, accountability, honesty, self-control, empathy, respect, corruption, greed, compassion.",
        example: "Topic 'exams' → exams teach discipline and fairness; but grade obsession can breed cheating and rote learning.",
      },
    ],
    startings: [
      "Viewed through an economic lens, …",
      "The environmental consequences alone justify concern.",
      "Beyond economics, the moral dimension matters more.",
      "From an educational standpoint, …",
      "Society, in the end, absorbs every cost.",
    ],
    connectors: [
      "economically speaking / in economic terms",
      "from a health perspective",
      "environmentally / ecologically",
      "educationally / in terms of knowledge",
      "morally / ethically speaking",
    ],
    example:
      "Topic: 'Should mobile phones be allowed in schools?' — 60-second idea sweep: Economy → phones are costly status symbols that pressure parents. Health → screens strain eyes and sleep. Environment → e-waste. Education → calculators and dictionaries help; games distract. Society → cyberbullying spreads through phones. Technology → phones are unavoidable future skills. Morality → discipline and honest use matter more than bans. You now have SEVEN paragraphs; choose the best three.",
    grammar: [
      "Each lens becomes one PEEL paragraph: Point (lens claim) → Evidence → Explanation → Link back to thesis.",
      "Balance rule: for argumentative topics, pick lenses that SUPPORT your stance, then concede the strongest opposing lens once.",
      "Lens phrases ('From an environmental standpoint, …') double as sophisticated paragraph openers examiners notice.",
    ],
    tips: [
      "Practise the 7-lens sweep on one old NEB topic every day — 60 seconds each.",
      "Choose your THREE strongest lenses for a standard essay; depth beats breadth.",
      "If two lenses overlap (economy + technology), merge them and expand the remaining one.",
    ],
  },
  {
    id: "idea-bank-education-technology",
    name: "Idea Bank — Education, Technology & AI",
    category: "Idea Banks & Flow Plans",
    icon: "🎓",
    concept:
      "The single most common NEB topic family: online learning, mobile phones in schools, AI and homework, exams, books vs screens. Keep these ideas, words and flow plans ready and you can assemble a top-band essay in minutes.",
    format: [
      {
        label: "✅ Points FOR technology in education",
        detail:
          "equal access for rural students (distance learning) · personalised, self-paced learning · unlimited resources beyond one textbook · interactive content beats rote memorisation · global classrooms and exposure · digital skills are future job requirements · recorded lessons let students revise · instant feedback through quizzes and apps · inclusive tools for disabled learners (text-to-speech, captions) · cheaper than physical infrastructure long-term.",
        example: "During the pandemic, virtual classrooms kept Nepali education alive when buildings could not.",
      },
      {
        label: "❌ Points AGAINST (counter-arguments)",
        detail:
          "digital divide: poor and rural students left behind · screens distract (games, notifications) · cheating and AI-written homework become easy · eye strain, sleep loss, sedentary habits · teachers untrained for e-learning · electricity and internet unreliable in villages · no lab/practical learning online · plagiarism culture kills original thought · data privacy of children.",
        example: "A laptop cannot replace a chemistry lab; a chatbot cannot teach perseverance.",
      },
      {
        label: "🧲 Topic vocabulary",
        detail:
          "digital divide · e-learning · blended learning · virtual classroom · curriculum · pedagogy · rote learning · critical thinking · vocational training · lifelong learning · literacy and numeracy · adaptive learning · screen time · plagiarism · artificial intelligence · personalised learning · distance education · digital literacy · dropout rate · scholarship",
        example: "Bridging the digital divide is the precondition for every other reform.",
      },
      {
        label: "🗺️ Flow plan (argumentative essay)",
        detail:
          "P1 Hook: striking stat or scene → narrow to thesis. P2 Strongest FOR point + example. P3 Second FOR point (different lens: economy or equality). P4 Concession: strongest AGAINST point — admit it fairly. P5 Rebuttal + solution (teacher training, hybrid model, shared devices). P6 Conclusion: restate thesis + forward look. LETTER/ARTICLE variant: same skeleton, add salutation/headline and a direct call to action.",
        example: "Thesis model: 'Technology should serve as the classroom's assistant — powerful, present, but never in charge.'",
      },
    ],
    startings: [
      "When the pandemic emptied classrooms, one truth emerged: …",
      "Imagine a village student and a Kathmandu student attending the same lecture. Technology makes this possible — but only sometimes.",
      "Artificial intelligence can write an essay in seconds. The question is what a student learns by watching it.",
      "Education is the one investment whose return never stops compounding.",
      "The blackboard has been joined by the touchscreen; whether schools benefit depends on us.",
    ],
    connectors: [
      "accessibility / equity / inclusion (for-points themes)",
      "digital divide / screen dependency (against-points themes)",
      "blended / hybrid learning (solution theme)",
      "furthermore, a 2020-style disruption proved… (evidence frames)",
      "on balance / weighed against (thesis phrases)",
    ],
    example:
      "Technology should serve as the classroom's assistant — powerful, present, but never in charge. Undoubtedly, digital tools expand access: a recorded lecture reaches a student in Humla as easily as one in Kathmandu. Furthermore, adaptive apps let struggling learners repeat a concept without embarrassment. Admittedly, screens invite distraction and deepen the digital divide, for a tool that costs money excludes the poor. However, these are problems of management, not of the tool itself. Should Nepal train teachers, provide shared devices and blend online lessons with real laboratories, technology would amplify education instead of replacing it. In the end, no app teaches curiosity; it can only carry it further.",
    grammar: [
      "Modality for balanced claims: 'can widen access' (ability) vs 'may deepen inequality' (possibility) vs 'must be managed' (obligation).",
      "Relative clauses compress arguments: 'Students who lack internet access lose a year of learning' — one sentence, cause + group + effect.",
      "Conditional structures carry your solutions: 'Should the government subsidise devices, …' / 'Provided that teachers are trained, …'.",
    ],
    tips: [
      "Memorise 3 FOR + 2 AGAINST + 1 solution = a complete argumentative essay skeleton.",
      "Use one Nepal-specific example (pandemic virtual classes, digital wallets, radio schooling) — specific beats generic.",
      "AI topics are trending: prepare the line 'AI can answer questions, but only education teaches which questions matter.'",
    ],
  },
  {
    id: "idea-bank-environment-climate",
    name: "Idea Bank — Environment, Pollution & Climate",
    category: "Idea Banks & Flow Plans",
    icon: "🌍",
    concept:
      "Pollution, climate change, deforestation, waste — the second most common NEB family, and the easiest to localise with Nepal-specific examples (Kathmandu's air, Himalayan glaciers, plastic in the Bagmati). Structure ideas as causes → effects → solutions and you can answer any variant.",
    format: [
      {
        label: "🏭 Causes (why it happens)",
        detail:
          "vehicle emissions and ageing fleets · brick kilns and unregulated industry · open burning of waste · deforestation for firewood and farmland · construction dust · plastic overuse and poor waste management · rapid, unplanned urbanisation · weak enforcement of existing laws · dependence on fossil fuels · population pressure.",
        example: "Kathmandu's winter air is a cocktail of traffic dust, brick-kiln smoke and crop burning.",
      },
      {
        label: "💔 Effects (what it destroys)",
        detail:
          "respiratory disease (asthma, bronchitis) · reduced life expectancy · glacier melt and glacial-lake floods · erratic monsoons and droughts · loss of biodiversity and wildlife corridors · soil degradation and falling farm yields · tourism decline (mountains hidden in smog) · contaminated rivers and groundwater · climate refugees · rising healthcare costs.",
        example: "Himalayan glaciers feeding ten great rivers are retreating — the water tower of Asia is leaking.",
      },
      {
        label: "🛠️ Solutions (what must be done)",
        detail:
          "electric public transport and vehicle inspections · strict emission standards for kilns and factories · ban single-use plastics, promote reusables · large-scale reforestation and community forests · waste segregation, recycling and composting · renewable energy (Nepal's hydropower, solar) · environmental education from school age · stricter fines AND honest enforcement · regional cooperation on air quality · individual action: cycle, save power, plant trees.",
        example: "Community forestry turned bare hills green — proof that local action scales.",
      },
    ],
    startings: [
      "There was a time when the Himalayas were visible from Kathmandu every morning.",
      "Every winter, the valley wakes beneath a grey blanket of its own making.",
      "The rivers that once defined this city now carry its plastic.",
      "We are the first generation to feel climate change — and the last that can stop it.",
      "Development that destroys its own foundations is not progress; it is debt.",
    ],
    connectors: [
      "emissions / smog / PM2.5 (air-pollution set)",
      "glacier retreat / erratic monsoon (climate set)",
      "biodegradable / single-use plastic (waste set)",
      "consequently / as a direct result (cause→effect)",
      "if urgent measures are taken, … (solution frame)",
    ],
    example:
      "Environmental protection is not the price of development — it is the guarantee of it. True, industries power growth, but unfiltered smoke and untreated effluent quietly tax every citizen's lungs and fields. Consequently, hospitals report seasonal surges in respiratory illness while farmers watch erratic rains ruin planting calendars. However, Nepal need not choose between prosperity and pure air. Should the nation expand electric transport, enforce emission standards and channel its vast hydropower into clean industry, growth and greenery would reinforce each other. In the final analysis, the mountains that define us will judge us not by our GDP, but by the clarity of the air through which they are seen.",
    grammar: [
      "Passive voice suits environmental problems (agent unknown/general): 'Forests are being cleared', 'Laws are rarely enforced'.",
      "Cause structures: 'due to + noun', 'because + clause', 'owing to the fact that + clause' — vary all three.",
      "Quantifiers with uncountables: 'much pollution', 'little enforcement', 'a great deal of waste' — never 'many pollution'.",
    ],
    tips: [
      "Localise one paragraph: Kathmandu air, Bagmati cleanup, community forests, hydropower — examiners reward local knowledge.",
      "Learn 5 cause + 5 effect + 5 solution ideas = every environmental topic is covered.",
      "End environmental essays with individual responsibility — 'it starts with me' impresses examiners.",
    ],
  },
  {
    id: "idea-bank-social-media",
    name: "Idea Bank — Social Media & Modern Life",
    category: "Idea Banks & Flow Plans",
    icon: "📱",
    concept:
      "Social media, smartphones, online gaming and screen life dominate modern exam topics. The winning approach is BALANCE: celebrate connection and opportunity, then expose the hidden costs (attention, privacy, mental health), and finish with disciplined use rather than rejection.",
    format: [
      {
        label: "✅ Benefits (the case for)",
        detail:
          "instant connection across distance — families, diaspora, friendships · free access to news, tutorials and skills · small business marketing at zero cost (home bakeries, trekking guides) · awareness campaigns (blood donation, disaster relief) · a public voice for ordinary citizens · creativity: video, photography and writing reach real audiences · educational communities and peer learning · job hunting and professional networking · rapid fundraising in emergencies.",
        example: "During floods, Facebook groups located missing people faster than official helplines.",
      },
      {
        label: "❌ Costs (the case against)",
        detail:
          "addiction by design — endless feeds engineered to trap attention · cyberbullying and harassment · misinformation spreads faster than facts · privacy loss and data harvesting · comparison culture harming teenagers' self-esteem · echo chambers that polarise opinion · sleep displacement from late-night scrolling · reduced face-to-face social skill · scams targeting the inexperienced · distraction from study and work.",
        example: "The algorithm does not care what is true; it cares what is engaging.",
      },
      {
        label: "🧲 Topic vocabulary",
        detail:
          "algorithm · echo chamber · misinformation · fake news · cyberbullying · digital footprint · privacy breach · influencer · digital detox · screen time · FOMO (fear of missing out) · doomscrolling · engagement · viral · troll · anonymity · cyber security · phishing · digital literacy · online identity · content moderation",
        example: "A digital detox restored my attention span; the news survived without me.",
      },
      {
        label: "🗺️ Flow plan (balanced essay / speech)",
        detail:
          "P1 Hook: a shared scene (family at dinner, all on phones) → thesis: power depends on discipline. P2 Connection & opportunity (best FOR). P3 Economic & educational gains (second FOR, new lens). P4 The hidden costs: attention, mental health, misinformation. P5 The skill divide: digital literacy decides winners. P6 Conclusion: not rejection but discipline — specific habits. SPEECH variant: add direct address ('Look around you'), rhetorical questions, and a pledge-style close.",
        example: "Thesis model: 'Social media is fire — a servant when controlled, a master when not.'",
      },
    ],
    startings: [
      "Look around any restaurant today and count the silent couples staring at screens.",
      "Sixty years ago, a letter took a week; now a message crosses the world in a blink.",
      "The average teenager checks a phone more times than they eat meals.",
      "Social media promised connection — yet loneliness keeps rising.",
      "Every 'like' is a tiny contract: your attention for their profit.",
    ],
    connectors: [
      "connectivity / outreach / awareness (for-set)",
      "addiction / misinformation / privacy breach (against-set)",
      "digital literacy / discipline (solution set)",
      "ironically / paradoxically (turn words)",
      "used wisely, … ; left unchecked, … (balanced frame)",
    ],
    example:
      "Social media is fire — a servant when controlled, a master when not. Used wisely, it connects a student in Jumla to free tutorials and a grandmother in Australia to her grandson's first steps. Paradoxically, the same platforms are engineered to be un-put-down-able, feeding comparison, rumour and rage because engagement, not truth, is their business model. Left unchecked, the feed becomes the day. Should schools teach digital literacy with the same seriousness as mathematics, users would scroll with judgement rather than compulsion. In conclusion, the question is not whether to live online, but who holds the leash: us, or the algorithm.",
    grammar: [
      "Sustained metaphor elevates essays and speeches — set it up in the thesis ('is fire'), return to it in the conclusion ('the ashes').",
      "Contrast frames: 'Used wisely, … / Left unchecked, …' (past-participle openers) pack balance into two clauses.",
      "Present simple for habits and general truths ('the feed rewards outrage'); present continuous for trends ('loneliness is rising').",
    ],
    tips: [
      "Balance wins marks: never write a one-sided social-media essay — concede one real cost or benefit.",
      "Keep evidence plausible: 'a recent survey' or 'most teenagers I know' — never invent precise fake statistics.",
      "Prepare one cyberbullying anecdote and one awareness-campaign example — they fit essays, speeches and letters alike.",
    ],
  },
  {
    id: "idea-bank-tourism-nepal",
    name: "Idea Bank — Tourism, Culture & Development in Nepal",
    category: "Idea Banks & Flow Plans",
    icon: "🏔️",
    concept:
      "Tourism in Nepal is the exam topic where local knowledge earns top marks. It covers economics, culture, environment and infrastructure in one topic — perfect for the 7-lens method. Prepare both praise and criticism so you can argue either side of 'Tourism: blessing or burden?'",
    format: [
      {
        label: "✅ Benefits (blessing side)",
        detail:
          "foreign exchange and national income · employment: guides, porters, hotels, airlines, handicrafts · preserves culture: festivals, dances, crafts stay alive because visitors value them · funds conservation (park entry fees) · builds infrastructure: roads, airports, hospitals in remote areas · revives dying villages through homestays · international friendship and image · skills training in hospitality · market for local farming and products.",
        example: "Annapurna trekking lodges employ whole villages that once depended only on subsistence farming.",
      },
      {
        label: "❌ Costs (burden side)",
        detail:
          "environmental damage: trail erosion, litter on Everest, plastic waste · cultural commodification: sacred rituals become paid shows · over-dependence: wars, pandemics or disasters collapse the whole economy · price inflation for locals (hotel-driven food and rent costs) · seasonality: jobs vanish in off-season · unequal profits: big operators and foreign agencies take the largest share · strain on water and power in tourist hubs · sex trade and exploitation risks · heritage sites worn by foot traffic.",
        example: "Everest base camp is called the world's highest garbage dump for a reason.",
      },
      {
        label: "🧲 Topic vocabulary",
        detail:
          "foreign exchange · heritage · UNESCO World Heritage Site · pilgrimage · trekking · mountaineering · ecotourism · homestay · hospitality · livelihood · infrastructure · seasonal employment · cultural identity · commodification · sustainable tourism · carrying capacity · off the beaten track · bucket list · revenue · occupation",
        example: "Ecotourism promises to leave only footprints and take only photographs.",
      },
      {
        label: "🗺️ Flow plan (argumentative / descriptive)",
        detail:
          "P1 Hook: one vivid Nepal image (sunrise on Annapurna, bells at Pashupatinath) → thesis. P2 Economic benefits with example. P3 Cultural & environmental co-benefits. P4 The costs: admit environment/culture damage honestly. P5 Solution path: ecotourism, homestays, limits, better waste systems. P6 Conclusion: balanced verdict + pride + responsibility. DESCRIPTIVE variant: keep P1-P3, replace argument with senses (sight, sound, smell, taste) and feeling.",
        example: "Thesis model: 'Tourism is Nepal's best customer — and customers, like guests, must be cared for, not merely counted.'",
      },
    ],
    startings: [
      "When the sun strikes Annapurna at dawn, even silence seems to applaud.",
      "Nepal is poor in money but rich in everything money cannot buy.",
      "From Everest's summit to Lumbini's gardens, no country packs so much wonder into so little space.",
      "Tourism is often called a smokeless industry — but even smokeless industries leave footprints.",
      "Once-in-a-lifetime for a visitor; every day, and survival, for a porter.",
    ],
    connectors: [
      "foreign exchange / hospitality / heritage (benefit set)",
      "erosion / litter / commodification (cost set)",
      "ecotourism / homestay / carrying capacity (solution set)",
      "a double-edged sword (balance frame)",
      "whilst visitors marvel, locals … (two-perspective frame)",
    ],
    example:
      "Tourism is Nepal's best customer — and customers, like guests, must be cared for, not merely counted. Admittedly, trekking revenue funds schools, trails and clinics that taxes alone never could. Moreover, when visitors pay to watch a Mani Rimdu dance, a tradition that television threatened to bury suddenly pays its own rent. Nevertheless, the same foot traffic erodes alpine paths and litters base camps, and much of the profit flows to foreign agencies rather than mountain households. Should Nepal enforce carrying-capacity limits, expand homestay ownership and invest visitor fees in conservation, the industry would bless rather than burden. In conclusion, we must welcome the world — without selling the garden it comes to see.",
    grammar: [
      "Comparative structures carry evaluation: 'more than a source of income, tourism is a stage for culture'.",
      "Relative clauses add local detail compactly: 'The Annapurna Circuit, which passes through six districts, sustains thousands of lodges.'",
      "Articles with unique landmarks: the Himalayas, the Bagmati, but Mount Everest (no article) — common exam trap.",
    ],
    tips: [
      "Memorise 3 UNESCO facts: Lumbini (Buddha's birthplace), Kathmandu Valley's seven monument zones, Chitwan and Sagarmatha national parks.",
      "Use the 'smokeless industry' idiom once — it signals wide reading.",
      "For 'Tourism in Nepal' essays, one porter or homestay anecdote beats three statistics.",
    ],
  },
  {
    id: "idea-bank-youth-health-nation",
    name: "Idea Bank — Youth, Health & Nation Building",
    category: "Idea Banks & Flow Plans",
    icon: "🔥",
    concept:
      "'Role of youth', 'brain drain', 'discipline', 'health is wealth', 'sports and character' — these topics ask what makes people AND nations strong. The connecting thread: a country's future is built from citizens' bodies, minds and choices. Prepare this bank once and five different exam topics are covered.",
    format: [
      {
        label: "🔥 Youth & nation building (ideas)",
        detail:
          "youth = energy, innovation, adaptability (the demographic advantage) · education and vocational skills convert energy to progress · entrepreneurship creates jobs instead of seeking them · volunteering and civic participation build democracy · brain drain: skilled youth emigrate for opportunity · remittances help the family but drain the village of its workers · political apathy vs positive engagement · sports, arts and culture channel youth positively · mentorship and role models matter · digital youth can market Nepali products worldwide.",
        example: "A nation that educates its youth but cannot employ them is training citizens for other countries.",
      },
      {
        label: "🫀 Health & lifestyle (ideas)",
        detail:
          "balanced diet vs junk food culture · exercise prevents lifestyle diseases (diabetes, obesity, hypertension) · mental health: stress of exams, stigma around asking for help · sleep is study fuel, not wasted time · hygiene and sanitation prevent disease cheaply · substance abuse destroys youth potential · traditional diets (dal, vegetables) vs imported fast food · sport builds discipline, teamwork, leadership · road safety and first-aid awareness · health is an investment, not an expense.",
        example: "Wellness cannot be bought at the pharmacy; it is compounded daily through food, sleep and movement.",
      },
      {
        label: "🧲 Topic vocabulary",
        detail:
          "brain drain · remittance · entrepreneurship · skilled workforce · civic engagement · volunteering · demographic dividend · discipline · integrity · sedentary lifestyle · balanced diet · junk food · obesity · hygiene · sanitation · mental health · peer pressure · substance abuse · perseverance · sportsmanship · nation building · self-reliance · moral character",
        example: "Nepal's greatest export should be ideas, not its educated sons and daughters.",
      },
      {
        label: "🗺️ Flow plan (speech or essay)",
        detail:
          "P1 Hook: a challenge or boast ('They say our generation is lost. They are wrong.') → thesis. P2 Body: youth as asset — skills, innovation, with example. P3 Body: the leak — brain drain / health neglect. P4 Body: what turns the tide — opportunity, mentors, healthy habits. P5 Call to action: specific pledges for youth AND state. CONCLUSION: return to the boast, now earned. ESSAY variant: replace direct address with third-person analysis; keep the call to action as a recommendation.",
        example: "Thesis model: 'A healthy, skilled and hopeful generation is not the RESULT of national progress — it is the CAUSE of it.'",
      },
    ],
    startings: [
      "They say our generation is lost. They are wrong — we are simply unhired.",
      "Every developed country was once a poor country with healthy, educated, hopeful people.",
      "The gym, the library and the polling booth share one visitor: the citizen who builds a nation.",
      "We speak of youth as the future, yet we hand them a present they did not choose.",
      "A sound mind in a sound body was ancient advice; modern science keeps confirming it.",
    ],
    connectors: [
      "demographic dividend / brain drain (youth set)",
      "sedentary / junk food / burnout (health-risk set)",
      "discipline / perseverance / integrity (character set)",
      "prevention is better than cure (health thesis)",
      "however, potential without opportunity … (structure frame)",
    ],
    example:
      "A healthy, skilled and hopeful generation is not the result of national progress — it is the cause of it. Certainly, Nepali youth brim with talent: coders, athletes and entrepreneurs have put villages on the global map. Yet potential leaks away through two wounds — brain drain that hires our graduates abroad, and lifestyle disease that exhausts the young before their prime. However, both wounds share one dressing: opportunity at home and discipline in daily habits. Should schools pair skills with sports, and governments pair jobs with clean air and safe streets, the exodus would slow and the marathon of nation-building would finally have runners. In the end, nations are not built by concrete; they are built by citizens strong enough to lift it.",
    grammar: [
      "Parallelism powers speeches: 'educated, employed, and engaged' / 'of the youth, by the youth, for the youth'.",
      "Metaphor consistency: if youth are 'runners', the nation is a 'marathon', not a 'cake' — keep the image coherent.",
      "Present perfect for achievements: 'Our engineers have built…'; will/future for pledges: 'We will return with skills.'",
    ],
    tips: [
      "This bank answers at least five common titles: 'Role of Youth', 'Brain Drain', 'Importance of Discipline', 'Health is Wealth', 'Sports and Character'.",
      "For speeches, memorise the parallel triple rhythm — examiners reward it heavily.",
      "Always end nation-building topics with a two-sided call: what YOUTH must do AND what the STATE must do.",
    ],
  },
];