"use client";

interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  className = "",
  id,
  ...rest
}: SwitchProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => {
        if (!disabled) onCheckedChange?.(!checked);
      }}
      className={cxSwitch(className, checked)}
      {...rest}
    >
      <span
        className={cxThumb(checked)}
      />
    </button>
  );
}

function cxSwitch(className: string, checked: boolean): string {
  const base =
    "-mt-1 inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors border-2 border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const state = checked
    ? "bg-primary"
    : "bg-input";
  return [base, state, className].filter(Boolean).join(" ");
}

function cxThumb(checked: boolean): string {
  const base =
    "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform";
  const pos = checked ? "translate-x-4" : "translate-x-0";
  return [base, pos].join(" ");
}

export default Switch;