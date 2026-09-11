"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const MotionGraphicsElectromagnetism: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Electromagnetism in 3D</CardTitle>
        <CardDescription>
          Interactive 3D visualizations of electromagnetic concepts: Faraday's Law, Lenz's Law, electromagnetic induction, and Maxwell's unified theory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-center py-12">
          <h2 className="text-2xl font-bold text-primary">Electromagnetism</h2>
          <p className="text-muted-foreground">
            This 3D motion graphics lab will feature:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Faraday's Law of induction: EMF = -dΦ/dt</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Lenz's Law: Induced EMF opposes the change</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Magnetic field from current-carrying wires</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Solenoid and toroid magnetic fields</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Maxwell's equations in integral and differential form</span>
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
