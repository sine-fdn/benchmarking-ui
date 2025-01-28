import { AutoRefreshWrapper } from "@/components/AutoRefreshWrapper";
import { sql } from "@/lib/db";
import { redirect } from "next/navigation";

async function ComputingServer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const submissions = await sql`
    SELECT * FROM submissions WHERE session_id = ${id}
  `;

  const intervalDB = await sql`
    SELECT interval_range FROM sessions WHERE session_id = ${id}
  `;

  const interval = intervalDB[0].interval_range as number;

  const avg = submissions.reduce((acc, s) => acc + s.submission, 0) / 3;

  const result = submissions.map((s) => {
    const absDiff = Math.abs(avg - s.submission);
    if (absDiff > interval && s.submission > avg) {
      return {
        submitter: s.submitter,
        alias: s.alias,
        result: "above",
      };
    } else if (absDiff > interval && s.submission < avg) {
      return {
        submitter: s.submitter,
        alias: s.alias,
        result: "below",
      };
    } else {
      return {
        submitter: s.submitter,
        alias: s.alias,
        result: "within",
      };
    }
  });

  const resultJson = JSON.stringify(result);

  await sql`
    UPDATE sessions
    SET result = ${resultJson}
    WHERE session_id = ${id}
  `;

  if (!result) {
    return (
      <div className="mt-6 text-xl">
        <p>Computing...</p>
        <p>
          Please do not close this tab. All participants need to stay online
          during the computation
        </p>
      </div>
    );
  } else {
    redirect(`/session/${id}/result`);
  }
}

export default function Computing({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <AutoRefreshWrapper>
      <ComputingServer params={params} />
    </AutoRefreshWrapper>
  );
}
