
import React, { useState, useRef } from 'react';
import { Layers, Upload, Plus, RefreshCw, Copy, Check, Sparkles, Wand2 } from 'lucide-react';
import { generateRemixPrompt } from '../services/gemini';
import { useAuth } from '../AuthContext';

const Remix: React.FC = () => {
  const { showToast, addCreation, isLoggedIn, openAuthModal, consumeCoins } = useAuth();
  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const [remixResult, setRemixResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemix = async () => {
    if (!isLoggedIn) return openAuthModal('SIGN_UP');
    if (!imageA || !imageB) return showToast("Upload both images first!");
    
    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsLoading(true);
    try {
      const result = await generateRemixPrompt(imageA, imageB);
      setRemixResult(result);
      addCreation({ prompt: result, imageUrl: imageA, model: 'Remix Tool' });
      showToast("Blended prompt generated!");
    } catch (err) {
      showToast("Remix failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(remixResult);
    setCopySuccess(true);
    showToast("Prompt copied!");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto min-h-screen space-y-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-purple-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-600/10">
            <Layers className="text-purple-400" size={40} />
          </div>
          <h1 className="text-5xl font-black mb-4">Image Remix Tool</h1>
          <p className="text-slate-400 text-lg">Upload two images and let AI blend their souls into a single prompt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div 
            onClick={() => fileInputARef.current?.click()}
            className={`h-72 rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${imageA ? 'border-accent bg-accent/5' : 'border-slate-300 dark:border-white/10 hover:border-accent'}`}
          >
            {imageA ? <img src={imageA} className="w-full h-full object-cover" /> : <div className="text-center p-8"><Upload className="mx-auto mb-2 opacity-50" /><p className="text-xs font-black uppercase">Image A</p></div>}
            <input type="file" ref={fileInputARef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, setImageA)} />
          </div>

          <div 
            onClick={() => fileInputBRef.current?.click()}
            className={`h-72 rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${imageB ? 'border-accent bg-accent/5' : 'border-slate-300 dark:border-white/10 hover:border-accent'}`}
          >
            {imageB ? <img src={imageB} className="w-full h-full object-cover" /> : <div className="text-center p-8"><Upload className="mx-auto mb-2 opacity-50" /><p className="text-xs font-black uppercase">Image B</p></div>}
            <input type="file" ref={fileInputBRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, setImageB)} />
          </div>
        </div>

        <div className="flex justify-center mb-12">
           <button 
             onClick={handleRemix}
             disabled={isLoading || !imageA || !imageB}
             className="px-12 py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-purple-600/20 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
           >
             {isLoading ? <RefreshCw className="animate-spin" /> : <Wand2 />}
             {isLoading ? 'Mixing...' : 'Generate Remix Prompt (10 Coins)'}
           </button>
        </div>

        {remixResult && (
          <div className="glass-effect p-8 rounded-[40px] border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Sparkles size={14} className="text-purple-400" /> Remixed Vision</h3>
              <button onClick={copyToClipboard} className="text-accent hover:text-accent-hover text-xs font-black flex items-center gap-1.5 uppercase transition-colors">
                {copySuccess ? <Check size={14} /> : <Copy size={14} />} {copySuccess ? 'Copied' : 'Copy Result'}
              </button>
            </div>
            <p className="text-xl font-medium italic leading-relaxed text-charcoal dark:text-offwhite">"{remixResult}"</p>
          </div>
        )}
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                Create the Unimaginable
            </h2>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-charcoal">
                <img 
                    src="/images/remix-demo.png" 
                    alt="Image Remix demo"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start pb-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Create the Unimaginable</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              What happens when you blend two different worlds? The Image Remix tool lets you find out. Upload two separate images, and our AI will analyze the core concepts of each, then generate a new, creative prompt that fuses them together. It's the ultimate tool for brainstorming, creating hybrid concepts, and pushing the boundaries of your imagination.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">اصنع ما لا يمكن تصوره</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              ماذا يحدث عندما تدمج عالمين مختلفين؟ أداة 'مزج الصور' تتيح لك اكتشاف ذلك. قم برفع صورتين منفصلتين، وسيقوم الذكاء الاصطناعي بتحليل المفاهيم الأساسية لكل منهما، ثم يولد أمرًا نصيًا جديدًا ومبدعًا يدمجهما معًا. إنها الأداة المثلى للعصف الذهني، وإنشاء مفاهيم هجينة، وتجاوز حدود خيالك.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Remix;
