
import React, { useState } from 'react';
import { Wand2, Zap, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { enhancePrompt } from '../services/gemini';
import { useAuth } from '../AuthContext';

const MagicEnhance: React.FC = () => {
  const { consumeCoins, showToast } = useAuth();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    // Standardized 10 Coin Cost
    if (!consumeCoins(10)) return;

    setIsLoading(true);
    try {
      const result = await enhancePrompt(input);
      setOutput(result);
      showToast("Prompt enhanced!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto min-h-screen space-y-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-indigo-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/10">
            <Wand2 className="text-indigo-400" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Magic Enhance</h1>
          <p className="text-slate-400 text-lg">Turn simple ideas into brilliant, detailed prompts.</p>
        </div>

        <div className="space-y-8">
          <div className="glass-effect rounded-[32px] p-8 border border-white/5 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Concept</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a basic prompt..."
                className="w-full h-40 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-charcoal dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition-all resize-none text-lg leading-relaxed placeholder:text-slate-300 dark:placeholder:text-slate-700"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              {isLoading ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} />}
              {isLoading ? 'Enhancing...' : 'Generate Enhanced Prompt (10 Coins)'}
            </button>
          </div>

          {output && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <div className="flex items-center justify-between ml-1">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Sparkles size={14} className="text-indigo-400" /> Enhanced Result
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-[10px] font-black uppercase tracking-widest"
                >
                  {copySuccess ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copySuccess ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <div className="glass-effect rounded-[32px] p-8 border border-indigo-500/20 bg-indigo-500/5 shadow-inner">
                <p className="text-charcoal dark:text-slate-200 text-lg leading-relaxed italic font-medium">
                  "{output}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="pt-20 border-t dark:border-white/5 space-y-24">
        <div className="my-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-6 text-charcoal dark:text-offwhite">
                From Simple to Spectacular
            </h2>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-charcoal">
                <img 
                    src="/images/enhance-demo.png" 
                    alt="Magic Enhance demo"
                    className="w-full h-auto"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start pb-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tight">From Simple to Spectacular</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Our Magic Enhance tool acts as your creative co-pilot. It takes your basic, one-line ideas and transforms them into rich, detailed, and powerful prompts. The AI automatically adds artistic context, lighting conditions, camera angles, and stylistic elements, giving you professional-level results without the creative heavy lifting.
            </p>
          </div>
          
          <div className="space-y-6 text-right" dir="rtl">
            <h2 className="text-4xl font-black tracking-tight">من بسيط إلى باهر</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              تعمل أداة 'التحسين السحري' لدينا كمساعد طيار إبداعي لك. تأخذ أفكارك الأساسية البسيطة وتحولها إلى أوامر نصية غنية، مفصلة، وقوية. يقوم الذكاء الاصطناعي تلقائيًا بإضافة السياق الفني، ظروف الإضاءة، زوايا الكاميرا، والعناصر الأسلوبية، مما يمنحك نتائج بمستوى احترافي دون عناء إبداعي كبير.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MagicEnhance;
