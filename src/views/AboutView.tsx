import React from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  Music,
  CheckCircle2,
  Award,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { FjMusicLogo } from '../components/brand/FjMusicLogo';
import heroImg from '../assets/images/hero_live_performance_concert_1792230599291.jpg';
import choirImg from '../assets/images/rehearsal_vocal_ensemble_1792230600440.jpg';

interface AboutViewProps {
  navigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ navigate }) => {
  const { settings } = useCollege();

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Institutional Identity & Mission
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About FJMUSIC College
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Founded on the conviction that music education must go far beyond dry theoretical lectures, FJMUSIC College bridges classical conservatoire discipline with contemporary live performance, studio engineering, and stage excellence.
          </p>
        </div>

        {/* Hero Section Split */}
        <div className="bg-slate-950 text-white rounded-3xl overflow-hidden border border-slate-900 grid grid-cols-1 lg:grid-cols-12 items-center mb-16 shadow-xl">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
            <div className="text-xs font-bold text-lime-400 uppercase tracking-widest">
              Our Core Philosophy
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white text-balance leading-tight">
              “From Practice Room to Live Performance.”
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {settings.institutionalBelief}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>Vocal Pedagogy & Phonation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>Ensemble Chemistry</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 lg:h-full relative overflow-hidden bg-slate-900">
            <img
              src={choirImg}
              alt="FJMUSIC Vocal Ensemble"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Values Matrix */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">
            Institutional Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-lime-100 flex items-center justify-center text-lime-800">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                1. Practical Musician Competence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe true musical fluency is demonstrated with an instrument in hand or at the microphone. Every student logs mandatory hours in acoustic practice rooms and rehearsal stages.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                2. Ensemble Collaboration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Musicians do not perform in a vacuum. Vocalists rehearse with live rhythm sections, directors arrange for choirs, and producers collaborate with live session players.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                3. Academic Rigor & Integrity
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diplomas and certificates are conferred only upon passing standardized practical juries, musicianship hearings, and written music theory examinations.
              </p>
            </div>
          </div>
        </div>

        {/* Brand & Visual Identity Section */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 mb-16 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex justify-center p-6 sm:p-8 bg-stone-50 rounded-2xl border border-stone-200">
              <FjMusicLogo size="xl" variant="full" showSlogan={true} />
            </div>
            <div className="md:col-span-7 space-y-3">
              <div className="text-xs font-bold text-lime-700 uppercase tracking-widest">
                Visual Identity & Heraldry
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                The Official FJMUSIC College Emblem
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The institutional emblem depicts the focused profile of a modern musician wearing studio monitoring headphones. Surmounting the head is a sixteen-frequency acoustic equalizer rising in rhythmic harmony—progressing from deep forest green to luminous lime and warm golden amber. This heraldic composition reflects the institution’s core journey: disciplined mastery in the practice room blooming into radiant, confident live stage performance.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900">
              Explore Our Academic Pathways
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-lg">
              Review syllabus outlines for Vocal Performance, Keyboard Studies, Music Production, and Choral Direction.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/programmes')}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-900 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Programme Catalogue
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Apply Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
