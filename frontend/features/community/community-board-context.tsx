"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  useCommunityBoardController,
  type CommunityBoardController,
} from "@/features/community/use-community-board-controller";
import type { BoardView } from "@/features/community/community-helpers";

const CommunityBoardContext = createContext<CommunityBoardController | null>(null);

export function CommunityBoardProvider({
  view,
  id,
  children,
}: {
  view: BoardView;
  id?: string;
  children: ReactNode;
}) {
  const value = useCommunityBoardController(view, id);
  return (
    <CommunityBoardContext.Provider value={value}>{children}</CommunityBoardContext.Provider>
  );
}

export function useCommunityBoard(): CommunityBoardController {
  const ctx = useContext(CommunityBoardContext);
  if (!ctx) {
    throw new Error("useCommunityBoard must be used within CommunityBoardProvider");
  }
  return ctx;
}