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
    >
      {text}
    </button>
  );
};
