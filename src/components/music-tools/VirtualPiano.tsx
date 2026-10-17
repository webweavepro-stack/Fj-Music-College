import React, { useState, useEffect, useCallback } from 'react';
import { playSynthesizerNote, NOTE_FREQUENCIES, SOLFA_MAP } from '../../utils/audioSynthesizer';
import { Music, Volume2, Sparkles } from 'lucide-react';

interface KeyConfig {
  note: string;
  keyboardKey?: string;
  isBlack: boolean;
}

const KEYS_OCTAVE: KeyConfig[] = [
  { note: 'C', keyboardKey: 'A', isBlack: false },
  { note: 'C#', keyboardKey: 'W', isBlack: true },
  { note: 'D', keyboardKey: 'S', isBlack: false },
  { note: 'D#', keyboardKey: 'E', isBlack: true },
  { note: 'E', keyboardKey: 'D', isBlack: false },
  { note: 'F', keyboardKey: 'F', isBlack: false },
  { note: 'F#', keyboardKey: 'T', isBlack: true },
  { note: 'G', keyboardKey: 'G', isBlack: false },
  { note: 'G#', keyboardKey: 'Y', isBlack: true },
  { note: 'A', keyboardKey: 'H', isBlack: false },
  { note: 'A#', keyboardKey: 'U', isBlack: true },
  { note: 'B', keyboardKey: 'J', isBlack: false },
];

export const VirtualPiano: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [octave, setOctave] = useState<number>(4);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [showSolfa, setShowSolfa] = useState<boolean>(true);
  const [synthType, setSynthType] = useState<OscillatorType>('triangle');

  const handlePlay = useCallback(
    (pitch: string) => {
      const freq = NOTE_FREQUENCIES[pitch];
      if (freq) {
        playSynthesizerNote(freq, 0.9, synthType, 0.28);
        setActiveNote(pitch);
        setTimeout(() => setActiveNote(null), 350);
      }
    },
    [synthType]
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const keyUpper = e.key.toUpperCase();
      const match = KEYS_OCTAVE.find((k) => k.keyboardKey === keyUpper);
      if (match) {
        e.preventDefault();
        handlePlay(`${match.note}${octave}`);
      } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handlePlay(`C${octave + 1}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [octave, handlePlay]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-white shadow-xl">
      {/* Top Deck: Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm sm:text-base text-slate-100">
              Interactive Keyboard & Sol-fa Lab
            </h4>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Web Audio Polyphonic Synthesizer</span>
              <span aria-hidden="true">·</span>
              <span>Computer Keys: A to K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Octave Controls */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700/60">
            <button
              onClick={() => setOctave((prev) => Math.max(3, prev - 1))}
              disabled={octave <= 3}
              className="px-2.5 py-1 text-xs font-semibold rounded hover:bg-slate-700 disabled:opacity-40 transition-colors"
              title="Lower Octave"
            >
              Octave -
            </button>
            <span className="px-2 text-xs font-bold font-mono text-lime-400">
              {octave}
            </span>
            <button
              onClick={() => setOctave((prev) => Math.min(5, prev + 1))}
              disabled={octave >= 5}
              className="px-2.5 py-1 text-xs font-semibold rounded hover:bg-slate-700 disabled:opacity-40 transition-colors"
              title="Raise Octave"
            >
              Octave +
            </button>
          </div>

          {/* Sol-fa toggle */}
          <button
            onClick={() => setShowSolfa(!showSolfa)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showSolfa
                ? 'bg-lime-500/15 border-lime-500/40 text-lime-400'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {showSolfa ? 'Sol-fa: ON' : 'Sol-fa: OFF'}
          </button>

          {/* Sound Timbre */}
          <select
            value={synthType}
            onChange={(e) => setSynthType(e.target.value as OscillatorType)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 outline-none focus:border-lime-500"
          >
            <option value="triangle">Acoustic Piano</option>
            <option value="sine">Warm Flute / Organ</option>
            <option value="sawtooth">Synth Lead</option>
          </select>
        </div>
      </div>

      {/* Piano Keys Board */}
      <div className="relative overflow-x-auto pb-2 flex justify-center">
        <div className="relative flex select-none bg-slate-950 p-3 rounded-xl border border-slate-800 shadow-inner">
          {/* White and Black Keys */}
          {KEYS_OCTAVE.map((k) => {
            const pitch = `${k.note}${octave}`;
            const isActive = activeNote === pitch;
            const solfaLabel = SOLFA_MAP[k.note];

            if (k.isBlack) {
              return null; // rendered relatively with the previous white key
            }

            // Find if there's a sharp for this note
            const sharpKey = KEYS_OCTAVE.find(
              (sk) => sk.isBlack && sk.note === `${k.note}#`
            );
            const sharpPitch = sharpKey ? `${sharpKey.note}${octave}` : null;
            const isSharpActive = sharpPitch ? activeNote === sharpPitch : false;

            return (
              <div key={pitch} className="relative">
                {/* White Key */}
                <button
                  onClick={() => handlePlay(pitch)}
                  className={`relative w-12 sm:w-14 h-40 sm:h-48 rounded-b-lg border-x border-b border-slate-300 transition-all flex flex-col justify-end items-center pb-3 cursor-pointer ${
                    isActive
                      ? 'bg-lime-200 shadow-[inset_0_-8px_12px_rgba(132,204,22,0.6)] translate-y-0.5'
                      : 'bg-gradient-to-b from-slate-100 to-white hover:from-slate-50 hover:to-slate-100 active:bg-slate-200 shadow-md'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-mono">
                    [{k.keyboardKey}]
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-heading">
                    {k.note}
                    <sub className="text-[9px] text-slate-500">{octave}</sub>
                  </span>
                  {showSolfa && (
                    <span className="text-[10px] font-semibold text-emerald-800">
                      {solfaLabel?.split(' ')[0]}
                    </span>
                  )}
                </button>

                {/* Overlapping Black Key (if applicable) */}
                {sharpKey && sharpPitch && (
                  <button
                    onClick={() => handlePlay(sharpPitch)}
                    className={`absolute -right-4 sm:-right-5 top-0 z-10 w-8 sm:w-10 h-24 sm:h-28 rounded-b-md transition-all flex flex-col justify-end items-center pb-2 cursor-pointer shadow-lg border-x border-b border-black ${
                      isSharpActive
                        ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] translate-y-0.5'
                        : 'bg-gradient-to-b from-slate-800 to-black hover:from-slate-700 active:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <span className="text-[9px] text-slate-400 font-mono">
                      {sharpKey.keyboardKey}
                    </span>
                    <span className="text-[10px] font-bold text-slate-100">
                      {sharpKey.note}
                    </span>
                  </button>
                )}
              </div>
            );
          })}

          {/* High C */}
          <div className="relative">
            <button
              onClick={() => handlePlay(`C${octave + 1}`)}
              className={`relative w-12 sm:w-14 h-40 sm:h-48 rounded-b-lg border-x border-b border-slate-300 transition-all flex flex-col justify-end items-center pb-3 cursor-pointer ${
                activeNote === `C${octave + 1}`
                  ? 'bg-lime-200 shadow-[inset_0_-8px_12px_rgba(132,204,22,0.6)] translate-y-0.5'
                  : 'bg-gradient-to-b from-slate-100 to-white hover:from-slate-50 hover:to-slate-100 active:bg-slate-200 shadow-md'
              }`}
            >
              <span className="text-[10px] text-slate-400 font-mono">[K]</span>
              <span className="text-xs font-bold text-slate-900 font-heading">
                C<sub className="text-[9px] text-slate-500">{octave + 1}</sub>
              </span>
              {showSolfa && (
                <span className="text-[10px] font-semibold text-emerald-800">
                  d'
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-lime-400" />
          <span>Click piano keys or press physical computer keys [A - K] to hear realtime pitches.</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Active Pitch:</span>
          <span className="font-mono text-lime-400 font-bold">
            {activeNote || 'Rest'}
          </span>
        </div>
      </div>
    </div>
  );
};
