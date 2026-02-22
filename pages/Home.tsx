
import React from 'react';
import { Sparkles, Image as ImageIcon, Wand2, Maximize2, Scissors, ArrowRight, Upload, Copy, Code, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Home: React.FC = () => {
  const { openAuthModal } = useAuth();

  return (
    <div className="pt-20 pb-0 min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="px-4 py-24 max-w-7xl mx-auto text-center space-y-16 relative z-10">
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-charcoal dark:text-offwhite leading-[1.05] max-w-5xl mx-auto">
            The <span className="bg-gradient-to-r from-accent via-purple-500 to-accent bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,122,223,0.3)]">AI</span> tools for <br /> Modern <span className="bg-gradient-to-r from-accent via-purple-500 to-accent bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,122,223,0.3)]">Creatives</span>
          </h1>
          <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-2xl mx-auto">
            Go from idea to perfect prompt, and beyond.
          </p>
        </div>

        {/* Central Toolbar Launchpad - Connected Component Design */}
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="bg-white dark:bg-charcoal-card border border-black/10 dark:border-white/10 rounded-[40px] md:rounded-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] p-2 flex flex-col md:flex-row md:divide-x divide-black/5 dark:divide-white/5">
            
            {/* Tool 1: Image to Prompt (Dedicated Page) */}
            <Link 
              to="/image-to-prompt"
              className="flex-1 group relative p-6 md:py-8 md:px-6 rounded-3xl md:rounded-l-full hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-full shadow-xl shadow-accent/30 z-20 whitespace-nowrap scale-90 group-hover:scale-100 transition-transform">
                MOST USED
              </div>
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <ImageIcon size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-charcoal dark:text-offwhite group-hover:text-accent transition-colors">Image to Prompt</p>
                <p className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Extract visual DNA</p>
              </div>
            </Link>

            {/* Tool 2: Magic Enhance */}
            <Link 
              to="/magic-enhance"
              className="flex-1 group p-6 md:py-8 md:px-6 rounded-3xl md:rounded-none hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <Wand2 size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-charcoal dark:text-offwhite group-hover:text-indigo-500 transition-colors">Magic Enhance</p>
                <p className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Rich prompt expansion</p>
              </div>
            </Link>

            {/* Tool 3: AI Image Generator */}
            <Link 
              to="/ai-image-generator"
              className="flex-1 group p-6 md:py-8 md:px-6 rounded-3xl md:rounded-none hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Sparkles size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-charcoal dark:text-offwhite group-hover:text-cyan-500 transition-colors">AI Generator</p>
                <p className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Text to visual art</p>
              </div>
            </Link>

            {/* Tool 4: AI Upscaler */}
            <Link 
              to="/upscaler"
              className="flex-1 group p-6 md:py-8 md:px-6 rounded-3xl md:rounded-none hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <Maximize2 size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-charcoal dark:text-offwhite group-hover:text-emerald-500 transition-colors">AI Upscaler</p>
                <p className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">HD resolution boost</p>
              </div>
            </Link>

            {/* Tool 5: Background Remover */}
            <Link 
              to="/background-remover"
              className="flex-1 group p-6 md:py-8 md:px-6 rounded-3xl md:rounded-r-full hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Scissors size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-charcoal dark:text-offwhite group-hover:text-rose-500 transition-colors">BG Remover</p>
                <p className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Instant object cutout</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: How It Works Diagram */}
      <section className="py-32 px-4 bg-slate-50/50 dark:bg-white/[0.02] border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">From Vision to Vector in 3 Simple Steps</h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Protocol Lifecycle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-px border-t-2 border-dashed border-slate-200 dark:border-white/10 -translate-y-1/2 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-8 group">
              <div className="w-24 h-24 bg-white dark:bg-charcoal rounded-[32px] shadow-2xl flex items-center justify-center border border-black/5 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Upload size={32} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight uppercase">1. Upload Your Image</h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-[280px]">
                  Start with any visual reference - a photo, a sketch, or a digital artwork.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-8 group">
              <div className="w-24 h-24 bg-white dark:bg-charcoal rounded-[32px] shadow-2xl flex items-center justify-center border border-black/5 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                  <Wand2 size={32} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight uppercase">2. Let AI Work Its Magic</h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-[280px]">
                  Our engine analyzes your image to generate structured, high-quality prompts.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-8 group">
              <div className="w-24 h-24 bg-white dark:bg-charcoal rounded-[32px] shadow-2xl flex items-center justify-center border border-black/5 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                  <Copy size={32} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight uppercase">3. Copy Your Prompt</h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-[280px]">
                  Use your new prompt in any AI art generator to bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured In Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <p className="text-center text-slate-400 font-black uppercase text-[10px] tracking-[0.4em]">Trusted by modern creators at</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale dark:invert transition-all hover:opacity-60">
             <div className="text-2xl font-black tracking-tighter">PRODUCT HUNT</div>
             <div className="text-2xl font-black tracking-tighter italic">TechCrunch</div>
             <div className="text-2xl font-black tracking-tighter uppercase">Behance</div>
             <div className="text-2xl font-black tracking-tighter lowercase">dribbble</div>
             <div className="text-2xl font-black tracking-tighter">WIRED</div>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Tools Showcase */}
      <section className="py-32 px-4 bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tighter">A Full Creative Suite</h2>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">End-to-End Visual Intelligence</p>
            </div>
            <Link to="/tools" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-widest text-[10px] hover:gap-3 transition-all border-b-2 border-accent/20 pb-1">
              Explore All Protocols <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Featured Tool 1: Upscaler */}
            <div className="group bg-white dark:bg-charcoal-card rounded-[48px] border border-black/5 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col transition-all hover:border-accent">
              <div className="h-64 overflow-hidden bg-slate-100 dark:bg-charcoal relative">
                <img src="/images/upscaler-demo.png" alt="AI Upscaler" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-10 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight uppercase">AI Image Upscaler</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">
                    Enhance low-res images into 4K masterpieces without losing a single pixel of detail.
                  </p>
                </div>
                <Link to="/upscaler" className="w-full py-4 bg-slate-50 dark:bg-charcoal border border-black/5 dark:border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-accent group-hover:text-white transition-all">
                  Launch Protocol <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Featured Tool 2: BG Remover */}
            <div className="group bg-white dark:bg-charcoal-card rounded-[48px] border border-black/5 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col transition-all hover:border-rose-500">
              <div className="h-64 overflow-hidden bg-slate-100 dark:bg-charcoal relative">
                <img src="/images/remover-demo.png" alt="Background Remover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-10 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight uppercase">Background Remover</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">
                    Clean, high-precision subject isolation with neural masking technology.
                  </p>
                </div>
                <Link to="/background-remover" className="w-full py-4 bg-slate-50 dark:bg-charcoal border border-black/5 dark:border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  Launch Protocol <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Featured Tool 3: Pattern Generator */}
            <div className="group bg-white dark:bg-charcoal-card rounded-[48px] border border-black/5 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col transition-all hover:border-pink-500">
              <div className="h-64 overflow-hidden bg-slate-100 dark:bg-charcoal relative">
                <img src="/images/pattern-demo.png" alt="Pattern Generator" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-10 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight uppercase">Pattern Generator</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">
                    Create infinite, tileable AI patterns for textiles, backgrounds, and professional branding.
                  </p>
                </div>
                <Link to="/pattern-generator" className="w-full py-4 bg-slate-50 dark:bg-charcoal border border-black/5 dark:border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  Launch Protocol <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Final Call to Action (CTA) */}
      <section className="py-32 px-4 relative overflow-hidden bg-charcoal dark:bg-charcoal">
        {/* Animated background element */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[100px] border-accent rounded-full blur-[150px] animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
              Stop Dreaming. <br /> Start Creating.
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Join 10,000+ creators and start reverse engineering visual logic today. No credit card required to start.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => openAuthModal('SIGN_UP')}
              className="px-12 py-6 bg-accent hover:bg-accent-hover text-white rounded-[24px] font-black text-xl transition-all shadow-2xl shadow-accent/30 active:scale-95 flex items-center gap-3"
            >
              Sign Up for Free <ArrowRight size={24} />
            </button>
            <Link 
              to="/pricing"
              className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[24px] font-black text-xl transition-all active:scale-95"
            >
              View Enterprise Plans
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 size={16} className="text-accent" /> No Setup Fee
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 size={16} className="text-accent" /> GDPR Compliant
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 size={16} className="text-accent" /> Cancel Anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
