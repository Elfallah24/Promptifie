
import React, { useState, useRef } from 'react';
import { Upload, Palette, RefreshCw, Copy, Check, Sparkles, ImageIcon, Download } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { extractPaletteFromImage } from '../services/gemini';

const ColorPaletteGenerator: React.FC = () => {
  const { showToast, isLoggedIn, openAuthModal, consumeCoins } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setPalette([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePalette = async () => {
    if (!isLoggedIn) return openAuthModal('SIGN_UP');
    if (!image) return showToast("Upload an image first.");

    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsGenerating(true);
    try {
      const colors = await extractPaletteFromImage(image);
      setPalette(colors);
      showToast("Color DNA extracted successfully!");
    } catch (err) {
      showToast("Failed to generate palette. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    showToast(`Copied ${hex}!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto min-h-screen space-y-20">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-sky-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-500/10 animate-float">
          <Palette className="text-sky-500" size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Color Palette Generator</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Extract the color palette from any image.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <div className="glass-effect p-8 rounded-[40px] border border-black/5 dark:border-white/10 shadow-2xl flex flex-col items-center gap-10">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative w-full max-w-xl h-80 rounded-[32px] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden shadow-inner group
              ${image ? 'border-sky-500' : 'border-slate-200 dark:border-white/10 hover:border-sky-500 hover:bg-sky-500/5'}`}
          >
            {image ? (
              <img src={image} alt="Source" className="w-full h-full object-contain bg-slate-50 dark:bg-black" />
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  <Upload className="text-slate-400" size={28} />
                </div>
                <p className="text-xl font-black">Drop image for color extraction</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
          </div>

          <button
            onClick={handleGeneratePalette}
            disabled={isGenerating || !image}
            className={`w-full max-w-md py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95
              ${isGenerating || !image ? 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-sky-500 text-white shadow-sky-500/20'}`}
          >
            {isGenerating ? <RefreshCw className="animate-spin" size={24} /> : <Palette size={24} />}
            {isGenerating ? 'Extracting Colors...' : 'Generate Palette (10 Coins)'}
          </button>
        </div>

        {palette.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-sky-500 text-center">Harmonious Color DNA</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {palette.map((hex, i) => (
                <div key={i} className="space-y-3 group animate-in zoom-in duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                  <div 
                    onClick={() => copyToClipboard(hex)}
                    className="w-full aspect-square rounded-2xl shadow-lg border border-black/5 dark:border-white/10 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                    style={{ backgroundColor: hex }}
                  />
                  <button 
                    onClick={() => copyToClipboard(hex)}
                    className="w-full py-2 bg-slate-50 dark:bg-charcoal rounded-xl text-[10px] font-black tracking-widest border border-transparent hover:border-sky-500/50 flex items-center justify-center gap-1.5 transition-all"
                  >
                    {copiedHex === hex ? (
                      <span className="text-emerald-500 flex items-center gap-1"><Check size={12} /> Copied!</span>
                    ) : (
                      <>
                        {hex.toUpperCase()} <Copy size={10} className="opacity-30" />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                Discover the Colors of Inspiration
            </h2>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
                <img 
                    src="/images/palette-demo.png" 
                    alt="Color Palette Generator demo"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Discover the Colors of Inspiration</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Instantly extract the dominant colors from any photo. Our AI analyzes your image and generates a beautiful, harmonious color palette, complete with Hex codes for you to use in your design projects. It's the perfect way to find color inspiration for your website, brand, or artwork.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">اكتشف ألوان الإلهام</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              استخرج الألوان السائدة من أي صورة فورًا. يقوم الذكاء الاصطناعي بتحليل صورتك ويولد لوحة ألوان جميلة ومتناغمة، مع أكواد Hex لتستخدمها في مشاريعك التصميمية. إنها الطريقة المثلى للعثور على إلهام الألوان لموقعك، علامتك التجارية، أو عملك الفني.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorPaletteGenerator;
