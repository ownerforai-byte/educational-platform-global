#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Author deep-dive notes for thin NEB English language-development topics.

Batch 2: class-12 units 4-6 (technology, education, money and economy).
Same 7-block deep-dive format as batch 1. Only `notes` (and `source`) change.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-deepdive-batch2.py
"""
import json

FILES = {}

# ---------------------------------------------------------------- Unit 4
FILES["content/notes/concepts/class-12/english/language-development/04-unit-4-technology.json"] = blocks = None  # placeholder replaced below
FILES.pop(list(FILES.keys())[0])

def blocks(u1, u2, u3, u4, u5, u6, u7):
    return [u1, u2, u3, u4, u5, u6, u7]

FILES["content/notes/concepts/class-12/english/language-development/04-unit-4-technology.json"] = blocks(
    """## 1. Topic Introduction — Living With the Machine

Technology is the theme you are living inside while you study it: the phone in your pocket is simultaneously your library, your classroom and your distraction. This unit gives you the vocabulary to describe digital life precisely, the concepts to argue about it honestly (attention, privacy, the digital divide, automation and work), and the two genres NEB keeps drawing from this theme — the advantages/disadvantages essay and the problem-solution discussion.""",
    """## 2. Fundamental Conceptual Understanding — What Technology Does to Us and For Us

### 2.1 Vocabulary architecture of the theme

- **Devices and systems:** gadget, device, application (app), platform, network, artificial intelligence (AI), algorithm, automation, the internet of things.
- **Actions:** to browse, to stream, to download, to upload, to post, to scroll, to subscribe, to update, to back up, to hack.
- **Problems:** addiction, cyberbullying, misinformation, screen time, privacy breach, phishing, digital footprint, obsolescence (planned ageing of gadgets).
- **Solution words:** digital literacy, parental controls, screen-time limits, two-factor authentication, fact-checking.

### 2.2 The four big debates hiding in the theme

1. **Attention:** platforms earn money from time spent, so their algorithms are engineered to hold you — the feed is a product sold to advertisers, not a service sold to you.
2. **Privacy:** every free service is paid for in data; "if you are not paying, you are the product" is the sentence to quote and then test.
3. **The digital divide:** technology promises equality but delivers it only to the connected — urban Nepal streams while rural Nepal shares one dongle; the divide has three layers (access, skills, and language of the web).
4. **Automation and work:** machines replace tasks, not whole jobs, usually — but the tasks they replace are the routine ones, so the workforce must retrain toward judgement, care and creativity.

### 2.3 Technology is a magnifier

The honest central idea: technology amplifies human intent. A good teacher with a projector teaches better; a lazy one shows videos. A connected village gains telemedicine; a connected rumour mill gains speed. Arguments that treat technology as simply good or simply bad miss this — and examiners notice.""",
    """## 3. Describing Digital Life Precisely

### 3.1 Verb particles that separate fluent candidates

*log in / log out*, *sign up for*, *plug in*, *back up* (make a copy), *hack into*, *run out of* (battery, data), *keep up with* (the latest features), *cut down on* (screen time), *look something up* (search it). Prepositions carry meaning: information **on** the internet, **from** a website, **through** a VPN.

### 3.2 The present tenses of always-on life

Digital habits live in the **present continuous** for current trends ("Students **are increasingly relying** on AI tutors") and the **present simple** for system truths ("The algorithm **prioritises** engagement over accuracy"). Mixing these wrongly ("The algorithm prioritised... always") is a common grammar slip in this theme's essays.

### 3.3 Quantifying without inventing

You may not carry statistics into the exam hall, but you may carry shapes: "studies suggest a majority of teenagers check their phones within minutes of waking" — hedged, plausible, honest. Never invent precise figures ("73.4% of teens…") — invented precision reads as fabrication and loses credibility marks.""",
    """## 4. Arguing About Technology — The Problem–Solution Frame

### 4.1 The frame NEB rewards

**Problem stated with evidence** → **causes traced** (why does screen addiction happen? because apps are engineered for engagement and self-control is still developing) → **solutions at three levels** (individual: limits and off-hours; family: device-free meals; society: digital literacy in the curriculum, data-protection law) → **realistic closing** (technology will not retreat; management, not prohibition).

### 4.2 Common questions, pre-built positions

- **"Has technology made us lazy?"** Concede automation of effort; rebut that tools shift effort from muscle to judgement — a calculator user still must know *what* to calculate.
- **"Should mobile phones be allowed in classrooms?"** Argue by use-case, not blanket rule: research tool and calendar yes, entertainment during class no; the policy answer (structured permission) beats both absolutes.
- **"Is AI a threat to students?"** Distinguish tool from substitute: AI that explains is a tutor, AI that answers your homework is a shortcut past learning — the difference is how you use it.

### 4.3 The counter-argument habit

Every technology essay should concede one real cost before defending: "Admittedly, screens displace sleep and face-to-face talk when unmanaged…" — then the rebuttal turns the concession into your case for balance. This habit alone separates top-band scripts.""",
    """## 5. Master Comparison — Life Before and After the Smartphone (the NEB classic)

| Basis | Before the smartphone | After the smartphone |
| --- | --- | --- |
| Information | libraries, teachers, waiting | instant search, but unfiltered |
| Communication | letters, calls, fixed times | constant, multimedia, global |
| Attention | single-tasking by default | fragmentation is the default |
| Navigation and daily tasks | asked, memorised, planned | delegated to apps |
| Memory | remembered phone numbers, routes | remembered passwords — the rest is stored |
| Privacy | expensive to invade | harvested by default |
| Boredom | common, and fertile for thought | rare, and often filled badly |
| Learning | paced by the classroom | self-paced, MOOCs, video — for the connected |""",
    """## 6. Conceptual Relationships

- **Unit 1 → here:** "Is the smartphone destroying a generation?" is a critical-thinking exercise — find the claim, the evidence and the assumption before agreeing.
- **Here → Unit 5 (education):** edtech, online classes and AI tutors are this unit's debates wearing a school uniform.
- **Here → Unit 6 (money):** digital payments, online fraud and the platform economy are the same technology acting on the wallet.
- **Here → writing units:** the problem–solution frame is the general shape of report and essay tasks across the course.""",
    """## 7. Exam Orientation and Previous Year Questions (NEB)

### 7.1 The recurring question patterns

1. **Advantages/disadvantages essay (8–10 marks):** "Impact of mobile phones on students" — two benefits, two costs, one judgement; never a list of five vague benefits.
2. **Problem–solution (6–8 marks):** "Cyberbullying among teenagers" — causes before cures; solutions at individual, family and society levels.
3. **Dialogue or discussion (4–6 marks):** two friends debating online classes — alternate turns, use disagreement language ("That's true to some extent, but…"), end without a forced winner.
4. **Short answers (2 marks):** "What is the digital divide?" — definition plus one Nepal-visible example.

### 7.2 A worked miniature (problem–solution paragraph)

"Screen addiction among students is engineered, not accidental: feeds are designed to reward every scroll, so willpower alone loses. The remedy must therefore be structural as well as personal — app timers and phone-free bedrooms for the individual, device-free meals for the family, and digital-literacy lessons that teach children *how* the machine hooks them, for the school. Prohibition teaches nothing; understanding changes behaviour." — cause, three-level solution, memorable close.

### 7.3 Time strategy

For advantages/disadvantages tasks, draft the two-best-of-each list in the margin first; candidates who write benefits until they run out of time never reach the judgement paragraph where the marks sit. Keep one prepared example per debate (a phishing message, a viral hoax) — concrete beats abstract under pressure.""",
)

# ---------------------------------------------------------------- Unit 5
FILES["content/notes/concepts/class-12/english/language-development/05-unit-5-education.json"] = blocks(
    """## 1. Topic Introduction — The Theme You Are Living

Education is the only theme where the reader is also the subject: every candidate sitting the exam is mid-way through twelve-plus years of the system under discussion. That vantage is an advantage — you hold real evidence (see notes: the cost of books, the culture of tuition, the pressure of the SEE and NEB exams) that essay examiners reward. This unit builds the vocabulary of schooling and learning, the concepts behind the reform debates, and the essay frames the theme generates.""",
    """## 2. Fundamental Conceptual Understanding — What Education Is For

### 2.1 Vocabulary architecture of the theme

- **System words:** curriculum, syllabus, pedagogy, assessment, examination, enrolment, literacy, dropout, scholarship, tuition (both meanings: teaching and private coaching).
- **Kinds of learning:** rote learning (memorising without understanding) versus conceptual learning; formal, informal and non-formal education; vocational and technical education; lifelong learning.
- **People:** educator, learner, peer, mentor, dropout, first-generation student.

### 2.2 The aims of education — the exam's favourite philosophical frame

Four classical aims, all quotable: **knowledge** (to know the world), **skills** (to act on it — literacy, numeracy, critical thinking), **character** (values, discipline, citizenship) and **livelihood** (work that sustains). Most education disputes are arguments about the *order* of these: exam-centred schooling prioritises knowledge-as-certification; reformers ask where skills and character went.

### 2.3 The reform debates a strong answer knows

- **Exams versus learning:** when the certificate becomes the goal, teaching bends to the test — rote answers, guess papers, tuition economies. The remedy is assessment that rewards understanding, not abolition of exams.
- **Memory versus understanding:** memory is the substrate of expertise, but memory without transfer is brittle; the honest position values both in order.
- **Equality of access:** community schools versus private schools, the urban-rural gap, and the quiet filter of tuition fees — education promises mobility but can entrench advantage if access is unequal.
- **Vocational respect:** a curriculum that honours only university prep wastes the majority's paths; technical education is not a consolation prize.

### 2.4 Learning how learning works (and quoting it)

Spaced practice beats cramming; testing yourself beats re-reading; teaching someone else is the fastest self-check; sleep consolidates memory. A candidate who argues "exams should be spread out" *because* of spacing effects writes an essay examiners have never read before.""",
    """## 3. Describing School Life Precisely

### 3.1 Collocation banks

- **Study:** to sit an exam, to revise for, to pass with distinction, to fail an paper (not "fail from"), to attend classes, to skip school, to drop out of.
- **Teaching:** to deliver a lecture, to assign homework, to grade scripts, to encourage curiosity, to discipline (a class), to inspire.
- **Reform:** to overhaul the curriculum, to introduce continuous assessment, to bridge the gap, to widen access, to raise the literacy rate.

### 3.2 Modality for policy arguments

Education arguments run on **modals**: "Schools **should** teach financial literacy", "Exams **cannot** measure creativity alone", "The government **might** pilot the reform before scaling it". Strong opinions with calibrated modals read as thoughtful; bare "must" everywhere reads as shouting.

### 3.3 The personal-essay register

"Describe your best teacher" tasks reward showing: one remembered sentence the teacher said, one classroom scene, one change in you — then the lesson stated once, plainly. Avoid the catalogue of adjectives ("kind, helpful, punctual") that could describe anyone.""",
    """## 4. Arguing About Education — Frames That Fit NEB Questions

### 4.1 "Exams measure nothing" — test the claim, do not just oppose it

Concede what exams genuinely measure under pressure: recall, time discipline, written expression. Rebut the overreach: they cannot measure creativity, collaboration or character — so the conclusion is not "abolish exams" but "stop asking exams to do every job"; continuous assessment and practicals cover what written papers cannot.

### 4.2 "Online classes can replace schools" — the post-pandemic frame

Evidence both ways: access and replay value for learning; isolation, practical subjects and the social curriculum lost. Synthesis: blended learning — online for content and revision, physical for community, labs and supervision. The word **blended** itself signals a considered answer.

### 4.3 "Education is the backbone of a nation" — earn the cliché

The sentence is true but empty until you cash it: literacy → informed citizens → better health and fertility choices → productivity → tax base → better schools (the loop). Then the counter-loop: uneducated citizens → poverty → child labour → another uneducated generation. Breaking the bad loop is what "investment in education" means — now the cliché argues.""",
    """## 5. Master Comparison — Rote Learning versus Conceptual Learning (the NEB classic)

| Basis | Rote learning | Conceptual learning |
| --- | --- | --- |
| Method | repeat and memorise | understand, connect, question |
| What is stored | words and formulas | relationships and reasons |
| Transfer to new problems | weak — breaks when wording changes | strong — principles survive rephrasing |
| Speed of initial learning | fast | slower, needs examples |
| Durability | fades days after the exam | persists, refreshed by use |
| Exam fit | guess-paper question types | unseen questions, application items |
| Risk | illusion of knowledge | needs memory work too |
| Best use | tables, formulas, definitions | everything else — and even those, understood |""",
    """## 6. Conceptual Relationships

- **Unit 1 → here:** every education debate is an argument to evaluate — "exams measure nothing" has a claim, evidence and an assumption worth exposing.
- **Here → Unit 4 (technology):** online classes, AI tutors and the digital divide are education's live frontier.
- **Here → Unit 6 (money):** the tuition economy, the cost of schooling and education's return on investment link the two themes directly.
- **Here → writing units:** problem–solution essays, formal letters to editors about school issues, and personal recounts of school life all recycle this unit's frames.""",
    """## 7. Exam Orientation and Previous Year Questions (NEB)

### 7.1 The recurring question patterns

1. **Argumentative essay (8–10 marks):** "Examination system should be reformed" / "Technical education is better than general education" — pick a side, structure with §4's frames, concede once.
2. **Personal essay (6–8 marks):** "The teacher who influenced me most" / "My first day at college" — showing details, tense discipline, one plain statement of meaning.
3. **Short answers (2–4 marks):** "Distinguish formal and non-formal education" — definition plus an example each (school vs radio literacy programme).
4. **Letter to the editor (6–8 marks):** on fee hikes or exam scheduling — layout first, then one problem, one proposal, one polite close.

### 7.2 A worked miniature (argument paragraph)

"Examinations measure memory under a clock, and that is precisely both their worth and their limit: a doctor who once craved anatomy notes still recalls them in an emergency, but no written paper ever tested how she breaks bad news to a patient. Reform, then, is not the abolition of exams but the addition of what they cannot see — practicals, projects and viva that let different intelligences show." — concession, evidence, calibrated conclusion.

### 7.3 Time strategy

For "teacher/school" recounts, list three concrete scenes before writing; for argument essays, write your thesis sentence first and check every paragraph pushes it. In both, keep one prepared education fact (Nepal's literacy journey, the compulsory-education Act) — one checkable anchor beats three vague claims.""",
)

# ---------------------------------------------------------------- Unit 6
FILES["content/notes/concepts/class-12/english/language-development/06-unit-6-money-and-economy.json"] = blocks(
    """## 1. Topic Introduction — Talking About Money Without Flinching

Money is the theme adults discuss in whispers and essays discuss best in plain language. Every learner already runs a micro-economy (pocket money, mobile top-ups, exam fees), and Nepal's macro-story — remittance dependence, tourism, the rush of digital payments — is reported in the news you already read. This unit builds the vocabulary of earning, saving and spending, the concepts behind the big debates, and the report and essay frames the theme generates.""",
    """## 2. Fundamental Conceptual Understanding — The Words and Ideas of the Economy

### 2.1 Vocabulary architecture of the theme

- **Money basics:** income, expenditure, budget, savings, debt, interest, loan, instalment, tax, subsidy, remittance, currency, inflation, recession.
- **Everyday finance:** bank account, debit/credit card, mobile banking, digital wallet, QR payment, e-commerce, online fraud.
- **Economy words:** GDP (the total value of goods and services produced), per capita income, import/export, trade deficit, foreign employment, entrepreneurship, investment, insurance.

### 2.2 The needs-versus-wants engine

Every personal-finance lesson reduces to one discipline: **needs** (food, shelter, education, health) are non-negotiable; **wants** (upgrades, brands, treats) are negotiable and endless. Budgeting is simply deciding the wants' share on purpose instead of by impulse — the 50/30/20 style split (needs, wants, savings) is a quotable frame. Impulse buying is not a character flaw unique to the poor; it is a designed outcome of advertising, which is why awareness is the first defence.

### 2.3 Nepal's macro-story in three honest sentences

Remittances from foreign employment are a pillar of household income and the national economy — but they signal that jobs at home are scarce. Tourism sells Nepal's mountains and culture to the world and pays many local wages — but it is seasonal and fragile. Imports dwarf exports, so the country pays more than it earns abroad — which is why "produce and export" arguments dominate economic essays.

### 2.4 The digital-money shift

QR codes and wallets moved Nepal's street economy from cash to taps in a few years: faster, traceable, safer to carry — and newly exposed to phishing, OTP fraud and overspending that no longer feels like spending. The trade-off to quote: convenience against control, with literacy as the bridge.""",
    """## 3. Describing Economic Life Precisely

### 3.1 Verb patterns that separate fluent scripts

*save up for* (a goal), *run into debt*, *pay off* a loan, *cut down on* expenses, *live within/beyond* one's means, *make ends meet*, *invest in*, *cash in on* (an opportunity), *splash out on* (a treat), *tighten one's belt* (spend less). Idioms carry economy essays: *money doesn't grow on trees*, *a penny saved is a penny earned*, *the best things in life are free* — one, used aptly, is charm; three is decoration.

### 3.2 The grammar of money talk

Amounts take **singular** verbs as sums ("Five thousand rupees **is** enough for the week") but plural as counted objects ("Five thousand coins **are** heavy"). Percentages agree with the noun behind them ("Sixty per cent of the population **is** rural" vs "sixty per cent of students **are** absent"). These two agreement rules are quietly tested every year.

### 3.3 Reporting numbers honestly

Trends live in the language of change: *rose, climbed, soared*; *fell, dropped, plunged*; *remained steady, fluctuated*. Hedge what you cannot verify: "remittances **account for a significant share** of national income" — no invented decimal, no lost credibility.""",
    """## 4. Arguing About Money — Frames That Fit the Questions

### 4.1 "Money can't buy happiness" — the dialectical answer

Concede the ceiling: beyond meeting needs and modest security, more money adds little daily happiness. Rebut the romantic version: poverty buys misery reliably — money buys healthcare, education, time and options, which happiness is made of. Land the synthesis: money is a **necessary-but-not-sufficient** condition; what buys happiness is spending it on experiences, people and growth more than on status.

### 4.2 "Foreign employment: boon or bane?" — Nepal's own debate

Boon: remittances fund houses, schooling and small businesses; skills and confidence return with migrants. Bane: families separated, villages of grandparents and children, and a national habit of exporting labour instead of building jobs. The mature conclusion treats migration as a symptom — the cure is an economy that makes staying viable.

### 4.3 "Should students learn financial literacy in school?"

The easiest yes in the theme: argue from the syllabus's own gaps — students graduate able to solve quadratic equations but unable to read a loan agreement; compound interest is taught as mathematics but not as a warning about debt. Proposal, example, close: a one-semester compulsory course covering budgeting, interest, fraud and basic insurance.""",
    """## 5. Master Comparison — Saving versus Spending (the NEB classic)

| Basis | Saving | Spending |
| --- | --- | --- |
| Immediate feeling | restraint, mild deprivation | satisfaction, status |
| Long-term effect | security, options, compound growth | depreciation, clutter, dependence |
| Risk profile | low (but inflation erodes idle cash) | high when borrowed |
| Relationship to goals | funds them | can become the goal itself |
| Social signal | often invisible | highly visible |
| Failure mode | hoarding without living | debt without planning |
| Wise form | automatic, goal-linked saving | planned, budgeted spending |
| Proverb armour | a penny saved is a penny earned | easy come, easy go |""",
    """## 6. Conceptual Relationships

- **Unit 1 → here:** "Money can't buy happiness" is a claim to test, not a slogan to repeat — what is its evidence, and what does it assume?
- **Here → Unit 4 (technology):** digital wallets, QR fraud and e-commerce are technology acting on money.
- **Here → Unit 5 (education):** the cost of education and its return on investment are this theme's most personal numbers.
- **Here → writing units:** the trend-report language of §3.3 is the report genre's engine; the dialectical frames of §4 are essay engines.""",
    """## 7. Exam Orientation and Previous Year Questions (NEB)

### 7.1 The recurring question patterns

1. **Argumentative essay (8–10 marks):** "Money can't buy happiness" / "Foreign employment: boon or bane" — dialectical structure, one Nepal example, one proverb used aptly.
2. **Interpretation of a chart or table (6–8 marks):** describe the trend with §3.3 verbs, compare the extremes, close with one inference — never list every number.
3. **Short answers (2–4 marks):** "What is inflation?" — definition plus its felt effect ("the same note buys less than last year").
4. **Dialogue (4–6 marks):** advising a friend to save — turn-taking, modal verbs of advice (*should, ought to, had better*), a concrete plan at the end.

### 7.2 A worked miniature (dialectical paragraph)

"Money cannot purchase a sunset, but it purchases the security that lets a person enjoy one: the family freed from medical debt notices beauty again. Poverty, by contrast, purchases nothing so reliably as misery. The truth, then, is arithmetic rather than romance — money is necessary for happiness and sufficient for none of it, because what it finally buys is options, and happiness still depends on what we choose." — concession, evidence, synthesis with a close worth quoting.

### 7.3 Time strategy

For chart tasks, spend the first minute finding the highest and lowest points and the overall direction — those three facts are the report's skeleton. For money essays, prepare one Nepal anchor (remittance share, QR adoption) and one proverb; resist decorating with more.""",
)

def main():
    for path, notes in FILES.items():
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        before = sum(len(n) for n in data.get("notes", []))
        data["notes"] = notes
        data["source"] = "authored-deep-dive-2026-11-23"
        after = sum(len(n) for n in notes)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"{path.split('/')[-1]}: {before} -> {after} chars")

if __name__ == "__main__":
    main()
