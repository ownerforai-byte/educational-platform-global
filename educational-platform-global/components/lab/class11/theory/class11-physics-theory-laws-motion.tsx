"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Class11PhysicsTheoryLawsMotion: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Physics Theory - Newton's Laws of Motion</CardTitle>
        <CardDescription>
          Chapter 2: Laws of Motion with Force Analysis and Friction.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Newton's First Law (Law of Inertia):</h4>
            <p className="text-sm">A body continues in its state of rest or of uniform motion in a straight line unless compelled by an external force to act otherwise.</p>
            <ul className="text-sm mt-2 space-y-1">
              <li><strong>Inertia:</strong> Property of matter that resists change in motion.</li>
              <li><strong>Mass:</strong> Measure of inertia. Greater mass = greater inertia.</li>
              <li><strong>Examples:</strong> Passenger thrown forward when bus stops suddenly, dust falls when carpet is beaten.</li>
            </ul>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Newton's Second Law (F = ma):</h4>
            <p className="text-sm">The force acting on a body is directly proportional to the product of its mass and acceleration.</p>
            <div className="bg-primary/10 rounded p-3 mt-2">
              <p className="text-center text-lg font-bold">F = ma</p>
              <p className="text-sm text-center text-muted-foreground">Where: F = Force (N), m = Mass (kg), a = Acceleration (m/s²)</p>
            </div>
            <ul className="text-sm mt-3 space-y-2">
              <li><strong>1 Newton:</strong> Force that produces an acceleration of 1 m/s² in a body of mass 1 kg.</li>
              <li><strong>Dimensional Formula:</strong> [F] = [MLT⁻²]</li>
              <li><strong>Types of Forces:</strong> Contact forces (friction, tension, normal) and Field forces (gravitational, electrostatic, magnetic)</li>
            </ul>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Newton's Third Law (Action-Reaction):</h4>
            <p className="text-sm">For every action, there is an equal and opposite reaction.</p>
            <ul className="text-sm mt-2 space-y-2">
              <li>Action and reaction act on <strong>different bodies</strong>.</li>
              <li>They are of <strong>same type</strong> (both contact or both field).</li>
              <li><strong>Examples:</strong> Gun recoil, Walking, Swimming, Rocket propulsion.</li>
            </ul>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Friction:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Static Friction:</p>
                <p className="text-sm">Self-adjusting up to a maximum value (limiting friction).</p>
                <p className="text-sm mt-1">f_s ≤ μ_s N</p>
              </div>
              <div>
                <p className="font-medium">Kinetic Friction:</p>
                <p className="text-sm">Constant value for motion.</p>
                <p className="text-sm mt-1">f_k = μ_k N</p>
              </div>
            </div>
            <p className="text-sm mt-2"><strong>Note:</strong> &mu;_s &gt; &mu;_k (static friction coefficient &gt; kinetic friction coefficient)</p>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Pulley Systems:</h4>
            <ul className="text-sm space-y-2">
              <li><strong>Fixed Pulley:</strong> Changes direction of force, MA = 1</li>
              <li><strong>Movable Pulley:</strong> Force multiplication, MA = 2</li>
              <li><strong>Block and Tackle:</strong> Combination of fixed and movable pulleys, MA = number of pulleys in the system</li>
            </ul>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Circular Motion:</h4>
            <div className="space-y-2">
              <p className="font-medium">Centripetal Force:</p>
              <p className="text-lg font-bold bg-primary/10 p-2 rounded">F_c = mv²/r = mω²r</p>
              <p className="text-sm">Force directed towards the center of the circular path.</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-medium text-sm">Centripetal Acceleration:</p>
                  <p className="text-sm">a_c = v²/r = ω²r</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Angular Velocity:</p>
                  <p className="text-sm">ω = v/r = 2πn</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Banked Curves:</h4>
            <p className="text-sm">For a vehicle moving on a curved road, the road is banked to provide necessary centripetal force.</p>
            <p className="text-lg font-bold bg-primary/10 p-2 rounded mt-2">tanθ = v²/rg</p>
            <p className="text-sm text-muted-foreground">where θ = angle of banking, r = radius of curve</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11PhysicsTheoryLawsMotion;
