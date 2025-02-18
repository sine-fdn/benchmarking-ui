import { ReactNode } from "react";

export default function TextBlock({ children }: { children: ReactNode }) {
  return <p className="leading-8 w-xs md:w-xl">{children}</p>;
}
