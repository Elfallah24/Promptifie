
import React from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-5xl font-extrabold mb-8">Refund Policy</h1>
      
      <div className="space-y-8 text-slate-300 leading-relaxed">
        <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-3xl">
          <div className="flex items-center gap-3 text-indigo-400 mb-4">
            <AlertCircle size={28} />
            <h2 className="text-2xl font-bold text-white">Digital Product Policy</h2>
          </div>
          <p className="text-lg">
            Due to the digital nature of our service and the immediate delivery of credits and analysis power, <strong>monthly and annual subscription fees are non-refundable once paid.</strong>
          </p>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-400">
            <HelpCircle size={24} />
            <h2 className="text-2xl font-bold text-white">Technical Issues</h2>
          </div>
          <p>
            We stand by the quality of Promptifie. If you experience a significant technical issue that prevents you from using the service for an extended period, please contact our support team. We handle these cases on an individual basis and may provide service credits or partial refunds at our sole discretion.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">How to Contact Support</h2>
          <p>
            For any billing questions or technical concerns, please reach out to us at:
          </p>
          <div className="p-4 bg-slate-900 rounded-xl border border-white/5 inline-block">
            <span className="font-bold text-indigo-400">support@promptifie.ai</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
