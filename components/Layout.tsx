
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Twitter, Linkedin, Github, Sun, Moon, User, Coins, LogOut, ChevronDown, 
  X, Mail, Lock, Eye, EyeOff, FolderHeart, Globe, ShoppingBag, 
  Layers, Heart, Check, Sparkles, Wand2, Maximize2, 
  Scissors, Microscope, Palette, Layout as LayoutIcon, Grid3X3, Eraser, ArrowRight, Image as ImageIcon, AlertTriangle, KeyRound, Settings
} from 'lucide-react';
import { useAuth } from '../AuthContext';

const MOCK_USERS = [
  { email: 'demo@promptifie.ai', password: 'password123' },
  { email: 'biz@studio.com', password: 'password123' },
  { email: 'pro@artist.com', password: 'password123' }
];

type AuthMode = 'LOGIN' | 'SIGN_UP' | 'VERIFY';

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void; initialMode: AuthMode; onLoginSuccess: (email: string, isNew: boolean) => void; }> = ({ isOpen, onClose, initialMode, onLoginSuccess }) => {
  const { showToast } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) { 
      setMode(initialMode); 
      setError(null); 
      setShowPassword(false); 
      setEmail('');
      setPassword('');
      setVerificationCode('');
      setGeneratedCode('');
    }
  }, [isOpen, initialMode]);

  const generateAndSendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    // Simulation: We show the code in a toast since we can't send a real email
    setTimeout(() => {
      showToast(`Verification code sent to ${email}: ${code}`);
    }, 500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      setError("Account already exists. Please login.");
      setMode('LOGIN');
      return;
    }
    // Transition to verification instead of logging in
    generateAndSendCode();
    setMode('VERIFY');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === generatedCode) {
      MOCK_USERS.push({ email, password });
      onLoginSuccess(email, true);
      onClose();
    } else {
      setError("Invalid code, please try again.");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      setError("Account not found. Please create one.");
      setMode('SIGN_UP');
      return;
    }
    if (user.password !== password) {
      setError("Incorrect password.");
      return;
    }
    onLoginSuccess(email, false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white dark:bg-charcoal-lighter rounded-[40px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-accent transition-colors"><X size={20} /></button>
        
        <div className="p-10">
          {mode === 'VERIFY' ? (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                  <KeyRound size={32} />
                </div>
                <h2 className="text-3xl font-black mb-3 text-charcoal dark:text-offwhite">Verify Your Email</h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  We've sent a 6-digit verification code to <span className="text-accent font-bold">{email}</span>. Please enter the code below to activate your account.
                </p>
              </div>

              {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-black animate-shake">{error}</div>}

              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Verification Code</label>
                  <input 
                    required 
                    type="text" 
                    maxLength={6}
                    value={verificationCode} 
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      setVerificationCode(val);
                      setError(null);
                    }} 
                    placeholder="000000" 
                    className="w-full bg-slate-50 dark:bg-charcoal border border-slate-200 dark:border-white/5 rounded-2xl py-5 text-center text-3xl font-black tracking-[0.5em] focus:outline-none focus:border-accent text-charcoal dark:text-offwhite placeholder:text-slate-200 dark:placeholder:text-white/5" 
                  />
                </div>
                <button type="submit" className="w-full py-5 bg-accent hover:bg-accent-hover text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-accent/20 active:scale-95 btn-haptic">
                  Verify Account
                </button>
              </form>

              <div className="text-center">
                <p className="text-sm font-medium text-slate-400">
                  Didn't receive the code? 
                  <button onClick={generateAndSendCode} className="ml-2 text-accent font-black hover:underline transition-all">Resend Code</button>
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black mb-3">
                  {mode === 'LOGIN' ? 'Sign in to your account' : 'Sign up to Join'}
                </h2>
                <p className="text-slate-500 text-sm font-medium">Authentication for Version 3.0 Platform.</p>
              </div>
              {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-black animate-shake">{error}</div>}
              <form onSubmit={mode === 'LOGIN' ? handleLogin : handleSignup} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="name@company.com" 
                      className="w-full bg-slate-50 dark:bg-charcoal border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-14 pr-4 text-sm focus:outline-none focus:border-accent text-charcoal dark:text-offwhite" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required 
                      type={showPassword ? 'text' : 'password'} 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      className="w-full bg-slate-50 dark:bg-charcoal border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-14 pr-14 text-sm focus:outline-none focus:border-accent text-charcoal dark:text-offwhite" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="w-full py-5 bg-accent hover:bg-accent-hover text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-accent/20 active:scale-95 mt-4 btn-haptic">
                  {mode === 'LOGIN' ? 'Sign in' : 'Sign up'}
                </button>
              </form>
              <button onClick={() => { setMode(mode === 'LOGIN' ? 'SIGN_UP' : 'LOGIN'); setError(null); }} className="w-full mt-8 text-sm font-black text-slate-500 hover:text-accent transition-colors">
                {mode === 'LOGIN' ? "Request new access credentials" : "Return to portal access"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const OnboardingFlow: React.FC = () => {
  const { isLoggedIn, hasSeenOnboarding, setHasSeenOnboarding } = useAuth();
  const [step, setStep] = useState<'welcome' | 'warning' | 'tour' | null>(null);
  const [tourIndex, setTourIndex] = useState(0);

  const toolsRef = useRef<HTMLElement | null>(null);
  const coinsRef = useRef<HTMLElement | null>(null);
  const creationsRef = useRef<HTMLElement | null>(null);
  const profileRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isLoggedIn && !hasSeenOnboarding) {
      setStep('welcome');
    }
  }, [isLoggedIn, hasSeenOnboarding]);

  const closeWelcome = () => setStep('warning');
  const closeWarning = () => {
    setStep('tour');
    setTourIndex(0);
  };

  const nextTourStep = () => {
    if (tourIndex < 4) {
      setTourIndex(tourIndex + 1);
    } else {
      setStep(null);
      setHasSeenOnboarding(true);
    }
  };

  if (!step) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {step === 'welcome' && (
        <div className="relative w-full max-w-lg bg-white dark:bg-charcoal-lighter rounded-[48px] p-12 text-center shadow-2xl border border-black/5 dark:border-white/10 animate-in zoom-in duration-300" dir="rtl">
          <div className="w-24 h-24 bg-accent/20 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-accent">
            <Sparkles size={48} />
          </div>
          <h2 className="text-3xl font-black mb-6">أهلاً بك في Promptifie!</h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium leading-relaxed mb-10">
            مبروك تسجيلك! نتمنى لك تجربة ممتعة. نقدّم لك 50 نقطة كهدية مجانية، صالحة لاستخدام أي أداة من أدوات Promptifie.
          </p>
          <button onClick={closeWelcome} className="w-full py-5 bg-accent text-white rounded-2xl font-black text-xl shadow-xl shadow-accent/20 active:scale-95 transition-all">إغلاق</button>
        </div>
      )}

      {step === 'warning' && (
        <div className="relative w-full max-w-lg bg-white dark:bg-charcoal-lighter rounded-[48px] p-12 text-center shadow-2xl border border-black/5 dark:border-white/10 animate-in zoom-in duration-300" dir="rtl">
          <div className="w-24 h-24 bg-amber-500/20 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-amber-500">
            <AlertTriangle size={48} />
          </div>
          <h2 className="text-3xl font-black mb-6">تنبيه هام</h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium leading-relaxed mb-10">
            عند انتهاء رصيد النقاط، يمكنك إما الاشتراك في خطة مناسبة للحصول المزيد، أو انتظار التجديد اليومي/الشهري حسب خطتك. شكرًا لك.
          </p>
          <button onClick={closeWarning} className="w-full py-5 bg-amber-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all">مفهوم</button>
        </div>
      )}

      {step === 'tour' && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative pointer-events-auto w-full max-w-sm bg-white dark:bg-charcoal-lighter rounded-3xl p-8 border border-black/10 dark:border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase text-accent tracking-widest">Step {tourIndex + 1} of 5</p>
               <h3 className="text-xl font-black">
                 {tourIndex === 0 && "Explore our tools"}
                 {tourIndex === 1 && "Your Coin balance"}
                 {tourIndex === 2 && "View your history"}
                 {tourIndex === 3 && "Account settings"}
                 {tourIndex === 4 && "All set!"}
               </h3>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                 {tourIndex === 0 && "Find the perfect protocol for your image in the Tools menu."}
                 {tourIndex === 1 && "Check how many coins you have here. Each tool usage costs 10 coins."}
                 {tourIndex === 2 && "Access all your previous generations in the Creations tab."}
                 {tourIndex === 3 && "Manage your plan and profile right here."}
                 {tourIndex === 4 && "You're ready to start generating. Enjoy!"}
               </p>
               <button onClick={nextTourStep} className="w-full py-3 bg-accent text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg">
                 {tourIndex < 4 ? "Next Step" : "Let's Go!"}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn, userEmail, userCoins, authModal, openAuthModal, closeAuthModal, login, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const toolItems = [
    { name: 'Image to Prompt', path: '/image-to-prompt', icon: <ImageIcon size={18} />, desc: 'Reverse engineer visual DNA from any image.', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600' },
    { name: 'AI Image Generator', path: '/ai-image-generator', icon: <Sparkles size={18} />, desc: 'Generate stunning images from text prompts.', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600' },
    { name: 'Magic Enhance', path: '/magic-enhance', icon: <Wand2 size={18} />, desc: 'Richly detailed prompt expansion.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600' },
    { name: 'Image Remix', path: '/remix', icon: <Layers size={18} />, desc: 'Blend two visual souls into one.', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600' },
    { name: 'AI Upscaler', path: '/upscaler', icon: <Maximize2 size={18} />, desc: 'Enhance resolution without quality loss.', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600' },
    { name: 'Background Remover', path: '/background-remover', icon: <Scissors size={18} />, desc: 'Instant clean cuts for your assets.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600' },
    { name: 'Magic Eraser', path: '/magic-eraser', icon: <Eraser size={18} />, desc: 'Remove unwanted objects intelligently.', image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=600' },
    { name: 'Style Analyzer', path: '/style-analyzer', icon: <Microscope size={18} />, desc: 'Discover the artistic DNA of any image.', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600' },
    { name: 'Color Palette Generator', path: '/color-palette-generator', icon: <Palette size={18} />, desc: 'Extract harmonious color palettes.', image: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=600' },
    { name: 'AI Logo Generator', path: '/logo-generator', icon: <LayoutIcon size={18} />, desc: 'Professional brand identities in seconds.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600' },
    { name: 'Pattern Generator', path: '/pattern-generator', icon: <Grid3X3 size={18} />, desc: 'Create seamless tileable art.', image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=600' },
  ];

  const [hoveredTool, setHoveredTool] = useState(toolItems[0]);

  useEffect(() => {
    if (isDarkMode) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }, [isDarkMode]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] glass-effect border-b border-black/5 dark:border-white/5 transition-all duration-300 h-20">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex-1">
            <Link to="/" className="text-2xl font-black tracking-tighter hover:text-accent transition-colors">Promptifie<span className="text-accent">.</span></Link>
          </div>
          
          <nav className="hidden xl:flex items-center gap-10 h-full">
            <Link to="/" className={`text-[12px] font-black uppercase tracking-widest transition-all hover:text-accent h-full flex items-center border-b-2 ${location.pathname === '/' ? 'text-accent border-accent' : 'text-slate-500 border-transparent hover:border-accent/20'}`}>
              Home
            </Link>
            <Link to="/inspiration" className={`text-[12px] font-black uppercase tracking-widest transition-all hover:text-accent h-full flex items-center border-b-2 ${location.pathname === '/inspiration' ? 'text-accent border-accent' : 'text-slate-500 border-transparent hover:border-accent/20'}`}>
              Inspiration
            </Link>
            
            <div 
              className="h-full flex items-center relative group"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button id="nav-tools" className={`text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 h-full border-b-2 group hover:text-accent ${toolItems.some(t => t.path === location.pathname) ? 'text-accent border-accent' : 'text-slate-500 border-transparent hover:border-accent/20'}`}>
                Tools <ChevronDown size={14} className={`transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-0 transition-all duration-300 transform ${isToolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="w-[850px] bg-white dark:bg-charcoal-card rounded-b-[40px] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="w-[350px] p-4 bg-slate-50/50 dark:bg-charcoal-lighter/50 border-r dark:border-white/5 max-h-[600px] overflow-y-auto">
                    <div className="px-4 py-3 mb-2 border-b dark:border-white/5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Intelligence</p>
                    </div>
                    {toolItems.map((tool) => (
                      <Link 
                        key={tool.path}
                        to={tool.path} 
                        onMouseEnter={() => setHoveredTool(tool)}
                        onClick={() => setIsToolsOpen(false)}
                        className={`group/item flex items-center gap-4 px-4 py-4 rounded-3xl transition-all ${location.pathname === tool.path ? 'bg-accent/10' : 'hover:bg-accent/5'}`}
                      >
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${location.pathname === tool.path ? 'bg-accent text-white' : 'bg-white dark:bg-charcoal shadow-sm text-slate-400 group-hover/item:text-accent group-hover/item:bg-accent/10'}`}>
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <p className={`text-[12px] font-black uppercase tracking-tight transition-colors ${location.pathname === tool.path ? 'text-accent' : 'text-slate-600 dark:text-slate-300 group-hover/item:text-accent'}`}>
                            {tool.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold truncate max-w-[180px]">{tool.desc}</p>
                        </div>
                        <ArrowRight size={14} className={`opacity-0 group-hover/item:opacity-100 transition-all transform -translate-x-2 group-hover/item:translate-x-0 ${location.pathname === tool.path ? 'text-accent' : 'text-accent/50'}`} />
                      </Link>
                    ))}
                  </div>

                  <div className="flex-1 p-8 bg-white dark:bg-charcoal-card flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="relative z-10 space-y-6">
                       <div className="flex justify-between items-end mb-2">
                          <div>
                            <span className="text-[10px] font-black uppercase text-accent tracking-widest bg-accent/10 px-3 py-1 rounded-full mb-3 inline-block">Visual Context</span>
                            <h4 className="text-3xl font-black tracking-tighter">{hoveredTool.name}</h4>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                             <p className="text-[11px] font-black text-emerald-500 uppercase flex items-center gap-1 justify-end"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> V3.0 Live</p>
                          </div>
                       </div>
                       
                       <div className="rounded-[32px] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl aspect-video bg-slate-100 dark:bg-charcoal relative">
                          <img 
                            key={hoveredTool.image}
                            src={hoveredTool.image} 
                            alt={hoveredTool.name}
                            className="w-full h-full object-cover animate-in fade-in zoom-in duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/pricing" className={`text-[12px] font-black uppercase tracking-widest transition-all hover:text-accent h-full flex items-center border-b-2 ${location.pathname === '/pricing' ? 'text-accent border-accent' : 'text-slate-500 border-transparent hover:border-accent/20'}`}>
              Pricing
            </Link>
          </nav>

          <div className="flex-1 flex justify-end items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-accent transition-all btn-haptic">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {!isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button onClick={() => openAuthModal('LOGIN')} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-accent px-4 py-2 transition-colors">Login</button>
                <button onClick={() => openAuthModal('SIGN_UP')} className="px-6 py-3 bg-accent text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-accent/20 btn-haptic">Sign Up</button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div id="nav-coins" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-black text-[10px] uppercase tracking-widest">
                  <Coins size={14} /> {userCoins}
                </div>
                <div className="relative">
                  <button id="nav-profile" onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-accent transition-all btn-haptic">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg"><User size={18} /></div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute top-full right-0 mt-3 w-60 bg-white dark:bg-charcoal-lighter rounded-[28px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-6 border-b dark:border-white/5">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated</p>
                        <p className="text-sm font-black truncate">{userEmail}</p>
                      </div>
                      <Link to="/creations" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-accent transition-all">
                        <FolderHeart size={16} /> My Creations
                      </Link>
                      <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-accent transition-all">
                        <Settings size={16} /> Account Settings
                      </Link>
                      <button onClick={logout} className="w-full text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all flex items-center gap-3">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <AuthModal isOpen={authModal.isOpen} onClose={closeAuthModal} initialMode={authModal.mode} onLoginSuccess={login} />
      <OnboardingFlow />
      <ToastContainer />
    </>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts } = useAuth();
  return (
    <div className="fixed bottom-10 right-10 z-[110] flex flex-col gap-4">
      {toasts.map((toast) => (
        <div key={toast.id} className="bg-charcoal text-white px-8 py-4 rounded-[20px] shadow-2xl animate-in slide-in-from-right-full duration-500 flex items-center gap-4 border border-white/10 glass-effect">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <p className="text-xs font-black uppercase tracking-widest">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-charcoal border-t dark:border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <Link to="/" className="text-2xl font-black tracking-tighter">Promptifie<span className="text-accent">.</span></Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Quiet intelligence at the intersection of imagination and neural engineering.</p>
            <div className="flex gap-6">
              <Twitter className="text-slate-400 hover:text-accent cursor-pointer transition-all hover:scale-110" size={20} />
              <div className="text-slate-400 hover:text-accent cursor-pointer transition-all hover:scale-110">
                <Linkedin size={20} />
              </div>
              <div className="text-slate-400 hover:text-accent cursor-pointer transition-all hover:scale-110">
                <Github size={20} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-500">
              <li><Link to="/community" className="hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link to="/community" className="hover:text-accent transition-colors">Marketplace</Link></li>
              <li><Link to="/style-packs" className="hover:text-accent transition-colors">Styles</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-8">Protocol</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-500">
              <li><Link to="/image-to-prompt" className="hover:text-accent transition-colors">Generator</Link></li>
              <li><Link to="/logo-generator" className="hover:text-accent transition-colors">Logo</Link></li>
              <li><Link to="/pattern-generator" className="hover:text-accent transition-colors">Pattern</Link></li>
              <li><Link to="/color-palette-generator" className="hover:text-accent transition-colors">Palette</Link></li>
              <li><Link to="/magic-eraser" className="hover:text-accent transition-colors">Eraser</Link></li>
              <li><Link to="/background-remover" className="hover:text-accent transition-colors">Remover</Link></li>
              <li><Link to="/upscaler" className="hover:text-accent transition-colors">Upscaler</Link></li>
              <li><Link to="/remix" className="hover:text-accent transition-colors">Remix</Link></li>
              <li><Link to="/magic-enhance" className="hover:text-accent transition-colors">Enhance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-8">Access</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-500">
              <li><Link to="/extension" className="hover:text-accent transition-colors">Browser</Link></li>
              <li><Link to="/pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <p>© 2026 Promptifie. Release v3.0 Premium.</p>
          <div className="flex items-center gap-8">
             <Link to="/extension" className="hover:text-accent transition-colors">Chrome Protocol</Link>
             <Link to="/affiliate-program" className="hover:text-accent transition-colors">Network</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
