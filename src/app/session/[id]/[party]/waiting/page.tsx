import { AutoRefreshWrapper } from "@/components/AutoRefreshWrapper";
import MpcVideo from "@/components/MpcVideo";
import TextBlock from "@/components/TextBlock";
import Warning from "@/components/Warning";
import { sql } from "@/lib/db";
import Link from "next/link";

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
    return (
      <div className="flex flex-col justify-center items-center gap-12 max-w-2xl">
        <TextBlock>
          All participants have submitted their inputs and results are ready.
        </TextBlock>
        <TextBlock>
          Here you can find an animation that can provide a brief idea behind
          how MPC protocols work:
        </TextBlock>
        <MpcVideo />
        <Link
          href={`/session/${id}/computing`}
          className="bg-sine-green border border-black rounded-3xl px-4 py-2 animate-bounce"
        >
          See Results
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center gap-12 max-w-2xl">
        <TextBlock>
          Waiting for the other participants to submit their inputs...
        </TextBlock>
        <TextBlock>
          Here you can find an animation that can provide a brief idea behind
          how MPC protocols work:
        </TextBlock>
        <MpcVideo />
        <div className="flex justify-center gap-1">
          <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.3s]"></div>
          <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.6s]"></div>
          <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.9s]"></div>
        </div>
        <Warning>
          Please do not close this tab until the result is shown!
        </Warning>
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
