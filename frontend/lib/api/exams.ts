import { apiFetch } from "../api-client";
import type {
  Exam,
  ExamSummary,
  PyqItem,
  TestItem,
} from "../../types/api";

/**
 * Get all available exams.
 */
export async function getExams(): Promise<ExamSummary[]> {
  return apiFetch<ExamSummary[]>("/api/exams");
}

/**
 * Get a single exam by slug.
 */
export async function getExam(slug: string): Promise<Exam> {
  return apiFetch<Exam>(`/api/exams/${encodeURIComponent(slug)}`);
}

/**
 * Get all published test resources.
 */
export async function getTests(): Promise<TestItem[]> {
  return apiFetch<TestItem[]>("/api/tests");
}

/**
 * Get all published previous year questions (PYQs).
 */
export async function getPyqs(): Promise<PyqItem[]> {
  return apiFetch<PyqItem[]>("/api/pyqs");
}
