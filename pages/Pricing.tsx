
import React from 'react';
import { Check, Star, Zap, Sparkles, Coins, Crown, ArrowRight } from 'lucide-react';
import { useAuth } from '../AuthContext';

declare global {
  interface Window {
    Paddle: any;
  }
}

const Pricing: React.FC = () => {
  const { openAuthModal, showToast } = useAuth();

  // Lemon Squeezy Checkout Logic as requested
  const handleCheckout = (checkoutLink: string) => {
    if (checkoutLink) {
      window.location.href = checkoutLink;
    }
  };



  const LEMON_SQUEEZY_SUBSCRIPTION_URL = "https://promptifie.lemonsqueezy.com/checkout/buy/24142771-181a-4118-928e-600ebbfa3557";

  const subscriptionPlans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for enthusiasts and testing.',
      features: ['5 Image-to-Text uses/day', 'Unlimited Text-to-Prompt', 'Community Gallery Access'],
      cta: 'Start for Free',
      onClick: () => openAuthModal('SIGN_UP')
    },
    {
      name: 'Standard',
      price: '$9.99',
      description: 'The sweet spot for casual creators.',
      features: ['200 Image-to-Text uses/month', '300 coins for generation', 'Standard Support', 'No Watermark'],
      cta: 'Go Standard',
      checkoutUrl: LEMON_SQUEEZY_SUBSCRIPTION_URL
    },
    {
      name: 'Pro',
      price: '$14.99',
      description: 'For serious AI artists and professionals.',
      features: ['600 Image-to-Text uses/month', '800 coins for generation', 'Marketplace Selling Access', 'Commercial License', 'Priority Processing'],
      cta: 'Go Pro Now',
      popular: true,
      checkoutUrl: LEMON_SQUEEZY_SUBSCRIPTION_URL
    },
    {
      name: 'Ultimate',
      price: '$29.99',
      description: 'Maximum power for heavy production.',
      features: ['Unlimited Image-to-Text uses', '1200 coins for generation', 'Marketplace Selling Access', 'Free Style Pack Access', 'Dedicated Support'],
      cta: 'Join Ultimate',
      checkoutUrl: LEMON_SQUEEZY_SUBSCRIPTION_URL
    }
  ];

  const coinPacks = [
    { name: 'Starter Pack', coins: 500, price: '$5' },
    { name: 'Artist Pack', coins: 1500, price: '$15', bestValue: true },
    { name: 'Studio Pack', coins: 5000, price: '$50' },
  ];

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-charcoal dark:text-offwhite tracking-tighter">Individual Creative Power</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Flexible plans designed for solo artists, designers, and prompt engineers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {subscriptionPlans.map((plan) => {
          const isPro = plan.name === 'Pro';
          
          return (
            <div 
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-[32px] transition-all h-full shadow-lg border
                ${isPro 
                  ? 'bg-accent text-white scale-105 z-10 border-accent shadow-accent/20' 
                  : 'bg-white dark:bg-charcoal-lighter border-black/5 dark:border-white/10 hover:border-accent'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-charcoal text-accent text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-accent/20">
                   <Star size={12} fill="currentColor" /> Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-xl font-black mb-1`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`${isPro ? 'text-white/60' : 'text-slate-400'} text-sm`}>/ month</span>
                </div>
                <p className={`text-sm leading-relaxed ${isPro ? 'text-white/80' : 'text-slate-500'}`}>{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check size={18} className={isPro ? "text-white" : "text-accent"} />
                    <span className="opacity-90 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => plan.checkoutUrl ? handleCheckout(plan.checkoutUrl) : (plan.onClick && plan.onClick())}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 btn-haptic 
                  ${isPro ? 'bg-white text-accent hover:bg-slate-50' : 'bg-accent text-white hover:bg-accent-hover shadow-accent/20'}`}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="lg:col-span-1 bg-gradient-to-br from-[#482C72] to-black rounded-[40px] p-10 text-white relative overflow-hidden group border border-white/10">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
            <Crown size={180} />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
              <Zap size={14} className="text-yellow-400" /> Finite Edition
            </div>
            <h3 className="text-4xl font-black tracking-tighter">Lifetime Access</h3>
            <p className="text-purple-100/70 font-medium leading-relaxed">
              Pay once, use forever. Get all Pro features for life plus 10,000 bonus coins and early access to beta features.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black">$499</span>
              <span className="text-purple-300 text-sm font-bold uppercase tracking-widest">one-time</span>
            </div>
            <button 
              onClick={() => handleCheckout('https://promptifie.lemonsqueezy.com/checkout/buy/ab85abb9-9a97-4331-9ffc-8d16422fa815')}
                 className="w-full py-5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-2xl font-black text-lg transition-all shadow-2xl shadow-yellow-400/20 active:scale-95 flex items-center justify-center gap-3"
            >
              Secure Lifetime <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-50 dark:bg-charcoal-lighter border border-black/5 dark:border-white/5 rounded-[40px] p-10 flex flex-col justify-between">
          <div className="space-y-4 mb-8">
            <h3 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <Coins className="text-accent" /> Coin Top-ups
            </h3>
            <p className="text-slate-500 font-medium max-w-lg">
              Low on generation power? Grab a one-time coin pack to keep the magic flowing. Coins never expire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coinPacks.map((pack) => (
              <div 
                key={pack.name} 
                className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] cursor-pointer flex flex-col items-center text-center gap-4 relative
                  ${pack.bestValue ? 'bg-white dark:bg-charcoal border-accent shadow-xl' : 'bg-white/50 dark:bg-charcoal/50 border-black/5 dark:border-white/5'}`}
              >
                {pack.bestValue && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-[8px] font-black uppercase rounded-full">Best Value</div>
                )}
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{pack.name}</p>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-charcoal dark:text-offwhite">{pack.coins}</p>
                  <p className="text-[9px] font-black uppercase text-accent tracking-widest">Coins</p>
                </div>
                <button 
                  onClick={() => handleCheckout('https://promptifie.lemonsqueezy.com/checkout/buy/bfbd9c84-040c-461a-8a65-7c352a8ea3c6')}
                  className="w-full py-3 bg-slate-100 dark:bg-charcoal border border-black/5 hover:border-accent rounded-xl font-black text-sm transition-all"
                >
                  {pack.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-10 border-t dark:border-white/5">
        <p className="text-slate-500 text-sm font-medium">Looking for custom integration? <a href="mailto:biz@promptifie.ai" className="text-accent hover:underline font-bold">Contact our partnership team</a>.</p>
      </div>
    </div>
  );
};

export default Pricing;
