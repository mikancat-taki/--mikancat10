import { users, memos, chatMessages, quizScores, type User, type InsertUser, type Memo, type InsertMemo, type ChatMessage, type InsertChatMessage, type QuizScore, type InsertQuizScore } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Memo operations
  getMemo(id: number): Promise<Memo | undefined>;
  getMemosByUserId(userId: number): Promise<Memo[]>;
  createMemo(memo: InsertMemo): Promise<Memo>;
  updateMemo(id: number, memo: Partial<Memo>): Promise<Memo | undefined>;
  deleteMemo(id: number): Promise<boolean>;
  
  // Chat operations
  getChatMessages(limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Quiz operations
  getQuizScores(username: string, quizType?: string): Promise<QuizScore[]>;
  createQuizScore(score: InsertQuizScore): Promise<QuizScore>;
  getLeaderboard(quizType: string, level: string, limit?: number): Promise<QuizScore[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private memos: Map<number, Memo>;
  private chatMessages: Map<number, ChatMessage>;
  private quizScores: Map<number, QuizScore>;
  private currentUserId: number;
  private currentMemoId: number;
  private currentChatMessageId: number;
  private currentQuizScoreId: number;

  constructor() {
    this.users = new Map();
    this.memos = new Map();
    this.chatMessages = new Map();
    this.quizScores = new Map();
    this.currentUserId = 1;
    this.currentMemoId = 1;
    this.currentChatMessageId = 1;
    this.currentQuizScoreId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMemo(id: number): Promise<Memo | undefined> {
    return this.memos.get(id);
  }

  async getMemosByUserId(userId: number): Promise<Memo[]> {
    return Array.from(this.memos.values()).filter(
      (memo) => memo.userId === userId,
    );
  }

  async createMemo(insertMemo: InsertMemo): Promise<Memo> {
    const id = this.currentMemoId++;
    const memo: Memo = { 
      ...insertMemo, 
      id,
      createdAt: new Date()
    };
    this.memos.set(id, memo);
    return memo;
  }

  async updateMemo(id: number, updateData: Partial<Memo>): Promise<Memo | undefined> {
    const memo = this.memos.get(id);
    if (!memo) return undefined;
    
    const updatedMemo = { ...memo, ...updateData };
    this.memos.set(id, updatedMemo);
    return updatedMemo;
  }

  async deleteMemo(id: number): Promise<boolean> {
    return this.memos.delete(id);
  }

  async getChatMessages(limit: number = 50): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
    return messages.reverse();
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const message: ChatMessage = { 
      ...insertMessage, 
      id,
      timestamp: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getQuizScores(username: string, quizType?: string): Promise<QuizScore[]> {
    return Array.from(this.quizScores.values()).filter(
      (score) => score.username === username && (!quizType || score.quizType === quizType),
    );
  }

  async createQuizScore(insertScore: InsertQuizScore): Promise<QuizScore> {
    const id = this.currentQuizScoreId++;
    const score: QuizScore = { 
      ...insertScore, 
      id,
      completedAt: new Date()
    };
    this.quizScores.set(id, score);
    return score;
  }

  async getLeaderboard(quizType: string, level: string, limit: number = 10): Promise<QuizScore[]> {
    return Array.from(this.quizScores.values())
      .filter((score) => score.quizType === quizType && score.level === level)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
