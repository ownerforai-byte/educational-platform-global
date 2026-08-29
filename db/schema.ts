import {
  integer,
  jsonb,
  pgTable,
  smallint,
  smallserial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export interface ExamQuestion {
  id: number;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation?: string;
}

export const topics = pgTable("topics", {
  id: smallserial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 120 }).notNull(),
  subject: varchar("subject", { length: 24 }).notNull(),
  description: varchar("description", { length: 240 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const lessons = pgTable("lessons", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  topicId: integer("topic_id")
    .notNull()
    .references(() => topics.id),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  title: varchar("title", { length: 120 }).notNull(),
  contentMd: text("content_md").notNull(),
  estMinutes: smallint("est_minutes").default(30).notNull(),
});

export const exams = pgTable("exams", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar("slug", { length: 48 }).notNull().unique(),
  title: varchar("title", { length: 120 }).notNull(),
  durationMin: smallint("duration_min").notNull(),
  questions: jsonb("questions").$type<ExamQuestion[]>().notNull(),
});
