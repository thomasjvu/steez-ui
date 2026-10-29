import React from "react";

export type LoadingStage = "init" | "auth" | "agent" | "config" | "ready";

const STAGES: Record<LoadingStage, { progress: number; message: string }> = {
  init: { progress: 0, message: "Initializing..." },
  auth: { progress: 25, message: "Authenticating..." },
  agent: { progress: 50, message: "Loading agent..." },
  config: { progress: 75, message: "Loading configuration..." },
  ready: { progress: 100, message: "Preparing interface..." },
};

const EASE_STEPS = 20;
const EASE_STEP_MS = 100;

/**
 * Eases a progress value toward each loading stage's target over two seconds
 * and reports a message for the stage. Ending the load jumps to 100%.
 */
export function useLoadingProgress(
  isLoading: boolean,
  _phase?: string,
  stage: LoadingStage = "init",
) {
  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState(STAGES.init.message);
  const progressRef = React.useRef(0);

  const report = React.useCallback((value: number) => {
    progressRef.current = value;
    setProgress(value);
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      report(100);
      setMessage("Complete!");
      return undefined;
    }

    const target = STAGES[stage];
    setMessage(target.message);

    const start = progressRef.current;
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      report(Math.min(start + ((target.progress - start) * step) / EASE_STEPS, target.progress));
      if (step >= EASE_STEPS) {
        clearInterval(interval);
      }
    }, EASE_STEP_MS);

    return () => clearInterval(interval);
  }, [isLoading, report, stage]);

  return { progress, message };
}
