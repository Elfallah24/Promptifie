
import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          We’d love to hear from you. Please fill out the form below and we will get back to you as soon as possible.
        </p>
      </div>

      <div className="glass-effect p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
            <p className="text-slate-400">Thank you for reaching out. Our team will contact you shortly.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 text-indigo-400 font-bold hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                  <User size={14} /> Your Name
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                  <Mail size={14} /> Your Email
                </label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                <MessageSquare size={14} /> Your Message
              </label>
              <textarea 
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
            <Mail className="text-indigo-400" size={20} />
          </div>
          <h4 className="font-bold mb-1">Email Us</h4>
          <p className="text-sm text-slate-400">support@promptifie.ai</p>
        </div>
        <div className="p-6">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
            <MessageSquare className="text-indigo-400" size={20} />
          </div>
          <h4 className="font-bold mb-1">Live Chat</h4>
          <p className="text-sm text-slate-400">Available Mon-Fri, 9am-6pm</p>
        </div>
        <div className="p-6">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
            <User className="text-indigo-400" size={20} />
          </div>
          <h4 className="font-bold mb-1">Community</h4>
          <p className="text-sm text-slate-400">Join our Discord</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
