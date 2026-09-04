export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "OWNER";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole | null;
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
}

export interface AuthSignupResponse {
  user: SessionUser | null;
  message?: string;
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
}

export interface AIChatRequest {
  messages: AIChatMessage[];
  provider?: string;
}

export interface AIChatResponse {
  response: string;
  provider: string;
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
}
