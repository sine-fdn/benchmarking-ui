"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Waiting() {
  const { id, party } = useParams<{
    id: string;
    party: string;
  }>();

  enum SessionState {
    Waiting,
    Computing,
    Complete,
  }

  const router = useRouter();
  const [sessionState, setSessionState] = useState(SessionState.Waiting);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`waiting/api`);
      if (res.ok) {
        const { submissions, result } = await res.json();

        if (submissions.length === 2) {
          setSessionState(SessionState.Computing);
        }

        if (result) {
          setSessionState(SessionState.Complete);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [SessionState.Complete, SessionState.Computing, id, party, router]);

  if (sessionState == SessionState.Waiting) {
    return (
      <div>
        <p>Waiting for the other party to submit their value...</p>
      </div>
    );
  } else if (sessionState == SessionState.Computing) {
    return (
      <div>
        <p>Computing...</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Thank you for using Polytune today.</p>
        <p>Goodbye</p>
      </div>
    );
  }
}
