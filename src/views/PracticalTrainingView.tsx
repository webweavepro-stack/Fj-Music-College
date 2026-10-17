import React from 'react';
import {
  Music,
  Sliders,
  Users,
  Mic,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

import heroImg from '../assets/images/hero_live_performance_concert_1792230599291.jpg';
import studioImg from '../assets/images/studio_recording_mixing_1792230600495.jpg';
import choirImg from '../assets/images/rehearsal_vocal_ensemble_1792230600440.jpg';
import pianoImg from '../assets/images/masterclass_piano_keys_1792230600753.jpg';

interface PracticalTrainingViewProps {
  navigate: (path: string) => void;
}

export const PracticalTrainingView: React.FC<PracticalTrainingViewProps> = ({ navigate }) => {
  const trainingPillars = [
    {
      title: 'Individual Acoustic Practice Suites',
      image: pianoImg,
      subtitle: 'Solo Mastery & Technical Habit Formation',
      description:
        'Our campus features 16 floating soundproof practice suites equipped with tuned acoustic grand and upright pianos, full-length posture mirrors, electronic metronomes, and clean audio recording feeds.',
      highlights: [
        'Guaranteed daily reserved practice slots for enrolled students.',
        'Acoustically isolated drywall construction (STC 65+).',
        'Built-in audio capture to directly log practice into the LMS.',
      ],
    },
    {
      title: 'Live Band Rehearsals & Ensemble Stages',
      image: heroImg,
      subtitle: 'The Rhythm Section & Group Chemistry',
      description:
        'Playing alone in a bedroom cannot prepare you for the raw energy and frequency distribution of a live drummer and bassist. Students rehearse weekly under faculty direction, learning pocket, dynamic drops, and hand cues.',
      highlights: [
        'Complete backline: Yamaha drums, Ampeg bass rigs, Fender guitar amps.',
        'Behringer X32 and Allen & Heath personal in-ear monitor mixers.',
        'Weekly video playback review sessions to critique stage presence.',
      ],
    },
    {
      title: 'Commercial Audio Recording & Mixing Suites',
      image: studioImg,
      subtitle: 'Hands-On Console Time & Tracking Real Bands',
      description:
        'Forget clicking presets on stock laptop plugins. Students sit at the analog mixing console, patch outboard compressors, position multi-mic arrays on live drum sets, and engineer vocal tracking sessions in our vocal booth.',
      highlights: [
        'Solid State Logic (SSL) and Neve-style preamplification.',
        'Neumann, Shure, AKG, and Sennheiser microphone lockers.',
        'Pro Tools Ultimate and Logic Pro hardware-accelerated rigs.',
      ],
    },
    {
      title: 'Vocal Ensemble & Choral Rehearsal Pavilion',
      image: choirImg,
      subtitle: 'Harmonic Blend & Ear Synchronization',
      description:
        'Choral singing develops absolute pitch precision and harmonic empathy. Vocalists, directors, and arrangers master 4-part SATB voicing, Sol-fa sight-reading, and blending with other timbres in our bright acoustic hall.',
      highlights: [
        'Natural reverberant architecture tuned for vocal projection.',
        'Curwen hand sign ear training drills.',
        'Preparation for the Annual College Gala Showcase.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Practical Infrastructure
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Practical Training & Performance Spaces
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            From the initial quiet practice room drills to full-scale concert stage productions, FJMUSIC College bridges the divide between musical theory and undeniable live competence.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="space-y-12 mb-16">
          {trainingPillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl border border-stone-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 p-8 sm:p-12 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="text-xs font-bold text-lime-800 uppercase tracking-wider">
                  {pillar.subtitle}
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {pillar.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  {pillar.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`lg:col-span-6 h-80 lg:h-full relative overflow-hidden bg-slate-900 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-900">
          <div>
            <h3 className="font-heading text-2xl font-bold">Experience Our Campus Firsthand</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Book a guided campus tour or shadow a live band rehearsal session to observe our pedagogical approach in action.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-white text-slate-950 font-bold text-xs rounded-xl hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Book Campus Visit
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="px-6 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Apply for Admission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
