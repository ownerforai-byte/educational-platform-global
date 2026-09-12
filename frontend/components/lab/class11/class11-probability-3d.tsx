"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { isWebGLAvailable } from "@/lib/webgl";

// Probability 3D Visualization for Class 11 Mathematics
// Concept: Normal Distribution, Binomial Distribution, Probability Density Functions

export const Class11Probability3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showNormal, setShowNormal] = useState(true);
  const [showBinomial, setShowBinomial] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);

  const animationRef = useRef<number | undefined>(undefined);

  // Calculate normal distribution points
  const getNormalDistribution = (mu: number, sigma: number, count = 100) => {
    const points: THREE.Vector3[] = [];
    const range = 4 * sigma;
    
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * 2 - 1;
      const x = mu + t * range;
      const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
      points.push(new THREE.Vector3(x, y * 3, 0));
    }
    return points;
  };

  // Calculate binomial distribution points
  const getBinomialDistribution = (n: number, p: number) => {
    const points: THREE.Vector3[] = [];
    const factorial = (n: number): number => {
      if (n <= 1) return 1;
      let result = 1;
      for (let i = 2; i <= n; i++) result *= i;
      return result;
    };

    for (let k = 0; k <= n; k++) {
      const coeff = factorial(n) / (factorial(k) * factorial(n - k));
      const prob = coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
      points.push(new THREE.Vector3(k - n/2, prob * 10, 0));
    }
    return points;
  };

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;
    const container = mountRef.current;

    let labelRenderer: any;
    const labelObjects: any[] = [];

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // CSS2D Renderer for labels
    try {
      
      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(container.clientWidth, container.clientHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.top = "0";
      labelRenderer.domElement.style.pointerEvents = "none";
      labelRenderer.domElement.style.zIndex = "10";
      container.appendChild(labelRenderer.domElement);
    } catch {
      console.log("CSS2DRenderer not available");
    }

    const createLabel = (text: string, position: THREE.Vector3, color = "#ffffff") => {
      if (!labelRenderer) return null;
      
      const labelDiv = document.createElement("div");
      labelDiv.className = "label";
      labelDiv.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:6px;color:${color};font-weight:600;font-size:11px;border:1px solid ${color}20">${text}</div>`;
      
      const label = new (labelRenderer as any).CSS2DObject(labelDiv);
      label.position.set(position.x, position.y, position.z);
      scene.add(label);
      labelObjects.push(label);
      return label;
    };

    // Create axes
    const createAxes = () => {
      const axesGroup = new THREE.Group();
      
      // X axis
      const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(5, 0, 0)
      ]);
      const xAxis = new THREE.Line(xAxisGeometry, new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 }));
      axesGroup.add(xAxis);
      
      // Y axis
      const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 5, 0)
      ]);
      const yAxis = new THREE.Line(yAxisGeometry, new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 }));
      axesGroup.add(yAxis);
      
      // Z axis
      const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -5),
        new THREE.Vector3(0, 0, 5)
      ]);
      const zAxis = new THREE.Line(zAxisGeometry, new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 }));
      axesGroup.add(zAxis);
      
      scene.add(axesGroup);
      
      // Add axis labels
      if (showLabels) {
        createLabel("X: Values", new THREE.Vector3(5, 0, 0), "#ef4444");
        createLabel("Y: Probability", new THREE.Vector3(0, 5, 0), "#22c55e");
        createLabel("Mean (μ)", new THREE.Vector3(mean, 0, 0), "#ffffff");
      }
    };

    createAxes();

    // Create normal distribution surface
    const normalPoints = getNormalDistribution(mean, stdDev, 100);
    
    const normalGeometry = new THREE.BufferGeometry().setFromPoints(normalPoints);
    const normalMaterial = new THREE.LineBasicMaterial({ 
      color: 0x3b82f6,
      linewidth: 3,
      transparent: true,
      opacity: showNormal ? 1 : 0.3
    });
    const normalCurve = new THREE.Line(normalGeometry, normalMaterial);
    normalCurve.position.set(0, 0, 0);
    scene.add(normalCurve);

    // Create binomial distribution
    const binomialPoints = getBinomialDistribution(n, p);
    const binomialGeometry = new THREE.BufferGeometry().setFromPoints(binomialPoints);
    const binomialMaterial = new THREE.LineBasicMaterial({ 
      color: 0xef4444,
      linewidth: 3,
      transparent: true,
      opacity: showBinomial ? 1 : 0.3
    });
    const binomialCurve = new THREE.Line(binomialGeometry, binomialMaterial);
    binomialCurve.position.set(0, 0, -2);
    scene.add(binomialCurve);

    // Create mean marker
    const meanMarker = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 4, 0.2),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24 })
    );
    meanMarker.position.set(mean, 2, 0);
    scene.add(meanMarker);

    // Create standard deviation markers
    const stdDevMarker1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 3, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x22c55e })
    );
    stdDevMarker1.position.set(mean + stdDev, 1.5, 0);
    scene.add(stdDevMarker1);

    const stdDevMarker2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 3, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x22c55e })
    );
    stdDevMarker2.position.set(mean - stdDev, 1.5, 0);
    scene.add(stdDevMarker2);

    // Add distribution labels
    if (showLabels) {
      createLabel("Normal Distribution", new THREE.Vector3(0, 4, 0), "#3b82f6");
      createLabel("μ = " + mean.toFixed(1), new THREE.Vector3(mean, 2.5, 0), "#fbbf24");
      createLabel("μ ± σ", new THREE.Vector3(mean + stdDev, 1.8, 0), "#22c55e");
      createLabel("μ ± σ", new THREE.Vector3(mean - stdDev, 1.8, 0), "#22c55e");
    }

    // Animation variables
    let time = 0;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      time += 0.01;

      // Auto rotate camera
      if (autoRotate) {
        camera.position.x = Math.cos(time * 0.2) * 10;
        camera.position.z = Math.sin(time * 0.2) * 10;
        camera.lookAt(0, 0, 0);
      }

      // Update mean marker position
      meanMarker.position.set(mean, 2, 0);
      
      // Update std dev markers
      stdDevMarker1.position.set(mean + stdDev, 1.5, 0);
      stdDevMarker2.position.set(mean - stdDev, 1.5, 0);

      // Update curve opacities
      normalCurve.material.opacity = showNormal ? 1 : 0.3;
      binomialCurve.material.opacity = showBinomial ? 1 : 0.3;
      
      // Update curve positions
      const normalPointsUpdated = getNormalDistribution(mean, stdDev, 100);
      normalCurve.geometry.setFromPoints(normalPointsUpdated);
      
      const binomialPointsUpdated = getBinomialDistribution(n, p);
      binomialCurve.geometry.setFromPoints(binomialPointsUpdated);

      renderer.render(scene, camera);
      if (labelRenderer) labelRenderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      if (labelRenderer) {
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (container) {
        container.removeChild(renderer.domElement);
        if (labelRenderer && labelRenderer.domElement) {
          container.removeChild(labelRenderer.domElement);
        }
      }
      // Dispose geometries and materials
      scene.traverse((obj: any) => {
        if (obj.isMesh && obj.geometry) obj.geometry.dispose();
        if (obj.isMesh && obj.material) {
          if (obj.material.map) obj.material.map.dispose();
          obj.material.dispose();
        }
      });
    };
  }, [autoRotate, showNormal, showBinomial, showLabels, mean, stdDev, n, p]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Probability Distributions - Class 11 Mathematics</CardTitle>
        <CardDescription>
          3D Visualization of Normal and Binomial distributions. Understand mean, standard deviation, and probability density functions.
          Interactive exploration of statistical concepts for Class 11 curriculum.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Controls</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-rotate">Auto Rotate</Label>
                  <Switch 
                    id="auto-rotate" 
                    checked={autoRotate}
                    onCheckedChange={setAutoRotate}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-normal">Normal Distribution</Label>
                  <Switch 
                    id="show-normal" 
                    checked={showNormal}
                    onCheckedChange={setShowNormal}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-binomial">Binomial Distribution</Label>
                  <Switch 
                    id="show-binomial" 
                    checked={showBinomial}
                    onCheckedChange={setShowBinomial}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-labels">Show Labels</Label>
                  <Switch 
                    id="show-labels" 
                    checked={showLabels}
                    onCheckedChange={setShowLabels}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Normal Distribution</h4>
              
              <div className="space-y-4">
                <div>
                  <Label className="block mb-2">Mean (μ): {mean.toFixed(1)}</Label>
                  <Slider
                    value={[mean]}
                    onValueChange={(v) => setMean(v[0])}
                    min={-3}
                    max={3}
                    step={0.1}
                  />
                </div>
                
                <div>
                  <Label className="block mb-2">Std Dev (σ): {stdDev.toFixed(1)}</Label>
                  <Slider
                    value={[stdDev]}
                    onValueChange={(v) => setStdDev(v[0])}
                    min={0.1}
                    max={2}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Binomial Distribution</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block mb-2">Trials (n): {n}</Label>
              <Slider
                value={[n]}
                onValueChange={(v) => setN(Math.round(v[0]))}
                min={5}
                max={20}
                step={1}
              />
            </div>
            
            <div>
              <Label className="block mb-2">Probability (p): {p.toFixed(2)}</Label>
              <Slider
                value={[p]}
                onValueChange={(v) => setP(v[0])}
                min={0.1}
                max={0.9}
                step={0.05}
              />
            </div>
          </div>
        </div>

        {/* Theory and Meaning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">Normal Distribution</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A continuous probability distribution characterized by its bell-shaped curve:
            </p>
            <p className="text-lg font-mono text-foreground my-2">
              f(x) = (1/σ√2π) e<sup>-(x-μ)²/2σ²</sup>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Properties:</strong> Symmetric about mean (μ), ~68% data within μ±σ, ~95% within μ±2σ
            </p>
          </div>
          
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">Binomial Distribution</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discrete distribution for n independent trials with success probability p:
            </p>
            <p className="text-lg font-mono text-foreground my-2">
              P(X=k) = C(n,k) p<sup>k</sup> (1-p)<sup>n-k</sup>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Mean:</strong> μ = np | <strong>Variance:</strong> σ² = np(1-p)
            </p>
          </div>
        </div>

        {/* Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">Normal Distribution Applications</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Heights of people in a population</li>
              <li>Measurement errors in experiments</li>
              <li>IQ scores distribution</li>
              <li>Blood pressure readings</li>
              <li>Exam scores in large classes</li>
            </ul>
          </div>
          
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">Binomial Distribution Applications</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Number of heads in coin tosses</li>
              <li>Quality control (defective items)</li>
              <li>Medical tests (true/false results)</li>
              <li>Survey responses (yes/no questions)</li>
              <li>Sports outcomes (win/lose games)</li>
            </ul>
          </div>
        </div>

        {/* Labelled Parts */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Labelled Components</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-blue-500" />
              <span className="text-sm">Normal Distribution Curve</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500" />
              <span className="text-sm">Binomial Distribution</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500" />
              <span className="text-sm">Mean (μ) Marker</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500" />
              <span className="text-sm">Standard Deviation (σ)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500" />
              <span className="text-sm">X-axis (Values)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-green-500" />
              <span className="text-sm">Y-axis (Probability)</span>
            </div>
          </div>
        </div>

        {/* Interactive Instructions */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Interactive Controls</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Left-click + drag:</strong> Rotate camera view</li>
            <li><strong>Right-click + drag:</strong> Pan the scene</li>
            <li><strong>Scroll:</strong> Zoom in/out</li>
            <li><strong>Auto-rotate:</strong> Toggle continuous camera rotation</li>
            <li><strong>Normal Distribution:</strong> Show/hide the normal curve</li>
            <li><strong>Binomial Distribution:</strong> Show/hide the binomial distribution</li>
            <li><strong>Mean (μ):</strong> Adjust the center of normal distribution</li>
            <li><strong>Std Dev (σ):</strong> Adjust the spread of normal distribution</li>
            <li><strong>Trials (n):</strong> Number of binomial trials</li>
            <li><strong>Probability (p):</strong> Success probability for each trial</li>
          </ul>
        </div>

        {/* Educational Significance */}
        <div className="rounded-md border-2 border-green-500 bg-green-500/10 p-4">
          <h4 className="font-semibold mb-3 text-green-600">NEB/CDC Educational Significance</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This 3D visualization aligns with <strong>Class 11 Mathematics - Statistics and Probability</strong> as per National Examination Board (NEB) and Curriculum Development Centre (CDC) Nepal standards.
          </p>
          <ul className="text-sm text-muted-foreground mt-3 space-y-1 list-disc list-inside">
            <li>Visualizes normal distribution and its properties</li>
            <li>Demonstrates binomial distribution for discrete events</li>
            <li>Illustrates mean, median, mode concepts</li>
            <li>Shows standard deviation and variance visually</li>
            <li>Explains probability density functions</li>
            <li>Connects theory to real-world applications</li>
            <li>Prepares students for statistics problems in examinations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11Probability3D;
