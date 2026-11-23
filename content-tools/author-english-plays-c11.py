#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Native readings + solved NEB questions for the three class-11 one-act plays.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-plays-c11.py
"""
import json

P1 = [
    """## The play at a glance

"Trifles" by Susan Glaspell (1916) is a one-act murder investigation in which the detectives fail and the wives succeed — and the failure is the point. John Wright has been strangled in his farmhouse bed; his wife Minnie Foster Wright is the suspect. The men — the County Attorney, the Sheriff and the neighbour Mr. Hale — search the bedroom and the barn for a motive; the women, waiting downstairs in the kitchen, find it in the objects the men dismiss as trifles: a ruined preserve jar, a botched quilt stitch, an empty birdcage, and a dead canary with its neck wrung. The play's argument is in that contrast: what men call trifles are the record of a woman's destroyed life.""",
    """## The action, scene by scene

The play opens in the Wrights' bleak, disordered kitchen the day after the murder. Mr. Hale narrates his visit of the previous day: John Wright dead with a rope around his neck, Minnie rocking and answering oddly — she said she did not wake because her husband slept soundly, and that she did not know who did it. The men assume the case needs a motive and go upstairs to hunt for it, leaving the women to gather clothes for the prisoner.

The women's investigation is accidental and complete. They start with sympathy and objects: the preserves broken by the cold because the fire went out — trifles, the County Attorney says, and the women feel his dismissal. The quilt: Mrs. Hale wonders whether Minnie was going to *knot* it or *piece* it — a question the men laugh at and the audience should not, because the stitching shows her mind: even stitches, then sudden crazy irregular ones, the record of a nerve breaking. The birdcage: hinge pulled, door broken — someone violent got the bird out. And in a pretty box, wrapped in silk: the canary, dead, its neck wrung — killed the way John Wright was killed.

The men return, find nothing, and mock the women's worry over the quilt. The women's decision completes the play: Mrs. Hale hides the bird in her pocket when no one is looking — the evidence, and the motive, stays with the sisterhood. The last lines: the County Attorney, still joking about the quilt — "knot it" — has no idea he has been answered.""",
    """## The devices, with evidence

- **Symbolism** — the play's master device: the canary is Minnie Foster herself, the girl who sang in the choir before John Wright's silence caged her; the broken cage is the marriage; the wrung neck is what the marriage did; the unfinished quilt is her mind mid-collapse; the cold kitchen and exploded preserves are the household's stopped life.
- **Dramatic irony** — the men search the whole farm for evidence while the evidence sits in the kitchen they mock; the audience sees what they cannot, and their superiority becomes their blindness.
- **The title's irony** — "trifles" is the men's word for the women's world, and the trifles solve the case: the word intended as dismissal turns out to be the diagnosis.
- **Offstage characters** — John Wright and Minnie never appear, yet the play is entirely about them: a masterclass in presence built from absence.
- **Setting** — the kitchen as the stage: the domestic space the men ignore is the play's whole world, and the staging itself makes the feminist argument.

The exam question "what do the trifles symbolise?" is answered by the chain above — bird, cage, quilt, preserves — each object a fact of Minnie's life the men never thought to read.""",
    """## The characters worth an essay

**Mrs. Hale** is the play's conscience: she knew Minnie Foster as the girl who sang, married a man like "a raw wind" into twenty years of silence, and feels the guilt of the neighbour who never visited. Her decision to hide the bird is the play's moral climax — jury duty performed in a kitchen.

**Mrs. Peters** is the conversion story: the sheriff's wife begins by defending law and ends by breaking it, moved by memories of her own dead child and a boy with a hatchet — she knows what quiet desperation does. Her shift from "the law has got to punish" to silent complicity is the play's argument that understanding changes justice. **The men** — County Attorney, Sheriff, Hale — are competent, confident and entirely wrong: Glaspell gives them good intentions and zero perception, which is the play's indictment of a justice system that cannot see a woman's life. **Minnie Foster Wright**, never seen, is the play's centre: singer, then caged bird, then the strangler of her cage.""",
    """## The themes worth an essay

**Justice versus law** — the central theme: the women find the truth the law cannot see, and the play asks whether concealing evidence can be the more just act. **The oppression of women** — Minnie's life is the case study: childless, voiceless, isolated on a lonely farm, married to a man who silenced her song; the trifles are the archaeology of that oppression. **Female solidarity** — the two women, strangers at the start, conclude the play as conspirators; understanding builds across the kitchen faster than authority can build upstairs. **Perception and blindness** — the men's professional confidence versus the women's attention to detail; the theme argues that seeing depends on caring. Weave two of these with the canary image and the essay stands.""",
    """## NEB short answers, solved

**Q. Why do the men fail to find the motive? (2 marks)**
A. Because they search for evidence in the men's world — the bedroom, the barn, the outdoors — and dismiss the kitchen as unimportant. The motive lies in the domestic details they call trifles, and their contempt for that world is precisely what blinds them.

**Q. What is the significance of the dead canary? (2 marks)**
A. The canary was Minnie's only companionship and voice after twenty silent years — the bird she once was, a girl who sang in the choir. John Wright wrung its neck, and the act replayed what his marriage had done to her; the bird's death is the motive the men never find.

**Q. What does the quilt symbolise? (2 marks)**
A. Minnie's state of mind: her stitching runs even and calm, then suddenly crazy and irregular — the record of a mind breaking. The question of whether she would knot it or piece it becomes the play's last irony, spoken by the man who understands none of it.

**Q. Why do the women hide the evidence? (2 marks)**
A. Because they understand what the men cannot: Minnie was driven to the act by years of cruelty and isolation, and the law would punish her without ever understanding her. Hiding the bird is their verdict — sympathy over procedure.

**Q. How does the title "Trifles" carry the play's meaning? (2 marks)**
A. Ironic on every level: the men use the word to dismiss the women's concerns, yet the trifles — preserves, quilt, cage, bird — contain both the motive and the truth. The play's argument is that what one sex calls trifles is the other sex's whole life.

**Q. What is the role of the offstage characters? (2 marks)**
A. John Wright and Minnie never appear, yet they are the play's subject: Wright is characterised entirely through others' memories, and Minnie through the objects she left. The technique shows that a life can be read from its traces — which is exactly what the women do.""",
    """## NEB long answers, solved

**Q. "The kitchen holds the truth the men cannot find." Discuss how the setting and the trifles solve the case. (8 marks)**
A model answer treats the kitchen as the play's real crime scene and walks the evidence in order: the broken preserves (the fire's neglect, the household's stopped rhythm), the quilt's crazy stitching (the mind's record), the broken birdcage hinge (violence in the marriage), and the dead canary (the motive, mirroring the murder). It should set each object against the men's dismissal and note the dramatic irony of the search happening upstairs while the answer waits below. The strongest answers close on the staging as argument: Glaspell keeps the entire play in the domestic space the law ignores, so the play's form performs its thesis.

**Q. "Understanding changes justice." Compare the attitudes of the men and the women in the play. (8 marks)**
A model answer contrasts the two investigations: the men hunt a legal motive with professional confidence and find nothing, while the women begin with sympathy and discover the truth through shared experience — Mrs. Peters' memories of her dead child and the boy with the hatchet convert her from defender of law to keeper of the bird. It should trace Mrs. Hale's guilt (the neighbour who never visited, the girl who sang) as the engine of her mercy, and end on the play's question: the women's concealment is law-breaking, yet the play frames it as the only justice available to Minnie — understanding, once achieved, cannot hand her over.""",
]

P2 = [
    """## The play at a glance

"A Sunny Morning" by Serafín and Joaquín Álvarez Quintero is a one-act romantic comedy set in a Madrid park on an autumn morning. Don Gonzalo, a crotchety old gentleman, and Doña Laura, a sharp-tongued old lady, collide over a park bench — and discover, through a web of polite lies, that they were lovers decades ago. Neither admits the recognition; each invents a flattering death for the other's younger self; and the play ends with the two of them planning to meet again. It is a comedy about vanity, memory and love outliving its own obituary.""",
    """## The action, scene by scene

The play opens on comedy of manners: Don Gonzalo enters grumbling — the pigeons ate his breadcrumbs, the priests took his bench — and finds Doña Laura installed on his usual seat. Their first exchanges are comic warfare: she calls him a "senile grouch"; he retaliates with courtesy sharpened into insult; she reads her book with "magnificent" disdain. The truce comes through the snuffbox: he drops his silver snuffbox; she picks it up — and recognises it, because she gave it to him long ago.

The middle of the play is a duel of invented biographies. He claims to be a park gardener; she claims to read like a scholar. Then the past surfaces in code: she mentions the "Silver Maiden" — her girlhood name — and tells of a gallant young man who used to wait for her, bringing flowers and writing verses; she says (lying, to test him) that the young man went off and died. He answers in kind: the maiden, he says, died of grief shortly after — both protecting the present from the past's awkwardness while confirming it entirely.

The recognition completes itself in details: the snuffbox engraved and given in Valencia; the songs they once sang; her habit of scattering breadcrumbs to the doves, which he remembers. The close is gentle comedy: they agree, with elaborate innocence, that they were neighbours' children who knew each other slightly — and arrange, as strangers, to meet again next morning in the same park. The doves, the autumn sun and the renewed appointment carry the play's optimism: love postponed is not love dead.""",
    """## The devices, with evidence

- **Dramatic irony** — the play's engine: the audience watches two people lie to each other about the one thing they both know, and every "as a gardener I have no education" lands twice — once for the listener on stage, once for the audience in on the truth.
- **Wit and repartee** — the couple's weapon and their courtship: the bench quarrel is a flirting ritual in disguise, and the insults are more intimate than politeness would be.
- **Comic mask** — the invented identities (gardener, distant admirer) let each character test the other without risking dignity: the lies are the play's courtship protocol.
- **Symbolism** — the doves (love, and the feeding habit that gives her away), the autumn morning (age with warmth still in it), the silver snuffbox (the past kept in a pocket for fifty years).
- **Dialogue as action** — almost nothing happens physically; the whole drama is conducted in speech, which is why the play is a masterclass in subtext.

The exam question "why do the old couple lie to each other?" is answered by the vanity-and-terror logic: each fears the other's judgment of what age has done, and the lie preserves both the dignity and the second chance.""",
    """## The characters worth an essay

**Doña Laura** is wit wrapped in white hair: sharp-tongued, vain, quick to fence and quicker to fall — her anger at the bench softens the moment the snuffbox appears, and her lies are more elaborate than his because she has more to protect (the "Silver Maiden" was a reputation as well as a romance).

**Don Gonzalo** is grumpiness as armour: he enters complaining about pigeons, priests and the world, and exits arranging a rendezvous with a woman he has officially never met. His invention — the young lover died in a duel, honorably — is a self-portrait of how he would have liked to be loved. **The pair together** is the play's real character: a courtship resumed after half a century, conducted entirely in irony because direct speech would break the spell. Note what the Quintero brothers do not do: they never let the old age be tragic. The comedy insists that desire and playfulness survive wrinkles.""",
    """## The themes worth an essay

**Love outlasting time** — the central theme: the lovers' recognition survives fifty years, disguises and mutual lies; the doves and the snuffbox prove memory is stronger than ageing. **Vanity and dignity in old age** — the lies are comic but human: neither wants to be seen as diminished, so each invents a glorious version of the other's past. **The comedy of recognition** — the play's structure: quarrel, truce, discovery, mutual fiction, renewed appointment; the classic comedy arc compressed into one morning. **Loneliness and second chances** — beneath the wit, two solitary people seizing an improbable reunion; the theme that keeps the comedy warm rather than brittle.""",
    """## NEB short answers, solved

**Q. How do Don Gonzalo and Doña Laura first meet? (2 marks)**
A. In conflict over a park bench: he grumbles that the pigeons ate his crumbs and the priests took his seat, and finds her installed where he usually sits. Their exchange of polite insults is comic warfare that turns, by way of a dropped snuffbox, into recognition.

**Q. What is the significance of the silver snuffbox? (2 marks)**
A. It is the token of the past: the box she once gave him, kept for decades and dropped by accident in front of her. Her picking it up and recognising it is the play's turning point — the moment the present makes contact with the romance it forgot.

**Q. Why do they invent false identities? (2 marks)**
A. To protect their dignity and test each other safely: neither wants to be judged by what the years have done, and neither is sure of the other's feelings. The lies — gardener, grieving maiden — let the old lovers resume courtship without admitting the past.

**Q. What lies do they tell about each other's fates? (2 marks)**
A. She says her young lover went away and died; he says the Silver Maiden died of grief shortly after. Each invents an honourable death for the other's younger self — flattering fictions that confirm the recognition while shielding the present.

**Q. How does the play end? (2 marks)**
A. With a renewed appointment: the two, still pretending to be strangers who were childhood neighbours, agree to meet again the next morning in the park. The comedy closes on hope — the romance is postponed, not finished.

**Q. What do the doves represent in the play? (2 marks)**
A. Love and continuity: Laura's habit of feeding them is the detail Gonzalo remembers, and their presence on the autumn morning suggests warmth persisting into age. The doves are the play's gentle emblem of affection that survives time.""",
    """## NEB long answers, solved

**Q. "The play is a comedy of recognition." Trace the steps by which the old couple discover each other. (8 marks)**
A model answer maps the arc: the bench quarrel (courtship in the grammar of insult), the truce over the snuffbox (the physical token of the past), the coded exchange about the Silver Maiden and the gallant young man (each testing the other's memory), the confirming details (the breadcrumbs, the songs, Valencia), and the mutual fictions that let recognition proceed without confession. It should note the dramatic irony throughout — the audience knows what the characters will not say — and close on the ending's function: the renewed appointment converts recognition into a second chance, which is what makes the play a comedy rather than an elegy.

**Q. "Old age in the play is comic, not tragic." Discuss. (8 marks)**
A model answer agrees and gathers the evidence: the couple's energy in quarrelling, the vanity that invents honourable deaths, the playfulness of pretending to be strangers, and the ending's forward-looking appointment. It should contrast this treatment with the easy temptation to write elderly reunion as regret — the Quinteros give their lovers wit, appetite and future plans, and their age shows only in the white hair and the cane. The strongest answers concede the melancholy underneath (fifty lost years, the lies both must tell) and land the synthesis: the comedy does not deny the loss; it answers it with renewal.""",
]

P3 = [
    """## The play at a glance

"Refund" by Fritz Karinthy is a Hungarian one-act satire with a simple, gleeful premise: a man returns to his old school eighteen years after graduating — without learning anything, he claims — and demands his tuition fees back. The school's masters, cornered by the threat of scandal, convene an oral examination to prove he was educated; the pupil defeats them one by one; and the mathematics master wins the day with a question that traps the claimant into proving the very education he came to refund. It is a comedy of wit with a serious target: what schooling actually gives, and who owes whom.""",
    """## The action, scene by scene

The play opens with the threat: Wasserkopf — the name means "water-head", and the masters remember him fondly as the class's most distinguished failure — arrives demanding his tuition refunded, with compound interest, because the education he received has left him unfit for life. He has the law on his side in spirit: he threatens newspaper scandal, and the principal, terrified of the publicity, convenes the staff.

The examination is the play's middle act, and it runs as a series of duels: the masters question him one at a time, and Wasserkopf defeats each by answering wrongly and then arguing brilliantly — using the exact quibbling, pseudo-logic and swagger that school debates teach, to prove that his wrong answers are right. The comedy is precise: every subject's master is beaten by the skills his own subject taught. The physics master falls to sophistry, the literature master to pedantry turned against him — and the staff begin to suspect the refund is unavoidable.

The mathematics master, summoned last and briefed in a whisper, sets the trap. He flatters Wasserkopf, concedes the refund in principle, and asks only the technical question: how much is owed? Principal plus six per cent compound interest over eighteen years — a calculation demanding exactly the arithmetic the school taught. Wasserkopf, led step by step, works it out correctly. The principal's verdict lands like a gavel: a man who can compute compound interest to the penny has demonstrably learned mathematics — the refund is refused, the pupil has passed after all, and Wasserkopf is escorted out, defeated by his own demand. The satire's final flourish: education is proven by the very attempt to disprove it.""",
    """## The devices, with evidence

- **Satire** — the play's genre and its point: education examined by its worst product, and the examination exposing both the school's anxiety about reputation and the pupil's confidence in his own ignorance.
- **Irony** — layered: the failure's complaint proves the teaching; the masters are defeated by the skills they gave him; the demand for a refund becomes the exam that saves the school's money.
- **The trap (comic reversal)** — the mathematics master's question is the play's engine: the refund calculation requires compound interest, and computing it is the proof of learning. The reversal is total and bloodless — wit defeating wit.
- **Character names** — Wasserkopf, "water-head": the cartoon name signals satire, and the masters' names and mannerisms sketch a whole staff-room in a few strokes.
- **Dialogue as duel** — the play is structured as verbal combat: each master's defeat is staged as a debate lost, which makes the mathematics master's victory the tournament's final round.

The exam question "how is the play a satire on education?" is answered on both sides: the school that values reputation over learning, and the pupil whose sharp argumentative tongue is the only skill his schooling truly fixed.""",
    """## The characters worth an essay

**Wasserkopf** is the comic engine: boastful, litigious, quick-tongued and genuinely defeated by a single honest number. The sketch the exam wants holds his contradiction — he is the class failure, yet his quibbling eloquence is school-taught; his ignorance is real, but his argument is educated. His defeat is satisfying because it is earned by his own demand.

**The mathematics master** is the play's quiet hero: briefed in a whisper, he wastes no motion — concedes the principle, asks for the arithmetic, and lets the claimant hang himself with a correct answer. **The principal** is institutional comedy: more afraid of the newspapers than of injustice, convening masters as a lawyer convenes witnesses. **The other masters** are the satire's targets one by one — each defeated by the discipline he represents, which is Karinthy's joke on specialisation itself.""",
    """## The themes worth an essay

**The worth of education** — the central theme: what does schooling actually give? The play's answer is double — the pupil learned less than the school hoped and more than he admits; the compound-interest calculation is the proof on both sides. **Reputation versus substance** — the masters' panic is about publicity, not truth; the satire indicts institutions that manage image instead of quality. **Wit as weapon** — the play's method: every conflict is resolved by a sharper sentence, and the final trap is wit used honestly against wit used evasively. **Cleverness versus knowledge** — Wasserkopf can argue anything and calculate what matters; the play quietly prefers the calculation. Anchor any essay in the final question-and-answer and the theme demonstrates itself.""",
    """## NEB short answers, solved

**Q. Why does Wasserkopf return to his school? (2 marks)**
A. To demand a refund of his tuition fees, with compound interest, on the ground that his education failed him: eighteen years after graduating he is unfit for life, and he holds the school responsible. He backs the demand with the threat of a newspaper scandal.

**Q. How do the masters react to his demand? (2 marks)**
A. With alarm rather than principle: the principal convenes the staff, terrified of publicity, and they agree to re-examine him orally to prove he was educated. Their anxiety satirises an institution that fears its reputation more than it trusts its teaching.

**Q. How does Wasserkopf defeat the masters? (2 marks)**
A. By answering wrongly and then arguing brilliantly: he uses sophistry, quibbling and swagger to prove his incorrect answers correct, beating each master with the debating skills his schooling actually taught him.

**Q. What is the mathematics master's trick? (2 marks)**
A. He concedes the refund in principle and asks only for the amount: principal plus six per cent compound interest over eighteen years. Computing it requires exactly the arithmetic the school taught — and Wasserkopf, led through it, calculates correctly.

**Q. How does the play end? (2 marks)**
A. In the claimant's defeat: the principal rules that a man who can compute compound interest to the penny has demonstrably learned mathematics, so the refund is refused and the pupil has passed after all. Wasserkopf leaves with his demand turned into his diploma.

**Q. What does the play suggest about the value of education? (2 marks)**
A. That its worth is proven in use, not in certificates or complaints: the very attempt to prove his education worthless forces Wasserkopf to demonstrate it. Education, the satire concludes, cannot be refunded — only revealed.""",
    """## NEB long answers, solved

**Q. "Refund is a satire on both the school and the pupil." Discuss. (8 marks)**
A model answer satirises both sides with evidence: the school's panic over scandal, its masters' confidence and their serial defeat by their own disciplines, and the pupil's genuine ignorance wrapped in genuinely educated argument. It should trace the play's comic mechanism — every defeat is the school's teaching coming back disguised as trouble — and give the mathematics master's trap its full weight as the satire's resolution: the institution is saved not by its reputation but by one honest question. The strongest answers end on the double target: Karinthy laughs at the school that measures learning in fees and at the pupil who mistakes eloquence for knowledge — and lets arithmetic decide between them.

**Q. "The mathematics master's question is the play's masterstroke." Justify. (8 marks)**
A model answer dissects the trap: it concedes everything except the conclusion, asks for a calculation that cannot be argued — only computed — and requires precisely the compound-interest arithmetic taught in the very classes the claimant failed. It should note the master's tactics (the whispered briefing, the flattery, the apparent generosity) and the reversal's fairness: Wasserkopf is not tricked into lying but led into demonstrating his own competence. The strongest answers connect the stroke to the theme: the play has argued that education is proven by performance, and the masterstroke is simply the first honest performance the play stages.""",
]

FILES = {
    "content/notes/concepts/class-11/english/literature-essays-plays/06-one-act-play-1-trifles-susan-glaspell.json": P1,
    "content/notes/concepts/class-11/english/literature-essays-plays/07-one-act-play-2-a-sunny-morning-serafin-and-joaquin-alvarez-quintero.json": P2,
    "content/notes/concepts/class-11/english/literature-essays-plays/08-one-act-play-3-refund-fritz-karinthy.json": P3,
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
