#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Native readings + solved NEB questions for the five class-12 poems.
Run:  PYTHONIOENCODING=utf-8 python content-tools/author-english-poems-c12.py
"""
import json

P1 = [
    """## The poem at a glance

"A Day" by Emily Dickinson tells the story of one day — sunrise to sunset — and lets it stand for the whole of a life. The speaker offers to describe the sun's rising "a ribbon at a time", watches the morning unfold like children climbing stile after stile, and then follows the day to its close, where a grey clergyman figure leads the flock of the day's hours away. The poem is one of Dickinson's gentlest and most disturbing: on the surface a nature sketch, underneath a meditation on birth, the day's journey and death — with the sun's setting as the hour when the day, like a life, is gathered up and led away.""",
    """## Reading it closely, movement by movement

The sunrise is narrated as an event of climbing and unveiling: the sun rises "a ribbon at a time" — the sky's light arriving in strips, the way a child imagines it must — and the steeples of the village seem to swim in amethyst as the light fills the air. The image system is childlike and domestic: ribbons, steeples, the news running "like squirrels" — the morning told in the vocabulary of a village morning, which is Dickinson's signature: the cosmic rendered as the household.

Then the poem's pivot, and its quietest line: the speaker says the morning's beauty made her want to climb — the stile, the slope — like the boys and girls who climb the hills at sunrise, joining the day's ascent. The day is a journey and the living are its climbers; the image is innocent and, by the poem's end, retroactively mortal.

The close is the sunset, and Dickinson gives it a figure: the "Dominie in Gray" — a grey-clad clergyman, the personification of the day's end — puts "his evening bars" across the paths, gently leading the flock away. The flock is the day's hours; the Dominie is death or its herald; and the poem ends not with darkness but with the being who gathers the flock — the day's death described as a shepherd's work, which is the poem's final tenderness and its final terror at once.""",
    """## The devices, with evidence

- **Personification** — the poem's master device: the sun climbs, the light runs, and the sunset becomes the "Dominie in Gray" leading his flock — day and death given human shapes a child could draw.
- **Extended metaphor** — the day as a life: sunrise is birth, the climb is living, the Dominie's gathering is death; the poem's whole meaning depends on holding the two readings at once.
- **Imagery** — domestic and village-centred: ribbons, steeples, squirrels, stile — the infinite rendered in household terms.
- **Capitalisation** — Dickinson's capitals (Dominie, Amethyst) elevate the ordinary words into titles, signalling that the village images are also cosmic ones.
- **The dashes** — the poem's breathing: pauses that hold the thought open, especially at the close, where the dash leaves the flock's destination unsaid.

The exam question "why does the poet describe the sunset as a clergyman?" is answered by the metaphor's double work: the Dominie gathers the day's flock gently, as a shepherd — death imagined not as violence but as a quiet taking-home, which makes the poem's calm the more unsettling.""",
    """## The themes worth an essay

**The day as a life** — the central theme: one day's arc from sunrise to sunset as the shape of existence itself, told without a single abstract word. **Death as gathering** — the Dominie's flock: death imagined with village gentleness, which is more unsettling than a violent image would be. **Innocence and knowledge** — the childlike imagery carrying an adult understanding: the poem's speaker sounds young and knows exactly what the sunset is. **The beauty of the ordinary** — the theme that Dickinson's cosmos fits inside a village morning: ribbons and steeples are sufficient for eternity. Anchor any essay in the two personifications — the climbing sun and the grey Dominie — and the theme demonstrates itself.""",
    """## NEB short answers, solved

**Q. How does the poet describe the sunrise? (2 marks)**
A. In childlike, domestic images: the sun rises a ribbon at a time, the steeples swim in amethyst, and the morning's news runs like squirrels. The cosmic event is rendered as a village morning, seen from a child's height.

**Q. What does the speaker want to do in the middle of the poem? (2 marks)**
A. To climb — to join the boys and girls ascending the stile and the slope at sunrise, becoming part of the day's journey. The wish is innocent on the surface and, after the ending, reads as the human desire to rise with the day while it lasts.

**Q. Who or what is the Dominie in Gray? (2 marks)**
A. The personification of the sunset — a grey-clad clergyman figure who puts his evening bars across the paths and gently leads the flock away. The flock is the day's hours; the Dominie is the day's end, and death's herald.

**Q. What does the day stand for in the poem? (2 marks)**
A. A human life: the sunrise is birth, the climbing morning is living, and the sunset — the Dominie's gathering — is death. The poem's meaning depends on reading the day's arc as the life's arc.

**Q. Why is the poem's calm tone significant? (2 marks)**
A. Because it makes the subject bearable and the message more unsettling: death arrives not as violence but as a shepherd's quiet gathering. Dickinson's gentleness is the poem's deepest device — the terror is inside the tenderness.

**Q. What role do the dashes play? (2 marks)**
A. They are the poem's breathing: pauses that hold each thought open, and at the close a dash that leaves the flock's destination unsaid. The dashes make the reader experience the poem's hesitations as part of its meaning.""",
    """## NEB long answers, solved

**Q. "A Day is a nature poem on the surface and a meditation on death underneath." Discuss. (8 marks)**
A model answer works both readings in parallel: the surface — a village morning of ribbons, steeples and squirrels, followed by an evening of quiet; the depth — the day as life, the climb as living, the Dominie as death's gentle personification. It should trace the imagery's double duty (each domestic detail also carrying the cosmic meaning) and use the closing image as the proof: the flock gathered by the grey clergyman is the day — and the life — led home. The strongest answers note the poem's tone: the calm that makes the death-reading inescapable is also what makes the poem consoling rather than frightening.

**Q. How does Dickinson make ordinary things extraordinary? Answer with reference to the poem. (8 marks)**
A model answer lists the techniques with their effects: personification that turns the sun into a climber and the sunset into a clergyman; capitalisation that promotes household words into titles; the dashes that slow the poem to the pace of attention; and the extended metaphor that lets one day carry the whole of a life. It should argue the theme beneath the technique: Dickinson's originality is an act of scale — the universe fitted into a village morning — and the poem's ordinary images are extraordinary precisely because they are asked to bear eternal weight.""",
]

P2 = [
    """## The poem at a glance

"Every Morning I Wake" by Dylan Thomas is a morning prayer with a town inside it. The speaker — a voice from Thomas's imagined Welsh seaside town of Llareggub, in his play *Under Milk Wood* — wakes each day and prays not for himself but for all the town's folk: the fishermen, the farmers, the singers and the sinners of his small world. The poem's charm is its intimacy with God — the Lord is addressed like a neighbour — and its theme is community: a whole town carried in one man's morning prayer, with affection, humour and an honest eye on their faults.""",
    """## Reading it closely, movement by movement

The poem opens on the habit: every morning, waking, the speaker prays — and the prayer's first gesture is outward, toward the town's folk rather than the self. The request is for grace and goodness for the people of Llareggub, and the tone is immediately affectionate rather than pious: this is a prayer said the way a neighbour says good morning.

The middle inventories the town: its folk are named by their trades and their traits — the men of the sea and the fields, the women, the dreamers — and the prayer asks mercy for them with a knowing smile: the town contains scoundrels as well as saints, and the prayer covers both without pretending otherwise. Thomas's humour is the poem's warmth: the sinners are prayed for with the same tenderness as the honest, because the town is one body.

The close turns the prayer homeward with humility: the speaker asks for mercy for himself as well — a sinner among the townsfolk he prays for — and the poem ends where it began, in the morning's routine: wake, pray, love the town, ask forgiveness. The cycle is the point: the prayer is daily, like the town's life, and its repetition is its faith.""",
    """## The devices, with evidence

- **Apostrophe** — the poem's foundation: God addressed directly, familiarly, as "dear Lord" — prayer made conversational.
- **Refrain** — the morning-waking formula opens and returns: the poem's shape is a habit, and the shape is the meaning (faith as daily practice, not event).
- **Imagery of the town** — the sea, the fields, the town's folk at their trades: the prayer's vocabulary is communal, and the town becomes a character.
- **Tone** — affectionate, humorous, humble: Thomas prays without solemnity, and the tone carries the theme — love of one's flawed community.
- **Enjambment and music** — the lines flow like the town's day beginning, the rhythm of speech rather than hymn.

The exam question "what is the tone of the poem?" is answered by naming the affectionate intimacy: a prayer that sounds like a neighbour's greeting, humorous about human weakness, humble about the speaker's own.""",
    """## The themes worth an essay

**Community as family** — the central theme: the prayer embraces the whole town, saints and sinners alike, because the town is one body. **Faith as daily habit** — the morning repetition: religion as routine tenderness rather than occasion. **Love of the flawed** — the poem's honesty about the town's scoundrels is part of its love; mercy is asked for the real town, not the ideal one. **Humility** — the speaker includes himself among the sinners: the prayer ends where honest prayer must. Anchor the essay in the prayer's outwardness — the speaker prays for others first — and the theme is the poem.""",
    """## NEB short answers, solved

**Q. What does the speaker pray for every morning? (2 marks)**
A. For the people of his town — their grace, their goodness and their welfare: the fishermen, the farmers and all the folk of Llareggub. The prayer's first gesture is outward, toward the community rather than the self.

**Q. Who is addressed in the poem, and how? (2 marks)**
A. God, addressed intimately as "dear Lord" — familiarly, the way one addresses a trusted neighbour. The intimacy is the poem's tone: prayer as conversation rather than ceremony.

**Q. How does the poem describe the townsfolk? (2 marks)**
A. With affectionate realism: they are named by their trades and their characters, and they include the honest and the wayward alike. The speaker prays for the real town — faults included — which is why the prayer feels like love rather than idealisation.

**Q. What is the significance of the morning repetition? (2 marks)**
A. It makes faith a daily habit: the prayer is part of waking, like washing or lighting the fire. The repetition suggests that devotion lives in routine — the town is carried to God one morning at a time.

**Q. Does the speaker include himself in the prayer? (2 marks)**
A. Yes, and the inclusion is the poem's humility: he asks mercy for himself as one of the town's sinners, placing himself inside the community he prays for rather than above it.

**Q. What is the tone of the poem? (2 marks)**
A. Affectionate, humorous and humble: a prayer said like a neighbour's good morning, tender toward the town's flaws and honest about the speaker's own. The tone carries the theme — love of one's imperfect community.""",
    """## NEB long answers, solved

**Q. "The poem is a prayer for a whole community." Discuss how the speaker's love for his town shapes the poem. (8 marks)**
A model answer traces the prayer's direction: it opens outward (the town's folk before the self), inventories the town by trades and characters, asks mercy for sinners as warmly as for saints, and turns to the self only at the close, humbly, as one of the sinners. It should discuss the tone — the intimacy with God, the humour about human weakness — as the vehicle of the love, and the morning refrain as the argument that community is a daily commitment. The strongest answers note what the poem refuses: solemnity, judgment and the idealised town — and argue that the refusal is what makes the prayer believable.

**Q. How does Dylan Thomas blend humour and devotion in the poem? (8 marks)**
A model answer works the blend line by line: the familiar address that makes God a neighbour; the inventory of townsfolk that smiles at their faults while asking grace for them; the speaker's inclusion of himself among sinners; and the music of the lines, which runs on speech rather than hymn. It should argue the point of the blend: devotion without humour becomes distant, and humour without devotion becomes mockery — Thomas's balance makes the prayer both human and sincere, which is why the town it loves feels real.""",
]

P3 = [
    """## The poem at a glance

"I Was My Own Route" by Julia de Burgos is a feminist poem of self-invention: the speaker refuses the path that was laid out for her — the route her society assigned to a woman — and walks until her own steps make a road. The poem stages a confrontation between the speaker and her former self, the obedient girl who followed the prescribed way, and ends with the new self's freedom. De Burgos, a Puerto Rican poet writing against the constraints of her time, makes the journey the poem's whole metaphor: identity is not inherited but travelled into being.""",
    """## Reading it closely, movement by movement

The opening is the refusal: the path was already laid out — society's route for a woman's life, mapped by others' expectations — and the speaker declares she was not made for it. The poem's first power is its tense: "I was my own route" — the speaker *is* the journey, not a traveller on someone else's.

The middle is the walk: she sets out despite the warnings, and the world answers with its arguments — the voices that call a walking woman lost, the old maps that have no road where she treads. The poem's drama is the encounter with the former self: the girl who stayed on the prescribed path appears, accusing the new self of betrayal — and the speaker answers with the poem's hardest truth: the old self must be abandoned for the new one to exist. The dialogue between the two selves is the poem's centre: tradition speaking in the voice of the past, freedom answering in the voice of the present.

The close is arrival and definition: the route exists because she walked it — the road was made by her steps, as hope is made by walking — and the speaker claims her own name, her own path, her own life. The poem ends where feminism's argument begins: a woman's life belongs to the one living it.""",
    """## The devices, with evidence

- **Extended metaphor** — the master device: life as a route, society as the pre-laid path, self-invention as walking an unmapped way until the walking makes the road.
- **Apostrophe and dialogue** — the former self addressed and answered: the poem stages an argument between tradition and freedom inside one woman, which is its most original structure.
- **Contrast** — the prescribed route against the made route; the old self's obedience against the new self's assertion; the world's warnings against the speaker's steps.
- **Repetition** — the route/walking/road word-family returns through the poem like footsteps, building the metaphor's momentum.
- **Tone** — defiant and celebratory at once: the poem is an argument that has already won, telling the story of the winning.

The exam question "what does the route symbolise?" is answered by the double reading: the prescribed path of social expectation — and the self-made path of identity, which exists only because the speaker refuses the first and walks the second.""",
    """## The themes worth an essay

**Self-invention against prescription** — the central theme: identity made by one's own steps rather than inherited from society's map. **Feminist awakening** — the poem's historical argument: the "laid-out route" is specifically the life assigned to women, and the speaker's walk is a refusal of that assignment. **The cost of freedom** — the confrontation with the former self: liberation requires abandoning a version of oneself, and the poem does not pretend that is painless. **The self as journey** — the theme that a person is not a fixed thing but a movement: "I was my own route" makes identity a verb. Anchor the essay in the dialogue between the two selves, and the theme speaks in both voices.""",
    """## NEB short answers, solved

**Q. What route was laid out for the speaker? (2 marks)**
A. The path her society prescribed for a woman: the expected life mapped by others' expectations — obedience, convention, the roles assigned before she was asked. The poem's opening refusal is of this pre-made route.

**Q. Why does the speaker refuse the laid-out path? (2 marks)**
A. Because it was not hers: it was mapped by others' expectations rather than her own nature, and following it would mean living a life assigned to her rather than one she chose. Her refusal is the poem's first act of freedom.

**Q. Who is the "other self" the speaker meets? (2 marks)**
A. Her former self — the obedient girl who stayed on the prescribed path. The encounter stages the poem's central argument: tradition, speaking through the old self, accuses the new self of betrayal; freedom answers that the old self had to be left behind for the new one to exist.

**Q. How does the speaker answer the accusation of betrayal? (2 marks)**
A. By naming the cost and accepting it: the old self was part of her, but keeping it would have meant losing herself entirely. The new self's answer is that betrayal of the prescribed route is loyalty to one's own life.

**Q. What does the title mean? (2 marks)**
A. That the speaker is not a traveller on a pre-existing road but the maker of her own: her identity, her route and her walking are one act. The title compresses the poem's philosophy — a life is not followed but made.

**Q. What is the poem's central message? (2 marks)**
A. That identity is self-invented: the road exists because one walks it, and a woman's life belongs to the one living it. The poem turns the journey metaphor into an argument for freedom against prescribed roles.""",
    """## NEB long answers, solved

**Q. "The poem dramatises a conflict between the speaker's two selves." Discuss the dialogue between the old self and the new. (8 marks)**
A model answer stages the conflict: the old self — the obedient girl of the prescribed route — speaks in the voice of tradition, duty and the community's expectations, and accuses the new self of abandoning her; the new self answers in the voice of freedom, accepting the loss as the price of existence. It should show how the dialogue makes the poem's feminism internal as well as social: the constraint lives inside the woman as well as outside her, and liberation must win an argument with the self. The strongest answers close on the resolution: the old self is not erased but outgrown, and the route the new self walks is the answer to every accusation — the road made by her own steps.

**Q. "I was my own route." How does this line carry the poem's entire meaning? (8 marks)**
A model answer unfolds the line's three claims: identity as journey (a person is a movement, not a fixed thing); self-authorship (the route is one's own, not society's); and the making of the way (the road exists because it is walked, which turns hope and freedom into practice rather than permission). It should connect each claim to the poem's narrative — the refusal of the laid-out path, the walk through the world's warnings, the encounter with the former self — and close on the line's grammar: the speaker does not say she *found* her route or *chose* it, but that she *was* it, which is the poem's most radical sentence.""",
]

P4 = [
    """## The poem at a glance

"The Awakening Age" by Ben Okri is a poem of hope written from inside hardship: it addresses a people — Nigeria, Africa, the colonised and the poor — at the moment of their awakening, and imagines what becomes possible when a nation wakes to its own worth. The poem's method is transformation through antithesis: the poor become rich in spirit, the blind begin to see, the silenced find their voice — not by magic but by awakening. Okri, a Nigerian writer whose work insists on vision and renewal, turns a catalogue of deprivation into a dawn, and the poem's optimism is earned, not naive: every brightness in it is measured against the darkness it overcomes.""",
    """## Reading it closely, movement by movement

The poem opens on the arrival of the awakening age itself: a moment of new light, a morning after the long night — the image system is dawn from the first lines, and the awakening is collective, a people's rather than a person's. The speaker includes himself among the people: the poem's "we" is its first political act.

The middle is the poem's great structure — the paired transformations: those who were poor are made rich in spirit; those who were blind begin to see; those who wandered find their way; the silenced begin to sing. Each line holds its opposite, and the honesty is in the pairing: the poem does not deny the poverty, blindness and silence — it declares their reversal as the awakening's work. The transformation is spiritual first: the wealth the poem promises is vision, dignity and unity, not money — which is why it is available to the woken poor.

The close gathers the awakening's gifts into its community: when a people wake, they see each other — the poem's unity theme — and the new age is imagined as a shared morning rather than a private success. The final note is both celebration and charge: the awakening age is here, and it must now be lived.""",
    """## The devices, with evidence

- **Antithesis** — the poem's master structure: poor/rich in spirit, blind/seeing, lost/found, silent/singing — each line a paradox resolved by awakening, and the poem's hope built line by line out of honest negation.
- **Repetition** — the "we who..." pattern: the anaphora gathers the people into one voice, which is both music and politics.
- **Dawn imagery** — the awakening age as morning: light after darkness, sight after blindness — the metaphor that unifies the poem.
- **Collective voice** — the "we": the poem speaks as a people, not an individual, and the grammar is its solidarity.
- **Tone** — celebratory but sober: every promise is priced against the deprivation it answers, which is why the optimism convinces.

The exam question "what transformations does the poem imagine?" is answered by the antithesis list — and the key insight that the transformations are of *seeing* before they are of circumstance: the awakening changes eyes first, and the world follows.""",
    """## The themes worth an essay

**Awakening as transformation** — the central theme: a people's renewal begins in vision — seeing their own worth — and proceeds to dignity, unity and voice. **Hope from hardship** — the poem's optimism is built on acknowledged suffering: the antitheses admit the poverty and blindness they reverse. **Unity of a people** — the collective "we" and the shared morning: the awakening is communal, and division is part of the darkness it ends. **Spiritual wealth over material** — the richness promised is of spirit and sight: the poem's answer to poverty is not money but awakened perception, which no oppressor can confiscate. Anchor the essay in the antithesis structure and the poem's honesty does the arguing.""",
    """## NEB short answers, solved

**Q. What is the "awakening age" of the title? (2 marks)**
A. The dawning moment when a people wake to their own worth — a new age of vision, dignity and unity after a long night of poverty, blindness and silence. The poem treats it as both a hope and an arrival: the morning that must now be lived.

**Q. What transformations does the poem imagine for the people? (2 marks)**
A. Paired reversals: the poor become rich in spirit, the blind begin to see, the lost find their way, the silenced begin to sing. Each transformation answers a real deprivation, which is why the poem's hope is credible.

**Q. Why does the poem speak in "we" rather than "I"? (2 marks)**
A. Because the awakening is collective: the poem's voice is a people's, and the grammar enacts its solidarity. The speaker includes himself among the poor and the blind — the poem's first political act.

**Q. What kind of wealth does the poem promise? (2 marks)**
A. Spiritual wealth: vision, dignity, unity and voice rather than money. The poem's answer to poverty is awakened perception — a wealth that belongs to the woken poor and cannot be confiscated.

**Q. How does the poem balance hope and honesty? (2 marks)**
A. Through its antitheses: every promised brightness is paired with the darkness it overcomes, so the poem admits the poverty, blindness and silence even as it declares their reversal. The hope is earned because the suffering is not hidden.

**Q. What is the significance of the dawn imagery? (2 marks)**
A. It unifies the poem: the awakening age is a morning after the long night, and dawn is the perfect image for transformation — light that arrives gradually, for everyone at once, and makes seeing possible. The imagery makes the abstract awakening visible.""",
    """## NEB long answers, solved

**Q. "The Awakening Age is a poem of hope built on honest darkness." Discuss how Okri achieves optimism without naivety. (8 marks)**
A model answer works the antithesis structure as the answer: each promised transformation is paired with the deprivation it reverses — poor/rich in spirit, blind/seeing, lost/found, silent/singing — so the poem's hope is constructed out of acknowledged suffering rather than denial. It should discuss the collective voice and the dawn imagery as the hope's vehicles, and the spiritual nature of the promised wealth as its realism: the poem promises what the woken poor can actually have. The strongest answers close on the poem's charge: the awakening age is not a gift but a task — the morning must be lived, and the poem's optimism is a call to the walking as much as a celebration of the light.

**Q. How does the poem use repetition and antithesis to create its effect? (8 marks)**
A model answer separates the two engines: the "we who..." anaphora, which gathers a people into one voice and gives the poem its march-like momentum; and the antithesis, which builds each line as a paradox resolved by awakening. It should show how the two work together — the repetition carries the people forward while the antithesis keeps every step honest — and quote or paraphrase two or three paired lines as evidence. The strongest answers note the sound: the poem reads like a song of a people rising together, and the form is the theme — unity performed in grammar and rhythm, not just stated.""",
]

P5 = [
    """## The poem at a glance

"Soft Storm" by Abhi Subedi is a Nepali protest poem with a tender name: the "storm" is the poet's anger at the violence and injustice he sees around him — the beaten man, the crying child, the city's cruelty — and "soft" is the discipline of that anger: a rage that refuses to become brutality, that mourns even as it accuses. The poem moves between the mythic and the everyday — gods and streets, legends and beggars — and its power is the blend: the ancient language of storm and moon applied to the modern city's wounds. Subedi, one of Nepal's major contemporary poets, writes here in the tradition of engaged poetry: art that cannot look away.""",
    """## Reading it closely, movement by movement

The poem opens in the city's night with its victims: the images of the hurt — a beaten man, a weeping child, the people the streets consume — arrive as the storm's occasion. The poet's anger is immediate, but its first form is grief: the storm begins as mourning.

The middle widens the lens to myth and nature: the moon, the sky, the gods of the tradition are invoked — and the invocation is a reproach. The poet asks where the guardians are: the moon that watches, the divine that presides — and the question indicts a civilisation whose sacred images look away from its suffering. The everyday and the eternal are braided: the beggar at the temple and the god inside it share the poem's frame, and the contrast is the accusation.

The close defines the storm's softness: the poet's anger remains humane — it does not wish destruction but awakening; it storms against cruelty while holding onto compassion, and the poem ends in the register it has earned: a tenderness that is not resignation but the last discipline of a wounded love. The "soft" is not weakness; it is the refusal to let anger kill the humanity that justified it.""",
    """## The devices, with evidence

- **Oxymoron (the title)** — "soft storm" is the poem's thesis in two words: rage with tenderness, protest without brutality; the contradiction is the poem's ethic.
- **Imagery of the wounded** — the beaten man, the crying child, the street's victims: the poem's evidence, delivered in concrete detail rather than abstraction.
- **Mythical allusion and invocation** — the moon, the sky, the gods: the tradition's guardians called to account for the suffering beneath them; the ancient images make the modern wounds louder.
- **Apostrophe and rhetorical questions** — the poet addresses the moon and the divine, asking where they are: the questions are the poem's cross-examination of its own culture.
- **Contrast** — temple and beggar, god and gutter, mythic calm and street violence: each pairing is an indictment.

The exam question "why is the storm 'soft'?" is answered by the poem's ethic: the anger is real, but it is disciplined by compassion — the poet storms against cruelty without becoming cruel, and the softness is what keeps the protest human.""",
    """## The themes worth an essay

**Protest against violence and injustice** — the central theme: the poem documents the city's cruelty — its beaten and its weeping — and refuses the bystander's silence. **Anger with compassion** — the title's ethic: protest that preserves the humanity it defends; the soft storm as the only kind worth having. **The failure of the sacred's guardians** — the moon and gods invoked and found absent: the theme of a culture whose symbols outlive its conscience. **Art as witness** — the poem's own role: to see, to record, to mourn publicly — the engaged poet's task in a violent time. Anchor the essay in the oxymoron of the title and one concrete image of the wounded, and the analysis carries both the anger and the tenderness.""",
    """## NEB short answers, solved

**Q. What is a "soft storm"? (2 marks)**
A. The poet's own anger at the violence and injustice around him — a rage disciplined by compassion. The oxymoron names the poem's ethic: the storm protests cruelty without becoming cruel, and its softness is what keeps the protest humane.

**Q. What images of suffering does the poem present? (2 marks)**
A. The city's wounded in concrete detail: the beaten man, the weeping child, the people the streets consume — victims named by their hurt rather than by statistics. The images are the storm's occasion and the poem's evidence.

**Q. Why does the poet invoke the moon and the gods? (2 marks)**
A. As a reproach: the tradition's guardians — the watching moon, the presiding divine — are called to account for looking away from the suffering beneath them. The invocation turns the sacred images of the culture into witnesses for the prosecution.

**Q. How are the mythic and the everyday related in the poem? (2 marks)**
A. They are braided: gods and streets, legends and beggars share the poem's frame, and the contrast is the accusation — the beggar at the temple door and the god inside it belong to one civilisation, and the poem refuses to let them be separated.

**Q. What does the poem protest against? (2 marks)**
A. Violence, injustice and the indifference that permits them: the beatings and the weeping of the streets, and the calm of the institutions — sacred and civic — that watch without acting. The protest is directed at cruelty and at looking away.

**Q. What is the significance of the poem's tone? (2 marks)**
A. It carries the poem's ethic: mournful, accusing and tender at once. The tone proves the title — anger that has not lost its humanity — and makes the poem's protest believable, because the poet's love for the suffering is audible in every accusation.""",
    """## NEB long answers, solved

**Q. "Soft Storm is a protest poem whose protest is defined by its tenderness." Discuss. (8 marks)**
A model answer works the title's oxymoron as the poem's thesis: the storm is the anger at the beaten man, the crying child and the city's cruelty; the softness is the compassion that disciplines it — the poet storms against brutality without wishing brutality on anyone. It should trace the poem's movement from grief to invocation to definition, showing how the anger is aimed at institutions of indifference (the moon that watches, the gods that preside, the temple that excludes the beggar) rather than at persons. The strongest answers close on the ethic: the poem argues that the only protest worth having is one that preserves the humanity it defends — and the softness is not weakness but the hardest discipline of a wounded love.

**Q. How does the poet blend the mythical and the everyday in the poem? (8 marks)**
A model answer collects the braided images: the moon and sky invoked over the night city, the gods of the tradition placed beside the beggar at the temple, the legends' language applied to the street's wounds. It should argue the effect: the mythic scale makes the everyday suffering cosmic in consequence — a beaten man is not an incident but a wound in the culture's whole story — while the everyday detail keeps the myth honest, forcing the sacred images to answer for the present. The strongest answers note that the blend is also a cultural argument: Nepal's inherited symbols are magnificent and must be judged by what happens beneath them.""",
]

FILES = {
    "content/notes/concepts/class-12/english/literary-analysis/08-poem-1-a-day-emily-dickinson.json": P1,
    "content/notes/concepts/class-12/english/literary-analysis/09-poem-2-every-morning-i-wake-dylan-thomas.json": P2,
    "content/notes/concepts/class-12/english/literary-analysis/10-poem-3-i-was-my-own-route-julia-de-burgos.json": P3,
    "content/notes/concepts/class-12/english/literary-analysis/11-poem-4-the-awakening-age-ben-okri.json": P4,
    "content/notes/concepts/class-12/english/literary-analysis/12-poem-5-soft-storm-abhi-subedi.json": P5,
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
