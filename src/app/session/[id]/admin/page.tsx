"use client";

import Link from "next/link";
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

  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "http:";
  const host = typeof window !== "undefined" ? window.location.host : "";
  const baseUrl = `${protocol}//${host}`;
  const link1 = `${baseUrl}/session/${id}/party1`;
  const link2 = `${baseUrl}/session/${id}/party2`;

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`admin/api`);
      const { submissions, result, intervalRange } = await res.json();

      if (result) {
        setSessionState(SessionState.Complete);
        setResult(result.result);
        setIntervalRange(intervalRange);
      } else if (
        submissions.length == 2 &&
        sessionState != SessionState.Computing
      ) {
        setSessionState(SessionState.Ready);
      } else {
        console.log("Waiting");
      }
    }, 1000);

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
        <p className="text-xl my-6">
          One link is for you, the other one, for the other party:
        </p>
        <ul>
          <li />
          Link1:{" "}
          <a href={link1} className="text-green-600 underline">
            {link1}
          </a>
          <li />
          Link2:{" "}
          <a href={link2} className="text-green-600 underline">
            {link2}
          </a>
        </ul>
      </div>
    );
  } else if (sessionState == SessionState.Ready) {
    return (
      <div>
        <p className="text-xl my-6">
          Both parties have submitted their values.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center w-1/2 mx-auto mt-6"
        >
          <button
            type="submit"
            className="mt-4 border border-green-600 rounded px-2 py-1 bg-green-200"
          >
            Start Computation
          </button>
        </form>
      </div>
    );
  } else if (sessionState == SessionState.Computing) {
    return (
      <div className="mt-6 text-xl">
        <p>Computing...</p>
      </div>
    );
  } else {
    return (
      <div className="mt-6 flex flex-col gap-4 items-center">
        <p className="text-xl my-6">
          Result: your values are {result == "true" ? "" : "not"} within a +/-{" "}
          {intervalRange} interval of each other.
        </p>
        <Link
          href={"/"}
          className="text-center mt-4 border border-green-600 rounded px-2 py-1 bg-green-200"
        >
          Start Again
        </Link>
      </div>
    );
  }
}
