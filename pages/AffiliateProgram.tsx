
import React from 'react';
import { DollarSign, Share2, Users, Award, TrendingUp, CheckCircle2 } from 'lucide-react';

const AffiliateProgram: React.FC = () => {
  return (
    <div className="pt-32 pb-16 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="relative overflow-hidden bg-indigo-600 rounded-[40px] p-12 md:p-20 mb-20">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <TrendingUp size={300} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
            Join Our Affiliate Program
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-10 leading-relaxed">
            Earn commissions by sharing our tool. For every new subscriber that signs up through your unique link, you get a <span className="font-black text-white underline decoration-wavy underline-offset-4">20% commission</span> on the sale.
          </p>
          <button className="px-10 py-5 bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-extrabold text-xl transition-all shadow-xl flex items-center gap-3">
            <Award size={24} /> Become an Affiliate Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        <div className="p-8 bg-slate-900 rounded-3xl border border-white/5 space-y-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <Share2 className="text-indigo-400" size={24} />
          </div>
          <h3 className="text-xl font-bold">1. Spread the Word</h3>
          <p className="text-slate-400 text-sm">Share your unique referral link on social media, blogs, or with your community.</p>
        </div>
        <div className="p-8 bg-slate-900 rounded-3xl border border-white/5 space-y-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <Users className="text-indigo-400" size={24} />
          </div>
          <h3 className="text-xl font-bold">2. Track Sign-ups</h3>
          <p className="text-slate-400 text-sm">Real-time dashboard to see exactly how many people have joined through your link.</p>
        </div>
        <div className="p-8 bg-slate-900 rounded-3xl border border-white/5 space-y-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <DollarSign className="text-indigo-400" size={24} />
          </div>
          <h3 className="text-xl font-bold">3. Get Paid Monthly</h3>
          <p className="text-slate-400 text-sm">Receive your 20% recurring commission every single month for the life of the customer.</p>
        </div>
      </div>

      <div className="glass-effect rounded-[40px] p-12 border border-white/10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold">Program Benefits</h2>
          <ul className="space-y-4">
            {[
              "High conversion rates due to tool popularity",
              "90-day cookie window duration",
              "No minimum payout requirements",
              "Marketing assets & banners provided",
              "Dedicated affiliate support team"
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="text-indigo-500" size={20} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full max-w-sm">
          <div className="p-8 bg-slate-950 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-6 text-center">
            <div className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Standard Referral</div>
            <div className="text-6xl font-black">20%</div>
            <div className="text-slate-500 text-sm">Per referral, per month</div>
            <hr className="border-white/5" />
            <p className="text-xs text-slate-500">Subject to terms and conditions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;
