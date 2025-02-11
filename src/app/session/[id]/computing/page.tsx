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
    const diffPercentage = (absDiff / avg) * 100;

    if (diffPercentage > interval && s.submission > avg) {
      return {
        submitter: s.submitter,
        alias: s.alias,
        result: "above",
      };
    } else if (diffPercentage > interval && s.submission < avg) {
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
      <>
        <p className="text-center bg-sine-green rounded-3xl px-4 py-2 border border-black mx-12">
          That&apos;s it! Encrypted messages will now be transmitted in the
          background. Please don&apos;t close this tab until the result is
          displayed.{" "}
        </p>
      </>
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
