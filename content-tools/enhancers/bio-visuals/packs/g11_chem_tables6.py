# Conceptual classified tables — class-11 chemistry, parts 6-8 (final).

def T(title, header, rows):
    return {"append": True, "table": (title, header, rows)}

TOPICS = [
 {"file": "class-11/chemistry/hydrocarbons/02-alkenes.json",
  "blocks": [T("Alkene additions — classified by reagent",
    ["Reagent", "Addition type", "Regio rule"],
    [["HBr", "Electrophilic", "Markovnikov: H to the H-richer carbon"],
     ["HBr (peroxide)", "Free radical", "Anti-Markovnikov (Kharasch effect)"],
     ["Br2", "Test reaction", "Decolourises bromine water"],
     ["H2O/H+", "Hydration", "Alcohol via carbocation"]])]},
 {"file": "class-11/chemistry/hydrocarbons/03-alkynes.json",
  "blocks": [T("Alkynes — acidity and reactions classified",
    ["Aspect", "Fact", "Exam use"],
    [["Terminal acidity", "pKa about 25 vs alkane about 50", "Ag/NH3 test for 1-alkynes"],
     ["Hydration", "HgSO4/H2SO4 water addition", "Markovnikov to ketone; acetylene to aldehyde"],
     ["Hydrogenation", "Lindlar stops at cis-alkene", "Stereocontrol"],
     ["Polymerisation", "Red-hot tube trimerises", "Benzene from acetylene"]])]},
 {"file": "class-11/chemistry/hydrocarbons/04-hydrocarbons-unsaturation-detailed.json",
  "blocks": [T("Unsaturation tests — classified",
    ["Test", "Alkane", "Alkene/Alkyne"],
    [["Bromine water", "No change", "Decolourised"],
     ["Baeyer (KMnO4)", "No change", "Purple lost, brown MnO2"],
     ["Ozonolysis", "Not applicable", "Carbonyl fragments identify the skeleton"],
     ["Combustion", "Clean blue flame", "Sootier (higher C ratio)"]])]},
]
