import React from 'react';
import {
  Mic,
  Music2,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Video,
  MapPin,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface AuditionsViewProps {
  navigate: (path: string) => void;
}

export const AuditionsView: React.FC<AuditionsViewProps> = ({ navigate }) => {
  const disciplines = [
    {
      title: 'Voice and Vocal Performance',
      icon: Mic,
      pieces: 'Two contrasting songs: one slow lyrical ballad showcasing breath support and tone, and one mid/up-tempo song demonstrating agility and dynamic projection.',
      criteria: [
        'Pitch accuracy and intonation stability.',
        'Diaphragmatic breath management and absence of strain.',
        'Lyrical communication and facial engagement.',
        'Range demonstration and passagio transition.',
      ],
      tips: 'Warm up thoroughly with SOVT lip trills before singing. Avoid choosing songs that push volume at the expense of pure pitch.',
    },
    {
      title: 'Keyboard / Piano Performance',
      icon: Music2,
      pieces: 'Two contrasting selections: one classical or structured piece (e.g. Bach, Clementi, Chopin) and one contemporary, gospel, or jazz piece displaying harmonic knowledge.',
      criteria: [
        'Major and natural minor scales in 2 octaves hands together.',
        'Rhythmic tempo steadiness and touch sensitivity.',
        'Understanding of chord substitutions and voicings.',
        'Sight-reading evaluation of standard treble/bass clef.',
      ],
      tips: 'Play with consistent touch dynamics. We value musical phrasing and clean timing over frantic speed.',
    },
    {
      title: 'Music Production & Audio Engineering',
      icon: Sliders,
      pieces: 'Portfolio submission of two original music productions, arrangements, or multi-track mix sessions.',
      criteria: [
        'Frequency balance across low, mid, and high spectrums.',
        'Spatial width, panning, and dynamic headroom.',
        'Creativity in sound design and instrumentation.',
        'Ability to verbally explain your signal chain and workflow.',
      ],
      tips: 'Submit unmastered 24-bit WAV or high-res MP3 files alongside a brief paragraph detailing your DAW and tools used.',
    },
    {
      title: 'Contemporary Christian Music & Worship Direction',
      icon: Music2,
      pieces: 'Performance of one contemporary worship arrangement on your primary instrument or voice, demonstrating musical direction.',
      criteria: [
        'Band leadership cues, count-ins, and dynamic transitions.',
        'Vocal harmonization or chord charting in Nashville numbers.',
        'Stage presence and authority without musical clutter.',
      ],
      tips: 'Demonstrate how you would transition a band dynamically from an intimate acoustic verse into a high-energy anthem.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Faculty Evaluation Standards
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Audition Guidelines by Discipline
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Auditions are designed to evaluate your current baseline musicianship and placement. We are not expecting perfection—we are listening for teachability, pitch instinct, rhythmic stability, and expressive conviction.
          </p>
        </div>

        {/* Audition Formats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-lime-100 flex items-center justify-center text-lime-800 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                Format A: Live On-Campus Audition
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Performed in Studio Suite 2 or the Choral Pavilion. An acoustic grand piano, workstation synthesizer, drum kit, and monitor microphones are provided.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                Format B: Video Recording Link
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit an unedited continuous video recording uploaded to YouTube (unlisted), Google Drive, or Vimeo. Your face and hands must be clearly visible throughout.
              </p>
            </div>
          </div>
        </div>

        {/* Disciplines Grid */}
        <div className="space-y-6 mb-14">
          <h2 className="font-heading text-2xl font-bold text-slate-900">
            Requirements by Musical Specialism
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disciplines.map((d, idx) => {
              const IconComp = d.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-stone-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-slate-800">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading font-bold text-base text-slate-900">
                        {d.title}
                      </h3>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Repertoire Requirement:
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {d.pieces}
                      </p>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Adjudication Criteria:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {d.criteria.map((c, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <span className="text-lime-700 font-bold">✓</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[11px] text-slate-600">
                      <strong>Faculty Tip:</strong> {d.tips}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-900">
          <div>
            <h3 className="font-heading text-xl font-bold">Ready to Prepare Your Repertoire?</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Submit your online application to reserve your audition slot with our faculty board.
            </p>
          </div>
          <button
            onClick={() => navigate('/apply')}
            className="px-6 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Start Online Application
          </button>
        </div>
      </div>
    </div>
  );
};
