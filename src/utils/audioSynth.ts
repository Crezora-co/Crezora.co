// Interactive Web Audio API synthesizer, metronome, and drum generator

class AudioEngine {
  private ctx: AudioContext | null = null;
  private metronomeTimer: number | null = null;
  private currentBeat = 0;
  private isMetronomePlaying = false;

  private initCtx(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a musical note with custom wave type and ADSR envelope
  playNote(frequency: number, durationSec = 0.5, waveType: OscillatorType = 'triangle') {
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = waveType;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // ADSR envelope
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + durationSec);
    } catch (err) {
      console.warn('Audio play note error:', err);
    }
  }

  // Synthesized drum sounds without needing external mp3 files
  playDrum(type: 'kick' | 'snare' | 'hihat' | 'clap' | 'tom' | 'rimshot') {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      if (type === 'kick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.4);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'snare') {
        // Noise buffer for snare snap
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + 0.2);
      } else if (type === 'hihat') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(8000, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'clap') {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            this.playDrum('hihat');
          }, i * 15);
        }
      } else if (type === 'tom') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'rimshot') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (err) {
      console.warn('Audio play drum error:', err);
    }
  }

  // Metronome click
  private playClick(isAccent: boolean) {
    try {
      const ctx = this.initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.frequency.setValueAtTime(isAccent ? 1600 : 880, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (err) {
      console.warn('Metronome click error:', err);
    }
  }

  // Start Metronome with callback on each beat for visual pulse
  startMetronome(bpm: number, beatsPerMeasure = 4, onBeat?: (beatNumber: number) => void) {
    this.stopMetronome();
    this.isMetronomePlaying = true;
    this.currentBeat = 0;

    const intervalMs = (60 / bpm) * 1000;

    const tick = () => {
      if (!this.isMetronomePlaying) return;
      const isAccent = this.currentBeat === 0;
      this.playClick(isAccent);
      if (onBeat) {
        onBeat(this.currentBeat + 1);
      }
      this.currentBeat = (this.currentBeat + 1) % beatsPerMeasure;
      this.metronomeTimer = window.setTimeout(tick, intervalMs);
    };

    tick();
  }

  stopMetronome() {
    this.isMetronomePlaying = false;
    if (this.metronomeTimer !== null) {
      clearTimeout(this.metronomeTimer);
      this.metronomeTimer = null;
    }
  }

  isMetronomeActive(): boolean {
    return this.isMetronomePlaying;
  }
}

export const audioEngine = new AudioEngine();

// Note frequency map for 2 octaves (C3 to B4)
export const PIANO_KEYS = [
  { note: 'C3', freq: 130.81, isBlack: false, keyLabel: 'A' },
  { note: 'C#3', freq: 138.59, isBlack: true, keyLabel: 'W' },
  { note: 'D3', freq: 146.83, isBlack: false, keyLabel: 'S' },
  { note: 'D#3', freq: 155.56, isBlack: true, keyLabel: 'E' },
  { note: 'E3', freq: 164.81, isBlack: false, keyLabel: 'D' },
  { note: 'F3', freq: 174.61, isBlack: false, keyLabel: 'F' },
  { note: 'F#3', freq: 185.00, isBlack: true, keyLabel: 'T' },
  { note: 'G3', freq: 196.00, isBlack: false, keyLabel: 'G' },
  { note: 'G#3', freq: 207.65, isBlack: true, keyLabel: 'Y' },
  { note: 'A3', freq: 220.00, isBlack: false, keyLabel: 'H' },
  { note: 'A#3', freq: 233.08, isBlack: true, keyLabel: 'U' },
  { note: 'B3', freq: 246.94, isBlack: false, keyLabel: 'J' },
  { note: 'C4', freq: 261.63, isBlack: false, keyLabel: 'K' },
  { note: 'C#4', freq: 277.18, isBlack: true, keyLabel: 'O' },
  { note: 'D4', freq: 293.66, isBlack: false, keyLabel: 'L' },
  { note: 'D#4', freq: 311.13, isBlack: true, keyLabel: 'P' },
  { note: 'E4', freq: 329.63, isBlack: false, keyLabel: ';' },
  { note: 'F4', freq: 349.23, isBlack: false, keyLabel: "'" },
];
