import { graphqlRequest, queries, mutations } from "./graphql-client";
import type {
  User, InsertUser, Profile, InsertProfile,
  Event, InsertEvent, Message, InsertMessage,
  Notification, InsertNotification, Conversation,
  AuthPayload
} from "@shared/schema";

export interface IStorage {
  login(email: string, password: string): Promise<AuthPayload>;
  register(data: { email: string; password: string; username: string }): Promise<AuthPayload>;
  
  getUser(id: string, token?: string): Promise<User | undefined>;
  getUserByEmail(email: string, token?: string): Promise<User | undefined>;
  getUserByUsername(username: string, token?: string): Promise<User | undefined>;
  createUser(user: InsertUser, token?: string): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>, token?: string): Promise<User | undefined>;
  getMembers(filter?: { vip?: boolean; online?: boolean; city?: string }, token?: string): Promise<Profile[]>;
  
  getProfile(id: string, token?: string): Promise<Profile | undefined>;
  getProfileByUsername(username: string, token?: string): Promise<Profile | undefined>;
  updateProfile(id: string, data: Partial<InsertProfile>, token?: string): Promise<Profile | undefined>;
  
  getEvents(filter?: { vipOnly?: boolean; featured?: boolean }, token?: string): Promise<Event[]>;
  getEvent(id: string, token?: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent, token?: string): Promise<Event>;
  
  getConversations(userId: string, token?: string): Promise<Conversation[]>;
  getOrCreateConversation(name: string, participantProfile?: string[], token?: string): Promise<Conversation>;
  getMessages(conversationId: string, token?: string): Promise<Message[]>;
  sendMessage(message: InsertMessage, token?: string): Promise<Message>;
  markMessagesRead(conversationId: string, token?: string): Promise<void>;
  
  getNotifications(token?: string): Promise<Notification[]>;
  markNotificationRead(id: string, token?: string): Promise<void>;
  markAllNotificationsRead(token?: string): Promise<void>;
  createNotification(notification: InsertNotification, token?: string): Promise<Notification>;
}

export class GraphQLStorage implements IStorage {
  async login(email: string, password: string): Promise<AuthPayload> {
    const data = await graphqlRequest<{ login: AuthPayload }>(
      mutations.login,
      { loginInput: { email, password } }
    );
    return data.login;
  }

  async register(input: { email: string; password: string; username: string }): Promise<AuthPayload> {
    const data = await graphqlRequest<{ register: AuthPayload }>(
      mutations.register,
      { registerInput: input }
    );
    return data.register;
  }

  async getUser(id: string, token?: string): Promise<User | undefined> {
    try {
      const data = await graphqlRequest<{ user: User }>(
        queries.getUser,
        { id },
        token
      );
      return data.user;
    } catch {
      return undefined;
    }
  }

  async getUserByEmail(email: string, token?: string): Promise<User | undefined> {
    try {
      const data = await graphqlRequest<{ users: User[] }>(
        queries.getUsers,
        { pagination: { limit: 100 } },
        token
      );
      return data.users.find(u => u.email === email);
    } catch {
      return undefined;
    }
  }

  async getUserByUsername(username: string, token?: string): Promise<User | undefined> {
    try {
      const data = await graphqlRequest<{ users: User[] }>(
        queries.getUsers,
        { pagination: { limit: 100 } },
        token
      );
      return data.users.find(u => u.username === username);
    } catch {
      return undefined;
    }
  }

  async createUser(user: InsertUser, token?: string): Promise<User> {
    const data = await graphqlRequest<{ createUser: User }>(
      mutations.createUser,
      { createUserInput: user },
      token
    );
    return data.createUser;
  }

  async updateUser(id: string, updateData: Partial<InsertUser>, token?: string): Promise<User | undefined> {
    try {
      const data = await graphqlRequest<{ updateUser: User }>(
        mutations.updateUser,
        { updateUserInput: { id, ...updateData } },
        token
      );
      return data.updateUser;
    } catch {
      return undefined;
    }
  }

  async getMembers(filter?: { vip?: boolean; online?: boolean; city?: string }, token?: string): Promise<Profile[]> {
    try {
      const data = await graphqlRequest<{ publicProfiles: Profile[] }>(
        queries.getPublicProfiles,
        {},
        token
      );
      let profiles = data.publicProfiles;
      
      if (filter?.city) {
        profiles = profiles.filter(p => p.city === filter.city);
      }
      
      return profiles;
    } catch {
      return [];
    }
  }

  async getProfile(id: string, token?: string): Promise<Profile | undefined> {
    try {
      const data = await graphqlRequest<{ profile: Profile }>(
        queries.getProfile,
        { id },
        token
      );
      return data.profile;
    } catch {
      return undefined;
    }
  }

  async getProfileByUsername(username: string, token?: string): Promise<Profile | undefined> {
    try {
      const data = await graphqlRequest<{ profileByUsername: Profile | null }>(
        queries.getProfileByUsername,
        { username },
        token
      );
      return data.profileByUsername || undefined;
    } catch {
      return undefined;
    }
  }

  async updateProfile(id: string, updateData: Partial<InsertProfile>, token?: string): Promise<Profile | undefined> {
    try {
      const data = await graphqlRequest<{ updateProfile: Profile }>(
        mutations.updateProfile,
        { updateProfileInput: { id, ...updateData } },
        token
      );
      return data.updateProfile;
    } catch {
      return undefined;
    }
  }

  async getEvents(filter?: { vipOnly?: boolean; featured?: boolean }, token?: string): Promise<Event[]> {
    try {
      let query = queries.getEvents;
      
      if (filter?.featured) {
        query = queries.getFeaturedEvents;
        const data = await graphqlRequest<{ featuredEvents: Event[] }>(query, {}, token);
        return data.featuredEvents;
      }
      
      if (filter?.vipOnly) {
        query = queries.getVipEvents;
        const data = await graphqlRequest<{ vipEvents: Event[] }>(query, {}, token);
        return data.vipEvents;
      }
      
      const data = await graphqlRequest<{ events: Event[] }>(query, {}, token);
      return data.events;
    } catch {
      return [];
    }
  }

  async getEvent(id: string, token?: string): Promise<Event | undefined> {
    try {
      const data = await graphqlRequest<{ event: Event }>(
        queries.getEvent,
        { id },
        token
      );
      return data.event;
    } catch {
      return undefined;
    }
  }

  async createEvent(event: InsertEvent, token?: string): Promise<Event> {
    const data = await graphqlRequest<{ createEvent: Event }>(
      mutations.createEvent,
      { createEventInput: event },
      token
    );
    return data.createEvent;
  }

  async getConversations(_userId: string, token?: string): Promise<Conversation[]> {
    try {
      const data = await graphqlRequest<{ conversations: Conversation[] }>(
        queries.getConversations,
        {},
        token
      );
      return data.conversations;
    } catch {
      return [];
    }
  }

  async getOrCreateConversation(name: string, participantProfile?: string[], token?: string): Promise<Conversation> {
    const data = await graphqlRequest<{ createConversation: Conversation }>(
      mutations.createConversation,
      { 
        createConversationInput: { 
          name,
          participantProfile,
          unreadCount: 0,
          onlineStatus: false 
        } 
      },
      token
    );
    return data.createConversation;
  }

  async getMessages(conversationId: string, token?: string): Promise<Message[]> {
    try {
      const data = await graphqlRequest<{ messagesByConversation: Message[] }>(
        queries.getMessagesByConversation,
        { conversationId },
        token
      );
      return data.messagesByConversation;
    } catch {
      return [];
    }
  }

  async sendMessage(message: InsertMessage, token?: string): Promise<Message> {
    const data = await graphqlRequest<{ createChatMessage: Message }>(
      mutations.createChatMessage,
      { createChatMessageInput: message },
      token
    );
    return data.createChatMessage;
  }

  async markMessagesRead(conversationId: string, token?: string): Promise<void> {
    await graphqlRequest(
      mutations.markConversationAsRead,
      { id: conversationId },
      token
    );
  }

  async getNotifications(token?: string): Promise<Notification[]> {
    try {
      const data = await graphqlRequest<{ notifications: Notification[] }>(
        queries.getNotifications,
        {},
        token
      );
      return data.notifications;
    } catch {
      return [];
    }
  }

  async markNotificationRead(id: string, token?: string): Promise<void> {
    await graphqlRequest(
      mutations.markNotificationAsRead,
      { id },
      token
    );
  }

  async markAllNotificationsRead(token?: string): Promise<void> {
    const notifications = await this.getNotifications(token);
    const unread = notifications.filter(n => n.unread);
    await Promise.all(unread.map(n => this.markNotificationRead(n.id, token)));
  }

  async createNotification(notification: InsertNotification, token?: string): Promise<Notification> {
    const data = await graphqlRequest<{ createNotification: Notification }>(
      mutations.createNotification,
      { createNotificationInput: notification },
      token
    );
    return data.createNotification;
  }
}

export const storage = new GraphQLStorage();
