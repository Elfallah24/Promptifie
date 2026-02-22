
export enum PromptModel {
  GENERAL = 'General Image Prompt',
  STRUCTURED = 'Structured Prompt',
  GRAPHIC_DESIGN = 'Graphic Design',
  JSON = 'JSON Prompt',
  FLUX = 'Flux Prompt',
  MIDJOURNEY = 'Midjourney',
  STABLE_DIFFUSION = 'Stable Diffusion',
  GEMINI_PROMPT = 'Gemini Prompt'
}

export interface Creation {
  id: string;
  timestamp: number;
  prompt: string;
  imageUrl?: string;
  isFavorite: boolean;
  model: string;
  isPublished?: boolean;
}

export interface CommunityCreation extends Creation {
  userName: string;
  likes: number;
  hasLiked?: boolean;
}

export interface MarketplaceItem {
  id: string;
  sellerName: string;
  prompt: string;
  price: number; // in credits
  boughtBy: string[]; // list of emails
}

export interface StylePack {
  id: string;
  name: string;
  description: string;
  price: string;
  priceId: string;
  imageUrl: string;
}

export interface UserState {
  isSubscriber: boolean;
  tier: 'Free' | 'Standard' | 'Pro' | 'Ultimate' | 'Business';
  dailyUsesLeft: number;
  monthlyCredits: number;
  teamMembers: string[];
}

export interface InspirationItem {
  id: string;
  imageUrl: string;
  prompt: string;
  category: string;
}

export interface TutorialArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
}
