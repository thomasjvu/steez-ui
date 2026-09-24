import { useStableId } from "./useStableId.ts";

export interface UseFieldDescriptionOptions {
  prefix: string;
  helperText?: string;
  error?: string;
  describedBy?: string;
}

export interface FieldDescriptionState {
  errorId: string;
  hasError: boolean;
  helperId: string;
  describedBy: string | undefined;
}

/**
 * Builds stable helper/error IDs and merges them with a consumer's
 * aria-describedby value without dropping any referenced description.
 */
export function useFieldDescription({
  prefix,
  helperText,
  error,
  describedBy: consumerDescribedBy,
}: UseFieldDescriptionOptions): FieldDescriptionState {
  const helperId = useStableId(`${prefix}-helper`);
  const errorId = useStableId(`${prefix}-error`);
  const hasError = Boolean(error);
  const describedBy = [
    consumerDescribedBy,
    helperText ? helperId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return { errorId, hasError, helperId, describedBy };
}
