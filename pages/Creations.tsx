
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Copy, Heart, Clock, Search, Filter, Image as ImageIcon, ShoppingBag, Globe, Check } from 'lucide-react';

const SparkleIcon: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="particle bg-red-500 w-1 h-1"
          style={{
            '--tw-translate-x': `${(Math.random() - 0.5) * 60}px`,
            '--tw-translate-y': `${(Math.random() - 0.5) * 60}px`,
            left: '50%',
            top: '50%',
            animationDelay: `${i * 0.05}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const Creations: React.FC = () => {
  const { creations, toggleFavorite, publishToCommunity, sellPrompt, showToast, userTier } = useAuth();
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modelFilter, setModelFilter] = useState('All Models');
  const [lastFavoriteId, setLastFavoriteId] = useState<string | null>(null);

  const filteredCreations = creations.filter(c => {
    const matchesFilter = filter === 'all' || c.isFavorite;
    const matchesSearch = c.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModel = modelFilter === 'All Models' || c.model === modelFilter;
    return matchesFilter && matchesSearch && matchesModel;
  });

  const uniqueModels = ['All Models', ...Array.from(new Set(creations.map(c => c.model)))];

  const handleFavorite = (id: string, currentlyFav: boolean) => {
    toggleFavorite(id);
    if (!currentlyFav) {
      setLastFavoriteId(id);
      setTimeout(() => setLastFavoriteId(null), 700);
    }
  };

  const handleSell = (prompt: string) => {
    if (userTier === 'Free' || userTier === 'Standard') {
      showToast("Upgrade to sell prompts!");
      return;
    }
    sellPrompt(prompt, 10);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase">Creations Archive</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">System generated metadata history</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <select value={modelFilter} onChange={e => setModelFilter(e.target.value)} className="px-6 py-3 bg-slate-100 dark:bg-charcoal border border-black/5 rounded-2xl text-[10px] font-black uppercase outline-none btn-haptic">
            {uniqueModels.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input placeholder="Keyword Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-charcoal border border-black/5 rounded-2xl text-xs font-bold outline-none btn-haptic" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-12 p-1 bg-slate-100 dark:bg-charcoal rounded-[20px] w-fit border border-black/5">
        <button onClick={() => setFilter('all')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-white dark:bg-charcoal text-accent shadow-xl' : 'text-slate-400'}`}>Repository</button>
        <button onClick={() => setFilter('favorites')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${filter === 'favorites' ? 'bg-white dark:bg-charcoal text-red-500 shadow-xl' : 'text-slate-400'}`}><Heart size={14} /> Intelligence Core</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCreations.map(creation => (
          <div key={creation.id} className="group bg-white dark:bg-charcoal-lighter border border-black/5 rounded-[40px] overflow-hidden shadow-2xl hover:border-accent transition-all flex flex-col btn-haptic animate-in fade-in duration-500">
            <div className="relative h-56 overflow-hidden bg-slate-50 dark:bg-charcoal">
              {creation.imageUrl ? <img src={creation.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center opacity-5"><ImageIcon size={64} /></div>}
              <div className="absolute top-6 right-6 flex gap-2">
                <button 
                  onClick={() => handleFavorite(creation.id, creation.isFavorite)} 
                  className={`relative p-3 rounded-2xl backdrop-blur-md transition-all active:scale-75 ${creation.isFavorite ? 'bg-red-500 text-white shadow-xl' : 'bg-black/50 text-white'}`}
                >
                  <Heart size={20} fill={creation.isFavorite ? "currentColor" : "none"} className={lastFavoriteId === creation.id ? 'animate-sparkle' : ''} />
                  <SparkleIcon active={lastFavoriteId === creation.id} />
                </button>
              </div>
              <button onClick={() => publishToCommunity(creation.id)} className="absolute bottom-6 left-6 p-3 bg-accent text-white rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all text-[10px] font-black uppercase flex items-center gap-2"><Globe size={14} /> Network Share</button>
            </div>
            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest"><Clock size={14} /> {new Date(creation.timestamp).toLocaleDateString()}</div>
                <p className="text-sm font-medium line-clamp-4 italic text-slate-600 dark:text-slate-400 leading-relaxed">"{creation.prompt}"</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { navigator.clipboard.writeText(creation.prompt); showToast("Copied"); }} className="flex-1 py-4 bg-slate-100 dark:bg-charcoal rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-accent hover:text-white btn-haptic"><Copy size={16} /> Buffer</button>
                <button onClick={() => handleSell(creation.prompt)} className="flex-1 py-4 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 btn-haptic"><ShoppingBag size={16} /> Monetize</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creations;
