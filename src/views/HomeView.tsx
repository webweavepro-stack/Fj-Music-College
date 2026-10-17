import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { Programme, CollegeEvent } from '../types';
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Volume2,
  Award,
  Layers,
  Sparkles,
  BookOpen,
  Mic,
  Music2,
  Sliders,
  Users,
  Compass,
} from 'lucide-react';

import heroImg from '../assets/images/hero_live_performance_concert_1792230599291.jpg';
import studioImg from '../assets/images/studio_recording_mixing_1792230600495.jpg';
import choirImg from '../assets/images/rehearsal_vocal_ensemble_1792230600440.jpg';
import pianoImg from '../assets/images/masterclass_piano_keys_1792230600753.jpg';

interface HomeViewProps {
  navigate: (path: string) => void;
  onSelectEvent: (event: CollegeEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ navigate, onSelectEvent }) => {
  const { programmes, faculty, events, settings } = useCollege();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'diploma' | 'certificate' | 'practical'>('all');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const filteredProgrammes = programmes.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const faqs = [
    {
      q: 'Do I need prior musical experience to enroll in FJMUSIC College?',
      a: 'We welcome learners at multiple stages. Our Certificate programmes (such as Note Reading, Scales, Tonic Sol-fa, and Vocal Foundations) are structured for beginner to intermediate musicians. Our Diploma programmes require an audition or portfolio review to evaluate baseline musicianship and commitment.',
    },
    {
      q: 'What makes FJMUSIC College different from traditional music schools?',
      a: 'Our governing ethos is "From Practice Room to Live Performance." Traditional schools often limit students to dry textbook analysis. At FJMUSIC, every student participates in individual practice rooms, ensemble band rehearsals, sound engineering sessions on real consoles, and ticketed live concerts before a live audience.',
    },
    {
      q: 'Can international students or working professionals attend classes?',
      a: 'Yes. Most diploma and certificate courses are offered in a flexible Hybrid format combining high-definition online lectures, interactive digital music labs, and weekend on-campus studio intensives.',
    },
    {
      q: 'How does the audition process work for vocalists and instrumentalists?',
      a: 'Applicants can either schedule an in-person audition in our performance suites or submit a video/audio recording link during their online application. Audition guidelines for each discipline are clearly published under our Auditions section.',
    },
    {
      q: 'Can tuition fees be paid in installments?',
      a: 'Yes. FJMUSIC College provides flexible per-semester installment arrangements processed securely through our Paystack-integrated bursary portal or direct bank payment with verification.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-slate-900">
        {/* Subtle acoustic soundwave background texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed natural kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-widest">
                <span>PRACTICAL MUSIC ACADEMY & CONSERVATOIRE</span>
                <span aria-hidden="true">·</span>
                <span>SESSION {settings.currentTerm.split(' ')[0]}</span>
              </div>

              {/* Master Headline strictly following prompt */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white max-w-2xl text-balance">
                From Practice Room <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-amber-300 to-amber-500">
                  to Live Performance.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
                {settings.institutionalBelief}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/apply')}
                  className="px-6 py-3.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/programmes')}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Explore Programmes
                </button>

                <button
                  onClick={() => navigate('/practical-training')}
                  className="px-4 py-3.5 text-slate-400 hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-lime-400 fill-current" />
                  <span>Campus & Studio Tour</span>
                </button>
              </div>

              {/* Trust Indicators (Quiet unboxed text) */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Individual Practice Studios</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>SSL Console Audio Control Rooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Live Concert Hall Stage Juries</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Anchor: Full high-fidelity image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
                <img
                  src={heroImg}
                  alt="FJMUSIC College Concert Hall Live Performance"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs font-semibold text-lime-400 uppercase tracking-wider mb-1">
                    Live Stage Juries & Recitals
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg">
                    Main Auditorium Performance Season
                  </h3>
                  <div className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                    <span>12-Piece Ensemble Accompaniment</span>
                    <span aria-hidden="true">·</span>
                    <span>Student Capstone Concert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Institutional Introduction & The 5-Stage Learning Journey */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
              Our Educational Pedagogy
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              The Five-Stage Musicianship Pathway
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              At FJMUSIC College, excellence is neither an accident nor mere theory. Every student traverses an intentional 5-stage evolutionary cycle designed to build undeniable technical facility, creative command, and performance confidence.
            </p>
          </div>

          {/* 5-Stage Step Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Learn',
                icon: BookOpen,
                desc: 'Deep grounding in music theory, note reading, harmonic analysis, tonic sol-fa, and instrumental anatomy.',
              },
              {
                step: '02',
                title: 'Practise',
                icon: Clock,
                desc: 'Dedicated daily discipline inside acoustic practice suites with metronome routines, scales, and SOVT exercises.',
              },
              {
                step: '03',
                title: 'Rehearse',
                icon: Users,
                desc: 'Collaborative ensemble sessions: locking in with rhythm sections, vocal harmonization, and MD conducting.',
              },
              {
                step: '04',
                title: 'Perform',
                icon: Mic,
                desc: 'Live stage delivery under real concert lights, managing microphone technique, stage presence, and audience energy.',
              },
              {
                step: '05',
                title: 'Improve',
                icon: Award,
                desc: 'Detailed faculty jury reviews, audio playback analysis, rubric grading, and targeted refinement.',
              },
            ].map((stage, idx) => {
              const IconComp = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-6 relative flex flex-col justify-between hover:border-slate-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-lime-700 bg-lime-100 px-2 py-0.5 rounded">
                        STAGE {stage.step}
                      </span>
                      <IconComp className="w-5 h-5 text-slate-700" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Programme Catalogue Section */}
      <section className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
                Academic Offerings
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
                Diploma, Certificate & Practical Training
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Rigorous curriculums accredited for technical mastery, creative innovation, and live competence.
              </p>
            </div>

            {/* Interactive Category Filter Tabs (allowed buttons) */}
            <div className="flex items-center p-1 bg-stone-200 rounded-xl shrink-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                All Programmes ({programmes.length})
              </button>
              <button
                onClick={() => setSelectedCategory('diploma')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'diploma'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Diplomas
              </button>
              <button
                onClick={() => setSelectedCategory('certificate')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'certificate'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Certificates
              </button>
              <button
                onClick={() => setSelectedCategory('practical')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'practical'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Practical Intensives
              </button>
            </div>
          </div>

          {/* Programmes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProgrammes.map((prog) => {
              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div>
                    {/* Programme Cover Image */}
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      <img
                        src={prog.coverImage || pianoImg}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <span className="font-semibold uppercase tracking-wider text-lime-400 text-[10px]">
                          {prog.discipline}
                        </span>
                        <span className="text-[11px] font-mono text-slate-200">
                          {prog.duration}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Unboxed Metadata (Section 1.A zero-pill discipline) */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="capitalize font-semibold text-slate-800">
                          {prog.category === 'diploma'
                            ? '1-Year Diploma'
                            : prog.category === 'certificate'
                            ? 'Certificate of Musicianship'
                            : 'Practical Residency'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{prog.deliveryFormat}</span>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 group-hover:text-lime-700 transition-colors">
                        {prog.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {prog.shortDescription}
                      </p>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Tuition Fee</span>
                          <span className="font-bold font-mono text-slate-900 text-sm">
                            {prog.currency} {prog.tuitionFee.toLocaleString()}
                          </span>
                        </div>
                        {prog.requiresAudition && (
                          <span className="text-[11px] text-amber-700 font-medium">
                            Audition Required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/programmes/${prog.slug}`)}
                      className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-slate-900 font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer"
                    >
                      View Curriculum
                    </button>
                    <button
                      onClick={() => navigate('/apply')}
                      className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/programmes')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-300 hover:border-slate-500 rounded-xl text-xs font-bold text-slate-800 transition-colors cursor-pointer"
            >
              <span>Explore Complete Catalogue & Syllabi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Practical Facilities & Music Production Studios Showcase */}
      <section className="py-20 bg-slate-950 text-white border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-bold text-lime-400 uppercase tracking-widest">
                World-Class Performance Infrastructure
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
                Real Studios. Real Consoles. Real Stage Acoustic Halls.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Music competence cannot be downloaded from an internet tutorial. At FJMUSIC College, our students receive unlimited scheduled access to treated acoustic practice rooms, SSL mixing suites, Roland/Yamaha grand pianos, and full band rehearsal stages.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Sliders className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Commercial Sound Engineering Control Rooms</strong>
                    Calibrated monitoring, outboard analog tube preamps, and commercial microphone lockers.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Music2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Acoustic Piano & Solo Practice Suites</strong>
                    Kawai, Steinway, and Yamaha grand and upright pianos reserved exclusively for registered students.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mic className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Live Band & Choral Rehearsal Pavilion</strong>
                    In-ear monitoring, stage lighting rigs, drum isolation booths, and digital stage snakes.
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/practical-training')}
                  className="px-5 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Tour Practical Facilities
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src={studioImg}
                  alt="Sound Studio Suite"
                  className="w-full h-56 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-900 text-xs">
                  <div className="font-bold text-white">Audio Production Control Suite</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Tracking live drums and vocals</div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 sm:translate-y-6">
                <img
                  src={choirImg}
                  alt="Choral and vocal rehearsal pavilion"
                  className="w-full h-56 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-900 text-xs">
                  <div className="font-bold text-white">Choral & Ensemble Rehearsal Pavilion</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Vocal harmonization & masterclasses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Faculty Profiles */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
              Distinguished Instructors
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
              Mentored by Virtuoso Musicians & Producers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our faculty members bring decades of international concert hall performance, commercial charting productions, and academic conservatoire credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member) => (
              <div
                key={member.id}
                className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:border-slate-400 transition-colors"
              >
                <div>
                  <div className="h-52 bg-slate-900 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-lime-800 mb-2">
                      {member.role}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                      {member.bio}
                    </p>
                    <div className="pt-2 border-t border-stone-200 text-[11px] text-slate-500">
                      <span className="font-medium text-slate-700">Specialisms:</span>{' '}
                      {member.instruments.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigate('/faculty')}
                    className="w-full py-2 bg-white hover:bg-stone-200 border border-stone-200 rounded-xl text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                  >
                    View Faculty Bio & Courses
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming Concerts, Masterclasses & Recitals */}
      <section className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
                Live Performance Season
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
                Upcoming Recitals & Masterclasses
              </h2>
            </div>
            <button
              onClick={() => navigate('/events')}
              className="text-xs font-bold text-slate-900 hover:text-lime-700 flex items-center gap-1.5 cursor-pointer"
            >
              <span>View All Events ({events.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative h-44 bg-slate-900">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-lime-400">
                      {event.date}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      {event.category.replace('_', ' ')}
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectEvent(event)}
                    className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Register / Reserve Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Verified Student Testimonials (Adjacency to Proof - Section 1.H) */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
              Verified Student Journeys
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
              Real Transformations: From Room to Stage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Temitope Samuel Adeleke',
                role: 'Diploma in Vocal Performance, Class of 2026',
                quote:
                  'Before FJMUSIC, I was straining my throat trying to belt high G4s in my church choir. Within 4 months under Dr. Adeleke, I mastered diaphragmatic appoggio and vowel modification. I just completed my 45-minute graduation recital with a full live band!',
                outcome: 'Lead Soloist & Music Director',
              },
              {
                name: 'Chidinma Grace Okafor',
                role: 'Certificate in Note Reading & Sol-fa',
                quote:
                  'I had played piano by ear for 5 years but could never read a single line of sheet music. The step-by-step grand staff drills and Sol-fa sight-singing exercises made reading second nature in 12 weeks. I can now accompany any choral piece from sight.',
                outcome: 'Staff Accompanist & Teacher',
              },
              {
                name: 'David Kalu',
                role: 'Diploma in Music Production',
                quote:
                  'The direct console time on the analog board changed everything for me. In Marcus Vance’s live tracking studio sessions, we miked real drummers, managed phase coherence, and mixed radio-ready tracks instead of clicking stock sample loops.',
                outcome: 'Independent Mixing Engineer',
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-amber-500 font-serif text-3xl leading-none mb-3">“</div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    {t.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <div className="font-heading font-bold text-sm text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                  <div className="text-[11px] font-semibold text-lime-800 mt-1">
                    Outcome: {t.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Admissions Call to Action */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-bold text-lime-400 uppercase tracking-widest">
                Admissions for Session {settings.currentTerm}
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
                Your Stage Awaits. Take the First Step Today.
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Applications are currently open for our accredited Diploma, Certificate, and Practical Music Training programmes. Review deadlines, prepare your audition materials, and submit your application online.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                <div>
                  Application Deadline: <strong className="text-white">{settings.applicationDeadline}</strong>
                </div>
                <span aria-hidden="true">·</span>
                <div>
                  Delivery: <strong className="text-white">Campus Studios & Hybrid</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => navigate('/apply')}
                className="w-full py-3.5 px-6 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 text-center cursor-pointer"
              >
                Start Online Application
              </button>
              <button
                onClick={() => navigate('/admissions')}
                className="w-full py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer"
              >
                Review Audition & Entry Guidelines
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
              Clear Answers
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      faqOpen === idx ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {faqOpen === idx && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
