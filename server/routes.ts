import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { 
  registerSchema, loginSchema, insertEventSchema, insertMessageSchema,
  profileUpdateSchema
} from "@shared/schema";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    accessToken?: string;
    username?: string;
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId || !req.session.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function getToken(req: Request): string | undefined {
  return req.session.accessToken;
}

export async function registerRoutes(app: Express): Promise<void> {
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      
      const authPayload = await storage.register({
        email: data.email,
        password: data.password,
        username: data.username,
      });
      
      req.session.userId = authPayload.user.id;
      req.session.accessToken = authPayload.accessToken;
      req.session.username = authPayload.user.username;
      
      res.json({ user: authPayload.user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const DEMO_USER = {
    id: "demo-user-123",
    email: "demo@example.com",
    name: "Demo User",
    username: "demouser",
    bio: "This is a demo account for testing purposes.",
    city: "Brussels",
    country: "Belgium",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    isVip: true,
    isOnline: true,
    interests: ["Technology", "Design", "Music"],
    languages: ["English", "French"],
    socialLinks: { instagram: "@demouser", twitter: "@demouser" },
    createdAt: new Date().toISOString(),
  };
  const DEMO_PASSWORD = "demo123";

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      
      if (data.email === DEMO_USER.email && data.password === DEMO_PASSWORD) {
        req.session.userId = DEMO_USER.id;
        req.session.accessToken = "demo-token";
        req.session.username = DEMO_USER.username;
        return res.json({ user: DEMO_USER });
      }
      
      const authPayload = await storage.login(data.email, data.password);
      
      req.session.userId = authPayload.user.id;
      req.session.accessToken = authPayload.accessToken;
      req.session.username = authPayload.user.username;
      
      res.json({ user: authPayload.user });
    } catch (error: any) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/auth/logout", requireAuth, async (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId || !req.session.accessToken) {
      return res.json({ user: null });
    }
    
    if (req.session.userId === DEMO_USER.id) {
      return res.json({ user: DEMO_USER });
    }
    
    const token = getToken(req);
    const user = await storage.getUser(req.session.userId, token);
    if (!user) {
      return res.json({ user: null });
    }
    
    res.json({ user });
  });

  app.get("/api/profile/:id", async (req, res) => {
    const id = req.params.id;
    const token = getToken(req);
    
    const profile = await storage.getProfile(id, token);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  });

  app.get("/api/profile/username/:username", async (req, res) => {
    const username = req.params.username;
    const token = getToken(req);
    
    const profile = await storage.getProfileByUsername(username, token);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  });

  app.put("/api/profile", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const token = getToken(req);
      const validatedData = profileUpdateSchema.parse(req.body);
      
      const profile = await storage.updateProfile(userId, validatedData, token);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error" });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/members", async (req, res) => {
    const { vip, online, city } = req.query;
    const token = getToken(req);
    
    const members = await storage.getMembers({
      vip: vip === "true",
      online: online === "true",
      city: city as string,
    }, token);
    
    res.json(members);
  });

  app.get("/api/events", async (req, res) => {
    const { vipOnly, featured } = req.query;
    const token = getToken(req);
    
    const events = await storage.getEvents({
      vipOnly: vipOnly === "true",
      featured: featured === "true",
    }, token);
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const id = req.params.id;
    const token = getToken(req);
    
    const event = await storage.getEvent(id, token);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    res.json(event);
  });

  app.post("/api/events", requireAuth, async (req, res) => {
    try {
      const data = insertEventSchema.parse(req.body);
      const token = getToken(req);
      
      const event = await storage.createEvent(data, token);
      res.json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/conversations", requireAuth, async (req, res) => {
    const token = getToken(req);
    const conversations = await storage.getConversations(req.session.userId!, token);
    res.json(conversations);
  });

  app.post("/api/conversations", requireAuth, async (req, res) => {
    try {
      const { name, participantProfile } = req.body;
      const token = getToken(req);
      const conversation = await storage.getOrCreateConversation(name, participantProfile, token);
      res.json(conversation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/conversations/:id/messages", requireAuth, async (req, res) => {
    const conversationId = req.params.id;
    const token = getToken(req);
    const messages = await storage.getMessages(conversationId, token);
    
    await storage.markMessagesRead(conversationId, token);
    res.json(messages);
  });

  app.post("/api/conversations/:id/messages", requireAuth, async (req, res) => {
    try {
      const conversationId = req.params.id;
      const token = getToken(req);
      const messageData = insertMessageSchema.parse(req.body);
      
      const message = await storage.sendMessage({
        ...messageData,
        conversation: [conversationId],
        senderRole: 'Me',
        timeSent: new Date().toISOString(),
      }, token);
      
      res.json(message);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid message data" });
      }
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/notifications", requireAuth, async (req, res) => {
    const token = getToken(req);
    const notifications = await storage.getNotifications(token);
    res.json(notifications);
  });

  app.patch("/api/notifications/:id/read", requireAuth, async (req, res) => {
    const id = req.params.id;
    const token = getToken(req);
    await storage.markNotificationRead(id, token);
    res.json({ success: true });
  });

  app.post("/api/notifications/read-all", requireAuth, async (req, res) => {
    const token = getToken(req);
    await storage.markAllNotificationsRead(token);
    res.json({ success: true });
  });
}
