
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { 
  User, Shield, CreditCard, Trash2, Camera, Mail, KeyRound, 
  ChevronRight, AlertCircle, Coins, Check, ExternalLink, X
} from 'lucide-react';

declare global {
  interface Window {
    Paddle: any;
  }
}

type SettingsTab = 'profile' | 'security' | 'billing' | 'danger';

const Settings: React.FC = () => {
  const { userEmail, userCoins, userTier, showToast, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const handlePaddlePortal = () => {
    if (window.Paddle && window.Paddle.Customer) {
      window.Paddle.Customer.portal();
      showToast("Opening secure billing portal...");
    } else {
      showToast("Billing system initializing, please try again.");
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile settings updated!");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm === 'DELETE') {
      showToast("Account scheduled for deletion.");
      logout();
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
    { id: 'danger', label: 'Account', icon: <AlertCircle size={18} /> },
  ];

  return (
    <div className="pt-32 pb-32 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 space-y-2">
          <div className="mb-10 px-4">
             <h1 className="text-3xl font-black tracking-tighter">Settings</h1>
             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Management Hub</p>
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-xl shadow-accent/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-charcoal'}`}
            >
              <div className="flex items-center gap-3">
                {tab.icon}
                {tab.label}
              </div>
              <ChevronRight size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white dark:bg-charcoal-card border border-black/5 dark:border-white/5 rounded-[40px] shadow-2xl p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
          {activeTab === 'profile' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-black">Personal Information</h2>
                <p className="text-slate-400 text-sm">Update your public presence and account details.</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-slate-50 dark:bg-charcoal rounded-3xl border border-black/5">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-black flex items-center justify-center text-slate-400 overflow-hidden border-2 border-accent">
                      <User size={40} />
                    </div>
                    <button type="button" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                      <Camera size={20} className="text-white" />
                    </button>
                  </div>
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="font-black uppercase text-[10px] tracking-widest text-accent">Avatar Protocol</h3>
                    <p className="text-sm font-medium text-slate-500">JPG or PNG. Max size 5MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name" 
                      className="w-full bg-slate-50 dark:bg-charcoal border border-black/5 p-4 rounded-2xl focus:outline-none focus:border-accent transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        disabled 
                        value={userEmail} 
                        className="w-full bg-slate-100 dark:bg-charcoal/50 border border-black/5 p-4 pl-12 rounded-2xl text-slate-400 cursor-not-allowed" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Bio / Role</label>
                  <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..." 
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-charcoal border border-black/5 p-4 rounded-2xl focus:outline-none focus:border-accent transition-all resize-none" 
                  />
                </div>

                <button type="submit" className="px-10 py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-accent/20 transition-all active:scale-95">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-black">Security Settings</h2>
                <p className="text-slate-400 text-sm">Manage your password and authentication protocols.</p>
              </div>

              <div className="space-y-8">
                <form className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-charcoal border border-black/5 p-4 rounded-2xl focus:outline-none focus:border-accent transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-charcoal border border-black/5 p-4 rounded-2xl focus:outline-none focus:border-accent transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-charcoal border border-black/5 p-4 rounded-2xl focus:outline-none focus:border-accent transition-all" />
                  </div>
                  <button type="button" className="w-full py-4 bg-charcoal dark:bg-charcoal-lighter border border-white/10 hover:border-accent text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <KeyRound size={16} /> Update Password
                  </button>
                </form>

                <div className="pt-10 border-t dark:border-white/5">
                   <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-charcoal rounded-3xl border border-black/5">
                      <div className="space-y-1">
                        <h4 className="font-black text-sm">Two-Factor Authentication</h4>
                        <p className="text-xs text-slate-400 font-medium">Add an extra layer of visual security.</p>
                      </div>
                      <button className="px-6 py-2 bg-slate-200 dark:bg-black rounded-full text-[10px] font-black uppercase text-slate-500 hover:text-accent transition-colors">
                        Enable
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-black">Billing & Subscription</h2>
                <p className="text-slate-400 text-sm">Manage your plan, invoices, and credit balance.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-accent/5 border border-accent/20 rounded-[32px] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl shadow-accent/20">
                      <CreditCard size={24} />
                    </div>
                    <span className="px-3 py-1 bg-accent text-white text-[10px] font-black uppercase rounded-full">Active</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Current Plan</p>
                    <h3 className="text-3xl font-black">{userTier} Tier</h3>
                  </div>
                </div>

                <div className="p-8 bg-amber-500/5 border border-amber-500/20 rounded-[32px] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                      <Coins size={24} />
                    </div>
                    <Check size={20} className="text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Available Balance</p>
                    <h3 className="text-3xl font-black">{userCoins} Coins</h3>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-6">
                <button 
                  onClick={handlePaddlePortal}
                  className="w-full py-6 bg-accent hover:bg-accent-hover text-white rounded-[24px] font-black text-xl shadow-2xl shadow-accent/30 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  Manage Billing & Subscription <ExternalLink size={24} />
                </button>
                <p className="text-center text-xs text-slate-500 font-medium">Invoices and payment methods are handled securely via Paddle.</p>
              </div>
            </div>
          )}

          {activeTab === 'danger' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-red-500">Danger Zone</h2>
                <p className="text-slate-400 text-sm">Irreversible actions concerning your account data.</p>
              </div>

              <div className="p-8 border-2 border-red-500/20 bg-red-500/5 rounded-[32px] space-y-6">
                <div className="space-y-2">
                   <h3 className="font-black text-red-500 flex items-center gap-2"><Trash2 size={18} /> Delete My Account</h3>
                   <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                     Once you delete your account, there is no going back. All of your creations, credits, and subscription data will be permanently removed from our neural servers.
                   </p>
                </div>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all active:scale-95"
                >
                  Terminate Account
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowDeleteModal(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-charcoal-lighter rounded-[40px] border border-red-500/20 shadow-2xl overflow-hidden p-10 animate-in zoom-in duration-300">
            <button onClick={() => setShowDeleteModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-colors"><X size={20} /></button>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto text-red-500">
                 <AlertCircle size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black">Are you absolutely sure?</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  This action is irreversible. All your data will be permanently lost. 
                  Type <span className="font-black text-red-500 uppercase">DELETE</span> to confirm.
                </p>
              </div>
              
              <input 
                type="text" 
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE"
                className="w-full bg-slate-50 dark:bg-charcoal border border-red-500/20 p-4 rounded-2xl text-center font-black uppercase tracking-widest focus:outline-none focus:border-red-500 transition-all"
              />

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirm !== 'DELETE'}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all"
                >
                  Permanently Delete Account
                </button>
                <button onClick={() => setShowDeleteModal(false)} className="w-full py-4 bg-slate-100 dark:bg-charcoal text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-accent transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
