import { z } from "zod";

export const mcqSchema = z.object({
  id: z.string().min(1),
  prompt: z.string().min(5),
  options: z.array(z.string().min(1)).length(4),
  correctIndex: z.number().int().min(0).max(3),
  explanation: z.string().optional(),
});

export const examSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  durationMin: z.number().int().positive(),
  questions: z.array(mcqSchema).min(1).max(50),
});

export type Mcq = z.infer<typeof mcqSchema>;
export type Exam = z.infer<typeof examSchema>;
