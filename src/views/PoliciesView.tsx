import React from 'react';
import { ShieldCheck, FileText, ArrowLeft, RefreshCw } from 'lucide-react';

interface PoliciesViewProps {
  policyType: 'privacy' | 'terms' | 'refund-policy';
  navigate: (path: string) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({ policyType, navigate }) => {
  const content = {
    privacy: {
      title: 'Institutional Privacy Policy',
      kicker: 'Data Protection & Student Confidentiality',
      icon: ShieldCheck,
      updated: 'October 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'FJMUSIC College collects student personal information (full legal name, contact email, telephone, date of birth, musical background records, audition video/audio submissions, and assessment transcripts) strictly for the administration of academic admissions, lesson delivery, practice monitoring, and certificate verification.',
        },
        {
          heading: '2. Audition & Performance Recordings',
          body: 'Audition recordings submitted by applicants are reviewed solely by the authorized faculty board and admissions desk. They are never published publicly without explicit written consent. Performance recordings from ticketed public concerts in the college auditorium may be featured in our official performance gallery with student artist attribution.',
        },
        {
          heading: '3. Data Security & Payment Information',
          body: 'We do not store credit card numbers, bank PINs, or CVV codes on our servers. All online fee transactions are processed through our PCI-DSS compliant payment gateway (Paystack) with 256-bit TLS encryption.',
        },
      ],
    },
    terms: {
      title: 'Terms of Enrolment & Campus Governance',
      kicker: 'Academic Regulations & Code of Conduct',
      icon: FileText,
      updated: 'October 2026',
      sections: [
        {
          heading: '1. Academic Integrity & Practice Discipline',
          body: 'Students admitted to FJMUSIC College are expected to maintain regular attendance in assigned masterclasses, band rehearsals, and individual practice sessions. Consistent failure to log required practice hours or attend rehearsals may delay progression to the next semester.',
        },
        {
          heading: '2. Use of Studios & Musical Equipment',
          body: 'Students are granted authorized access to acoustic practice suites, pianos, and recording consoles in accordance with their enrolled programme. Instruments and console hardware must be handled with utmost professional care. Food and open beverages are strictly prohibited inside the recording control room.',
        },
        {
          heading: '3. Awarding of Certificates & Diplomas',
          body: 'Diplomas and Certificates of Musicianship are conferred strictly upon satisfying all theoretical examinations, practical juries, and minimum pass thresholds established by the Academic Board.',
        },
      ],
    },
    'refund-policy': {
      title: 'Tuition & Application Refund Policy',
      kicker: 'Financial Policies & Bursary Regulations',
      icon: RefreshCw,
      updated: 'October 2026',
      sections: [
        {
          heading: '1. Application Fees',
          body: 'Application fees (NGN 15,000 for Diplomas, NGN 10,000 for Certificates) cover administrative file review, audition scheduling, and facility allocation. Application fees are non-refundable once an audition slot has been reviewed or confirmed by the board.',
        },
        {
          heading: '2. Tuition Fee Cancellations & Pro-Rata Refunds',
          body: 'If a student withdraws their enrollment in writing at least 14 calendar days prior to the official commencement of lectures, a 90% refund of paid tuition fees will be issued (less a 10% administrative processing fee). Withdrawals within the first 2 weeks of the semester are eligible for a 50% pro-rata refund. No refunds are granted after Week 3 of the term.',
        },
        {
          heading: '3. Processing Times',
          body: 'Approved refunds are returned to the originating payment channel or verified bank account within 10 to 14 business days following approval by the College Bursar.',
        },
      ],
    },
  };

  const current = content[policyType];
  const IconComp = current.icon;

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </button>

        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-slate-800">
              <IconComp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {current.kicker}
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                {current.title}
              </h1>
            </div>
          </div>

          <div className="text-xs text-slate-400 mb-8 pb-4 border-b border-stone-100">
            Official Institution Policy · Effective: {current.updated} · FJMUSIC College
          </div>

          <div className="space-y-6">
            {current.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="font-heading font-bold text-base text-slate-900">
                  {sec.heading}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
            <span>Enquiries: bursary@fjmusiccollege.edu</span>
            <button
              onClick={() => navigate('/contact')}
              className="text-slate-900 font-bold hover:underline"
            >
              Contact Legal & Bursary →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
