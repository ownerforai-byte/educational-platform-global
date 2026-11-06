"use client";
import { type ReactNode } from "react";

export interface CreditGateProps { moduleKey: string; category: string; children: ReactNode; compact?: boolean; label?: string; }
export function CreditGate({ children }: CreditGateProps) { return <>{children}</>; }