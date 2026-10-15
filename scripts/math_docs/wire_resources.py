import os

def update_antiderivatives():
    path = r'c:\Users\ASUS\Desktop\rn\frontend\components\content\antiderivatives-resources.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    target = '          {[\n            {\n              id: "ex-18-1",'
    replacement = '''          {[
            {
              id: "math-xi-unit-06-doc",
              title: "NEB Class 11 Calculus — Official Master Resource Document",
              description:
                "Comprehensive guide covering Limits & Continuity, Derivatives from first principles, Differentiation rules & methods, Tangents/Normals, Max/Min, LMVT, and Integration by parts with Professor's Theory & Viva bank.",
              url: "/materials/Math_XI_Unit_06_calculus.docx",
              pdfUrl: "/materials/Math_XI_Unit_06_calculus.docx",
              tags: ["Unit 6 Document", "DOCX", "Theory & Viva Bank", "Calculus Master Guide"],
            },
            {
              id: "ex-18-1",'''
    
    # Try with both \r\n and \n
    if target in content:
        content = content.replace(target, replacement, 1)
    else:
        norm_content = content.replace('\r\n', '\n')
        norm_target = target.replace('\r\n', '\n')
        norm_replacement = replacement.replace('\r\n', '\n')
        if norm_target in norm_content:
            norm_content = norm_content.replace(norm_target, norm_replacement, 1)
            content = norm_content
        else:
            print("Failed to find target in antiderivatives-resources.tsx")
            return
    
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    print("SUCCESS: Updated antiderivatives-resources.tsx")

def update_numerical():
    path = r'c:\Users\ASUS\Desktop\rn\frontend\components\content\numerical-integration-resources.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    target = '          {[\n            {\n              id: "ex-20-1",'
    replacement = '''          {[
            {
              id: "math-xi-unit-07-doc",
              title: "NEB Class 11 Computational Methods & Mechanics — Official Master Resource Document",
              description:
                "Bisection & Newton-Raphson methods, Trapezoidal & Simpson's numerical integration, Statics (Lami's theorem & friction), and Dynamics & projectiles with Professor's Theory & Viva bank.",
              url: "/materials/Math_XI_Unit_07_computational-mechanics.docx",
              pdfUrl: "/materials/Math_XI_Unit_07_computational-mechanics.docx",
              tags: ["Unit 7 Document", "DOCX", "Theory & Viva Bank", "Numerical & Mechanics"],
            },
            {
              id: "ex-20-1",'''
    
    if target in content:
        content = content.replace(target, replacement, 1)
    else:
        norm_content = content.replace('\r\n', '\n')
        norm_target = target.replace('\r\n', '\n')
        norm_replacement = replacement.replace('\r\n', '\n')
        if norm_target in norm_content:
            norm_content = norm_content.replace(norm_target, norm_replacement, 1)
            content = norm_content
        else:
            print("Failed to find target in numerical-integration-resources.tsx")
            return

    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    print("SUCCESS: Updated numerical-integration-resources.tsx")

def update_statistics():
    path = r'c:\Users\ASUS\Desktop\rn\frontend\components\content\statistics-probability-resources.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    target = 'export function StatisticsProbabilityResources() {\n  return (\n    <div className="space-y-6">\n      {/* Interactive Visuals */}'
    replacement = '''export function StatisticsProbabilityResources() {
  return (
    <div className="space-y-6">
      {/* Official Master Resource Document */}
      <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Statistics &amp; Probability — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Official NEB Class 11 Curriculum Document &amp; Study Notes
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-background/60 hover:bg-accent/50 transition-colors">
            <FileText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold">NEB Class 11 Statistics &amp; Probability — Official Master Resource Document</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Measures of dispersion (Range, QD, MD, SD), Coefficient of Variation, Karl Pearson &amp; Bowley skewness, addition &amp; multiplication rules, and Bayes theorem with Professor Theory &amp; Viva bank.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  Unit 5 Document
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  DOCX
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  Dispersion &amp; Probability
                </span>
              </div>
            </div>
            <Button asChild size="sm" variant="outline" className="shrink-0">
              <a href="/materials/Math_XI_Unit_05_statistics-probability.docx">
                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                Open
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Visuals */}'''

    norm_content = content.replace('\r\n', '\n')
    norm_target = target.replace('\r\n', '\n')
    norm_replacement = replacement.replace('\r\n', '\n')
    if norm_target in norm_content:
        norm_content = norm_content.replace(norm_target, norm_replacement, 1)
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(norm_content)
        print("SUCCESS: Updated statistics-probability-resources.tsx")
    else:
        print("Failed to find target in statistics-probability-resources.tsx")

def update_content_tabs():
    path = r'c:\Users\ASUS\Desktop\rn\frontend\components\content\content-tabs.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if FileText, ExternalLink, Button are imported
    norm_content = content.replace('\r\n', '\n')
    if 'FileText' not in norm_content:
        norm_content = norm_content.replace(
            'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";',
            'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";\nimport { Button } from "@/components/ui/button";\nimport { FileText, ExternalLink } from "lucide-react";'
        )

    target = '''        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{ALGEBRA_SECTION.title}</h2>
          <p className="text-sm text-muted-foreground">{ALGEBRA_SECTION.description}</p>
        </div>'''

    replacement = '''        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{ALGEBRA_SECTION.title}</h2>
          <p className="text-sm text-muted-foreground">{ALGEBRA_SECTION.description}</p>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20">
          <FileText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold">NEB Class 11 Algebra — Official Master Resource Document</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Complete unit notes covering Logic, Real Numbers, Functions, Curves, Sequences, Matrices, Quadratics, Complex Numbers, and Binomial Theorem.
            </p>
          </div>
          <Button asChild size="sm" variant="outline" className="shrink-0">
            <a href="/materials/Math_XI_Unit_01_algebra.docx">
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              Download DOCX
            </a>
          </Button>
        </div>'''

    norm_target = target.replace('\r\n', '\n')
    norm_replacement = replacement.replace('\r\n', '\n')
    if norm_target in norm_content:
        norm_content = norm_content.replace(norm_target, norm_replacement, 1)
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(norm_content)
        print("SUCCESS: Updated content-tabs.tsx")
    else:
        print("Failed to find target in content-tabs.tsx")

if __name__ == '__main__':
    update_antiderivatives()
    update_numerical()
    update_statistics()
    update_content_tabs()
