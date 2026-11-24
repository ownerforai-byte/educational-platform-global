#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Native readings + solved NEB questions for the three class-12 one-act plays.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-plays-c12.py
"""
import json

P1 = [
    """## The play at a glance

"A Matter of Husbands" by Ferenc Molnár is a one-act comedy of verbal judo: the Earnest Woman arrives at the Famous Actress's dressing room accusing her of stealing her husband — a dramatist who writes the actress's plays — and the actress, without denying anything at first, talks her out of the accusation entirely by inventing a better story: the husband never had an affair; he invented one as material for his play, and the "evidence" was drafts of dialogue. The wife leaves grateful and relieved. The play's sting is in its last breath: the affair was real, and the actress has simply lied better than the wife could suspect. Molnár's theme is the theatre's power over truth — and the audience's willing suspension of disbelief, exploited twice in one act.""",
    """## The action, scene by scene

The setup is a confrontation: the Earnest Woman, ordinary, anxious, armed with evidence — her husband's absences, the notes, the suspicion — arrives at the actress's dressing room to demand the truth. Molnár stages the mismatch from the first minute: the wife has reality on her side; the actress has narrative.

The middle is the actress's performance, and it is her finest: she does not deny the affair — denial would be tested. Instead she reclassifies it: her visitor's husband, she explains, is a dramatist who needed a jealous-wife plot for his new play, and he *manufactured* the affair — the absences, the notes, the rehearsals — as research and draft. The "evidence" is shown to be what it always was, reinterpreted: lines of dialogue, plot notes, the standard materials of a writer's trade. The actress performs the innocent intermediary so convincingly — outrage on the wife's behalf, amusement at the artist's methods — that the wife's reality is rewritten in front of her.

The close is the comedy's blade: the wife leaves, comforted, grateful, even proud of her clever husband — and the actress, alone, allows the audience one glimpse behind the performance. The affair was exactly what the wife thought; the story that saved the marriage was fabricated in the dressing room; and the play's last irony is complete: in the theatre, the liar wins by telling the better story — and the wife, like the audience, believed it because it was better told.""",
    """## The devices, with evidence

- **Dramatic irony** — the play's master device: the audience watches the actress lie and the wife believe, holding the truth the characters on stage cannot; every comforting sentence the wife receives is a sentence the audience knows to be false.
- **The story-within-the-story** — the actress's invention: an affair reclassified as a playwright's research. The device is the plot — the theatre defending itself with its own material.
- **Reversal** — the scene's architecture: accusation to gratitude in one conversation, with no new facts, only a new story; the reversal is the proof of the play's thesis about narrative power.
- **Character contrast as comedy** — the Earnest Woman's plainness against the Famous Actress's theatricality: the clash of registers is the humour, and the mismatch is also the vulnerability the actress exploits.
- **The closing wink** — the final revelation to the audience alone: the comic mask drops for one moment, and the comedy's moral is delivered in silence.

The exam question "how does the actress convince the wife?" is answered by the strategy: she never denies — she *reinterprets*, converting evidence into art, and the wife's relief is the measure of storytelling's power over fact.""",
    """## The characters worth an essay

**The Famous Actress** is the play's mind: intelligent, theatrical, entirely unscrupulous — and her skill is precisely the point, since the play asks whether a better story beats a true one. Her performance within the performance is the play's engine, and Molnár gives her the best of every exchange.

**The Earnest Woman** is the audience's mirror: honest, literal, and defenceless against narrative — she has facts and loses to fiction, and her relief at the end is the play's sharpest comment on how much people want to believe the better story. **The absent husband** is the play's object and its fool: his real affair is covered by a story about his own invention, and the wife's final pride in his cleverness is the deepest irony — he is praised for a creativity he does not possess.""",
    """## The themes worth an essay

**The power of narrative over fact** — the central theme: the wife has evidence and loses; the actress has a story and wins; the play is an experiment in which fiction defeats reality in a fair fight. **Theatre and deception** — the actress's profession is her weapon: the theme that the skills of performance do not stay on stage. **Suspicion and its relief** — the wife's psychology: the invented story works because it is *wanted* — the theme that people cooperate in their own deception when the alternative is pain. **Marriage and its fictions** — the comedy's darker base: the marriage is saved by a lie, which raises the question the play leaves open — saved or merely postponed? Anchor the essay in the reversal and the closing wink, and the theme is delivered with the play's own irony.""",
    """## NEB short answers, solved

**Q. Why does the Earnest Woman visit the Famous Actress? (2 marks)**
A. To confront her over an affair with her husband — a dramatist who writes the actress's plays — armed with the evidence of absences and notes. She arrives expecting a rival and meets, instead, a storyteller.

**Q. How does the Actress explain the husband's behaviour? (2 marks)**
A. By reinventing it: the husband, she claims, manufactured the whole affair as material for his new play about a jealous wife — the absences, the notes and the secrecy were research and drafts. The evidence is reclassified as art, and the accusation dissolves.

**Q. Why does the wife believe the Actress's story? (2 marks)**
A. Because it is better told and better wanted: the actress performs innocence with professional skill, and the story offers the wife exactly the relief she desperately needs. She cooperates in her own deception because the alternative is pain.

**Q. What does the audience learn at the end? (2 marks)**
A. The truth the wife never will: the affair was real, and the story that saved the marriage was fabricated in the dressing room. The closing wink converts the comedy into a comment on narrative's power.

**Q. What is the irony of the wife's final gratitude? (2 marks)**
A. She leaves praising her husband's creative imagination — crediting him with an invention that was actually the actress's cover story. The man she suspects of deceit is thanked for a cleverness that served the deceit.

**Q. What is the play's central theme? (2 marks)**
A. The power of a well-told story over plain fact: the wife arrives with evidence and loses to fiction. Molnár suggests that in the theatre — and in life — the better narrative, not the truer one, is what people believe.""",
    """## NEB long answers, solved

**Q. "The Actress wins not by denying the truth but by retelling it." Discuss the strategy and its significance. (8 marks)**
A model answer analyses the strategy step by step: denial would invite testing, so the actress reclassifies — converting evidence into art, suspicion into research, betrayal into a playwright's method — and performs the innocent intermediary with all her professional skill. It should note what the strategy reveals: facts have no fixed meaning until placed in a story, and the wife's belief is collaboration (the story offers the relief she needs). The strongest answers land on the closing wink: the affair was real, so the play's verdict is that in a contest between fact and fiction, the better narrative wins — a thesis the theatre delivers about itself, with a smile.

**Q. Sketch the character of the Famous Actress and assess her role in the play. (8 marks)**
A model answer builds the portrait: quick, unscrupulous, wholly professional — she assesses her visitor in a breath and chooses reclassification over denial; her performance-within-the-performance is flawless because it is her trade. It should argue her role as the play's thesis made flesh: she demonstrates, rather than states, the power of narrative — and Molnár gives her every victory in the dialogue to make the demonstration convincing. The strongest answers note the play's ambivalence: she is a liar and the most intelligent person on stage, and the audience's enjoyment of her is itself the play's final experiment — we, too, prefer the better story.""",
]

P2 = [
    """## The play at a glance

"Facing Death" by August Strindberg is a naturalist one-act tragedy about a man destroyed by the way the world sees him — and redeemed, at the last minute, by what he actually does. Monsieur Durand, a widowed ex-railway man running a failing pension, is regarded by his three daughters and the town as a drunkard, a gambler and a failure. The truth is that his sins were mostly performed for a purpose he could not explain: he has insured his life heavily, and the only way the insurance pays is his death. The play ends with Durand drinking poison — dying, deliberately, so that his debts are paid and his daughters provided for. Strindberg's theme is the terrible arithmetic of sacrifice: a man must die to be believed good.""",
    """## The action, scene by scene

The setup is a portrait of ruin: the pension is mortgaged and failing, Durand is behind on everything, and his three daughters — raised to despise him — treat him with the contempt the town has taught them. The exposition is brutal and efficient: we learn of the dead wife, the drinking, the debts, and the daughters' conviction that their father is the source of every shame.

The middle deepens the misjudgment: Durand's small vanities and evasions — the swagger, the dodging of creditors — confirm the daughters' verdict, and Strindberg keeps the audience almost as unsympathetic as the daughters. The hints of another truth are planted quietly: the insurance papers, the inquiries about them, the strange calm of a man who has stopped struggling.

The close is the revelation and the act: Durand sends for the notary, settles his affairs, and — after a last tender, disastrous attempt to be loved — drinks the poison he has prepared. The death is timed like a transaction: the insurance pays the debts and provides for the daughters, and the man the world called a coward dies with the cold courage of a plan. The daughters' discovery arrives with the corpse: the father they despised spent his last year arranging his own death as their inheritance — and Strindberg leaves the guilt where it must fall, on the living who judged too well and understood too late.""",
    """## The devices, with evidence

- **Naturalism** — the play's master mode: heredity, poverty and social judgment as the forces that crush the man; no providence, no melodrama — the tragedy is economic and psychological, room by room.
- **Dramatic irony** — the play's engine: the audience shares the daughters' contempt until the truth surfaces, and the reversal re-colours every earlier scene — the swagger was a performance over a plan.
- **Foreshadowing** — the insurance inquiries, the settled calm, the visit to the notary: Strindberg marks the suicide in advance and lets the audience misread it, exactly as the family does.
- **The misjudged hero** — the play's conceptual centre: appearance as prison — a man whose performance of failure is the price of his sacrifice, since a father who explained would forfeit the insurance.
- **The title's double edge** — "facing death": the phrase names both the coward's terror and the deliberate act; the play's argument is that its hero did the second while being accused of the first.

The exam question "why does Durand kill himself?" is answered by the insurance arithmetic: only his death pays the debts and provides for the daughters — and the tragedy is that the sacrifice must look like failure to work.""",
    """## The characters worth an essay

**Monsieur Durand** is the play's paradox: a man who must be despised to be generous. His weakness for display, his drinking, his evasions — some real, some performed — are the mask over the plan, and his last hours reveal the truth the mask hid: a father who loved his daughters enough to be hated by them. The character sketch the exam wants holds both readings at once.

**The three daughters** are the world's judgment made flesh: they have learned the town's verdict and repeat it with the cruelty of the young — and their final discovery is the play's indictment of inherited judgment. **The dead wife** haunts the background: the marriage's unhappiness is part of the daughters' case against their father, and the play's sadness is that the case was never fully heard.""",
    """## The themes worth an essay

**Sacrifice and misjudgment** — the central theme: the sacrifice that must disguise itself as failure; the play asks what it costs to be good when goodness cannot be explained. **Appearance versus truth** — the conceptual heart: the town's and the daughters' verdicts are built from surfaces, and the truth was invisible by design. **Poverty as fate** — the naturalist theme: debt and failure are the machinery that turns a father's love into a suicide; the tragedy is economic before it is moral. **Judgment and its late correction** — the daughters' discovery: the theme that the living judge quickly and understand never, or too late. Anchor the essay in the insurance arithmetic and the daughters' final knowledge, and the analysis holds the play's whole weight.""",
    """## NEB short answers, solved

**Q. What is Durand's situation at the start of the play? (2 marks)**
A. Ruined and despised: the pension he runs is mortgaged and failing, his debts are pressing, and his three daughters — taught by the town's verdict — regard him as a drunkard, a gambler and a failure. The setup is a man judged entirely by his surfaces.

**Q. How do the daughters treat their father? (2 marks)**
A. With contempt: they repeat the town's judgment with the cruelty of the young, blaming him for their mother's unhappiness and the family's shame. Their contempt is the play's social fact — judgment inherited and rehearsed daily.

**Q. Why has Durand insured his life? (2 marks)**
A. As his daughters' provision: the insurance pays only on his death, so his plan is to die deliberately — settling his debts and leaving the family provided for. The policy is the play's terrible arithmetic: love payable only in death.

**Q. How does Durand die? (2 marks)**
A. By his own prepared act: after settling his affairs with the notary and a last failed attempt to be loved, he drinks the poison he has kept ready. The death is calm and transactional — the cold courage of a plan, not the panic of despair.

**Q. What is the significance of the title? (2 marks)**
A. It carries the play's double edge: the world believes Durand is *facing* death as a coward flees it, while the truth is that he faces death deliberately, as a duty. The title names both readings, and the play's argument is that the second was hidden inside the first.

**Q. What is the play's central irony? (2 marks)**
A. That the sacrifice must look like failure: a father who explained his plan would forfeit the insurance, so he must be despised to be generous. The man who saves his family can only do so by letting them believe the worst of him.""",
    """## NEB long answers, solved

**Q. "Durand must be despised in order to be generous." Discuss the paradox at the heart of the play. (8 marks)**
A model answer works the paradox structurally and morally: the insurance pays only on death, so the plan requires concealment — every explanation would forfeit the provision — and Durand therefore performs the failure the town expects, letting the swagger and the drinking stand as his portrait. It should trace how the performance costs him the one thing he wants (his daughters' love) and how the final act converts the mask into the truth: the coward's reputation concealing the coldest courage in the play. The strongest answers close on the social critique: the tragedy is not only personal but economic — poverty created the arithmetic in which a father's love could be expressed only as his own death.

**Q. How does Strindberg prepare the audience for the ending? (8 marks)**
A model answer maps the foreshadowing: the insurance papers and inquiries, the man who has stopped struggling, the settled calm amid the debts, the visit to the notary — each detail planted early and misread, exactly as the daughters misread it. It should argue the effect: the audience's shared misjudgment is the play's method — we convict with the family so that the reversal convicts us — and the re-reading of earlier scenes (the swagger as performance over a plan) is where the tragedy's full weight lands. The strongest answers connect the technique to naturalism: the clues are economic and behavioural, not symbolic, because the play's world is one where death is a transaction and love is an actuarial figure.""",
]

P3 = [
    """## The play at a glance

"The Bull" by Bhimnidhi Tiwari is a Nepali one-act satire with a live animal at its centre: Mukundadixit, a farmer, keeps an unproductive bull although the government has banned keeping bulls that serve no purpose — the state's campaign to control stray and useless cattle. When the inspectors come, the household performs a comedy of concealment: the bull hidden, the wives coached, the officials fed superstition and flattery. The play's target is double-edged: the farmer's hypocrisy and superstition (the bull as status, tradition and religion) and the machinery of officialdom that can be managed by anyone fluent in deference. Tiwari's satire laughs at both sides of the campaign — the dodgers and the dodged.""",
    """## The action, scene by scene

The setup is the household and its secret: Mukundadixit keeps the bull against the law and justifies it in the traditional grammar — the bull as God's creature, the farm's prestige, the ancestors' custom — while the practical truth is simpler: he does not want the expense and trouble of obeying, and he believes he will not be caught. His two wives are conscripted into the conspiracy, and the comedy begins at home: coaching the household in the story before the officials arrive.

The inspection is the play's centre: the government employees come to verify that unproductive bulls have been disposed of as the campaign requires, and Mukundadixit performs the obedient citizen — agreement, flattery, tea, the language of cooperation — while the bull's existence is denied, hidden and explained away. The wives' performances are the comedy's engine: nervous, overdone, and finally convincing because the officials prefer the smooth story to the troublesome truth.

The close is the satire's verdict: the inspection passes, the bull survives, and the law is defeated not by argument but by performance. Tiwari's irony is complete — the state's campaign is undone by the deference it trains officials to accept, and the farmer's superstition is exposed as convenience wearing religion's clothes. The play ends with the household's relieved laughter, and the audience is invited to notice that nothing has changed except the efficiency of the lie.""",
    """## The devices, with evidence

- **Satire** — the play's genre and method: the bull campaign as a duel between hypocrisy and officialdom, with both sides laughing at themselves.
- **Dramatic irony** — the audience's position: we see the bull, the coaching and the lie while the officials see only the performance — every deferential sentence the inspectors accept is a sentence the audience knows to be false.
- **Farce technique** — the concealment, the near-discoveries, the coached wives: the physical comedy of a household lying in chorus, which keeps the satire light enough to laugh at.
- **Character contrast** — the farmer's traditional piety against the state's bureaucratic rationality: the clash of two languages, neither of which is honest.
- **The bull as symbol** — the unproductive animal kept for prestige and religion: the play's central image of tradition maintained at public cost.

The exam question "what does the play satirise?" is answered on both edges: the farmer's superstition-as-convenience and the officialdom that is managed by deference — the campaign fails because both sides prefer performance to truth.""",
    """## The characters worth an essay

**Mukundadixit** is the satirist's specimen: pious in language, practical in motive — his defence of the bull is a costume over convenience, and his skill is exactly the skill the inspection rewards: fluency in deference. The sketch the exam wants holds the double reading: the tradition-keeper who is really a rule-dodger, and the rule-dodger who half-believes his own piety.

**The two wives** are the comedy's engine and the satire's sharpest detail: coached, nervous, over-performing — their part in the conspiracy shows how patriarchy conscripts the household into its deceptions, and their success shows how easily performance defeats procedure. **The officials** are the state's comedy: procedure without perception, satisfied by tea and agreement — the play's argument that a campaign enforced by deference collects deference, not compliance.""",
    """## The themes worth an essay

**Tradition as convenience** — the central theme: the bull kept in religion's name and convenience's interest; the play distinguishes belief from the costume of belief. **Law and its performance** — the conceptual heart: the inspection defeated by flattery and staging; the theme that enforcement which accepts deference collects nothing. **Superstition and social cost** — the campaign's reason: unproductive cattle as economic waste, and the farmer's prestige-animal as the public's burden. **Patriarchy's chorus** — the wives' conscription: the household's deception is a family production, and the satire notes who does the performing. Anchor the essay in the inspection scene and the bull as symbol, and the double satire carries the analysis.""",
    """## NEB short answers, solved

**Q. Why does Mukundadixit keep the bull against the law? (2 marks)**
A. For prestige, tradition and convenience: the bull is a status animal in the village's eyes, its keeping is defended in religious language, and obeying the government's campaign would cost him trouble he prefers to avoid. Piety is the costume; convenience is the motive.

**Q. How does the household prepare for the inspection? (2 marks)**
A. As a conspiracy in chorus: the bull is hidden, the story is agreed, and the two wives are coached in their parts. The preparation is the play's farce — a family rehearsing a lie the way actors rehearse a scene.

**Q. How do the officials conduct the inspection? (2 marks)**
A. Procedurally and credulously: they ask, they are flattered, they are fed, and they accept the smooth story the household performs. The satire's point is that their procedure collects deference rather than facts.

**Q. What role do the wives play in the comedy? (2 marks)**
A. The engine of the farce and the satire's sharpest detail: nervous, over-performing, finally convincing — they show how the household's deception is a family production, and how patriarchy conscripts its members into the man's deceptions.

**Q. What does the bull symbolise? (2 marks)**
A. Tradition maintained at public cost: an unproductive animal kept for prestige and defended in the language of religion. The bull is the play's central image — the luxury that everyone pays for and one household performs.

**Q. What is the play's double target? (2 marks)**
A. Both sides of the campaign: the farmer's hypocrisy and superstition, and the officialdom that can be managed by anyone fluent in deference. Tiwari's irony is that the law is defeated not by argument but by performance — and both sides prefer it that way.""",
    """## NEB long answers, solved

**Q. "The Bull is a satire on both the law-dodgers and the law-enforcers." Discuss. (8 marks)**
A model answer works both edges with the play's evidence: the farmer's side — the bull kept in religion's name and convenience's interest, the household coached, the pious language deployed over a practical motive; and the officials' side — procedure satisfied by tea, flattery and smooth stories, the campaign collecting deference instead of compliance. It should stage the inspection as the duel between the two dishonesties, with the audience holding the truth (dramatic irony) throughout. The strongest answers close on the play's verdict: the law fails not because it is wrong but because its enforcement is performed — and the satire's laughter is aimed at a system in which everyone, from farmer to inspector, prefers the story to the fact.

**Q. Sketch the character of Mukundadixit and justify his place in the satire. (8 marks)**
A model answer builds the double portrait: publicly the tradition-keeper — the bull defended as God's creature and ancestral custom — and privately the convenience-calculator, unwilling to pay the cost of the law he pretends to honour. It should show his real skill: fluency in deference, the exact competence the inspection rewards, which is why he succeeds. The strongest answers place him in the satirist's design: he is not an exception but a specimen — the ordinary citizen whose piety is a costume and whose victory proves the state's weakness — and the play's laughter at him is inseparable from its laughter at the system that makes his performance profitable.""",
]

FILES = {
    "content/notes/concepts/class-12/english/literary-analysis/18-one-act-play-1-a-matter-of-husbands-ferenc-molnar.json": P1,
    "content/notes/concepts/class-12/english/literary-analysis/19-one-act-play-2-facing-death-august-strindberg.json": P2,
    "content/notes/concepts/class-12/english/literary-analysis/20-one-act-play-3-the-bull-bhimnidhi-tiwari.json": P3,
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
