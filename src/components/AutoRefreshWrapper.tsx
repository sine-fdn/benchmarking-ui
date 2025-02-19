"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AutoRefreshWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 2000);

    return () => clearInterval(interval);
  }, [router]);
  return <>{children}</>;
}
