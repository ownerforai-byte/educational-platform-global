# Conceptual classified tables — class-11 chemistry, part 5 (final).

def T(title, header, rows):
    return {"append": True, "table": (title, header, rows)}

TOPICS = [
 {"file": "class-11/chemistry/fundamental-principles-organic/03-reaction-mechanism.json",
  "blocks": [T("Organic reaction mechanisms — classified by bond fission and species",
    ["Fission type", "Species produced", "Typical reaction"],
    [["Homolytic", "Free radicals", "Chlorination of methane (UV)"],
     ["Heterolytic", "Cation + anion", "Electrophilic/nucleophilic steps"],
     ["Electrophile attack", "Electron-loving reagent", "Alkene additions"],
     ["Nucleophile attack", "Electron-pair donor", "Substitutions at C-X"]])]},
 {"file": "class-11/chemistry/fundamental-principles-organic/04-inductive-effect.json",
  "blocks": [T("Inductive effect — classified by direction",
    ["Effect", "Cause", "Consequence"],
    [["-I (electron-withdrawing)", "More electronegative atom", "Acidity rises (Cl-CH2COOH)"],
     ["+I (electron-releasing)", "Alkyl groups push electrons", "Basicity of amines rises"],
     ["Distance decay", "Effect fades over 3-4 bonds", "Remote substituents barely matter"]])]},
 {"file": "class-11/chemistry/fundamental-principles-organic/05-resonance-effect.json",
  "blocks": [T("Resonance — classified by contributing structures",
    ["Aspect", "Rule", "Example"],
    [["Validity", "Only position of electrons moves", "Atoms stay fixed"],
     ["Relative weight", "More covalent bonds, less charge wins", "Neutral form dominates"],
     ["Energy", "Resonance hybrid is stabilised", "Benzene's extra stability"],
     ["Types", "+R donating and -R withdrawing", "-OH vs -NO2 on a ring"]])]},
]
