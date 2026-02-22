
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Creation, CommunityCreation, MarketplaceItem, UserState } from './types';

type AuthMode = 'LOGIN' | 'SIGN_UP';

interface Toast {
  id: number;
  message: string;
}

interface CustomStyle {
  id: string;
  name: string;
  value: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string;
  userCoins: number;
  userTier: UserState['tier'];
  authModal: { isOpen: boolean; mode: AuthMode };
  creations: Creation[];
  communityItems: CommunityCreation[];
  marketplaceItems: MarketplaceItem[];
  teamMembers: string[];
  customStyles: CustomStyle[];
  preFilledPrompt: string | null;
  toasts: Toast[];
  dailyUsesLeft: number;
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (val: boolean) => void;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  login: (email: string, isNewUser?: boolean) => void;
  logout: () => void;
  consumeCoins: (amount: number) => boolean;
  addCoins: (amount: number) => void;
  addCreation: (creation: Omit<Creation, 'id' | 'timestamp' | 'isFavorite'>) => void;
  publishToCommunity: (id: string) => void;
  likeCommunityItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setPreFilledPrompt: (prompt: string | null) => void;
  showToast: (message: string) => void;
  buyPrompt: (itemId: string) => void;
  sellPrompt: (prompt: string, price: number) => void;
  addTeamMember: (email: string) => void;
  removeTeamMember: (email: string) => void;
  addCustomStyle: (name: string, value: string) => void;
  removeCustomStyle: (id: string) => void;
  consumeDailyUse: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USAGE_KEY_PREFIX = 'promptifie_usage_';
const ONBOARDING_KEY = 'promptifie_onboarding_';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userCoins, setUserCoins] = useState(0);
  const [userTier, setUserTier] = useState<UserState['tier']>('Free');
  const [creations, setCreations] = useState<Creation[]>([]);
  const [communityItems, setCommunityItems] = useState<CommunityCreation[]>([]);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [customStyles, setCustomStyles] = useState<CustomStyle[]>([
    { id: '1', name: 'Cinematic 8K', value: 'highly detailed, cinematic lighting, 8k resolution, hyper-realistic' },
    { id: '2', name: 'Vintage Analog', value: '35mm film photography, grain, soft colors, vintage aesthetic' }
  ]);
  const [preFilledPrompt, setPreFilledPrompt] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: AuthMode }>({
    isOpen: false,
    mode: 'LOGIN',
  });
  const [dailyUsesLeft, setDailyUsesLeft] = useState(5);
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState(true);

  useEffect(() => {
    if (isLoggedIn && userEmail) {
      const seen = localStorage.getItem(`${ONBOARDING_KEY}${userEmail}`);
      setHasSeenOnboardingState(seen === 'true');
    }
  }, [isLoggedIn, userEmail]);

  const setHasSeenOnboarding = (val: boolean) => {
    setHasSeenOnboardingState(val);
    if (userEmail) {
      localStorage.setItem(`${ONBOARDING_KEY}${userEmail}`, val.toString());
    }
  };

  useEffect(() => {
    if (isLoggedIn && userEmail && userTier === 'Free') {
      const today = new Date().toISOString().split('T')[0];
      const storageKey = `${USAGE_KEY_PREFIX}${userEmail}`;
      const savedData = localStorage.getItem(storageKey);
      
      if (savedData) {
        const { count, date } = JSON.parse(savedData);
        if (date === today) {
          setDailyUsesLeft(Math.max(0, 5 - count));
        } else {
          setDailyUsesLeft(5);
          localStorage.setItem(storageKey, JSON.stringify({ count: 0, date: today }));
        }
      } else {
        setDailyUsesLeft(5);
        localStorage.setItem(storageKey, JSON.stringify({ count: 0, date: today }));
      }
    } else if (userTier !== 'Free') {
      setDailyUsesLeft(999);
    }
  }, [isLoggedIn, userEmail, userTier]);

  const consumeDailyUse = () => {
    if (userTier === 'Free') {
      const today = new Date().toISOString().split('T')[0];
      const storageKey = `${USAGE_KEY_PREFIX}${userEmail}`;
      const currentCount = 5 - dailyUsesLeft;
      const newCount = currentCount + 1;
      
      setDailyUsesLeft(prev => Math.max(0, prev - 1));
      localStorage.setItem(storageKey, JSON.stringify({ count: newCount, date: today }));
    }
  };

  const openAuthModal = (mode: AuthMode = 'LOGIN') => setAuthModal({ isOpen: true, mode });
  const closeAuthModal = () => setAuthModal((prev) => ({ ...prev, isOpen: false }));

  const login = (email: string, isNewUser?: boolean) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    
    // Set Tier
    if (email.startsWith('biz')) setUserTier('Business');
    else if (email.startsWith('pro')) setUserTier('Pro');
    else if (email.startsWith('ult')) setUserTier('Ultimate');
    else setUserTier('Free');

    // Onboarding logic: If new user, set coins to 50 and trigger onboarding
    if (isNewUser) {
      setUserCoins(50);
      setHasSeenOnboarding(false);
    } else {
      setUserCoins(100); // Existing user gets some default
    }

    closeAuthModal();
    if (!isNewUser) showToast(`Welcome back, ${email.split('@')[0]}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserTier('Free');
    setUserCoins(0);
    showToast("Logged out successfully.");
  };

  const consumeCoins = (amount: number) => {
    if (userCoins >= amount) {
      setUserCoins((prev) => prev - amount);
      return true;
    }
    showToast("You don't have enough coins. Please upgrade your plan.");
    window.location.hash = '#/pricing';
    return false;
  };

  const addCoins = (amount: number) => setUserCoins(prev => prev + amount);

  const addCreation = (data: Omit<Creation, 'id' | 'timestamp' | 'isFavorite'>) => {
    const newCreation: Creation = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      isFavorite: false
    };
    setCreations(prev => [newCreation, ...prev]);
  };

  const publishToCommunity = (id: string) => {
    const creation = creations.find(c => c.id === id);
    if (creation) {
      const newItem: CommunityCreation = {
        ...creation,
        userName: userEmail.split('@')[0],
        likes: 0,
        isPublished: true
      };
      setCommunityItems(prev => [newItem, ...prev]);
      setCreations(prev => prev.map(c => c.id === id ? { ...c, isPublished: true } : c));
      showToast("Creation shared to community gallery!");
    }
  };

  const likeCommunityItem = (id: string) => {
    setCommunityItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.hasLiked ? item.likes - 1 : item.likes + 1,
          hasLiked: !item.hasLiked
        };
      }
      return item;
    }));
  };

  const toggleFavorite = (id: string) => {
    setCreations(prev => prev.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  const sellPrompt = (prompt: string, price: number) => {
    const newItem: MarketplaceItem = {
      id: Math.random().toString(36).substr(2, 9),
      sellerName: userEmail.split('@')[0],
      prompt,
      price,
      boughtBy: []
    };
    setMarketplaceItems(prev => [newItem, ...prev]);
    showToast(`Prompt listed for ${price} coins!`);
  };

  const buyPrompt = (itemId: string) => {
    const item = marketplaceItems.find(i => i.id === itemId);
    if (!item) return;
    if (item.boughtBy.includes(userEmail)) {
      showToast("Already owned.");
      return;
    }
    if (consumeCoins(item.price)) {
      setMarketplaceItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, boughtBy: [...i.boughtBy, userEmail] } : i
      ));
      showToast("Prompt purchased!");
    }
  };

  const addTeamMember = (email: string) => {
    if (teamMembers.length >= 4) {
      showToast("Seats full.");
      return;
    }
    setTeamMembers(prev => [...prev, email]);
    showToast(`Invited ${email}`);
  };

  const removeTeamMember = (email: string) => {
    setTeamMembers(prev => prev.filter(m => m !== email));
    showToast(`Removed ${email}`);
  };

  const addCustomStyle = (name: string, value: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setCustomStyles(prev => [...prev, { id, name, value }]);
    showToast(`Style "${name}" saved!`);
  };

  const removeCustomStyle = (id: string) => {
    setCustomStyles(prev => prev.filter(s => s.id !== id));
    showToast("Style removed.");
  };

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, userEmail, userCoins, userTier, authModal, creations, communityItems, marketplaceItems, teamMembers, customStyles, preFilledPrompt, toasts, dailyUsesLeft, hasSeenOnboarding,
        setHasSeenOnboarding, openAuthModal, closeAuthModal, login, logout, consumeCoins, addCoins, addCreation, publishToCommunity, likeCommunityItem, toggleFavorite, setPreFilledPrompt, showToast,
        buyPrompt, sellPrompt, addTeamMember, removeTeamMember, addCustomStyle, removeCustomStyle, consumeDailyUse
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
