import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const memos = pgTable("memos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const quizScores = pgTable("quiz_scores", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  quizType: text("quiz_type").notNull(),
  level: text("level").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMemoSchema = createInsertSchema(memos).pick({
  title: true,
  content: true,
  userId: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  username: true,
  message: true,
});

export const insertQuizScoreSchema = createInsertSchema(quizScores).pick({
  username: true,
  quizType: true,
  level: true,
  score: true,
  totalQuestions: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMemo = z.infer<typeof insertMemoSchema>;
export type Memo = typeof memos.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertQuizScore = z.infer<typeof insertQuizScoreSchema>;
export type QuizScore = typeof quizScores.$inferSelect;
