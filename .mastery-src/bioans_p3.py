#!/usr/bin/env python
# Populate PYQ answers - biology batch 3: conservation-biology
import json

A = {}

A['conservation-biology/01-neb-2024.json'] = {0: (
"**Biodiversity:** the **variety and variability of all life** on earth — every species, "
"every genetic variant and every ecosystem — the total living wealth of the biosphere "
"(the term combines 'biological' and 'diversity'). "
"**Three levels of biodiversity:** "
"**(1) Genetic diversity:** variation of **genes within a species** — different varieties/"
"strains/races (e.g. thousands of traditional rice landraces in Nepal; different breeds of "
"dogs). **Significance:** the raw material for adaptation and breeding — a genetically "
"uniform crop is one disease away from disaster (Irish potato famine). "
"**(2) Species diversity:** the **variety of species** in a region or the biosphere — "
"Nepal alone holds ~900 bird and ~180 mammal species. **Significance:** each species is an "
"irreplaceable component of ecosystems and a potential resource (food, medicine). "
"**(3) Ecosystem (community) diversity:** the **variety of habitats, ecosystems and "
"communities** — Nepal ranges from Terai grasslands and subtropical forests to alpine "
"meadows and the high Himalaya within 200 km. **Significance:** ecosystems deliver "
"services (water, climate regulation, soil) and shelter the other two levels. "
"**Deep point:** the three levels are nested — genes make species, species make "
"ecosystems — and conserving only the middle level is like saving the books while burning "
"the library.")}

A['conservation-biology/02-neb-2023.json'] = {0: (
"**In-situ conservation:** protecting species **within their natural habitat** — "
"conserving the whole ecosystem so the species continues to live, breed and evolve there. "
"**Two examples:** (1) **national parks and reserves** — Chitwan National Park (rhino, "
"tiger), Sagarmatha NP; (2) **community forests and protected areas** — Nepal's community "
"forestry conserving forest biodiversity in place (also biosphere reserves, wildlife "
"reserves, sacred groves). "
"**Ex-situ conservation:** protecting species **outside their natural habitat** — in "
"artificial settings under human care. "
"**Two examples:** (1) **zoos and captive breeding centres** — e.g. the **Central Zoo "
"(Jawalakhel)**, gharial and vulture breeding centres in Nepal; (2) **botanical gardens, "
"seed banks and tissue-culture banks** — e.g. the National Botanical Garden (Godawari) "
"and seed/tissue banks preserving crop wild relatives and orchids. "
"**Differences:** in-situ conserves whole ecosystems and ongoing evolution but depends on "
"habitat security; ex-situ is a last-resort ark for critically endangered species — safe "
"but evolutionarily frozen and costly. "
"**Deep point:** in-situ saves the habitat, ex-situ saves the specimen — the ideal "
"strategy is in-situ first with ex-situ as the emergency backup for species whose habitat "
"cannot be saved in time.")}

A['conservation-biology/03-neb-2022.json'] = {0: (
"**Five threats to biodiversity in Nepal, with one conservation measure each:** "
"**(1) Habitat loss and degradation** — deforestation for farmland, roads and "
"settlements fragments forests and shrinks wildlife ranges. **Measure:** community "
"forestry and protected-area expansion (Nepal now protects ~23% of its land); replanting "
"degraded slopes. "
"**(2) Poaching and illegal wildlife trade** — rhino horn, tiger parts, red panda and "
"pangolin trafficking. **Measure:** strengthened anti-poaching patrols and armed "
"guard posts (e.g. the army-backed patrols that took Chitwan's rhino to several "
"zero-poaching years). "
"**(3) Human–wildlife conflict** — crop raiding and livestock killing turn communities "
"against conservation. **Measure:** compensation/insurance schemes, predator-proof "
"corrals, electric fencing and community awareness programmes. "
"**(4) Invasive alien species** — *Mikania* (banmara), *Chromolaena* and water hyacinth "
"outcompete native flora in Terai grasslands and wetlands. **Measure:** mechanical "
"removal and biological control programmes in parks and wetlands (Koshi Tappu, Chitwan). "
"**(5) Pollution and climate change** — plastic and pesticide pollution in rivers; "
"glacial retreat and shifting vegetation belts squeeze alpine species. **Measure:** "
"enforcement of environmental standards, waste management in trekking regions, and "
"climate-adapted protected-area planning (landscape-level corridors such as Terai Arc). "
"**Deep point:** each threat has a matching measure, but the underlying cure is shared — "
"make conservation economically valuable to the people who live beside the biodiversity, "
"which is exactly what community forestry and ecotourism in Nepal demonstrated.")}

def main():
    total = 0
    for key, ans in A.items():
        f = 'content/practice/questions/class-11/biology/' + key
        d = json.loads(open(f, 'rb').read().decode('utf-8-sig'))
        qs = d if isinstance(d, list) else d.get('questions', [])
        for i, text in ans.items():
            assert i < len(qs), (key, i)
            assert not (qs[i].get('answer') or '').strip(), (key, i)
            qs[i]['answer'] = text
            total += 1
        assert all((q.get('answer') or '').strip() for q in qs), key
        open(f, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
        print('filled', key, f'({len(ans)} answers, {len(qs)} questions)')
    print('TOTAL answers:', total)

main()
