
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Copy, Check, Zap, RefreshCw, Sparkles, Heart, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROMPT_MODELS } from '../constants';
import { PromptModel } from '../types';
import { generatePromptFromImage } from '../services/gemini';
import { useAuth } from '../AuthContext';

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 10 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

const ImageToPrompt: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userTier, openAuthModal, creations, addCreation, toggleFavorite, preFilledPrompt, setPreFilledPrompt, showToast, consumeCoins } = useAuth();
  const [selectedModel, setSelectedModel] = useState<PromptModel>(PromptModel.GENERAL);
  const [image, setImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preFilledPrompt) {
      setGeneratedPrompt(preFilledPrompt);
      setPreFilledPrompt(null);
      showToast("Prompt pre-filled!");
    }
  }, [preFilledPrompt]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModelSelect = (model: any) => {
    if (model.isPremium) {
      const isSubscriber = isLoggedIn && userTier !== 'Free';
      if (!isSubscriber) {
        showToast("This is a premium feature. Redirecting to plans...");
        navigate('/pricing');
        return;
      }
    }
    setSelectedModel(model.id as PromptModel);
  };

  const onGenerate = async () => {
    if (!isLoggedIn) return openAuthModal('SIGN_UP');
    
    if (!image) return setError("Upload an image first.");

    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsGenerating(true);
    setRevealing(false);
    setError(null);
    setGeneratedPrompt('');

    try {
      const prompt = await generatePromptFromImage(image, selectedModel);
      setIsGenerating(false);
      setRevealing(true);
      setGeneratedPrompt(prompt);
      addCreation({ prompt, imageUrl: image, model: selectedModel });
    } catch (err: any) {
      setError(err.message || "An error occurred.");
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    showToast("Copied!");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const currentCreation = creations.find(c => c.prompt === generatedPrompt);

  return (
    <div className="pt-32 pb-32 px-4 max-w-5xl mx-auto space-y-16 min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight uppercase">Reverse Neural Engineering</h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">Metadata Extraction Protocol</p>
      </div>

      <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`relative h-[500px] rounded-[48px] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden shadow-inner group
            ${image ? 'border-accent bg-accent/5' : 'border-slate-200 dark:border-white/10 hover:border-accent hover:bg-slate-50 dark:hover:bg-white/5'}`}
        >
          {image ? (
            <div className="absolute inset-0 w-full h-full">
              <img src={image} alt="Preview" className="w-full h-full object-contain bg-slate-100 dark:bg-black" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <p className="text-white font-black bg-accent px-10 py-4 rounded-2xl shadow-2xl scale-90 group-hover:scale-100 transition-transform">Switch Source Image</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-[32px] flex items-center justify-center mx-auto shadow-xl group-hover:animate-bounce transition-all">
                <Upload className="text-slate-400" size={36} />
              </div>
              <div>
                <p className="text-2xl font-black mb-1">Upload Source Content</p>
                <p className="text-slate-400 text-sm font-medium">Drag and drop or click to explore files</p>
              </div>
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Choose Extraction Model</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {PROMPT_MODELS.map((model) => {
              const isSelected = selectedModel === model.id;
              const isPremium = model.isPremium;
              const userIsSubscriber = isLoggedIn && userTier !== 'Free';
              const showLock = isPremium && !userIsSubscriber;

              return (
                <button 
                  key={model.id} 
                  onClick={() => handleModelSelect(model)} 
                  className={`relative p-6 rounded-[32px] text-left border-2 transition-all active:scale-95 btn-haptic group/btn
                    ${isSelected ? 'border-accent bg-accent/5' : 'border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 hover:border-accent'}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`font-black text-[10px] uppercase tracking-widest ${isSelected ? 'text-accent' : 'text-slate-400'}`}>
                      {model.title}
                    </span>
                    {showLock ? (
                      <div className="flex items-center gap-1 bg-accent/10 px-2 py-0.5 rounded-full">
                        <Crown size={10} className="text-accent" />
                        <span className="text-[8px] font-black text-accent uppercase">Pro</span>
                      </div>
                    ) : (
                      isSelected && <Check size={12} className="text-accent" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-bold mb-3">{model.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="space-y-6">
          <div className="p-4 glass-effect rounded-[32px] border border-black/5 dark:border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-4">
             <button
                disabled={isGenerating}
                onClick={onGenerate}
                className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[24px] font-black text-xl transition-all btn-haptic
                  ${isGenerating ? 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-accent text-white shadow-xl shadow-accent/20'}`}
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} />}
                {isGenerating ? 'Extracting Wisdom...' : 'Reverse Engineer Prompt (10 Coins)'}
              </button>
          </div>

          {error && <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-black animate-shake">{error}</div>}

          <div className="relative">
            <div className="relative overflow-hidden min-h-[400px] bg-slate-50 dark:bg-charcoal-lighter rounded-[48px] p-10 md:p-14 border border-black/5 dark:border-white/5 shadow-2xl font-mono text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {revealing ? (
                <div className="space-y-10 animate-in fade-in duration-1000">
                  <div className="flex justify-between items-center pb-6 border-b dark:border-white/5">
                     <h3 className="text-xs font-black uppercase tracking-widest text-accent">Neural Metadata Extraction Completed</h3>
                     <div className="flex gap-3">
                       {currentCreation && (
                         <button onClick={() => toggleFavorite(currentCreation.id)} className="p-3.5 bg-white dark:bg-black rounded-2xl shadow-lg hover:scale-110 active:scale-90 transition-transform text-red-500 border border-black/5">
                           <Heart size={18} fill={currentCreation.isFavorite ? "currentColor" : "none"} />
                         </button>
                       )}
                       <button onClick={() => copyToClipboard(generatedPrompt)} className="p-3.5 bg-accent text-white rounded-2xl shadow-lg hover:scale-110 active:scale-90 transition-transform">
                         {copySuccess ? <Check size={18} /> : <Copy size={18} />}
                       </button>
                     </div>
                  </div>
                  <div className="italic text-xl md:text-2xl text-charcoal dark:text-offwhite leading-relaxed">
                    <TypewriterText text={generatedPrompt} delay={15} />
                  </div>
                </div>
              ) : isGenerating ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 opacity-60">
                    <RefreshCw size={56} className="animate-spin text-accent" />
                    <div className="text-center space-y-2">
                      <p className="font-black uppercase tracking-widest text-xs animate-pulse">Deep Learning Analysis Active</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Decoding pixels into semantic logic</p>
                    </div>
                 </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 text-center p-12">
                  <Sparkles size={80} className="mb-8" />
                  <p className="font-black text-2xl uppercase tracking-tighter">Awaiting Source Data</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                The Heart of Your Creation
            </h2>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-charcoal">
                <img 
                    src="/images/image-to-prompt-demo.png" 
                    alt="Image to Prompt demo"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start pb-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">The Heart of Your Creation</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              This is our core technology. Upload any image – a photograph, a sketch, a digital painting – and our advanced AI will analyze its every detail. It deconstructs the subject, environment, style, and composition to generate a high-quality, structured text prompt, giving you the perfect starting point for your next masterpiece.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">قلب إبداعك</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              هذه هي تقنيتنا الأساسية. قم برفع أي صورة - صورة فوتوغرافية، رسم، أو لوحة رقمية - وسيقوم الذكاء الاصطناعي المتقدم بتحليل كل تفاصيلها. يقوم بتفكيك الموضوع، البيئة، الأسلوب، والتكوين ليولد أمرًا نصيًا منظمًا وعالي الجودة، مما يمنحك نقطة البداية المثالية لتحفتك الفنية القادمة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageToPrompt;
