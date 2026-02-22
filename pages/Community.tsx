
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Sparkles, Wand2, Search, TrendingUp, ShoppingBag, Coins, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community: React.FC = () => {
  const navigate = useNavigate();
  const { communityItems, marketplaceItems, likeCommunityItem, buyPrompt, setPreFilledPrompt, showToast, userEmail, userTier } = useAuth();
  const [tab, setTab] = useState<'gallery' | 'marketplace'>('gallery');
  const [search, setSearch] = useState('');

  const handleTryPrompt = (prompt: string) => {
    setPreFilledPrompt(prompt);
    navigate('/ai-image-generator');
    showToast("Prompt pre-filled for generation!");
  };

  const galleryItems = communityItems.filter(i => i.prompt.toLowerCase().includes(search.toLowerCase()));
  const marketItems = marketplaceItems.filter(i => i.prompt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4">Community Ecosystem</h1>
        <p className="text-slate-500 font-medium">Discover, trade, and remix the best AI prompts in the world.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-charcoal-lighter rounded-2xl border border-black/5">
          <button 
            onClick={() => setTab('gallery')}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${tab === 'gallery' ? 'bg-white dark:bg-charcoal text-accent shadow-lg' : 'text-slate-500'}`}
          >
            <TrendingUp size={18} /> Public Gallery
          </button>
          <button 
            onClick={() => setTab('marketplace')}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${tab === 'marketplace' ? 'bg-white dark:bg-charcoal text-emerald-500 shadow-lg' : 'text-slate-500'}`}
          >
            <ShoppingBag size={18} /> Marketplace
          </button>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={`Search ${tab === 'gallery' ? 'gallery' : 'marketplace'}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-charcoal border border-black/5 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:border-accent transition-all"
          />
        </div>
      </div>

      {tab === 'gallery' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.length === 0 ? (
             <div className="col-span-full py-20 text-center opacity-50 font-bold">No public creations found yet. Be the first to publish!</div>
          ) : (
            galleryItems.map((item) => (
              <div key={item.id} className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl transition-all border border-black/5 dark:border-white/10 hover:border-accent">
                <img src={item.imageUrl} alt="Community" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                  <div className="flex items-center gap-2 text-white/70 text-[10px] font-black uppercase tracking-widest">
                    <User size={12} /> {item.userName}
                  </div>
                  <p className="text-white text-sm line-clamp-2 italic font-medium">"{item.prompt}"</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => likeCommunityItem(item.id)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${item.hasLiked ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      <Sparkles size={14} /> {item.likes} {item.likes === 1 ? 'Like' : 'Likes'}
                    </button>
                    <button 
                      onClick={() => handleTryPrompt(item.prompt)}
                      className="flex-1 py-2.5 bg-white text-charcoal rounded-xl text-xs font-black hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Wand2 size={14} /> Remix
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-accent/5 rounded-3xl border border-accent/20 flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl shadow-accent/20">
                <Coins size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black">Trade Your Expertise</h3>
                <p className="text-sm text-slate-500">Only Pro & Ultimate users can list prompts for credits.</p>
              </div>
            </div>
            {(userTier === 'Pro' || userTier === 'Ultimate' || userTier === 'Business') ? (
              <button 
                onClick={() => navigate('/creations')}
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-black shadow-lg shadow-accent/10"
              >
                Sell From My History
              </button>
            ) : (
              <button 
                onClick={() => navigate('/pricing')}
                className="px-6 py-3 bg-slate-200 dark:bg-charcoal text-slate-500 rounded-xl text-sm font-black"
              >
                Upgrade to Sell
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketItems.map(item => {
              const hasBought = item.boughtBy.includes(userEmail);
              const isSeller = item.sellerName === userEmail.split('@')[0];
              
              return (
                <div key={item.id} className="bg-white dark:bg-charcoal-lighter p-8 rounded-[32px] border border-black/5 dark:border-white/10 shadow-xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <User size={12} /> {item.sellerName}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-black">
                        <Coins size={14} /> {item.price}
                      </div>
                    </div>
                    <p className={`text-sm font-medium leading-relaxed italic ${hasBought || isSeller ? 'text-charcoal dark:text-offwhite' : 'blur-sm select-none opacity-50'}`}>
                      {item.prompt}
                    </p>
                  </div>
                  
                  <div className="pt-6">
                    {hasBought || isSeller ? (
                      <button 
                        onClick={() => handleTryPrompt(item.prompt)}
                        className="w-full py-3 bg-slate-100 dark:bg-charcoal hover:bg-accent hover:text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2"
                      >
                        <Wand2 size={14} /> {isSeller ? 'View My Prompt' : 'Remix Prompt'}
                      </button>
                    ) : (
                      <button 
                        onClick={() => buyPrompt(item.id)}
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> Buy This Secret Prompt
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
