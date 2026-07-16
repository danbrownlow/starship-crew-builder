interface ButtonType {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  describedBy?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}

export const Button = ({
  text,
  onClick,
  isDisabled = false,
  describedBy,
  ariaLabel,
  type = "button",
}: ButtonType) => {
  return (
    <button
      type={type}
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={isDisabled}
      className="rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2 py-1.5 text-sm font-medium text-[var(--text-h)] transition-colors hover:bg-[var(--accent)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--accent-bg)] disabled:hover:text-[var(--text-h)]"
    >
      {text}
    </button>
  );
};
