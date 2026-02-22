
import React from 'react';
import { ShoppingBag, Star, Zap, Sparkles, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { useAuth } from '../AuthContext';

const PACKS = [
  {
    id: 'pack_1',
    name: 'Cyberpunk Neon V4',
    description: 'Ultra-vibrant, high-contrast futuristic aesthetics with neon glow and rainy street atmospheres.',
    price: '$9.99',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    count: 50
  },
  {
    id: 'pack_2',
    name: 'Anime Masterclass',
    description: 'Hand-crafted prompts for Studio Ghibli, Makoto Shinkai, and modern shonen styles.',
    price: '$14.99',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
    count: 120
  },
  {
    id: 'pack_3',
    name: 'Architectural Genius',
    description: 'Clean lines, Brutalist, and Organic Modernism prompts for stunning interior and exterior design.',
    price: '$12.99',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600',
    count: 85
  }
];

const StylePacks: React.FC = () => {
  const { showToast } = useAuth();

  const handlePurchase = (name: string) => {
    showToast(`Initializing secure payment for ${name}...`);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20 space-y-4">
        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent shadow-xl shadow-accent/10">
          <Layers size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Artistic DNA Packs</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Professional-grade prompt bundles designed to instantly transform your creative output into legendary aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PACKS.map((pack) => (
          <div key={pack.id} className="group bg-white dark:bg-charcoal-card border border-black/5 dark:border-white/10 rounded-[48px] overflow-hidden shadow-2xl transition-all hover:border-accent">
            <div className="h-64 overflow-hidden relative">
              <img src={pack.imageUrl} alt={pack.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-6 right-6 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                {pack.count} Prompts
              </div>
            </div>
            <div className="p-10 space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase tracking-tight">{pack.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{pack.description}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t dark:border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">One-time payment</p>
                  <p className="text-2xl font-black text-accent">{pack.price}</p>
                </div>
                <button 
                  onClick={() => handlePurchase(pack.name)}
                  className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95"
                >
                  <ShoppingBag size={14} /> Buy Pack
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-12 md:p-20 bg-slate-50 dark:bg-charcoal-lighter rounded-[56px] border border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center gap-16">
         <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">
               <Star size={14} fill="currentColor" /> Lifetime Access
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight">Master Any Aesthetic Instantly</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Our style packs are developed through thousands of hours of neural training. Each pack contains a curated selection of tokens, lighting triggers, and camera parameters that guarantee consistent results across Midjourney, Flux, and Stable Diffusion.
            </p>
            <div className="grid grid-cols-2 gap-4">
               {[
                 "V3.0 Optimized",
                 "Commercial License",
                 "Prompt Breakdown",
                 "Free Updates"
               ].map(item => (
                 <div key={item} className="flex items-center gap-2 text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                    <CheckCircle2 size={16} className="text-accent" /> {item}
                 </div>
               ))}
            </div>
         </div>
         <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full"></div>
            <div className="relative rounded-[40px] border border-black/10 dark:border-white/10 bg-white dark:bg-charcoal shadow-2xl p-4 overflow-hidden transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
               <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600" alt="Style Pack Preview" className="rounded-[32px]" />
               <div className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-accent">Preview</span>
                    <Sparkles size={20} className="text-accent" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StylePacks;
