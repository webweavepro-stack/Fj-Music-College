import React from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  Award,
  BookOpen,
  DollarSign,
  FileText,
  Music,
} from 'lucide-react';
import pianoImg from '../assets/images/masterclass_piano_keys_1792230600753.jpg';

interface ProgrammeDetailViewProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ProgrammeDetailView: React.FC<ProgrammeDetailViewProps> = ({ slug, navigate }) => {
  const { programmes } = useCollege();
  const programme = programmes.find((p) => p.slug === slug);

  if (!programme) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">
          Programme Not Found
        </h2>
        <p className="text-xs text-slate-600 mb-6 max-w-sm">
          The requested programme could not be retrieved from the academic registry database.
        </p>
        <button
          onClick={() => navigate('/programmes')}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
        >
          Return to Programme Catalogue
        </button>
      </div>
    );
  }

  // Related programmes
  const related = programmes.filter(
    (p) =>
      p.id !== programme.id &&
      (programme.relatedProgrammeSlugs?.includes(p.slug) || p.category === programme.category)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate('/programmes')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Programmes</span>
        </button>

        {/* Hero Banner for Programme */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white mb-10 border border-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-widest">
                <span>{programme.discipline}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{programme.category} Programme</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {programme.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {programme.shortDescription}
              </p>

              {/* Quick Info Grid */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                  <span className="font-semibold text-white">{programme.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery Format</span>
                  <span className="font-semibold text-white">{programme.deliveryFormat}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tuition Fee</span>
                  <span className="font-bold text-lime-400 font-mono text-sm">
                    {programme.currency} {programme.tuitionFee.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 lg:h-full relative overflow-hidden">
              <img
                src={programme.coverImage || pianoImg}
                alt={programme.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/90 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content Split: Left (Overview, Curriculum, Assessments) | Right (Enrollment Card, Requirements) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. In-depth Overview */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-3">
                Programme Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {programme.description}
              </p>

              <div className="mt-6 pt-6 border-t border-stone-100">
                <h3 className="font-heading text-base font-bold text-slate-900 mb-4">
                  Core Learning Objectives
                </h3>
                <div className="space-y-2.5">
                  {programme.learningObjectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Curriculum & Syllabus Breakdown */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Syllabus & Structured Modules
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Step-by-step curriculum progression from foundational mechanics to capstone jury.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-stone-100 px-3 py-1 rounded-lg">
                  {programme.curriculum.length} Modules
                </span>
              </div>

              <div className="space-y-4">
                {programme.curriculum.map((mod, index) => (
                  <div
                    key={mod.id}
                    className="border border-stone-200 rounded-xl p-5 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                        {mod.title}
                      </h3>
                      {mod.durationWeeks && (
                        <span className="text-xs text-slate-500 font-mono">
                          {mod.durationWeeks} Weeks
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Key Topics Covered:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                        {mod.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-600"></span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Practical and Theoretical Assessment Details */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-4">
                Assessment & Examination Standards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                    <Music className="w-4 h-4 text-lime-700" />
                    <span>Practical Assessment</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {programme.practicalAssessment}
                  </p>
                </div>

                <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>Theoretical Assessment</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {programme.theoreticalAssessment}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Apply Card & Requirements */}
          <div className="lg:col-span-4 space-y-6">
            {/* Enrollment / Application Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm sticky top-24 space-y-5">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase">Total Investment</span>
                <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                  {programme.currency} {programme.tuitionFee.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Application Fee: {programme.currency} {programme.applicationFee.toLocaleString()}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate('/apply')}
                  className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for this Programme</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/admissions')}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer"
                >
                  Admissions Criteria & Deadlines
                </button>
              </div>

              {/* Entry Requirements Checklist */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wide">
                  Entry Requirements
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {programme.entryRequirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-lime-700 font-bold">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Audition Details if applicable */}
              {programme.requiresAudition && (
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold">Audition Required:</div>
                  <p className="text-[11px] leading-relaxed">
                    {programme.auditionRequirements}
                  </p>
                  <button
                    onClick={() => navigate('/auditions')}
                    className="text-[11px] font-bold text-amber-800 hover:underline inline-block pt-1"
                  >
                    Read Audition Prep Guide →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Programmes Strip */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-6">
              Related Programmes & Specialisms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <div
                  key={rp.id}
                  onClick={() => navigate(`/programmes/${rp.slug}`)}
                  className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-slate-400 transition-colors cursor-pointer"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {rp.discipline} · {rp.category}
                  </div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 mb-2">
                    {rp.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {rp.shortDescription}
                  </p>
                  <div className="text-xs font-mono font-bold text-slate-900">
                    {rp.currency} {rp.tuitionFee.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
