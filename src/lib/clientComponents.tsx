"use client";

import React from "react";

export function AutoRefreshWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return <>{children}</>;
}
