// Professional Web Audio Synthesizer and Metronome Engine for FJMUSIC College

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export interface NoteInfo {
  note: string;
  octave: number;
  freq: number;
  solfa: string;
  isBlack: boolean;
  keyboardKey?: string;
}

// Frequency table from C3 to C6
export const NOTE_FREQUENCIES: Record<string, number> = {
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
  'C6': 1046.50,
};

export const SOLFA_MAP: Record<string, string> = {
  'C': 'd (Do)',
  'C#': 'di',
  'D': 'r (Re)',
  'D#': 'ri',
  'E': 'm (Mi)',
  'F': 'f (Fa)',
  'F#': 'fi',
  'G': 's (Sol)',
  'G#': 'si',
  'A': 'l (La)',
  'A#': 'li',
  'B': 't (Ti)',
};

/**
 * Play a synthesizer note with warm acoustic piano / electric keyboard envelope
 */
export function playSynthesizerNote(
  frequency: number,
  durationSeconds: number = 0.8,
  type: OscillatorType = 'triangle',
  volume: number = 0.25
) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(frequency * 3.5, now);
    filter.frequency.exponentialRampToValueAtTime(frequency * 1.2, now + durationSeconds);

    // ADSR Envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02); // quick attack
    gain.gain.exponentialRampToValueAtTime(volume * 0.6, now + 0.15); // decay
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds); // release

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSeconds);
  } catch (err) {
    console.warn('Audio play notice:', err);
  }
}

/**
 * Play a metronome tick (beat 1 is accented high pitch)
 */
export function playMetronomeClick(isAccent: boolean = false) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isAccent ? 1200 : 800, now);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (err) {
    console.warn('Metronome audio notice:', err);
  }
}

/**
 * Play a chord progression e.g. Major triad
 */
export function playChord(frequencies: number[], durationSeconds: number = 1.2) {
  frequencies.forEach((freq, idx) => {
    setTimeout(() => {
      playSynthesizerNote(freq, durationSeconds - idx * 0.05, 'triangle', 0.18);
    }, idx * 30);
  });
}
