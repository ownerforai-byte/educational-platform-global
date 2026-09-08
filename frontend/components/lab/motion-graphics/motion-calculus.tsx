"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import {
  disposeThreeScene,
  clearGroup,
  standardMaterial,
  type ThreeScene,
  createThreeScene,
  bindResize,
} from "@/components/lab/three-scene";

type CalculusMode = "derivative" | "integral" | "limit" | "series";

export const MotionGraphicsCalculus: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CalculusMode>("derivative");
  const [functionType, setFunctionType] = useState("sine");
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [showFunction, setShowFunction] = useState(true);
  const [showDerivative, setShowDerivative] = useState(true);
  const [showIntegral, setShowIntegral] = useState(true);
  const [showTangent, setShowTangent] = useState(true);
  const [pointX, setPointX] = useState(0);

  // Calculate values based on function type
  const getFunctionValue = (x: number) => {
    switch (functionType) {
      case "sine": return amplitude * Math.sin(2 * Math.PI * frequency * x);
      case "cosine": return amplitude * Math.cos(2 * Math.PI * frequency * x);
      case "polynomial": return amplitude * (x * x * x - x);
      case "exponential": return amplitude * Math.exp(x) * 0.1;
      default: return amplitude * Math.sin(x);
    }
  };

  const getDerivativeValue = (x: number) => {
    const h = 0.001;
    return (getFunctionValue(x + h) - getFunctionValue(x - h)) / (2 * h);
  };

  // Scene lifecycle - mount/unmount only
  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;
    const ts = createThreeScene(mountRef.current, {
          cameraPosition: new THREE.Vector3(0, 0, 50),
          autoRotate: false,
          background: 0x0a0a0a
        });
    tsRef.current = ts;
    const unbind = bindResize(ts);
    let rafId = 0;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const time = performance.now() / 1000;
      updateRef.current?.(time);
      ts.controls.update();
      ts.renderer.render(ts.scene, ts.camera);
    }
    animate();
    return () => { cancelAnimationFrame(rafId); unbind(); disposeThreeScene(ts); tsRef.current = null; };
  }, []);

  // Rebuild 3D content on state change
  useEffect(() => {
    const ts = tsRef.current;
    if (!ts) return;
    clearGroup(ts.group);

let labels: any[] = [];
let labelRenderer: any = null;
let animationId: number;

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        ts.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 20, 10);
        ts.scene.add(directionalLight);

        // Create CSS2D Label Renderer
        try {
          const { CSS2DRenderer } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current!.appendChild(labelRenderer.domElement);
        } catch {
          console.log("CSS2DRenderer not available");
        }

        // Animation loop

    updateRef.current = (time) => {
    
    animationId = requestAnimationFrame(animate);
    
    // Clear and rebuild
    clearGroup(ts.group);
    
    // Clear previous labels
    labels.forEach(label => {
      if (label?.element?.parentNode) {
        label.element.parentNode.removeChild(label.element);
      }
    });
    labels = [];
    
    // Add title label
    if (labelRenderer) {
      const CSS2DObject = (THREE as any).CSS2DObject;
      const titleLabel = new CSS2DObject(document.createElement("div"));
      titleLabel.element.innerHTML = `
        <div style="background:rgba(255,255,255,0.95);padding:10px 16px;border-radius:8px;color:black;font-weight:700;font-size:14px;border:2px solid #10b981">
          <div>📐 Calculus in Motion</div>
          <div style="font-size:11px;color:#666">Mode: ${mode === 'derivative' ? 'Derivative' : mode === 'integral' ? 'Integral' : mode === 'limit' ? 'Limit' : 'Series'}</div>
        </div>
      `;
      titleLabel.element.style.pointerEvents = "none";
      titleLabel.position.set(0, 15, 0);
      ts.group.add(titleLabel);
      labels.push(titleLabel);
    }
    
    // Create coordinate grid
    createGrid(ts.group);
    
    // Create function plot with label
    if (showFunction) {
      createFunctionPlot(ts.group);
    }
    
    // Create derivative plot with label
    if (showDerivative && mode === "derivative") {
      createDerivativePlot(ts.group);
    }
    
    // Create integral visualization with label
    if (showIntegral && mode === "integral") {
      createIntegralVisualization(ts.group);
    }
    
    // Create tangent line with label
    if (showTangent && mode === "derivative") {
      createTangentLine(ts.group);
    }
    
    // Add mode-specific explanations
    if (labelRenderer) {
      const CSS2DObject = (THREE as any).CSS2DObject;
      
      if (mode === "derivative") {
        const derivLabel = new CSS2DObject(document.createElement("div"));
        derivLabel.element.innerHTML = `
          <div style="background:rgba(16,185,129,0.85);padding:8px 14px;border-radius:6px;color:white;font-size:10px;font-weight:600">
            <div>📈 f'(x) = Derivative</div>
            <div style="font-size:9px;opacity:0.9">Slope of tangent = Rate of change</div>
          </div>
        `;
        derivLabel.element.style.pointerEvents = "none";
        derivLabel.position.set(-12, -8, 0);
        ts.group.add(derivLabel);
        labels.push(derivLabel);
      } else if (mode === "integral") {
        const intLabel = new CSS2DObject(document.createElement("div"));
        intLabel.element.innerHTML = `
          <div style="background:rgba(236,72,153,0.85);padding:8px 14px;border-radius:6px;color:white;font-size:10px;font-weight:600">
            <div>⫰ ∫f(x)dx = Integral</div>
            <div style="font-size:9px;opacity:0.9">Area under the curve</div>
          </div>
        `;
        intLabel.element.style.pointerEvents = "none";
        intLabel.position.set(12, -8, 0);
        ts.group.add(intLabel);
        labels.push(intLabel);
      }
    }
    
    if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
    };
  }, [mode, functionType, frequency, amplitude, showFunction, showDerivative, showIntegral, showTangent, pointX]);


  const currentSlope = useMemo(() => {
    return getDerivativeValue(pointX).toFixed(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointX, functionType, frequency, amplitude]);

  const currentValue = useMemo(() => {
    return getFunctionValue(pointX).toFixed(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointX, functionType, frequency, amplitude]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M6 9h12M6 15h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 6L6 9M6 9L9 12M9 12L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Calculus in Motion
        </CardTitle>
        <CardDescription>
          3D visualization of calculus concepts: derivatives, integrals, limits, and series with interactive controls and labelled components.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* 3D Visualization */}
          <div 
            ref={mountRef}
            className="w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-lg border border-border bg-black/10 relative"
          />
          
          {/* Labels & Meanings Guide */}
          <Card className="bg-gradient-to-r from-green-500/10 to-purple-500/10 border-green-500/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center text-green-400">📚 Meaning of Labels & Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-blue-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Function f(x)</div>
                  <div className="text-xs text-muted-foreground">Original function - Blue</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-purple-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Derivative f'(x)</div>
                  <div className="text-xs text-muted-foreground">Slope function - Purple</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-green-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Integral ∫f(x)</div>
                  <div className="text-xs text-muted-foreground">Area under curve - Green</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                  <div className="text-yellow-500 text-xl mb-2">/</div>
                  <div className="text-sm font-medium">Tangent Line</div>
                  <div className="text-xs text-muted-foreground">Slope = f'(x) - Yellow</div>
                </div>
                <div className="text-center p-3 bg-cyan-500/10 rounded-lg">
                  <div className="text-cyan-500 text-xl mb-2">📊</div>
                  <div className="text-sm font-medium">Area</div>
                  <div className="text-xs text-muted-foreground">Integral value - Cyan</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Mode Selection */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={mode === "derivative" ? "default" : "outline"}
                onClick={() => setMode("derivative")}
              >
                Derivative
              </Button>
              <Button
                variant={mode === "integral" ? "default" : "outline"}
                onClick={() => setMode("integral")}
              >
                Integral
              </Button>
              <Button
                variant={mode === "limit" ? "default" : "outline"}
                onClick={() => setMode("limit")}
              >
                Limit
              </Button>
              <Button
                variant={mode === "series" ? "default" : "outline"}
                onClick={() => setMode("series")}
              >
                Series
              </Button>
            </div>
            
            {/* Function Selection */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={functionType === "sine" ? "default" : "outline"}
                onClick={() => setFunctionType("sine")}
                size="sm"
              >
                Sine
              </Button>
              <Button
                variant={functionType === "cosine" ? "default" : "outline"}
                onClick={() => setFunctionType("cosine")}
                size="sm"
              >
                Cosine
              </Button>
              <Button
                variant={functionType === "polynomial" ? "default" : "outline"}
                onClick={() => setFunctionType("polynomial")}
                size="sm"
              >
                Polynomial
              </Button>
              <Button
                variant={functionType === "exponential" ? "default" : "outline"}
                onClick={() => setFunctionType("exponential")}
                size="sm"
              >
                Exponential
              </Button>
            </div>
            
            {/* Parameter Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amplitude" className="text-sm font-medium">
                  Amplitude: {amplitude.toFixed(2)}
                </Label>
                <Slider
                  id="amplitude"
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={[amplitude]}
                  onValueChange={(v) => setAmplitude(v[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-sm font-medium">
                  Frequency: {frequency.toFixed(2)}
                </Label>
                <Slider
                  id="frequency"
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={[frequency]}
                  onValueChange={(v) => setFrequency(v[0])}
                />
              </div>
              
              {mode === "derivative" && (
                <div className="space-y-2">
                  <Label htmlFor="point-x" className="text-sm font-medium">
                    Point x: {pointX.toFixed(2)}
                  </Label>
                  <Slider
                    id="point-x"
                    min={-10}
                    max={10}
                    step={0.1}
                    value={[pointX]}
                    onValueChange={(v) => setPointX(v[0])}
                  />
                </div>
              )}
            </div>
            
            {/* Value Display */}
            {mode === "derivative" && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-3">At x = {pointX.toFixed(2)}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-500">{currentValue}</div>
                    <div className="text-sm text-muted-foreground">f(x) = Function Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-500">{currentSlope}</div>
                    <div className="text-sm text-muted-foreground">f'(x) = Slope</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Toggle Controls */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFunction}
                onChange={(e) => setShowFunction(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Function</span>
            </label>
            
            {mode === "derivative" && (
              <>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDerivative}
                    onChange={(e) => setShowDerivative(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Show Derivative</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTangent}
                    onChange={(e) => setShowTangent(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Show Tangent</span>
                </label>
              </>
            )}
            
            {mode === "integral" && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIntegral}
                  onChange={(e) => setShowIntegral(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Show Area</span>
              </label>
            )}
          </div>
          
          {/* Theory Information with Meanings */}
          <Card className="mt-6 bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">🎓 Calculus Fundamentals with Meanings</h3>
              <div className="space-y-4 text-sm">
                
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-blue-400 mb-2">📌 What is a Derivative?</h4>
                  <p>
                    The derivative of a function represents its <strong>instantaneous rate of change</strong> at any point. Geometrically, it's the <strong>slope of the tangent line</strong> to the curve at that point. If f(x) is position, then f'(x) is velocity. If f(x) is velocity, then f'(x) is acceleration.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-purple-400 mb-2">📐 Derivative Formula:</h4>
                    <p className="font-mono text-purple-300">f'(x) = lim(h→0) [f(x+h) - f(x)] / h</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      This limit gives the instantaneous rate of change. A small h means we're looking at a very small interval, giving us the slope at exactly point x.
                    </p>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-green-400 mb-2">⫰ What is an Integral?</h4>
                    <p className="font-mono text-green-300">∫f(x)dx</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      The integral represents the <strong>area under the curve</strong> of a function. It's the reverse operation of differentiation. The definite integral from a to b gives the exact area between the curve, the x-axis, and the vertical lines x=a and x=b.
                    </p>
                  </div>
                </div>
                
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-400 mb-2">📊 Fundamental Theorem of Calculus:</h4>
                  <p className="font-mono text-yellow-300 text-center">d/dx ∫f(x)dx = f(x)</p>
                  <p className="text-sm mt-2">
                    <strong>Meaning:</strong> Differentiation and integration are <strong>inverse operations</strong>. If you integrate a function and then differentiate the result, you get back the original function. This connects the two main branches of calculus.
                  </p>
                </div>
                
                <div className="bg-cyan-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-cyan-400 mb-2">💡 Key Concepts:</h4>
                  <ul className="text-xs space-y-1">
                    <li><strong>Slope:</strong> How steep the tangent line is at a point</li>
                    <li><strong>Tangent Line:</strong> A straight line that touches the curve at one point without crossing it</li>
                    <li><strong>Area Under Curve:</strong> The space between the curve and the x-axis</li>
                    <li><strong>Rate of Change:</strong> How fast a quantity is changing at an instant</li>
                    <li><strong>Accumulation:</strong> Adding up infinitely many small pieces (integration)</li>
                  </ul>
                </div>
                
                <div className="bg-orange-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-orange-400 mb-2">📈 Basic Rules:</h4>
                  <p className="text-xs">
                    <strong>Derivatives:</strong> d/dx [xⁿ] = n·xⁿ⁻¹, d/dx [sin x] = cos x, d/dx [eˣ] = eˣ<br/>
                    <strong>Integrals:</strong> ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, ∫cos x dx = sin x + C, ∫eˣ dx = eˣ + C
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
