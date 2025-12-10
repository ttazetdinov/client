import { z } from "zod";

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'Admin' | 'User' | 'Guest';
  status: 'Active' | 'Inactive' | 'Suspended';
  createdAt: string;
}

export interface Profile {
  id: string;
  username: string;
  email?: string;
  name?: string;
  displayName?: string;
  bio?: string;
  city?: string;
  location?: string;
  interests?: string[];
  isPublic?: boolean;
  website?: string;
  memberSince?: string;
  accountCreationDate?: string;
  eventsAttended?: number;
  profilePicture?: Array<{ url: string; filename: string }>;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  maxAttendees?: number;
  attendees?: number;
  price?: string;
  vipOnly?: boolean;
  featured?: boolean;
  category?: 'Brunch' | 'Celebration' | 'Gala' | 'Lounge' | 'Other';
  eventImage?: Array<{ url: string; filename: string }>;
  profilesAttending?: string[];
  createdTime?: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatarInitial?: string;
  lastMessagePreview?: string;
  lastMessageTime?: string;
  onlineStatus?: boolean;
  unreadCount?: number;
  participantProfile?: string[];
  chatMessages?: string[];
  createdTime?: string;
}

export interface Message {
  id: string;
  text: string;
  timeSent?: string;
  read?: boolean;
  senderRole?: 'Me' | 'Them';
  senderProfile?: string[];
  conversation?: string[];
  sentimentAI?: string;
  personMentionedAI?: string;
  attachments?: Array<{ url: string; filename: string; type?: string }>;
  createdTime?: string;
}

export interface Notification {
  id: string;
  name: string;
  type?: 'comment' | 'event' | 'follow' | 'like' | 'mention' | 'photo';
  icon?: 'Calendar' | 'Camera' | 'Heart' | 'MessageCircle' | 'Star' | 'UserPlus';
  preview?: string;
  action?: string;
  timeDisplayAgo?: string;
  timestamp?: string;
  avatarInitial?: string;
  unread?: boolean;
  relatedUserProfile?: string[];
  priorityScoreAI?: number;
  createdTime?: string;
}

export interface AuthPayload {
  accessToken: string;
  user: User;
}

export interface InsertUser {
  email: string;
  password: string;
  username: string;
  role?: 'Admin' | 'User' | 'Guest';
  status?: 'Active' | 'Inactive' | 'Suspended';
}

export interface InsertProfile {
  username: string;
  email?: string;
  name?: string;
  displayName?: string;
  bio?: string;
  city?: string;
  location?: string;
  interests?: string[];
  isPublic?: boolean;
  website?: string;
}

export interface InsertEvent {
  title: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  maxAttendees?: number;
  price?: string;
  vipOnly?: boolean;
  featured?: boolean;
  category?: 'Brunch' | 'Celebration' | 'Gala' | 'Lounge' | 'Other';
}

export interface InsertMessage {
  text: string;
  conversation?: string[];
  senderProfile?: string[];
  senderRole?: 'Me' | 'Them';
  timeSent?: string;
  read?: boolean;
}

export interface InsertNotification {
  name: string;
  type?: 'comment' | 'event' | 'follow' | 'like' | 'mention' | 'photo';
  icon?: 'Calendar' | 'Camera' | 'Heart' | 'MessageCircle' | 'Star' | 'UserPlus';
  preview?: string;
  action?: string;
  timeDisplayAgo?: string;
  timestamp?: string;
  avatarInitial?: string;
  unread?: boolean;
  relatedUserProfile?: string[];
}

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  displayName: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  interests: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  website: z.string().url().optional(),
});

export const insertEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  maxAttendees: z.number().int().positive().optional(),
  price: z.string().optional(),
  vipOnly: z.boolean().optional(),
  featured: z.boolean().optional(),
  category: z.enum(['Brunch', 'Celebration', 'Gala', 'Lounge', 'Other']).optional(),
});

export const insertMessageSchema = z.object({
  text: z.string().min(1).max(2000),
  conversation: z.array(z.string()).optional(),
  senderProfile: z.array(z.string()).optional(),
  senderRole: z.enum(['Me', 'Them']).optional(),
});
