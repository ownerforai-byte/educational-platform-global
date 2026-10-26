import { Router, Request, Response } from "express";
import { rateLimit } from "../middleware/rateLimit";

/**
 * Guest Veer access is intentionally closed. Public visitors can use the
 * public home experience; chat is available through the signed-in AI route.
 */
const router = Router();

router.post("/", rateLimit, (_req: Request, res: Response) => {
  res.status(403).json({
    error: "Veer chat is for members",
    message: "Sign in with an approved account. Members get 3 Veer chats per day.",
  });
});

export default router;
