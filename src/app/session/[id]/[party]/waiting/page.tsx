import { AutoRefreshWrapper } from "@/components/AutoRefreshWrapper";
import { sql } from "@/lib/db";
import { redirect } from "next/navigation";

async function WaitingServer({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  const { id } = await params;

  const submissions = await sql`
    SELECT * FROM submissions WHERE session_id = ${id}
  `;

  if (submissions.length === 3) {
    console.log("All submissions received, redirecting to computing page");
    redirect(`/session/${id}/computing`);
  } else {
    return (
      <div>
        <p>Waiting for the other participants to submit their value...</p>
        <p className="text-center mt-12 bg-sine-red rounded-3xl px-4 py-2 border border-black">
        Please do not close this tab until the result is shown!
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
