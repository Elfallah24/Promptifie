
import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, RefreshCw, Download, Image as ImageIcon, Globe, Wand2, Dice5, ChevronDown, Check } from 'lucide-react';
import { generateImageFromText, analyzePromptQuality, generateRandomIdea } from '../services/gemini';
import { useAuth } from '../AuthContext';

const AIImageGenerator: React.FC = () => {
  const { preFilledPrompt, setPreFilledPrompt, showToast, addCreation, publishToCommunity, creations, customStyles, consumeCoins } = useAuth();
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [showStyleMenu, setShowStyleMenu] = useState(false);

  useEffect(() => {
    if (preFilledPrompt) {
      setInput(preFilledPrompt);
      setPreFilledPrompt(null);
    }
  }, [preFilledPrompt]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsLoading(true);
    setImageUrl('');
    setSuggestions(null);
    try {
      const result = await generateImageFromText(input);
      setImageUrl(result);
      addCreation({ prompt: input, imageUrl: result, model: 'Flux AI' });
      showToast("Masterpiece generated!");
    } catch (err) {
      showToast("Generation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzePromptQuality(input);
      setSuggestions(result);
    } catch (err) {
      showToast("Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInspire = async () => {
    setIsLoading(true);
    try {
      const result = await generateRandomIdea();
      setInput(result);
      showToast("New idea injected!");
    } catch (err) {
      showToast("Idea generation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const applyStyle = (styleVal: string) => {
    setInput(prev => `${prev.trim()}, ${styleVal}`);
    setShowStyleMenu(false);
    showToast("Style applied!");
  };

  useEffect(() => {
    if (imageUrl && creations.length > 0) {
      const last = creations[0];
      if (last.prompt === input) setCurrentId(last.id);
    }
  }, [imageUrl, creations]);

  const handlePublish = () => currentId && publishToCommunity(currentId);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `promptifie-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isPublished = creations.find(c => c.id === currentId)?.isPublished;

  return (
    <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto min-h-screen space-y-24">
      <div className="space-y-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-cyan-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-600/10">
            <Sparkles className="text-cyan-400" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">AI Image Generator</h1>
          <p className="text-slate-400 text-lg">Unleash the Version 3.0 Smart Engine.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="glass-effect rounded-[32px] p-8 border border-black/5 dark:border-white/5 space-y-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prompt Details</label>
                <div className="relative">
                  <button 
                    onClick={() => setShowStyleMenu(!showStyleMenu)}
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase text-accent hover:text-accent-hover transition-colors"
                  >
                    Apply Style <ChevronDown size={12} />
                  </button>
                  {showStyleMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-charcoal border border-black/5 dark:border-white/10 rounded-xl shadow-2xl z-20 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {customStyles.map(s => (
                        <button key={s.id} onClick={() => applyStyle(s.value)} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                          {s.name}
                        </button>
                      ))}
                      {customStyles.length === 0 && <div className="px-4 py-2 text-[10px] text-slate-500">No custom styles found.</div>}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe what you want to see..."
                  className="w-full h-64 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-charcoal dark:text-slate-200 focus:outline-none focus:border-cyan-500 transition-all resize-none text-lg leading-relaxed placeholder:text-slate-300 dark:placeholder:text-slate-700"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button onClick={handleAnalyze} disabled={isAnalyzing || !input.trim()} className="p-2.5 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-xl transition-all shadow-lg" title="Analyze Prompt">
                    {isAnalyzing ? <RefreshCw size={18} className="animate-spin" /> : <Wand2 size={18} />}
                  </button>
                  <button onClick={handleInspire} disabled={isLoading} className="p-2.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-lg" title="Inspire Me">
                    <Dice5 size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !input.trim()}
                className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-cyan-600/20 active:scale-95"
              >
                {isLoading ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} />}
                {isLoading ? 'Generating...' : 'Generate Magic (10 Coins)'}
              </button>
            </div>

            {suggestions && (
              <div className="p-6 bg-accent/5 rounded-3xl border border-accent/20 animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 text-accent font-black text-xs uppercase mb-3"><Wand2 size={14} /> AI Suggestions</div>
                <div className="text-sm text-slate-600 dark:text-slate-300 font-medium whitespace-pre-wrap leading-relaxed">{suggestions}</div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[40px] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl aspect-square bg-slate-100 dark:bg-charcoal flex items-center justify-center relative group">
              {imageUrl ? (
                <img src={imageUrl} alt="Result" className="w-full h-full object-cover animate-in fade-in duration-1000" />
              ) : (
                <div className="text-center p-12 space-y-4 opacity-30">
                  <ImageIcon size={64} className="mx-auto" />
                  <p className="font-bold">Result appears here</p>
                </div>
              )}
              {isLoading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 text-white">
                  <RefreshCw size={48} className="animate-spin text-cyan-400" />
                  <p className="font-black uppercase tracking-widest text-xs">Dreaming up your visual...</p>
                </div>
              )}
            </div>

            {imageUrl && !isLoading && (
              <div className="flex gap-4 animate-in slide-in-from-bottom-4 duration-500">
                <button onClick={downloadImage} className="flex-1 py-4 bg-slate-100 dark:bg-charcoal hover:bg-slate-200 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
                  <Download size={18} /> Download
                </button>
                <button 
                  onClick={handlePublish}
                  disabled={isPublished}
                  className={`flex-1 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${isPublished ? 'bg-emerald-500/10 text-emerald-500' : 'bg-accent text-white hover:bg-accent-hover active:scale-95'}`}
                >
                  <Globe size={18} /> {isPublished ? 'Published' : 'Publish'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                Your Imagination, Visualized
            </h2>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-charcoal">
                <img 
                    src="/images/generator-demo.png" 
                    alt="AI Image Generator demo"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start pb-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Your Imagination, Visualized</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              This is where your ideas come to life. The AI Image Generator is powered by cutting-edge generative models that transform your text descriptions into stunning, unique images. Describe anything you can imagine – a futuristic cityscape, a mythical creature, or a photorealistic portrait – and watch as the AI paints your vision into reality.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">خيالك، في صورة</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              هنا، تتحول أفكارك إلى حقيقة. يعمل 'مولد الصور بالذكاء الاصطناعي' بنماذج توليدية متطورة تقوم بتحويل أوصافك النصية إلى صور مذهلة وفريدة. قم بوصف أي شيء يمكنك تخيله - منظر مدينة مستقبلية، مخلوق أسطوري، أو بورتريه واقعي - وشاهد كيف يرسم الذكاء الاصطناعي رؤيتك ويحولها إلى واقع.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIImageGenerator;
