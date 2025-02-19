"use client";

import init, { compute } from "@/lib/pkg/polytune_wasm_http_channels.js";
import { useEffect } from "react";

interface ComputeTypes {
  url: string;
  session: string;
  party: number;
  input: number;
  range: number;
}

export default function Compute({
  url,
  session,
  party,
  input,
  range,
}: ComputeTypes) {
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

      compute(url, party, input, range).then((result) => {
        console.log("Secure Multi-Party Computation result:", result);
      });
    });
  }, [input, party, range, session, url]);

  return <div></div>;
}
