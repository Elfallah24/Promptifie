
import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-5xl font-extrabold mb-8">Privacy Policy</h1>
      
      <div className="space-y-12 text-slate-300 leading-relaxed">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-400">
            <Database size={24} />
            <h2 className="text-2xl font-bold text-white">What Data We Collect</h2>
          </div>
          <p>
            At Promptifie, we collect minimal data necessary to provide our services. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>User-provided images:</strong> Images you upload for the purpose of reverse prompt engineering.</li>
            <li><strong>Account Information:</strong> Your email address and name when you create an account or subscribe.</li>
            <li><strong>Usage Data:</strong> Anonymous information about how you interact with the tool, such as which AI models you prefer and frequency of use.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-400">
            <Eye size={24} />
            <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
          </div>
          <p>
            The information we collect is used to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Operate and maintain the Promptifie service.</li>
            <li>Improve our underlying AI logic and reverse prompt accuracy.</li>
            <li>Manage your subscription and provide customer support.</li>
            <li>Send critical service updates or requested newsletters.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-400">
            <Shield size={24} />
            <h2 className="text-2xl font-bold text-white">Data Protection Measures</h2>
          </div>
          <p>
            We take your security seriously. Promptifie uses industry-standard encryption for data at rest and in transit. Images uploaded for processing are stored temporarily in secure buffers and are automatically deleted from our primary processing servers after a short period.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-400">
            <Lock size={24} />
            <h2 className="text-2xl font-bold text-white">User Rights</h2>
          </div>
          <p>
            You have the right to access, correct, or delete your personal information at any time. If you wish to close your account and have all your associated data purged from our systems, you can do so through your account settings or by contacting our support team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
