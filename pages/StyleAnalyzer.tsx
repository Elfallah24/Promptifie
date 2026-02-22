
import React, { useState, useRef } from 'react';
import { Upload, Microscope, RefreshCw, Copy, Check, Sparkles, ImageIcon, Palette, Layers, Lightbulb, Compass, UserCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { analyzeStyleFromImage } from '../services/gemini';

interface AnalysisResult {
  movements: string[];
  genres: string[];
  influences: string[];
  lighting: string[];
  palette: string[];
  composition: string[];
}

const StyleAnalyzer: React.FC = () => {
  const { showToast, isLoggedIn, openAuthModal, consumeCoins } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copyStates, setCopyStates] = useState<Record<string, boolean>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!isLoggedIn) return openAuthModal('SIGN_UP');
    if (!image) return showToast("Upload an image first.");

    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeStyleFromImage(image);
      setResult(analysis);
      showToast("Artistic DNA deconstructed!");
    } catch (err) {
      showToast("Analysis failed. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyTag = (text: string, category: string) => {
    navigator.clipboard.writeText(text);
    const key = `${category}-${text}`;
    setCopyStates(prev => ({ ...prev, [key]: true }));
    showToast(`Copied: ${text}`);
    setTimeout(() => {
      setCopyStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const categories = [
    { key: 'movements', label: 'Artistic Movement', icon: <Compass size={16} /> },
    { key: 'genres', label: 'Style/Genre', icon: <Layers size={16} /> },
    { key: 'influences', label: 'Artist Influence', icon: <UserCircle size={16} /> },
    { key: 'lighting', label: 'Lighting', icon: <Lightbulb size={16} /> },
    { key: 'palette', label: 'Color Palette', icon: <Palette size={16} /> },
    { key: 'composition', label: 'Composition', icon: <Microscope size={16} /> }
  ];

  return (
    <div className="pt-32 pb-16 px-4 max-w-6xl mx-auto min-h-screen space-y-20">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-amber-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/10 animate-float">
          <Microscope className="text-amber-500" size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">AI Style Analyzer</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Upload any artwork to discover its artistic DNA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative h-[400px] rounded-[40px] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden shadow-inner group
              ${image ? 'border-amber-500' : 'border-slate-200 dark:border-white/10 hover:border-amber-500 hover:bg-amber-500/5'}`}
          >
            {image ? (
              <div className="absolute inset-0 w-full h-full">
                <img src={image} alt="Preview" className="w-full h-full object-contain bg-slate-50 dark:bg-black" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <p className="text-white font-black bg-amber-500 px-8 py-3 rounded-2xl shadow-2xl">Replace Artwork</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  <Upload className="text-slate-400" size={28} />
                </div>
                <p className="text-xl font-black">Drop masterwork here</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !image}
            className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95
              ${isAnalyzing || !image ? 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-amber-500 text-white shadow-amber-500/20'}`}
          >
            {isAnalyzing ? <RefreshCw className="animate-spin" size={24} /> : <Sparkles size={24} />}
            {isAnalyzing ? 'Extracting DNA...' : 'Analyze Style (10 Coins)'}
          </button>
        </div>

        <div className="glass-effect p-10 rounded-[48px] border border-black/5 dark:border-white/5 shadow-2xl min-h-[400px] relative overflow-hidden">
          {!result && !isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 text-center p-12">
               <ImageIcon size={64} className="mb-6" />
               <p className="font-black text-xl uppercase tracking-tighter">Artistic Insights Pending</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 animate-in fade-in">
              <RefreshCw size={48} className="animate-spin text-amber-500" />
              <div className="text-center space-y-2">
                <p className="font-black uppercase tracking-widest text-xs">Scanning Visual Semantics</p>
                <p className="text-[10px] text-slate-400 font-bold">Cross-referencing 500 years of art history...</p>
              </div>
            </div>
          )}

          {result && !isAnalyzing && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500">Visual DNA Breakdown</h3>
               </div>

               <div className="space-y-8">
                  {categories.map((cat) => (
                    <div key={cat.key} className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-400">
                         {cat.icon}
                         <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result[cat.key as keyof AnalysisResult].map((tag) => {
                          const tagKey = `${cat.key}-${tag}`;
                          const copied = copyStates[tagKey];
                          return (
                            <button
                              key={tag}
                              onClick={() => copyTag(tag, cat.key)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 hover:scale-105 active:scale-95
                                ${copied ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-slate-100 dark:bg-charcoal border-transparent text-slate-600 dark:text-slate-300 hover:border-amber-500/50'}`}
                            >
                              {tag}
                              {copied ? <Check size={12} /> : <Copy size={12} className="opacity-30 group-hover:opacity-100" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                Shazam for Fine Art
            </h2>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
                <img 
                    src="/images/analyzer-demo.png" 
                    alt="AI Style Analyzer demo"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Become an Art Connoisseur</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Ever wondered what makes an image feel a certain way? Our Style Analyzer acts like a 'Shazam for Art'. Upload any image, and our AI will deconstruct its visual elements, identifying the artistic movements, genre, potential artist influences, lighting techniques, and color palettes. It's the ultimate tool for learning new art terms and enriching your own creative prompts.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">كن خبيرًا فنيًا</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              هل تساءلت يومًا ما الذي يعطي صورة ما إحساسًا معينًا؟ يعمل 'محلل الأسلوب' لدينا كـ 'Shazam للفن'. قم برفع أي صورة، وسيقوم الذكاء الاصطناعي بتفكيك عناصرها البصرية، محدداً الحركات الفنية، النوع، التأثيرات الفنية المحتملة، تقنيات الإضاءة، ولوحات الألوان. إنها الأداة المثلى لتعلم مصطلحات فنية جديدة وإثراء أوامرك النصية الإبداعية.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleAnalyzer;
