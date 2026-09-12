"use client";

/**
 * Interactive 3D Template
 *
 * Guidelines for making 3D components truly interactive:
 * 1. Expose all key parameters as inputs/sliders
 * 2. Update 3D scene in real-time as inputs change
 * 3. Show live calculations/results below the 3D view
 * 4. Provide preset buttons for common scenarios
 * 5. Allow saving/loading configurations
 * 6. Include animation controls (speed, play/pause)
 * 7. Show tooltips explaining each parameter
 */

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LabInput } from "@/components/lab/lab-input";
import { LabResult } from "@/components/lab/lab-result";
import { LabControlGroup } from "@/components/lab/lab-control-group";
import { LabCard } from "@/components/lab/lab-card";

/**
 * EXAMPLE: How to structure an interactive 3D component
 */
export function InteractiveTemplate() {
  // === State Management ===
  const [param1, setParam1] = useState(5);
  const [param2, setParam2] = useState(2.5);
  const [param3, setParam3] = useState(1.0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  // === Computed Values ===
  const result1 = param1 * param2;
  const result2 = Math.sqrt(param1 ** 2 + param2 ** 2);

  // === 3D Scene Setup ===
  useEffect(() => {
    // Initialize THREE.js scene here
    // Update whenever params change: param1, param2, param3, isAnimating
  }, [param1, param2, param3, isAnimating, animationSpeed]);

  // === Preset Configurations ===
  const presets = [
    { name: "Small", values: { p1: 2, p2: 1, p3: 0.5 } },
    { name: "Medium", values: { p1: 5, p2: 2.5, p3: 1 } },
    { name: "Large", values: { p1: 10, p2: 5, p3: 2 } },
  ];

  return (
    <LabCard title="Interactive 3D Visualization" description="Adjust inputs to see real-time changes">
      <div className="space-y-4">
        {/* === CONTROLS SECTION === */}
        <LabControlGroup label="Parameters" hint="Adjust values to change the 3D scene">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LabInput
              id="param1"
              label="Parameter 1"
              unit="units"
              value={param1}
              onChange={(v) => setParam1(Number(v))}
              type="number"
              step="0.5"
              min="0"
              max="20"
            />
            <LabInput
              id="param2"
              label="Parameter 2"
              unit="units"
              value={param2}
              onChange={(v) => setParam2(Number(v))}
              type="number"
              step="0.1"
              min="0"
              max="10"
            />
            <LabInput
              id="param3"
              label="Parameter 3"
              unit="units"
              value={param3}
              onChange={(v) => setParam3(Number(v))}
              type="number"
              step="0.1"
              min="0"
              max="5"
            />
          </div>

          {/* Animation Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
            <Button
              variant={isAnimating ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAnimating(!isAnimating)}
            >
              {isAnimating ? "Stop" : "Start"} Animation
            </Button>
            {isAnimating && (
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Speed:</Label>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.2"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-xs font-medium">{animationSpeed.toFixed(1)}×</span>
              </div>
            )}
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => {
                  setParam1(preset.values.p1);
                  setParam2(preset.values.p2);
                  setParam3(preset.values.p3);
                }}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </LabControlGroup>

        {/* === 3D VISUALIZATION === */}
        <div
          ref={containerRef}
          className="lab-3d-container rounded-lg border border-border bg-slate-950"
          aria-label="3D interactive visualization"
        />

        {/* === LIVE RESULTS === */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <LabResult
            label="Result 1"
            value={result1.toFixed(2)}
            unit="units"
            highlight={result1 > 10}
          />
          <LabResult
            label="Result 2"
            value={result2.toFixed(2)}
            unit="units"
            highlight={result2 > 8}
          />
          <LabResult
            label="Param 1"
            value={param1}
            unit="units"
          />
          <LabResult
            label="Status"
            value={isAnimating ? "Animating" : "Paused"}
            highlight={isAnimating}
          />
        </div>

        {/* === INSIGHTS === */}
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            📊 Real-time Insights
          </p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>
              • <span className="font-medium">Result 1</span> changes with Parameter 1
            </li>
            <li>
              • <span className="font-medium">Result 2</span> shows the magnitude
            </li>
            <li>
              • Watch how the 3D scene responds to your inputs in real-time
            </li>
            <li>
              • Use presets for quick configuration changes
            </li>
          </ul>
        </div>
      </div>
    </LabCard>
  );
}

