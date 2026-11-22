#!/usr/bin/env python
# Append NEB 2024 cement PYQ to the chemical-industry canonical (row 129)
# and update its importantNotes to record the assignment.
import json

FILES = [
    'content/notes/concepts/class-11/chemistry/fundamentals-of-applied-chemistry/01-fundamentals-of-applied-chemistry-chemical-industry-and-its-importance.json',
    'frontend/public/data/syllabus-notes/chemistry/fundamentals-of-applied-chemistry/01-fundamentals-of-applied-chemistry-chemical-industry-and-its-importance.json',
]

Q = ("**NEB 2024 (3m): How is cement manufactured? What happens during the setting of cement?** "
     "\u2014 **Manufacture:** cement is made from **limestone (CaCO\u2083) and clay** \u2014 ground, blended, and "
     "**calcined in a rotary kiln at ~1400\u20131500 \u00b0C**, where the mixture partly fuses into clinker "
     "(principally calcium silicates, Ca\u2083SiO\u2085/Ca\u2082SiO\u2084, plus some aluminate); the clinker is cooled, "
     "ground with a small amount of **gypsum (2\u20133%)** \u2014 added to control the setting time \u2014 and the fine "
     "grey powder is Portland cement. **Setting chemistry:** when water is added, the silicates and "
     "aluminates **hydrate**: the calcium silicates react to form interlocking fibrous crystals of "
     "calcium silicate hydrate gel plus Ca(OH)\u2082, which grow through the mass and bind the aggregate \u2014 "
     "the paste hardens over days into a solid stone-like matrix. The reaction is exothermic and the "
     "gypsum's role is to slow the otherwise flash-setting aluminate phase (C\u2083A) so the concrete "
     "remains workable. **Deep point:** cement is the chemical industry's heavy-chemical exemplar in "
     " miniature \u2014 cheap mineral inputs, a high-temperature calcination, and a product whose value "
     "lies in a controlled solid-state reaction (hydration) rather than a solution chemistry; the "
     "gypsum's 2\u20133% dose is a stoichiometrically tiny additive doing an outsized job.")

NEW_NOTE = ('Verified PYQ recorded here: NEB 2024 (3m) How is cement manufactured; what happens during '
            'setting (cement is this unit\u2019s heavy-chemical exemplar).')

for f in FILES:
    raw = open(f, 'rb').read().decode('utf-8-sig')
    d = json.loads(raw)
    ec = d['enrichedContent']
    assert 'NEB 2024 (3m): How is cement manufactured' not in ec['practiceQuestions'], f
    ec['practiceQuestions'].append(Q)
    # importantNotes is a list in this file
    assert isinstance(ec['importantNotes'], list)
    assert NEW_NOTE not in ec['importantNotes']
    ec['importantNotes'].append(NEW_NOTE)
    # mirror the same updates into the top-level fields if present
    if isinstance(d.get('practiceQuestions'), list):
        d['practiceQuestions'].append(Q)
    if isinstance(d.get('importantNotes'), list):
        d['importantNotes'].append(NEW_NOTE)
    open(f, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
    print('updated', f, '| pq now', len(ec['practiceQuestions']))
