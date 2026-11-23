#!/usr/bin/env node
/**
 * OpenAPI snapshot for public probes (PLATFORM_UPGRADE_MASTER_PLAN T2.4).
 *
 *   node backend/scripts/generate-openapi.mjs           # write docs/api/openapi.yaml
 *   node backend/scripts/generate-openapi.mjs --check   # fail on drift
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = path.join(ROOT, "docs", "api", "openapi.yaml");

const SPEC = `openapi: 3.1.0
info:
  title: NEB Study Vault API
  version: "2.0.0"
  description: |
    Public HTTP surface for Ravikisan's Platform.
    Legacy clients use \`/api/*\`; versioned probes live under \`/api/v2/*\`
    and return \`X-API-Version: 2\`.
servers:
  - url: https://us-central1-rn01-af00b.cloudfunctions.net/api
    description: Production (Cloud Functions \`api\` entry)
paths:
  /health:
    get:
      summary: Liveness probe (app root)
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Health"
  /api/ai/status:
    get:
      summary: AI configuration probe (boolean only)
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AiStatus"
  /api/v2/health:
    get:
      summary: Versioned health probe
      parameters:
        - in: header
          name: X-API-Version
          schema:
            type: string
            enum: ["2"]
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Health"
  /api/v2/ai/status:
    get:
      summary: Versioned AI status probe
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AiStatus"
  /api/v2/meta:
    get:
      summary: API version metadata
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ApiV2Meta"
components:
  schemas:
    Health:
      type: object
      required: [status, timestamp, commit]
      properties:
        status:
          type: string
          enum: [ok]
        timestamp:
          type: string
          format: date-time
        commit:
          type: string
          nullable: true
    AiStatus:
      type: object
      required: [configured, online]
      properties:
        configured:
          type: boolean
        online:
          type: boolean
    AppRequirements:
      type: object
      required: [appName, website, supportEmail, legal, clients]
      properties:
        appName:
          type: string
        website:
          type: string
          format: uri
        supportEmail:
          type: string
          format: email
        legal:
          type: object
          required: [privacy, terms, cookies, purchases, deleteAccount, dataSafety]
          properties:
            privacy:
              type: string
              format: uri
            terms:
              type: string
              format: uri
            cookies:
              type: string
              format: uri
            purchases:
              type: string
              format: uri
            deleteAccount:
              type: string
              format: uri
            dataSafety:
              type: string
              format: uri
        clients:
          type: object
          required: [androidPackage, minAndroidVersionCode]
          properties:
            androidPackage:
              type: string
            minAndroidVersionCode:
              type: integer
    ApiV2Meta:
      type: object
      required: [apiVersion, stable, legacyBase, deprecated, requirements]
      properties:
        apiVersion:
          type: integer
          enum: [2]
        stable:
          type: boolean
        legacyBase:
          type: string
          enum: ["/api"]
        deprecated:
          type: array
          items:
            type: string
        requirements:
          $ref: "#/components/schemas/AppRequirements"
`;

const check = process.argv.includes("--check");

if (check) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current !== SPEC) {
    console.error(`::error::${OUT} is out of date — run: node backend/scripts/generate-openapi.mjs`);
    process.exit(1);
  }
  console.log("openapi.yaml OK");
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, SPEC);
  console.log(`Wrote ${OUT}`);
}