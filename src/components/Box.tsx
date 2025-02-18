import { ReactNode } from "react";

export default function Box({ children }: { children: ReactNode }) {
  return (
    <div className="border border-black rounded-3xl p-4 w-xs sm:w-2xl">
      {children}
    </div>
  );
}
