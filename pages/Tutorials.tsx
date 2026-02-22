
import React from 'react';
import { TUTORIALS } from '../constants';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Tutorials: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">Prompt Engineering Academy</h1>
        <p className="text-slate-400 text-lg">Learn how to communicate effectively with AI to produce stunning visual results.</p>
      </div>

      <div className="space-y-12">
        {TUTORIALS.map((article) => (
          <article 
            key={article.id}
            className="group flex flex-col md:flex-row gap-8 bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all"
          >
            <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
              <img 
                src={article.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt={article.title} 
              />
            </div>
            <div className="md:w-3/5 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                <span className="flex items-center gap-1.5"><Calendar size={14}/> {article.date}</span>
                <span className="flex items-center gap-1.5"><User size={14}/> EchoFlow Expert</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-400 mb-8 line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
              <button className="flex items-center gap-2 text-indigo-400 font-bold hover:gap-3 transition-all">
                Read Article <ArrowRight size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-center">
        <h3 className="text-2xl font-bold mb-4">Want more tips delivered to your inbox?</h3>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
          />
          <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
