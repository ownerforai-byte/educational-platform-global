import { Router, Request, Response, NextFunction } from "express";
import { serverError } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { rateLimit } from "../middleware/rateLimit";
import { getUserFromRequest, type AuthedRequest } from "../middleware/auth";
import { requireCredit } from "../middleware/creditCheck";
import {
  GUEST_DAILY_LIMIT,
  consumeGuestSlot,
  getGuestDeviceId,
  issueGuestDeviceCookie,
  rollbackGuestSlot,
} from "../utils/guestQuota";
import { DAILY_CREDIT_POOL } from "../utils/credits";
import { getClientIp } from "../utils/clientIp";

const router = Router();

let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

type GuestGateRequest = Request & {
  guestSlot?: { ip: string; deviceId: string; remaining: number };
};

/**
 * Access gate: open for signed-in members (credit pool) and metered for guests.
 */
async function authOrGuestQuota(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await getUserFromRequest(req);
    if (user) {
      (req as AuthedRequest).user = user;
      next();
      return;
    }

    const ip = getClientIp(req);
    const deviceId = getGuestDeviceId(req) ?? issueGuestDeviceCookie(res);
    const slot = await consumeGuestSlot(ip, deviceId);
    if (slot.status === "limited") {
      res.status(402).json({
        error: "Sign in required",
        remaining: 0,
        limit: GUEST_DAILY_LIMIT,
        message: `You've used your free trial for today. Sign in to keep going — members get ${DAILY_CREDIT_POOL} daily credits and saved history.`,
      });
      return;
    }
    if (slot.status === "unavailable") {
      res.status(503).json({
        error: "Math solver is temporarily unavailable. Please try again in a moment.",
      });
      return;
    }

    (req as GuestGateRequest).guestSlot = { ip, deviceId, remaining: slot.remaining };
    res.on("finish", () => {
      if (res.statusCode >= 400) rollbackGuestSlot(ip, deviceId).catch(() => {});
    });
    next();
  } catch (err) {
    console.error("[ai-math] guest quota gate failed:", err);
    res.status(503).json({
      error: "Math solver is temporarily unavailable. Please try again in a moment.",
    });
  }
}

const creditIfAuthed = requireCredit("aiChat");

function creditGate(req: Request, res: Response, next: NextFunction): void {
  if ((req as AuthedRequest).user) {
    void creditIfAuthed(req, res, next);
    return;
  }
  next();
}

const MATH_SOLVER_SYSTEM_PROMPT = `You are Veer AI Math & Derivation Studio — an elite academic mathematical reasoning and derivation engine for NEB Class 11 and 12 Science students.

Your role is to solve mathematical problems, numerical physics questions, physical chemistry derivations, calculus proofs, and algebraic questions with complete, step-by-step mathematical rigor.

CORE PRINCIPLES:
1. STEP-BY-STEP RIGOR: Never skip algebraic steps or jumps. Explain each transformation cleanly.
2. FORMULA FORMATTING (LaTeX / KaTeX):
   - Always format standalone equations on their own lines using display math:
     \\[
     \\text{Equation here}
     \\]
   - Use inline math \\( ... \\) for variables, numbers with units, and brief expressions in sentences.
   - Use clean LaTeX notation: \\frac{a}{b}, \\sqrt{x}, \\int_{a}^{b}, \\lim_{x \\to a}, \\vec{v}, \\sum_{i=1}^{n}.
3. CLEAR ACADEMIC STRUCTURE:
   - **Problem Breakdown**: State given data, unknown variables, and standard SI units.
   - **Governing Theorems & Laws**: State the exact theorem, formula, or law used (e.g. L'Hôpital's Rule, Integration by Parts, Newton's 2nd Law, Bernoulli's Principle, Ideal Gas Law).
   - **Step-by-Step Derivation**: Number each logical step clearly. Show intermediate algebraic simplifications.
   - **Final Solution**: Boldly state the final result, including physical units where applicable (e.g. **\\( 5.4 \\times 10^3 \\text{ N} \\)** or **\\( x = \\frac{1}{2} \\)**).
   - **Verification / Sanity Check**: Provide a quick dimensional check, boundary value check, or reverse substitution to verify the result is 100% correct.
4. EXAM-ORIENTED TIPS:
   - Mention common pitfalls or algebraic traps students make on this exact type of problem in board exams.
5. NO HALLUCINATION: If a problem has no solution or contradictory constraints, rigorously prove why.`;

router.post(
  "/",
  rateLimit,
  authOrGuestQuota,
  creditGate,
  async (req: Request, res: Response) => {
    try {
      const {
        problem,
        subject = "mathematics",
        classLevel = "11",
        stepByStep = true,
        verification = true,
      } = req.body as {
        problem?: string;
        subject?: "mathematics" | "physics" | "chemistry";
        classLevel?: "11" | "12" | "general";
        stepByStep?: boolean;
        verification?: boolean;
      };

      if (!problem || typeof problem !== "string" || !problem.trim()) {
        res.status(400).json({ error: "A mathematical problem or derivation prompt is required." });
        return;
      }

      const cleanProblem = problem.trim().slice(0, 4000);
      const aiService = getService();

      const userPrompt = `Please solve the following ${subject.toUpperCase()} problem for Class ${classLevel}:

Problem / Derivation:
"""
${cleanProblem}
"""

Preferences:
- Detailed Step-by-Step: ${stepByStep ? "Yes, show all intermediate steps" : "Concise proof"}
- Include Verification: ${verification ? "Yes, include a sanity/verification check" : "Optional"}

Format with clean KaTeX LaTeX syntax for all equations and expressions.`;

      const messages: AIChatMessage[] = [
        { role: "system", content: MATH_SOLVER_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ];

      // Primary provider: Cerebras (qwen-3.8-27b) — industry-leading open-source math reasoning,
      // with automatic fallback to Groq -> Gemini -> Agnes in the configured chain.
      const solution = await aiService.chat("cerebras", messages);

      const guestSlot = (req as GuestGateRequest).guestSlot;

      res.json({
        solution,
        provider: aiService.getLastAnsweredBy(),
        subject,
        classLevel,
        ...(guestSlot
          ? { remaining: guestSlot.remaining, limit: GUEST_DAILY_LIMIT }
          : {}),
      });
    } catch (err: any) {
      console.error("[ai-math] error:", err);
      serverError(res, err);
    }
  }
);

export default router;

