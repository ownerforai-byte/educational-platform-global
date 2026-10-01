export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "OWNER";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole | null;
  credits?: number;
  creditsLimit?: number;
  premiumStatus?: boolean;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthSignupRequest {
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthLoginResponse {
  user: SessionUser;
  accessToken?: string;
}

export interface AuthSignupResponse {
  user: SessionUser | null;
  message?: string;
  accessToken?: string;
  /** Owner-approval flow: signed token for the /welcome status screen. */
  statusToken?: string;
  accessStatus?: "PENDING" | "ACTIVE" | "REJECTED";
}

export interface AuthRefreshResponse {
  user: SessionUser;
  accessToken?: string;
}

export interface AuthLogoutResponse {
  ok: true;
}

export interface AuthMeResponse {
  user: SessionUser | null;
}

export interface EducationLevel {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  order?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface Class {
  id: string;
  education_level_id: string;
  slug: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  order?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface Subject {
  id: string;
  class_id: string;
  slug: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  order?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  slug: string;
  title: string;
  description?: string | null;
  is_active: boolean;
  order?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface Topic {
  id: string;
  chapter_id: string;
  slug: string;
  title: string;
  description?: string | null;
  is_active: boolean;
  order?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface Resource {
  id: string;
  topic_id: string;
  type: string;
  title: string;
  content: Record<string, unknown>;
  media_url?: string | null;
  metadata?: Record<string, unknown>;
  created_by: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ResourceCreateRequest {
  topic_id: string;
  type: string;
  title: string;
  content?: Record<string, unknown>;
  media_url?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ResourceUpdateRequest {
  topic_id?: string;
  type?: string;
  title?: string;
  content?: Record<string, unknown>;
  media_url?: string | null;
  metadata?: Record<string, unknown>;
  is_published?: boolean;
}

export interface ResourceLinkRequest {
  resource_id: string;
  referenced_id: string;
  reference_type: string;
  attribution?: string | null;
}

export interface ResourceReference {
  id: string;
  resource_id: string;
  referenced_id: string;
  reference_type: string;
  attribution?: string | null;
  created_at?: string;
}

export interface SubjectWithChapters {
  subject: Subject;
  chapters: Chapter[];
}

export interface LevelWithClasses {
  level: EducationLevel;
  classes: Class[];
}

export interface ClassWithSubjects {
  class: Class;
  subjects: Subject[];
}

export interface ChapterWithTopics {
  chapter: Chapter;
  topics: Topic[];
  progress: {
    completed: number;
    total: number;
  };
}

export interface TopicWithResources {
  topic: Topic;
  resources: Resource[];
}

export interface ProgressTopic {
  slug: string;
  title: string;
  chapter?: {
    slug: string;
    title: string;
    subject?: {
      slug: string;
      name: string;
      class?: {
        slug: string;
        name: string;
      };
    };
  };
}

export interface ProgressEntry {
  id: string;
  topicId: string;
  completed: boolean;
  completedAt: string | null;
  updatedAt: string;
  topic?: ProgressTopic;
}

export interface ProgressUpdateRequest {
  topic_id: string;
  completed: boolean;
}

export interface BookmarkResource {
  title: string;
  type: string;
  topic_id: string;
}

export interface Bookmark {
  id: string;
  resource_id: string;
  folder?: string | null;
  notes?: string | null;
  created_at?: string;
  resources?: BookmarkResource;
}

export interface BookmarkCreateRequest {
  resource_id: string;
  folder?: string | null;
  notes?: string | null;
}

export interface BookmarkDeleteResponse {
  success: true;
}

export interface ExamSummary {
  slug: string;
  title: string;
  durationMin: number;
  questionCount: number;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
  marks?: number;
}

export interface Exam {
  slug: string;
  title: string;
  durationMin: number;
  questions: ExamQuestion[];
}

export interface TestItem {
  id: string;
  title: string;
  type: string;
  topic_id: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
}

export interface PyqItem {
  id: string;
  title: string;
  type: string;
  topic_id: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
}

export interface RNotesResponse {
  subjects: string[];
  chapters: string[];
}

export interface RavikishanNotesResponse {
  [key: string]: unknown;
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: string;
  chapter: string;
  subject: string;
  class: string;
  url: string;
}

export interface SyllabusHint {
  subject: string;
  unit: string;
  topics: string[];
}

export interface SearchResponse {
  query: string;
  results: SearchResultItem[];
  fallbackMessage?: string;
  syllabusHints?: SyllabusHint[];
  officialLink?: string;
}

export interface AIChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  /**
   * Photo data URLs (camera / gallery) attached to this message. Only the
   * LAST user message's images are forwarded to the model.
   */
  images?: string[];
}

export interface AIChatRequest {
  messages: AIChatMessage[];
  provider?: string;
  stream?: boolean;
  /** Photos for the latest user turn (max 3, data URLs). */
  images?: string[];
  /**
   * Dedicated chat console id ("nepali" = pure-Nepali NEB console,
   * "grammar" = English grammar console). The server appends the console's
   * rule block as the LAST part of the system prompt; unknown ids ignored.
   */
  console?: string;
}

export interface AIChatResponse {
  response: string;
  provider: string;
  /** How many attached photos were accepted / dropped (size or count caps). */
  images?: { accepted: number; rejected: number };
  /** Credits left after this message's 1-credit spend (logged users). */
  credits?: number;
  /** Guest messages left in today's 5-message pool. */
  remaining?: number;
  /** The guest daily pool size (2). */
  limit?: number;
}

export interface AISearchRequest {
  query: string;
  provider?: string;
}

export interface ApiError {
  error: string;
}

export interface GeneratedQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  difficulty: "easy" | "intermediate" | "hard";
  subject: string;
  topic: string;
  explanation: string;
}

export interface GenerateQuestionsRequest {
  classSlug: string;
  subjectSlug: string;
  topic?: string;
  difficulty?: "easy" | "intermediate" | "hard";
  count?: number;
}

export interface GenerateQuestionsResponse {
  questions: GeneratedQuestion[];
  provider: string;
  topic?: string;
  /** Guest pool only: messages left AFTER this generation (server-attested). */
  remaining?: number;
  /** Guest pool only: the daily limit the remaining was measured against. */
  limit?: number;
}

/* ------------------------------------------------------------------ *
 * ADDITIVE (perf/resilience pass, 2026-09-27).
 * Types for the new caching + error-normalization layers. Every interface
 * above is unchanged; these are new exports only.
 * ------------------------------------------------------------------ */

/**
 * Generic error envelope the backend returns. Mirrors the fields
 * `lib/api-client.ts` already reads off a failed response body.
 */
export interface ApiErrorEnvelope {
  error: string;
  /** Human-facing explanation ("You've used all 4 credits…"). */
  message?: string;
  /** Correlation id logged server-side and echoed as `x-error-id`. */
  errorId?: string;
  /** Machine-readable reason (e.g. PENDING_APPROVAL / ACCOUNT_REJECTED). */
  code?: string;
  /** Signed token that opens the /welcome status screen. */
  statusToken?: string;
}

/** A value plus the cache metadata the additive layer tracks for it. */
export interface CachedResponse<T> {
  data: T;
  /** Epoch ms when the value was stored. */
  fetchedAt: number;
  /** Age in ms at the time it was read. */
  ageMs: number;
  /** True once the fresh window has elapsed (a background refresh starts). */
  isStale: boolean;
}

/** Conventional paginated payload (used by list endpoints in the docs). */
export interface PaginatedResponse<T> {
  items: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  hasMore?: boolean;
}

/** Transport-level knobs shared by the additive helpers. */
export interface RequestTuning {
  /** Per-request timeout in ms; `0` disables the timeout. */
  timeoutMs?: number;
  /** Caller abort signal (unmount / route change). */
  signal?: AbortSignal;
  /** Retries for transient failures, in addition to the first attempt. */
  retries?: number;
}

/** Options accepted by the additive `apiGet`-style prefetchers. */
export interface PrefetchTuning extends RequestTuning {
  /** Cache key variant (e.g. user id) so scoped reads never collide. */
  variant?: string;
  /** Never touch the cache — always hit the network. */
  noStore?: boolean;
}

