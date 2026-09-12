"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Class11PhysicsTheoryKinematics: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Physics Theory - Kinematics</CardTitle>
        <CardDescription>
          Chapter 1: Motion in a Straight Line - Comprehensive theory with concepts, formulas, and explanations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Key Concepts:</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>Position:</strong> Location of an object relative to a reference point (origin). Measured in meters (m).</li>
              <li><strong>Displacement:</strong> Change in position = Final position - Initial position. Vector quantity with magnitude and direction.</li>
              <li><strong>Distance:</strong> Total path length traveled. Scalar quantity, always positive.</li>
              <li><strong>Velocity:</strong> Rate of change of displacement. <code>v = Δx/Δt</code>. Vector quantity.</li>
              <li><strong>Speed:</strong> Rate of change of distance. <code>s = Δd/Δt</code>. Scalar quantity.</li>
              <li><strong>Acceleration:</strong> Rate of change of velocity. <code>a = Δv/Δt</code>. Vector quantity.</li>
            </ul>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Kinematic Equations (Uniform Acceleration):</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">1</Badge>
                <div>
                  <p className="font-medium">v = u + at</p>
                  <p className="text-sm text-muted-foreground">Final velocity = Initial velocity + (acceleration × time)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">2</Badge>
                <div>
                  <p className="font-medium">s = ut + ½at²</p>
                  <p className="text-sm text-muted-foreground">Displacement = (initial velocity × time) + ½(acceleration × time²)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">3</Badge>
                <div>
                  <p className="font-medium">v² = u² + 2as</p>
                  <p className="text-sm text-muted-foreground">Final velocity² = Initial velocity² + 2(acceleration × displacement)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">4</Badge>
                <div>
                  <p className="font-medium">s = (u + v)t/2</p>
                  <p className="text-sm text-muted-foreground">Displacement = (initial + final velocity) × time / 2</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Graphical Representation:</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>Position-Time Graph:</strong> Slope = Velocity. Straight line = constant velocity. Curve = acceleration.</li>
              <li><strong>Velocity-Time Graph:</strong> Slope = Acceleration. Area under curve = Displacement.</li>
              <li><strong>Acceleration-Time Graph:</strong> Area under curve = Change in velocity.</li>
            </ul>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-medium text-primary mb-3">Special Cases:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Free Fall:</p>
                <ul className="text-sm space-y-1">
                  <li>a = g = 9.8 m/s² (downward)</li>
                  <li>v = u + gt</li>
                  <li>h = ut + ½gt²</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Uniform Motion:</p>
                <ul className="text-sm space-y-1">
                  <li>a = 0</li>
                  <li>v = constant</li>
                  <li>s = vt</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11PhysicsTheoryKinematics;
