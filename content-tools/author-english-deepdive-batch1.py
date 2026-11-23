#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Author deep-dive notes for thin NEB English language-development topics.

Replaces the `notes` array of each target file with a 7-block deep-dive
(exemplar format: introduction -> conceptual understanding -> two skill
sections -> master comparison table -> conceptual relationships -> exam
orientation). All other keys are left untouched.

Batch 1: class-12 units 1-3 (critical thinking, family, sports).
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-deepdive-batch1.py
"""
import json

def blocks(u1, u2, u3, u4, u5, u6, u7):
    return [u1, u2, u3, u4, u5, u6, u7]

FILES = {}

# ---------------------------------------------------------------- Unit 1
FILES["content/notes/concepts/class-12/english/language-development/01-unit-1-critical-thinking.json"] = blocks(
    # 1 intro
    """## 1. Topic Introduction — Why Does the Course Open With Critical Thinking?

Every later unit asks you to read, judge and respond — and none of that is possible without critical thinking. This unit trains the disciplined habit of not accepting a claim just because it sounds confident: you learn to separate **fact** from **opinion** and **belief**, to find the **claim**, the **evidence** and the hidden **assumption** behind any argument, and to answer with a reasoned position of your own instead of agreement or anger. NEB examiners test this unit directly — fact/opinion items, assumption questions and "do you agree?" tasks appear almost every year — so the skills here are also marks on the paper.""",
    # 2 conceptual understanding
    """## 2. Fundamental Conceptual Understanding — What Critical Thinking Actually Is

### 2.1 Definition and the essential attitude

Critical thinking is **disciplined, skilful and responsible** thinking that evaluates information before accepting or acting on it. The attitude matters as much as the skill: a critical thinker is **curious** (asks why), **fair-minded** (hears the other side at its strongest), **humble** (changes position when evidence demands it) and **courageous** (questions authority and popularity alike). Critical does not mean negative — a critic examines; destruction without examination is not criticism.

### 2.2 The four kinds of statement you must tell apart

- **Fact** — verifiable, true or false independently of feelings: "Nepal hosted the 13th SAARC Summit in 2014." Tests: can it be checked? does experts' evidence agree?
- **Opinion** — a judgement or interpretation, arguable but not checkable in the same way: "Cricket is more exciting than football." Signals: *I think, in my view, should, best, probably*.
- **Belief** — accepted on faith, tradition or authority without demanding evidence: "Hard work is always rewarded." Beliefs may be precious, but they are not arguments.
- **Inference** — a conclusion drawn from evidence; it can be strong or weak depending on the evidence: "The roads are wet, so it probably rained."

### 2.3 The anatomy of an argument

Every argument has four working parts: the **claim** (what the writer wants you to accept), the **evidence** (facts, statistics, examples, expert testimony offered in support), the **reasoning** (the link that says why the evidence supports the claim) and the **assumption** (the unstated premise the whole argument stands on). Find the assumption and you have found the argument's weakest point — the classic exam question "what does the writer take for granted?" targets exactly this.

### 2.4 Why smart people still think badly

- **Confirmation bias** — we hunt for evidence that flatters what we already believe and scroll past the rest.
- **Bandwagon effect** — "everyone believes it, so it must be true"; popularity is not proof.
- **Appeal to authority misuse** — a famous name is not evidence unless the name is an expert *in this field*.
- **Emotional loading** — loaded words ("traitor", "hero") push feelings where reasons should be.

### 2.5 The language of careful thinking

Critical thought sounds careful: hedges like *may, might, tends to, it appears, arguably* replace absolutes like *always, never, obviously*. Learn the register — "The data **suggests** that…" is the sound of a mind leaving room for evidence.""",
    # 3 reading critically
    """## 3. Reading a Passage Critically — A Working Method

### 3.1 Before you judge: preview and question the source

Read once for the gist, then interrogate the source itself: **Who** wrote it and with what authority? **When** — is it current enough? **Why** — to inform, persuade, sell or entertain? **Where** was it published, and does that venue check facts? A persuasive essay in a company's newsletter and a research report in a journal deserve different levels of trust.

### 3.2 Annotate the argument, not the words

Mark the **claim** in one colour, **evidence** in another, and circle connectives — *therefore, thus, consequently, however, although* — because they carry the logic. Number the reasons. If you cannot number them, the passage may be assertion, not argument.

### 3.3 The common fallacies NEB passages love

| Fallacy | What it does | Example |
| --- | --- | --- |
| Hasty generalization | concludes from too few cases | "Two tourists were rude; all tourists are rude." |
| Ad hominem | attacks the person, not the point | "Ignore her report — she failed maths." |
| False dilemma | offers only two options | "Either you support the project, or you hate progress." |
| Slippery slope | one step must slide to disaster | "Allow phones and schools will collapse." |
| Appeal to emotion | replaces evidence with feeling | "Think of the children!" as the whole argument. |
| Circular reasoning | assumes what it must prove | "He is honest because he always tells the truth." |

### 3.4 Test the evidence like an examiner

Ask four questions of any piece of evidence: Is it **relevant** to this claim? Is it **sufficient** (enough cases)? Is it **representative** (typical, not cherry-picked)? Is it **current**? Evidence that fails any question weakens the argument — and saying *which* question it fails is exactly what earns analysis marks.""",
    # 4 writing/speaking critically
    """## 4. Writing and Speaking Critically

### 4.1 The argumentative paragraph that examiners reward

Shape every opinion answer the same way: **Claim** — state your position in one sentence. **Evidence** — give a fact, example or expert view. **Reasoning** — explain why the evidence carries the claim. **Concession** — admit the strongest point of the other side fairly ("Admittedly, …"). **Rebuttal** — show why your side still stands. **Restatement** — close by re-earning your claim in fresh words. Six moves, one paragraph, full marks structure.

### 4.2 Disagreeing without being disagreeable

Discussion is a joint search, not a fight. Use the polite machinery of English: "I see your point, **however**…", "That's true **to some extent**, **but**…", "**While** it is reasonable to think so, the evidence suggests…". Concede before you counter — a refutation that never concedes reads as prejudice.

### 4.3 Summary versus critique

A **summary** reports what the text says, in your own words, in a fraction of the length, without your opinion. A **critique** evaluates how well it says it — evidence, logic, fairness — and ends with a reasoned judgement. Examiners penalise a critique that is all summary and no evaluation, and a summary that smuggles in opinion.""",
    # 5 master comparison
    """## 5. Master Comparison — The Critical Reader versus the Passive Reader (the NEB classic)

| Basis | Passive reader | Critical reader |
| --- | --- | --- |
| Purpose | finishes the text | evaluates the text |
| Reaction to claims | accepts what sounds confident | asks "what is the evidence?" |
| Fact and opinion | reads both the same way | separates and labels them |
| Unstated assumption | never noticed | actively hunted as the weak point |
| Emotional words | swept along | notices loading, discounts it |
| Other viewpoints | ignored or mocked | heard at their strongest, then answered |
| Conclusion | borrowed from the writer | earned personally, with reasons |
| Exam performance | paraphrases the passage | analyses, concedes, rebuts — scores the marks |""",
    # 6 relationships
    """## 6. Conceptual Relationships

- **Unit 2 → here:** every theme unit that follows (family, sports, money, power) supplies the *subjects* you will think critically about; this unit supplies the *method*.
- **Here → writing units:** the argumentative paragraph of §4 is the engine of essay, letter-to-the-editor and report-of-opinion tasks later in the course.
- **Here → media and politics:** propaganda, advertisement and political speech are argument structures wearing costumes; the fallacy table of §3.3 is your X-ray.
- **Across subjects:** the claim–evidence–reasoning frame is the same one physics and biology use — critical thinking is the general grammar of all learning.""",
    # 7 exam orientation
    """## 7. Exam Orientation and Previous Year Questions (NEB)

### 7.1 The recurring question patterns

1. **"Identify the writer's main claim / assumption." (2–4 marks)** — quote or paraphrase the claim, then state the unstated premise: "The argument assumes that …"
2. **Fact or opinion? (2 marks)** — label each statement and justify with one clause: "Opinion — it uses 'should' and cannot be verified."
3. **"Do you agree with the writer? Give reasons." (4–6 marks)** — use the six-move paragraph of §4.1; the concession–rebuttal pair is where the top band lives.
4. **"Suggest a suitable title and justify it." (2 marks)** — the title should name the *issue*, not the topic: not "Phones", but "Banishing phones: safety or suspicion?"

### 7.2 A worked miniature

Statement: "Social media must be banned for teenagers; two students in a Kathmandu school failed their exams after scrolling all night."
- Claim: social media must be banned for teenagers.
- Evidence: two students (a hasty generalization — two cases cannot carry a ban for millions).
- Hidden assumption: that the two cases are typical of all teenagers.
- Stronger reply: "While excessive scrolling clearly harmed those students, a ban punishes everyone for a minority's habits; guidance and limits address the harm more fairly." — concession, evidence, rebuttal: full structure.

### 7.3 Time strategy

Spend the first minute labelling claim/evidence/assumption in the margin before writing anything. Answers built on that skeleton write themselves; answers that start writing immediately drift into summary. Leave the last two minutes to check that every opinion sentence contains at least one hedge and one reason — that check alone moves scripts a band up.""",
)

# ---------------------------------------------------------------- Unit 2
FILES["content/notes/concepts/class-12/english/language-development/02-unit-2-family.json"] = blocks(
    """## 1. Topic Introduction — Why Family Opens the Theme Units

Family is the first society any of us meet, and the theme where language, emotion and argument meet most naturally: every learner already holds evidence about it. This unit builds the vocabulary to describe family structures and change, the ideas to discuss them (duty, care, generational change, migration), and the writing frames NEB rewards — the comparison essay, the personal recount and the formal letter all live comfortably inside this theme.""",
    """## 2. Fundamental Conceptual Understanding — What "Family" Means and How It Is Changing

### 2.1 Core vocabulary you will be examined around

**Nuclear family** (parents and their children), **joint family** (several generations or married brothers under one roof and one kitchen), **extended family** (relatives beyond parents and children — grandparents, uncles, aunts — who may live nearby rather than together), **single-parent family**, **blended family** (step-parents and step-siblings after remarriage), **childless family**, and **family of procreation** (the family you form) versus **family of orientation** (the family you are born into).

### 2.2 The functions every family performs

Sociologists list them and examiners quote them: **socialisation** (language, manners, values), **emotional support** (belonging and security), **economic cooperation** (shared work and income), **reproduction and care of children**, and **social placement** (name, caste or class, inheritance). When one function weakens — say, economic cooperation splits as members migrate — the strain shows up as the "changing family" essays NEB loves.

### 2.3 The Nepali family in transition

Three forces dominate any honest class-12 discussion: **migration** (parents abroad; children raised by grandparents — the "left-behind" family), **urbanisation** (flats in Kathmandu simply cannot host a joint family the way a village home could), and **education and women's employment** (later marriage, fewer children, shared decision-making). A strong answer names the force, gives one concrete example, and weighs both gain and loss — never only loss.

### 2.4 The generational conversation

The "generation gap" is really two different libraries of experience: elders hold memory and tradition, the young hold current tools and global reference points. The language skill is **mediation** — reporting each side to the other respectfully: "My grandmother sees it as duty; I have come to see it as choice — both views grew from real experience."",
""",
    """## 3. Describing Family Life — Language That Carries Feeling Precisely

### 3.1 Collocation banks that lift an essay a band

- **Relationships:** close-knit, supportive, strained, estranged; to look up to, to take after, to grow apart, to bring up / raise.
- **Duties:** to care for, to provide for, to look after, to share the household chores, to support someone through.
- **Change:** to drift apart, to keep in touch, to reunite, to adjust to, to carry on a tradition.

### 3.2 Showing, not announcing

Weak: "My family is very loving." Strong: "Even now, my mother texts the family group before every exam, a habit she began with my sister's first test twelve years ago." One concrete remembered detail beats three adjectives — in recounts and in essays alike.

### 3.3 Tense discipline in family recounts

Childhood memories live in the **simple past** with **used to / would** for repeated habits ("My grandfather *would* tell stories after dinner; we *used to* fall asleep before the ending"). Present perfect bridges past to present ("My brother **has been** in Qatar **for** three years"). Slipping these tenses is the most common grammar loss in this theme's answers.""",
    """## 4. Arguing About Family — The Comparison Essay Frame

### 4.1 Joint versus nuclear: the frame that fits any question

Thesis choice first: are you defending a family form, or arguing that the *functions* matter more than the *form*? The second thesis is easier to defend and examiners rarely see it — an instant differentiator.

### 4.2 The classic comparison table (learn it, then rewrite it in prose)

| Basis | Joint family | Nuclear family |
| --- | --- | --- |
| Size and structure | several generations, one roof | parents and children |
| Decision-making | elders central, slower | parents, quicker |
| Economic life | pooled income, shared costs | independent, concentrated costs |
| Care of children and elderly | many hands, shared | few hands, paid help often needed |
| Privacy and autonomy | limited | high |
| Conflict handling | compromise and hierarchy | negotiation between equals |
| Cultural transmission | strong, daily | deliberate, occasional |
| Risk when a member migrates | others absorb the role | the whole system strains |

### 4.3 The concession that wins marks

Whatever side you take, concede the real cost: joint-family defenders must face the privacy and autonomy column; nuclear-family defenders must face who cares for the grandparents. An answer that prices both sides' costs reads as mature, and mature is what the top band means.""",
    """## 5. Master Comparison — Family Then and Now (the NEB classic)

| Basis | Traditional family (then) | Contemporary family (now) |
| --- | --- | --- |
| Typical form | joint or extended, rural | nuclear or transnational, urban |
| Authority | patriarchal, elder-centred | increasingly shared between spouses |
| Women's economic role | household-centred | education, jobs, shared earning |
| Contact across distance | letters, rare visits | daily video calls, remittances |
| Child-rearing | community and grandparents | parents plus schools, screens |
| Marriage | arranged, early | later, increasingly by choice |
| Care of the elderly | by family at home | family plus institutions, debated |
| Continuity | tradition transmitted by habit | tradition transmitted by decision |""",
    """## 6. Conceptual Relationships

- **Unit 1 → here:** "Is the joint family obsolete?" is a critical-thinking question — claim, evidence (migration statistics, housing reality), assumption (that togetherness requires one roof).
- **Here → Unit 19 (migration and diaspora):** the left-behind family is this unit's live case study; the two units share vocabulary and evidence.
- **Here → writing units:** the comparison table of §4.2 converts directly into comparison paragraphs; the recount skills of §3.2 feed personal essays and letters home.
- **Across the course:** family is the smallest economy, the first school and the oldest welfare state — themes of money, education and care all restart here.""",
    """## 7. Exam Orientation and Previous Year Questions (NEB)

### 7.1 The recurring question patterns

1. **Comparison essay (8–10 marks):** "Joint family or nuclear family — which suits modern Nepal?" Use the §4 frame: thesis, two-to-three criteria, concession, restatement.
2. **Personal recount (6–8 marks):** "Describe a family member who has influenced you." One detail per paragraph, past-tense discipline, end with the influence stated plainly.
3. **Formal letter (6–8 marks):** writing to a relative abroad or an editor about family issues — correct layout earns easy marks many candidates throw away.
4. **Short discussion answers (2–4 marks):** "What are the advantages of a joint family?" — three distinct points, one example each; never three versions of the same point.

### 7.2 A worked miniature (comparison paragraph)

"Although the nuclear family gives couples the privacy and speed modern jobs demand, it quietly outsources the two tasks the joint family did best — caring for children and for the elderly. In my own lane, the Rai family's three generations share one kitchen: the grandmother's care costs nothing but respect, while my neighbours pay a caregiver a monthly salary to do, less lovingly, the same work. The form we choose decides which bills we pay in money and which in time." — thesis, evidence, reframe: comparison with a point of view.

### 7.3 Time strategy

For comparison tasks, spend the first two minutes drawing the two-column table in the margin — it becomes your paragraph plan and guarantees balance. For recounts, list three concrete memories first and write one paragraph each; memory, not vocabulary, is the harder resource under exam pressure.""",
)

# ---------------------------------------------------------------- Unit 3
FILES["content/notes/concepts/class-12/english/language-development/03-unit-3-sports.json"] = blocks(
    """## 1. Topic Introduction — Why Sport Belongs in an English Course

Sport is the world's most shared language and Nepal's most passionate one — every reader has played, watched or argued about a match. That shared experience makes the theme perfect for language work: reporting facts under pressure (match reports), weighing values (sportsmanship versus winning), and arguing with evidence (money in sport, sport in education). NEB sets all three tasks from this theme.""",
    """## 2. Fundamental Conceptual Understanding — Sport as More Than Play

### 2.1 What sport does for people and societies

- **Physical:** fitness, discipline of routine, defence against lifestyle disease.
- **Mental:** stress release, focus, learning to lose and restart — resilience in its purest form.
- **Social:** teamwork, leadership, mixing across class, caste and gender on one field — sport is Nepal's most democratic classroom.
- **National:** icons (Paras Khadka in cricket, the record-setting mountaineers) manufacture shared identity the way textbooks only describe.

### 2.2 The vocabulary architecture of the theme

- **Events and roles:** athlete, coach, umpire/referee, spectator, captain, substitute; tournament, league, fixture, semi-final, tie-breaker, draw.
- **Action verbs that make reports vivid:** to clinch, to thrash, to edge past, to equalise, to trail, to stage a comeback, to defend a title.
- **Values vocabulary:** sportsmanship, fair play, doping, match-fixing, endurance, perseverance, rivalry, trophy.

### 2.3 The central values debate

Sport promises **fair play** — equal rules, honest effort, respect for the opponent — yet rewards **winning** with money and fame. Everything interesting in this theme grows from that tension: doping scandals, match-fixing, gamesmanship (winning by bending the rules without breaking them), the morality of host nations spending billions on stadiums while athletes' villages go unbuilt. A candidate who can hold both sides of this tension writes the best answers.

### 2.4 Sport and money — the commercialisation argument

Television money built modern professional sport: better training, global audiences, careers for athletes who once had to quit early. The same money buys influence: fixture schedules bent for broadcasters, betting scandals, clubs as billionaire toys. The mature position is not "money is ruining sport" but "**which** money, **under which** rules" — governance, transparency and players' unions are the real variables.""",
    """## 3. Reporting a Match — The Genre NEB Keeps Testing

### 3.1 The shape of a match report

**Headline** (short, active) → **lead paragraph** answering who won, against whom, by what margin, where and when → **body** in chronological order with the turning point highlighted → **reaction** (captain or coach quote) → **what next** (the upcoming fixture). Fifteen lines can hold all five; candidates who skip the lead's five facts lose the structure marks immediately.

### 3.2 Grammar that reports do the work with

Match reports are the natural home of the **passive voice** (focus on the action, not the actor): "A goal was scored in the 78th minute", "The record was broken by a seventeen-year-old." They also run on the **past simple** for events and the **past perfect** for the story before the story ("Nepal, **who had lost** both opening matches, …"). If your report has no passive sentence, an examiner will notice.

### 3.3 From facts to commentary

A report states; commentary interprets: "The winning goal came from a defensive error" is analysis the report may earn after the facts are safe. Learn the difference — examiners mark it as genre awareness.""",
    """## 4. Arguing About Sport — Values, Money and Fairness

### 4.1 The argument frames you will reuse

- **"Sport builds character — discuss."** For: discipline, teamwork, resilience. Against: character is built by reflection, not activity alone; sport can also teach gamesmanship. Synthesis: sport *offers* character lessons; teaching makes them stick.
- **"Winning is the only thing."** Concede that winners get the prizes; rebut that a win without fair play is theft of the game itself, and that fans abandon cheats but remember graceful losers.
- **"Should athletes be paid more than teachers?"** Market value versus social value — the classic economics-versus-ethics pairing; land on scarcity of talent plus revenue generated, then weigh what society chooses to honour.

### 4.2 Evidence a Nepal-specific answer can hold

Nepal's cricket rise (ODI status in 2018 and the following World Cup League campaigns), the national football team's regional history, women's karate and taekwondo medals at South Asian Games, and the parasport movement. One concrete, checkable example per paragraph beats a page of "sport is important".""",
    """## 5. Master Comparison — Individual versus Team Sport (the NEB classic)

| Basis | Individual sport | Team sport |
| --- | --- | --- |
| Example disciplines | athletics, swimming, martial arts, chess | football, cricket, volleyball, basketball |
| Responsibility | wholly yours — nowhere to hide | distributed across roles |
| Motivation | self-driven | peer-driven, coached |
| Skill shape | deep specialisation | broad plus role specialisation |
| Fame structure | stars are individuals | stars are franchises |
| Failure handling | private and total | shared and partial |
| Nepal's strongest medals | martial arts, athletics (SA Games) | cricket's team rise |
| Character lesson | self-discipline | cooperation and role acceptance |""",
    """## 6. Conceptual Relationships

- **Unit 1 → here:** "Money is ruining sport" is an argument to be tested, not a slogan — find its claim, evidence and assumption before you sign it.
- **Here → Unit 3's neighbours (health, leisure):** sport is exercise with rules and leisure with stakes; the units share vocabulary and evidence.
- **Here → writing units:** the match report is a report genre; the values debates are argumentative essays; both reuse the frames taught there.
- **Across the course:** sport is a society in miniature — rules, enforcement, inequality, fame and fairness all appear on one field.""",
    """## 7. Exam Orientation and Previous Year Questions (NEB)

### 7.1 The recurring question patterns

1. **Match report (6–8 marks):** a one-day fixture given in notes; convert to a report with the five-part shape of §3.1 and at least one passive construction.
2. **Argumentative essay (8–10 marks):** "Sport should be compulsory in schools" or "Money has corrupted sport" — six-move paragraph structure, one concession, one Nepal example.
3. **Short answers (2–4 marks):** "What is sportsmanship?" — definition plus one illustration; "Why do fans value fair play?" — because a cheated win defeats the point of contest.
4. **Vocabulary in context (2 marks):** given a sentence, replace a neutral verb with a vivid one (*beat → thrash / edge past*) and justify the nuance.

### 7.2 A worked miniature (report lead)

"Nepal clinched the ACC Premier Cup in Kathmandu on Tuesday, beating the UAE by three wickets in a tense final after defending a modest total with disciplined medium pace." — five facts (who, whom, what, where, when) plus one turning-point hint: a full-mark lead in one sentence.

### 7.3 Time strategy

For the report, list the five facts as a checklist before writing the lead — structure marks are the cheapest on the paper. For essays, choose your side in the first two minutes and commit; hedged essays that never state a position sit in the bottom bands however fluent their English.""",
)

def main():
    changed = []
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
        changed.append((path, before, after))
    for path, before, after in changed:
        print(f"{path.split('/')[-1]}: {before} -> {after} chars")

if __name__ == "__main__":
    main()
