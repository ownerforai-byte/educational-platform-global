#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Native readings + solved NEB questions for the seven class-12 short stories.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-stories-c12.py
"""
import json

S1 = [
    """## The story at a glance

"Neighbours" by Tim Winton is a small story about a large discovery: a young Australian couple move into a new suburb, brace themselves against the noise of their migrant neighbours — the Macedonian family shouting and singing, the Polish widower hammering — and are slowly, embarrassingly, won over. The neighbours turn out to be the community the couple did not know they were missing: they teach the young wife to cook, help butcher the pig, weep at her pregnancy, and celebrate the birth as their own. Winton's theme is the prejudice inside the newcomers — and the warmth that dissolves it.""",
    """## The plot, retold with an eye on its turns

The setup is a wall of difference: the young couple regard their street with suspicion — the Macedonians' "strange" cooking smells, the shouting, the visitors at odd hours — and the neighbours' friendliness reads to them as intrusion. The first turn is practical: the Macedonian woman teaches the wife how to cook stuffed peppers and cabbage rolls, and the young man, reluctantly, finds himself helping the Polish widower rebuild his chicken coop and slaughter a rooster — the walls thinning through work rather than words.

The second turn is the pregnancy, and Winton makes it the story's converter: the neighbours respond to the news with an intensity the couple has never met — the Macedonian women touch the young wife's belly, offer names and blessings, and the Polish widower, told of the birth, climbs the fence, holds the baby and weeps. The couple, who began by cataloguing differences, end the story inside a web of affection they did nothing to earn except accept.

The close is the story's quietest and loudest moment: the young husband, holding his child amid the neighbours' joy, finds himself weeping — "My God!" — the sentence that marks his conversion. The people he pitied as backward have taught him what his own culture's suburb had lost: that community is made of presence, food, noise and shared joy.""",
    """## The devices, with evidence

- **Contrast** — the story's engine: the couple's reserve against the neighbours' exuberance; the cold professionalism of their own culture against the migrants' noisy intimacy; the opening suspicion against the closing tears.
- **Symbolism** — the fence the Polish widower climbs is the story in one image: the barrier that becomes a threshold. The shared food — peppers, cabbage rolls, the butchered rooster — is culture crossing the border the couple thought they were guarding.
- **Point of view** — third person, close to the couple: we feel their condescension and then their conversion from the inside, which is why the ending's tears land as earned rather than sentimental.
- **Irony** — the couple expected to teach the migrants how to live in Australia; the migrants teach them how to live.
- **Warm detail** — the story's method throughout: specific acts (the belly touched, the rooster, the fence climbed) instead of general claims about community.

The exam question "how does the couple's attitude change?" is answered by the arc above — suspicion, reluctant participation, gratitude, tears — and each stage is anchored in an act, not a feeling.""",
    """## The characters worth an essay

**The young couple** are the story's real subjects — the majority-culture newcomers who think they are the mainstream and discover they are the poor ones in the currency that counts. Their arc from judgment to gratitude is the story's moral plot. **The Macedonian family** is generosity as a way of life: cooking, singing, naming, touching — a culture expressed in abundance. **The Polish widower** is the story's most affecting figure: alone, hammering at odd hours, he is the neighbour nobody wanted — and the one who weeps at a stranger's baby. His loneliness and his joy are the same fact: he has love to give and finally somewhere to give it.""",
    """## The themes worth an essay

**Prejudice and its cure** — the central theme: the couple's assumptions about migrants dissolve through contact, not argument; the story argues that familiarity is the antidote to bias. **Community versus privacy** — the couple's culture prizes distance; the neighbours' culture prizes presence — and the story sides, gently but firmly, with presence. **Cultural exchange as mutual enrichment** — the migrants give more than they receive, and the giving is food, help and joy. **The universality of family** — a birth in one house becomes a celebration in every house on the street. Write the essay with the fence, the food and the tears as your three anchors.""",
    """## NEB short answers, solved

**Q. How did the young couple first regard their neighbours? (2 marks)**
A. With suspicion and condescension: the Macedonian family's cooking smells, shouting and visitors seemed strange and intrusive, and the Polish widower's hammering was a nuisance. They thought of the newcomers as backward and themselves as the standard.

**Q. How did the neighbours treat the young couple? (2 marks)**
A. With open warmth: the Macedonian woman taught the young wife to cook traditional dishes, the women offered blessings and names for the unborn child, and the Polish widower helped with work and wept with joy at the birth. The couple received more friendship than they had ever offered.

**Q. What was the effect of the pregnancy on the neighbourhood? (2 marks)**
A. It converted the street into one family: the Macedonian women touched the young wife's belly and shared their traditions, and when the child was born the neighbours celebrated as if the baby were their own. The pregnancy made the couple's belonging complete.

**Q. Why does the Polish widower weep at the end? (2 marks)**
A. From joy and relief: the birth gives his loneliness somewhere to go. He climbs the fence — the story's symbolic barrier — holds the baby and weeps, because the young couple's family has become his own.

**Q. What does the story suggest about multicultural neighbourhoods? (2 marks)**
A. That difference is a resource, not a threat: the migrants' ways of living — cooking, helping, celebrating together — enrich the community that receives them. Winton suggests the newcomers to a suburb may be the ones who teach belonging.

**Q. How does the story end, and what does the ending mean? (2 marks)**
A. The young husband weeps, saying "My God!", as he holds his child amid the neighbours' joy. The tears mark his conversion: the man who began by judging his neighbours ends by recognising them as the community he had been missing.""",
    """## NEB long answers, solved

**Q. "The neighbours taught the couple more than the couple could teach them." Discuss with reference to the story. (8 marks)**
A model answer agrees and builds the evidence in order: the couple arrived with the majority culture's confidence and a list of judgments, while the neighbours arrived with stuffed peppers, help with the coop, blessings for the unborn child and tears for the newborn. It should trace the couple's arc through acts — the reluctant cooking lesson, the shared butchering, the fence climbed — and note Winton's irony: the "backward" neighbours practise the community the locals have lost. The strongest answers close on the ending: the husband's tears are the receipt for what has been given, and the story's verdict is that culture's best currency is presence.

**Q. How does Winton use contrast to carry the story's meaning? (8 marks)**
A model answer organises the analysis around the story's paired opposites: reserve against exuberance, privacy against presence, judgment against generosity, silence against noise — and shows that the couple's culture, not the migrants', is the one found wanting. It should discuss the point of view (the reader lives inside the couple's condescension and watches it dissolve), the fence as the story's symbolic hinge, and the food as culture crossing the border. The strongest answers note that the contrasts are never weaponised: the story's warmth converts rather than condemns, which is why it persuades.""",
]

S2 = [
    """## The story at a glance

"A Respectable Woman" by Kate Chopin is a short story about a feeling that is never named — which is precisely how such feelings behave. Mrs. Baroda, comfortably married to Gaston, is irritated when her husband's friend Gouvernail comes to stay for weeks on the plantation. Her irritation softens into fascination, and one night on the bench under the live oak, sitting beside the quiet young man, she feels an impulse she does not analyse — and flees to the city. The story's last line, delivered months later, is its confession: she has overcome everything, and Gouvernail may visit again. Chopin writes desire and propriety in the same sentence and lets the reader feel the tug.""",
    """## The plot, retold with an eye on its turns

The setup is a wife's announcement: she is not going to like Gouvernail — she has heard he is a cynic and had hoped to leave him off the guest list. Gaston laughs; Gouvernail arrives and turns out to be nothing like the rumour: quiet, courteous, tired, asking nothing. Her dislike, deprived of fuel, has nowhere to go.

The middle is the story's slow burn: she cannot classify the man — he is neither witty nor demanding, and his silence puzzles her more than charm would. She tries to provoke him into conversation and gets gentleness back; she scolds herself for the unreasonable hostility, and the scolding is the story's tell — irritation that needs explaining is not irritation. One evening Gaston suggests she invite Gouvernail back for the summer; she refuses, with a sharpness that surprises even her.

The bench scene is the story's centre, told with Chopin's famous restraint: sitting beside Gouvernail in the silence, listening to his low voice about the old days and his desire to live and die in this bosom of tranquillity, she feels something rising in her that the narrative refuses to name — and she rises with it, leaving abruptly for the city until the visit is over. Gaston is baffled; the reader is not.

The close completes the design: months later, on her husband's repeated suggestion, Mrs. Baroda kisses him and says Gouvernail may come again — she has overcome everything, and this time she will be very nice. The sentence is a riddle with one honest solution: what she overcame was not her dislike.""",
    """## The devices, with evidence

- **Third-person limited point of view** — the story's master choice: we live inside Mrs. Baroda's consciousness, which means we know more about her feelings than she admits even to herself — the gap between what she thinks and what she says is the story's space.
- **Restraint (subtext)** — Chopin never names the attraction: the unnamed impulse on the bench, the flight to the city, the "overcoming" — the omission is the technique, and the reader supplies the word.
- **Irony** — layered: the title's "respectable" describes the mask, not the struggle; her stated dislike is the opposite of her actual feeling; and the final promise to be "very nice" is the story's most charged sentence.
- **Contrast** — the rumoured cynic against the gentle reality; her chatter against his silence; the plantation's tranquillity against the disturbance inside its hostess.
- **Symbolism** — the bench under the live oak: the scene of temptation staged in the most innocent of settings; the city as the place of flight and recovery.

The exam question "why does Mrs. Baroda leave for the city?" is answered by reading the omission: she flees the feeling she will not name, and the flight is the confession the story never makes directly.""",
    """## The characters worth an essay

**Mrs. Baroda** is the story's whole terrain: intelligent, self-aware enough to notice her own unreasonableness, and respectable enough to refuse her own discovery. Her arc is not a fall but a negotiation — feeling observed, resisted, survived, and finally invited back, which is the most honest ending a story of this kind can have.

**Gouvernail** is the quiet catalyst: he does nothing — that is his role. His gentleness and fatigue disarm her defences precisely because they make no demands; the story's temptation is made of kindness, not seduction. **Gaston** is the blind centre of the triangle: affectionate, oblivious, and delighted at the end without knowing why. His innocence is the story's quietest irony — the person with the least knowledge is the one with the most to lose.""",
    """## The themes worth an essay

**Desire versus propriety** — the central theme: a respectable woman's capacity for feeling exceeds what her respectability permits, and the story dramatises the negotiation without judging it. **The limits of self-knowledge** — Mrs. Baroda's narration of her own motives is unreliable, and the story trusts the reader to hear what she will not say. **Marriage and its silences** — Gaston's obliviousness is affectionate and total; the story asks how much a marriage can hold without knowing. **The ambiguity of endings** — the invitation back is either victory over temptation or its scheduling; Chopin leaves the choice to the reader, which is the story's final sophistication. Anchor the essay in the bench scene and the last line, and let the unnamed feeling stay unnamed.""",
    """## NEB short answers, solved

**Q. Why was Mrs. Baroda annoyed by Gouvernail's visit? (2 marks)**
A. She had formed a picture of him from rumour — a cynical, tiresome man — and had wanted the summer to herself with Gaston. The annoyance is her stated reason; the story's suggestion is that the dislike was never about who Gouvernail was.

**Q. How did Gouvernail actually behave? (2 marks)**
A. Gently and undemandingly: quiet, courteous, tired from overwork, happy to sit in silence and speak only when spoken to. His mildness disarms her hostility precisely because it gives her nothing to fight.

**Q. What happened on the bench under the live oak? (2 marks)**
A. Sitting beside Gouvernail in the evening quiet, listening to his low voice about the old days and his wish to live and die in that tranquillity, Mrs. Baroda felt an impulse she could not explain — and left abruptly for the city the next day. The story never names what she felt.

**Q. Why did she go to the city? (2 marks)**
A. To escape the feeling she would not examine: the visit to her aunt's is a flight from temptation rather than a social errand. The flight is the story's indirect confession.

**Q. What does Mrs. Baroda say at the end, and what does it mean? (2 marks)**
A. She tells Gaston that Gouvernail may visit again — she has overcome everything and will be very nice this time. The surface meaning is reconciliation; the honest reading is that what she overcame was not dislike but temptation, and the invitation is its careful management.

**Q. How does the title carry the story's irony? (2 marks)**
A. "Respectable" names the social identity Mrs. Baroda must maintain while feeling what the story never names: the word describes the mask that makes the struggle possible. The irony is that her respectability is both her prison and her poise.""",
    """## NEB long answers, solved

**Q. "The story never names Mrs. Baroda's feeling, and that is its power." Discuss Chopin's use of restraint. (8 marks)**
A model answer treats the omission as the story's central technique: the unnamed impulse on the bench, the unexplained flight to the city, the "overcoming" in the last line — each silence invites the reader to supply what the narrative withholds, and the supplied word is more powerful than any stated one. It should contrast the period's propriety (why the feeling cannot be named) with the story's honesty (why it cannot be denied), and use the point of view to show the gap between Mrs. Baroda's self-narration and her behaviour. The strongest answers close on the ending's ambiguity: the invitation back is either discipline or desire, and Chopin's refusal to choose is the story's final respect for its heroine's complexity.

**Q. Sketch the character of Mrs. Baroda and trace her change through the story. (8 marks)**
A model answer builds the portrait in stages: the confident hostess who announces her dislike; the puzzled woman whose hostility loses its object; the self-scrutinising wife who scolds her own unreasonableness; the tempted woman on the bench; the flight to the city; and the composed hostess of the final line who has, in her own words, overcome everything. It should argue that the change is not from prudishness to passion but from ignorance of her own heart to a negotiated awareness of it — and that her composure at the end, promising to be "very nice", is the most revealing sentence she says.""",
]

S3 = [
    """## The story at a glance

"A Devoted Son" by Anita Desai is a story about love that becomes control without changing its name. Rakesh, the son of poor Varma, rises to the top of the medical school, honours his parents in every traditional way — marries the mother's choice, brings his bride home, touches his father's feet — and then applies his medicine to his father's life: no fried food, no sweets, tonics by the clock, a schedule of care the old man experiences as a cage. The father's rebellion, the son's inflexibility, and the death that ends the argument leave the title standing like a question: devotion to whom — the father, or the son's own idea of duty?""",
    """## The plot, retold with an eye on its turns

The rise: Varma, a kerosene-dealer son of a poor family, announces his son's first-place result to the street; Rakesh wins a scholarship to the United States, returns with a degree and American admiration, and — the gesture the neighbourhood applauds — marries a village girl of his mother's choosing rather than an American. The early chapters are triumph: the son who had everything and gave back more.

The turn arrives with the father's health. Rakesh, now chief physician, takes over his father's body as a project: banned fried foods and sweets, vitamins and tonics, walks and schedules, and the father — who wants his sweets and his freedom — finds the love indistinguishable from authority. The comic-sad middle is their war of small rebellions: Varma bribing grandchildren to buy him sweets, complaining that his son's tonics taste of punishment, and announcing, whenever he can, that he is dying.

The endgame deepens the irony: the son's care extends the father's life past the point where the father wants it extended — the widow of the neighbourhood's sympathy, the old man's conviction that his son is keeping him alive against his will. On the last evening Varma pushes away the tonic, and Rakesh, firm and gentle, insists. The father dies; the son's devotion is intact; and the story leaves the reader holding both truths at once — the care was real, and the cage was real too.""",
    """## The devices, with evidence

- **Irony of the title** — the master device: "devoted son" is accurate and insufficient at once, since the devotion that feeds the father also imprisons him; the story's argument lives in that double reading.
- **Contrast** — the son's medical authority against the father's personal liberty; the neighbourhood's admiration against the old man's resentment; the young Rakesh who touched his father's feet against the doctor who schedules his life.
- **Point of view** — the narration moves between son and father, so the reader is given both the care and the cage and is never allowed to settle into either camp.
- **Domestic detail** — the sweets smuggled by grandchildren, the tonic's taste, the banned fried food: Desai's argument is carried by household objects, not speeches.
- **Generational conflict as structure** — the story's arc is the classic one inverted: the son who once obeyed now commands, and the reversal is where the pain lives.

The exam question "is Rakesh a good son?" is answered by holding the story's two truths: his devotion is genuine, and genuine devotion can still fail to ask the person it loves what he wants.""",
    """## The characters worth an essay

**Rakesh** is duty embodied: brilliant, obedient, grateful — and blind, in the way duty often is, to the difference between caring for a father and managing him. His flaw is not cruelty but certainty: he never doubts that he knows best, and the story's tragedy is that his certainty is medically right and personally wrong.

**Old Varma** is the story's heart: proud of his son's success and furious at its consequences, he wants sweets, respect and the right to die on his own schedule. His rebellions are comic and heartbreaking at once — the smuggled sweets, the announced deaths — and his last refusal of the tonic is the story's clearest sentence. **The mother** and **the wife** frame the household's quiet labour: the mother's early death removes Rakesh's gentler parent; the wife serves the regime the son prescribes. **The neighbourhood** is the story's chorus: it applauds the devotion it never has to live inside.""",
    """## The themes worth an essay

**Love as control** — the central theme: care administered without consent becomes authority; the story asks where devotion ends and domination begins. **Generational reversal** — the son who owed everything now governs the man who gave everything; the pain of the story is the role reversal inside a loving family. **Tradition versus modernity** — the traditional duty of the son meets the modern physician's regimen; both claim to honour the father, and neither asks him. **The right to die as one wishes** — the story's most modern question: Varma's last demand is not for sweets but for autonomy. Write the essay from both chairs — the son's and the father's — and refuse to leave either.""",
    """## NEB short answers, solved

**Q. How did Rakesh honour his parents after his success? (2 marks)**
A. In every traditional way: he touched his father's feet, married a village girl of his mother's choosing instead of a foreigner, brought his bride into the family home, and cared for his parents with pride and gratitude. The neighbourhood counted him a model son.

**Q. How did Rakesh care for his ailing father? (2 marks)**
A. As a physician as much as a son: banned fried foods and sweets, prescribed tonics and vitamins, scheduled walks and rest, and supervised the diet strictly. The care was professional, tireless — and experienced by the father as control.

**Q. Why did Varma resent his son's care? (2 marks)**
A. Because it took away his freedom along with his disease: he wanted his sweets, his fried food and his own decisions, and the son's regime treated him like a patient rather than a father. The love that prolonged his life also made his life not his own.

**Q. How did Varma try to escape the regime? (2 marks)**
A. Through small rebellions: bribing the grandchildren to buy him sweets from the bazaar, complaining publicly that the tonics tasted of punishment, and announcing his approaching death to anyone who would listen.

**Q. What is the irony of the title? (2 marks)**
A. That the devotion is real and harmful at once: the son's care extends the father's life against the father's wishes, and the title's praise conceals the story's question — devotion to the father, or to the son's own idea of duty?

**Q. What does the story suggest about the relationship between love and control? (2 marks)**
A. That love without consent slides into control: Rakesh's care is genuine, but because it never asks the father what he wants, it becomes authority. Desai suggests that loving someone includes letting them choose, even wrongly.""",
    """## NEB long answers, solved

**Q. "Rakesh was a devoted son, but his devotion became a cage." Discuss both sides. (8 marks)**
A model answer holds the two truths in balance: on one side, the evidence of real devotion — the feet touched, the mother's choice honoured, the tireless medical care that extended the father's life; on the other, the evidence of the cage — the banned sweets, the scheduled life, the tonics forced on a man who announces he wants to die. It should use the story's reversals (the obedient son becomes the commanding doctor) and the father's small rebellions as the cage's proof, and close on the story's refusal to convict either party: Desai's point is not that Rakesh was wrong to care but that care which never asks is a form of power.

**Q. Sketch the character of old Varma and justify his rebellion. (8 marks)**
A model answer builds the portrait in stages: the proud father announcing his son's results to the street, the grateful beneficiary of the son's rise, and the rebel whose sweetness-smuggling and death announcements are comic on the surface and desperate underneath. It should argue that Varma's rebellion is a claim to personhood: what he demands is not sugar but the right to be consulted, to be a father rather than a case. The strongest answers use his last evening — the tonic refused, the son insistent — as the scene that proves the story's point: the man's final wish was heard only as a symptom.""",
]

S4 = [
    """## The story at a glance

"The Treasure in the Forest" by H. G. Wells is an adventure story that turns on its readers: two rough seamen, Evans and Hooker, murder a Chinese man to steal his map of a buried treasure, sail to the island, find the gold — and die of the touch of it. The treasure is guarded, it turns out, by poisoned thorns the Chinese had planted, and the story's final image is of the gold waiting in the sun for the next claimant. Wells's theme is greed as a fatal instrument, and the colonial subtext — Englishmen looting a Chinese find — is the story's quietest indictment.""",
    """## The plot, retold with an eye on its turns

The setup is a crime told in flashback: the dying Chinese man on the beach, the map he would not surrender, the two seamen who took it from him — the murder that buys the expedition. Wells gives the victim barely a paragraph, and the economy is the point: the whole imperial drama — a Chinese labourer's discovery, Englishmen's entitlement, a life taken for a piece of paper — is compressed into the story's first minutes.

The voyage and the landing build the atmosphere of a Gothic island: the creek, the dense growth, the silence. The discovery scene is the story's hinge: the gold is there, exactly as the map promised — and around it the ground is ringed with a thorny, creeping plant the two men barely notice. Evans, eager, reaches among the ingots; Hooker, more cautious, watches. The poison works with the quietness of all well-made traps: a pricked finger, a numbness, the sudden understanding that the Chinese had guarded their gold not with walls but with botany.

The ending is swift and cold: Evans dies among the treasure he stole the map for; Hooker, realising the truth too late, dies at the boat's edge — and the final image returns to the gold, untouched, gleaming in the forest's silence, waiting. The story's arithmetic is exact: two lives spent for the treasure, and the treasure has not moved.""",
    """## The devices, with evidence

- **Irony of fate** — the master device: the men who murdered for the map die on the very spot the map led to; the treasure is gained and fatal in the same gesture.
- **Foreshadowing** — the dying Chinese man's gestures toward the map, the island's too-quiet growth, the thorns noticed and dismissed: Wells marks the trap in advance and lets greed walk into it anyway.
- **Atmosphere** — the Gothic island: creek, density, silence, heat — a setting that feels wrong before anything goes wrong, priming the reader for the retribution.
- **Symbolism** — the poisoned thorns are the story's thesis in an image: wealth guarded by the violence of those who hid it; the gold that outlives its thieves is greed's own eternity.
- **Economy and restraint** — the murder is told in a breath, the deaths in a page: Wells trusts the idea to carry the horror, and the brevity is the cruelty.

The exam question "why do the treasure hunters die?" is answered in one line: because the treasure was defended — by its owners' poison and by the story's own moral law, which charges greed at full price.""",
    """## The characters worth an essay

**Evans and Hooker** are less characters than instruments of greed — but Wells distinguishes them finely: Evans is the eager hand, first to the gold, first to touch the thorns; Hooker is the slower, more cautious intelligence that sees the trap a moment too late. Their difference makes the story's lesson universal: caution does not save the man who is already inside the crime.

**The Chinese man** — barely present, entirely central: the discoverer of the treasure, the keeper of its secret, and the story's first death. His murder is the moral transaction that prices everything after it, and Wells's refusal to name him fully is itself the colonial indifference the story indicts.""",
    """## The themes worth an essay

**Greed and retribution** — the central theme: the treasure's price is exact, and the collectors pay it in full; the story is a moral machine. **Colonial greed** — the Englishmen's casual entitlement to a Chinese discovery is the story's historical argument: the poison is only the island's version of the resistance the looters never expected. **The silence of nature as justice** — no avenger appears; the thorns do the work: the theme that the world's traps are patient. **The folly of shortcuts** — a map stolen, a murder committed, and the treasure still out of reach: the theme that what is taken by force is never truly held. Anchor the essay in the final image — the gold waiting — and the theme completes itself.""",
    """## NEB short answers, solved

**Q. How did Evans and Hooker get the treasure map? (2 marks)**
A. By murder: the Chinese man who discovered the hoard would not surrender its secret, and the two seamen took the map from him as he lay dying on the beach. The crime is the story's moral first move and the price of everything after.

**Q. What did they find on the island? (2 marks)**
A. Exactly what the map promised: a hoard of gold ingots hidden in the forest's dense growth. But the ground around the treasure was ringed with a thorny, creeping plant the Chinese had planted as a guard — the detail the greedy eye does not stop to read.

**Q. How did the treasure kill them? (2 marks)**
A. Through the thorns: Evans, reaching among the ingots, was poisoned by the plant's touch, and Hooker, realising the truth too late, was poisoned as well before he could escape. The Chinese had defended their gold with poison rather than walls.

**Q. What is the significance of the ending's image? (2 marks)**
A. The gold lies untouched in the sun, waiting for the next claimant: the treasure has outlived its thieves as it outlived its owners. The image delivers the story's verdict — greed's reward is not possession but the grave beside the prize.

**Q. How does the story criticise colonial greed? (2 marks)**
A. In its casting: Englishmen murder a Chinese discoverer to loot his find, assuming the island's wealth is theirs for the taking. The poison that kills them is the colonised world's silent resistance — the story's retribution is both botanical and moral.

**Q. What role does foreshadowing play in the story? (2 marks)**
A. It marks the trap before it springs: the dying man's gestures, the island's unnatural silence, the thorns noticed and ignored. Wells lets greed walk past every warning sign, which is how the story makes its point about the blindness of desire.""",
    """## NEB long answers, solved

**Q. "The treasure in the forest is a moral trap as much as a physical one." Discuss. (8 marks)**
A model answer works both senses of trap: the physical — the poisoned thorns planted by the treasure's owners, which kill Evans among the gold and Hooker at the boat — and the moral — the murder that purchased the map, the entitlement that never asked whose treasure it was, and the blindness that ignores every warning sign. It should trace the story's economy (the murder told in a breath, the deaths in a page) and close on the final image: the gold waiting in the sun, the story's statement that the trap resets itself for the next claimant, because greed does not learn from the last set of corpses.

**Q. How does Wells build suspense and atmosphere in the story? (8 marks)**
A model answer organises the analysis by stages: the flashback murder that prices the expedition in blood; the voyage and landing with their Gothic silence and density; the discovery scene's double vision (the gold gleaming, the thorns unnoticed); and the poison's slow, quiet working. It should discuss foreshadowing as the engine of suspense — every warning the men ignore raises the reader's dread — and the restraint of the prose, which lets the horror arrive without commentary. The strongest answers note that the atmosphere is itself a device of justice: the island feels wrong because it is wrong.""",
]

S5 = [
    """## The story at a glance

"My Old Home" by Lu Xun is a story about going back and finding that home exists only in memory. The narrator, educated and now urban, returns to his hometown after twenty years to move his mother and the household, and meets Runtu — the peasant boy of his childhood, the friend who taught him the countryside's secrets — now a stooped, silent father of many, broken by taxes and famine, who calls his old playmate "Master". The story's sorrow is the wall that has grown between them, and its hope is carried by the children of the next generation — and by the famous closing image: hope is like a road; it exists because people walk it.""",
    """## The plot, retold with an eye on its turns

The return is the story's frame: the narrator arrives in cold, grey weather to sell the family property and transport his mother — and the hometown of memory is disappointingly small, dim and unimproved. The melancholy is established before any meeting: the place itself has shrunk.

The memory of Runtu is the story's warm centre: the boy of the golden-necked gull picture, quick and fearless, who showed the young master the snow-ground traps, the shells, the watermelon fields under the moon — the image of a friendship that had no class in it. The reality arrives with the man: grey and wrinkled, hands cracked, red-rimmed eyes, and the voice that changes everything — "Master!" The narrator chokes; the childhood equality has become an adult hierarchy, installed not by law but by need and habit.

The middle deepens the portrait: Runtu's hardships — famines, taxes, soldiers, the many children — told in his own halting account; the household goods he takes (the furniture, the incense burner and the two bowls of the kitchen god); the mother's suggestion that they remain friends, and Runtu's own humble refusal — the wall is now his as well as the world's. The departure scene carries the story's hope: the narrator watches Runtu's grandson Hong'er and his own nephew Shui-sheng playing as equals, and refuses to let the wall be their inheritance. The close is the essay within the story: hope cannot be proved, but it is useful — like a road: the way was never there until feet made it, and walking makes it still.""",
    """## The devices, with evidence

- **Contrast** — the story's engine: memory against reality — the quick, bright boy against the stooped, silent man; the golden moonlit watermelon field against the cold grey hometown; the children's equality against the adults' hierarchy.
- **Symbolism** — the wall ("a thick barrier had been set up between us") is the story's central image: class distance as architecture. The incense burner Runtu takes is superstition's furniture; the road of the closing lines is hope itself.
- **First-person retrospection** — the adult narrator examining his own childhood with tenderness and guilt: the form lets the story hold both the affection and the failure.
- **Imagery** — the golden moon, the green watermelons, the silver necklace of the gull: the remembered world painted in colour against the present's grey, so that the reader feels the loss as light.
- **The closing metaphor** — hope as a road: existence argued from practice — the way is made by walking — the story's philosophy compressed into its last sentences.

The exam question "what does the 'wall' between the narrator and Runtu represent?" is answered by class and habit: the hierarchy that grew up between two former playmates — built by poverty, custom and the word "Master" — and kept standing by both sides' resignation.""",
    """## The characters worth an essay

**The narrator** is the story's conscience: educated, urban, and honest enough to feel the shame of his own elevation. His gesture — wanting to refuse the "Master", wanting the children to stay equals — is the story's moral action, small and insufficient and real.

**Runtu** is the story's heart and its indictment: the vivid boy become the broken man, and the tragedy is that his politeness — the bowed head, the "Master" — shows the hierarchy has colonised his own soul. His hardships are the story's social document: famine, taxes, soldiers, the many mouths. **The children, Hong'er and Shui-sheng**, are the story's argument that the wall is made, not natural: they play as equals because they have not yet been taught otherwise, and the narrator's hope is precisely that they never will be.""",
    """## The themes worth an essay

**Class and its walls** — the central theme: the friendship that class destroyed and the hierarchy that both men maintain; the story is a study of how inequality insinuates itself into speech. **Memory and change** — the hometown that shrinks, the friend who ages: the theme that return is impossible because the past is not a place. **Hope as practice** — the closing metaphor: hope is not a prediction but an activity, a road made by walking. **The next generation** — the children's equality as the story's unfinished project: the narrator's refusal to pass the wall down. Anchor the essay in the "Master" scene and the closing road, and the analysis holds both sorrow and hope.""",
    """## NEB short answers, solved

**Q. Why does the narrator return to his old home? (2 marks)**
A. To move his mother and the household to the city where he now lives, selling the family property in the process. The practical errand becomes an emotional audit: the visit measures the distance between the home he remembers and the one he finds.

**Q. Who was Runtu in the narrator's childhood? (2 marks)**
A. A labourer's son and his playmate — quick, bright and fearless, who taught him the countryside's skills: snow-ground bird traps, shells, the watermelon fields guarded from badgers under the golden moon. The friendship was equal and vivid.

**Q. How has Runtu changed when they meet again? (2 marks)**
A. Entirely: grey and wrinkled, eyes red-rimmed, hands cracked like bark, he is a stooped father of many, crushed by famine, taxes and soldiers. The boy's liveliness has been worn away by hardship — and his first word to his old friend is "Master".

**Q. What does the word "Master" signify in the story? (2 marks)**
A. The wall: the class hierarchy that has grown between two former playmates, accepted even by Runtu himself. The word marks the death of the childhood equality and the story's central sorrow — that the barrier is maintained by the very people it burdens.

**Q. What hope does the narrator place in the children? (2 marks)**
A. That the wall need not be inherited: watching Hong'er and Shui-sheng play as equals, he hopes the next generation will not learn the hierarchy that divided their fathers. The children are the story's argument that the wall is made, not natural.

**Q. Explain the closing metaphor of hope as a road. (2 marks)**
A. Hope is like a road: it did not exist originally, and it comes into being because people walk it. The metaphor argues that hope is not a forecast but a practice — made real by the walking, exactly as the way is made by feet.""",
    """## NEB long answers, solved

**Q. "A thick wall had grown between the narrator and Runtu." What is the wall, and how did it grow? (8 marks)**
A model answer defines the wall as class distance internalised: the hierarchy of master and labourer that replaced childhood equality, expressed in the word "Master", the bowed head and the careful speech. It should trace how it grew — the narrator's education and urban rise, Runtu's crushing hardships, the customs both men now obey — and use the memory passages (the traps, the watermelon field) to show what the wall replaced. The strongest answers note the wall's cruellest feature: it is maintained by both sides, and Runtu's own resignation is the story's deepest grief — the hierarchy has succeeded when its victims defend it.

**Q. "Hope is like a road; it exists because people walk it." Discuss this closing idea in relation to the whole story. (8 marks)**
A model answer unpacks the metaphor philosophically and narratively: philosophically, hope is presented not as expectation but as practice — the road is made by walking, and the walking is the hope; narratively, the story has just demonstrated the principle, since the children's untaught equality is a road that the adults could choose to keep open or let grow over. It should connect the idea to the narrator's refusal to pass the wall down, and close on the story's structure: the melancholy of the return is answered not by a promise but by an activity — which is why the story ends with a metaphor of motion rather than a statement of comfort.""",
]

S6 = [
    """## The story at a glance

"The Half-Closed Eyes of the Buddha and the Slowly Sinking Sun" by Manjushree Thapa is a story about two ways of seeing the same country. A tourist guide spends a day showing a visiting teacher the Kathmandu the tourists buy — the Shangri-La of golden temples, smiling faces and timeless serenity — while the teacher keeps seeing what the brochure crops out: the polio-stricken child carried on a sister's back, the poverty the postcard light conceals. The day ends with the sun sinking and the Buddha's half-closed eyes looking down on both sights at once, and the story's question stands: serenity or suffering — which is the true Nepal, and who benefits from the answer?""",
    """## The plot, retold with an eye on its turns

The setup is a guided day: the guide narrates the valley's glories in the language of the trade — the stupas and shrines, the "living museum", the smile of the people — and the story's first movement is the tourist's Kathmandu, polished and performed. Thapa writes the guide's patter with precision: it is not a lie exactly, but a selection, and the selection is for sale.

The teacher is the story's counter-eye: polite, quiet, and unconvinced — she has been working in the country's west, among the poor, and the day's beauty keeps snagging on what she knows. The story's central scene is the house they visit where a child lies paralysed — the family's economy of care, the sister who carries him, the mother's endurance — and the guide's discomfort in that room is the story's turn: the performance meets the fact and cannot speak.

The close braids the story's two images: the sinking sun and the half-closed eyes — the gaze of the Buddha, serene, impartial, half-shut — over a city where the tourist's dusk and the family's night arrive at once. The story refuses to resolve: the guide and the teacher part with courtesy, each carrying the other's sight, and the reader is left holding both Nepals — the one that is sold and the one that is lived.""",
    """## The devices, with evidence

- **Contrast** — the story's engine: the tourist's golden Kathmandu against the teacher's Kathmandu of hospital queues and carried children; the performed smile against the endured day.
- **Juxtaposition of images** — the title itself: the Buddha's half-closed eyes and the sinking sun set side by side so that serenity and decline illuminate each other; the pairing is the story's argument.
- **Symbolism** — the half-closed eyes: contemplation that can also read as indifference — the divine calm that watches suffering without intervening; the sinking sun: the day, the postcard and perhaps the myth all going down together.
- **Irony** — the guide sells "timeless serenity" in a country whose suffering is very timely; the tourist industry's Shangri-La is built on cropping the frame.
- **Two narrating consciousnesses** — the story moves between the guide's patter and the teacher's silence, letting the reader hear the sale and the doubt in alternating breaths.

The exam question "what do the half-closed eyes of the Buddha symbolise?" is answered by the double reading: serene contemplation — and the indifference of a gaze that sees both the temple and the tenement and closes on neither.""",
    """## The characters worth an essay

**The guide** is the story's compromise: not a villain but a working man selling the image his market pays for — and his discomfort in the poor household shows the performance is wearing thin even on its performer. **The teacher** is the story's conscience: she has seen the country's interior — the west, the poverty, the sick child — and her quiet refusals to be charmed are the story's friction. **The paralysed child and his family** are the story's ground truth: the sister who carries him is the Nepal no brochure prints, and the family's endurance is the story's answer to the question of which Nepal is real — both, the story says, at the same hour, under the same eyes.""",
    """## The themes worth an essay

**Two views of a country** — the central theme: the packaged East sold to visitors against the lived East endured by locals; the story asks who profits from the first and who pays for it. **Serenity and suffering** — the Buddhist image interrogated: is the half-closed gaze peace, or the luxury of not looking? **Tourism and its gaze** — the theme of representation: what the visitor is shown is a product, and the cropping is economic. **Compassion as action** — the teacher's knowledge without the guide's commerce suggests a third way of seeing: seeing that costs. Anchor the essay in the house scene and the closing image, and hold both Nepals to the end.""",
    """## NEB short answers, solved

**Q. What does the tourist guide show the visitor? (2 marks)**
A. The packaged Nepal: golden temples, ancient stupas, smiling faces and timeless serenity — the Shangri-La of the tourist trade. The story presents this as a selection rather than a lie: a real beauty curated to crop out the poverty beside it.

**Q. How does the teacher's view differ from the guide's? (2 marks)**
A. She sees the same sights through the knowledge of the country's interior — the west, the poor, the sick — and the beauty keeps snagging on what she knows. Where the guide performs, she registers; her silence is the story's counter-narration.

**Q. What is the significance of the paralysed child in the story? (2 marks)**
A. The child is the reality the postcard crops out: a family's economy of care, a sister who carries him, endurance without spectacle. The guide's discomfort in that house is the story's turn — the performed serenity meets the fact it was built to exclude.

**Q. What do the half-closed eyes of the Buddha symbolise? (2 marks)**
A. A double image: serene contemplation — and, read against the day's suffering, the indifference of a gaze that watches both the temple and the tenement without intervening. The story lets both readings stand and asks the reader to choose, or to hold both.

**Q. What does the sinking sun suggest at the story's end? (2 marks)**
A. The close of the day and of the performance together: the tourist's dusk and the poor family's night arrive at once. The image suggests that the two Nepals share one clock — the sunset does not discriminate, and neither, the story implies, should the seeing.

**Q. What is the story's central conflict? (2 marks)**
A. Between two ways of seeing the same country: the commercial image sold to outsiders and the lived reality known to insiders. The conflict is not resolved but shared — each character ends the day carrying a trace of the other's sight.""",
    """## NEB long answers, solved

**Q. "The story contrasts the Nepal that is sold with the Nepal that is lived." Discuss. (8 marks)**
A model answer builds the two Nepals with the story's own evidence: the guide's patter — stupas, smiles, timeless serenity — against the teacher's knowledge — the west, the hospital queues, the carried child — and stages the collision in the poor household scene, where the performance cannot speak. It should analyse the title's juxtaposition as the story's thesis in images: the half-closed eyes and the sinking sun holding serenity and decline in one frame. The strongest answers close on the economics of the gaze: the tourist Nepal is a product, the lived Nepal its cost, and the story's honesty is in refusing to let either image cancel the other.

**Q. Sketch the character of the tourist guide and assess his role in the story. (8 marks)**
A model answer presents him as compromise embodied: a working man whose patter is professional skill rather than malice, whose discomfort in the poor house shows the performance straining, and whose final silence with the teacher is the story's hope — the saleable image has been cracked by contact with the fact. It should contrast him with the teacher as the story's two eyes, and argue that his role is to make the reader complicit: the reader, like the tourist, has been enjoying the golden Kathmandu, and the guide is the mechanism by which the story hands over the bill.""",
]

S7 = [
    """## The story at a glance

"A Very Old Man with Enormous Wings" by Gabriel García Márquez is magical realism's most famous lesson: an angel falls into a poor family's courtyard during a storm, and the neighbourhood's response is to charge admission. Pelayo and Elisenda find the creature face-down in the mud, cage him in the chicken coop, and grow rich on the crowds who come to poke him — until a travelling spider-woman carnival steals the audience and the angel is forgotten. He endures, molts, and one morning flies away. The story's method is its meaning: the fantastic told in the flat tone of the ordinary, so that the miracle is ignored in the same voice the poor ignore their own suffering.""",
    """## The plot, retold with an eye on its turns

The discovery is deliberately undramatic: after three days of rain, crabs in the house, a sick child, and a smell the sea has left, Pelayo finds an old man with enormous wings lying face-down in the courtyard, dressed like a ragpicker, with only a few faded hairs left on his skull. The neighbourhood's wise woman pronounces him an angel; the couple cage him anyway — the practical response to the sacred.

The middle is the story's satire of faith as commerce: the crowds arrive with their ailments and their curiosity, the couple charge five cents admission and build a mansion from the receipts; the parish priest, Father Gonzaga, tests the angel with Latin — the credentials of a miracle — and finds him wanting, while the crowd's treatment grows crueler (they burn him with an iron to see if he is alive; he answers with the tolerant language of an ancient animal). The angel's patience is the story's centre: he eats mothballs out of hunger, ignores the visitors, and waits.

The turn is commercial, not spiritual: a spider-woman carnival — a girl changed into a tarantula for disobeying her parents, who tells her story for a penny — draws the crowds away, and the angel sinks into the household's neglect, his feathers growing back in the chicken coop. The ending is the story's grace note: one morning, in December's weak sun, the angel stretches, takes off clumsily across the courtyard — knocking loose the onions — and flies away, while Elisenda, chopping onions, watches him go and feels, at last, something like relief that he is no longer an annoyance in the house.""",
    """## The devices, with evidence

- **Magical realism** — the story's master technique: the angel is narrated in the same flat, domestic tone as the crabs and the rain, so that the fantastic enters the ordinary without ceremony — and the reader's unease is the point: we, like the villagers, cannot decide what to do with a miracle.
- **Satire** — the story's sharpest edge: faith as ticket booth, miracles as spectacle, religion as credential-checking (Father Gonzaga's Latin test); the crowd's cruelty and the church's bureaucracy are indicted in the same gentle voice.
- **Irony** — layered: the angel performs no miracle the crowd recognises, and the real miracle — the couple's wealth, the child's recovery — goes uncredited; the spectacle that finally draws the crowd is a morality tale in spider form, more instructive and less divine.
- **Symbolism** — the wings (the sacred, fallen into the mud and caged), the chicken coop (the domestication of the divine), the spider-woman (punishable sin as better theatre than unearned grace), the flight at the end (the sacred's indifference to human judgment).
- **Matter-of-fact tone** — the narration never registers wonder, and that refusal is the story's commentary: the villagers' failure to see is reproduced in the sentence structure itself.

The exam question "how does Márquez treat the supernatural?" is answered by the tone: with the calm of the everyday — the angel is mud-stained, moth-eaten and admission-priced — and the calm is what indicts the world that receives him.""",
    """## The characters worth an essay

**The old man with wings** is the story's sacred centre and its most passive figure: patient, silent, endureing — his divinity consists precisely in refusing to perform. He is an angel who fails every test the village sets (he does not understand Latin, does not heal on demand, does not fit the iconography) and whose only miracle is survival.

**Pelayo and Elisenda** are ordinary humanity under the story's gentle lens: not evil, merely practical — they cage the sacred because it arrived inconveniently, profit from it because poverty is pressing, and forget it because the crowd moved on. Elisenda's final relief — watching the angel leave as she chops onions — is the story's coldest and truest sentence. **Father Gonzaga** is institutional religion as procedure: exams, credentials, correspondence with Rome — faith administered until it dies of paperwork. **The spider-woman** is the crowd's true taste: a lesson with a moral, priced at a penny — the story's satire of what people prefer their wonders to be.""",
    """## The themes worth an essay

**The human response to the miraculous** — the central theme: given an angel, the village builds a ticket booth; the story argues that wonder is the first casualty of habit. **Cruelty and indifference** — the crowd's pokes and burns, the couple's cage and final relief: the theme that the sacred is treated as the villagers treat each other. **Faith as spectacle versus faith as understanding** — the spider-woman outdrawing the angel: the crowd prefers a moral it can buy to a mystery it must sit with. **Poverty and pragmatism** — the couple's actions are driven by need, and the story's satire is tempered by its sympathy: the poor cannot afford reverence. Anchor the essay in the ticket booth, the Latin test and the final flight.""",
    """## NEB short answers, solved

**Q. How do Pelayo and Elisenda treat the old man with wings? (2 marks)**
A. As a problem and then as an asset: they cage him in the chicken coop, charge admission to see him, grow rich on the crowds, and neglect him when the audience moves on. Their treatment is practical rather than reverent — the sacred handled like livestock.

**Q. Why does the crowd lose interest in the angel? (2 marks)**
A. Because a better show arrives: the spider-woman carnival, a girl transformed into a tarantula for disobeying her parents, tells her moral story for a penny. The crowd prefers a wonder with a lesson they can buy to a mystery that refuses to explain itself.

**Q. What tests does Father Gonzaga apply to the angel? (2 marks)**
A. Institutional ones: he examines the creature, tries him with Latin — the language of God, in the church's accounting — and finds him wanting, then corresponds with his church superiors while awaiting a verdict. Faith is administered as procedure, and the angel fails the paperwork.

**Q. How does the angel finally leave? (2 marks)**
A. Unannounced and unmiraculous: one December morning, his feathers regrown, he stretches, takes off clumsily across the courtyard — shedding feathers, knocking the onions — and flies away, while Elisenda watches with relief that he is no longer an annoyance in the house.

**Q. What is the significance of the spider-woman? (2 marks)**
A. She is the crowd's preferred miracle: a spectacle with a moral — sin punished, story included, admission cheap. Her success against the silent angel satirises what audiences want from the extraordinary: a lesson, a price tag, and no demands on the soul.

**Q. How does the story's tone serve its meaning? (2 marks)**
A. By refusing wonder: the angel is narrated in the flat domestic register of crabs, rain and laundry, so the miracle is received as household news. The tone reproduces the villagers' blindness — the reader feels what it is to live beside the sacred and treat it as furniture.""",
    """## NEB long answers, solved

**Q. "The story is a satire of human response to the miraculous." Discuss with evidence. (8 marks)**
A model answer gathers the satire's targets in order: the couple's ticket booth (the sacred monetised), the crowd's cruelty (pokes, burns, the iron), the church's credentialism (Father Gonzaga's Latin and correspondence), and the spider-woman's triumph (morality as better theatre than mystery). It should use Márquez's flat tone as the satire's vehicle — the narration is as unimpressed as the villagers — and close on the story's counter-evidence: the child's recovery, the angel's endurance and the final flight, the miracles that happen off-stage of attention, unnoticed by the very audience praying for them.

**Q. Sketch the character of the old man with enormous wings and interpret his significance. (8 marks)**
A model answer builds the portrait from the story's details: ragpicker's clothes, faded hairs, patient endurance, the mothballs eaten from hunger, the tolerance of an ancient animal, the refusal to perform. It should argue his significance through negation: he is an angel who fails every human test of angelhood — language, beauty, utility, spectacle — and whose divinity consists in what he will not do for an audience. The strongest answers read the final flight as the story's verdict: the sacred does not need to be understood to be real, and it leaves when the crowd's interest moves on — indifferent, unvengeful, and finally free.""",
]

FILES = {
    "content/notes/concepts/class-12/english/literary-analysis/01-short-story-1-neighbours-tim-winton.json": S1,
    "content/notes/concepts/class-12/english/literary-analysis/02-short-story-2-a-respectable-woman-kate-chopin.json": S2,
    "content/notes/concepts/class-12/english/literary-analysis/03-short-story-3-a-devoted-son-anita-desai.json": S3,
    "content/notes/concepts/class-12/english/literary-analysis/04-short-story-4-the-treasure-in-the-forest-h-g-wells.json": S4,
    "content/notes/concepts/class-12/english/literary-analysis/05-short-story-5-my-old-home-lu-xun.json": S5,
    "content/notes/concepts/class-12/english/literary-analysis/06-short-story-6-the-half-closed-eyes-of-the-buddha-and-the-slowly-sinking-sun-manjushree-thapa.json": S6,
    "content/notes/concepts/class-12/english/literary-analysis/07-short-story-7-a-very-old-man-with-enormous-wings-gabriel-garcia-marquez.json": S7,
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
