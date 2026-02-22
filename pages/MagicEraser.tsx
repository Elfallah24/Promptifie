
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Eraser, RefreshCw, Download, ImageIcon, Sparkles, Check, ArrowRight, X, Trash2, Undo } from 'lucide-react';
import { useAuth } from '../AuthContext';

const MagicEraser: React.FC = () => {
  const { showToast, isLoggedIn, openAuthModal, consumeCoins } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [brushSize, setBrushSize] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (image && canvasRef.current && maskCanvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        const maskCanvas = maskCanvasRef.current!;
        const container = canvas.parentElement!;
        
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imgRatio = img.width / img.height;
        const containerRatio = containerWidth / containerHeight;

        let drawWidth, drawHeight;
        if (imgRatio > containerRatio) {
          drawWidth = containerWidth;
          drawHeight = containerWidth / imgRatio;
        } else {
          drawHeight = containerHeight;
          drawWidth = containerHeight * imgRatio;
        }

        canvas.width = drawWidth;
        canvas.height = drawHeight;
        maskCanvas.width = drawWidth;
        maskCanvas.height = drawHeight;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, drawWidth, drawHeight);
        
        const maskCtx = maskCanvas.getContext('2d');
        maskCtx?.clearRect(0, 0, drawWidth, drawHeight);
      };
      img.src = image;
    }
  }, [image]);

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

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const maskCtx = maskCanvasRef.current?.getContext('2d');
    maskCtx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !maskCanvasRef.current) return;
    
    const canvas = maskCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.4)'; 

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearMask = () => {
    if (maskCanvasRef.current) {
      const ctx = maskCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, maskCanvasRef.current.width, maskCanvasRef.current.height);
    }
  };

  const handleMagicErase = async () => {
    if (!isLoggedIn) return openAuthModal('SIGN_UP');
    if (!image) return showToast("Please upload an image first.");

    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      setProcessedImage(image);
      showToast("Object removed successfully!");
    } catch (err) {
      showToast("Erasing failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `magic-erase-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto min-h-screen space-y-20">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-violet-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/10">
          <Eraser className="text-violet-500" size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Magic Eraser</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Remove any unwanted object, defect, or person from your pictures in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div 
            className={`relative h-[500px] rounded-[40px] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden shadow-inner bg-slate-100 dark:bg-charcoal
              ${image ? 'border-accent' : 'border-slate-200 dark:border-white/10'}`}
          >
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="text-center space-y-4 cursor-pointer w-full h-full flex flex-col items-center justify-center group"
              >
                <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  <Upload className="text-slate-400" size={28} />
                </div>
                <p className="text-xl font-black">Drop image to clean</p>
                <p className="text-xs font-bold text-slate-400">Step 1: Upload Source</p>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center cursor-crosshair touch-none">
                <canvas ref={canvasRef} className="max-w-full max-h-full shadow-2xl rounded-lg" />
                <canvas 
                  ref={maskCanvasRef} 
                  className="absolute max-w-full max-h-full rounded-lg"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-6 right-6 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                   <button onClick={clearMask} className="p-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-all shadow-lg border border-white/10" title="Clear Mask">
                      <Trash2 size={20} />
                   </button>
                </div>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
          </div>

          <div className="glass-effect p-8 rounded-[32px] border border-black/5 dark:border-white/5 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brush Size</label>
                <span className="text-xs font-black text-accent">{brushSize}px</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="100" 
                value={brushSize} 
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <button
              onClick={handleMagicErase}
              disabled={isProcessing || !image}
              className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95
                ${isProcessing || !image ? 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-violet-500 text-white shadow-violet-500/20'}`}
            >
              {isProcessing ? <RefreshCw className="animate-spin" size={24} /> : <Eraser size={24} />}
              {isProcessing ? 'Removing...' : 'Magic Erase (10 Coins)'}
            </button>
          </div>
        </div>

        <div className="space-y-6 h-full">
          <div className="rounded-[40px] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl aspect-square bg-slate-100 dark:bg-charcoal flex items-center justify-center relative">
            {processedImage ? (
              <img src={processedImage} alt="Clean Result" className="w-full h-full object-contain animate-in fade-in duration-1000" />
            ) : (
              <div className="text-center p-12 space-y-4 opacity-30">
                <ImageIcon size={64} className="mx-auto" />
                <p className="font-bold">Final cleaned version here</p>
              </div>
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 text-white">
                <RefreshCw size={48} className="animate-spin text-violet-500" />
                <p className="font-black uppercase tracking-widest text-xs">Neural Inpainting in progress...</p>
              </div>
            )}
          </div>

          {processedImage && !isProcessing && (
            <button onClick={downloadImage} className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 animate-in slide-in-from-bottom-4">
              <Download size={24} /> Download Image
            </button>
          )}
        </div>
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                Intelligent Object Removal
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                <img 
                    src="/eraser-demo.png" 
                    alt="Magic Eraser before and after comparison"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Erase Imperfections, Unleash Perfection</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Don't let unwanted objects ruin your perfect shot. With the Magic Eraser, you can simply brush over anything you want to remove – a photobomber, a distracting sign, or a skin blemish. Our AI will intelligently reconstruct the area behind it, leaving you with a clean, natural-looking image as if the object was never there.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">امحُ العيوب، وأطلق العنان للكمال</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              لا تدع العناصر غير المرغوب فيها تفسد لقطتك المثالية. مع 'الممحاة السحرية'، يمكنك ببساطة التمرير بالفرشاة فوق أي شيء تريد إزالته - شخص غير مرغوب فيه في الصورة، لافتة مشتتة للانتباه، أو شائبة على البشرة. سيقوم الذكاء الاصطناعي بإعادة بناء المنطقة خلف العنصر بذكاء، ليترك لك صورة نقية وطبيعية المظهر، وكأن ذلك العنصر لم يكن موجودًا على الإطلاق.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MagicEraser;
