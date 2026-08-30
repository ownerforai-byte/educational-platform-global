"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ARViewer({ enabled = false, onClose }: { enabled?: boolean; onClose?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [arSupported, setArSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const isDark = true;

  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        setArSupported(supported);
      });
    }
  }, []);

  const startAR = async () => {
    if (!arSupported) return;
    if (!navigator.xr) return;
    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
      });
      setIsARActive(true);
      
      session.addEventListener('end', () => {
        setIsARActive(false);
        onClose?.();
      });
    } catch (error) {
      console.error('Failed to start AR:', error);
    }
  };

  if (!enabled) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: isDark ? "#1e293b" : "#f8fafc",
        borderRadius: "16px",
        padding: "24px",
        maxWidth: "400px",
        width: "90%",
        color: isDark ? "#f8fafc" : "#1e293b",
        textAlign: "center",
      }}>
        <h2 style={{ margin: "0 0 16px", fontSize: "20px" }}>📱 AR Mode</h2>
        
        {!arSupported ? (
          <div>
            <p style={{ opacity: 0.7, marginBottom: "16px" }}>
              AR is not supported on this device. Please use a compatible mobile device with WebXR support.
            </p>
          </div>
        ) : (
          <div>
            <p style={{ opacity: 0.7, marginBottom: "16px" }}>
              Point your camera at a flat surface to place the 3D model in your real environment.
            </p>
            <button
              onClick={startAR}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: "rgba(99, 102, 241, 0.9)",
                color: "#f8fafc",
                fontSize: "14px",
                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              {isARActive ? "AR Active" : "Start AR"}
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: `1px solid rgba(99, 102, 241, 0.5)`,
                background: "transparent",
                color: isDark ? "#f8fafc" : "#1e293b",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}

        <div style={{ marginTop: "20px", padding: "16px", borderRadius: "8px", background: "rgba(99, 102, 241, 0.1)", fontSize: "12px", opacity: 0.8 }}>
          <strong>AR Features:</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: "20px", textAlign: "left" }}>
            <li>Place models in real world</li>
            <li>Scale and rotate with gestures</li>
            <li>View annotations in AR</li>
            <li>Share AR views with peers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
