"use client";

import { useMemo } from "react";

type MotionGraphicProps = {
  topic: string;
  className?: string;
};

const ANIMATIONS: Record<string, React.ReactNode> = {
  "capacitor": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <defs>
        <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect x="60" y="20" width="80" height="8" fill="url(#plateGrad)" rx="2">
        <animate attributeName="y" values="20;30;20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="height" values="8;4;8" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="60" y="132" width="80" height="8" fill="url(#plateGrad)" rx="2">
        <animate attributeName="y" values="132;122;132" dur="2s" repeatCount="indefinite" />
        <animate attributeName="height" values="8;4;8" dur="2s" repeatCount="indefinite" />
      </rect>
      <line x1="100" y1="28" x2="100" y2="132" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;8" dur="1s" repeatCount="indefinite" />
      </line>
      <circle r="4" fill="#fbbf24">
        <animateMotion path="M 100 28 L 100 132" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Charge flow between plates</text>
    </svg>
  ),
  "gravitation": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="100" cy="80" r="30" fill="none" stroke="#f87171" strokeWidth="2">
        <animate attributeName="r" values="30;35;30" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="80" r="5" fill="#f87171" />
      <circle cx="100" cy="80" r="60" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="#fbbf24">
        <animateMotion path="M 40 80 A 60 60 0 1 1 160 80 A 60 60 0 1 1 40 80" dur="4s" repeatCount="indefinite" />
      </circle>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Orbital motion under gravity</text>
    </svg>
  ),
  "kinematics": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <line x1="20" y1="130" x2="180" y2="130" stroke="#475569" strokeWidth="2" />
      <rect x="30" y="100" width="30" height="30" fill="#818cf8" rx="4">
        <animate attributeName="x" values="30;140;30" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y" values="100;40;100" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Projectile motion</text>
    </svg>
  ),
  "wave": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <path d="M 20 80 Q 40 40, 60 80 T 100 80 T 140 80 T 180 80" fill="none" stroke="#22d3ee" strokeWidth="2">
        <animate attributeName="d" values="M 20 80 Q 40 40, 60 80 T 100 80 T 140 80 T 180 80;M 20 80 Q 40 120, 60 80 T 100 80 T 140 80 T 180 80;M 20 80 Q 40 40, 60 80 T 100 80 T 140 80 T 180 80" dur="2s" repeatCount="indefinite" />
      </path>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Wave propagation</text>
    </svg>
  ),
  "electric-field": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="100" cy="80" r="6" fill="#f87171" />
      <line x1="100" y1="74" x2="100" y2="20" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
      <line x1="100" y1="86" x2="100" y2="140" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
      <line x1="94" y1="80" x2="30" y2="80" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
      <line x1="106" y1="80" x2="170" y2="80" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
      <defs>
        <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#f87171" />
        </marker>
      </defs>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Electric field lines</text>
    </svg>
  ),
  "pendulum": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <line x1="100" y1="10" x2="100" y2="80" stroke="#94a3b8" strokeWidth="2">
        <animate attributeName="x2" values="100;130;70;100" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="80;80;80;80" dur="2s" repeatCount="indefinite" />
      </line>
      <circle cx="100" cy="90" r="8" fill="#fbbf24">
        <animate attributeName="cx" values="100;130;70;100" dur="2s" repeatCount="indefinite" />
        <animate attributeName="cy" values="90;85;85;90" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Simple harmonic motion</text>
    </svg>
  ),
  "atomic-structure": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="100" cy="80" r="12" fill="#f87171" />
      <circle cx="100" cy="80" r="4" fill="#fbbf24" />
      <ellipse cx="100" cy="80" rx="50" ry="20" fill="none" stroke="#60a5fa" strokeWidth="1">
        <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="360 100 80" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="100" cy="80" rx="50" ry="20" fill="none" stroke="#34d399" strokeWidth="1">
        <animateTransform attributeName="transform" type="rotate" from="60 100 80" to="420 100 80" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="100" cy="80" rx="50" ry="20" fill="none" stroke="#f472b6" strokeWidth="1">
        <animateTransform attributeName="transform" type="rotate" from="120 100 80" to="480 100 80" dur="6s" repeatCount="indefinite" />
      </ellipse>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Electron orbits in atom</text>
    </svg>
  ),
  "trigonometry": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="100" cy="80" r="50" fill="none" stroke="#475569" strokeWidth="1" />
      <line x1="100" y1="80" x2="100" y2="30" stroke="#fbbf24" strokeWidth="2" />
      <line x1="100" y1="80" x2="140" y2="80" stroke="#22d3ee" strokeWidth="2" />
      <path d="M 100 80 L 100 30 L 140 80 Z" fill="none" stroke="#f87171" strokeWidth="1" strokeDasharray="3 3" />
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Unit circle — sin and cos</text>
    </svg>
  ),
  "chemistry-bonding": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="60" cy="80" r="20" fill="#818cf8" opacity="0.8" />
      <circle cx="140" cy="80" r="20" fill="#f472b6" opacity="0.8" />
      <line x1="80" y1="80" x2="120" y2="80" stroke="#e2e8f0" strokeWidth="3" />
      <circle cx="100" cy="80" r="6" fill="#e2e8f0">
        <animate attributeName="r" values="6;8;6" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Covalent bond formation</text>
    </svg>
  ),
  "calculus": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <path d="M 20 120 Q 50 20, 100 80 T 180 60" fill="none" stroke="#22d3ee" strokeWidth="2" />
      <circle r="4" fill="#fbbf24">
        <animateMotion path="M 20 120 Q 50 20, 100 80 T 180 60" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Tangent along a curve</text>
    </svg>
  ),
  "vectors": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <line x1="100" y1="120" x2="140" y2="60" stroke="#22d3ee" strokeWidth="3" markerEnd="url(#arrowCyan)" />
      <line x1="100" y1="120" x2="60" y2="60" stroke="#f472b6" strokeWidth="3" markerEnd="url(#arrowPink)" />
      <line x1="100" y1="120" x2="180" y2="40" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowYellow)" />
      <defs>
        <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#22d3ee" /></marker>
        <marker id="arrowPink" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#f472b6" /></marker>
        <marker id="arrowYellow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#fbbf24" /></marker>
      </defs>
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Vector addition — parallelogram</text>
    </svg>
  ),
  "cell-structure": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="100" cy="80" r="50" fill="none" stroke="#34d399" strokeWidth="2" />
      <circle cx="100" cy="80" r="10" fill="#f87171" />
      <circle cx="70" cy="60" r="8" fill="#fbbf24" />
      <circle cx="130" cy="60" r="8" fill="#fbbf24" />
      <circle cx="70" cy="100" r="8" fill="#fbbf24" />
      <circle cx="130" cy="100" r="8" fill="#fbbf24" />
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Plant cell organelles</text>
    </svg>
  ),
  "genetics": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <path d="M 40 80 Q 70 20, 100 80 T 160 80" fill="none" stroke="#34d399" strokeWidth="2" />
      <path d="M 40 80 Q 70 140, 100 80 T 160 80" fill="none" stroke="#34d399" strokeWidth="2" />
      <line x1="100" y1="20" x2="100" y2="140" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">DNA double helix</text>
    </svg>
  ),
  "ecology": (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="50" cy="120" r="15" fill="#34d399" opacity="0.8" />
      <circle cx="100" cy="80" r="15" fill="#fbbf24" opacity="0.8" />
      <circle cx="150" cy="120" r="15" fill="#f87171" opacity="0.8" />
      <line x1="50" y1="120" x2="100" y2="80" stroke="#94a3b8" strokeWidth="1" />
      <line x1="100" y1="80" x2="150" y2="120" stroke="#94a3b8" strokeWidth="1" />
      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Food chain — energy flow</text>
    </svg>
  ),
};

export function MotionGraphics({ topic, className }: MotionGraphicProps) {
  const animation = useMemo(() => {
    const key = topic.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    return ANIMATIONS[key] || null;
  }, [topic]);

  if (!animation) return null;

  return (
    <div className={`relative w-full aspect-video bg-background/50 rounded-xl border border-border/60 overflow-hidden ${className ?? ""}`}>
      {animation}
    </div>
  );
}
