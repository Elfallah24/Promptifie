
import React, { useState } from 'react';
import { Layout, Zap, RefreshCw, Download, Sparkles, Building2, Palette, Box, Type, Check, Globe, X } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { generateLogoConcept } from '../services/gemini';

const INDUSTRIES = ["Technology", "Food & Drink", "Fashion", "Real Estate", "Healthcare", "Education", "Consulting", "Fitness", "Automotive", "Entertainment"];
const COLOR_STYLES = [
  { id: 'vibrant', label: 'Vibrant & Energetic', colors: ['#FF5F6D', '#FFC371'] },
  { id: 'calm', label: 'Calm & Trustworthy', colors: ['#2193b0', '#6dd5ed'] },
  { id: 'modern', label: 'Modern & Minimalist', colors: ['#232526', '#414345'] },
  { id: 'nature', label: 'Organic & Natural', colors: ['#11998e', '#38ef7d'] },
];
const ICON_STYLES = ["Abstract", "Literal", "Geometric", "Lettermark", "Emblem", "Line Art"];

const LogoGenerator: React.FC = () => {
  const { showToast, isLoggedIn, userTier, openAuthModal, consumeCoins } = useAuth();
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [colorStyle, setColorStyle] = useState(COLOR_STYLES[0].id);
  const [iconStyle, setIconStyle] = useState(ICON_STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<{ id: string; url: string }[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<{ id: string; url: string } | null>(null);

  const handleGenerate = async () => {
    if (!isLoggedIn) return openAuthModal('SIGN_UP');
    if (!brandName.trim()) return showToast("Please enter your brand name.");

    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsGenerating(true);
    setResults([]);
    try {
      const concepts: { id: string; url: string }[] = [];
      for (let i = 0; i < 4; i++) {
        const conceptUrl = await generateLogoConcept(
          brandName, 
          industry, 
          COLOR_STYLES.find(c => c.id === colorStyle)?.label || 'Professional', 
          `${iconStyle} variation ${i + 1}`
        );
        concepts.push({ id: `logo-${i}`, url: conceptUrl });
      }
      setResults(concepts);
      showToast("Logo concepts ready!");
    } catch (err) {
      showToast("Logo generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadLogo = (url: string, format: 'PNG' | 'SVG') => {
    if (format === 'SVG' && userTier === 'Free') {
      showToast("SVG export is a Pro feature.");
      return;
    }
    const link = document.createElement('a');
    link.href = url;
    link.download = `${brandName}-logo-${Date.now()}.${format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-6xl mx-auto min-h-screen space-y-16">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/10">
          <Layout className="text-indigo-500" size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">AI Logo Generator</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Create a unique, professional logo for your brand in minutes.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-charcoal-lighter rounded-[48px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden">
        <div className="flex border-b dark:border-white/5">
          {[1, 2, 3, 4].map((s) => (
            <button 
              key={s} 
              disabled={s > step && !results.length}
              onClick={() => setStep(s)}
              className={`flex-1 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${step === s ? 'text-indigo-500 bg-indigo-500/5' : 'text-slate-400'}`}
            >
              Step {s}
            </button>
          ))}
        </div>

        <div className="p-12 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-black flex items-center gap-3"><Type className="text-indigo-500" /> What's your brand name?</h3>
                <p className="text-slate-500 text-sm">Enter the exact name you want to appear in your logo.</p>
              </div>
              <input 
                type="text" 
                value={brandName} 
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Promptifie"
                className="w-full bg-slate-100 dark:bg-charcoal border border-black/5 p-6 rounded-[28px] text-2xl font-black focus:outline-none focus:border-indigo-500 transition-all"
              />
              <button onClick={() => setStep(2)} disabled={!brandName} className="px-10 py-5 bg-indigo-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 active:scale-95 disabled:opacity-50">Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-black flex items-center gap-3"><Building2 className="text-indigo-500" /> Select your industry</h3>
                <p className="text-slate-500 text-sm">This helps us tailor the aesthetic to your market.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {INDUSTRIES.map(ind => (
                  <button 
                    key={ind} 
                    onClick={() => setIndustry(ind)}
                    className={`p-6 rounded-[24px] text-xs font-black uppercase tracking-widest border-2 transition-all ${industry === ind ? 'border-indigo-500 bg-indigo-500/5 text-indigo-500' : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-charcoal text-slate-500 hover:border-indigo-500/30'}`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(3)} className="px-10 py-5 bg-indigo-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 active:scale-95">Continue</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-black flex items-center gap-3"><Palette className="text-indigo-500" /> Choose a color mood</h3>
                <p className="text-slate-500 text-sm">Pick the palette that represents your brand values.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COLOR_STYLES.map(style => (
                  <button 
                    key={style.id} 
                    onClick={() => setColorStyle(style.id)}
                    className={`p-8 rounded-[32px] border-2 transition-all text-left flex items-center gap-6 ${colorStyle === style.id ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-charcoal'}`}
                  >
                    <div className="flex gap-1">
                      {style.colors.map(c => <div key={c} className="w-6 h-6 rounded-full" style={{ backgroundColor: c }} />)}
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest">{style.label}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(4)} className="px-10 py-5 bg-indigo-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 active:scale-95">Continue</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-black flex items-center gap-3"><Box className="text-indigo-500" /> Pick an icon style</h3>
                <p className="text-slate-500 text-sm">Select the visual approach for your symbol.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ICON_STYLES.map(style => (
                  <button 
                    key={style} 
                    onClick={() => setIconStyle(style)}
                    className={`p-6 rounded-[24px] text-xs font-black uppercase tracking-widest border-2 transition-all ${iconStyle === style ? 'border-indigo-500 bg-indigo-500/5 text-indigo-500' : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-charcoal text-slate-500 hover:border-indigo-500/30'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full py-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-[24px] font-black text-2xl shadow-2xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-3"
              >
                {isGenerating ? <RefreshCw className="animate-spin" /> : <Zap />}
                {isGenerating ? 'Designing...' : 'Generate Logos (10 Coins)'}
              </button>
            </div>
          )}
        </div>
      </div>

      {results.length > 0 && !isGenerating && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center">
            <h2 className="text-3xl font-black">Your Logo Concepts</h2>
            <p className="text-slate-500 text-sm">Select a design to view or download.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((logo) => (
              <div 
                key={logo.id} 
                onClick={() => setSelectedLogo(logo)}
                className="group relative bg-white dark:bg-charcoal rounded-[40px] border border-black/5 dark:border-white/10 overflow-hidden shadow-xl cursor-pointer hover:border-indigo-500 transition-all aspect-square flex items-center justify-center"
              >
                <img src={logo.url} alt="Logo Concept" className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-indigo-500 px-6 py-2 rounded-full font-black text-[10px] uppercase shadow-2xl">View Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedLogo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelectedLogo(null)}></div>
          <div className="relative w-full max-w-4xl bg-white dark:bg-charcoal-lighter rounded-[48px] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 flex flex-col md:flex-row animate-in zoom-in duration-300">
            <button onClick={() => setSelectedLogo(null)} className="absolute top-8 right-8 p-2 bg-black/10 hover:bg-red-500 text-white rounded-full transition-all z-10"><X size={20} /></button>
            <div className="flex-1 bg-white p-12 flex items-center justify-center min-h-[400px]">
              <img src={selectedLogo.url} alt="Detailed View" className="max-w-full max-h-[400px] object-contain drop-shadow-2xl" />
            </div>
            <div className="w-full md:w-80 p-12 space-y-8 flex flex-col justify-center border-l dark:border-white/5">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Selected Identity</h4>
                <p className="text-2xl font-black">{brandName}</p>
                <p className="text-slate-500 text-xs">{industry} • {iconStyle}</p>
              </div>
              <div className="space-y-4 pt-4 border-t dark:border-white/5">
                <button onClick={() => downloadLogo(selectedLogo.url, 'PNG')} className="w-full py-4 bg-slate-100 dark:bg-charcoal hover:bg-indigo-500 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm">
                   <Download size={16} /> Download PNG
                </button>
                <button onClick={() => downloadLogo(selectedLogo.url, 'SVG')} className="w-full py-4 bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
                   <Sparkles size={16} /> Export SVG (Pro)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                Your Brand's Identity, Reimagined
            </h2>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-charcoal">
                <img 
                    src="/images/logo-demo.png" 
                    alt="AI Logo Generator results demo"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Your Brand's Identity, Reimagined</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              A great logo is the cornerstone of a memorable brand. Our AI Logo Generator simplifies the complex design process into a few easy steps. Just tell us about your business, and our AI will generate dozens of unique, high-quality logo concepts. Find the perfect design, customize it, and download your new logo in high-resolution formats, ready for use.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">هوية علامتك التجارية، بتصور جديد</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              الشعار الرائع هو حجر الزاوية لأي علامة تجارية لا تُنسى. يقوم 'مولد الشعارات' بالذكاء الاصطناعي بتبسيط عملية التصميم المعقدة إلى بضع خطوات سهلة. فقط أخبرنا عن عملك، وسيقوم الذكاء الاصطناعي بتوليد العشرات من مفاهيم الشعارات الفريدة وعالية الجودة. اعثر على التصميم المثالي، قم بتخصيصه، وحمّل شعارك الجديد بصيغ عالية الدقة، جاهزة للاستخدام.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LogoGenerator;
