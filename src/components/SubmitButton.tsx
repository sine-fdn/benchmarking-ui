import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
}

export function SubmitButton({ children, className = "" }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`border border-black px-8 py-1 bg-sine-green rounded-2xl cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
