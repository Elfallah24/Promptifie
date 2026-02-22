
import React from 'react';
import { Wand2, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tools: React.FC = () => {
  const tools = [
    {
      icon: <Wand2 className="text-indigo-400" size={32} />,
      title: "Magic Enhance",
      description: "This tool acts as your creative partner. It takes your simple text prompts and automatically enriches them with artistic details like lighting, camera angles, environment, and style, giving you professional-level results without the effort.",
      bg: "bg-indigo-600/10",
      link: "/magic-enhance"
    },
    {
      icon: <ImageIcon className="text-emerald-400" size={32} />,
      title: "AI Describe Image",
      description: "The reverse of our generator. Provide any image—a photo, a drawing, or a screenshot—and our AI will conduct a comprehensive analysis. It identifies objects, understands context, and even reads text within the image, providing you with a thorough text description.",
      bg: "bg-emerald-600/10",
      link: "/"
    },
    {
      icon: <Sparkles className="text-cyan-400" size={32} />,
      title: "AI Image Generator",
      description: "This is where your imagination becomes reality. Powered by generative AI, this tool takes any text prompt you write and transforms it into a unique, high-quality image. Describe anything you can think of, and watch it come to life.",
      bg: "bg-cyan-600/10",
      link: "/ai-image-generator"
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">Universal Creative Suite</h1>
        <p className="text-slate-400 text-lg">Everything you need to master visual AI in one place.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {tools.map((tool, idx) => (
          <section 
            key={idx}
            className="group flex flex-col md:flex-row gap-8 bg-slate-900 border border-white/5 rounded-3xl overflow-hidden p-8 hover:border-white/10 transition-all"
          >
            <div className={`w-20 h-20 shrink-0 ${tool.bg} rounded-2xl flex items-center justify-center`}>
              {tool.icon}
            </div>
            <div className="flex-1 space-y-4">
              <Link to={tool.link} className="inline-block">
                <h2 className="text-3xl font-bold hover:text-indigo-400 transition-colors">{tool.title}</h2>
              </Link>
              <p className="text-slate-400 leading-relaxed text-lg">
                {tool.description}
              </p>
              <Link 
                to={tool.link} 
                className="inline-flex items-center gap-2 font-bold text-indigo-400 hover:gap-3 transition-all"
              >
                Launch Tool <ArrowRight size={20} />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[40px] glass-effect border border-white/10 text-center space-y-6">
        <h3 className="text-3xl font-bold">Ready to Elevate Your Workflow?</h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our suite is designed for designers, photographers, and hobbyists alike. Start using our premium tools for free today.
        </p>
        <Link 
          to="/"
          className="inline-block px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

export default Tools;
