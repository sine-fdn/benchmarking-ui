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
      <div className="flex flex-col justify-center items-center gap-12 max-w-2xl">
        <div>
          <h1 className="-mb-2">Private Multi-Party Benchmark</h1>
          <h2>by SINE Foundation</h2>
        </div>
        <p>Waiting for the other participants to submit their value</p>
        <div className="flex justify-center gap-1">
          <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.3s]"></div>
          <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.6s]"></div>
          <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.9s]"></div>
        </div>
        <div className="max-w-2xl">
          <video width="max" height="max" controls autoPlay={true} loop={true}>
            <source src="/mpc.mp4" type="video/mp4" />
          </video>
        </div>
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
