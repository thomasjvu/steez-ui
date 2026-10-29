import React from "react";

import { LOADING_PROGRESS_SEGMENT_COUNT } from "./LoadingProgressBar.tsx";

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

function playBeep(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = 523.25;
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

/**
 * When enabled, beeps each time `progress` (0–100) fills another progress-bar
 * segment. Audio unlocks on the first pointer or key press, as browsers require.
 */
export function useProgressBeep(enabled: boolean, progress: number) {
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const audioEnabledRef = React.useRef(false);
  const filledBarsRef = React.useRef(0);

  React.useEffect(() => {
    if (!enabled) return undefined;

    const enableAudio = async () => {
      const AudioContextClass =
        window.AudioContext || (window as AudioWindow).webkitAudioContext;
      if (!AudioContextClass) return;

      try {
        const ctx = audioCtxRef.current ?? new AudioContextClass();
        audioCtxRef.current = ctx;
        if (ctx.state === "suspended") {
          await ctx.resume();
        }
        audioEnabledRef.current = ctx.state === "running";
      } catch {
        audioEnabledRef.current = false;
      }
    };

    window.addEventListener("pointerdown", enableAudio, { once: true, passive: true });
    window.addEventListener("keydown", enableAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", enableAudio);
      window.removeEventListener("keydown", enableAudio);
      if (audioCtxRef.current) {
        void audioCtxRef.current.close().catch(() => undefined);
        audioCtxRef.current = null;
      }
      audioEnabledRef.current = false;
    };
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled) return;

    const filledBars = Math.round((progress / 100) * LOADING_PROGRESS_SEGMENT_COUNT);
    if (filledBars > filledBarsRef.current) {
      const ctx = audioCtxRef.current;
      if (ctx && audioEnabledRef.current) playBeep(ctx);
      filledBarsRef.current = filledBars;
    }
  }, [enabled, progress]);
}
