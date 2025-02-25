"use client";

import init, { compute } from "@/lib/pkg/polytune_wasm_http_channels.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import Warning from "./Warning";
import WaitingDots from "./WaitingDots";

interface ComputeTypes {
  url: string;
  session: string;
  party: number;
  range: number;
}

export default function Compute({ url, session, party, range }: ComputeTypes) {
  const [result, setResult] = useState([]);

  const input = parseInt(sessionStorage.getItem("privateInput") ?? "0");

  useEffect(() => {
    // for each .then() catch errors
    init().then(() => {
      console.log(
        "Ready for running Secure Multi-Party Computation from WASM...",
        "url:",
        url,
        "session:",
        session,
        "party:",
        party,
        "input:",
        input,
        "range:",
        range
      );

      const startComputation = Date.now();
      compute(url, party, input, range).then((result) => {
        const duration = Date.now() - startComputation;
        console.log(
          `Secure Multi-Party Computation result ${Math.floor(
            duration / 1000
          )} seconds:`,
          result
        );

        setResult(result);
      });
    });
  }, [input, party, range, session, url]);

  if (result.length === 0) {
    return (
      <>
        <WaitingDots />
        <Warning>
          Please do not close this tab until the result is ready!
        </Warning>
      </>
    );
  } else {
    return (
      <div className="animate-bounce">
        <Link
          href={{
            pathname: `/session/${session}/result`,
            query: { result: JSON.stringify(result) },
          }}
          className="bg-sine-green border border-black rounded-3xl px-4 py-2 mt-12"
        >
          See Results
        </Link>
      </div>
    );
  }
}
