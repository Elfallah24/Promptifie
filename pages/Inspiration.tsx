
import React, { useState } from 'react';
import { INSPIRATION_GALLERY } from '../constants';
import { InspirationItem } from '../types';
import { Copy, Check, X, Sparkles, Wand2 } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ["All", "Characters", "Manga", "Japanese Ukiyo-e", "Watercolor Illustration", "Anime", "3D Animation"];

const Inspiration: React.FC = () => {
  const navigate = useNavigate();
  const { setPreFilledPrompt, showToast } = useAuth();
  const [selectedItem, setSelectedItem] = useState<InspirationItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [copySuccess, setCopySuccess] = useState(false);

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopySuccess(true);
    showToast("Prompt copied to clipboard!");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleTryPrompt = (prompt: string) => {
    setPreFilledPrompt(prompt);
    // Fixed: Redirecting to AI Image Generator instead of Home
    navigate('/ai-image-generator');
  };

  const filteredGallery = activeCategory === "All" 
    ? INSPIRATION_GALLERY 
    : INSPIRATION_GALLERY.filter(item => item.category === activeCategory);

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-black mb-4">Prompt Inspiration Gallery</h1>
        <p className="text-slate-400 text-lg font-medium">Discover artistic styles and reverse engineer them with one click.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-accent text-white shadow-xl shadow-accent/20' : 'bg-slate-100 dark:bg-charcoal hover:bg-slate-200 dark:hover:bg-charcoal-lighter text-slate-500'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGallery.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative h-[480px] rounded-[40px] overflow-hidden cursor-pointer shadow-2xl transition-all border-2 border-black/5 dark:border-white/5 hover:border-accent"
          >
            <img 
              src={item.imageUrl} 
              alt={item.category} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-8 left-8 right-8 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-accent text-white px-3 py-1.5 rounded-full inline-block shadow-lg">
                {item.category}
              </span>
              <p className="text-offwhite text-sm line-clamp-2 italic font-medium leading-relaxed">
                "{item.prompt}"
              </p>
              <div className="pt-2 flex gap-2">
                 <button 
                   onClick={(e) => { e.stopPropagation(); handleTryPrompt(item.prompt); }}
                   className="flex-1 bg-white text-charcoal py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all"
                 >
                   <Wand2 size={12} /> Try This Prompt
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedItem(null)}></div>
          <div className="relative w-full max-w-4xl bg-white dark:bg-charcoal-lighter rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-black/5 dark:border-white/10 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-charcoal/50 hover:bg-charcoal text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <div className="md:w-1/2 h-80 md:h-auto">
              <img src={selectedItem.imageUrl} className="w-full h-full object-cover" alt="Selected" />
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-2 block">{selectedItem.category}</span>
                <h3 className="text-3xl font-black mb-8 text-charcoal dark:text-offwhite">Creation Breakdown</h3>
                <div className="bg-slate-50 dark:bg-charcoal/50 p-8 rounded-3xl border border-black/5 dark:border-white/5 relative mb-8">
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed italic font-medium">
                    "{selectedItem.prompt}"
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => copyPrompt(selectedItem.prompt)}
                  className="w-full py-4 bg-slate-100 dark:bg-charcoal hover:bg-slate-200 dark:hover:bg-charcoal-lighter text-charcoal dark:text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 text-lg"
                >
                  {copySuccess ? <Check size={22} className="text-emerald-500" /> : <Copy size={22} />}
                  {copySuccess ? 'Copied to Clipboard' : 'Copy Prompt'}
                </button>
                <button
                  onClick={() => handleTryPrompt(selectedItem.prompt)}
                  className="w-full py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-accent/20"
                >
                  <Sparkles size={22} /> Try This Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspiration;
