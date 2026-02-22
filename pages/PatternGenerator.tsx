
import React, { useState } from 'react';
import { Grid3X3, Zap, RefreshCw, Download, Sparkles, Wand2, Type, Box, Palette, X } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { generateSeamlessPattern } from '../services/gemini';

const STYLE_OPTIONS = [
  { id: 'Watercolor', label: 'Watercolor', color: 'bg-blue-400' },
  { id: 'Minimalist', label: 'Minimalist', color: 'bg-slate-400' },
  { id: 'Vintage', label: 'Vintage', color: 'bg-orange-400' },
  { id: 'Vector', label: 'Vector Art', color: 'bg-green-400' },
  { id: 'Oil Painting', label: 'Oil Painting', color: 'bg-red-400' },
  { id: 'Abstract', label: 'Abstract', color: 'bg-purple-400' }
];

const PatternGenerator: React.FC = () => {
  const { showToast, isLoggedIn, openAuthModal, addCreation, consumeCoins } = useAuth();
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(STYLE_OPTIONS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tileUrl, setTileUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!isLoggedIn) return openAuthModal('SIGN_UP');
    if (!description.trim()) return showToast("Please describe your pattern.");

    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsGenerating(true);
    setTileUrl(null);
    try {
      const resultUrl = await generateSeamlessPattern(description, selectedStyle);
      setTileUrl(resultUrl);
      addCreation({ prompt: `Seamless pattern: ${description} in ${selectedStyle} style`, imageUrl: resultUrl, model: 'Gemini Pattern Engine' });
      showToast("Seamless pattern generated!");
    } catch (err) {
      showToast("Generation failed. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadTile = () => {
    if (!tileUrl) return;
    const link = document.createElement('a');
    link.href = tileUrl;
    link.download = `seamless-pattern-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-6xl mx-auto min-h-screen space-y-16">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-pink-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-500/10 animate-float">
          <Grid3X3 className="text-pink-500" size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">AI Pattern Generator</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Generate unique, tileable, and seamless patterns from a simple description.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 glass-effect p-8 md:p-10 rounded-[48px] border border-black/5 dark:border-white/10 shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                <Type size={14} className="text-pink-500" /> Pattern Elements
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. tropical leaves and parrots, Moroccan geometric shapes, cute cartoon cats..."
                className="w-full h-32 bg-slate-100 dark:bg-charcoal border border-black/5 p-6 rounded-[28px] text-lg font-bold focus:outline-none focus:border-pink-500 transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                <Palette size={14} className="text-pink-500" /> Artistic Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STYLE_OPTIONS.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2
                      ${selectedStyle === style.id 
                        ? 'border-pink-500 bg-pink-500/5 text-pink-500' 
                        : 'border-transparent bg-slate-50 dark:bg-charcoal text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${style.color}`} />
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()}
              className={`w-full py-6 rounded-[28px] font-black text-2xl transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95
                ${isGenerating || !description.trim() ? 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-pink-500 text-white shadow-pink-500/20'}`}
            >
              {isGenerating ? <RefreshCw className="animate-spin" /> : <Wand2 />}
              {isGenerating ? 'Weaving...' : 'Generate Pattern (10 Coins)'}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative group rounded-[48px] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl aspect-square bg-slate-100 dark:bg-charcoal flex items-center justify-center">
            {tileUrl ? (
              <div className="w-full h-full relative grid grid-cols-3 grid-rows-3 animate-in fade-in duration-1000">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-full h-full border-[0.5px] border-white/5"
                    style={{ 
                      backgroundImage: `url(${tileUrl})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                ))}
                <div className="absolute inset-0 pointer-events-none border-4 border-pink-500/20 rounded-[48px] z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white px-4 py-1.5 rounded-full font-black text-[8px] uppercase tracking-widest shadow-2xl z-20">
                  Seamless 3x3 Preview
                </div>
              </div>
            ) : (
              <div className="text-center p-12 space-y-4 opacity-20">
                <Grid3X3 size={80} className="mx-auto" />
                <p className="font-black text-xl uppercase">Infinite preview area</p>
              </div>
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center space-y-4 text-white z-30">
                <RefreshCw size={48} className="animate-spin text-pink-500" />
                <div className="text-center">
                  <p className="font-black uppercase tracking-widest text-xs">Neural Loom Active</p>
                  <p className="text-[10px] text-slate-400 font-bold px-8 mt-2">Connecting edges for infinite repetition...</p>
                </div>
              </div>
            )}
          </div>

          {tileUrl && !isGenerating && (
            <div className="flex flex-col md:flex-row gap-4 animate-in slide-in-from-bottom-4">
              <button 
                onClick={downloadTile} 
                className="flex-1 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
              >
                <Download size={24} /> Download Tile
              </button>
              <button 
                onClick={() => setTileUrl(null)}
                className="py-5 px-8 bg-slate-100 dark:bg-charcoal hover:bg-red-500 hover:text-white rounded-[24px] font-black transition-all"
              >
                <X size={24} />
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-8">Endless Creativity, Seamlessly</h2>
            <div className="rounded-[48px] overflow-hidden shadow-2xl border-8 border-white dark:border-charcoal-lighter ring-1 ring-black/5">
                <img 
                    src="/images/pattern-demo.png" 
                    alt="Seamless Pattern Generator demo"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Design Without Boundaries</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Go beyond single images. Our AI Pattern Generator creates beautiful, infinitely tileable patterns perfect for textiles, wallpapers, packaging, or digital backgrounds. Describe your theme, and watch as the AI crafts a unique pattern where every edge connects perfectly to the next. Your design possibilities are now endless.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">إبداع لا نهائي، بسلاسة تامة</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              تجاوز حدود الصور الفردية. يقوم 'مولد الأنماط' بالذكاء الاصطناعي بإنشاء أنماط جميلة وقابلة للتكرار بلا حدود، وهي مثالية للمنسوجات، ورق الجدران، التغليف، أو الخلفيات الرقمية. قم بوصف فكرتك، وشاهد كيف يصنع الذكاء الاصطناعي نمطًا فريدًا حيث تتصل كل حافة بالأخرى بشكل مثالي. إمكانيات تصميمك أصبحت الآن لا نهائية.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatternGenerator;
