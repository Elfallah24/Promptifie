
import React, { useState } from 'react';
import { Chrome, MousePointer2, Zap, Rocket, CheckCircle2, Mail } from 'lucide-react';
import { useAuth } from '../AuthContext';

const Extension: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useAuth();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("You've been added to the waitlist!");
    setEmail('');
  };

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="relative overflow-hidden bg-[#482C72] rounded-[48px] p-12 md:p-24 mb-24 flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 p-10 opacity-5">
           <Chrome size={400} />
        </div>
        <div className="relative z-10 max-w-3xl space-y-8">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-xs font-black uppercase tracking-widest border border-white/20">
             <Rocket size={14} className="text-yellow-400" /> Launching Summer 2026
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
             Promptifie Anywhere.
           </h1>
           <p className="text-xl md:text-2xl text-purple-100 font-medium">
             The official browser extension. Right-click any image on the web and reverse-engineer it instantly. No more tabs, no more friction.
           </p>
           
           <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto w-full pt-8">
             <div className="relative flex-grow">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
               <input 
                 required
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="name@company.com"
                 className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-all placeholder:text-white/40"
               />
             </div>
             <button type="submit" className="px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-charcoal rounded-2xl font-black text-lg transition-all shadow-2xl shadow-yellow-400/20 active:scale-95">
               Join Waitlist
             </button>
           </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-yellow-400/10 rounded-3xl flex items-center justify-center text-yellow-400">
            <MousePointer2 size={32} />
          </div>
          <h3 className="text-2xl font-black">Right-Click Discovery</h3>
          <p className="text-slate-500 leading-relaxed font-medium">Found a cool style on Instagram or Pinterest? Right-click, select "Promptifie It", and the prompt appears in a side-panel.</p>
        </div>
        <div className="space-y-6">
          <div className="w-16 h-16 bg-purple-400/10 rounded-3xl flex items-center justify-center text-purple-400">
            <Zap size={32} />
          </div>
          <h3 className="text-2xl font-black">Instant Analysis</h3>
          <p className="text-slate-500 leading-relaxed font-medium">Powered by Gemini 3.0, the extension performs the full analysis without leaving your current webpage.</p>
        </div>
        <div className="space-y-6">
          <div className="w-16 h-16 bg-blue-400/10 rounded-3xl flex items-center justify-center text-blue-400">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-black">Sync Across Devices</h3>
          <p className="text-slate-500 leading-relaxed font-medium">Every prompt generated via the extension is automatically synced to your "My Creations" history on the web app.</p>
        </div>
      </div>
    </div>
  );
};

export default Extension;
