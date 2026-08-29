"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback, useWebGLCanvas } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ============================================================
   Data: specific heat capacities of common solids & liquids
   ============================================================ */

const SPECIFIC_HEAT_MATERIALS = [
  { name: "Water (liquid)", c: 4200, density: 1000, color: "#0ea5e9", description: "The universal reference. c = 4200 J/kg·K — it takes 4200 J to raise 1 kg of water by 1 K. Water's high c is why oceans moderate climate." },
  { name: "Ice (solid)", c: 2090, density: 917, color: "#a5f3fc", description: "c ≈ 2090 J/kg·K at −10 °C. Roughly half of liquid water's value — ice warms almost twice as fast for the same energy." },
  { name: "Aluminium", c: 897, density: 2700, color: "#c084fc", description: "c = 897 J/kg·K. Light metal. In Mandal/Devkota's lab, aluminium blocks are classic 'solid' samples for the calorimetry method." },
  { name: "Iron", c: 449, density: 7874, color: "#f97316", description: "c = 449 J/kg·K. Higher mass per piece but only ~half aluminium's heat capacity per kg." },
  { name: "Copper", c: 385, density: 8960, color: "#fbbf24", description: "c = 385 J/kg·K. Good conductor — heats and cools quickly, useful in calorimeter stirrers." },
  { name: "Brass", c: 380, density: 8500, color: "#a3e635", description: "c ≈ 380 J/kg·K. Alloy of Cu and Zn, common in school 'solid' experiments." },
  { name: "Silver", c: 235, density: 10500, color: "#e2e8f0", description: "c = 235 J/kg·K. Low heat capacity — it heats up fast, which is why silver cutlery feels hot quickly." },
  { name: "Lead", c: 129, density: 11340, color: "#94a3b8", description: "c = 129 J/kg·K. Very low — even 100 J barely changes its temperature." },
  { name: "Ethanol", c: 2440, density: 789, color: "#fb923c", description: "c = 2440 J/kg·K. Liquid with lower c than water — it warms faster, evaporates easily." },
  { name: "Olive oil", c: 1970, density: 911, color: "#84cc16", description: "c ≈ 1970 J/kg·K. Vegetable oils have roughly half water's heat capacity." },
  { name: "Glycerin", c: 2430, density: 1260, color: "#fbbf24", description: "c = 2430 J/kg·K. Viscous liquid with a hefty heat capacity — good for liquid experiments." },
  { name: "Glass", c: 840, density: 2500, color: "#38bdf8", description: "c = 840 J/kg·K. The calorimeter is often made of glass — its own heat capacity must be accounted for." },
  { name: "Air (1 atm)", c: 1005, density: 1.2, color: "#64748b", description: "c ≈ 1005 J/kg·K at constant pressure. Its tiny density means air needs very little total energy." },
] as const;

type SpecificHeatMaterial = (typeof SPECIFIC_HEAT_MATERIALS)[number];

const LATENT_HEATS = [
  { name: "Ice → Water (fusion)", L: 334000, color: "#0ea5e9", description: "L_f = 334 kJ/kg. Melting 1 kg of ice absorbs 334 kJ WITHOUT any temperature rise — energy breaks hydrogen bonds." },
  { name: "Water → Steam (vaporisation)", L: 2260000, color: "#f97316", description: "L_v = 2260 kJ/kg. Boiling 1 kg of water needs ~6.8× the fusion energy — the largest thermal 'toll' of water." },
  { name: "Aluminium (fusion)", L: 397000, color: "#c084fc", description: "L_f = 397 kJ/kg for Al — melting metal requires a lot of latent heat." },
  { name: "Copper (fusion)", L: 205000, color: "#fbbf24", description: "L_f ≈ 205 kJ/kg for copper." },
  { name: "Iron (fusion)", L: 247000, color: "#f97316", description: "L_f ≈ 247 kJ/kg for iron." },
  { name: "Lead (fusion)", L: 23100, color: "#94a3b8", description: "L_f ≈ 23.1 kJ/kg — lead melts easily with little latent heat." },
] as const;

type LatentHeatMaterial = (typeof LATENT_HEATS)[number];

/* ============================================================
   Theory blocks shared by both experiments
   ============================================================ */

function SolidTheory() {
  return (
    <TheoryPanel
      title="Measurement of specific heat capacity of a solid"
      vocabulary="Calorimeter — an insulated copper/glass vessel; Water equivalent — the mass of water that would absorb the same heat as the calorimeter; Specific heat capacity c — energy needed to raise 1 kg by 1 K (J·kg⁻¹·K⁻¹)."
      look={
        <>
          A heated solid (mass m, temperature T₂) is dropped into a calorimeter containing water (mass m_w, water c_w, initial T₁).
          Read the final equilibrium temperature θ.
        </>
      }
      predict="Before you run it, predict: a metal with LOW c like lead will warm the water less than a metal with HIGH c like aluminium — even at the same mass and initial temperature."
      principle={
        <>
          Heat lost by solid = heat gained by (water + calorimeter):
          <span className="block font-mono text-[11px] mt-1 text-foreground">m·c·(T₂ − θ) = (m_w·c_w + w·c_w)·(θ − T₁)</span>
          Solve for c: c = (m_w·c_w + w·c_w)·(θ − T₁) / (m·(T₂ − θ)).
          Here w is the water equivalent of the calorimeter (g) — its own capacity added as if it were extra water.
        </>
      }
      why="This is the standard NEB Class 11 lab experiment for measuring specific heat capacity of solids (copper, iron, aluminium blocks)."
    />
  );
}

function LiquidTheory() {
  return (
    <TheoryPanel
      title="Measurement of specific heat capacity of a liquid"
      vocabulary="Method of mixtures — heat lost by a hot body is gained by the liquid & calorimeter; Water equivalent w — added to liquid mass for accurate results."
      look={
        <>
          A known mass of the liquid (m_L) is in the calorimeter. A hot solid of known specific heat (c_s), mass m_s and temperature T₂ is added.
          Equilibrium temperature θ is read from the thermometer.
        </>
      }
      predict="A liquid with low c (e.g. olive oil, c ≈ 1970) will reach a higher equilibrium temperature than water for the same hot solid."
      principle={
        <>
          Heat lost by solid = heat gained by liquid + calorimeter:
          <span className="block font-mono text-[11px] mt-1 text-foreground">m_s·c_s·(T₂ − θ) = (m_L·c_L + w·c_w)·(θ − T₁)</span>
          Therefore c_L = [m_s·c_s·(T₂ − θ)]/(m_L·(θ − T₁)) − (w·c_w)/m_L.
        </>
      }
      why="Used when the substance is a liquid — e.g. kerosene, oil, glycerine, ethanol. Gives c directly from heat balance."
    />
  );
}

function LatentTheory() {
  return (
    <TheoryPanel
      title="Latent heat & phase change"
      vocabulary="Latent heat L (J/kg) — energy absorbed or released during a phase change at constant temperature; Fusion — solid→liquid; Vaporisation — liquid→gas."
      look="The temperature stays constant while heat is supplied — the energy breaks intermolecular bonds rather than raising kinetic energy. Watch the temperature plateau in the graph."
      predict="Fusion needs far less energy than vaporisation. Water: L_f ≈ 334 kJ/kg but L_v ≈ 2260 kJ/kg — 6.8× more energy to boil the same mass."
      principle={
        <>
          <span className="block font-mono text-[11px] text-foreground">Q = m·L</span>
          During a phase change ΔT = 0 and Q = mcΔT does NOT apply. Use Q = mL until the phase change is complete, then resume Q = mcΔT.
        </>
      }
      why="Explains why steam burns are more dangerous than boiling water burns — the extra latent heat (2260 kJ/kg) is released on your skin."
    />
  );
}

function CoolingTheory() {
  return (
    <TheoryPanel
      title="Newton's law of cooling"
      vocabulary="Rate of cooling dT/dt — how fast a hot body cools; Surroundings temperature T_s; Excess temperature T − T_s."
      look="A hot body cools — its temperature falls quickly at first, then more slowly as it approaches room temperature. The graph is an exponential decay."
      predict="The larger the initial excess temperature, the faster the cooling rate. Cooling is proportional to the EXCESS, not the absolute temperature."
      principle={
        <span className="block font-mono text-[11px] text-foreground">
          dT/dt = −k(T − T_s)
          <br />
          T(t) = T_s + (T₀ − T_s)·e^(−kt)
        </span>
      }
      why="Valid for small temperature differences and forced convection — used to estimate cooling times of engines, food, and electronics."
    />
  );
}

/* ============================================================
   Experiment 1 — Specific Heat Capacity of a Solid
   ============================================================ */

function SolidHeatExperiment() {
  const [materialIndex, setMaterialIndex] = useState(3); // Iron default
  const [solidMass, setSolidMass] = useState(0.2); // kg
  const [solidTemp, setSolidTemp] = useState(100); // °C
  const [waterMass, setWaterMass] = useState(0.4); // kg
  const [waterTemp, setWaterTemp] = useState(20); // °C
  const [waterEq, setWaterEq] = useState(0.02); // kg (calorimeter water equivalent)
  const [showSteps, setShowSteps] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mat = SPECIFIC_HEAT_MATERIALS[materialIndex];

  // Final equilibrium temperature (with calorimeter water equivalent)
  const cw = 4200;
  const numerator = mat.c * solidMass * solidTemp + cw * (waterMass + waterEq) * waterTemp;
  const denominator = mat.c * solidMass + cw * (waterMass + waterEq);
  const theta = numerator / denominator;

  const heatGained = cw * (waterMass + waterEq) * (theta - waterTemp);
  const heatLost = mat.c * solidMass * (solidTemp - theta);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // --- Calorimeter (container) ---
    const calX = W * 0.30;
    const calY = H * 0.18;
    const calW = 200;
    const calH = H * 0.58;

    // Outer calorimeter
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(calX, calY, calW, calH);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.strokeRect(calX, calY, calW, calH);

    // Water level
    const waterLevelY = calY + calH - (waterMass / 0.8) * calH * 0.7;
    ctx.fillStyle = "rgba(14,165,233,0.75)";
    ctx.fillRect(calX + 4, waterLevelY, calW - 8, calY + calH - waterLevelY - 4);

    // Solid block (immersed)
    const blockSize = 42 + materialIndex * 3;
    const blockX = calX + calW / 2 - blockSize / 2;
    const blockY = calY + calH * 0.55;
    ctx.fillStyle = mat.color;
    ctx.fillRect(blockX, blockY, blockSize, blockSize * 0.8);
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 2;
    ctx.strokeRect(blockX, blockY, blockSize, blockSize * 0.8);
    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 11px Inter, sans-serif";
    ctx.fillText(mat.name, blockX - 10, blockY - 8);

    // Thermometer
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(calX - 26, calY + 10);
    ctx.lineTo(calX - 26, calY + calH - 10);
    ctx.stroke();
    const thermY = calY + calH - 10 - ((theta - 0) / 100) * (calH - 20);
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(calX - 26, Math.min(Math.max(thermY, calY + 10), calY + calH - 10), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText("θ = " + theta.toFixed(1) + "°C", calX - 64, calY + 22);

    // Heat flow arrows into water
    const arrX = calX - 60;
    const arrY = calY + calH * 0.5;
    ctx.strokeStyle = "#fb923c";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(arrX, arrY);
    ctx.lineTo(calX - 4, arrY);
    ctx.stroke();
    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    ctx.moveTo(calX - 10, arrY - 7);
    ctx.lineTo(calX - 2, arrY);
    ctx.lineTo(calX - 10, arrY + 7);
    ctx.fill();
    ctx.fillStyle = "#fb923c";
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText("Heat from block", arrX - 4, arrY - 10);

    // Right side: equilibrium temperature readout & energy bars
    const rx = W * 0.58;
    ctx.fillStyle = "#22d3ee";
    ctx.font = "600 14px Inter, sans-serif";
    ctx.fillText("Equilibrium", rx, calY + 30);
    ctx.fillText("θ = " + theta.toFixed(1) + " °C", rx, calY + 54);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText("Heat lost by solid = " + heatLost.toFixed(1) + " J", rx, calY + 84);
    ctx.fillText("Heat gained by water = " + heatGained.toFixed(1) + " J", rx, calY + 106);

    // Energy conservation bar
    const barX = rx;
    const barY = calY + 130;
    const barW = 180;
    const barH = 14;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = "#f97316";
    ctx.fillRect(barX, barY, (Math.min(heatLost, heatGained) / Math.max(1, Math.max(heatLost, heatGained))) * barW, barH);
    ctx.strokeStyle = "#475569";
    ctx.strokeRect(barX, barY, barW, barH);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "400 10px Inter, sans-serif";
    ctx.fillText("Heat lost ≈ heat gained (calorimetry)", barX, barY + barH + 14);
  }, [materialIndex, solidMass, solidTemp, waterMass, waterTemp, waterEq, theta, heatLost, heatGained, mat]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specific Heat Capacity of a Solid (Calorimetry)</CardTitle>
        <p className="text-xs text-muted-foreground">Drop a hot solid into cool water — measure the final equilibrium temperature and find c.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={640} height={380} className="w-full rounded-lg border border-border" aria-label="Calorimetry experiment — solid in calorimeter with water" />

        <CollapsibleControls label="Experimental Controls" defaultOpen>
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Solid material</Label>
              <Select value={String(materialIndex)} onValueChange={(v) => setMaterialIndex(Number(v))}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SPECIFIC_HEAT_MATERIALS.map((m, i) => (
                    <SelectItem key={m.name} value={String(i)}>{m.name} ({m.c})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Solid mass (kg)</Label>
              <Input type="number" min={0.05} step={0.01} value={solidMass} onChange={(e) => setSolidMass(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Solid initial temp (°C)</Label>
              <Input type="number" min={40} max={120} value={solidTemp} onChange={(e) => setSolidTemp(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Water mass (kg)</Label>
              <Input type="number" min={0.1} step={0.01} value={waterMass} onChange={(e) => setWaterMass(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Water equiv. of calorimeter (kg)</Label>
              <Input type="number" min={0} step={0.005} value={waterEq} onChange={(e) => setWaterEq(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full">
            <Label className="text-xs text-muted-foreground">Water initial temp (°C)</Label>
            <Input type="number" min={5} max={50} value={waterTemp} onChange={(e) => setWaterTemp(Number(e.target.value))} className="w-28" />
            <Button type="button" variant="outline" size="sm" onClick={() => setShowSteps(!showSteps)}>
              {showSteps ? "Hide" : "Show"} step-by-step
            </Button>
          </div>
        </CollapsibleControls>

        {showSteps && (
          <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
            <li>Weigh the solid block: m = {solidMass} kg. Heat it in boiling water to T₂ = {solidTemp} °C.</li>
            <li>Fill calorimeter with m_w = {waterMass} kg of water at T₁ = {waterTemp} °C. Water equivalent w = {waterEq} kg.</li>
            <li>Drop the block in, stir, read equilibrium θ = {theta.toFixed(1)} °C.</li>
            <li>Heat lost = m·c·(T₂ − θ) = {heatLost.toFixed(1)} J ; Heat gained = (m_w + w)·c_w·(θ − T₁) = {heatGained.toFixed(1)} J.</li>
            <li>Equate → c = {(heatGained / Math.max(1e-6, solidMass * (solidTemp - theta))).toFixed(0)} J/kg·K ✓ ({mat.name}: {mat.c}).</li>
          </ol>
        )}

        <SolidTheory />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Experiment 2 — Specific Heat Capacity of a Liquid (mixture)
   ============================================================ */

function LiquidHeatExperiment() {
  const [liquidIndex, setLiquidIndex] = useState(0); // Water
  const [liquidMass, setLiquidMass] = useState(0.3); // kg
  const [liquidTemp, setLiquidTemp] = useState(20); // °C
  const [solidC, setSolidC] = useState(897); // Aluminium
  const [solidMass, setSolidMass] = useState(0.1); // kg
  const [solidTemp, setSolidTemp] = useState(90); // °C
  const [waterEq, setWaterEq] = useState(0.02); // kg
  const [showSteps, setShowSteps] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const liquid = SPECIFIC_HEAT_MATERIALS[liquidIndex];
  const cw = 4200;

  const numerator = solidC * solidMass * solidTemp + cw * waterEq * liquidTemp;
  const denominator = solidC * solidMass + liquid.c * liquidMass + cw * waterEq;
  const theta = numerator / denominator;

  const heatLost = solidC * solidMass * (solidTemp - theta);
  const heatGained = (liquid.c * liquidMass + cw * waterEq) * (theta - liquidTemp);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // Vessel + liquid
    const vx = W * 0.28;
    const vy = H * 0.15;
    const vw = 200;
    const vh = H * 0.62;

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(vx, vy, vw, vh);
    ctx.strokeStyle = "#475569";
    ctx.strokeRect(vx, vy, vw, vh);

    // liquid level
    const liquidLevelY = vy + vh - (liquidMass / 0.6) * vh * 0.7;
    ctx.fillStyle = liquid.color;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(vx + 4, liquidLevelY, vw - 8, vy + vh - liquidLevelY - 4);
    ctx.globalAlpha = 1;

    // hot solid
    const bx = vx + vw / 2 - 20;
    const by = vy + vh * 0.58;
    ctx.fillStyle = "#c084fc";
    ctx.fillRect(bx, by, 40, 40);
    ctx.strokeStyle = "#f1f5f9";
    ctx.strokeRect(bx, by, 40, 40);
    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 11px Inter, sans-serif";
    ctx.fillText("Hot solid", bx - 14, by - 8);

    // thermometer
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(vx - 26, vy + 10);
    ctx.lineTo(vx - 26, vy + vh - 10);
    ctx.stroke();
    const thermY = vy + vh - 10 - ((theta - 0) / 120) * (vh - 20);
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(vx - 26, Math.min(Math.max(thermY, vy + 10), vy + vh - 10), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText("θ = " + theta.toFixed(1) + "°C", vx - 64, vy + 22);

    // Right panel
    const rx = W * 0.58;
    ctx.fillStyle = "#22d3ee";
    ctx.font = "600 14px Inter, sans-serif";
    ctx.fillText("Mixture Equilibrium", rx, vy + 30);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText("Liquid: " + liquid.name, rx, vy + 58);
    ctx.fillText("Measured c (target) = " + liquid.c + " J/kg·K", rx, vy + 80);
    ctx.fillText("Heat lost (solid) = " + heatLost.toFixed(1) + " J", rx, vy + 108);
    ctx.fillText("Heat gained (liquid + cal.) = " + heatGained.toFixed(1) + " J", rx, vy + 130);
  }, [liquidIndex, liquidMass, liquidTemp, solidC, solidMass, solidTemp, waterEq, theta, heatLost, heatGained, liquid]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specific Heat Capacity of a Liquid (Method of Mixtures)</CardTitle>
        <p className="text-xs text-muted-foreground">Add a hot solid of known c to an unknown liquid — the equilibrium temperature reveals the liquid's specific heat.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={640} height={380} className="w-full rounded-lg border border-border" aria-label="Method of mixtures — hot solid into liquid" />

        <CollapsibleControls label="Experimental Controls" defaultOpen>
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Liquid</Label>
              <Select value={String(liquidIndex)} onValueChange={(v) => setLiquidIndex(Number(v))}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SPECIFIC_HEAT_MATERIALS.filter((m) => m.density < 2000 || m.name === "Water (liquid)" || m.name === "Ethanol" || m.name === "Olive oil" || m.name === "Glycerin").map((m, i) => (
                    <SelectItem key={m.name} value={String(SPECIFIC_HEAT_MATERIALS.indexOf(m))}>{m.name} (c = {m.c})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Liquid mass (kg)</Label>
              <Input type="number" min={0.05} step={0.01} value={liquidMass} onChange={(e) => setLiquidMass(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Liquid initial temp (°C)</Label>
              <Input type="number" min={5} max={50} value={liquidTemp} onChange={(e) => setLiquidTemp(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Solid c (J/kg·K)</Label>
              <Select value={String(solidC)} onValueChange={(v) => setSolidC(Number(v))}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[897, 449, 385, 235, 129, 840].map((cVal) => {
                    const found = SPECIFIC_HEAT_MATERIALS.find((m) => m.c === cVal);
                    return <SelectItem key={cVal} value={String(cVal)}>{found?.name ?? cVal} (c = {cVal})</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Solid mass (kg)</Label>
              <Input type="number" min={0.02} step={0.01} value={solidMass} onChange={(e) => setSolidMass(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Solid initial temp (°C)</Label>
              <Input type="number" min={40} max={120} value={solidTemp} onChange={(e) => setSolidTemp(Number(e.target.value))} className="w-32" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Calorimeter water equivalent (kg)</Label>
              <Input type="number" min={0} step={0.005} value={waterEq} onChange={(e) => setWaterEq(Number(e.target.value))} className="w-32" />
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowSteps(!showSteps)}>
              {showSteps ? "Hide" : "Show"} step-by-step
            </Button>
          </div>
        </CollapsibleControls>

        {showSteps && (
          <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
            <li>Put {liquidMass} kg of {liquid.name} (initial {liquidTemp} °C) in calorimeter (water eq = {waterEq} kg).</li>
            <li>Heat a solid (c = {solidC} J/kg·K, m = {solidMass} kg) to {solidTemp} °C.</li>
            <li>Drop it in — equilibrium θ = {theta.toFixed(1)} °C.</li>
            <li>Heat lost = {heatLost.toFixed(1)} J; Heat gained = {heatGained.toFixed(1)} J.</li>
            <li>c_L = [(m_s·c_s·(T₂−θ)) − (w·c_w·(θ−T₁))] / (m_L·(θ−T₁)) = {(Math.max(0, heatLost - cw * waterEq * (theta - liquidTemp)) / Math.max(1e-6, liquidMass * (theta - liquidTemp))).toFixed(0)} J/kg·K ✓</li>
          </ol>
        )}

        <LiquidTheory />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Experiment 3 — Latent Heat & Phase Change graph
   ============================================================ */

function LatentHeatLab() {
  const [materialIndex, setMaterialIndex] = useState(0); // Ice → Water
  const [mass, setMass] = useState(1); // kg
  const [supplied, setSupplied] = useState(0); // J (accumulated energy)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mat = LATENT_HEATS[materialIndex];
  const L = mat.L;
  const QToComplete = mass * L;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // --- T vs Q graph ---
    const gx = 70;
    const gy = 30;
    const gw = W - 120;
    const gh = H - 110;

    // axes
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx, gy + gh);
    ctx.lineTo(gx + gw, gy + gh);
    ctx.lineTo(gx + gw, gy);
    ctx.stroke();

    // axis labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText("Heat supplied Q (J)", gx + gw / 2 - 50, gy + gh + 22);
    ctx.fillText("T", gx - 30, gy + 10);

    // horizontal temperature line (constant during phase change)
    const tMid = gy + gh * 0.4;
    ctx.strokeStyle = "#f8fafc";
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(gx, tMid);
    ctx.lineTo(gx + gw, tMid);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#f8fafc";
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText("Constant temperature (phase change)", gx + 10, tMid - 8);

    // Progress along the plateau
    const frac = Math.min(1, Math.max(0, supplied / Math.max(1, QToComplete)));
    const pX = gx + frac * gw;
    ctx.fillStyle = mat.color;
    ctx.beginPath();
    ctx.arc(pX, tMid, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // melting/boiling state visual
    const stateX = W * 0.18;
    const stateY = H * 0.82;
    if (frac < 1) {
      // Partial melting — mixed solid/liquid
      ctx.fillStyle = mat.color;
      ctx.globalAlpha = 0.5 + 0.5 * frac;
      for (let i = 0; i < 8; i++) {
        const dx = stateX + Math.sin(i * 1.3) * 22;
        const dy = stateY + Math.cos(i * 1.7) * 14;
        ctx.beginPath();
        ctx.arc(dx, dy, 6 + Math.random() * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "500 12px Inter, sans-serif";
      ctx.fillText(`Phase change in progress… ${(frac * 100).toFixed(0)}%`, stateX - 90, stateY - 26);
    } else {
      ctx.fillStyle = "#22c55e";
      ctx.font = "600 14px Inter, sans-serif";
      ctx.fillText("✓ Phase change complete", stateX - 80, stateY - 26);
    }
  }, [materialIndex, mass, supplied, QToComplete, mat]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latent Heat — Phase Change at Constant Temperature</CardTitle>
        <p className="text-xs text-muted-foreground">During melting or boiling, heat goes into breaking bonds — temperature does NOT rise.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={640} height={380} className="w-full rounded-lg border border-border" aria-label="Temperature vs heat supplied graph during phase change" />

        <div className="flex flex-wrap items-center gap-4">
          <div className="w-64">
            <Label className="text-xs text-muted-foreground">Phase change</Label>
            <Select value={String(materialIndex)} onValueChange={(v) => {
              setMaterialIndex(Number(v));
              setSupplied(0);
            }}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LATENT_HEATS.map((m, i) => (
                  <SelectItem key={m.name} value={String(i)}>{m.name} (L = {(m.L / 1000).toFixed(0)} kJ/kg)</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-40">
            <Label className="text-xs text-muted-foreground">Mass (kg)</Label>
            <Input type="number" min={0.1} step={0.1} value={mass} onChange={(e) => { setMass(Number(e.target.value)); setSupplied(0); }} />
          </div>
          <div className="flex-1 min-w-48">
            <Label className="text-xs text-muted-foreground">
              Heat supplied: {supplied.toLocaleString()} J / {QToComplete.toLocaleString()} J needed
            </Label>
            <input type="range" min={0} max={QToComplete * 1.5} value={supplied} onChange={(e) => setSupplied(Number(e.target.value))} className="w-full" aria-label="Heat supplied slider" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {mat.name}: Q = m·L = {mass} × {L.toLocaleString()} = {QToComplete.toLocaleString()} J. At the plateau, temperature is fixed while the phase changes. ({mat.description})
        </p>

        <LatentTheory />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Theory block for thermal expansion
   ============================================================ */

function ExpansionTheory() {
  return (
    <TheoryPanel
      title="Thermal expansion of solids & liquids"
      vocabulary="Linear expansion ΔL — length change per degree; Coefficient of linear expansion α (K⁻¹); Cubical expansion ΔV — volume change per degree; Coefficient of cubical expansion γ ≈ 3α."
      look="A metal rod (or liquid column) lengthens/rises when heated. The expansion is proportional to original length × temperature change."
      predict="Materials with large α (aluminium ≈ 24×10⁻⁶ K⁻¹) expand far more than Pyrex glass (≈ 3×10⁻⁶ K⁻¹). Rail gaps in summer exist because steel rails expand when hot."
      principle={
        <span className="block font-mono text-[11px] text-foreground">
          ΔL = L₀·α·ΔT
          <br />
          ΔV = V₀·γ·ΔT = V₀·3α·ΔT (isotropic solids)
          <br />
          Liquid: apparent expansion = real − container expansion
        </span>
      }
      why="Explains bimetallic strips in thermostats, expansion gaps in bridges/rails, mercury thermometers, and why liquids show apparent expansion in a glass vessel. Part of NEB Class 11 'Thermal Expansion' unit."
    />
  );
}

/* ============================================================
   Experiment 5 — Thermal Expansion (linear & cubical)
   ============================================================ */

const EXPANSION_MATERIALS = [
  { name: "Aluminium", alpha: 23e-6, color: "#c084fc", description: "α = 23×10⁻⁶ K⁻¹. Expands strongly — used in bimetallic strips (Al on top)." },
  { name: "Copper", alpha: 17e-6, color: "#fbbf24", description: "α = 17×10⁻⁶ K⁻¹. Standard for the 'Metal Rod's Expansion' lab." },
  { name: "Brass", alpha: 19e-6, color: "#a3e635", description: "α ≈ 19×10⁻⁶ K⁻¹. Common in thermometer bimetallic strips." },
  { name: "Steel", alpha: 12e-6, color: "#64748b", description: "α = 12×10⁻⁶ K⁻¹. Bridges and railway tracks — gaps needed for expansion." },
  { name: "Iron", alpha: 12e-6, color: "#f97316", description: "α = 12×10⁻⁶ K⁻¹ (same order as steel)." },
  { name: "Glass (soda-lime)", alpha: 9e-6, color: "#38bdf8", description: "αBus = 9×10⁻⁶ — that's why hot glass cracks under rapid cooling." },
  { name: "Pyrex glass", alpha: 3.2e-6, color: "#67e8f9", description: "α = 3.2×10⁻⁶ — low expansion, safe for hot liquids; used in lab beakers." },
  { name: "Water (liquid, 20°C)", alpha: 207e-6, density: 1000, color: "#0ea5e9", description: "γ ≈ 207×10⁻⁶ K⁻¹ — liquid expansion is ~10× solids; used in liquid-in-glass thermometers." },
  { name: "Mercury", alpha: 181e-6, density: 13600, color: "#e2e8f0", description: "γ ≈ 181×10⁻⁶ K⁻¹ — predictable, opaque, classic thermometer liquid." },
  { name: "Ethanol", alpha: 750e-6, density: 789, color: "#fb923c", description: "γ ≈ 750×10⁻⁶ — expands ~4× mercury; used in low-temperature thermometers." },
] as const;

type ExpansionMaterial = (typeof EXPANSION_MATERIALS)[number];

function ThermalExpansionLab() {
  const [materialIndex, setMaterialIndex] = useState(0);
  const [originalLength, setOriginalLength] = useState(1); // metre
  const [deltaT, setDeltaT] = useState(50); // °C
  const [showSteps, setShowSteps] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mat = EXPANSION_MATERIALS[materialIndex];
  const isLiquid = "density" in mat;
  const alpha = mat.alpha;
  const deltaL = originalLength * alpha * deltaT;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    const baseBarX = W * 0.12;
    const barY = H * 0.42;
    const baseBarLen = W * 0.4;
    const expandedBarLen = baseBarLen * (1 + alpha * deltaT * 100);

    // "Before" bar
    ctx.fillStyle = mat.color;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(baseBarX, barY, baseBarLen, 34);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#f1f5f9";
    ctx.strokeRect(baseBarX, barY, baseBarLen, 34);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText("Before (L₀)", baseBarX, barY - 8);

    // "After" bar (expanded)
    const afterX = W * 0.12;
    const afterY = barY + 64;
    ctx.fillStyle = mat.color;
    ctx.fillRect(afterX, afterY, Math.min(expandedBarLen, W - 40), 34);
    ctx.strokeStyle = "#f8fafc";
    ctx.strokeRect(afterX, afterY, Math.min(expandedBarLen, W - 40), 34);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText("After heating (L = L₀ + ΔL)", afterX, afterY - 8);

    // ΔL label
    ctx.fillStyle = "#fbbf24";
    ctx.font = "600 13px Inter, sans-serif";
    ctx.fillText(`ΔL = ${(deltaL * 1000).toFixed(2)} mm`, afterX + Math.min(expandedBarLen, W - 40) + 10, afterY + 24);

    // Formula
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 13px Inter, sans-serif";
    ctx.fillText(
      `ΔL = L₀·α·ΔT = ${originalLength} × ${mat.alpha.toExponential(1)} × ${deltaT} = ${(deltaL * 1000).toFixed(2)} mm`,
      40,
      H - 28
    );

    // Heat arrows into bar
    for (let i = 0; i < 5; i++) {
      const ax = baseBarX + (i / 4) * baseBarLen;
      const ay = barY - 28 - (i % 2) * 10;
      ctx.strokeStyle = "#fb923c";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ax, ay + 8);
      ctx.lineTo(ax, barY - 4);
      ctx.stroke();
      ctx.fillStyle = "#fb923c";
      ctx.beginPath();
      ctx.moveTo(ax - 4, ay + 6);
      ctx.lineTo(ax, ay);
      ctx.lineTo(ax + 4, ay + 6);
      ctx.fill();
    }
  }, [materialIndex, originalLength, deltaT, mat, deltaL]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thermal Expansion — ΔL = L₀·α·ΔT</CardTitle>
        <p className="text-xs text-muted-foreground">Watch a rod (or liquid column) grow when heated — linear & cubical expansion</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={640} height={340} className="w-full rounded-lg border border-border" aria-label="Thermal expansion of a material rod" />

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Material</Label>
            <Select value={String(materialIndex)} onValueChange={(v) => setMaterialIndex(Number(v))}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {EXPANSION_MATERIALS.map((m, i) => (
                  <SelectItem key={m.name} value={String(i)}>{m.name} (α = {m.alpha.toExponential(1)} K⁻¹)</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="rounded-md bg-muted/40 p-2 text-[11px] leading-relaxed text-muted-foreground">{mat.description}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Original length L₀ (m)</Label>
            <Input type="number" min={0.1} step={0.1} value={originalLength} onChange={(e) => setOriginalLength(Number(e.target.value))} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Temperature rise ΔT (°C)</Label>
            <Input type="number" min={1} max={300} value={deltaT} onChange={(e) => setDeltaT(Number(e.target.value))} />
          </div>
        </div>
        <input type="range" min={1} max={300} value={deltaT} onChange={(e) => setDeltaT(Number(e.target.value))} className="w-full" aria-label="Temperature rise slider" />
        <Button type="button" variant="outline" size="sm" onClick={() => setShowSteps(!showSteps)}>
          {showSteps ? "Hide" : "Show"} step-by-step
        </Button>

        {showSteps && (
          <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
            <li>Choose material {mat.name} with α = {mat.alpha.toExponential(1)} K⁻¹.</li>
            <li>Original length L₀ = {originalLength} m; temperature rises ΔT = {deltaT} °C (= K).</li>
            <li>Linear expansion: ΔL = L₀·α·ΔT = {originalLength} × {mat.alpha.toExponential(1)} × {deltaT} = {(deltaL * 1000).toFixed(2)} mm.</li>
            <li>New length L = {originalLength + deltaL} m (grew by {(deltaL * 1000).toFixed(2)} mm).</li>
            {isLiquid && <li>Liquid: volume expansion ΔV = V₀·γ·ΔT where γ ≈ {mat.alpha.toExponential(1)} (shown as apparent column rise).</li>}
          </ol>
        )}

        <ExpansionTheory />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Experiment 4 — Newton's Law of Cooling
   ============================================================ */

function CoolingLab() {
  const [initialTemp, setInitialTemp] = useState(90);
  const [roomTemp, setRoomTemp] = useState(25);
  const [k, setK] = useState(0.05); // cooling constant
  const [time, setTime] = useState(60); // seconds elapsed
  const [showGraph, setShowGraph] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tempAt = (t: number) => roomTemp + (initialTemp - roomTemp) * Math.exp(-k * t);
  const currentTemp = tempAt(time);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // Cooling curve
    const gx = 70;
    const gy = 30;
    const gw = W - 120;
    const gh = H - 100;

    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx, gy + gh);
    ctx.lineTo(gx + gw, gy + gh);
    ctx.lineTo(gx + gw, gy);
    ctx.stroke();

    const maxT = initialTemp + 10;
    const minT = roomTemp - 10;

    ctx.fillStyle = "#94a3b8";
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText("Time (s)", gx + gw / 2 - 28, gy + gh + 24);

    // cooling curve (T vs t)
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let t = 0; t <= 200; t += 2) {
      const x = gx + (t / 200) * gw;
      const T = tempAt(t);
      const y = gy + gh - ((T - minT) / (maxT - minT)) * gh;
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // room temp dashed line
    const roomY = gy + gh - ((roomTemp - minT) / (maxT - minT)) * gh;
    ctx.strokeStyle = "#f87171";
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(gx, roomY);
    ctx.lineTo(gx + gw, roomY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#f87171";
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText("Room T = " + roomTemp + "°C", gx + gw - 80, roomY - 6);

    // current position marker
    const cx = gx + (time / 200) * gw;
    const cy = gy + gh - ((currentTemp - minT) / (maxT - minT)) * gh;
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(Math.min(cx, gx + gw), Math.min(cy, gy + gh), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fbbf24";
    ctx.font = "600 13px Inter, sans-serif";
    ctx.fillText("T(" + time + "s) = " + currentTemp.toFixed(1) + "°C", gx + 8, gy + 24);
  }, [initialTemp, roomTemp, k, time, currentTemp, showGraph]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newton's Law of Cooling</CardTitle>
        <p className="text-xs text-muted-foreground">dT/dt = −k(T − T_s) — cooling rate is proportional to the excess temperature above surroundings.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={640} height={360} className="w-full rounded-lg border border-border" aria-label="Newton's law of cooling graph" />

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Initial temp T₀ (°C)</Label>
            <Input type="number" min={40} max={150} value={initialTemp} onChange={(e) => setInitialTemp(Number(e.target.value))} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Room temp T_s (°C)</Label>
            <Input type="number" min={10} max={60} value={roomTemp} onChange={(e) => setRoomTemp(Number(e.target.value))} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Cooling constant k (s⁻¹)</Label>
            <Input type="number" min={0.005} step={0.005} value={k} onChange={(e) => setK(Number(e.target.value))} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Elapsed time t (s)</Label>
            <Input type="number" min={0} max={200} value={time} onChange={(e) => setTime(Number(e.target.value))} />
          </div>
        </div>
        <input type="range" min={0} max={200} value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full" aria-label="Cooling time slider" />
        <Button variant="outline" size="sm" onClick={() => { setInitialTemp(90); setRoomTemp(25); setK(0.05); setTime(0); }}>
          Reset
        </Button>

        <p className="text-xs text-muted-foreground">
          Cooling is fastest at the start (large excess), then slows exponentially as T approaches T_s. After long time, T = {roomTemp}°C.
        </p>

        <CoolingTheory />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D Thermal Expansion Visualizer
   ============================================================ */

function ThermalExpansion3D() {
  const [materialIndex, setMaterialIndex] = useState(0);
  const [deltaT, setDeltaT] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const mat = EXPANSION_MATERIALS[materialIndex];
  const alpha = mat.alpha;
  const originalLength = 1;
  const deltaL = originalLength * alpha * deltaT;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let barMesh: THREE.Mesh;
    let heatParticles: THREE.Points;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 3, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Bar (expanding)
      const barGeo = new THREE.BoxGeometry(4, 0.6, 0.6);
      const barMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(mat.color),
        roughness: 0.3,
        metalness: 0.4,
        emissive: new THREE.Color(mat.color),
        emissiveIntensity: 0.15,
      });
      barMesh = new THREE.Mesh(barGeo, barMat);
      barMesh.position.set(0, 0.5, 0);
      scene.add(barMesh);

      // Heat particles (rising)
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] = Math.random() * 3;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xfb923c,
        size: 0.08,
        transparent: true,
        opacity: 0.7,
      });
      heatParticles = new THREE.Points(particleGeo, particleMat);
      heatParticles.position.set(0, 0.8, 0);
      scene.add(heatParticles);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;

        // Expand bar based on deltaT
        const scale = 1 + (deltaL * 100);
        barMesh.scale.x = Math.min(scale, 2.5);

        // Animate heat particles rising
        const pos = heatParticles.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
          let y = pos.getY(i) + 0.01;
          if (y > 3) y = 0;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [materialIndex, deltaT, mat, deltaL]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Thermal Expansion</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Material</Label>
            <Select value={String(materialIndex)} onValueChange={(v) => setMaterialIndex(Number(v))}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {EXPANSION_MATERIALS.map((m, i) => (
                  <SelectItem key={m.name} value={String(i)}>{m.name} (α = {m.alpha.toExponential(1)} K⁻¹)</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Temperature rise ΔT (°C)</Label>
            <Input type="number" min={1} max={300} value={deltaT} onChange={(e) => setDeltaT(Number(e.target.value))} />
          </div>
        </div>
        <input type="range" min={1} max={300} value={deltaT} onChange={(e) => setDeltaT(Number(e.target.value))} className="w-full" aria-label="Temperature rise slider" />
        <p className="text-xs text-muted-foreground">
          {mat.name}: ΔL = L₀·α·ΔT = 1 × {mat.alpha.toExponential(1)} × {deltaT} = {(deltaL * 1000).toFixed(2)} mm. The bar expands as heat particles rise.
        </p>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation & Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            A 3D bar expands as temperature rises. Orange particles represent heat energy flowing into the material. The expansion is proportional to the original length and temperature change.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            ΔL = L₀·α·ΔT. Materials with larger α (aluminium ≈ 23×10⁻⁶ K⁻¹) expand more than Pyrex glass (≈ 3.2×10⁻⁶ K⁻¹). This is why bridges have expansion gaps.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Thermal expansion explains bimetallic strips in thermostats, railway track gaps, mercury thermometers, and why hot glass cracks under rapid cooling.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D Phase Change Visualizer
   ============================================================ */

function PhaseChange3D() {
  const [phase, setPhase] = useState<"solid" | "liquid" | "gas">("solid");
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let particles: THREE.Points;
    let particlePositions: Float32Array;
    let particleVelocities: Float32Array;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 3, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Container (glass box)
      const boxGeo = new THREE.BoxGeometry(3, 3, 3);
      const boxMat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.15,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.5,
        side: THREE.DoubleSide,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.position.set(0, 1.5, 0);
      scene.add(box);

      // Particles (molecules)
      const count = 300;
      particlePositions = new Float32Array(count * 3);
      particleVelocities = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 2;
        particlePositions[i * 3 + 1] = Math.random() * 2;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
        particleVelocities[i * 3] = (Math.random() - 0.5) * 0.01;
        particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
        particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x22d3ee,
        size: 0.12,
        transparent: true,
        opacity: 0.9,
      });
      particles = new THREE.Points(particleGeo, particleMat);
      particles.position.set(0, 1.5, 0);
      scene.add(particles);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;

        const pos = particles.geometry.attributes.position as THREE.BufferAttribute;
        const speed = phase === "solid" ? 0.002 : phase === "liquid" ? 0.02 : 0.08;

        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);

          // Update velocity
          particleVelocities[i * 3] += (Math.random() - 0.5) * 0.001;
          particleVelocities[i * 3 + 1] += (Math.random() - 0.5) * 0.001;
          particleVelocities[i * 3 + 2] += (Math.random() - 0.5) * 0.001;

          // Apply velocity
          x += particleVelocities[i * 3] * speed * 10;
          y += particleVelocities[i * 3 + 1] * speed * 10;
          z += particleVelocities[i * 3 + 2] * speed * 10;

          // Solid: keep particles in a lattice-like arrangement
          if (phase === "solid") {
            x = Math.max(-1.2, Math.min(1.2, x));
            y = Math.max(0.3, Math.min(2.7, y));
            z = Math.max(-1.2, Math.min(1.2, z));
          } else {
            // Bounce off container walls
            if (x > 1.4) { x = 1.4; particleVelocities[i * 3] *= -0.8; }
            if (x < -1.4) { x = -1.4; particleVelocities[i * 3] *= -0.8; }
            if (y > 2.8) { y = 2.8; particleVelocities[i * 3 + 1] *= -0.8; }
            if (y < 0.2) { y = 0.2; particleVelocities[i * 3 + 1] *= -0.8; }
            if (z > 1.4) { z = 1.4; particleVelocities[i * 3 + 2] *= -0.8; }
            if (z < -1.4) { z = -1.4; particleVelocities[i * 3 + 2] *= -0.8; }
          }

          pos.setXYZ(i, x, y, z);
        }
        pos.needsUpdate = true;

        // Change particle color based on phase
        const mat = particles.material as THREE.PointsMaterial;
        if (phase === "solid") {
          mat.color.setHex(0x22d3ee);
          mat.size = 0.12;
        } else if (phase === "liquid") {
          mat.color.setHex(0x0ea5e9);
          mat.size = 0.1;
        } else {
          mat.color.setHex(0xfb923c);
          mat.size = 0.08;
        }

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [phase]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Phase Change</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />}
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Phase</Label>
            <select value={phase} onChange={(e) => setPhase(e.target.value as "solid" | "liquid" | "gas")} className="w-32 rounded-md border bg-background px-2 py-1 text-sm">
              <option value="solid">Solid (Ice)</option>
              <option value="liquid">Liquid (Water)</option>
              <option value="gas">Gas (Steam)</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {phase === "solid" && "Solid: molecules vibrate in fixed positions — strong intermolecular bonds hold them in a lattice. Temperature rises with Q = mcΔT."}
          {phase === "liquid" && "Liquid: molecules slide past each other — bonds are broken but molecules stay close. Latent heat of fusion (334 kJ/kg) was absorbed to melt."}
          {phase === "gas" && "Gas: molecules move freely and rapidly — bonds are fully broken. Latent heat of vaporisation (2260 kJ/kg) was absorbed to boil."}
        </p>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation & Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Blue particles represent water molecules. In solid, they vibrate in place; in liquid, they slide past each other; in gas, they move freely and rapidly.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            During a phase change, temperature stays constant while energy breaks intermolecular bonds: Q = mL. Fusion needs 334 kJ/kg; vaporisation needs 2260 kJ/kg — 6.8× more.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Phase changes explain why steam burns are worse than boiling water burns, how sweating cools you, and why boiling takes much longer than melting.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Main Heat Lab export
   ============================================================ */

export function PhysicsHeatLab() {
  return (
    <Tabs defaultValue="solid" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="solid">Specific Heat (Solid)</TabsTrigger>
        <TabsTrigger value="liquid">Specific Heat (Liquid)</TabsTrigger>
        <TabsTrigger value="latent">Latent Heat</TabsTrigger>
        <TabsTrigger value="cooling">Newton's Cooling</TabsTrigger>
        <TabsTrigger value="expansion">Thermal Expansion</TabsTrigger>
        <TabsTrigger value="expansion3d">3D Expansion</TabsTrigger>
        <TabsTrigger value="phase3d">3D Phase Change</TabsTrigger>
      </TabsList>

      <TabsContent value="solid" className="mt-4">
        <SolidHeatExperiment />
      </TabsContent>

      <TabsContent value="liquid" className="mt-4">
        <LiquidHeatExperiment />
      </TabsContent>

      <TabsContent value="latent" className="mt-4">
        <LatentHeatLab />
      </TabsContent>

      <TabsContent value="cooling" className="mt-4">
        <CoolingLab />
      </TabsContent>

      <TabsContent value="expansion" className="mt-4">
        <ThermalExpansionLab />
      </TabsContent>

      <TabsContent value="expansion3d" className="mt-4">
        <ThermalExpansion3D />
      </TabsContent>

      <TabsContent value="phase3d" className="mt-4">
        <PhaseChange3D />
      </TabsContent>
    </Tabs>
  );
}

