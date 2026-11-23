#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Native-English rewrite of class-12 language-development units.

Replaces the formula-scaffold blocks (Topic Introduction / Fundamental
Conceptual Understanding / Master Comparison ...) with a native English-teacher
voice: literary and rhetorical devices, idiom and register taught in use,
modelled writing, exam advice that reads like advice. Units 1-4.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-native-batchA.py
"""
import json

def blocks(*bs):
    return list(bs)

FILES = {}

FILES["content/notes/concepts/class-12/english/language-development/01-unit-1-critical-thinking.json"] = blocks(
    """## Why the course opens here

Every other unit will hand you something to judge — a family argument, an advert, a politician's promise — and this unit is where you get the tools to judge it. Critical thinking sounds like a laboratory word, but it is really just reading with your guard up: enjoying the writer's music while checking whether the words can actually carry the weight they claim. The NEB paper tests it directly, year after year, so what follows is both a habit of mind and a habit of marks.

One caution before we begin: *critical* here does not mean cross. A critic in the true sense is a lover of the subject — you take a text seriously enough to test it, the way you would test a chair before sitting a guest on it.""",
    """## The words that carry the theme

English keeps its sharpest thinking-words in everyday clothes, and the examiners know it. A **fact** can be checked — "Nepal joined the UN in 1955" either stands or falls. An **opinion** can only be argued — "Momo is better than pizza" will outlive us all unresolved. A **belief** is held on trust — "good things happen to good people" — precious, perhaps, but never proof. And an **inference** is the leap your mind makes from what it saw to what it thinks must follow: wet roads, therefore rain. The roads might also have been washed by a tanker. Inference is where thinking is born — and where it most often slips.

Listen for the words that signal each kind. Opinions wear *I think, in my view, should, surely, best*. Facts wear numbers, dates, names. And careful thinkers of every kind speak in hedges — *may, might, tends to, it seems, arguably* — because certainty is cheap and evidence is not. "The data **suggests**" is the sound of a mind leaving the door open for the facts to walk back in.

Then there is the quiet hero of every argument: the **assumption**. Every claim rests on something it never bothers to say out loud. "Social media must be banned — two students failed their exams after scrolling all night" stands on the unspoken floor that two students are enough to judge a million. Find the assumption and you have found where the floor is thinnest.""",
    """## Reading like a detective — the devices of persuasion

Writers who want your agreement rarely argue honestly, and English has names for their favourite tricks. Learn the names and the tricks lose their power.

**Loaded language** smuggles the conclusion into the description: a "regime" and a "government" may govern identically, but one has already been condemned. **Bandwagon** appeals borrow the crowd's noise for evidence — "everyone knows that…". **False dilemma** builds a fork where there is a field: "Either you support the project or you hate progress." **Slippery slope** turns one step into an avalanche — allow phones today, and by Friday civilisation ends. **Ad hominem** skips the argument to mug the arguer: her report is dismissed because she once failed maths, as if arithmetic kept a grudge.

The irony of it all — and irony itself is a device you will meet in every literature unit — is that propaganda works best on readers who are certain they cannot be fooled. The test is simple and worth memorising: for any claim, ask *what would change my mind?* If the answer is nothing, you are not reading an argument; you are reading a uniform.

**A worked miniature.** "Cycling must be banned in Kathmandu: last week a cyclist caused a traffic jam." The claim is a ban; the evidence is one Tuesday; the assumption is that one jam proves a habit. One sentence of analysis, and the argument folds like a deckchair.""",
    """## The grammar and style of thinking clearly

Clear thought has a sound, and English gives it a grammar. Strong arguments move through **connectives** the way traffic moves through lights: *because* and *since* open the reasons; *therefore, thus, consequently* deliver the verdict; *however, although, admittedly* let the other side onto the road — safely. A paragraph without connectives is not thinking; it is a list wearing a suit.

Then there is **parallelism**, the device that makes reasoning memorable: "read to question, read to weigh, read to decide" lands harder than three lopsided clauses ever will. And **rhetorical questions** — "But what, finally, is evidence?" — are how a good writer walks the reader into thinking for themselves; the answer arrives in the reader's head a beat before the writer says it.

Watch your modals, too. *Must* is a hammer; *should* is a hand on the shoulder; *may well* is a raised eyebrow. An essay that hammers every sentence reads as temper, not thought. The examiners' phrase for the difference is "calibrated register", and it is worth marks in every unit that follows.""",
    """## Speaking and writing the theme — a model, dissected

Here is a paragraph in the shape examiners reward, annotated as a teacher would mark it.

*"Social media should be taught, not banned. **(claim, stated once and plainly)** Admittedly, the harm is real — a phone feeds on the very hours homework needs. **(concession: the other side heard at its strongest)** But a ban treats the symptom and leaves the disease: children who never learn how an algorithm baits them will meet it the day the ban lifts. **(reasoning: why the concession does not win)** Finland teaches media literacy in school; its teenagers navigate the same feeds with better instincts. **(evidence, one example, no invented statistics)** The choice, then, is not between phones and innocence but between users and the used. **(restatement, sharpened into a line worth quoting)"*

Notice what the paragraph never does: it never says "I strongly believe". Belief is the beginning of an essay, not its body. And notice the one concession doing honest work — examiners read the concession as maturity, and maturity is what the top band is called.""",
    """## How the exam asks it

The paper returns to the same four moves. **"Identify the writer's claim/assumption"** — quote or paraphrase the claim, then supply the hidden floor: "The argument assumes that…". **"Fact or opinion?"** — label, then justify in one clause ("opinion — it says *should*, and no one can check a *should*"). **"Do you agree?"** — the six-move paragraph above; the concession–rebuttal pair is where the marks live. **"Suggest a title and justify it"** — a title names the *issue*, not the topic: not "Phones" but "Users or the used".

Spend the first minute of any such question labelling claim, evidence and assumption in the margin — the skeleton writes the flesh. And keep one honest example per theme in memory (a phishing message, a viral rumour) rather than a statistic you would have to invent. Invented precision is the one error examiners never forgive, because it is the one error this unit exists to cure.""",
)

FILES["content/notes/concepts/class-12/english/language-development/02-unit-2-family.json"] = blocks(
    """## The first society, in its own words

Family is the theme every candidate already holds evidence for — you have lived it, and the exam knows it. What the unit adds is vocabulary precise enough to say what you know, and frames honest enough to say what you feel. Family is also where language is at its most affectionate and its most loaded: the same house can be described as "close-knit" or "claustrophobic" depending on which decade of the speaker's life is doing the describing.""",
    """## The words that carry the theme

English sorts families by shape and the shapes have exact names. A **nuclear family** is parents and children; a **joint family** is several generations sharing one roof and, more tellingly, one kitchen; an **extended family** is the wider web of grandparents, uncles and aunts who may live nearby rather than together; a **single-parent family** and a **blended family** (step-parents, step-siblings, a new beginning stitched from an old one) complete the set. The exam loves the distinctions because essay questions live on them.

Then the verbs, which are where feeling hides. We **take after** a parent (inherit the nose or the temper), **look up to** an elder, **grow apart** from a sibling without ever deciding to, **keep in touch** across oceans and **drift out of touch** across a dinner table. "My brother and I grew apart after he left for Qatar" says in seven words what a paragraph of adjectives cannot.

And the idioms that make an essay sound lived-in: *blood is thicker than water*, *the black sheep of the family*, *a family heirloom*, *to run in the family* ("diabetes — and stubbornness — run in ours"). One, used where it belongs, is charm. Three is a costume.""",
    """## Reading the theme like a writer — the devices of family writing

Family writing lives or dies on **showing versus telling**. "My mother is very caring" is a report; "my mother still texts the family group before every exam, a habit she started with my sister's first test twelve years ago" is a portrait. The device at work is **concrete detail** — one remembered particular outweighs three adjectives, in recounts and in life.

**Tone** is the second master device, and family is where tone gets complicated, because love and grievance share a roof. A writer can describe the same father as strict or as frightened for his children; the choice of words (*insisted* versus *allowed*, *worried* versus *interfered*) is the tone, and noticing it is the reading skill the exam calls "attitude of the writer".

There is also the quiet poetry of household **metaphor** — the family as a tree (roots, branches, the ones who fall far from it), as a knot, as a ship. When a passage calls grandmother "the root of the house", the image is doing argument: it says she holds everything up and is the last thing anyone would move.

Finally, **understatement** — very English, very useful. "We don't talk the way we used to" can carry twenty years of silence. The exam calls this *implied meaning*, and it rewards the reader who hears what is not said.""",
    """## The grammar of memory

Family stories are told in the past, and the past has three doors. The **simple past** for the single event ("grandfather told his stories after dinner"). **Used to** and **would** for the repeated rituals of a childhood ("we *would* fall asleep before the ending; we *used to* fight over the one pillow"). And the **present perfect** for the bridge between then and now ("my brother **has been** in Qatar **for** three years; we **have spoken** every Friday since"). Slipping between these doors without noticing is the single most common grammar loss in family essays — and the easiest to fix, because the logic is human: once, always-then, until-now.

The other quiet marks-saver is the **possessive of relationship**: "my father's workshop", "my parents' sacrifice" — note the apostrophe after the *s* in the plural. Examiners count these the way grandmothers count guests.""",
    """## The comparison that examiners set every year

Joint family or nuclear family — the question arrives in different clothes every session, and the answer that stands out is the one that argues functions, not forms. Houses change; the jobs a family does — care, teaching, feeding, belonging — do not.

| Basis | Joint family | Nuclear family |
| --- | --- | --- |
| Decision-making | elders central, slower, wiser in crises | parents alone, quicker, fewer vetoes |
| Care of young and old | many hands, unpaid | few hands, often paid help |
| Privacy | rationed | abundant |
| Conflict | softened by hierarchy | negotiated between equals |
| Culture and language | transmitted daily, by habit | transmitted deliberately, by decision |
| When a member migrates | others absorb the role | the whole system strains |

Whatever side you take, price the other side honestly: joint-family defenders must answer for privacy; nuclear defenders must answer for the grandparents. An answer that pays both costs reads as grown-up — and grown-up is the register the top band speaks.""",
    """## How the exam asks it

Three shapes recur. The **comparison essay** ("Which family suits modern Nepal?") wants a thesis in the first paragraph, two or three criteria from the table above, one concession, one restatement. The **personal recount** ("A family member who influenced me") wants one scene per paragraph, past-tense discipline, and the influence stated once, plainly, at the end — not announced in the first line and repeated ever after. The **formal letter** (to a relative abroad, or an editor on family issues) wants the layout right before anything clever; layout is marks lying on the table.

And a last piece of teacher's advice: family essays fail from sentimentality more often than from grammar. Trust the detail — the texts before every exam, the pillow nobody would share — and leave the words "love" and "sacrifice" in the drawer. The reader will supply them; that is what showing is for.""",
)

FILES["content/notes/concepts/class-12/english/language-development/03-unit-3-sports.json"] = blocks(
    """## The world's loudest language

Sport needs no translation: a last-minute goal means the same thing in Kathmandu and São Paulo. That shared heartbeat is exactly why the theme teaches English so well — you already have the passion, and the unit supplies the register: the crisp facts of the match report, the moral vocabulary of fair play, the argument frames for money in sport. NEB draws a report, an essay and a short answer from this theme almost every year.""",
    """## The words that carry the theme

Match-day English is a working vocabulary, not a list. **Events and people:** tournament, league, fixture, semi-final, tie-breaker, draw; athlete, coach, umpire, referee, spectator, captain, substitute. **The verbs that make a report move:** a team *clinches* a title, *thrashes* or *edges past* an opponent, *equalises* in the ninetieth minute, *stages a comeback*, *defends* a title, *trails* at half-time and *wins it the hard way*. The difference between "Nepal beat UAE" and "Nepal edged past the UAE in a tense final" is the whole art of the genre — the second sentence already tells you how it felt.

Then the **values vocabulary**, because the theme's soul is moral: *sportsmanship, fair play, gamesmanship* (winning by bending without breaking), *doping, match-fixing, endurance, perseverance, rivalry*. And the idioms fans actually say: *a dark horse*, *a game-changer*, *to move the goalposts*, *it's not cricket* (unfair, and the idiom itself argues that fairness is the sport's soul), *to be a good sport* — which is, in the end, the whole unit in four words.""",
    """## Reading the theme like a writer — the report and the commentary

A **match report** is journalism in miniature, and its shape is fixed: a headline that moves; a **lead paragraph** carrying the five facts — who won, against whom, by what margin, where, when; a body that walks the match in order and pauses at the turning point; a reaction from the captain or coach; and a last line pointing forward. *"Nepal clinched the ACC Premier Cup in Kathmandu on Tuesday, beating the UAE by three wickets after defending a modest total with disciplined medium pace"* — five facts and a story in one sentence. That is the standard.

Its grammar is the **passive voice**, and the passive is not a quirk but a choice of focus: "a goal **was scored** in the 78th minute" keeps the eye on the ball, not the boot; "the record **was broken** by a seventeen-year-old" saves the name for where it lands hardest. Reports also lean on the **past perfect** for the story before the story: "Nepal, **who had lost** both opening matches, …" — one clause of history, and the comeback means double.

**Commentary** is the report's louder cousin: it interprets. "The winning goal came from a defensive error" is analysis, and it belongs *after* the facts are safe. Candidates who blur the two — reporting their opinions — lose the genre marks that were waiting for them.""",
    """## The argument at the heart of the game

Every interesting sports essay is the same tension in different clothes: the game promises **fair play** and pays for **winning**. Doping, match-fixing and gamesmanship are what the tension looks like when it goes wrong; sportsmanship is what it looks like when it goes right.

Hold both sides and you write the best answers. "Winning is the only thing" — concede that winners take the prizes, then rebut that a cheated win is theft of the contest itself, and that fans forgive a lost match sooner than a lied one. "Money is ruining sport" — concede the Benthamite scheduling and the betting shadows, then notice that the same television money built the training systems, the women's game and the careers of athletes who once had to quit at nineteen. The mature position is never "money bad"; it is "**which** money, **under which** rules" — governance, transparency, players' voices.

And keep the home evidence close, because it is checkable and moving: Nepal's cricket climbing to ODI status in 2018, the parasport athletes, the martial-arts medals at the South Asian Games. One true name per paragraph beats a page of "sport is important".",
""",
    """## The comparison the exam favours

| Basis | Individual sport | Team sport |
| --- | --- | --- |
| Examples | athletics, swimming, martial arts, chess | football, cricket, volleyball |
| Responsibility | wholly yours — nowhere to hide | distributed across roles |
| Motivation | self-driven, solitary hours | peer-driven, coached |
| Failure | private and total | shared and partial |
| Fame | the person is the brand | the club is the brand |
| Character lesson | self-discipline | cooperation and role acceptance |
| Nepal's brightest | SA Games medals, martial arts | cricket's rise |

The table converts straight into comparison paragraphs — but say something about it, don't just carry it over. The line that wins the paragraph: individual sport teaches you to be alone with your effort; team sport teaches you to be someone's teammate. Both are education; neither is only a game.""",
    """## How the exam asks it

The **match report** (6–8 marks) gives you notes and wants the five-fact lead, the turning point, one passive, one quote. Checklist the five facts before writing the lead — structure marks are the cheapest on the paper. The **argumentative essay** ("Sport should be compulsory in schools", "Money has corrupted sport") wants the six-move shape: claim, evidence, reasoning, concession, rebuttal, restatement — and a committed side within the first two minutes, because essays that hedge into nothing sit in the bottom band however fluent they are. The **short answers** want definitions with a pulse: "sportsmanship is losing as if you had won — shaking the hand, meaning it."

One habit transfers to every unit after this: in argument tasks, write the thesis sentence first and make every paragraph push it. The essay is a match; the thesis is the game plan. No plan, no win.""",
)

FILES["content/notes/concepts/class-12/english/language-development/04-unit-4-technology.json"] = blocks(
    """## Living inside the theme

Technology is the one unit you can research by looking up: the phone in your hand is simultaneously the library, the classroom and the distraction. That double life is the theme — the same device that delivered this course to your village can deliver the rumour that empties it. The unit gives you words exact enough to describe digital life, and frames honest enough to argue about it without either worship or panic.""",
    """## The words that carry the theme

Digital English is built on **phrasal verbs**, and the particles carry the meaning: you *log in* and *log out*, *sign up for* an account, *back up* your files (because drives die at exam time), *hack into* an account, *run out of* battery mid-sentence, *look up* a word, *cut down on* screen time. Get the particle wrong and the sentence goes wrong: information is **on** the internet, **from** a website, **through** a VPN.

The nouns sort into two camps worth keeping separate. The **machinery:** device, platform, algorithm, artificial intelligence, automation, the cloud. The **troubles:** addiction, cyberbullying, misinformation, phishing, screen time, privacy breach, digital footprint — the trail you leave that never quite fades. And the **remedies:** digital literacy, parental controls, two-factor authentication, fact-checking — the vocabulary of defence, which is where the theme's essay marks live.

One distinction examiners quietly reward: **misinformation** is wrong information spread by mistake; **disinformation** is wrong information spread on purpose. The pair is a two-mark question wearing a vocabulary hat.""",
    """## Reading the theme like a writer — the devices of the digital age

The platforms are built on **metaphor**, and the metaphors flatter: a *wall* you write on, *friends* you may never meet, a *cloud* that is actually a field of humming servers in a dry valley. When an essay asks what social media does to friendship, start by asking what the metaphor hides — a "friend" who is also an audience, a "like" that is also a currency.

**Irony** is the theme's native weather: tools built to connect us leave us scrolling alone; the "smart" phone is at its least smart at 2 a.m.; the algorithm that knows you best sells you to the highest bidder. An essay that notices one such irony honestly is already ahead of one that shouts about addiction.

Watch also the **euphemism**, because the industry dresses its business in it: "targeted advertising" for being followed around the internet, "engagement" for the hours that went somewhere, "content" for the work of actual writers. Naming the euphemism — saying what the polite word is buying — is critical thinking with a red pen, and it is exactly the move NEB's analysis questions reward.""",
    """## The debates, held honestly

Four arguments run through every version of this theme, and each deserves its real shape rather than a slogan.

**Attention.** The feed is not a service sold to you; it is you, sold to advertisers — which is why it is engineered to never end. The fix is not willpower alone but design: timers, greyscale, bedrooms without chargers.

**Privacy.** "If you are not paying, you are the product" is quotable — then test it: what exactly is collected, by whom, for what? The mature answer wants data-protection law, not a return to carrier pigeons.

**The digital divide.** It has three floors — access (the village without signal), skill (the phone used only for videos) and language (a web that speaks English first). Nepal knows all three from the inside; an essay with one village example beats one with three global statistics.

**Automation and work.** Machines replace tasks, not usually whole jobs — but the tasks they replace are the routine ones, which is why education keeps reappearing in this unit's answers: the workforce's defence is judgement, care and creativity, the parts a machine cannot yet copy.""",
    """## Grammar and style: writing about the always-on present

Digital life lives in two tenses and the essay must hold both. The **present simple** states the system's truths — "the algorithm **prioritises** engagement over accuracy" — while the **present continuous** tracks the drift of the moment: "students **are increasingly relying** on AI tutors; teachers **are rewriting** their assessments." Mixing them carelessly ("the algorithm prioritised… always") is the theme's signature grammar slip.

Quantify without inventing. You may carry shapes into the exam hall — "a majority of teenagers check their phones within minutes of waking" — but never decimals you cannot source. "73.4% of teens" is not evidence; it is fiction with a decimal point, and examiners are paid to spot the difference.

And when the essay turns to advice, mind your modals: *should* for recommendations, *had better* for warnings with teeth, *might* for honest uncertainty. The rule of thumb: advice with **should**, warnings with **had better**, forecasts with **might** — and never two of them fighting in one sentence.""",
    """## How the exam asks it

The **advantages/disadvantages essay** ("Impact of mobile phones on students") wants two real benefits and two real costs and then a judgement — never a list of five vague blessings. The **problem–solution task** ("Cyberbullying among teenagers") wants causes before cures and solutions at three levels — individual, family, school or law. The **dialogue** (two friends on online classes) wants turn-taking, polite disagreement ("That's true to some extent, but…") and an ending that does not force a winner. The **short answer** wants the definition with one live example.

A worked miniature of the whole method, in one paragraph: *"Screen addiction is engineered, not accidental — feeds reward every scroll, so willpower alone loses. The remedy must be structural as well as personal: app timers and phone-free bedrooms for the individual, device-free meals for the family, digital-literacy lessons that show children how the machine hooks them, for the school. Prohibition teaches nothing; understanding changes behaviour."* — cause, three-level solution, a last line that could close the essay. That last line is worth drafting twice.""",
)

def main():
    for path, notes in FILES.items():
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        before = sum(len(n) for n in data.get("notes", []))
        data["notes"] = notes
        data["source"] = "authored-native-english-2026-11-23"
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"{path.split('/')[-1]}: {before} -> {sum(len(n) for n in notes)} chars")

if __name__ == "__main__":
    main()
