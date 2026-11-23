import { Router } from "express";
import { hasAnyLlmKey } from "../../ai/config.js";
import { describeFreeLlmPresence } from "../../ai/free-llm-providers.js";
import { buildAppRequirements } from "../../lib/app-requirements.js";
import {
  aiStatusResponseSchema,
  apiV2MetaSchema,
  healthResponseSchema,
} from "../contracts/public-schemas.js";

/**
 * Versioned public surface (PLATFORM_UPGRADE_MASTER_PLAN §2.3).
 * v1 routes remain at /api/*; new clients may target /api/v2/* for probes
 * that carry X-API-Version: 2.
 */
const v2Router = Router();

v2Router.use((_req, res, next) => {
  res.setHeader("X-API-Version", "2");
  next();
});

v2Router.get("/health", (_req, res) => {
  const body = {
    status: "ok" as const,
    timestamp: new Date().toISOString(),
    commit: process.env.COMMIT_SHA ?? process.env.K_REVISION ?? null,
  };
  healthResponseSchema.parse(body);
  res.json(body);
});

v2Router.get("/ai/status", (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const configured = hasAnyLlmKey() || describeFreeLlmPresence().live.length > 0;
  const body = { configured, online: configured };
  aiStatusResponseSchema.parse(body);
  res.json(body);
});

v2Router.get("/meta", (_req, res) => {
  const body = {
    apiVersion: 2 as const,
    stable: true,
    legacyBase: "/api" as const,
    deprecated: [] as string[],
    requirements: buildAppRequirements(),
  };
  apiV2MetaSchema.parse(body);
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json(body);
});

export default v2Router;