export interface NavLink {
  name: string;
  to: string;
}

export interface Member {
  id: string;
  username: string;
  role: string;
  initials: string;
  isVIP?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  isOnline: boolean;
  discordId: string;
  avatarUrl?: string;
  roleIcon?: string;
  roleColor?: string;
}

export interface VoiceChannel {
  id: string;
  name: string;
  description: string;
  capacity: string;
}

export interface Rule {
  id: number;
  title: string;
  description: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: any;
  updatedAt: any;
}
