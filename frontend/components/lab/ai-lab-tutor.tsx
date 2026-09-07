"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send } from "lucide-react";

export const AILabTutor: React.FC = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I am your AI Lab Tutor. How can I help you understand your experiment today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setTimeout(() => {
        setMessages(prev => [...prev, { role: "ai", text: `I understand you're asking about "${input}". As a tutor, I'd explain the core concepts, provide a step-by-step approach, and suggest how to visualize this in the lab.` }]);
    }, 1000);
    setInput("");
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-amber-500" />
            AI Lab Tutor
        </CardTitle>
        <CardDescription>Your personal AI assistant for science experiments.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
            <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about the lab..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}><Send className="h-4 w-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
};
