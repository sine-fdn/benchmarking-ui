import { ReactNode } from "react";

export default function Warning({ children }: { children: ReactNode }) {
  return (
    <p className="text-center bg-sine-red rounded-3xl px-4 py-2 border border-black w-xs sm:w-fit">
      {children}
    </p>
  );
}
