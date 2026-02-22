
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { User, Shield, CreditCard, Coins, LogOut, ExternalLink, Palette, Trash2, Plus } from 'lucide-react';

declare global {
  interface Window {
    Paddle: any;
  }
}

const Profile: React.FC = () => {
  // Fix: renamed userCredits to userCoins to match AuthContextType
  const { userEmail, userCoins, userTier, customStyles, addCustomStyle, removeCustomStyle, logout, showToast } = useAuth();
  const [styleName, setStyleName] = useState('');
  const [styleVal, setStyleVal] = useState('');

  const openPaddlePortal = () => {
    if (window.Paddle && window.Paddle.Customer) {
      window.Paddle.Customer.portal();
      showToast("Opening portal...");
    } else showToast("Billing system initializing...");
  };

  const handleAddStyle = (e: React.FormEvent) => {
    e.preventDefault();
    if (styleName && styleVal) {
      addCustomStyle(styleName, styleVal);
      setStyleName('');
      setStyleVal('');
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="mb-12 flex items-end gap-6">
        <div className="w-24 h-24 rounded-[32px] bg-accent flex items-center justify-center text-white shadow-2xl">
          <User size={48} />
        </div>
        <div className="mb-2">
          <h1 className="text-4xl font-black mb-1 tracking-tighter">Account Profile</h1>
          <p className="text-slate-500 font-bold">{userEmail}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Custom Styles Section */}
           <div className="bg-white dark:bg-charcoal-lighter border border-black/5 dark:border-white/10 rounded-[32px] p-8 shadow-xl space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Palette size={16} className="text-accent" /> My Prompt Presets</h3>
              <form onSubmit={handleAddStyle} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Preset Name (e.g. 8K Cinema)" value={styleName} onChange={e => setStyleName(e.target.value)} className="bg-slate-100 dark:bg-charcoal border border-black/5 dark:border-white/10 p-4 rounded-2xl text-sm focus:outline-none focus:border-accent transition-all" />
                <input required placeholder="Style Values (e.g. --ar 16:9 --v 6)" value={styleVal} onChange={e => setStyleVal(e.target.value)} className="bg-slate-100 dark:bg-charcoal border border-black/5 dark:border-white/10 p-4 rounded-2xl text-sm focus:outline-none focus:border-accent transition-all" />
                <button className="sm:col-span-2 py-4 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-hover transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20">
                  <Plus size={16} /> Save New Preset
                </button>
              </form>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t dark:border-white/5 mt-6">
                {customStyles.map(s => (
                  <div key={s.id} className="p-4 bg-slate-50 dark:bg-charcoal rounded-2xl border border-black/5 flex justify-between items-start group hover:border-accent transition-all">
                    <div className="overflow-hidden">
                      <p className="text-xs font-black uppercase text-accent mb-1">{s.name}</p>
                      <p className="text-[10px] text-slate-500 line-clamp-2 italic">{s.value}</p>
                    </div>
                    <button onClick={() => removeCustomStyle(s.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                  </div>
                ))}
                {customStyles.length === 0 && (
                  <div className="sm:col-span-2 text-center py-8 opacity-30 italic text-sm">No custom presets saved yet.</div>
                )}
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-accent text-white rounded-[32px] p-8 shadow-xl space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Shield size={120} /></div>
              <div className="relative z-10">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 mb-1"><CreditCard size={16} /> Active Plan</h3>
                <p className="text-3xl font-black mb-6">{userTier} Tier</p>
                <button onClick={openPaddlePortal} className="w-full py-4 bg-white text-accent hover:bg-slate-50 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                  Manage Subscription <ExternalLink size={16} />
                </button>
              </div>
           </div>

           <div className="bg-white dark:bg-charcoal-lighter border border-black/5 dark:border-white/10 rounded-[32px] p-8 shadow-xl">
              <h3 className="text-sm font-black uppercase text-slate-400 flex items-center gap-2 mb-4"><Coins size={16} className="text-accent" /> Available Credits</h3>
              {/* Fix: changed userCredits to userCoins to match context state */}
              <div className="text-4xl font-black mb-1">{userCoins}</div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Generation Power Units</p>
              <button onClick={() => window.location.hash = '#/pricing'} className="w-full mt-6 py-3 bg-slate-100 dark:bg-charcoal border border-black/5 hover:border-accent rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Buy More Credits</button>
           </div>

           <button onClick={logout} className="w-full py-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-[24px] font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2">
             <LogOut size={16} /> Terminate Session
           </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
