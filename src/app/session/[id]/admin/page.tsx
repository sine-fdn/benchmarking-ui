"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
  const { id } = useParams<{
    id: string;
    party: string;
  }>();

  enum SessionState {
    Waiting,
    Ready,
    Computing,
    Complete,
  }

  const [sessionState, setSessionState] = useState(SessionState.Waiting);
  const [result, setResult] = useState(null);
  const [intervalRange, setIntervalRange] = useState(null);

  const link1 = `http://localhost:3000/session/${id}/party1`;
  const link2 = `http://localhost:3000/session/${id}/party2`;

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`admin/api`);
      const { submissions, result, intervalRange } = await res.json();

      if (result) {
        setSessionState(SessionState.Complete);
        setResult(result.result);
        setIntervalRange(intervalRange);
      } else if (
        submissions.length == 2 ||
        sessionState != SessionState.Computing
      ) {
        setSessionState(SessionState.Ready);
      } else {
        console.log("Waiting");
      }
    }, 5000);

    return () => clearInterval(interval);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`admin/api`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSessionState(SessionState.Computing);
    }
  };

  if (sessionState == SessionState.Waiting) {
    return (
      <div>
        <p>One link is for you, the other one, for the other party:</p>
        <ul>
          <li />
          Link1: <a href={link1}>{link1}</a>
          <li />
          Link2: <a href={link2}>{link2}</a>
        </ul>
      </div>
    );
  } else if (sessionState == SessionState.Ready) {
    return (
      <div>
        <p>Both parties have submitted their values.</p>
        <form onSubmit={handleSubmit}>
          <button type="submit">Start Computation</button>
        </form>
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
        <p>
          Result: your values are {result == "true" ? "" : "not"} within a +/-{" "}
          {intervalRange} interval of each other.
        </p>
      </div>
    );
  }
}
