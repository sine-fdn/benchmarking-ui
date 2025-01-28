import { AutoRefreshWrapper } from "@/lib/clientComponents";
import { sql } from "@/lib/db";
import { redirect } from "next/navigation";

async function WaitingServer({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  const { id, party } = await params;

  const submissions = await sql`
    SELECT * FROM submissions WHERE session_id = ${id}
  `;

  if (submissions.length === 3) {
    redirect(`/session/${id}/${party}/computing`);
  } else {
    return (
      <div className="mt-6 text-xl">
        <p>Waiting for the other parties to submit their value...</p>
        <p>
          Please do not close this tab. All participants need to stay online
          during the computation
        </p>
      </div>
    );
  }
}

export default function Waiting({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  return (
    <AutoRefreshWrapper>
      <WaitingServer params={params} />
    </AutoRefreshWrapper>
  );
}
