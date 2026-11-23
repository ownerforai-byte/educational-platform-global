#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Native readings + solved NEB questions for the five class-11 essays.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-essays-c11.py
"""
import json

E1 = [
    """## The essay at a glance

"Sharing Tradition" by Frank LaPena is a short essay with a long memory: it argues that a culture survives only when its traditions are passed on by voice — stories, songs, dances, and the language they live in — from elders to the young. LaPena, a Wintu artist and writer from Northern California, speaks from inside the tradition he defends, and the essay's quiet authority comes from that position: he is not describing oral tradition from a library; he is one of its carriers. The argument is simple and urgent: culture is not a museum object but a living chain, and every generation is a link that either holds or breaks.""",
    """## The argument, step by step

The essay opens on the mechanism: tradition is shared by word of mouth, and the sharing has rules — the young must sit, listen, and try to understand, and the elders must be given the respect that makes speaking possible. LaPena is precise about what travels in the voice: language first (a language carries a people's way of seeing), then the stories and songs that hold history, law and humour, then the practical knowledge — plants, medicine, land, weather — that kept communities alive for centuries.

Then the pressures, named honestly. The modern world competes for the young's attention; written records, however useful, are secondary — a tape or a book freezes a living act; and mistakes happen in transmission, which LaPena accepts without panic: the elders correct, the chain self-repairs, but only if it keeps running. His attitude to technology is measured, not hostile: tools can help, but they cannot replace the relationship between speaker and listener, because what is transmitted is not just information but trust.

The close lands on responsibility: the young must come back and listen before the voices are gone. The essay's logic is an inheritance argument — you did not earn the culture; you are holding it in trust — and its plea is for the next link in the chain.""",
    """## The devices, with evidence

- **Ethos** — the essay's foundation: LaPena writes as a participant, not a researcher; every claim carries the weight of someone whose culture is at stake.
- **Repetition** — the ideas of listening, respect and passing on return in each paragraph like a refrain, building the essay's patience.
- **Contrast** — the living voice against the frozen record; the elder's presence against the machine; the old obligation against the modern distraction.
- **Calm tone** — no anger, no nostalgia-mongering: the essay argues as someone confident the tradition can survive if the young simply return to it.
- **Imperative mood** — the close turns descriptive sentences into instructions: listen, respect, share.

The exam question "what is the essay's main argument?" is answered in one sentence: oral tradition is the only full way to pass on a culture, and it survives only through the young's active listening and respect.""",
    """## The themes worth an essay

**Oral tradition as cultural survival** — the central theme: a people's memory, values and knowledge travel by voice, and the voice needs listeners. **Respect for elders** — not decorative politeness but the precondition of transmission; the elder speaks fully only to a listener who honours the gift. **Language as identity** — when a language thins, the thought inside it thins with it. **Continuity and change** — LaPena accepts that the world changes; the essay's demand is that change not sever the chain. An essay on any of these should use the essay's own image-system: voice, listening, the chain, the season of learning.""",
    """## The title, defended

"Sharing Tradition" names the essay's verb, not its object — and the choice is exact. Tradition is not *kept* (which hoards it) or *preserved* (which embalms it) but *shared*, which requires two living parties. The defence a candidate should write: the title makes the young generation a participant rather than an audience, and that participation is the essay's whole demand.""",
    """## NEB short answers, solved

**Q. What is oral tradition? (2 marks)**
A. Oral tradition is the passing of a people's culture — stories, songs, dances, history, practical knowledge and values — from generation to generation by word of mouth rather than in writing. In the essay it is described as the primary way a community keeps its identity alive.

**Q. Why is listening to elders important? (2 marks)**
A. Because the elders are the tradition's living carriers: their stories and songs hold the community's history, law and knowledge. Listening respectfully keeps the chain of transmission unbroken; without listeners, the knowledge dies with its speakers.

**Q. What role does language play in the essay? (2 marks)**
A. Language is the vessel of the whole tradition: a people's way of thinking and seeing the world is embedded in its words. If the language is lost, the stories and songs that carry culture lose their home, so keeping the language is keeping the culture.

**Q. How does the writer view modern technology? (2 marks)**
A. Measuredly: technology can help record and spread material, but it cannot replace the human relationship between the speaker and the listener. A recording freezes a living act; the real transmission needs presence, respect and trust.

**Q. What happens when transmission is imperfect? (2 marks)**
A. Mistakes and omissions occur, as they always have, but the tradition corrects itself: elders verify and repair what is retold. The system survives small errors — what it cannot survive is silence, the absence of anyone left to tell it.

**Q. What does the essay ask of young people? (2 marks)**
A. To return and listen: to give the elders their attention and respect, to learn the language, and to carry the tradition forward themselves. The essay treats the young as trustees of an inheritance they did not earn and must not lose.""",
    """## NEB long answers, solved

**Q. "Tradition survives only when it is shared." Discuss with reference to the essay. (8 marks)**
A model answer opens with the essay's central mechanism: LaPena presents culture as a chain that exists only in transmission — stories, songs and knowledge pass from elder to young by voice, and each link must actively hold. It then develops the two conditions the essay sets: the elder's willingness to speak, which depends on respect, and the young's willingness to listen, which depends on humility. The answer should use the essay's own contrasts — the living voice against the frozen record, presence against the machine — and close on the responsibility argument: the young did not earn the culture, they hold it in trust, and sharing is how the trust is kept. A strong answer quotes or paraphrases the listening scenes rather than generalising about "culture".

**Q. Can technology replace oral tradition? Argue for or against with evidence from the essay. (8 marks)**
A model answer concedes the genuine benefits first — recordings preserve rare songs, archives survive disasters, the internet carries a tradition across continents. It then presents LaPena's distinction: what is transmitted in oral tradition is not just information but relationship — tone, presence, correction, trust — and a recording is a snapshot of a living act. The strongest answers land on synthesis: technology as servant, not substitute — tools that help the chain without replacing its links — and a final sentence that returns to the essay's own image: the voice still needs a listener.""",
]

E2 = [
    """## The essay at a glance

"How to Live Before You Die" is the title under which NEB anthologises Steve Jobs' 2005 Stanford commencement address — and the title is the speech's thesis in five words. Jobs, college dropout and co-founder of Apple, tells the graduates three stories from his life: how dropping out led him to the calligraphy class that later made the Mac beautiful; how being fired from the company he founded led him to the best work of his life; and how a cancer diagnosis taught him that death is life's best advisor. The address is a model of the speech form — anecdote, refrain, and an aphorism to carry home — and its argument is that you cannot connect life's dots forward, only backward, so you must trust.""",
    """## The argument, step by step

**Story one: connecting the dots.** Jobs explains his adoption, his six months at Reed College and his eighteen more dropping in on classes he liked — including calligraphy, a course with no practical use. Ten years later that knowledge returned as the Mac's typography. The lesson, stated as the story's law: you cannot connect the dots looking forward; you can only connect them looking backward — so you have to trust that the dots will connect, and follow curiosity even when it looks like a detour.

**Story two: love and loss.** Apple, built in a garage at twenty, fired him at thirty — publicly. The failure, he says, was the best thing that happened to him: freed of success's weight, he founded NeXT and Pixar and met his wife — and then Apple bought NeXT and he returned. The lesson: the work will fill a large part of life, and the only way to be satisfied is to do what you believe is great work — and the only way to do great work is to love what you do. If you have not found it, keep looking; "as with all matters of the heart, you'll know when you find it."

**Story three: death.** Remembering that you will die, Jobs argues, is the best way to avoid the trap of thinking you have something to lose: already naked, there is no reason not to follow your heart. His own brush with cancer — a tumour, a scare, a surgery — makes the argument personal: your time is limited, so do not waste it living someone else's life. The close hands the graduates the farewell he once read: *Stay hungry. Stay foolish.*""",
    """## The devices, with evidence

- **Anecdote structure** — the speech's architecture: three personal stories, each ending in a portable lesson; the exam question on structure is answered by naming the three-story plan.
- **Refrain** — "Stay hungry, stay foolish" opens and closes the address, borrowed from The Whole Earth Catalog: the speech's takeaway sentence, engineered for memorability.
- **Aphorism** — the speech manufactures them: "You can't connect the dots looking forward"; "Death is very likely the single best invention of life"; "Your time is limited, so don't waste it living someone else's life." Each is a paragraph compressed into a sentence.
- **Direct address** — "you" throughout: the graduates are the argument's audience and its subject, which keeps a big theme intimate.
- **Contrast** — success against failure, life against death, plan against trust: the speech's ideas are all built as pairs.

The exam question "how does Jobs make his speech memorable?" is answered by the three-story plan, the refrain, and the aphorisms — persuasion engineered to be carried out of the hall.""",
    """## The themes worth an essay

**Trust in the unplanned** — the dots theme: meaning is visible only backward, so curiosity must lead where calculation cannot. **Love your work** — the career theme, argued as necessity rather than luxury: satisfaction comes only from work you believe in. **Death as advisor** — the memento mori theme: mortality clarifies choice; remembering death is how the living stop postponing their lives. **Failure as redirection** — the firing that freed him: loss as the doorway to better work. Any essay on the speech should quote one aphorism and one anecdote — the speech's own method is the essay-writer's best evidence.""",
    """## The title, defended

"How to Live Before You Die" inverts the usual graduation cliché — advice for the future — into advice for the present, and the inversion is the speech's whole stance. The defence: the title announces death as the deadline that gives life its urgency, and every story in the speech obeys it — the dropout, the fired founder and the cancer patient all act *now* because the time is limited. A title that seems morbid is in fact the most life-affirming sentence in the anthology.""",
    """## NEB short answers, solved

**Q. Why did Jobs drop out of college, and what did he do after? (2 marks)**
A. He saw no value in it — it was spending his parents' savings — so he dropped out and stayed on auditing the classes that interested him, including calligraphy. The apparent detour later shaped the Macintosh's beautiful typography.

**Q. What does "connecting the dots" mean? (2 marks)**
A. It means seeing how the scattered events of a life fit into a meaningful pattern. Jobs argues you cannot connect the dots looking forward — only backward — so you must trust that today's seemingly useless choices will connect someday.

**Q. How did being fired benefit Jobs? (2 marks)**
A. It freed him from the weight of success: he founded NeXT and Pixar, met his wife, and did the best work of his life — and Apple's later purchase of NeXT returned him to the company. Failure, he says, made the success lighter and truer.

**Q. What does Jobs say about death? (2 marks)**
A. Death is life's change agent and its best invention: it clears out the old to make way for the new. Remembering that you will die is the surest way to avoid the trap of thinking you have something to lose.

**Q. What advice does the refrain give? (2 marks)**
A. "Stay hungry, stay foolish": remain hungry for new experience and foolish enough to take risks that sensible people avoid. It was borrowed from The Whole Earth Catalog's final issue and handed to the graduates as a farewell.

**Q. What is the speech's central message in one sentence? (2 marks)**
A. Trust that life's scattered dots will connect, do work you love, and live your own life now — because time and death will not negotiate.""",
    """## NEB long answers, solved

**Q. Narrate the three stories Jobs tells and draw out the lesson of each. (8 marks)**
A model answer retells each story in two sentences and closes each with its lesson: the dropout whose calligraphy class returned as typography — trust the dots to connect; the founder fired at thirty whose exile produced NeXT, Pixar and his return — love your work and keep looking until you find it; the patient whose tumour scare taught him to follow his heart — death is the advisor that clarifies choice. The answer should note the speech's architecture (three anecdotes, one refrain) and quote at least one aphorism, because the speech's persuasiveness *is* its style and the exam rewards answers that see style as argument.

**Q. "Your time is limited, so don't waste it living someone else's life." How far do you agree? (8 marks)**
A model answer agrees with the core — borrowed ambitions produce hollow careers, and mortality makes borrowed time a double waste — and supports it with the speech's own evidence: Jobs' choices only worked when they were his own (the calligraphy, the return to Apple). It then concedes the counter-case honestly: not everyone can risk following passion; responsibility to family is real, and Jobs speaks from unusual privilege. The strongest answers land on synthesis: the advice is not recklessness but honesty — find the work you can love *within* your constraints, and stop performing a life designed by others.""",
]

E3 = [
    """## The essay at a glance

"What I Require from Life" by J. B. S. Haldane is a scientist's inventory of happiness, written near the end of a famously unorthodox life. Haldane — British-born geneticist and evolutionary biologist who moved to India — approaches the question like an experiment: he lists, item by item, what he actually requires, and the list is startlingly modest. The essay's charm is its voice: a great scientist reasoning about human needs with humour, candour and a refusal to be impressed by wealth or status. Its argument, quietly radical, is that a good life needs less than the world pretends — work, friendship, health, freedom and something worth thinking about.""",
    """## The argument, step by step

The essay proceeds as a list with commentary — the form itself is the argument, because a list refuses the romance that usually surrounds this topic. Haldane begins with the body's requirements: enough food, warmth, and health, which he treats as conditions rather than luxuries, noting from his own illness how quickly they become the whole of one's wishes when absent.

Then the mind's requirements: work worth doing — not necessarily paid, but engaging — and the leisure to think; friends, whom he ranks above relations because they are chosen; and freedom, both the political kind and the inner kind, the liberty to follow a thought wherever it leads. He is candid about pleasures and dismissive of excess: money beyond a modest point adds little, and fame is mostly a nuisance.

The essay's deepest item arrives almost casually: a philosophy of life — something to believe about the world that makes effort coherent. Haldane's own is scientific curiosity: the universe is interesting, and finding out about it is a sufficient purpose. The close returns the argument to scale: his requirements would fit most of humanity's budgets, which is the essay's indictment of a world that distributes them so badly.""",
    """## The devices, with evidence

- **The list form** — the essay's master structure: requirements enumerated and defended one by one, turning a philosophical question into an audit.
- **First-person candour** — Haldane uses himself as the specimen: his illness, his appetites, his opinions; the personal evidence makes the general claims concrete.
- **Irony and humour** — the scientist's dry wit punctures both luxury (money beyond enough) and pomposity (fame); the humour is the essay's proof that the writer is not preaching.
- **Contrast** — need against want, the modest inventory against the world's inflated catalogues, chosen friends against given relations.
- **Understatement** — the biggest claims (freedom, purpose) arrive in the plainest sentences, which is what makes them land.

The exam question "what is the tone of the essay?" is answered by naming the humour and the candour — a scientist's audit, delivered without self-pity or sermon.""",
    """## The themes worth an essay

**The modesty of real needs** — the central theme: a good life requires far less than consumer culture advertises, and the surplus adds anxiety rather than joy. **Work and meaning** — engagement, not income, is what makes days bearable; the essay ranks interesting work among the essentials. **Friendship as chosen family** — friends outrank relations because they are selected, and their company is listed among life's genuine requirements. **Freedom and the life of the mind** — the liberty to think is presented not as a luxury but as a condition of being human. Write any of these with the essay's own inventory in hand — the list is the evidence.""",
    """## The title, defended

"What I Require from Life" is the essay's method in six words: first-person, specific, and auditable. The defence a candidate should write: *require* (not desire, not dream) announces an inventory of necessities, and *I* makes the writer the experiment's subject — a scientist answering the biggest question with the smallest possible unit of data, himself. The plainness of the title is the essay's thesis: the requirements really are that plain.""",
    """## NEB short answers, solved

**Q. What kind of person was Haldane, according to the essay? (2 marks)**
A. A scientist of wide curiosity and independent mind — humorous, candid and unimpressed by wealth or status — who applies scientific reasoning to the question of happiness and treats his own life as the evidence.

**Q. What does Haldane place first among his requirements? (2 marks)**
A. The body's basics: enough food, warmth and health. He treats them as conditions rather than luxuries, noting from his own illness how completely they occupy one's wishes when they fail.

**Q. Why does Haldane value friends over relations? (2 marks)**
A. Because friends are chosen: their company is selected for compatibility and affection rather than given by accident of birth. Friendship, in his inventory, is one of life's genuine requirements.

**Q. What does the essay say about money and fame? (2 marks)**
A. Money beyond a modest point adds little to happiness, and fame is mostly a nuisance. The essay's scale of value runs on work, friendship and freedom, not on wealth or reputation.

**Q. What does Haldane mean by a philosophy of life? (2 marks)**
A. A set of beliefs about the world that makes effort coherent — something worth working for. His own is scientific curiosity: the universe is interesting, and finding out about it is a sufficient purpose.

**Q. What is the essay's implicit criticism of society? (2 marks)**
A. That its requirements are modest enough to be universal, yet the world distributes them badly — many people lack adequate food, health, work or freedom while a few hold enormous surpluses that add nothing.""",
    """## NEB long answers, solved

**Q. List and discuss Haldane's requirements for a happy life. (8 marks)**
A model answer organises the inventory into three tiers and defends each: the body's needs (food, warmth, health) as conditions; the mind's needs (work worth doing, leisure to think, friends) as the substance of daily satisfaction; and the spirit's needs (freedom, a philosophy of life) as what makes the whole coherent. It should use the essay's own evidence — the illness that teaches the value of health, the preference for chosen friends, the dismissal of money beyond enough — and close on the essay's quiet indictment: the list is short because the world's catalogue of wants is inflated, and happiness was never for sale at that price.

**Q. "A good life needs less than we think." How does the essay support this claim? (8 marks)**
A model answer agrees and builds from the essay's form: the audit structure itself argues the case, because a list of genuine requirements exposes the difference between need and want. It should contrast Haldane's items (work, friends, freedom, curiosity) with the consumer catalogue (luxury, status, fame) and use his humour as evidence that contentment and modesty are compatible. The strongest answers concede the counter-case — poverty is not romantic, and his "modest" needs still assume food, health and security — then land the synthesis: the essay does not glorify scarcity; it refuses to confuse surplus with happiness.""",
]

E4 = [
    """## The essay at a glance

"What is Poverty?" by Jo Goodwin Parker is one of the most powerful definitions in modern English — and it is powerful because the definer is inside the thing defined. Parker, writing in the voice of a woman on welfare with three children, answers the title's question not with economics but with the body: poverty is dirt, fatigue, humiliation, and the daily arithmetic of not enough. The essay is a demand — "listen to me" — and its technique is as important as its content: anaphora, sensory detail and a direct address that turns the reader from an observer into an accused party.""",
    """## The argument, step by step

The essay refuses the abstractions first: poverty is not a statistic, a culture or a character flaw — it is a condition with a smell and a schedule. Parker defines it in the present tense of her own days: getting up from a dirt- and illness-stained mattress; washing clothes in hard water when soap is a luxury; the fatigue that never lifts because there is no rest from worry; asking for help and being examined for worthiness before it comes.

Then the layers deepen. Poverty is no privacy — the family's needs exposed to every caseworker and stranger; no plan — the future is a luxury the present cannot afford; no beauty — flowers cost money that food takes. It is the humiliation of remembering dreams, and the guilt of a mother who cannot give her children what other children have. The essay's most quoted lines make the damage physical: poverty is "an acid that drips on pride until all pride is worn away" and a "chisel that chips on honour".

The close is a reversal of the reader's role: Parker says she has come out of her despair to tell this, asks not for pity but for understanding and anger — and puts the cost of the definition on the reader: if you have heard this and do nothing, the poverty is now partly yours to answer for.""",
    """## The devices, with evidence

- **Anaphora** — the essay's engine: "Poverty is..." repeated through the paragraphs until the word is stripped of its statistics and given a body.
- **Second-person address** — "you" as the accused: the reader is asked to imagine, then to act; the pronoun is the essay's summons.
- **Metaphor** — acid on pride, a chisel on honour: poverty as a corrosive force acting on character, which is why the essay's damage is moral as well as material.
- **Sensory imagery** — the smell of poverty is named before its economics: dirt, unwashed bodies, sour milk; the concrete detail is the essay's authority.
- **Tone shift** — the close turns from description to demand: pity is refused, understanding and anger are demanded, and the refusal is the essay's final argument.

The exam question "why does Parker write in the first person?" is answered in one line: because poverty described from outside is theory, and poverty described from inside is testimony — the essay's power is the position of its speaker.""",
    """## The themes worth an essay

**Poverty as lived experience** — the central theme: the condition defined by its daily texture — fatigue, dirt, humiliation — rather than by income lines. **The corrosion of pride and honour** — the acid and chisel metaphors as the essay's moral claim: poverty attacks the person, not the purse. **Society's failure and the reader's duty** — the demand at the close: understanding must become anger, and anger must become action. **Motherhood under poverty** — the guilt and love of a mother who cannot provide; the essay's most personal theme and its most persuasive. Any essay on the text should quote one metaphor and one sensory detail — the essay's own method is the evidence.""",
    """## The title, defended

"What is Poverty?" asks the essay's question in four words and refuses to answer it the way institutions do. The defence: the title promises a definition, and the essay delivers one — but a definition by testimony, each "Poverty is..." a clause of lived evidence. The title's plainness is strategic: the simplest question, asked by the person with the most authority to answer it.""",
    """## NEB short answers, solved

**Q. How does Parker define poverty? (2 marks)**
A. By its lived texture rather than its statistics: poverty is dirt, fatigue, lack of privacy, the humiliation of asking for help, and the daily arithmetic of not enough. It is a condition that corrodes pride and honour like acid and a chisel.

**Q. What does the essay say about fatigue? (2 marks)**
A. Fatigue in poverty is chronic because worry never rests: the mother is tired before the day begins and the tiredness is inseparable from the fear of what the day will cost. Sleep does not cure it, because the problems sleep through too.

**Q. Why is asking for help humiliating? (2 marks)**
A. Because help comes with examination: the poor must prove their worthiness to strangers, expose their households to inspection, and accept judgment along with aid. The essay presents this as a second poverty — of dignity.

**Q. What do the acid and chisel metaphors mean? (2 marks)**
A. They make poverty's moral damage physical: acid drips on pride until all pride is worn away, and a chisel chips on honour. The metaphors argue that poverty attacks character itself, not merely the budget.

**Q. What does Parker ask of the reader? (2 marks)**
A. Not pity but understanding and anger — and action. She says she has come out of her despair to tell her story, and the reader who hears it and does nothing shares responsibility for the condition described.

**Q. Why does the essay use the second person "you"? (2 marks)**
A. To convert the reader from spectator to participant: the "you" asks the comfortable reader to imagine the dirt, the queue and the humiliation as their own, making the distance that allows indifference impossible.""",
    """## NEB long answers, solved

**Q. "Poverty is more than a lack of money." Discuss with reference to the essay. (8 marks)**
A model answer agrees and builds from the essay's own evidence: the lack of money produces, but does not equal, the condition — which includes chronic fatigue, loss of privacy, the humiliation of examination, the corrosion of pride, and the death of future plans. It should quote the acid and chisel metaphors and at least one sensory passage (the mattress, the washing, the queue), then argue the essay's central move: the definition by testimony outranks the definition by statistic, because the statistic cannot smell. Close on the demand: understanding that does not become action leaves the reader implicated.

**Q. How does Parker make her readers feel the poverty she describes? (8 marks)**
A model answer treats the question as one about technique and lists the devices with their effects: anaphora builds the rhythm of a condition that repeats daily; sensory imagery gives the reader the smell and the dirt; second-person address removes the safety of distance; the metaphors make the damage moral and physical at once; and the closing tone shift converts sympathy into summons. The strongest answers notice that the essay never argues — it testifies — and that the absence of argument is its most persuasive argument.""",
]

E5 = [
    """## The essay at a glance

"Scientific Research Is a Token of Humankind's Survival" by Vladimir Keilis-Borok is a scientist's public plea: research, it argues, is not a luxury for the rich or a hobby for the curious but the mechanism by which humanity predicts and survives its disasters. Keilis-Borok, a seismologist who spent his career on earthquake prediction, writes with the urgency of someone who knows what is coming and what knowing is worth. The essay's structure is advocacy: establish the threats, show that science answers them, defend the conditions science needs, and close with an invitation to the young.""",
    """## The argument, step by step

The essay opens on the planet's violence: earthquakes, floods, eruptions and the disasters humanity adds of its own. Against this, the writer sets the one instrument that has ever reduced their cost — systematic research: the earth sciences that locate fault lines and assess hazards, the medicine that defeats diseases, the engineering that keeps cities standing. Science, in his framing, is civilisation's early-warning system.

Then the economics, which is the essay's sharpest point: research is cheap compared with catastrophe. The cost of studying earthquakes for decades is less than the cost of one unpredicted disaster — insurance, in the literal sense. From this he draws the political conclusion: society must fund research steadily, not only after headlines, because prediction is prepared in calm years and spent in crisis ones.

He then defends the researcher's conditions: science needs freedom — the liberty to follow a result wherever it leads — and needs its failures understood, since dead ends are the price of the path. The close is recruitment: to the young, he offers research as a career of adventure and service, and to society, the essay's thesis as a warning — a token of survival is what research is, and tokens of survival should not be the first thing cut when budgets tighten.""",
    """## The devices, with evidence

- **Cost-benefit argument** — the essay's persuasive spine: research priced against catastrophe, a comparison no accountant can refuse.
- **Analogy** — research as insurance: premiums paid in calm years, payouts in crisis; the analogy translates seismology into civic arithmetic.
- **Authority and ethos** — the writer's lifetime in earthquake prediction: the essay's claims about hazard and prediction carry a practitioner's weight.
- **Direct address** — the close turns to "you", the young reader, converting an argument into an invitation.
- **Plain diction with urgency** — no jargon where a plain word works; the urgency comes from the subject, not the adjectives.

The exam question "why does the writer call research a token of survival?" is answered by the insurance logic: prediction and preparation are the difference between disaster and catastrophe, and only research produces them.""",
    """## The themes worth an essay

**Science as survival** — the central theme: research is civilisation's defence against both natural and self-made disasters. **The economics of prevention** — funding research is cheaper than funding recovery; the theme argues against the habit of cutting science in calm years. **Freedom of inquiry** — science's conditions: curiosity cannot be scheduled, and directed-only research stops producing surprises. **The scientist's responsibility** — the researcher owes society clear truth-telling, and society owes the researcher patience and support. An essay on any theme should use the insurance analogy — it is the essay's most transferable idea.""",
    """## The title, defended

"Scientific Research Is a Token of Humankind's Survival" states its claim as an equation, and the confidence is the point. The defence a candidate should write: a *token* is evidence and pledge at once — research is both the proof that humanity can outthink its dangers and the payment that guarantees it. The title's formality suits a scientist's public testimony: the sentence reads like a conclusion, and the essay's job is to earn it.""",
    """## NEB short answers, solved

**Q. Why does the writer call scientific research a token of humankind's survival? (2 marks)**
A. Because research is the mechanism by which humanity predicts and survives its disasters — earthquakes, floods, disease, famine. It is both evidence of our capacity to outthink nature and the pledge that we will: without it, survival is luck; with it, survival is policy.

**Q. What is the essay's view of the cost of research? (2 marks)**
A. That it is cheap compared with catastrophe: decades of earthquake research cost less than a single unpredicted disaster's damage. Research is insurance, and a society that cuts it in calm years is cancelling its own policy.

**Q. What conditions does science need, according to the essay? (2 marks)**
A. Steady funding that does not depend on headlines, and freedom of inquiry — the liberty to follow results wherever they lead. The essay also asks public understanding of failure, since dead ends are part of the method.

**Q. How does the essay appeal to young people? (2 marks)**
A. By offering research as a career of adventure and service: the chance to work on the planet's real problems — prediction, medicine, energy — and to matter. The close converts the argument into an invitation.

**Q. What examples of science serving survival does the essay give? (2 marks)**
A. chiefly the earth sciences: locating fault lines, assessing earthquake and flood hazards, and building prediction. The wider frame includes medicine defeating disease and engineering protecting cities — science as civilisation's early-warning system.

**Q. What is the essay's tone? (2 marks)**
A. Urgent but reasoned: a scientist's advocacy, plain in diction, persuasive by cost-benefit logic rather than alarm. The urgency belongs to the subject — disasters do not wait — while the manner stays calm.""",
    """## NEB long answers, solved

**Q. "Research is insurance paid in calm years." Explain this idea from the essay. (8 marks)**
A model answer unpacks the analogy: premiums are the steady, unglamorous funding of research during quiet decades; the payout is prediction and preparation when the disaster arrives. It should use the essay's cost-benefit logic — decades of study cost less than one unpredicted catastrophe — and draw the political conclusion the writer intends: societies that fund science only after headlines buy recovery at ruinous prices instead of protection at modest ones. The strongest answers extend the analogy honestly: insurance also requires patience (some premiums buy nothing visible for years) and trust in institutions, which is why the essay pairs funding with freedom and public understanding.

**Q. Should society fund basic research even when no immediate application is visible? Argue with reference to the essay. (8 marks)**
A model answer argues yes, from the essay's two premises: first, disasters are unpredictable, so preparedness must be built before the need is visible; second, fundamental discoveries — the essay's examples of earth science, medicine, engineering — became life-saving only after long unglamorous stages that no schedule could have justified in advance. It should concede the counter-case: resources are finite and priorities compete, and some research will dead-end. The synthesis lands on the essay's own terms: freedom and patience are the conditions of the unexpected result, and the unexpected result is precisely what survival has always depended on.""",
]

FILES = {
    "content/notes/concepts/class-11/english/literature-essays-plays/01-essay-1-sharing-tradition-frank-lapena.json": E1,
    "content/notes/concepts/class-11/english/literature-essays-plays/02-essay-2-how-to-live-before-you-die-steve-jobs.json": E2,
    "content/notes/concepts/class-11/english/literature-essays-plays/03-essay-3-what-i-require-from-life-j-b-s-haldane.json": E3,
    "content/notes/concepts/class-11/english/literature-essays-plays/04-essay-4-what-is-poverty-jo-goodwin-parker.json": E4,
    "content/notes/concepts/class-11/english/literature-essays-plays/05-essay-5-scientific-research-is-a-token-of-humankind-s-survival-vladimir-keilis-borok.json": E5,
}

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
        print(f"{path.split('/')[-1][:52]}: {before} -> {sum(len(n) for n in notes)} chars")

if __name__ == "__main__":
    main()
