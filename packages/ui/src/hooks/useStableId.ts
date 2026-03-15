import { useId } from "react";

export function useStableId(prefix: string, explicitId?: string): string {
  const reactId = useId().replace(/:/g, "");
  return explicitId || `${prefix}-${reactId}`;
}

