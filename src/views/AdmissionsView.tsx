import React from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  FileText,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface AdmissionsViewProps {
  navigate: (path: string) => void;
}

export const AdmissionsView: React.FC<AdmissionsViewProps> = ({ navigate }) => {
  const { settings } = useCollege();

  const steps = [
    {
      num: '01',
      title: 'Select Your Programme Area',
      desc: 'Browse our Diploma, Certificate, or Practical Training curricula to identify the specialisation that aligns with your musical aspirations.',
    },
    {
      num: '02',
      title: 'Complete the Online Application',
      desc: 'Submit your personal background, musical experience, primary instrument or vocal range, and upload any required educational credentials.',
    },
    {
      num: '03',
      title: 'Audition or Portfolio Review',
      desc: 'If applying for a Diploma or ensemble residency, perform 2 contrasting repertoire pieces either in our campus performance suites or via video link.',
    },
    {
      num: '04',
      title: 'Admissions Board Evaluation',
      desc: 'Our faculty board reviews submissions for pitch accuracy, musical potential, and dedication to practice. You will receive an official status update.',
    },
    {
      num: '05',
      title: 'Enrolment & Practice Suite Allocation',
      desc: 'Admitted students receive their official student ID, timetable access, studio booking privileges, and faculty mentor assignment.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Registry & Admissions
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Admissions Workflow & Entry Requirements
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            FJMUSIC College operates a transparent, merit-based admissions process. A submitted application or paid fee does not automatically grant admission—every candidate is assessed by our faculty board for musical aptitude and dedication.
          </p>
        </div>

        {/* Current Term Callout */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 mb-12 border border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-wider">
              <span>{settings.currentTerm}</span>
              <span aria-hidden="true">·</span>
              <span>ADMISSION STATUS: {settings.admissionOpen ? 'OPEN' : 'CLOSED'}</span>
            </div>
            <h2 className="font-heading text-2xl font-bold">
              Cohort Application Deadline: {settings.applicationDeadline}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Audition slots are allocated on a rolling basis upon receipt of completed application forms. Early submission is strongly recommended.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/apply')}
              className="px-6 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Start Application
            </button>
            <button
              onClick={() => navigate('/auditions')}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Audition Guidelines
            </button>
          </div>
        </div>

        {/* 5-Step Admissions Journey */}
        <div className="mb-14">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">
            The Admissions Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-lime-700 bg-lime-100 px-2 py-0.5 rounded w-max mb-3">
                    STEP {s.num}
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents & Fee Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* Required Documents */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200">
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-800" />
              <span>Required Application Documents</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Government ID or Birth Certificate:</strong> To verify legal name and age.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Academic Certificates:</strong> Secondary school certificate or higher degree transcript (where applicable).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Audition Video Link or Recording:</strong> For vocalists, keyboardists, and instrumentalists applying for Diploma programmes.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Letter of Recommendation:</strong> From a music teacher, choir director, music director, or pastor confirming your commitment.
                </div>
              </li>
            </ul>
          </div>

          {/* Fee Policy & Clarification */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200">
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-800" />
              <span>Transparent Fee Policies</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Application Fee:</strong> Standard application fee is NGN 15,000 for Diploma courses and NGN 10,000 for Certificate courses. This covers audition adjudication, transcript processing, and campus facility trials.
              </p>
              <p>
                <strong>Separation of Payment & Admission:</strong> Payment of an application fee does not constitute admission. Admission is strictly determined by academic and audition merit evaluated by our faculty panel.
              </p>
              <p>
                <strong>Payment Options:</strong> Payments are processed via Paystack (Debit/Credit Cards, Bank Transfer, USSD) or direct bursary account transfers with verified receipts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={() => navigate('/refund-policy')}
                className="text-slate-700 font-bold hover:underline"
              >
                Read Tuition Refund Policy →
              </button>
              <button
                onClick={() => navigate('/apply')}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold"
              >
                Proceed to Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
