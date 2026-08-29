"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, GraduationCap, Atom, FlaskConical, Calculator, Zap, Waves, Timer, Scale, Eye, Flame, Sun, Orbit, DNA, Grid3x3, BarChart3, Target, Terminal, ExternalLink, Clock } from "lucide-react";
import Link from "next/link";

const THEORY_CONTENT = [
  {
    id: "physics-kinematics",
    title: "Kinematics",
    description: "Motion in a straight line, equations of motion, free fall, and graphical representation.",
    subject: "physics",
    status: "active",
    hours: 5,
    icon: Zap,
    color: "blue",
    path: "/lab/theory/kinematics",
    syllabus: ["Physical quantities and measurements", "Vectors", "Kinematics", "Laws of motion", "Work, energy and power"]
  },
  {
    id: "physics-laws-motion",
    title: "Laws of Motion",
    description: "Newton's three laws, friction, impulse, and free body diagrams.",
    subject: "physics",
    status: "active",
    hours: 6,
    icon: Scale,
    color: "indigo",
    path: "/lab/theory/laws-of-motion",
    syllabus: ["Newton's first law", "Newton's second law", "Newton's third law", "Friction", "Impulse"]
  },
  {
    id: "chemistry-atomic",
    title: "Atomic Structure",
    description: "Bohr's model, quantum numbers, electronic configuration, and periodic trends.",
    subject: "chemistry",
    status: "new",
    hours: 8,
    icon: Atom,
    color: "green",
    syllabus: ["Rutherford's model", "Bohr's model", "Quantum mechanical model", "Electronic configuration"]
  },
  {
    id: "chemistry-bonding",
    title: "Chemical Bonding",
    description: "Ionic, covalent, coordinate bonds, VSEPR theory, and hybridization.",
    subject: "chemistry",
    status: "new",
    hours: 9,
    icon: DNA,
    color: "emerald",
    syllabus: ["Ionic bond", "Covalent bond", "VSEPR theory", "Hybridization"]
  },
  {
    id: "math-functions",
    title: "Functions",
    description: "Domain, range, composite functions, inverse functions, and graph sketching.",
    subject: "mathematics",
    status: "new",
    hours: 12,
    icon: FunctionSquare,
    color: "purple",
    syllabus: ["Types of functions", "Composite functions", "Inverse functions", "Graph sketching"]
  },
  {
    id: "math-trigonometry",
    title: "Trigonometry",
    description: "Inverse circular functions, trigonometric equations, and general solutions.",
    subject: "mathematics",
    status: "new",
    hours: 12,
    icon: Target,
    color: "pink",
    syllabus: ["Inverse trigonometric functions", "Trigonometric equations", "General values"]
  }
];

function getSubjectColor(color: string): string {
  const colors: Record<string, string> = {
    blue: "from-blue-500/10 to-blue-500/5",
    indigo: "from-indigo-500/10 to-indigo-500/5",
    green: "from-green-500/10 to-green-500/5",
    emerald: "from-emerald-500/10 to-emerald-500/5",
    purple: "from-purple-500/10 to-purple-500/5",
    pink: "from-pink-500/10 to-pink-500/5",
  };
  return colors[color] || "from-primary/10 to-primary/5";
}

function getSubjectIconColor(color: string): string {
  const colors: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
    green: "text-green-600 dark:text-green-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    purple: "text-purple-600 dark:text-purple-400",
    pink: "text-pink-600 dark:text-pink-400",
  };
  return colors[color] || "text-primary";
}

export default function TheoryPage() {
  const [activeSubject, setActiveSubject] = useState<"all" | "physics" | "chemistry" | "mathematics">("all");

  const filteredContent = useMemo(() => {
    if (activeSubject === "all") return THEORY_CONTENT;
    return THEORY_CONTENT.filter(item => item.subject === activeSubject);
  }, [activeSubject]);

  const activeCount = THEORY_CONTENT.filter(item => item.status === "active").length;
  const newCount = THEORY_CONTENT.filter(item => item.status === "new").length;

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          Theory Labs
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Comprehensive NEB/CDC aligned theory content for Class 11 Physics, Chemistry, and Mathematics.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
          <span className="text-sm font-medium">{activeCount} Available</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400">
          <span className="text-sm font-medium">{newCount} New</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Total: {THEORY_CONTENT.reduce((acc, item) => acc + item.hours, 0)} Hours</span>
        </div>
      </div>

      {/* Subject Tabs */}
      <Tabs value={activeSubject} onValueChange={(v) => setActiveSubject(v as typeof activeSubject)} className="w-full">
        <TabsList className="flex-wrap h-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b rounded-none px-1 -mx-1 w-full justify-start shadow-sm">
          <TabsTrigger value="all" className="gap-2 py-2 px-3">
            <BookOpen className="h-4 w-4" />
            <span>All Subjects</span>
          </TabsTrigger>
          <TabsTrigger value="physics" className="gap-2 py-2 px-3">
            <Atom className="h-4 w-4" />
            <span className="hidden xs:inline">Physics</span>
            <span className="xs:hidden">Phys</span>
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="gap-2 py-2 px-3">
            <FlaskConical className="h-4 w-4" />
            <span className="hidden xs:inline">Chemistry</span>
            <span className="xs:hidden">Chem</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="gap-2 py-2 px-3">
            <Calculator className="h-4 w-4" />
            <span className="hidden xs:inline">Mathematics</span>
            <span className="xs:hidden">Math</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-4">
          {filteredContent.map((item) => {
            const IconComponent = item.icon;
            const gradientBg = getSubjectColor(item.color);
            const iconColor = getSubjectIconColor(item.color);
            const hasPage = item.path !== undefined;

            return (
              <Card key={item.id} className="group hover:border-primary/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradientBg} ${iconColor}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="flex shrink-0 items-center gap-2">
                          {item.status === "active" && (
                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                              Active
                            </span>
                          )}
                          {item.status === "new" && (
                            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Terminal className="h-3 w-3" />
                          {item.hours} Hours
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          Class 11
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {item.syllabus?.length || 4} Topics
                        </span>
                      </div>
                      
                      {item.syllabus && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.syllabus.slice(0, 4).map((topic, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">
                              {topic}
                            </span>
                          ))}
                          {item.syllabus.length > 4 && (
                            <span className="px-2 py-0.5 rounded-md bg-muted/50 text-xs text-muted-foreground">
                              +{item.syllabus.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex shrink-0 gap-2">
                      {hasPage && (
                        <Link href={item.path!} passHref>
                          <Button size="sm" variant="outline" className="gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span className="hidden sm:inline">Read Theory</span>
                            <span className="sm:hidden">Read</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <TabsContent value="all" className="mt-0 hidden" />
        <TabsContent value="physics" className="mt-0 hidden" />
        <TabsContent value="chemistry" className="mt-0 hidden" />
        <TabsContent value="mathematics" className="mt-0 hidden" />
      </Tabs>

      {/* Navigation to Related Sections */}
      <div className="mt-12 pt-6 border-t">
        <h2 className="text-lg font-semibold mb-4">Related Sections</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/lab/3d" className="group block">
            <Card className="h-full hover:border-primary/50 transition-all">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">3D Labs</p>
                  <p className="text-xs text-muted-foreground">Interactive simulations</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/lab/motion-graphics" className="group block">
            <Card className="h-full hover:border-primary/50 transition-all">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Film className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">Motion Graphics</p>
                  <p className="text-xs text-muted-foreground">Animated visualizations</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/class-11" className="group block">
            <Card className="h-full hover:border-primary/50 transition-all">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">Class 11</p>
                  <p className="text-xs text-muted-foreground">Full syllabus</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-6 border-t text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Theory content aligned with <strong>NEB/CDC curriculum</strong> for Class 11.
        </p>
        <p className="text-xs text-muted-foreground">
          Each chapter includes concepts, formulas, derivations, and exam-focused notes.
        </p>
      </div>
    </div>
  );
}
