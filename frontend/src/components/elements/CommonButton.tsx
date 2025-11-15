import clsx from "clsx";
import { ReactNode } from "react";

interface CommonButtonProps{
  children: ReactNode;
  color: string;
  invert?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const CommonButton = ({ children, color, onClick, disabled = false }:CommonButtonProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx("w-full h-auto p-4 rounded-2xl active:brightness-90 transition-all duration-300 pointer-events-auto", color)}>
      {children}
    </button>
  );
}

export default CommonButton;