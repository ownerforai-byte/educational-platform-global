#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Native close readings for the seven class-11 NEB short stories.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-stories-c11.py
"""
import json

GIANT = [
    """## The story at a glance

"The Selfish Giant" by Oscar Wilde is a fairy tale — a short fantasy with a moral — but it is also one of the quietest religious stories in the syllabus. A giant, returning from seven years with the ogre, finds children playing in his garden and builds a wall to keep them out. Spring refuses to enter; the garden stays in winter while the world blooms. One small child, too little to climb the wall, changes everything — and the last time we see him, he bears wounds in his hands and feet. Wilde wrote it for children and smuggled in a sermon; the exam asks for both.""",
    """## The plot, retold with an eye on its shape

The story moves in a clean arc that candidates should be able to draw: **spring without, winter within**. The giant's absence let the children play and the seasons visit; his return and his wall freeze the garden — frost and snow move in, the North Wind rattles the windows, and the flowers will not grow under the stone. Then the turning point: children slip through a gap, and where a child sits, spring sits too — except in one corner, where the small boy weeps and cannot climb, and winter holds that corner alone.

The giant sees the arithmetic — one tree blooming because a child sits under it — and understands. He knocks down the wall himself, the act that matters: the selfish man demolishes his own selfishness. The children return, the garden revives, and the little boy — the one the giant helped — is never seen again, until the giant is old and finds him under a blooming tree, wounded and shining. The boy takes the giant to his garden, which is paradise; the giant dies covered in white blossoms. The ending is not a punishment but a welcome — the moral completes itself as a reward.""",
    """## The devices, with evidence

- **Symbolism** — the garden is the giant's heart: walled, it winters; opened, it blooms. The seasons are moral states, not weather. The little boy with wounded hands and feet is the Christ figure, and the blossoms that cover the dying giant are the sign of forgiveness given and received.
- **Personification** — frost, snow, hail and the North Wind are guests who move in and behave badly: winter is not described but dramatised, sitting in the garden all day and refusing to leave.
- **Irony** — the wall built to keep beauty for himself keeps beauty out entirely: the giant hoards spring and gets winter. The story's lesson is delivered by an economic fact — the garden only produces when shared.
- **Contrast** — the whole tale runs on paired opposites: winter/spring, wall/openness, selfishness/love, and the giant's great castle of a house against the small boy who cannot climb a wall.
- **Repetition** — the formula of the fairy tale ("the children had no place to play") and the recurring image of the blooming tree give the story its rhythm and its rhyme of meaning.

The exam question "why does spring not enter the garden?" is answered in one sentence: because the children are not there — and that sentence is both plot and moral, which is the mark of a well-made fairy tale.""",
    """## The characters worth an essay

**The giant** is the story's whole argument: not a villain but a sinner who repents, which is why children and examiners forgive him. Watch the stages — selfishness (the wall), blindness (he blames the weather), insight (he sees the child and the blossom and connects them), action (he tears down the wall), love (he helps the small boy over it), and grace (he is welcomed at the end). The character sketch the exam wants is a journey, not a list.

**The little boy** appears twice and changes everything both times: first as the child too small to climb — the test of the giant's new kindness — and last as the wounded, shining figure who repays the kindness with paradise. **The children** collectively are spring's agents: innocence as a force of nature. And note what Wilde does not do: he never scolds the giant in the narrator's voice. The garden does the preaching.""",
    """## The themes worth an essay

**Selfishness and its cost** — the wall as the story's central image: everything the giant locks in he actually locks out. **Love and sharing as the condition of happiness** — spring enters only where a child is; joy is a shared economy. **Redemption** — no sin is final; the giant's repentance is complete and rewarded, and the story's theology is as simple as its moral: it is never too late. **Innocence as sacred** — the child is the story's holy figure, and cruelty to children is the one crime the tale cannot forgive. Write any of these with one concrete image from the story — the frost rattling, the boy weeping under the tree — and the essay breathes.""",
    """## How NEB asks it

**"Why did the giant build the wall, and what was the result?" (4 marks)** — selfishness, then the garden's winter; the result is the lesson. **"Who was the little child the giant saw last? Describe the scene."** — the Christ figure with wounds of love; describe the blossoms and the welcome. **"How did the giant change? Trace his transformation."** — the five stages above; this is the long-question home ground. **"What is the moral of the story?"** — stated once, plainly, then supported with the wall's irony.

And the habit this tale teaches for all fairy tales in the syllabus: in a moral fantasy, every image is doing double duty as plot and lesson. Answer plot questions with the moral in view and moral questions with the plot in hand — the exam rewards candidates who refuse to separate them.""",
]

PORTRAIT = [
    """## The story at a glance

"The Oval Portrait" by Edgar Allan Poe is Gothic horror in miniature — two short paragraphs of frame and one page of tale inside it — and it contains one of literature's cruellest ideas: a portrait so lifelike that the life it took is visible in it. The narrator, wounded, shelters overnight in a decaying chateau, finds a book that describes the house's paintings, and reads the entry on a startlingly realistic oval portrait of a young woman. The entry tells the story: her painter husband, obsessed with his art, painted her from life — and when he finished and turned to look at his wife, she was dead. Poe's theme is the title of the story's logic: art achieved at the price of life.""",
    """## The plot and its frame, retold with an eye on structure

The story is built as a **frame narrative** — a story inside a story — and the frame is doing quiet work. The wounded narrator and his servant Pedro break into a chateau rich with artistic treasures but heavy with decay: cobwebs, trophies, black curtains. The setting is atmosphere in Poe's signature mode — beautiful, enclosed, faintly ominous — and it primes the reader for the discovery: the narrator studies the paintings by candlelight until the oval portrait stops him "with horror".

The **inset tale** arrives as a book entry, which matters: the story of the painter and his bride is history by the time we read it, already catalogued among the house's dead things. The painter had a bride "who was as beautiful as the day"; he loved his art and she loved him — but "she was humble and obedient", and she sat for weeks in the tower while the husband, deep in his work, "would not see that the tints which he spread upon the canvas were drawn from the cheeks of her who sat beside him". The brush took the life and put it on the canvas: when he looked up, the portrait was alive and the wife was not.

The final line is the story's knife: the painter cries that "this is indeed Life itself!" — and turns to find his wife dead. The narrator's horror at the portrait, in the frame, is therefore justified in a way he never learns: he has been looking at a picture of a death he can feel but cannot name.""",
    """## The devices, with evidence

- **Frame narrative** — the outer story (narrator, chateau, candle) encloses the inner tale (painter, wife, death); the frame distances the horror and makes the inner story feel like evidence rather than invention.
- **Irony** — the deepest device: the more lifelike the portrait, the more lifeless the wife; the painter's triumph is his wife's death; the words "Life itself!" spoken over a corpse. The exam's favourite question lives here.
- **Atmosphere (Gothic setting)** — decay, candlelight, curtains, the tower studio: a world where beauty and death share a room, built detail by detail before anything supernatural is claimed.
- **Symbolism** — the portrait is art as vampire: it feeds on its subject. The tower studio is the artist's isolation from the human world he consumes.
- **Foreshadowing** — the narrator's initial horror at the portrait, before he knows why; the chateau's dead atmosphere announcing the dead bride.
- **Economy** — the whole catastrophe is told in a few sentences; Poe trusts the idea to carry the fear, which is why the story is so short and so hard to forget.

The exam question "what is the central idea of the story?" is answered in one line: art pursued to the point of obsession destroys the life it claims to celebrate — and every device above is a delivery system for that line.""",
    """## The characters worth an essay

**The painter** is obsession given a brush: he loves his art more than his wife, and Poe is careful to make him neither cruel nor careless — he is simply blind, "wrapt" in his work, seeing only the canvas while the life he is copying drains beside him. That blindness, not malice, is what makes the story frightening: destruction by devotion.

**The bride** is the story's moral centre and its silence: "humble and obedient", she sits and fades, and the tale never gives her a word. Her obedience is period-accurate and thematically fatal — the story quietly indicts a world where the wife's duty is to be still while the husband's dream consumes her. **The narrator** in the frame is the reader's stand-in: curious, aesthetic, and finally horrified — his reaction is the story teaching us how to feel about what we have read.""",
    """## The themes worth an essay

**Art versus life** — the central theme: creation that feeds on its subject, beauty achieved at the cost of the living. **Obsession** — the painter's single-mindedness as a force that blinds; the story is a study in how passion justifies destruction. **The passive sacrifice** — the bride's obedience and erasure; a modern reading the exam increasingly welcomes. **The uncanny** — the portrait that is "life itself" while its model dies: the horror not of the supernatural but of the possible. Tie them together in one sentence and the essay has a spine: the story asks what art is worth, and answers with a dead wife and a perfect painting.""",
    """## How NEB asks it

**"What did the narrator find in the book?" (4 marks)** — the entry on the oval portrait: the painter, his bride, the weeks of work, the death. Retell it in order and stop at the knife-line. **"How did the painter's wife die?"** — not violence but substitution: her life passed to the canvas; quote the tints drawn from her cheeks. **"Why is the story titled 'The Oval Portrait'?"** — the portrait is the story's crime scene and its trophy at once: the title names the object in which life and death are indistinguishable. **"Is the story about art or about obsession? Discuss."** — the dialectic frame: art is the instrument, obsession the hand that wields it; the story needs both.

And the habit this tale teaches for all Gothic fiction: track the *atmosphere* before the *event*. Poe builds fear out of rooms, light and silence, and exam answers that notice the room are always one step ahead of answers that wait for the corpse.""",
]

TRUTH = [
    """## The story at a glance

"God Sees the Truth, but Waits" by Leo Tolstoy is a parable of injustice and forgiveness: Ivan Dmitrich Aksionov, a prosperous merchant with a slight weakness for drink, is falsely accused of murdering a fellow merchant, flogged, and sent to Siberia for twenty-six years. In the prison he becomes a holy man — and then the real murderer, Makar Semyonich, is placed in the same cell. The title is the plot: God sees the truth, but waits — and the waiting costs Aksionov everything except the one thing the story is about.""",
    """## The plot, retold with an eye on its turns

The tragedy is set up in two strokes: Aksionov is young, merry, and fond of drink, and a rival merchant stays the night with him. On the road, a soldier asks whose blood is on his coat — the fellow merchant has been found murdered, and a blood-stained knife is discovered in Aksionov's bag. The **irony of fate** is total: the knife belongs to Makar Semyonich, who had slipped it there; Aksionov is convicted because he cannot prove the impossible — that he did not do it.

Siberia: twenty-six years. His wife suspects him (did he confess under drink?); his children forget him; his hair turns grey; he becomes the prison's gentle elder — "Grandfather" — reading scripture, making boots, loved by all. Then the machinery of the story starts again: tunnels are found, and the old man sees Makar digging. He says nothing. That night Makar, desperate, threatens him with a knife — and Aksionov's answer is the story's hinge: he does not accuse. He says he has already lost everything that could be taken; what Makar should fear is God.

Makar breaks. He kneels, confesses the old murder, begs forgiveness — and Aksionov, weeping, forgives: "God will forgive you." He will not tell the authorities, and when the order for Makar's release comes, Makar is gone to find Aksionov's pardon — but Aksionov dies before it arrives. The last line lands the title: the truth was seen, but the pardon waited too long. Earth's justice failed; the story's question is whether the forgiveness was therefore wasted — and Tolstoy's answer is no: the forgiveness saved two men, one from hatred and one from guilt, even though it saved neither from the state.""",
    """## The devices, with evidence

- **Irony of fate** — the master device: the innocent man is convicted on evidence the guilty man planted, and lives the sentence; the blood-stained knife is the story's whole injustice in one image.
- **Dramatic irony** — the reader watches the wife doubt him, the courts err, and the years pass, knowing what none of them know.
- **Biblical allusion and parable form** — the title echoes scripture; the structure (innocence, suffering, patience, forgiveness) is deliberately exemplary: Aksionov is less a character than an example.
- **Symbolism** — the knife (planted guilt), the grey hair and bent back (time served for nothing), the boots he makes (humility, usefulness, a life built in captivity), the prison (the world's justice).
- **Contrast** — the young merry merchant against the grey saint; the state's verdict against God's sight; suspicion against forgiveness.
- **Restraint** — Tolstoy narrates atrocity in a level tone: no speeches, no self-pity; the flatness is the faith.

The exam question "why does the title say God waits?" is answered by the structure: the truth is visible to God from the start, but the human story must run its full course of suffering before the truth can matter more than the sentence.""",
    """## The characters worth an essay

**Ivan Dmitrich Aksionov** is the story's long arc: merchant → accused → convict → saint. The sketch the exam wants has its hinges: the drink that makes the accusation plausible, the cry of "It is not my sin!" that shows his innocence is not serenity but protest, the years that turn protest into peace, and the final forgiveness that completes him. Note that he forgives *before* the confession is useful — the forgiveness is free, which is what makes it moral.

**Makar Semyonich** is guilt in motion: cheerful liar, desperate threatener, broken penitent. His threat with the knife repeats the story's first crime — and his collapse under Aksionov's calm is the proof that the old man has won something no pardon can give. **The wife** appears once and wounds deeply: her suspicion is human and unbearable, and it teaches the story's quieter lesson — injustice injures the innocent through the people who love them.""",
    """## The themes worth an essay

**Injustice and endurance** — the state can take everything except the soul's response; Aksionov's twenty-six years are the theme in duration. **Forgiveness** — the story's summit: forgiveness given freely, without apology received first, and its double rescue. **Faith and divine justice** — God sees the truth; human justice does not; the story's comfort is not that the truth arrives but that it is *seen*. **The corruption of circumstantial evidence** — one planted knife, one coincidence, one ruined life: a civic lesson smuggled inside a parable. Weave two of these with the knife image and the forgiveness scene, and the essay is complete.""",
    """## How NEB asks it

**"Why was Aksionov sentenced though innocent?" (4 marks)** — the planted knife, the blood-stained coat, the lack of proof; state the irony of fate by name. **"How did Aksionov change in Siberia?"** — the arc from protest to peace; the boots, the scripture, the nickname Grandfather. **"Why did Aksionov not reveal Makar to the authorities?"** — the forgiveness scene: he has lost the world's stakes and plays only for the soul's; vengeance has nothing left to pay him. **"Justify the title."** — God saw the truth throughout; the pardon came too late for the world, and the story asks whether that matters — then answers with Aksionov's peace.

And the habit this parable teaches for all moral fiction: when a story is called a parable, its characters are arguments. Describe Aksionov as a *position* the story takes — that forgiveness outlasts injustice — and the analysis stops being summary and starts being reading.""",
]

WISH = [
    """## The story at a glance

"The Wish" by Roald Dahl is a story about nothing but a carpet — and it is one of the most suspenseful things in the syllabus. A small boy, home alone with a scabby dog, is told the red spots on the hallway carpet are hot lava. He invents a game: cross the carpet to the door without touching red. Dahl narrates the crossing in real time, from inside the boy's imagination, and the story ends on the step of the game's decision. Nothing supernatural happens; everything terrifying happens anyway.""",
    """## The plot, retold with an eye on suspense

The setup is three facts: the boy is alone (mother out, father out, only the dog — and the dog is scabby and unwanted, which matters), the carpet is enormous in his eyes, and the game has absolute stakes — touch red and you are burned, as if in a volcano. Dahl makes the carpet a landscape: the red spots are "red lava", the purple ones are safe, and the black — a vast black stretch across the middle — is simply *nothing*, the place where the game has no rules and the boy does not look.

The crossing is narrated as experience, not summary: the first steps are easy, the courage is manufactured ("he must go on"), and Dahl slips inside the boy's head so completely that the reader forgets the floor is a floor. The dog is sent to the far side as witness. The boy reaches the last red and must leap — and Dahl ends the story at the leap's edge: the boy crouches, springs — and the text cuts away mid-air to the empty room, the dog, the wind in the trees. We never see him land. The **open ending** is the story's masterstroke: the game's logic says the black took him; the room says nothing at all. The reader's imagination finishes the fall — which is exactly what the boy's imagination started.""",
    """## The devices, with evidence

- **Suspense** — the story's engine: stakes are imaginary but narrated as absolute, and the pace slows to single steps. Dahl proves that suspense is a matter of *consequence believed*, not danger real.
- **Imagination as the story's world** — the entire action happens inside a child's game; the carpet is a volcano because the boy says so, and the narrative honours his law without irony.
- **Open (ambiguous) ending** — the leap is never completed on the page: the cut-away denies the reader the landing, and the silence is louder than any outcome. The exam's favourite question lives here.
- **Imagery** — heat, colour and scale: the red that "seemed to be breathing", the purple stepping-stones, the black that is not a colour but an absence.
- **Child psychology** — the mixture of fear and will: "he must go on" repeated like a spell; the boy manufacturing courage in real time.
- **The dog as witness** — sent across as spectator and left behind in the final image: the only living thing to see what the reader did not.

The exam question "how does Dahl create suspense?" is answered by naming the imaginary stakes, the slowed time, and the open ending — three devices, one effect.""",
    """## The characters worth an essay

**The boy** is the story's only character, and he is every child at play: rule-maker, risk-taker, self-encourager. Note the details Dahl chooses — the boy alone, the mother's warning about the dog, the game invented out of boredom — and what they build: a child's inner world is as real to him as the floor, and as dangerous. **The scabby dog** is more than furniture: unwanted, itching, loyal, it is the story's only fact of loneliness, and the final image — the dog left waiting on the far side — quietly asks whether anyone landed at all.""",
    """## The themes worth an essay

**The power of imagination** — a carpet becomes a volcano; the theme is the child mind's ability to make law out of play. **Fear and courage** — the boy's fear is real because his game is real to him; courage is shown as the decision to keep moving, one stone at a time. **Childhood solitude** — the empty house and the scabby dog frame the game: children alone invent worlds because the world they have is thin. And **the ambiguity of endings** — Dahl's cut teaches the theme by performing it: some stories refuse to resolve, and the reader must leap too.""",
    """## How NEB asks it

**"What was the game the boy played?" (4 marks)** — the carpet as lava, red as death, purple as safety; state the stakes as the boy holds them. **"What happened when the boy jumped?"** — the honest answer is the story's own: we do not see; the narrative cuts to the empty room. **"How does the story end? Is the boy safe?"** — the open ending, defended: Dahl gives the room, the dog and the wind, and leaves the landing to the reader's imagination — which is why the story lasts. **"What is the theme of the story?"** — imagination's power, with the suspense as its proof.

And the habit this story teaches for all brief fiction: when a story ends without an ending, that refusal *is* the ending. Never answer "what happened?" with a guess; answer with the author's choice not to say — and then say why the not-saying works.""",
]

CIVIL = [
    """## The story at a glance

"Civil Peace" by Chinua Achebe is a post-war story with a survivor's grin. Jonathan Iwegbu counts himself lucky — "Happy survival!" — out of the Nigerian civil war: his own life, his wife Maria, three of four children, and the bicycle he buried and dug up and now taxis for a living. He rebuilds: a room in Enugu, a bar, twenty pounds of egg-rasher money in his pocket. Then thieves come at night, demand the money, and Jonathan — cheerful, rapid, unbroken — hands it over with a sentence that ends the story: "I count it heavier than egg-rasher money." The story's title is ironic, and the irony is gentle, which is the strangest thing about it.""",
    """## The plot, retold with an eye on its tone

The story is a sequence of recoveries. The bicycle: buried, exhumed, bribed past a soldier for two pounds, and turned into the family's first income — "he taxed" it as a taxi. The house: lost to the fighting, replaced by a room in Enugu; the family works, the children pick mangoes, Maria makes breakfast akara balls to sell. The windfall: twenty pounds of ex-gratia "egg-rasher" money paid at the treasury — a comic, bureaucratic scene of queues and swearing clerks that Achebe narrates with affection.

The night visit: thieves knock, announce themselves politely — "who is knocking?" — and the neighbourhood's response is to pray and stay indoors, "we are lost!" from the neighbours being the night's second irony. The thief-leader's voice is the story's centre of dark comedy: he parodies Jonathan's own greeting ("Happy survival!"), mocks the treasury money, and offers to "do you just small small" violence. Jonathan reasons with him in the only language left: he hands over the twenty pounds, tells the neighbours through the window that he has no money to help them find theirs, and goes back to bed. The morning after: the family resumes work as if nothing happened — because, as Jonathan says, what was taken was only money, and "nothing puzzles God".

The tone is the plot's twin: Achebe narrates catastrophe without lament and comedy without cruelty, and the reader finishes the story admiring a man who has learned to lose things gracefully.""",
    """## The devices, with evidence

- **Irony** — layered and load-bearing: the title's "civil peace" over a country of thieves and queues; the thief-leader using Jonathan's own greeting; the neighbours who prayed all night offering to help find the money they did nothing to stop. The exam question "what is ironic about the title?" is answered by listing these.
- **Dialogue in dialect** — the thieves and neighbours speak Nigerian English with its rhythms ("na so", "wetin"); the register is the story's realism and its humour at once, and Achebe's point is political: the people's voice, not the official's, carries the truth.
- **Tone** — resilient, wry, unsentimental: grief acknowledged and outworked in the same sentence.
- **Repetition/refrain** — "Nothing puzzles God" and "Happy survival!": the two sentences Jonathan lives by, one for faith and one for gratitude.
- **Contrast** — the war's scale against the family's small recoveries; the state's chaos against Jonathan's order.

The exam question "how does Achebe create humour in a story about loss?" is answered by the dialect, the parody, and the tone — comedy as survival equipment, not decoration.""",
    """## The characters worth an essay

**Jonathan Iwegbu** is optimism with a work ethic: he counts blessings literally ("this way and that" he counts his family), he converts every loss into a plan, and his cheerfulness is not naivety — the robbery scene shows a man who calculates instantly and yields what cannot be defended. The character sketch the exam wants is *resilience in action*: bicycle, bar, budget, surrender, sunrise.

**Maria and the children** are the story's engine of recovery: the akara balls, the mango-picking, the beer-bar — the family economy that makes Jonathan's optimism practical rather than foolish. **The thief-leader** is the war's residue: eloquent, organised, mocking — the state's failure speaking in the people's grammar. And **the neighbours** are the story's quietest indictment: piety without courage, sympathy without cost.""",
    """## The themes worth an essay

**Resilience and gratitude** — the central theme: survival counted as wealth, loss taken as weather. **The aftermath of war** — the story's setting is its argument: peace declared, order absent, and ordinary people left to police their own nights. **Faith** — "Nothing puzzles God" is not fatalism but proportion: God's ways exceed explanation, so the survivor works and accepts. **Community and its failures** — the neighbours' prayers versus their silence; the family as the only institution that works. Write the essay with the bicycle and the twenty pounds as your two anchors and it will hold.""",
    """## How NEB asks it

**"Why does Jonathan count himself lucky?" (4 marks)** — the inventory: his life, Maria, three children, the bicycle; the counting habit as character. **"What is ironic about the title 'Civil Peace'?"** — the peace is civil in name only: thieves, queues, silence; list the ironies. **"How did Jonathan react to the robbery, and what does it show?"** — the surrender without despair, the morning's work unchanged; the reaction shows proportion, not passivity. **"What does 'Nothing puzzles God' mean in the story?"** — acceptance of loss within effort: the sentence is faith applied to economics.

And the habit this story teaches for all post-colonial fiction: listen to the dialogue before judging the plot. Achebe's people speak the story's truth in their own grammar, and answers that quote the thieves' English are always more convincing than answers that paraphrase it into standard prose.""",
]

SOLDIERS = [
    """## The story at a glance

"Two Little Soldiers" by Guy de Maupassant is a small story with a fatal centre: two Breton conscripts, Luc Le Ganidec and Jean Kerbalan, poor friends from the same village, serving far from home. Their one pleasure is Sunday walks by the river — until they begin, secretly, to watch a young milkmaid who lives at a farmhouse. Luc courts her; Jean discovers too late that his friend has not been sharing a walk but winning a wife. The story ends in the river. Maupassant tells it in a voice so plain that the ending arrives like weather — which is his signature, and the story's lesson.""",
    """## The plot, retold with an eye on its turns

The setup is friendship in uniform: two soldiers of the same countryside, "little" in the title because they are small in the army's world — underpaid, homesick, joined at the hip on Sundays. The routine: coffee at the inn, the walk along the river, the recollection of home. Then the change, delivered in a detail so small the reader may miss it: Luc begins to slip money from his pocket — he is spending, secretly, on something.

The milkmaid enters as scenery: a farm girl who milks at the edge of their path, and whom they first watch only "because she was pretty". The Sundays reorganise around her — the walk now has a destination. And here Maupassant plants the story's quietest line of foreshadowing: Jean is "a little sadder" on these walks, without knowing why. The reader is told nothing of love; the sadness is the tell.

The blow arrives as gossip: the soldiers at the barracks report that Luc has married the milkmaid — the friend who walked beside him every Sunday, spending his coins and his silences on the girl, said nothing. Jean does not rage. He sits apart, eats nothing, and at their old resting place by the river — the place of their shared Sundays — he slips into the water. Luc, climbing the slope with his bride, looks back and finds only the clothes on the bank. The story's last image is the empty uniform: friendship's residue on the shore of a betrayal it never named.""",
    """## The devices, with evidence

- **Foreshadowing** — the master device: Jean's growing sadness, his silence, his lost appetite — Maupassant marks the tragedy in advance and lets the reader walk into it unprepared anyway.
- **Irony** — the story's bitterest resource: the secret courted under the cover of shared walks; the friend as unwitting chaperone; the wedding announced as barracks gossip; the suicide committed at the *shared* spot, the one place that meant friendship.
- **Understatement and restraint** — no quarrel, no confession, no accusation: Maupassant narrates the catastrophe in sentences as level as a report, and the flatness is what makes it devastating.
- **Symbolism** — the river (the shared pleasure that becomes the grave), the clothes on the bank (the soldier's identity left behind), the milkmaid's cows and pails (the pastoral world of home these soldiers cannot reach).
- **Contrast** — the two soldiers' parallel beginnings and divergent ends; the army's discipline against the heart's lawlessness; speech against silence.

The exam question "how does Maupassant prepare the reader for the ending?" is answered by the foreshadowing list — and the honest addendum that the preparation is invisible on first reading, which is the point: we, like Jean, do not see what is coming until it has come.""",
    """## The characters worth an essay

**Jean Kerbalan** is the story's centre of gravity: quiet, loyal, and in love without knowing it until the knowledge is fatal. Watch what Maupassant gives him — almost no dialogue. His love is conducted entirely in silences: the extra coin he does not spend, the sadness he cannot name, the final Sunday alone. The sketch the exam wants is a study in the unsaid.

**Luc Le Ganidec** is not a villain, and the story is crueler for it: he is ordinary — shy with money, practical in love, careless with his friend's heart in the way people are careless with what they do not think is fragile. His silence about the courtship is the betrayal, and his last look back at the bank is the only moment the story lets him feel it. **The milkmaid** is the story's object and its absence: pretty, kind, and never given a thought of her own — which a modern reading notices and the exam increasingly rewards.""",
    """## The themes worth an essay

**Friendship and betrayal** — the central theme: not a dramatic treachery but an omission, which is why it kills; the friend who shares everything except the one thing that matters. **Loneliness of the displaced** — the soldiers' homesickness is the story's soil: the girl matters because she is a piece of the countryside they lost. **Love as rivalry** — the triangle resolved not by competition but by concealment; the tragedy is that no one ever fought. **The economics of the heart** — Luc's secret coins are the story's quietest detail: even courtship costs, and poverty decides who can afford to speak.""",
    """## How NEB asks it

**"Why were the two soldiers sad on Sundays?" (4 marks)** — homesickness first, then Jean's unnamed love; separate the two sadnesses and the answer is complete. **"How did Luc betray Jean?"** — the concealment, not the courtship: he used their shared walks as cover and told him nothing. **"Why did Jean drown himself?"** — loss of the friend and the girl in one discovery, at the place that held their friendship; the answer should name the spot's symbolism. **"What is the theme of the story?"** — betrayal by silence, with the ending's restraint as evidence.

And the habit this story teaches for all Maupassant and all twist fiction: the twist is prepared, not improvised. Reread the story after the ending and mark every sentence that was doing secret work — the coin, the sadness, the shared spot — and your analysis will read as hindsight, which is exactly what the exam wants.""",
]

ASTROLOGER = [
    """## The story at a glance

"An Astrologer's Day" by R. K. Narayan is a story about a man who tells fortunes he does not believe in — and whose one true prophecy arrives by accident. The astrologer works under a tamarind tree in a crowded market, wrapped in a turban and sacred marks, reading faces with the cunning of long practice. At closing time a stranger challenges him to prove his trade — and the astrologer, looking at the face, recognises it: it is the man he knifed in a village quarrel years ago and left for dead. The story is a masterclass in **irony of fate** and in the quiet accounting of guilt.""",
    """## The plot, retold with an eye on its turns

The setup is a portrait of professional bluff: the astrologer's equipment (cowrie shells, charts, a shawl that looks holy), his client-reading technique — "he knew what he would say" only after studying the face — and his honest inner admission: he had "a working analysis of mankind's troubles", not a knowledge of stars. Narayan builds the man as a shrewd survivor, and the market as a theatre: at night the astrologer lights his crystal and becomes what the crowd needs.

The stranger arrives at closing: aggressive, drunk on challenge, demanding the astrologer answer or repay. The game turns when the astrologer, by streetlight, sees the face — and gambles everything on one specific truth: "You were left for dead once." The details he supplies — stabbed, thrown into a well, rescued — are his own memory, not his astrology, and the stranger, Guru Nayak, is stunned: this is exactly his story, and he has come to the city hunting the man who did it, to finish him.

The astrologer's advice is the story's hidden confession: go home; the attacker died months ago, crushed under a lorry — "don't waste your time looking for him." The stranger leaves, and the astrologer goes home to his wife, tells her the day's great news (a client paid well), and then makes the confession the story has been waiting for: he thought he had killed a man once, and has carried it for years — "I thought I had the blood of a man on my hands. He is alive." The wife's reply closes the story with its final irony: "your sin is now at an end" — and the reader, who alone knows everything, sees that the astrologer's one true reading of the stars was a reading of his own face in another man's.""",
    """## The devices, with evidence

- **Irony of fate** — the master device, stacked: a fake astrologer makes one true prophecy; the truth is his own crime; the client hunting his attacker is brought to him by chance; and the "prophecy" that ends the hunt is a lie told for self-protection that also, genuinely, saves both men.
- **Twist ending** — the recognition scene reverses everything: the day's last client is the story's buried past, and the astrologer's power is revealed as memory.
- **Dramatic irony** — the reader pieces together the recognition before the stranger does; the astrologer's fear, his sudden precision, his strange advice all make sense to us before they make sense to Guru Nayak.
- **Setting as character** — the tamarind tree, the gaslight, the crowd, the vendors: Narayan's market is a stage where appearances are bought and sold, which is the astrologer's trade in miniature.
- **Appearance versus reality** — the turban, the sacred ash, the crystal: the costume of knowledge worn over a man with one real thing to hide.

The exam question "how did the astrologer know the stranger's past?" is the story's hinge: he did not read stars — he recognised the face of the man he stabbed. Every answer should walk through that recognition.""",
    """## The characters worth an essay

**The astrologer** is Narayan's great ordinary man: shrewd, fraudulent, tired, and secretly guilty. The sketch the exam wants has three layers — the professional (the costume and the patter), the private man (a village past, a wife, a child, a debt), and the buried criminal (a knife, a well, twelve years of weight). His final confession, told "with relief" to his wife, is the story's redemption: not forgiveness granted but guilt set down.

**Guru Nayak** is vengeance on legs: scarred, boastful, hunting across cities for a man he believes dead. He is the astrologer's mirror — the past walking in the door — and his acceptance of the fake prophecy is the story's mercy: the lie releases him from a hunt that would have ended in murder. **The wife** has one scene and the last word: her practical delight in the day's earnings and her final line — the sin at an end — deliver the story's closing irony without knowing it.""",
    """## The themes worth an essay

**Irony of fate** — the theme and the plot are the same thing here: chance arranges the meeting, the recognition and the release, and no character plans any of it. **Guilt and its unburdening** — twelve years of carried blood lifted in one evening; the story argues that confession, even partial, is survival. **Appearance versus reality** — the whole market economy of the astrologer's trade is built on costume, and the one true thing he says is said despite it. **The past as inescapable** — the village quarrel travels to the city and waits under a tamarind tree; time does not erase, it merely postpones. Two of these, anchored in the recognition scene, make the essay.""",
    """## How NEB asks it

**"Why did the astrologer leave his village?" (4 marks)** — the quarrel, the knife, the well, the flight; told in his confession to the wife. **"What did the astrologer tell Guru Nayak, and why?"** — the false prophecy as self-protection and as mercy; name both motives. **"Was the astrologer a fraud? Discuss."** — the dialectic frame: a fraud in trade, a truth-teller by accident, a penitent at home; the story's irony needs all three. **"Justify the title."** — the astrologer's day is an ordinary working day that happens to contain his whole past; the title's plainness is the point.

And the habit this story teaches for all twist endings: reread the opening after the close. Narayan plants the guilt in the astrologer's first portrait (the analysis of troubles, the working knowledge of faces), and the reader who finds the seed early understands that the twist was the story's true plot all along.""",
]

FILES = {
    "content/notes/concepts/class-11/english/reading-and-comprehension/01-short-story-1-the-selfish-giant-oscar-wilde.json": GIANT,
    "content/notes/concepts/class-11/english/reading-and-comprehension/04-short-story-1-the-selfish-giant-oscar-wilde.json": GIANT,
    "content/notes/concepts/class-11/english/reading-and-comprehension/02-short-story-2-the-oval-portrait-edgar-allan-poe.json": PORTRAIT,
    "content/notes/concepts/class-11/english/reading-and-comprehension/05-short-story-2-the-oval-portrait-edgar-allan-poe.json": PORTRAIT,
    "content/notes/concepts/class-11/english/reading-and-comprehension/03-short-story-3-god-sees-the-truth-but-waits-leo-tolstoy.json": TRUTH,
    "content/notes/concepts/class-11/english/reading-and-comprehension/04-short-story-4-the-wish-roald-dahl.json": WISH,
    "content/notes/concepts/class-11/english/reading-and-comprehension/05-short-story-5-civil-peace-chinua-achebe.json": CIVIL,
    "content/notes/concepts/class-11/english/reading-and-comprehension/06-short-story-6-two-little-soldiers-guy-de-maupassant.json": SOLDIERS,
    "content/notes/concepts/class-11/english/reading-and-comprehension/07-short-story-7-an-astrologer-s-day-r-k-narayan.json": ASTROLOGER,
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
        print(f"{path.split(chr(92))[-1].split('/')[-1]}: {before} -> {sum(len(n) for n in notes)} chars")

if __name__ == "__main__":
    main()
