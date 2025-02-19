"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ScrollToTop({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
