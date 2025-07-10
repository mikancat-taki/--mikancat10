import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertChatMessageSchema, insertMemoSchema, insertQuizScoreSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // WebSocket server for chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    
    ws.on('message', async (data) => {
      try {
        const messageData = JSON.parse(data.toString());
        if (messageData.type === 'chat') {
          const chatMessage = await storage.createChatMessage({
            username: messageData.username,
            message: messageData.message
          });
          
          // Broadcast to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'chat',
                data: chatMessage
              }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
  });
  
  // Translation API
  app.post('/api/translate', async (req, res) => {
    try {
      const { text, from, to } = req.body;
      
      // Simple translation logic - in production, use Google Translate API
      const translations: Record<string, Record<string, string>> = {
        'hello': { 'ja': 'こんにちは', 'zh': '你好', 'en': 'hello' },
        'goodbye': { 'ja': 'さようなら', 'zh': '再见', 'en': 'goodbye' },
        'thank you': { 'ja': 'ありがとう', 'zh': '谢谢', 'en': 'thank you' },
        'cat': { 'ja': 'ねこ', 'zh': '猫', 'en': 'cat' },
        'study': { 'ja': '勉強', 'zh': '学习', 'en': 'study' }
      };
      
      const lowerText = text.toLowerCase();
      const translation = translations[lowerText]?.[to] || text;
      
      res.json({ translation });
    } catch (error) {
      res.status(500).json({ error: 'Translation failed' });
    }
  });
  
  // Memo APIs
  app.get('/api/memos/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const memos = await storage.getMemosByUserId(userId);
      res.json(memos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch memos' });
    }
  });
  
  app.post('/api/memos', async (req, res) => {
    try {
      const memoData = insertMemoSchema.parse(req.body);
      const memo = await storage.createMemo(memoData);
      res.json(memo);
    } catch (error) {
      res.status(400).json({ error: 'Invalid memo data' });
    }
  });
  
  app.put('/api/memos/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const memo = await storage.updateMemo(id, updateData);
      if (!memo) {
        return res.status(404).json({ error: 'Memo not found' });
      }
      res.json(memo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update memo' });
    }
  });
  
  app.delete('/api/memos/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMemo(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Memo not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete memo' });
    }
  });
  
  // Chat APIs
  app.get('/api/chat/messages', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const messages = await storage.getChatMessages(limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch chat messages' });
    }
  });
  
  // Quiz APIs
  app.post('/api/quiz/score', async (req, res) => {
    try {
      const scoreData = insertQuizScoreSchema.parse(req.body);
      const score = await storage.createQuizScore(scoreData);
      res.json(score);
    } catch (error) {
      res.status(400).json({ error: 'Invalid score data' });
    }
  });
  
  app.get('/api/quiz/leaderboard/:quizType/:level', async (req, res) => {
    try {
      const { quizType, level } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await storage.getLeaderboard(quizType, level, limit);
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });
  
  return httpServer;
}
