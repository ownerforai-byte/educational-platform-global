"use client";

import { useState, useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Search, Atom, FlaskConical, Calculator, GraduationCap, ChevronRight, Dna } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LabItem {
  id: string;
  title: string;
  description: string;
  category: "physics" | "chemistry" | "mathematics" | "biology" | "class11";
  icon?: React.ReactNode;
  status?: "active" | "development" | "new" | "premium";
  component: React.ComponentType<any>;
  creditCost?: number;
}

const CATEGORY_CONFIG: Record<LabItem["category"], { label: string; icon: React.ReactNode; color: string }> = {
  physics: {
    label: "Physics",
    icon: <Atom className="h-4 w-4" />,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  chemistry: {
    label: "Chemistry",
    icon: <FlaskConical className="h-4 w-4" />,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  mathematics: {
    label: "Mathematics",
    icon: <Calculator className="h-4 w-4" />,
    color: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  },
  biology: {
    label: "Biology",
    icon: <Dna className="h-4 w-4" />,
    color: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  class11: {
    label: "Class 11",
    icon: <GraduationCap className="h-4 w-4" />,
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
};

export interface LabItem {
  id: string;
  title: string;
  description: string;
  category: "physics" | "chemistry" | "mathematics" | "biology" | "class11";
  icon?: React.ReactNode;
  status?: "active" | "development" | "new" | "premium";
  component: React.ComponentType<any>;
  creditCost?: number;
}

interface LabDashboardProps {
  labs: LabItem[];
  onSelectLab: (id: string) => void;
  selectedLabId?: string;
  className?: string;
}

export function LabDashboard({ labs, onSelectLab, selectedLabId, className }: LabDashboardProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<LabItem["category"] | "all">("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return labs.filter((lab) => {
      const matchesSearch = !q || lab.title.toLowerCase().includes(q) || lab.description.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "all" || lab.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [labs, search, categoryFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: labs.length };
    for (const lab of labs) {
      c[lab.category] = (c[lab.category] || 0) + 1;
    }
    return c;
  }, [labs]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search labs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={categoryFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("all")}
            className="text-xs"
          >
            All ({counts.all})
          </Button>
          {(Object.keys(CATEGORY_CONFIG) as LabItem["category"][]).map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(cat)}
              className={cn("text-xs", categoryFilter !== cat && CATEGORY_CONFIG[cat].color)}
            >
              {CATEGORY_CONFIG[cat].icon}
              <span className="ml-1.5">{CATEGORY_CONFIG[cat].label}</span>
              <span className="ml-1 text-muted-foreground">({counts[cat] || 0})</span>
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No labs found</p>
          <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((lab) => {
            const isSelected = selectedLabId === lab.id;
            return (
              <Card
                key={lab.id}
                className={cn(
                  "group cursor-pointer transition-all duration-200 hover:shadow-md",
                  isSelected && "ring-2 ring-primary shadow-sm"
                )}
                onClick={() => onSelectLab(lab.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                          CATEGORY_CONFIG[lab.category].color
                        )}
                      >
                        {lab.icon || CATEGORY_CONFIG[lab.category].icon}
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                          {lab.title}
                        </CardTitle>
                        <p className="text-[11px] text-muted-foreground mt-0.5 capitalize">
                          {CATEGORY_CONFIG[lab.category].label}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{lab.description}</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    {lab.status && (
                      <StatusBadge variant={lab.status === "new" ? "coming-soon" : lab.status} />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
