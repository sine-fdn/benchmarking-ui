"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Waiting() {
  const { id, party } = useParams<{
    id: string;
    party: string;
  }>();

  const router = useRouter();
  const [computing, setComputing] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`waiting/api?id=${id}&party=${party}`);
      if (res.ok) {
        const submissions = await res.json();

        console.log("res", res);

        if (submissions.length === 1) {
          setComputing(true);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id, party, router]);

  if (!computing) {
    return (
      <div>
        <p>Waiting for the other party to submit their value...</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Computing...</p>
      </div>
    );
  }
}
