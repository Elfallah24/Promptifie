
import React from 'react';
import { Target, Lightbulb, Rocket, Zap, ImageIcon, Layers } from 'lucide-react';

const AboutUs: React.FC = () => {
  const steps = [
    {
      icon: <ImageIcon className="text-indigo-400" size={32} />,
      title: "1. Upload Your Image",
      desc: "Simply drag and drop or click to upload any image that inspires you."
    },
    {
      icon: <Layers className="text-indigo-400" size={32} />,
      title: "2. Select Your AI Model",
      desc: "Choose from optimized models like Midjourney, Flux, or Structured Prompts."
    },
    {
      icon: <Zap className="text-indigo-400" size={32} />,
      title: "3. Generate & Copy",
      desc: "Our AI reverse-engineers the image into a high-fidelity prompt in seconds."
    }
  ];

  return (
    <div className="pt-32 pb-16 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">About Our Tool</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          We bridge the gap between human imagination and AI generation by providing the ultimate reverse prompt engineering suite.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center">
            <Target className="text-indigo-500" size={32} />
          </div>
          <h2 className="text-4xl font-bold">Our Mission</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Our mission is to empower creators by providing an intuitive tool that translates visual ideas into powerful AI-generated text prompts. We believe that everyone should have the power to recreate and remix visual aesthetics, regardless of their technical background in prompt engineering.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="flex-1 p-4 bg-slate-900 rounded-2xl border border-white/5">
              <h4 className="font-bold text-indigo-400 mb-1">Empower</h4>
              <p className="text-xs text-slate-500">Giving users the keys to AI creation.</p>
            </div>
            <div className="flex-1 p-4 bg-slate-900 rounded-2xl border border-white/5">
              <h4 className="font-bold text-indigo-400 mb-1">Innovate</h4>
              <p className="text-xs text-slate-500">Pushing the boundaries of reverse engineering.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" 
            alt="Abstract art" 
            className="relative rounded-3xl shadow-2xl border border-white/10"
          />
        </div>
      </section>

      <section className="bg-slate-900/50 rounded-[40px] p-12 md:p-20 border border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-400">Three simple steps to professional-grade prompts.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-6 group">
              <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 transition-all shadow-xl">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-32 text-center py-20">
        <h2 className="text-4xl font-bold mb-8">Ready to start creating?</h2>
        <a 
          href="#/" 
          className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-indigo-600/30"
        >
          Try Promptifie Now <Rocket size={24} />
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
