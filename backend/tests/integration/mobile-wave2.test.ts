import express from "express";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Server } from "node:http";
import mobileRouter from "../../src/api/mobile";

const app = express();
app.use("/api/mobile", mobileRouter);

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no port");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise((resolve) => server?.close(resolve));
});

describe("Mobile Wave 2 thin surfaces & knowledge endpoints", () => {
  it("GET /api/mobile/announcements returns items in mobile envelope", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/announcements`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(Array.isArray(body.data.items)).toBe(true);
    expect(body.data.items.length).toBeGreaterThan(0);
  });

  it("GET /api/mobile/changelog returns versioned entries", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/changelog`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.data.items[0]).toHaveProperty("version");
  });

  it("GET /api/mobile/notice returns official notices", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/notice`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.data.items.length).toBeGreaterThan(0);
  });

  it("GET /api/mobile/exam-countdown returns subjects with daysLeft", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/exam-countdown`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.data.subjects.length).toBeGreaterThan(0);
    expect(typeof body.data.subjects[0].daysLeft).toBe("number");
  });

  it("GET /api/mobile/status returns operational services", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/status`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.data.status).toBe("ok");
  });

  it("GET /api/mobile/feedback, /referrals, /site-index, /levels return 200", async () => {
    for (const path of ["/api/mobile/feedback", "/api/mobile/referrals", "/api/mobile/site-index", "/api/mobile/levels"]) {
      const res = await fetch(`${baseUrl}${path}`);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
    }
  });

  it("GET /api/mobile/loksewa and /loksewa/:slug return sections and topic detail", async () => {
    const hub = await fetch(`${baseUrl}/api/mobile/loksewa`);
    expect(hub.status).toBe(200);
    const hubBody = await hub.json();
    expect(hubBody.data.sections.length).toBe(3);

    const detail = await fetch(`${baseUrl}/api/mobile/loksewa/geography-of-nepal`);
    expect(detail.status).toBe(200);
    const detailBody = await detail.json();
    expect(detailBody.data.topics.length).toBeGreaterThan(0);
    expect(detailBody.data.practice.length).toBeGreaterThan(0);

    const missing = await fetch(`${baseUrl}/api/mobile/loksewa/nonexistent`);
    expect(missing.status).toBe(404);
  });

  it("GET /api/mobile/world-knowledge and /world-knowledge/:slug return sections and topic detail", async () => {
    const hub = await fetch(`${baseUrl}/api/mobile/world-knowledge`);
    expect(hub.status).toBe(200);
    const hubBody = await hub.json();
    expect(hubBody.data.sections.length).toBe(3);

    const detail = await fetch(`${baseUrl}/api/mobile/world-knowledge/global-topics`);
    expect(detail.status).toBe(200);
    const detailBody = await detail.json();
    expect(detailBody.data.notes.length).toBeGreaterThan(0);
  });
});
