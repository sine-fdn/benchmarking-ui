import { sql } from "@/lib/db";
import Link from "next/link";
import { Submission } from "@/lib/types";

interface Result {
  alias: string;
  bucket: string;
}

type MPCResult = ("Bucket::Above" | "Bucket::Within" | "Bucket::Below")[];

export default async function Result({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const results: Result[] = [
    { alias: "", bucket: "" },
    { alias: "", bucket: "" },
    { alias: "", bucket: "" },
  ];

  const { id } = await params;

  const intervalRangeDB = await sql`
    SELECT interval_range
    FROM sessions
    WHERE session_id = ${id}
  `;

  const intervalRange = parseInt(intervalRangeDB[0].interval_range);

  const query = (await searchParams) ?? {};

  let mpcResult: MPCResult;
  if (typeof query.result === "string") {
    try {
      mpcResult = JSON.parse(query.result);
      if (!Array.isArray(mpcResult)) {
        throw new Error("Result is not an array.");
      }
    } catch (error) {
      throw new Error("Failed to parse result: " + error);
    }
  } else {
    throw new Error("Result is not a string.");
  }

  const parties = await sql`
    SELECT *
    FROM submissions
    WHERE session_id = ${id}
  `;

  const submissions: Submission[] = parties.map((party) => {
    return {
      submissionID: party.submission_id,
      sessionID: party.session_id,
      party: party.party,
      alias: party.alias,
    };
  });

  for (const s of submissions) {
    results[s.party].alias = s.alias;
  }

  for (const [i, bucket] of mpcResult.entries()) {
    results[i].bucket = bucket;
  }

  // sort results into 3 different arrays, one for each bucket
  const above: Result[] = results.filter((r) => r.bucket === "Bucket::Above");
  const within: Result[] = results.filter((r) => r.bucket === "Bucket::Within");
  const below: Result[] = results.filter((r) => r.bucket === "Bucket::Below");

  function placeParticipants(group: Result[]) {
    if (group.length > 0) {
      return group.map((party, index) => {
        return (
          <p
            key={index}
            className="border rounded-xl border-black px-4 bg-sine-blue h-fit"
          >
            {party.alias}
          </p>
        );
      });
    }
  }

  return (
    <div className="flex flex-col gap-12 justify-center items-center">
      <div className="flex justify-between px-4 md:px-20 gap-2 w-full">
        <div className="grid lg:flex gap-2 items-center">
          {placeParticipants(above)}
        </div>
        <p className="text-right">
          {"> "}
          {intervalRange}% above average
        </p>
      </div>
      <div className="w-xs md:w-xl">
        <DividingLine />
        <div className="h-32 flex items-center justify-between">
          <div className="flex justify-between gap-2 px-4 md:px-20 w-full">
            <div className="grid lg:flex gap-2 items-center">
              {placeParticipants(within)}
            </div>
            <p className="text-right">within {intervalRange}% of average</p>
          </div>
        </div>
        <DividingLine />
      </div>
      <div className="flex justify-between px-4 md:px-20 gap-2 w-full">
        <div className="flex gap-2 items-center">
          {placeParticipants(below)}
        </div>
        <p className="text-right">
          {"> "}
          {intervalRange}% below average
        </p>
      </div>
      <div className="flex justify-center mt-6 flex-col items-center gap-12">
        <Link
          href={"/about"}
          className="underline decoration-sine-purple decoration-4"
        >
          Learn more about <strong>Polytune</strong> and MPC
        </Link>
        <Link
          href={"/"}
          className="bg-sine-green border border-black rounded-3xl px-4 py-2"
        >
          Start new benchmark
        </Link>
      </div>
    </div>
  );
}

function DividingLine() {
  return (
    <svg className="w-full h-1" viewBox="0 0 800 5">
      <line
        x1="0"
        y1="2"
        x2="800"
        y2="2"
        stroke="black"
        strokeWidth="2"
        strokeDasharray="10, 10"
      />
    </svg>
  );
}
