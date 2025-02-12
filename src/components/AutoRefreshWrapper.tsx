"use client";

import React from "react";

export function AutoRefreshWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  "use client";
  React.useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return <>{children}</>;
}
