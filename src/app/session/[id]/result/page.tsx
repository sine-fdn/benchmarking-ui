import { sql } from "@/lib/db";
import Link from "next/link";

export default async function Result({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  const { id } = await params;

  const resultDB = await sql`
    SELECT result FROM sessions WHERE session_id = ${id}
  `;

  const result = resultDB[0].result;

  const session = await sql`
    SELECT * FROM sessions WHERE session_id = ${id}
  `;

  const { interval_range } = session[0];

  type Result = "within" | "below" | "above";

  const above = result.filter((r: { result: Result }) => r.result === "above");
  const within = result.filter(
    (r: { result: Result }) => r.result === "within"
  );
  const below = result.filter((r: { result: Result }) => r.result === "below");

  function placeParticipants(group: []) {
    return group.map((party: { submitter: string; alias: string }) => {
      return (
        <p
          key={party.submitter}
          className="border rounded-xl border-black px-4 bg-sine-blue h-fit"
        >
          {party.alias}
        </p>
      );
    });
  }

  return (
    <div className="flex flex-col gap-12 justify-center items-center">
      <div className="flex justify-between px-4 md:px-20 gap-2 w-full">
        <div className="grid lg:flex gap-2 items-center">
          {placeParticipants(above)}
        </div>
        <p className="text-right">
          {"> "}
          {interval_range}% above average
        </p>
      </div>
      <div className="w-xs md:w-xl">
        <DividingLine />
        <div className="h-32 flex items-center justify-between">
          <div className="flex justify-between gap-2 px-4 md:px-20 w-full">
            <div className="grid lg:flex gap-2 items-center">
              {placeParticipants(within)}
            </div>
            <p className="text-right">within {interval_range}% of average</p>
          </div>
        </div>
        <DividingLine />
      </div>
      <div className="flex justify-between px-4 md:px-20 gap-2 w-full">
        <div className="grid lg:flex gap-2 items-center">
          {placeParticipants(below)}
        </div>
        <p className="text-right">
          {"< "}
          {interval_range}% below average
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
