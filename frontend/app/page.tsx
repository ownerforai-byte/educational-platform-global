"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Plus, Circle, ChevronDown, Folder, GitBranch } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Dropdown = ({ label, icon, options, triggerId }: {
    label: string;
    icon: React.ReactNode;
    options: string[];
    triggerId: string;
  }) => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdown(openDropdown === triggerId ? null : triggerId);
        }}
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {icon}
        {label}
        <ChevronDown size={10} className="opacity-60" />
      </button>

      {openDropdown === triggerId && (
        <div
          className="absolute bottom-full left-0 mb-1 min-w-[100px] rounded-lg overflow-hidden z-50"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setOpenDropdown(null)}
              className="block w-full text-left px-3 py-1.5 text-xs transition-colors"
              style={{ color: "hsl(var(--foreground))" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted))")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background w-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
          />
        </div>

        {/* Hero text */}
        <div className="relative z-10 mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              Manim Educativo
            </span>{" "}
            What can I do for you?
          </h1>
        </div>

        {/* Input container */}
        <div className="relative z-10 w-full max-w-2xl">
          <div 
            className="rounded-2xl border px-4 py-3 transition-all duration-200"
            style={{ 
              background: "hsl(var(--muted))",
              borderColor: "hsl(var(--border))",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you want Agnes to help you with today? @ to reference files, / to invoke commands, $ to invoke skills"
              className="w-full bg-transparent border-none outline-none resize-none text-foreground text-[0.9375rem] leading-relaxed min-h-[3rem] max-h-[12rem]"
              rows={2}
            />
            
            {/* Toolbar */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {/* Left side controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Smart Mode dropdown - positioned above */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "smart" ? null : "smart")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium transition-colors"
                    style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }}
                  >
                    <span className="text-base">🤖</span> Smart Mode
                    <ChevronDown size={12} className="opacity-60" />
                  </button>
                  {openDropdown === "smart" && (
                    <div
                      className="absolute top-full left-0 mt-1 min-w-[120px] rounded-lg overflow-hidden z-50"
                      style={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      {["auto", "balanced", "precise"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setOpenDropdown(null)}
                          className="block w-full text-left px-3 py-2 text-sm transition-colors capitalize"
                          style={{ color: "hsl(var(--foreground))" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted))")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* auto dropdown - positioned above */}
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "auto" ? null : "auto")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium transition-colors"
                    style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }}
                  >
                    <span className="text-base">🧠</span> auto
                    <ChevronDown size={12} className="opacity-60" />
                  </button>
                  {openDropdown === "auto" && (
                    <div
                      className="absolute top-full left-0 mt-1 min-w-[120px] rounded-lg overflow-hidden z-50"
                      style={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      {["rn", "main"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setOpenDropdown(null)}
                          className="block w-full text-left px-3 py-2 text-sm transition-colors"
                          style={{ color: "hsl(var(--foreground))" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted))")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-1 ml-auto">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <Circle size={16} />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <Plus size={16} />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <Mic size={16} />
                </button>
                <button 
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all ml-1"
                  style={{ 
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              {/* Project dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "project" ? null : "project")}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  <Folder size={14} />
                  rn
                  <ChevronDown size={10} className="opacity-60" />
                </button>
                {openDropdown === "project" && (
                  <div
                    className="absolute top-full left-0 mt-1 min-w-[100px] rounded-lg overflow-hidden z-50"
                    style={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    {["rn", "main", "dev"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setOpenDropdown(null)}
                        className="block w-full text-left px-3 py-1.5 text-xs transition-colors"
                        style={{ color: "hsl(var(--foreground))" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted))")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Branch dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "branch" ? null : "branch")}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  <GitBranch size={14} />
                  main
                  <ChevronDown size={10} className="opacity-60" />
                </button>
                {openDropdown === "branch" && (
                  <div
                    className="absolute top-full left-0 mt-1 min-w-[100px] rounded-lg overflow-hidden z-50"
                    style={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    {["main", "dev", "feature"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setOpenDropdown(null)}
                        className="block w-full text-left px-3 py-1.5 text-xs transition-colors"
                        style={{ color: "hsl(var(--foreground))" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted))")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick action pills */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-8">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border"
            style={{ 
              background: "hsl(var(--muted) / 0.5)",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--muted-foreground))"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Build a Website
          </button>
          
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border"
            style={{ 
              background: "hsl(var(--muted) / 0.5)",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--muted-foreground))"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            Develop a Skill
          </button>
          
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border"
            style={{ 
              background: "hsl(var(--muted) / 0.5)",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--muted-foreground))"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            Daily Development
          </button>
        </div>
      </div>
    </div>
  );
}