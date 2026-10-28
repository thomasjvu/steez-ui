import { useEffect, useRef, useState } from "react";

export function CodeBlock({
  children,
  label = "Copy code",
}: {
  children: string;
  label?: string;
}) {
  const [feedback, setFeedback] = useState<"idle" | "pending" | "copied" | "error">("idle");
  const pending = useRef(false);
  const mounted = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    if (pending.current || feedback === "copied") return;
    pending.current = true;
    setFeedback("pending");
    try {
      await navigator.clipboard.writeText(children);
      if (!mounted.current) return;
      setFeedback("copied");
      timer.current = setTimeout(() => setFeedback("idle"), 1000);
    } catch {
      if (mounted.current) setFeedback("error");
    } finally {
      pending.current = false;
    }
  }

  return (
    <div className="code-block">
      <pre><code>{children}</code></pre>
      <button
        className="copy-code"
        type="button"
        aria-label={feedback === "copied" ? "Copied!" : label}
        aria-busy={feedback === "pending" || undefined}
        disabled={feedback === "pending" || feedback === "copied"}
        onClick={copy}
      >
        {feedback === "copied" ? "Copied!" : "Copy"}
      </button>
      <span className="sr-only" role="status">
        {feedback === "copied" ? "Copied!" : ""}
      </span>
      {feedback === "error" && (
        <span className="copy-status" role="alert">
          Copy failed. Select the code to copy it.
        </span>
      )}
    </div>
  );
}
