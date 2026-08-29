"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ControlPanel } from "@/components/lab/control-group";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { Zap, Waves, Timer, CircuitBoard, Scale, ScanEye } from "lucide-react";

function Field({ id, label, hint, ...props }: { id: string; label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="rounded-md border border-border bg-background p-2">
      <Label htmlFor={id} className="text-xs font-semibold text-foreground">{label}</Label>
      {hint && <p className="mb-1 text-[10px] text-muted-foreground">{hint}</p>}
      <Input id={id} {...props} className="mt-1" />
    </div>
  );
}

/* ============ OHM'S LAW ============ */
function OhmsLaw() {
  const [mode, setMode] = useState<"voltage" | "current" | "resistance">("voltage");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null); setResult(null);
    try {
      const v = voltage ? parseFloat(voltage) : null;
      const i = current ? parseFloat(current) : null;
      const r = resistance ? parseFloat(resistance) : null;
      if (mode === "voltage") {
        if (i === null || r === null) throw new Error("Enter both Current (A) and Resistance (Ω)");
        setResult(`Voltage = ${(i * r).toFixed(4)} V`);
      } else if (mode === "current") {
        if (v === null || r === null) throw new Error("Enter both Voltage (V) and Resistance (Ω)");
        if (r === 0) throw new Error("Resistance cannot be zero");
        setResult(`Current = ${(v / r).toFixed(4)} A`);
      } else {
        if (v === null || i === null) throw new Error("Enter both Voltage (V) and Current (A)");
        if (i === 0) throw new Error("Current cannot be zero");
        setResult(`Resistance = ${(v / i).toFixed(4)} Ω`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-500" /> Ohm&apos;s Law Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "solve",
              label: "Step 1 — Choose what to solve for",
              hint: "V, I, or R — the other two values will be needed as inputs.",
              content: (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Label className="text-xs">Solve for:</Label>
                    <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                      <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="voltage">Voltage (V)</SelectItem>
                        <SelectItem value="current">Current (I)</SelectItem>
                        <SelectItem value="resistance">Resistance (R)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">V = I × R. Leave the one you are solving for blank.</p>
                </div>
              ),
            },
            {
              id: "inputs",
              label: "Step 2 — Enter the known values",
              hint: "Fill the two boxes that match your chosen unknown.",
              content: (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field id="voltage" label="Voltage (V)" placeholder="e.g. 12" value={voltage} type="number" onChange={(e) => setVoltage(e.target.value)} />
                  <Field id="current" label="Current (A)" placeholder="e.g. 2" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} />
                  <Field id="resistance" label="Resistance (Ω)" placeholder="e.g. 6" type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} />
                </div>
              ),
            },
            {
              id: "run",
              label: "Step 3 — Calculate",
              content: <Button onClick={calculate} className="w-full">Calculate</Button>,
            },
          ]}
        />
        {error && <p className="rounded-md border border-red-400/40 bg-red-500/10 p-2 text-sm text-red-500">{error}</p>}
        {result && <p className="rounded-md border border-green-400/40 bg-green-500/10 p-2 text-sm font-medium text-green-600">{result}</p>}
        <TheoryPanel
          title="Ohm's Law — Theory & What to Notice"
          vocabulary="Voltage (V) is electrical 'pressure', Current (I) is electron flow rate, Resistance (Ω) is how much the wire opposes flow."
          look="Picture a pipe: voltage is the water pressure, current is how fast water flows, resistance is a narrow section of the pipe. Try 12 V with 6 Ω — current should be 2 A."
          predict="Before calculating: if you double the resistance holding voltage fixed, what should happen to the current? If you double voltage holding resistance fixed, what should the current become? Check your intuition against the answer."
          principle="V = I × R is linear. Doubling R halves I (keeping V fixed); doubling V doubles I (keeping R fixed). The graph of I vs V is a straight line through the origin — its slope is 1/R."
          why="This is the basis of every circuit design — choosing a resistor to limit current into an LED, sizing fuses so they don't melt, and detecting why a device draws too much power."
        />
      </CardContent>
    </Card>
  );
}

/* ============ WAVE SIMULATOR ============ */
function WaveSimulator() {
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [wavelength, setWavelength] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);
    const width = rect.width;
    const height = rect.height;
    const midY = height / 2;

    ctx.strokeStyle = "#e5e7eb"; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      const y = (i / 10) * height;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    ctx.strokeStyle = "#94a3b8"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(width, midY); ctx.stroke();

    const lambda = wavelength > 0 ? wavelength : 1;
    const k = (2 * Math.PI) / lambda;

    ctx.strokeStyle = "#3b82f6"; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px <= width; px++) {
      const x = (px / width) * lambda * 4;
      const y = midY - amplitude * 80 * Math.sin(k * x);
      if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
    }
    ctx.stroke();

    ctx.fillStyle = "#1e293b"; ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(`f = ${frequency} Hz | A = ${amplitude} | λ = ${wavelength} m`, 10, 20);
    ctx.fillText(`v = f·λ = ${(frequency * lambda).toFixed(2)} m/s`, 10, 36);
  }, [frequency, amplitude, wavelength]);

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Waves className="h-5 w-5 text-sky-500" /> Wave Simulator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} className="h-[220px] w-full rounded-md border border-border bg-background" aria-label="Wave simulator" />
        <ControlPanel
          groups={[
            {
              id: "wave-amplitude",
              label: "Amplitude (height)",
              hint: "How tall the wave crests rise above the center line.",
              content: <Field id="amplitude" label="Amplitude" hint="Try 0.5 → gentle, 3 → tall peaks" type="number" step="0.1" min="0.1" value={amplitude} onChange={(e) => setAmplitude(Math.max(0.1, Number(e.target.value)))} />,
            },
            {
              id: "wave-frequency",
              label: "Frequency (f)",
              hint: "How many cycles fit per second.",
              content: <Field id="frequency" label="Frequency (Hz)" hint="Higher f → more squished cycles" type="number" step="0.1" min="0.1" value={frequency} onChange={(e) => setFrequency(Math.max(0.1, Number(e.target.value)))} />,
            },
            {
              id: "wave-wavelength",
              label: "Wavelength (λ)",
              hint: "Distance between two crests.",
              content: <Field id="wavelength" label="Wavelength (m)" type="number" step="0.1" min="0.1" value={wavelength} onChange={(e) => setWavelength(Math.max(0.1, Number(e.target.value)))} />,
            },
          ]}
        />
        <TheoryPanel
          title="Waves — Theory & What to Notice"
          vocabulary="Crest = highest point, trough = lowest point, wavelength λ = crest-to-crest distance, frequency f = crests per second."
          look="Watch the blue line: amplify to 3 and the crests tower; change λ to a large number and the same wave stretches wide. Frequency packs more cycles into the same space."
          predict="Before you change: if you double frequency, wave speed v = f·λ should double. If you double wavelength, the wave should look twice as spread out. Try it — does your prediction match?"
          principle="v = f·λ. In a fixed medium (e.g. sound ~343 m/s), increasing frequency forces wavelength to shrink. Amplitude only carries energy, never speed."
          why="Radio, Wi-Fi, ultrasound and antennas all depend on choosing the right frequency band and understanding its wavelength to size the antenna."
        />
      </CardContent>
    </Card>
  );
}

/* ============ PENDULUM SIMULATOR ============ */
function PendulumSimulator() {
  const [length, setLength] = useState(1);
  const [gravity, setGravity] = useState(9.8);
  const [initialAngle, setInitialAngle] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const width = rect.width;
    const height = rect.height;
    const pivotX = width / 2;
    const pivotY = 80;
    const scale = 120;
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "#e5e7eb"; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }

    ctx.fillStyle = "#fef3c7";
    ctx.beginPath(); ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#a16207"; ctx.lineWidth = 1.5; ctx.stroke();

    const angleRad = (initialAngle * Math.PI) / 180;
    const bobX = pivotX + length * scale * Math.sin(angleRad);
    const bobY = pivotY + length * scale * Math.cos(angleRad);

    ctx.strokeStyle = "#374151"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bobX, bobY); ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath(); ctx.arc(bobX, bobY, 12, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#991b1b"; ctx.lineWidth = 2; ctx.stroke();

    ctx.fillStyle = "#64748b"; ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(`L = ${length} m | g = ${gravity} m/s² | θ = ${initialAngle}°`, 10, 20);
    ctx.fillText(`Period T = ${(2 * Math.PI * Math.sqrt(length / gravity)).toFixed(2)} s`, 10, 36);
  }, [length, gravity, initialAngle, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const pivotX = width / 2;
    const pivotY = 80;
    const scale = 120;
    let time = 0;
    const omega = Math.sqrt(gravity / length);

    const animate = () => {
      time += 0.02;
      const angle = initialAngle * Math.cos(omega * time) * (Math.PI / 180);
      ctx.clearRect(0, 0, width * dpr, height * dpr);
      ctx.fillStyle = "#fef3c7";
      ctx.beginPath(); ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#a45307"; ctx.lineWidth = 1.5; ctx.stroke();
      const bobX = pivotX + length * scale * Math.sin(angle);
      const bobY = pivotY + length * scale * Math.cos(angle);
      ctx.strokeStyle = "#374151"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bobX, bobY); ctx.stroke();
      ctx.fillStyle = "#ef4444";
      ctx.beginPath(); ctx.arc(bobX, bobY, 12, 0, Math.PI * 2); ctx.fill();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isRunning, length, gravity, initialAngle]);

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Timer className="h-5 w-5 text-emerald-500" /> Simple Pendulum Simulator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} className="lab-canvas-container rounded-md border border-border bg-background" aria-label="Pendulum simulator" />
        <ControlPanel
          groups={[
            {
              id: "pend-length",
              label: "Length (L)",
              hint: "Length of the string from pivot to bob.",
              content: <Field id="length" label="Length (m)" type="number" step="0.1" min="0.1" value={length} onChange={(e) => setLength(Math.max(0.1, Number(e.target.value)))} />,
            },
            {
              id: "pend-gravity",
              label: "Gravity (g)",
              hint: "Try Earth 9.8, Moon 1.6, Jupiter 24.8 m/s².",
              content: <Field id="gravity" label="Gravity (m/s²)" type="number" step="0.1" min="0.1" value={gravity} onChange={(e) => setGravity(Math.max(0.1, Number(e.target.value)))} />,
            },
            {
              id: "pend-angle",
              label: "Initial Angle (θ)",
              hint: "How far you pull the bob sideways before release.",
              content: <Field id="angle" label="Initial Angle (°)" type="number" step="1" min="-90" max="90" value={initialAngle} onChange={(e) => setInitialAngle(Number(e.target.value))} />,
            },
            {
              id: "pend-run",
              label: "Run / Stop",
              content: <Button onClick={() => setIsRunning(!isRunning)} className="w-full">{isRunning ? "Stop" : "▶ Start Simulation"}</Button>,
            },
          ]}
        />
        <TheoryPanel
          title="Pendulum — Theory & What to Notice"
          vocabulary="Period T = one full back-and-forth swing. Bob = the mass at the end. Amplitude = how wide the initial swing is."
          look="Watch the bob: how long does one full oscillation take? The formula T = 2π√(L/g) is on the canvas — compare it with a mental stop-watch."
          predict="What if you double L (g fixed)? T grows by √2 ≈ 1.41×, so L=4 swings ~2× as slow. What if you move to the Moon (g=1.6)?"
          principle="For small angles (≤ ~20°) the period depends ONLY on L and g — not on mass or amplitude. That isochronism is what makes pendulum clocks reliable."
          why="Foucault pendulums reveal Earth's rotation; seismometers use pendulums to detect earthquakes; space agencies measure g on other planets with pendulum experiments."
        />
      </CardContent>
    </Card>
  );
}

/* ============ CIRCUIT SIMULATOR ============ */
function CircuitSimulator() {
  const [config, setConfig] = useState<"series" | "parallel">("series");
  const [resistors, setResistors] = useState("10, 20, 30");
  const [voltage, setVoltage] = useState("12");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const values = resistors.split(",").map(Number).filter((n) => !isNaN(n) && n > 0);
    if (values.length < 2) { setResult("Enter at least 2 resistors (comma-separated)"); return; }
    const v = parseFloat(voltage);
    if (isNaN(v) || v <= 0) { setResult("Enter a valid voltage"); return; }
    if (config === "series") {
      const rTotal = values.reduce((a, b) => a + b, 0);
      const current = v / rTotal;
      const drops = values.map((r) => ({ r, vDrop: (current * r).toFixed(2) }));
      setResult(`R_total = ${rTotal.toFixed(2)} Ω | I = ${current.toFixed(4)} A\n\nVoltage drops:\n${drops.map((d) => `R=${d.r}Ω → V_drop=${d.vDrop}V`).join("\n")}`);
    } else {
      const rTotal = 1 / values.reduce((a, b) => a + 1 / b, 0);
      const totalCurrent = v / rTotal;
      const currents = values.map((r) => ({ r, current: (v / r).toFixed(4) }));
      setResult(`R_total = ${rTotal.toFixed(2)} Ω | I_total = ${totalCurrent.toFixed(4)} A\n\nBranch currents:\n${currents.map((c) => `R=${c.r}Ω → I=${c.current}A`).join("\n")}`);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><CircuitBoard className="h-5 w-5 text-amber-500" /> Circuit Simulator (Resistors)</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "circuit-config",
              label: "Step 1 — Series or Parallel?",
              hint: "Choose how the resistors are connected.",
              content: (
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-background p-2">
                  <Label className="text-xs">Configuration:</Label>
                  <Select value={config} onValueChange={(v) => setConfig(v as "series" | "parallel")}>
                    <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="series">Series</SelectItem>
                      <SelectItem value="parallel">Parallel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ),
            },
            {
              id: "circuit-inputs",
              label: "Step 2 — Enter voltage & resistors",
              hint: "Comma-separated resistance values, e.g. 10, 20, 30.",
              content: (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field id="voltage" label="Supply Voltage (V)" type="number" step="0.1" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
                  <Field id="resistors" label="Resistors (Ω, comma-separated)" placeholder="e.g. 10, 20, 30" value={resistors} onChange={(e) => setResistors(e.target.value)} />
                </div>
              ),
            },
            {
              id: "circuit-run",
              label: "Step 3 — Calculate",
              content: <Button onClick={calculate} className="w-full">Calculate Circuit</Button>,
            },
          ]}
        />
        {result && <pre className="rounded-md border border-border bg-muted/30 p-3 text-sm font-medium whitespace-pre-wrap text-green-600">{result}</pre>}
        <TheoryPanel
          title="Circuits — Theory & What to Notice"
          vocabulary="Series = a single loop; Parallel = multiple branches between the same two points. Voltage drop = the energy each resistor consumes."
          look="In series, all resistances add up and every resistor's voltage adds to the supply. In parallel, the total is SMALLER than the smallest resistor — a surprising result worth checking."
          predict="Before clicking Calculate: if you add a 5 Ω in parallel to a 10 Ω, should total resistance go up or down? If you add a 5 Ω in series, should total current go up or down?"
          principle="Kirchhoff's laws: series → same current everywhere, voltages add; parallel → same voltage across every branch, currents add. R_series = Σr; R_parallel = 1/(Σ1/r)."
          why="Home wiring is parallel so every appliance gets the full 230 V and one blown bulb does not kill the others — while cheap string lights are often deliberately series."
        />
      </CardContent>
    </Card>
  );
}

/* ============ ENERGY CALCULATOR ============ */
function EnergyCalculator() {
  const [mode, setMode] = useState<"kinetic" | "potential" | "conservation">("kinetic");
  const [mass, setMass] = useState("");
  const [velocity, setVelocity] = useState("");
  const [height, setHeight] = useState("");
  const [g, setG] = useState("9.8");
  const [initialH, setInitialH] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    setResult(null);
    const m = parseFloat(mass);
    const v = parseFloat(velocity);
    const h = parseFloat(height);
    const gravity = parseFloat(g);
    const ih = parseFloat(initialH);
    if (mode === "kinetic") {
      if (isNaN(m) || isNaN(v)) { setResult("Enter mass and velocity"); return; }
      setResult(`Kinetic Energy = ${(0.5 * m * v * v).toFixed(4)} J`);
    } else if (mode === "potential") {
      if (isNaN(m) || isNaN(h)) { setResult("Enter mass and height"); return; }
      setResult(`Potential Energy = ${(m * gravity * h).toFixed(4)} J`);
    } else {
      if (isNaN(m) || isNaN(ih) || isNaN(h)) { setResult("Enter mass, initial height, and current height"); return; }
      const peInitial = m * gravity * ih;
      const peCurrent = m * gravity * h;
      setResult(`Initial PE = ${peInitial.toFixed(2)} J\nCurrent PE = ${peCurrent.toFixed(2)} J\nKinetic Energy = ${(peInitial - peCurrent).toFixed(2)} J\nTotal Energy = ${peInitial.toFixed(2)} J (conserved)`);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5 text-violet-500" /> Energy Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "energy-mode",
              label: "Step 1 — Which energy form?",
              hint: "Kinetic (moving), Gravitational PE (height), or a conservation drop.",
              content: (
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-background p-2">
                  <Label className="text-xs">Mode:</Label>
                  <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                    <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kinetic">Kinetic Energy</SelectItem>
                      <SelectItem value="potential">Gravitational PE</SelectItem>
                      <SelectItem value="conservation">Conservation (Drop)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ),
            },
            {
              id: "energy-inputs",
              label: "Step 2 — Enter values",
              hint: "Only the fields needed for your chosen mode appear.",
              content: (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field id="mass" label="Mass (kg)" type="number" step="0.1" value={mass} onChange={(e) => setMass(e.target.value)} />
                  {mode === "kinetic" && <Field id="velocity" label="Velocity (m/s)" type="number" step="0.1" value={velocity} onChange={(e) => setVelocity(e.target.value)} />}
                  {(mode === "potential" || mode === "conservation") && <Field id="height" label="Height (m)" type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} />}
                  {mode === "conservation" && <Field id="initialH" label="Initial Height (m)" type="number" step="0.1" value={initialH} onChange={(e) => setInitialH(e.target.value)} />}
                  {(mode === "potential" || mode === "conservation") && <Field id="g" label="Gravity (m/s²)" type="number" step="0.1" value={g} onChange={(e) => setG(e.target.value)} />}
                </div>
              ),
            },
            {
              id: "energy-run",
              label: "Step 3 — Calculate",
              content: <Button onClick={calculate} className="w-full">Calculate Energy</Button>,
            },
          ]}
        />
        {result && <pre className="rounded-md border border-border bg-muted/30 p-3 text-sm font-medium whitespace-pre-wrap text-green-600">{result}</pre>}
        <TheoryPanel
          title="Energy — Theory & What to Notice"
          vocabulary="Kinetic energy KE = ½mv² (energy of motion). Potential energy PE = mgh (stored energy of height). Work = change in energy."
          look="Notice KE grows with velocity SQUARED — an object at 20 m/s has 4× the KE of one at 10 m/s. In conservation mode, watch PE convert to KE while the total stays fixed."
          predict="Drop a ball from double the height — final speed grows by √2 ≈ 1.41×, since v = √(2gh). Use the calculator and see if your KE prediction matches."
          principle="Conservation of mechanical energy: at any point in a fall (ignoring air resistance), KE + PE = constant. Energy is neither created nor destroyed — it only changes form."
          why="Roller coasters convert PE at the top into KE as they fall; dams do the same. At 80 km/h the crash energy is 4× that at 40 km/h — that's why speed limits matter."
        />
      </CardContent>
    </Card>
  );
}

/* ============ THIN LENS / MIRROR ============ */
function LensCalculator() {
  const [mode, setMode] = useState<"lens" | "mirror">("lens");
  const [focalLength, setFocalLength] = useState("");
  const [objectDistance, setObjectDistance] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const f = parseFloat(focalLength);
    const u = parseFloat(objectDistance);
    if (isNaN(f) || isNaN(u) || f === 0 || u === 0) { setResult("Enter valid focal length and object distance"); return; }
    const v = (f * u) / (u - f);
    const m = -v / u;
    const type = mode === "lens" ? (f > 0 ? "Convex (Converging)" : "Concave (Diverging)") : (f > 0 ? "Concave" : "Convex");
    setResult(`Image Distance (v) = ${v.toFixed(2)} cm\nMagnification (m) = ${m.toFixed(2)}\nType: ${type}\n${m > 0 ? "Virtual" : "Real"} & ${Math.abs(m) > 1 ? "Magnified" : Math.abs(m) < 1 ? "Diminished" : "Same size"}`);
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><ScanEye className="h-5 w-5 text-cyan-500" /> Thin Lens / Mirror Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "lens-type",
              label: "Step 1 — Lens or Mirror?",
              hint: "Convex lens / concave mirror converge light; concave lens / convex mirror spread it.",
              content: (
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-background p-2">
                  <Label className="text-xs">Type:</Label>
                  <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                    <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lens">Thin Lens</SelectItem>
                      <SelectItem value="mirror">Spherical Mirror</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ),
            },
            {
              id: "lens-inputs",
              label: "Step 2 — Focal length & object distance",
              hint: "Object distance u is always negative by sign convention.",
              content: (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field id="f" label="Focal Length f (cm, + for converging)" hint="Positive converges, negative diverges" type="number" step="0.1" value={focalLength} onChange={(e) => setFocalLength(e.target.value)} />
                  <Field id="u" label="Object Distance u (cm, always −)" hint="Negative per sign convention" type="number" step="0.1" value={objectDistance} onChange={(e) => setObjectDistance(e.target.value)} />
                </div>
              ),
            },
            {
              id: "lens-run",
              label: "Step 3 — Calculate",
              content: <Button onClick={calculate} className="w-full">Calculate Image</Button>,
            },
          ]}
        />
        {result && <pre className="rounded-md border border-border bg-muted/30 p-3 text-sm font-medium whitespace-pre-wrap text-green-600">{result}</pre>}
        <TheoryPanel
          title="Lenses & Mirrors — Theory & What to Notice"
          vocabulary="Focal length f: distance from the element to where parallel rays meet. Real image = can be projected on a screen (v positive); virtual = seen by eye only, no screen."
          look="When output shows v positive and m negative, picture the image upside-down and on the far side — like a projector. When m is positive, think of a magnifying glass: upright, on the same side."
          predict="Bring the object closer to a convex lens (u less negative): magnification should increase. Try f=10, u=−30 vs u=−15 — does the flag flips from diminished toward magnified?"
          principle="The thin-lens equation 1/f = 1/v − 1/u unifies lens and mirror with one sign convention. At u = f the denominator goes to zero — the image forms at infinity, no screen can catch it."
          why="Eyeglasses give your eye the exact +/− f so images land on the retina; camera autofocus moves the lens to adjust f; telescopes swap f to trade magnification for field of view."
        />
      </CardContent>
    </Card>
  );
}

export interface PhysicsInteractiveProps {
  defaultTab?: string;
}

export function PhysicsInteractive({ defaultTab = "ohms" }: PhysicsInteractiveProps = {}) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="ohms">Ohm&apos;s Law</TabsTrigger>
        <TabsTrigger value="wave">Wave Simulator</TabsTrigger>
        <TabsTrigger value="pendulum">Pendulum</TabsTrigger>
        <TabsTrigger value="circuit">Circuit</TabsTrigger>
        <TabsTrigger value="energy">Energy</TabsTrigger>
        <TabsTrigger value="lens">Lens / Mirror</TabsTrigger>
      </TabsList>
      <TabsContent value="ohms" className="mt-4"><OhmsLaw /></TabsContent>
      <TabsContent value="wave" className="mt-4"><WaveSimulator /></TabsContent>
      <TabsContent value="pendulum" className="mt-4"><PendulumSimulator /></TabsContent>
      <TabsContent value="circuit" className="mt-4"><CircuitSimulator /></TabsContent>
      <TabsContent value="energy" className="mt-4"><EnergyCalculator /></TabsContent>
      <TabsContent value="lens" className="mt-4"><LensCalculator /></TabsContent>
    </Tabs>
  );
}

