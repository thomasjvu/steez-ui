import { PREVIEW_EXAMPLES, type PreviewValues } from "./preview-config";

export function PreviewOptions({ slug, values, onChange }: {
  slug: string;
  values: PreviewValues;
  onChange: (prop: string, value: PreviewValues[string]) => void;
}) {
  const example = PREVIEW_EXAMPLES[slug];
  if (!example) return null;
  const defaults = example.props as Record<string, unknown>;
  const shape = values.shape ?? defaults.shape;
  const controls = example.controls.filter(control => {
    if (slug !== "button") return true;
    if (control.prop === "orientation") return shape === "crystal";
    if (["cutCorners", "cutSize"].includes(control.prop)) return shape === "cut";
    return true;
  });
  return (
    <div className="preview-options" aria-label="Preview options">
      {controls.map(control => {
        const value = values[control.prop] ?? defaults[control.prop];
        if (control.multiple) {
          const selected = value as string[];
          return (
            <fieldset key={control.prop} className="preview-corners">
              <legend>{control.label}</legend>
              {control.choices?.map(choice => (
                <label key={choice} title={choice.replaceAll("-", " ")}>
                  <input type="checkbox" checked={selected.includes(choice)}
                    onChange={event => onChange(control.prop, event.target.checked
                      ? [...selected, choice]
                      : selected.filter(item => item !== choice))} />
                  <span className="sr-only">{choice.replaceAll("-", " ")}</span>
                  <span className="corner-mark" data-corner={choice} aria-hidden="true" />
                </label>
              ))}
            </fieldset>
          );
        }
        return (
          <label key={control.prop} className={`preview-option ${!control.choices && control.min === undefined ? "preview-toggle" : ""}`}>
            <span>{control.label}</span>
            {control.choices ? (
              <select value={String(value)} onChange={event => onChange(control.prop, event.target.value)}>
                {control.choices.map(choice => (
                  <option key={choice} value={choice}>{choice.replaceAll("-", " ")}</option>
                ))}
              </select>
            ) : control.min !== undefined ? (
              <>
                <input type="range" min={control.min} max={control.max} value={Number(value)}
                  onChange={event => onChange(control.prop, Number(event.target.value))} />
                <output>{String(value)}{control.prop === "progress" ? "%" : ""}</output>
              </>
            ) : (
              <input type="checkbox" checked={Boolean(value)}
                onChange={event => onChange(control.prop, event.target.checked)} />
            )}
          </label>
        );
      })}
    </div>
  );
}
