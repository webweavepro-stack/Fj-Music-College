import React, { useState, useEffect, useRef } from 'react';
import { playMetronomeClick } from '../../utils/audioSynthesizer';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

export const MetronomeTool: React.FC = () => {
  const [bpm, setBpm] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatsPerBar, setBeatsPerBar] = useState<number>(4);
  const [currentBeat, setCurrentBeat] = useState<number>(0);

  const timerRef = useRef<number | null>(null);
  const currentBeatRef = useRef<number>(0);

  // Tempo markings
  const getTempoTerm = (tempo: number) => {
    if (tempo < 60) return 'Largo (Slow & broad)';
    if (tempo < 76) return 'Adagio (Slow & stately)';
    if (tempo < 108) return 'Andante (Walking pace)';
    if (tempo < 120) return 'Moderato (Moderate)';
    if (tempo < 168) return 'Allegro (Fast & bright)';
    return 'Presto (Very fast)';
  };

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = (60 / bpm) * 1000;
      currentBeatRef.current = 0;
      setCurrentBeat(0);

      playMetronomeClick(true);

      timerRef.current = window.setInterval(() => {
        currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerBar;
        setCurrentBeat(currentBeatRef.current);
        const isAccent = currentBeatRef.current === 0;
        playMetronomeClick(isAccent);
      }, intervalMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setCurrentBeat(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, beatsPerBar]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <h4 className="font-heading font-semibold text-sm sm:text-base">
            Professional Practice Metronome
          </h4>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {getTempoTerm(bpm)}
        </span>
      </div>

      {/* BPM Display & Big Visual Pulse */}
      <div className="flex flex-col items-center justify-center my-4">
        <div className="text-5xl font-black font-mono tracking-tight text-white mb-1">
          {bpm}
          <span className="text-base font-normal text-slate-400 ml-2">BPM</span>
        </div>

        {/* Visual Beat Indicator Dots */}
        <div className="flex items-center gap-2.5 my-3">
          {Array.from({ length: beatsPerBar }).map((_, index) => {
            const isCurrent = isPlaying && currentBeat === index;
            const isFirst = index === 0;
            return (
              <div
                key={index}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-75 ${
                  isCurrent
                    ? isFirst
                      ? 'bg-amber-400 scale-125 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                      : 'bg-lime-400 scale-125 shadow-[0_0_8px_rgba(132,204,22,0.8)]'
                    : 'bg-slate-700'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-2 mb-5">
        <input
          type="range"
          min="40"
          max="220"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>40 BPM (Largo)</span>
          <span>120 BPM (Standard)</span>
          <span>220 BPM (Presto)</span>
        </div>
      </div>

      {/* Bottom Controls: Time Signature & Play */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
        {/* Time Signature */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1">Meter:</span>
          {[2, 3, 4, 6].map((meter) => (
            <button
              key={meter}
              onClick={() => setBeatsPerBar(meter)}
              className={`px-2 py-1 text-xs font-semibold rounded ${
                beatsPerBar === meter
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {meter}/4
            </button>
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all ${
            isPlaying
              ? 'bg-red-500/90 hover:bg-red-600 text-white'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Start Metronome</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
