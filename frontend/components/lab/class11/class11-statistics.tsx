"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const Class11Statistics: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [numDataPoints, setNumDataPoints] = useState(10);
  const [meanValue, setMeanValue] = useState(5);
  const [stdDev, setStdDev] = useState(2);
  const [showHistogram, setShowHistogram] = useState(true);
  const [showDataPoints, setShowDataPoints] = useState(true);
  const [showNormalCurve, setShowNormalCurve] = useState(true);

  // Generate random data points
  const dataPoints = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < numDataPoints; i++) {
      // Generate normally distributed random numbers
      const u = 1 - Math.random();
      const v = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      points.push(meanValue + z * stdDev);
    }
    return points;
  }, [numDataPoints, meanValue, stdDev]);

  // Calculate statistics
  const calculatedMean = useMemo(() => {
    if (dataPoints.length === 0) return 0;
    return dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length;
  }, [dataPoints]);

  const calculatedMedian = useMemo(() => {
    if (dataPoints.length === 0) return 0;
    const sorted = [...dataPoints].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
  }, [dataPoints]);

  const calculatedMode = useMemo(() => {
    if (dataPoints.length === 0) return 0;
    const freq: Record<string, number> = {};
    dataPoints.forEach(dp => {
      const rounded = Math.round(dp * 10) / 10;
      freq[rounded] = (freq[rounded] || 0) + 1;
    });
    let maxFreq = 0;
    let mode = dataPoints[0];
    Object.entries(freq).forEach(([key, count]) => {
      if (count > maxFreq) {
        maxFreq = count;
        mode = parseFloat(key);
      }
    });
    return mode;
  }, [dataPoints]);

  const calculatedStdDev = useMemo(() => {
    if (dataPoints.length <= 1) return 0;
    const mean = calculatedMean;
    const variance = dataPoints.reduce((sum, dp) => sum + Math.pow(dp - mean, 2), 0) / dataPoints.length;
    return Math.sqrt(variance);
  }, [dataPoints, calculatedMean]);

  const calculatedRange = useMemo(() => {
    if (dataPoints.length === 0) return 0;
    return Math.max(...dataPoints) - Math.min(...dataPoints);
  }, [dataPoints]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 10, 20),
          autoRotate: true,
          autoRotateSpeed: 0.2,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground
        const groundGeo = new THREE.PlaneGeometry(50, 50);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(50, 100, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Axes for data visualization
        const xAxisGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-10, 0, 0),
          new THREE.Vector3(10, 0, 0)
        ]);
        const xAxis = new THREE.Line(xAxisGeo, new THREE.LineBasicMaterial({ color: 0xef4444 }));
        ts.group.add(xAxis);

        const yAxisGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -5, 0),
          new THREE.Vector3(0, 10, 0)
        ]);
        const yAxis = new THREE.Line(yAxisGeo, new THREE.LineBasicMaterial({ color: 0x22c55e }));
        ts.group.add(yAxis);

        // Data points as spheres
        const dataPointMeshes: THREE.Mesh[] = [];
        const maxVal = Math.max(...dataPoints, meanValue + stdDev * 3);
        const minVal = Math.min(...dataPoints, meanValue - stdDev * 3);
        const valueRange = maxVal - minVal;

        if (showDataPoints) {
          dataPoints.forEach((value, index) => {
            const x = -8 + (index / (dataPoints.length - 1 || 1)) * 16;
            const y = (value - minVal) / valueRange * 8;
            const z = 0;

            const geometry = new THREE.SphereGeometry(0.3, 16, 16);
            const material = standardMaterial(0x3b82f6, { emissive: 0x3b82f6, emissiveIntensity: 0.5 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            mesh.castShadow = true;
            ts.group.add(mesh);
            dataPointMeshes.push(mesh);
          });
        }

        // Histogram bars
        const histogramBars: THREE.Mesh[] = [];
        if (showHistogram && dataPoints.length > 0) {
          const numBars = 5;
          const barWidth = 16 / numBars;

          for (let i = 0; i < numBars; i++) {
            const binMin = minVal + (i / numBars) * valueRange;
            const binMax = minVal + ((i + 1) / numBars) * valueRange;
            const count = dataPoints.filter(dp => dp >= binMin && dp < binMax).length;
            const height = (count / dataPoints.length) * 8;

            const x = -8 + i * barWidth + barWidth / 2 - 16 / numBars / 2;
            const geometry = new THREE.BoxGeometry(barWidth * 0.8, height, 0.5);
            const material = standardMaterial(0xfbbf24, { transparent: true, opacity: 0.7 });
            const bar = new THREE.Mesh(geometry, material);
            bar.userData.height = height;
            bar.position.set(x, height / 2, 0);
            bar.castShadow = true;
            ts.group.add(bar);
            histogramBars.push(bar);
          }
        }

        // Normal distribution curve
        let normalCurve: THREE.Line | null = null;
        if (showNormalCurve) {
          const points: THREE.Vector3[] = [];
          const steps = 100;
          for (let i = 0; i <= steps; i++) {
            const x = -8 + (i / steps) * 16;
            const value = minVal + (x + 8) / 16 * valueRange;
            const probability = Math.exp(-Math.pow(value - meanValue, 2) / (2 * stdDev * stdDev)) / 
                               (stdDev * Math.sqrt(2 * Math.PI));
            const y = (probability * dataPoints.length * valueRange / numDataPoints) * 8;
            points.push(new THREE.Vector3(x, y, 0));
          }
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 });
          normalCurve = new THREE.Line(geometry, material);
          ts.group.add(normalCurve);
        }

        // Mean, median, mode indicators
        const meanX = -8 + ((meanValue - minVal) / valueRange) * 16;
        const meanY = (calculatedMean - minVal) / valueRange * 8;
        
        const meanIndicatorGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const meanIndicatorMat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.8 });
        const meanIndicator = new THREE.Mesh(meanIndicatorGeo, meanIndicatorMat);
        meanIndicator.position.set(meanX, meanY, 0);
        ts.group.add(meanIndicator);

        const medianX = -8 + ((calculatedMedian - minVal) / valueRange) * 16;
        const medianY = (calculatedMedian - minVal) / valueRange * 8;
        
        const medianIndicatorGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const medianIndicatorMat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.8 });
        const medianIndicator = new THREE.Mesh(medianIndicatorGeo, medianIndicatorMat);
        medianIndicator.position.set(medianX, medianY, 0);
        ts.group.add(medianIndicator);

        const modeX = -8 + ((calculatedMode - minVal) / valueRange) * 16;
        const modeY = (calculatedMode - minVal) / valueRange * 8;
        
        const modeIndicatorGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const modeIndicatorMat = standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.8 });
        const modeIndicator = new THREE.Mesh(modeIndicatorGeo, modeIndicatorMat);
        modeIndicator.position.set(modeX, modeY, 0);
        ts.group.add(modeIndicator);

        // Labels
        const meanLabelGeo = new THREE.PlaneGeometry(0.5, 0.2);
        const meanLabelMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true });
        const meanLabel = new THREE.Mesh(meanLabelGeo, meanLabelMat);
        meanLabel.position.set(meanX, meanY + 1, 0);
        ts.group.add(meanLabel);

        const startTime = performance.now();

        function updateScene() {
          if (!ts) return;

          const elapsed = (performance.now() - startTime) / 1000;
          const time = elapsed;

          // Animate data points
          dataPointMeshes.forEach((mesh, index) => {
            mesh.position.y += Math.sin(time * 2 + index * 0.5) * 0.05;
            mesh.rotation.y += 0.02;
          });

          // Animate histogram bars
          histogramBars.forEach((bar, index) => {
            bar.position.y = (bar.userData.height as number) / 2 + Math.sin(time + index * 0.3) * 0.1;
          });

          // Animate indicators
          meanIndicator.position.y = meanY + Math.sin(time * 3) * 0.1;
          medianIndicator.position.y = medianY + Math.sin(time * 3 + 1) * 0.1;
          modeIndicator.position.y = modeY + Math.sin(time * 3 + 2) * 0.1;

          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          updateScene();
        }

        animate();
      } catch (error) {
        console.error("Error initializing 3D scene:", error);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (unbind) unbind();
      if (ts) {
        try {
          disposeThreeScene(ts);
        } catch (e) {}
      }
    };
  }, [numDataPoints, meanValue, stdDev, showHistogram, showDataPoints, showNormalCurve, dataPoints, calculatedMean, calculatedMedian, calculatedMode, calculatedStdDev, calculatedRange]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Statistics</CardTitle>
        <CardDescription>
          Interactive 3D visualization of statistical concepts: mean, median, mode, standard deviation, and normal distribution.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Number of Data Points (n)</Label>
              <Slider min={5} max={50} step={1} value={[numDataPoints]} onValueChange={(v) => setNumDataPoints(v[0])} />
              <p className="text-sm text-gray-500">Current: {numDataPoints}</p>
            </div>
            <div>
              <Label>Mean (μ)</Label>
              <Slider min={0} max={10} step={0.5} value={[meanValue]} onValueChange={(v) => setMeanValue(v[0])} />
              <p className="text-sm text-gray-500">Current: {meanValue}</p>
            </div>
            <div>
              <Label>Standard Deviation (σ)</Label>
              <Slider min={0.1} max={5} step={0.1} value={[stdDev]} onValueChange={(v) => setStdDev(v[0])} />
              <p className="text-sm text-gray-500">Current: {stdDev}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDataPoints(!showDataPoints)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showDataPoints ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Data Points: {showDataPoints ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowHistogram(!showHistogram)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showHistogram ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Histogram: {showHistogram ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowNormalCurve(!showNormalCurve)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showNormalCurve ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Normal Curve: {showNormalCurve ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Statistical Calculations:</span></p>
              <p className="text-green-600"><strong>Mean (μ):</strong> {calculatedMean.toFixed(2)}</p>
              <p className="text-blue-600"><strong>Median:</strong> {calculatedMedian.toFixed(2)}</p>
              <p className="text-yellow-600"><strong>Mode:</strong> {calculatedMode.toFixed(2)}</p>
              <p className="text-red-600"><strong>Standard Deviation (σ):</strong> {calculatedStdDev.toFixed(2)}</p>
              <p className="text-purple-600"><strong>Range:</strong> {calculatedRange.toFixed(2)}</p>
              <p className="text-orange-600"><strong>Variance (σ²):</strong> {(calculatedStdDev * calculatedStdDev).toFixed(2)}</p>
            </div>

            <div>
              <h3 className="font-semibold">Statistics Fundamentals (Class 11)</h3>
              <p className="text-sm mt-2">
                Statistics is the study of collection, analysis, interpretation, presentation, and organization of data.
              </p>
              <div className="text-sm mt-3 space-y-2">
                <p><strong>Population:</strong> Entire group being studied</p>
                <p><strong>Sample:</strong> Subset of the population used for analysis</p>
                <p><strong>Variable:</strong> Characteristic being measured</p>
                <p><strong>Data:</strong> Values or observations collected</p>
                <p><strong>Parameter:</strong> Numerical characteristic of a population</p>
                <p><strong>Statistic:</strong> Numerical characteristic of a sample</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Measures of Central Tendency</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-2">
                <li>
                  <strong>Mean (Arithmetic Average):</strong>
                  <p className="pl-4 text-xs">μ = (Σx_i) / n, where x_i are data points, n is count</p>
                  <p className="pl-4 text-xs text-muted-foreground">Most sensitive to outliers</p>
                </li>
                <li>
                  <strong>Median:</strong>
                  <p className="pl-4 text-xs">Middle value when data is ordered</p>
                  <p className="pl-4 text-xs text-muted-foreground">For even n: average of two middle values</p>
                </li>
                <li>
                  <strong>Mode:</strong>
                  <p className="pl-4 text-xs">Most frequently occurring value</p>
                  <p className="pl-4 text-xs text-muted-foreground">A dataset may have multiple modes or no mode</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Measures of Dispersion</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-2">
                <li>
                  <strong>Range:</strong>
                  <p className="pl-4 text-xs">Maximum - Minimum</p>
                  <p className="pl-4 text-xs text-muted-foreground">Simple measure, affected by outliers</p>
                </li>
                <li>
                  <strong>Variance (σ²):</strong>
                  <p className="pl-4 text-xs">σ² = (Σ(x_i - μ)²) / n</p>
                  <p className="pl-4 text-xs text-muted-foreground">Average squared deviation from mean</p>
                </li>
                <li>
                  <strong>Standard Deviation (σ):</strong>
                  <p className="pl-4 text-xs">σ = √(variance)</p>
                  <p className="pl-4 text-xs text-muted-foreground">Measures spread of data around mean</p>
                </li>
                <li>
                  <strong>Quartiles:</strong>
                  <p className="pl-4 text-xs">Q1 (25th percentile), Q2=Median (50th), Q3 (75th percentile)</p>
                </li>
                <li>
                  <strong>Interquartile Range (IQR):</strong>
                  <p className="pl-4 text-xs">IQR = Q3 - Q1, measures spread of middle 50%</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Normal Distribution</h3>
              <p className="text-sm mt-2">
                The normal (Gaussian) distribution is a symmetric, bell-shaped probability distribution.
              </p>
              <div className="text-sm mt-3 space-y-2">
                <p><strong>PDF:</strong> f(x) = (1/(σ√(2π))) * e^(-(x-μ)²/(2σ²))</p>
                <p><strong>Empirical Rule (68-95-99.7):</strong></p>
                <p className="pl-4 text-xs">68% of data within μ ± σ</p>
                <p className="pl-4 text-xs">95% of data within μ ± 2σ</p>
                <p className="pl-4 text-xs">99.7% of data within μ ± 3σ</p>
                <p><strong>Standard Normal Distribution:</strong> μ = 0, σ = 1</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Graphical Representations</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>Histogram:</strong> Bar chart showing frequency distribution</li>
                <li><strong>Box Plot:</strong> Shows median, quartiles, min, max, outliers</li>
                <li><strong>Scatter Plot:</strong> Shows relationship between two variables</li>
                <li><strong>Stem-and-Leaf Plot:</strong> Shows data values and frequency</li>
                <li><strong>Pie Chart:</strong> Shows proportional distribution</li>
                <li><strong>Ogive:</strong> Cumulative frequency graph</li>
              </ul>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><span>Data Points</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-4 bg-orange-500"></div><span>Histogram Bars</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-red-500"></div><span>Normal Curve</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span>Mean (μ)</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span>Median</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div><span>Mode</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11Statistics;
