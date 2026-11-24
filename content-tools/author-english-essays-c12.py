#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Native readings + solved NEB questions for the five class-12 essays.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-essays-c12.py
"""
import json

E1 = [
    """## The essay at a glance

"On Libraries" by Oliver Sacks is a memoir-essay in defence of a disappearing world: the neurologist and celebrated writer recalls a life spent inside libraries — the school library where he read everything, the great research libraries that held his working life — and argues, through memory rather than polemic, that a library is not a warehouse of books but a room in which the mind is allowed to wander. The essay's urgency comes from its ending: Sacks watches the digital age dismantle the stacks he lived in, and the elegy is also an argument — that what libraries give cannot be fully downloaded.""",
    """## The argument, step by step

The essay opens in childhood: the young Sacks, a bookish boy in a large family, finds in the library a refuge and a universe — the pleasure not just of reading but of *browsing*, of following a shelf wherever it leads, of discovering books he had not thought to want. This is the essay's first conceptual claim, made through experience: the library's gift is **serendipity** — the encounter with the unexpected — and no search engine, which gives you exactly what you asked for, can reproduce it.

The argument deepens through his student and professional years: the libraries of his education and practice are described as working landscapes — the stacks walked like territory, the familiar books met like neighbours, the reading room's silence as a form of companionship. Sacks is precise about what the room adds to the book: concentration, ritual, the company of other readers, and the physical presence of knowledge — the sense, walking the shelves, of the sum of human curiosity made visible.

The close is the lament: the digital transformation removes the books, empties the rooms, and calls it progress — and Sacks, honest enough to acknowledge the convenience, refuses the trade. His final claim is the essay's thesis: the library was not merely a delivery system for texts but a formative environment — a place that made readers, and made him — and a civilisation that replaces it with a screen has gained speed and lost a room where the mind learned to roam.""",
    """## The devices, with evidence

- **Memoir as argument** — the essay's master structure: every claim about libraries is carried by a remembered scene, so the case is made by testimony rather than assertion.
- **Nostalgia disciplined by honesty** — Sacks concedes the digital's real gains before mourning what is lost, which keeps the elegy from sentimentality.
- **Imagery of space** — the stacks, the shelves, the reading room: libraries described as architecture and landscape, the argument's central metaphor — knowledge as a place one walks.
- **Contrast** — browsing against searching, presence against access, the wanderer against the query: the pairs that carry the essay's case.
- **Elegiac tone** — the close's grief is controlled and specific: what is mourned is not books in general but a particular formative room, and the mourning makes the argument personal.

The exam question "why does Sacks value libraries?" is answered by the three gifts: serendipity of browsing, the concentration of the room, and the visible presence of the whole of human curiosity on the shelves.""",
    """## The themes worth an essay

**The library as formative environment** — the central theme: not a storehouse but a room that makes minds; Sacks's own life is the evidence. **Serendipity versus the search** — the conceptual heart: discovery of the unasked-for is the library's unique gift, and algorithmic retrieval cannot supply it. **The physical life of knowledge** — books as objects in space, shelves as territory: the theme that knowing has a geography. **Loss in the name of progress** — the elegy's civic point: a society can gain efficiency and lose an ecology of attention, and should notice the price. Write the essay with one remembered scene and one conceptual claim in each paragraph — the essay's own method.""",
    """## NEB short answers, solved

**Q. What role did libraries play in Sacks's childhood? (2 marks)**
A. They were his refuge and his universe: a bookish boy in a busy family, he found in the library both a quiet place and an inexhaustible world, where he could follow his curiosity from shelf to shelf without being told what to want.

**Q. What does Sacks mean by the pleasure of browsing? (2 marks)**
A. The serendipity of discovery: wandering the stacks and meeting books one had not thought to look for. He argues this encounter with the unexpected is the library's unique gift — a search that returns exactly what was asked for cannot reproduce it.

**Q. How does Sacks describe the atmosphere of a library? (2 marks)**
A. As a working landscape: the stacks walked like territory, familiar books met like neighbours, and the reading room's silence a form of companionship among readers. Knowledge, in his account, has a physical geography.

**Q. What is Sacks's view of the digital transformation of libraries? (2 marks)**
A. Honest but critical: he concedes the convenience of digital access, yet mourns the emptied rooms and removed books, arguing that the library was a formative environment, not merely a delivery system — and the screen cannot replace the room that made readers.

**Q. Why does the essay use personal memory rather than statistics? (2 marks)**
A. Because the argument is about formation, not efficiency: a life shaped by libraries is the strongest evidence of what libraries do. The memoir form makes the claim concrete — the reader sees the mind the library made.

**Q. What is the essay's central claim? (2 marks)**
A. That a library is not a warehouse of books but a room in which the mind learns to wander — and that replacing it with a screen gains speed while losing the ecology of attention, discovery and companionship that made readers.""",
    """## NEB long answers, solved

**Q. "A library is more than a collection of books." Discuss with reference to Sacks's essay. (8 marks)**
A model answer builds the case in three conceptual layers: serendipity (browsing produces the unasked-for discovery that a search cannot), environment (the room's silence, ritual and company shape the reading mind), and presence (the shelves make the sum of human curiosity visible and walkable). Each layer should be anchored in a remembered scene from the essay — the childhood refuge, the working stacks, the emptied room of the close. The strongest answers land the civic point: a society that trades the room for the screen should at least know what it is trading, since the loss is invisible precisely because it is formative.

**Q. "The digital age has gained access and lost serendipity." How far do you agree? (8 marks)**
A model answer agrees with the core and argues it honestly: digital access is a genuine, democratising gain — the essay's author concedes as much — but retrieval is not discovery: a search returns the asked-for, while a shelf returns the neighbouring. It should give the counter-case its weight (the internet's scale, the reader in a village with a phone), then land the synthesis: the two are complements, not substitutes — the question is whether a society that keeps the screen also keeps the room. The strongest answers use Sacks's own life as the tie-breaker: the man the libraries formed would have been searchable, but never stumbled.""",
]

E2 = [
    """## The essay at a glance

"Marriage as a Social Institution" by Stephen L. Carter argues against the modern habit of treating marriage as a purely private arrangement between two adults. Carter, a legal scholar, contends that marriage is an **institution** — a publicly defined status with obligations, recognition and meaning that exceed the couple's preferences — and that a society which dissolves marriage into private contract weakens one of the few structures that bind individuals into obligation. The essay is a defence of the institution against two reductions at once: the libertarian reduction (marriage is only what the couple makes of it) and the purely romantic one (marriage is only love).""",
    """## The argument, step by step

The essay opens on the reduction it opposes: the contemporary view of marriage as a private commitment, dissolvable at will, meaningful only to the parties. Carter's first move is definitional: an institution is not a feeling but a structure — with entry rules, public recognition, expected duties and a meaning that outlives any couple's mood. Marriage, on this account, is the state and the community conferring a status, not merely witnessing a preference.

From the definition flows the argument's substance: because marriage is public, it carries obligations the couple did not individually invent — fidelity, support, the presumption of permanence — and these obligations are the institution's value. A commitment that means only what the parties want it to mean binds nothing; the institution's rigidity is precisely what makes the promise strong. Carter extends the point to children and society: marriage is the social technology by which families are stabilised and supported, and its weakening is not a private matter but a public one.

The essay closes on the stakes: if marriage is only a private arrangement, then the state has no reason to support it and society no reason to honour it — and the institution, deprived of public meaning, withers. Carter's defence is therefore also a warning: what a society treats as merely private, it eventually ceases to have.""",
    """## The devices, with evidence

- **Definition as argument** — the essay's master move: the whole case turns on establishing what an institution is, and the definition does the work of the persuasion.
- **Dialectic structure** — the reduction stated fairly, then answered: Carter presents the private-commitment view at its strongest before dismantling it, which is why the essay persuades rather than lectures.
- **Conceptual distinction** — marriage as status versus marriage as contract; commitment as feeling versus commitment as obligation: the essay's analytical spine.
- **Public-interest reasoning** — the argument's reach beyond the couple: children, community, and the state's stake in the institution.
- **Measured tone** — the legal scholar's voice: no nostalgia-mongering, no moralising — the case is made from the concept's consequences.

The exam question "why does Carter call marriage a social institution?" is answered by the definition: because it is a publicly conferred status with obligations and meaning that exceed the couple's private preferences — and those excess obligations are its strength.""",
    """## The themes worth an essay

**Institution versus private arrangement** — the central theme: the difference between a status conferred by society and a contract invented by two people, and why the difference matters. **Obligation as value** — the conceptual heart: a promise binds only when it means more than the promiser's current preference; the institution's permanence is what gives the vow force. **The public stake in private life** — marriage as social technology: families, children and community depend on a structure that exceeds any couple. **What society honours, it keeps** — the closing warning: public meaning is the institution's oxygen, and its loss is the institution's loss. Anchor the essay in the definition and the obligation argument, and the conceptual depth carries the marks.""",
    """## NEB short answers, solved

**Q. What does Carter mean by calling marriage a social institution? (2 marks)**
A. That marriage is a publicly defined status — with entry rules, social recognition, expected duties and a meaning that outlives the couple's preferences — rather than a purely private arrangement. Society confers the status, and the conferring is what gives the promise its force.

**Q. How does Carter distinguish marriage from a mere contract? (2 marks)**
A. A contract is whatever the parties agree it is, dissolvable when preferences change; an institution carries obligations the couple did not individually invent — fidelity, support, the presumption of permanence. The excess obligation is what makes the marriage promise stronger than a private deal.

**Q. Why does Carter value the obligations of marriage? (2 marks)**
A. Because a commitment that means only what the parties currently want binds nothing: the institution's expectations are what make the vow reliable. Obligation, in his argument, is not the enemy of love but the structure that lets love be trusted.

**Q. What is the public stake in marriage, according to the essay? (2 marks)**
A. The stabilisation of families and the support of children: marriage is a social technology that binds individuals into durable obligation, and its weakening is a public loss, not merely a private one.

**Q. What happens if marriage is treated as purely private? (2 marks)**
A. The state loses its reason to support it and society its reason to honour it: deprived of public meaning, the institution withers. Carter's warning is that what a society treats as merely private, it eventually ceases to have.

**Q. What two reductions does the essay oppose? (2 marks)**
A. The libertarian reduction — marriage is only what the couple makes of it — and the purely romantic reduction — marriage is only love. Against both, Carter defends the institutional view: a public status with obligations that exceed feeling and preference.""",
    """## NEB long answers, solved

**Q. "Marriage is a public status, not a private preference." Present Carter's argument in your own words. (8 marks)**
A model answer reconstructs the argument's steps: the definition (institution as publicly conferred status with duties), the distinction (contract versus institution), the value claim (obligation beyond preference is what makes the promise binding), and the public-interest extension (children and community depend on the structure). It should present the opposing view fairly before answering it — the essay's own dialectic method — and close on the warning: a society that dissolves marriage into private choice loses the one structure that makes lifelong promises credible. The strongest answers keep the tone analytic, as Carter does: the case rests on consequences, not nostalgia.

**Q. "The weakening of marriage is a public matter, not a private one." How far do you agree? (8 marks)**
A model answer agrees with Carter's reasoning and builds it: the institution's obligations exist to protect those who cannot protect themselves — children chiefly — and its erosion therefore has victims beyond the couple. It should concede the counter-case honestly: the private-commitment view answers to real harms (unhappy unions once trapped people, especially women), and flexibility has genuine value. The synthesis lands on Carter's distinction: the question is not whether marriage should be hard to leave but whether it should *mean* something public — and a society can keep the exit while restoring the honour. The strongest answers end on the conceptual point: institutions survive on public meaning, and meaning is a collective act.""",
]

E3 = [
    """## The essay at a glance

"Knowledge and Wisdom" by Bertrand Russell is a philosopher's attempt to separate two words the modern world uses interchangeably — and the separation is the essay's whole argument. Knowledge, Russell says, is what can be taught and examined: facts, skills, methods. Wisdom is the capacity to use knowledge well — to weigh ends, to see consequences, to be freed from the tyranny of the personal. The essay's examples are its power: the technician who perfects a lethal invention, the specialist who knows everything about a fragment and nothing about the whole. Russell's claim is that education pursues knowledge and neglects wisdom at civilisational peril — and that wisdom, though elusive, can be taught.""",
    """## The argument, step by step

The essay opens by defining its two terms with a philosopher's economy: knowledge is the accumulation of information and skill; wisdom is the right application of knowledge to living — the choice of ends as well as means. The distinction is immediately given teeth by example: several people can hold the same knowledge, and what differs — catastrophically — is the wisdom with which it is used.

The examples are the essay's centre. Russell's technicians know *how* and not *whether*: the maker of a vaccine who could also make a plague, the specialist whose knowledge of one fragment blinds him to the whole — each case demonstrates that knowledge without wisdom is not neutral but dangerous, since capacity enlarges the consequences of judgment. The essay's historical examples make the point civilisational: great knowledge in unwise hands has served destruction as efficiently as service.

Then the constructive turn: what is wisdom, and can it be taught? Russell analyses it into components — a sense of proportion (seeing one's fragment in the whole), an awareness of the ends of life, and emancipation from personal prejudice — and argues that these are teachable, not mystical: the study of history, of other minds, of the largeness of the world enlarges the circumference of concern. The close states the essay's educational thesis: knowledge and wisdom must be pursued together, because knowledge without wisdom is power without aim — and a civilisation that optimises its means while forgetting its ends is not advancing but accelerating.""",
    """## The devices, with evidence

- **Definition and distinction** — the essay's master method: two terms sharpened against each other until the boundary is visible, and the boundary is the argument.
- **Exemplification** — the essay's power supply: the technician, the specialist, the historical case — each example a proof that knowledge's value depends on the wisdom directing it.
- **Logical progression** — definition, problem, analysis, remedy: the essay's architecture is a philosophical argument in miniature, each step earned.
- **Antithesis** — knowledge against wisdom, means against ends, the fragment against the whole: the pairs that structure every paragraph.
- **Aphoristic close** — the educational thesis compressed into memorable form: the essay practises the compression it recommends.

The exam question "what is the difference between knowledge and wisdom?" is answered by Russell's own line: knowledge is the possession of facts and skills; wisdom is their right use — the choice of ends, the sense of proportion, the freedom from prejudice.""",
    """## The themes worth an essay

**Knowledge without wisdom is dangerous** — the central theme: capacity enlarges consequence, so judgment, not information, is the scarce resource. **The specialist's blindness** — the conceptual heart: mastery of a fragment without a sense of the whole produces the modern world's most confident errors. **Emancipation from the personal** — wisdom as the enlargement of concern: the move from "my advantage" to the whole's. **Education's responsibility** — the closing thesis: schools that teach means without ends produce efficient barbarians; the curriculum must pursue both. Anchor the essay in one example — the technician is best — and let the distinction do the philosophising.""",
    """## NEB short answers, solved

**Q. How does Russell define knowledge? (2 marks)**
A. As the accumulation of information and skill: facts, techniques and methods that can be taught, learned and examined. Knowledge, in his definition, is capacity — and capacity alone says nothing about the ends it serves.

**Q. How does Russell define wisdom? (2 marks)**
A. As the right use of knowledge in living: the choice of worthy ends, a sense of proportion that sees the fragment in the whole, and emancipation from personal prejudice. Wisdom is judgment about what knowledge should do.

**Q. Why is knowledge without wisdom dangerous? (2 marks)**
A. Because capacity enlarges consequence: the same skill that serves can destroy, and the technician who knows how but not whether delivers either according to the judgment directing him. Knowledge is power; wisdom decides the aim of the power.

**Q. What is the specialist's blindness? (2 marks)**
A. The narrowing of vision that expertise produces: mastery of a fragment accompanied by ignorance of the whole, so that the specialist optimises his piece while missing its effect on the system. Russell presents this as the modern mind's characteristic error.

**Q. Can wisdom be taught? (2 marks)**
A. Russell believes it can: its components — a sense of proportion, awareness of ends, freedom from prejudice — are cultivated by studying history, other minds and the largeness of the world. Wisdom is not mystical; it is the enlargement of concern, and enlargement can be educated.

**Q. What is the essay's final message for education? (2 marks)**
A. That knowledge and wisdom must be pursued together: education that teaches means without ends produces efficient barbarians. A civilisation optimising its means while forgetting its ends is not advancing but accelerating toward its own choosing.""",
    """## NEB long answers, solved

**Q. "Knowledge without wisdom is power without aim." Discuss with reference to Russell's examples. (8 marks)**
A model answer builds from the definitions (knowledge as capacity, wisdom as judgment) and works the examples as proofs: the technician whose skill serves health or plague depending on the ends chosen; the specialist whose fragment-mastery blinds him to the whole; the historical cases where great knowledge served destruction efficiently. It should draw the conceptual point — capacity is symmetric between good and harm, so the asymmetry must come from judgment — and extend to the present (the reader may supply any modern technology). The strongest answers land on the educational thesis: since the examples show knowledge amplifying whatever wisdom directs it, the curriculum that neglects wisdom amplifies nothing safely.

**Q. According to Russell, what are the components of wisdom, and how can they be developed? (8 marks)**
A model answer enumerates the components and their cultivation: a sense of proportion (developed by studying history and the scale of the world, so the fragment is seen within the whole); awareness of the ends of life (developed by philosophy, literature and the study of other minds, so means are judged by purposes); and emancipation from personal prejudice (developed by the deliberate exercise of imagining the world from positions other than one's own). It should argue the teachability claim — these are practices, not gifts — and close on the essay's balance: wisdom does not replace knowledge; it steers it, and both are needed because power without aim and aim without power are equally useless.""",
]

E4 = [
    """## The essay at a glance

"Humility" by Yuval Noah Harari is a historian's demolition of self-importance: most people, he argues, believe themselves the centre of the universe — their nation the most important, their religion the true one, their story the main plot of history — and the belief is not only false but catastrophic. Harari's method is comparative and satirical: he shows that every culture tells itself the same flattering story, which is proof that none of them is the truth. The essay's conclusion is the title: humility — the recognition that you are a small, recent, local part of an enormous story — is not modesty's decoration but the first requirement of sanity in the twenty-first century.""",
    """## The argument, step by step

The essay opens on the diagnosis: nearly everyone overestimates their own centrality. Harari frames it as a universal illusion — the belief that my group, my story, my suffering and my triumphs are the axis of history — and illustrates it with the mirror trick: every culture's history textbook places itself at the centre, which is statistically impossible and psychologically universal.

The argument then deepens from individuals to civilizations: religions and nations claim to be the main character of the human story; each morality narrates the universe with itself as protagonist. Harari's satirical examples do the work — the patriot, the believer, the nationalist historian each mistaking their chapter for the book — and the essay's humour is its scalpel: the absurdity is visible only when two centrisms are placed side by side, each equally certain.

The close is the constructive turn: humility as corrective. Harari is careful to define it — not self-contempt or passivity, but proportion: the honest sense of one's small place in time, space and consequence. The claim is practical, not pious: a species with planetary power and provincial self-understanding is dangerous; the humility to see ourselves as one recent local voice among billions is the precondition for solving problems that ignore our boundaries. The essay ends where the century begins: our power has outgrown our self-knowledge, and humility is the only adequate correction.""",
    """## The devices, with evidence

- **Satire** — the essay's master tone: the self-important patriot and the centre-of-history culture are held up until their symmetry makes the absurdity visible; the humour is analytic, not mocking for its own sake.
- **The mirror argument** — the essay's logical engine: since every culture tells the same flattering story about itself, the story cannot be true; centrism is exposed by its universality.
- **Example and counter-example** — religions, nations and moralities compared side by side, each certain of its centrality: the comparative method that dissolves certainty.
- **Definition discipline** — humility carefully separated from self-contempt and passivity: the essay's constructive claim stays precise.
- **Sweeping historical framing** — the species-level view: Harari's signature move of zooming out until the local certainty looks small, which is both the method and the message.

The exam question "why does Harari call for humility?" is answered by the mismatch: our power is planetary while our self-understanding is provincial, and the correction — seeing ourselves as one small, recent voice among billions — is the precondition of survival, not a moral decoration.""",
    """## The themes worth an essay

**The illusion of centrality** — the central theme: the universal human habit of placing one's own group at the axis of history, and the comparative proof that the habit, not the claim, is what is universal. **Humility as proportion** — the conceptual heart: humility defined as accurate self-measurement rather than self-abasement; the essay's constructive contribution. **Power outrunning self-knowledge** — the modern stakes: a species with global capacity and tribal self-image is the century's defining danger. **The relativity of moral stories** — every culture's narrative is one among many; the theme that recognising this is not relativism's despair but the beginning of conversation. Anchor the essay in the mirror argument and the definition of humility, and the conceptual depth is automatic.""",
    """## NEB short answers, solved

**Q. What illusion does Harari say most people live under? (2 marks)**
A. The illusion of centrality: the belief that one's own nation, religion, culture or self is the most important element of the human story. He shows by comparison that every group tells itself the same flattering story — which proves the story is a habit, not a truth.

**Q. How does Harari use the comparison of cultures? (2 marks)**
A. As a mirror argument: since every culture's history places itself at the centre, no culture's history can be the objective account. The universality of the self-flattering story is the evidence that it is psychological, not factual.

**Q. What is humility, according to Harari? (2 marks)**
A. Not self-contempt or passivity but proportion: the honest recognition that one is a small, recent, local part of an enormous story. Humility is accurate self-measurement — seeing one's real size in time, space and consequence.

**Q. Why is humility practically necessary in the modern age? (2 marks)**
A. Because human power has become planetary while self-understanding remains provincial: a species capable of shaping the whole planet cannot afford tribal self-image. Solving global problems requires seeing past the boundaries our centrism draws.

**Q. What is the role of satire in the essay? (2 marks)**
A. It is the essay's analytic instrument: placing rival certainties side by side until their symmetry exposes the absurdity. The humour makes the diagnosis bearable and the argument memorable — the reader laughs at the patriot and then recognises the patriot in the mirror.

**Q. Does humility mean thinking little of yourself? (2 marks)**
A. No — Harari distinguishes it explicitly from self-contempt: humility is not thinking less of yourself but thinking of yourself less, and measuring yourself accurately. The essay's claim is corrective, not punitive.""",
    """## NEB long answers, solved

**Q. "Every culture thinks it is the centre of the universe — and that is why none is." Explain Harari's argument. (8 marks)**
A model answer reconstructs the mirror logic step by step: the observation (each culture's self-narration places it at the axis of history), the statistical impossibility (centrality claimed by all is possessed by none), and the inference (the centrism is a psychological universal, not a factual report). It should use the essay's satirical examples — the patriot, the believer, the national history — and draw the epistemological conclusion: certainty that is universal across contradictory claims is evidence of bias, not truth. The strongest answers extend to the practical stakes: since the illusion is universal, no one is immune, and the correction — comparison, proportion, humility — must be deliberately practised.

**Q. "Humility is not self-contempt but accurate self-measurement." Discuss with reference to the essay. (8 marks)**
A model answer defends the definition: humility as proportion — the honest sense of one's small place in time, space and consequence — distinguished explicitly from passivity, self-hatred and the denial of agency. It should show why the distinction matters practically: self-contempt paralyses, while accurate self-measurement enables action at the right scale; and it should use the essay's framing (planetary power, provincial self-image) to argue that the modern age needs the corrective more than any before it. The strongest answers land on the balance: Harari is not asking readers to think their lives meaningless but to see them accurately — small, real, and therefore responsible.""",
]

E5 = [
    """## The essay at a glance

"Human Rights and the Age of Inequality" by Samuel Moyn is a historian's indictment of the human rights movement's greatest failure: while the world's wealth concentrated at rates unseen in a century, the human rights project — courts, covenants, campaigns — said almost nothing. Moyn's argument is historical and conceptual: the Universal Declaration of 1948 promised social rights and welfare states, but the movement that rose in the 1970s deliberately narrowed the vision, pursuing a minimal floor of protection while abandoning any challenge to the soaring gap between rich and poor. The essay's claim is that human rights, as currently practised, are compatible with inequality — and that a movement for human dignity that tolerates the new gilded age has made a bargain it should not have.""",
    """## The argument, step by step

The essay opens on the paradox that organises everything: the human rights movement's triumph — treaties, institutions, global language — coincided exactly with the era of exploding inequality. If human rights were the safeguard of human dignity, the two trends should not fit together; Moyn's task is to explain why they do.

The explanation is historical. The mid-century moment — the Universal Declaration, the welfare state — imagined rights expansively: social guarantees of work, housing, health, a fair share. But the movement that revived human rights in the 1970s, under dictatorship and then after the Cold War, narrowed the agenda deliberately: civil and political liberties, and a **minimalist floor** — protection against atrocity and destitution — rather than any claim about distribution. Minimalism was a strategy for consensus in a hostile age, and it worked; the cost was that the movement had nothing to say about how the pie was sliced, only about keeping everyone above starvation.

The conceptual turn is the essay's sharpest point: the floor-and-ceiling metaphor. Human rights built a floor beneath which no one should fall — and left the ceiling unbounded, so that the space between floor and sky became the playground of the new oligarchy. Moyn's conclusion is a demand, not a lament: the human rights movement must re-link dignity to distributive justice — to equality, not merely sufficiency — or accept that it has become the moral alibi of an unequal age.""",
    """## The devices, with evidence

- **The paradox structure** — the essay's master organisation: the triumph of human rights set against the explosion of inequality, and the essay's whole task the explanation of their coexistence.
- **Historical argument** — the 1948 expansive vision against the 1970s narrowing: the conceptual claim carried by documented history, which is Moyn's discipline's signature.
- **The floor-and-ceiling metaphor** — the essay's most quotable idea: rights as a minimal floor beneath which none should fall, with the ceiling left unbounded — the image that compresses the entire critique.
- **Conceptual distinction** — sufficiency against equality: the movement protects the minimum but forswears the distribution, and the distinction is where the failure lives.
- **Critical, measured tone** — the historian's voice: the movement is not mocked but mourned — the critique comes from inside the tradition, which is what gives it force.

The exam question "what is Moyn's criticism of the human rights movement?" is answered by the minimalism claim: it secured a floor while abandoning equality, and a dignity movement compatible with oligarchy has made the wrong bargain.""",
    """## The themes worth an essay

**Rights versus equality** — the central theme: the distinction between protecting everyone's minimum and questioning the distribution of everything, and the movement's choice of the first. **The history of a narrowing** — the 1948 promise against the 1970s retreat: the theme that the movement's limits were chosen, not inherent. **The floor and the ceiling** — the conceptual image: a guaranteed minimum under an unbounded maximum, the architecture of the new gilded age. **Dignity demands distribution** — the closing demand: human dignity cannot be secured at subsistence while others hold astronomical surplus; the essay's re-linking of rights to economic justice. Anchor the essay in the paradox and the floor metaphor, and the argument demonstrates itself.""",
    """## NEB short answers, solved

**Q. What paradox does Moyn set up at the start? (2 marks)**
A. That the human rights movement's greatest triumph — treaties, institutions, universal language — coincided exactly with the era of exploding inequality. A movement for human dignity should not fit comfortably alongside a new gilded age, and Moyn's essay explains why it did.

**Q. What did the 1948 Universal Declaration imagine? (2 marks)**
A. An expansive vision: alongside civil and political liberties, social rights — work, housing, health, a fair share of the common wealth — embedded in the welfare-state settlement. The early promise linked rights to distribution, not merely protection.

**Q. How did the human rights movement narrow its agenda? (2 marks)**
A. Deliberately, from the 1970s: focusing on civil and political liberties and a minimal floor — protection against atrocity and destitution — while forswearing any claim about economic distribution. Minimalism was a consensus strategy for a hostile age, and it cost the movement its economic vision.

**Q. What is the floor-and-ceiling metaphor? (2 marks)**
A. Human rights built a floor beneath which no one should fall — the minimum of subsistence and protection — while leaving the ceiling unbounded, so the space between became the playground of the new oligarchy. The metaphor compresses the critique: guarantees below, inequality above.

**Q. What is the difference between sufficiency and equality? (2 marks)**
A. Sufficiency is everyone having enough to survive decently; equality is a claim about how the whole is distributed. Moyn's charge is that the human rights movement adopted sufficiency and abandoned equality — keeping everyone above the floor while tolerating astronomical heights.

**Q. What does Moyn demand of the movement? (2 marks)**
A. That it re-link human dignity to distributive justice: to speak again about equality, not merely sufficiency — or accept that a rights movement compatible with oligarchy has become the moral alibi of an unequal age.""",
    """## NEB long answers, solved

**Q. "The human rights movement chose minimalism, and the choice had a price." Trace the history Moyn gives. (8 marks)**
A model answer reconstructs the arc: the expansive 1948 moment (social rights embedded in the welfare-state vision), the 1970s revival under dictatorship (when minimalism was the achievable consensus), and the post-Cold War triumph (when the narrowed agenda became the movement's identity rather than its strategy). It should explain the logic of each stage — minimalism was rational in a hostile age — and then deliver the essay's charge: what began as strategy hardened into doctrine, leaving the movement speechless before inequality. The strongest answers end on the floor-and-ceiling image: the floor was built, the ceiling was left to the market, and the space between is where the age lives.

**Q. "Human dignity cannot be secured at subsistence while others hold astronomical surplus." How far do you agree? (8 marks)**
A model answer agrees with Moyn's core and builds it conceptually: dignity is comparative as well as absolute — a floor that guarantees survival while others rise beyond all proportion makes equality of respect impossible, and political power follows wealth, so the unbounded ceiling corrodes the very rights the floor protects. It should concede the counter-case: minimal protections are real achievements, and the poor of history would not trade them for a manifesto. The synthesis lands on the essay's demand: the achievements are necessary and insufficient — sufficiency without a claim about distribution leaves the architecture of inequality standing, and a movement for dignity must eventually talk about the ceiling.""",
]

FILES = {
    "content/notes/concepts/class-12/english/literary-analysis/13-essay-1-on-libraries-oliver-sacks.json": E1,
    "content/notes/concepts/class-12/english/literary-analysis/14-essay-2-marriage-as-a-social-institution-stephen-l-carter.json": E2,
    "content/notes/concepts/class-12/english/literary-analysis/15-essay-3-knowledge-and-wisdom-bertrand-russell.json": E3,
    "content/notes/concepts/class-12/english/literary-analysis/16-essay-4-humility-yuval-noah-harari.json": E4,
    "content/notes/concepts/class-12/english/literary-analysis/17-essay-5-human-rights-and-the-age-of-inequality-samuel-moyn.json": E5,
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
