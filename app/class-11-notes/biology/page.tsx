"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, BookOpen, Calculator, FileText, Leaf, Sun, Wind, Dna, Microscope, TestTube, Beaker, FlaskConical, Atom, Orbit, Zap, Waves, Calendar } from "lucide-react";
import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";

export default function BiologyPage() {
  const [activeTab, setActiveTab] = useState("hub");
  const [journalEntries, setJournalEntries] = useState<{ id: string; title: string; content: string; date: string }[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");

  const addJournalEntry = () => {
    if (!newEntryTitle.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      title: newEntryTitle.trim(),
      content: newEntryContent.trim(),
      date: new Date().toLocaleDateString(),
    };
    setJournalEntries([...journalEntries, newEntry]);
    setNewEntryTitle("");
    setNewEntryContent("");
  };

  const removeJournalEntry = (id: string) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Biology</h1>
        <p className="text-muted-foreground">Class 11 Notes, Formulas, Numerical Problems, and Personal Journal</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="hub" className="flex flex-col items-center gap-1 py-3">
            <BookOpen className="h-5 w-5" />
            <span>Syllabus Hub</span>
          </TabsTrigger>
          <TabsTrigger value="formulas" className="flex flex-col items-center gap-1 py-3">
            <FileText className="h-5 w-5" />
            <span>Formulas</span>
          </TabsTrigger>
          <TabsTrigger value="numericals" className="flex flex-col items-center gap-1 py-3">
            <Calculator className="h-5 w-5" />
            <span>Numericals</span>
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex flex-col items-center gap-1 py-3">
            <BookOpen className="h-5 w-5" />
            <span>Journal</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hub" className="mt-4">
          <SubjectHubView classSlug="class-11-notes" subjectSlug="biology" />
        </TabsContent>

        <TabsContent value="formulas" className="mt-4 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Leaf className="h-5 w-5 text-green-600" /> Photosynthesis Formula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-mono">6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p>
                  <p className="text-sm text-muted-foreground">Chlorophyll</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sun className="h-5 w-5 text-yellow-600" /> Respiration Formula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-mono">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy</p>
                  <p className="text-sm text-muted-foreground">Aerobic Respiration</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Atom className="h-5 w-5 text-purple-600" /> Cellular Respiration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-mono">Glucose + Oxygen → Carbon Dioxide + Water + ATP</p>
                  <p className="text-sm text-muted-foreground">Mitochondria</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Dna className="h-5 w-5 text-blue-600" /> DNA Replication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-mono">A-T, C-G base pairing</p>
                  <p className="text-sm text-muted-foreground">Semi-conservative replication</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Microscope className="h-5 w-5 text-gray-600" /> Protein Synthesis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-mono">DNA → mRNA → Protein</p>
                  <p className="text-sm text-muted-foreground">Central Dogma</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wind className="h-5 w-5 text-cyan-600" /> Krebs Cycle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-mono">Acetyl-CoA → CO₂ + NADH + FADH₂</p>
                  <p className="text-sm text-muted-foreground">Citric Acid Cycle</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="numericals" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5 text-blue-600" /> Numerical Problems</CardTitle>
              <CardDescription>Practice biology numerical problems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Microscope className="h-4 w-4" /> Problem 1: Magnification Calculation</h3>
                <p className="text-sm text-muted-foreground">If an object is 10μm and appears 100μm under a microscope, what is the magnification?</p>
                <p className="text-sm font-mono bg-muted p-2 rounded">Magnification = Image Size / Object Size = 100μm / 10μm = 10x</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><TestTube className="h-4 w-4" /> Problem 2: Population Growth</h3>
                <p className="text-sm text-muted-foreground">A bacterial population doubles every 20 minutes. How many bacteria after 2 hours?</p>
                <p className="text-sm font-mono bg-muted p-2 rounded">Initial × 2^(6) = Initial × 64</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Dna className="h-4 w-4" /> Problem 3: DNA Length</h3>
                <p className="text-sm text-muted-foreground">If a DNA molecule has 1000 base pairs, and each bp is 0.34nm long, what is the total length?</p>
                <p className="text-sm font-mono bg-muted p-2 rounded">1000 bp × 0.34nm/bp = 340nm</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Sun className="h-4 w-4" /> Problem 4: Photosynthesis Rate</h3>
                <p className="text-sm text-muted-foreground">If a plant produces 10mg of glucose in 1 hour, what is the rate of CO₂ consumption?</p>
                <p className="text-sm font-mono bg-muted p-2 rounded">6CO₂ → C₆H₁₂O₆, so 6 × 44g CO₂ per 180g glucose</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-orange-600" /> Add New Journal Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entry-title" className="flex items-center gap-2"><FileText className="h-4 w-4" /> Title</Label>
                <Input
                  id="entry-title"
                  placeholder="e.g., Photosynthesis Notes"
                  value={newEntryTitle}
                  onChange={(e) => setNewEntryTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-content" className="flex items-center gap-2"><Beaker className="h-4 w-4" /> Content</Label>
                <Textarea
                  id="entry-content"
                  placeholder="Write your notes here..."
                  rows={4}
                  value={newEntryContent}
                  onChange={(e) => setNewEntryContent(e.target.value)}
                />
              </div>
              <Button onClick={addJournalEntry} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Entry
              </Button>
            </CardContent>
          </Card>

          {journalEntries.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No journal entries yet. Add your first entry above!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {journalEntries.map((entry, index) => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {index % 4 === 0 && <Leaf className="h-4 w-4 text-green-600" />}
                        {index % 4 === 1 && <Dna className="h-4 w-4 text-blue-600" />}
                        {index % 4 === 2 && <Microscope className="h-4 w-4 text-purple-600" />}
                        {index % 4 === 3 && <Sun className="h-4 w-4 text-yellow-600" />}
                        {entry.title}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeJournalEntry(entry.id)}
                        className="h-6 w-6"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" /> {entry.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{entry.content || "No content"}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
