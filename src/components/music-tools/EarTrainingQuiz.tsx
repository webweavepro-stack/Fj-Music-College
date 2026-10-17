import React, { useState } from 'react';
import { playSynthesizerNote, NOTE_FREQUENCIES } from '../../utils/audioSynthesizer';
import { Volume2, Award, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface IntervalQuestion {
  name: string;
  firstPitch: string;
  secondPitch: string;
  intervalSemitones: number;
  explanation: string;
}

const INTERVAL_QUESTIONS: IntervalQuestion[] = [
  {
    name: 'Major 3rd (Do - Mi)',
    firstPitch: 'C4',
    secondPitch: 'E4',
    intervalSemitones: 4,
    explanation: '4 semitones apart. Sounds happy, open, and consonant. Classic triad root to third.',
  },
  {
    name: 'Perfect 5th (Do - Sol)',
    firstPitch: 'C4',
    secondPitch: 'G4',
    intervalSemitones: 7,
    explanation: '7 semitones apart. Extremely stable, foundational harmonic cornerstone of power chords and cadences.',
  },
  {
    name: 'Minor 3rd (Do - Me)',
    firstPitch: 'A3',
    secondPitch: 'C4',
    intervalSemitones: 3,
    explanation: '3 semitones apart. Characteristic somber, reflective minor quality.',
  },
  {
    name: 'Octave (Do - Do\')',
    firstPitch: 'C4',
    secondPitch: 'C5',
    intervalSemitones: 12,
    explanation: '12 semitones. Complete 2:1 harmonic frequency doubling. Unison pitch identity.',
  },
  {
    name: 'Perfect 4th (Do - Fa)',
    firstPitch: 'C4',
    secondPitch: 'F4',
    intervalSemitones: 5,
    explanation: '5 semitones. "Here Comes the Bride" opening interval.',
  },
];

export const EarTrainingQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);

  const currentQ = INTERVAL_QUESTIONS[currentIndex];

  const playInterval = () => {
    const freq1 = NOTE_FREQUENCIES[currentQ.firstPitch];
    const freq2 = NOTE_FREQUENCIES[currentQ.secondPitch];
    if (freq1 && freq2) {
      playSynthesizerNote(freq1, 0.6, 'triangle', 0.25);
      setTimeout(() => {
        playSynthesizerNote(freq2, 0.8, 'triangle', 0.28);
      }, 550);
    }
  };

  const handleSelect = (optionName: string) => {
    if (selectedAnswer !== null) return; // already answered
    setSelectedAnswer(optionName);
    setAnsweredCount((prev) => prev + 1);
    if (optionName === currentQ.name) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setCurrentIndex((prev) => (prev + 1) % INTERVAL_QUESTIONS.length);
  };

  const options = INTERVAL_QUESTIONS.map((q) => q.name);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-lime-400" />
          <h4 className="font-heading font-semibold text-sm sm:text-base">
            Ear Training & Interval Identification
          </h4>
        </div>
        <div className="text-xs font-mono text-lime-400 font-bold bg-lime-500/10 px-2.5 py-1 rounded-md border border-lime-500/30">
          Score: {score} / {answeredCount}
        </div>
      </div>

      <div className="text-center py-4">
        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Click below to hear two notes played in sequence. Identify the musical interval:
        </p>

        <button
          onClick={playInterval}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold shadow-lg transition-transform active:scale-95"
        >
          <Volume2 className="w-5 h-5" />
          <span>Play Interval Audio</span>
        </button>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
        {options.map((option) => {
          const isChosen = selectedAnswer === option;
          const isCorrect = option === currentQ.name;
          let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';

          if (selectedAnswer !== null) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold';
            } else if (isChosen) {
              btnStyle = 'bg-rose-900/60 border-rose-500 text-rose-200';
            } else {
              btnStyle = 'bg-slate-800/40 opacity-40 text-slate-400 border-slate-800';
            }
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={selectedAnswer !== null}
              className={`p-3 text-left text-xs sm:text-sm rounded-xl border transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {selectedAnswer !== null && (
                <span>
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isChosen ? (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback banner */}
      {selectedAnswer !== null && (
        <div
          className={`p-3.5 rounded-xl text-xs mt-3 flex items-start gap-2.5 ${
            selectedAnswer === currentQ.name
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
          }`}
        >
          {selectedAnswer === currentQ.name ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-semibold mb-0.5">
              {selectedAnswer === currentQ.name ? 'Correct!' : `Answer: ${currentQ.name}`}
            </p>
            <p className="text-slate-300">{currentQ.explanation}</p>
          </div>
          <button
            onClick={handleNext}
            className="px-3 py-1.5 bg-white text-slate-900 rounded-lg font-bold text-xs hover:bg-slate-200 transition-colors shrink-0"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
