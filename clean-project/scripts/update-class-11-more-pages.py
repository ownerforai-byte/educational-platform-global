import os

base = r"C:\Users\ASUS\Desktop\educational-platform-global\app\class-11-more"
subjects = ["biology", "chemistry", "english", "mathematics", "nepali"]

for subject in subjects:
    page_path = os.path.join(base, subject, "page.tsx")
    if not os.path.exists(page_path):
        continue
    
    txt = open(page_path, "r", encoding="utf-8").read()
    
    old_import = 'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";\nimport { BackButton } from "@/components/navigation/back-button";'
    new_import = 'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";\nimport { BackButton } from "@/components/navigation/back-button";\nimport { ImportedNotesSection } from "@/components/content/imported-notes-section";'
    
    old_component = '<Card>\n        <CardContent className="py-10 text-center text-muted-foreground">'
    new_component = '<ImportedNotesSection subject="' + subject + '" target="class-11-more" />\n      <Card>\n        <CardContent className="py-10 text-center text-muted-foreground">'
    
    txt = txt.replace(old_import, new_import)
    txt = txt.replace(old_component, new_component)
    
    open(page_path, "w", encoding="utf-8").write(txt)
    print(f"Updated {page_path}")
