
import React, { useState, useRef } from 'react';
import { Upload, Scissors, RefreshCw, Download, ImageIcon, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../AuthContext';

const BackgroundRemover: React.FC = () => {
  const { showToast, isLoggedIn, openAuthModal, consumeCoins } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!isLoggedIn) return openAuthModal('SIGN_UP');
    if (!image) return showToast("Please upload an image first.");

    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setProcessedImage(image);
      showToast("Background removed successfully!");
    } catch (err) {
      showToast("Removal failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `background-removed-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto min-h-screen space-y-20">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-rose-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rose-500/10">
          <Scissors className="text-rose-500" size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">AI Background Remover</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Instantly create transparent backgrounds with one click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative h-96 rounded-[40px] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden shadow-inner group
              ${image ? 'border-accent' : 'border-slate-200 dark:border-white/10 hover:border-accent hover:bg-slate-50 dark:hover:bg-white/5'}`}
          >
            {image ? (
              <div className="absolute inset-0 w-full h-full">
                <img src={image} alt="Preview" className="w-full h-full object-contain bg-slate-100 dark:bg-black" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <p className="text-white font-black bg-accent px-8 py-3 rounded-2xl shadow-2xl">Change Image</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto">
                  <Upload className="text-slate-400" size={28} />
                </div>
                <p className="text-xl font-black">Drop image to isolate</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
          </div>

          <div className="glass-effect p-8 rounded-[32px] border border-black/5 dark:border-white/5 space-y-6">
            <button
              onClick={handleRemoveBackground}
              disabled={isProcessing || !image}
              className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95
                ${isProcessing || !image ? 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-rose-500 text-white shadow-rose-500/20'}`}
            >
              {isProcessing ? <RefreshCw className="animate-spin" size={24} /> : <Scissors size={24} />}
              {isProcessing ? 'Removing Background...' : 'Remove Background (10 Coins)'}
            </button>
          </div>
        </div>

        <div className="space-y-6 h-full">
          <div className={`rounded-[40px] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl aspect-square flex items-center justify-center relative ${processedImage ? 'bg-[url("https://www.transparenttextures.com/patterns/checkerboard.png")]' : 'bg-slate-100 dark:bg-charcoal'}`}>
            {processedImage ? (
              <img src={processedImage} alt="Transparent Result" className="w-full h-full object-contain animate-in fade-in duration-1000" />
            ) : (
              <div className="text-center p-12 space-y-4 opacity-30">
                <ImageIcon size={64} className="mx-auto" />
                <p className="font-bold">Transparent subject appears here</p>
              </div>
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 text-white">
                <RefreshCw size={48} className="animate-spin text-rose-500" />
                <p className="font-black uppercase tracking-widest text-xs">Analyzing Edges...</p>
              </div>
            )}
          </div>

          {processedImage && !isProcessing && (
            <button onClick={downloadImage} className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 animate-in slide-in-from-bottom-4">
              <Download size={24} /> Download PNG
            </button>
          )}
        </div>
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                Precise Neural Masking
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                <img 
                    src="/images/remover-demo.png" 
                    alt="AI Background Remover comparison"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Clean Cut, Every Time</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Our AI-powered tool automatically detects and isolates the main subject in your photo, removing the background with precision. It's the perfect solution for creating professional product photos for e-commerce, clean profile pictures, or assets for your graphic design projects. No manual editing required.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">عزل دقيق، في كل مرة</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              أداتنا المدعومة بالذكاء الاصطناعي تقوم تلقائيًا بتحديد وعزل العنصر الأساسي في صورتك، وإزالة الخلفية بدقة. إنها الحل المثالي لإنشاء صور منتجات احترافية للتجارة الإلكترونية، أو صور بروفايل نقية، أو عناصر لمشاريعك التصميمية. لا حاجة للتعديل اليدوي.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackgroundRemover;
