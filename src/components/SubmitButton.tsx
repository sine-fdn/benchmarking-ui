"use client";

import { ReactNode, useState } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
}

export function SubmitButton({ children, className = "" }: SubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <button
      type="submit"
      className={`border border-black px-8 py-1 bg-sine-green rounded-2xl cursor-pointer disabled:cursor-auto ${className} disabled:opacity-35`}
      onClick={(e) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if (form) {
          if (form.checkValidity()) {
            setIsSubmitting(true);
            form.requestSubmit();
          } else {
            form.reportValidity();
          }
        }
      }}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <svg
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin w-6 h-6"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5"
              stroke="#121923"
              strokeWidth="1.2"
            ></path>{" "}
          </g>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
