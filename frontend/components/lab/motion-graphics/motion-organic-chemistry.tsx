"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const MotionGraphicsOrganicChemistry: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Organic Chemistry Reactions</CardTitle>
        <CardDescription>
          3D animated visualizations of organic reaction mechanisms: SN1, SN2, E1, E2, addition, substitution, and polymerization reactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-center py-12">
          <h2 className="text-2xl font-bold text-primary">Organic Chemistry</h2>
          <p className="text-muted-foreground">
            This 3D motion graphics lab will feature:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>SN1 Reaction: Nucleophilic substitution unimolecular</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>SN2 Reaction: Nucleophilic substitution bimolecular</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>E1 Reaction: Elimination unimolecular</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>E2 Reaction: Elimination bimolecular</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Addition reactions: Alkene + HBr</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-6">
            3D visualization coming soon...
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
