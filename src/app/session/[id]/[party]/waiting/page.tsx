import { AutoRefreshWrapper } from "@/components/AutoRefreshWrapper";
import MpcVideo from "@/components/MpcVideo";
import TextBlock from "@/components/TextBlock";
import Warning from "@/components/Warning";
import Compute from "@/components/Compute";
import { sql } from "@/lib/db";
import WaitingDots from "@/components/WaitingDots";

async function WaitingServer({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  const { id, party } = await params;
  const partyIndex = parseInt(party);

  const submissions = await sql`
    SELECT * FROM submissions WHERE session_id = ${id}
  `;

  const intervalRangeDB = await sql`
    SELECT interval_range
    FROM sessions
    WHERE session_id = ${id}
  `;

  const intervalRange = parseInt(intervalRangeDB[0].interval_range);

  if (submissions.length === 3) {
    return (
      <div className="flex flex-col justify-center items-center gap-12 max-w-2xl">
        <TextBlock>
          All inputs submited. The result is being privately computed...
        </TextBlock>
        <MpcVideo />
        <div className="flex justify-center gap-1 h6"></div>
        <Compute
          url={`http://localhost:8000/session/${id}/`}
          session={id}
          party={partyIndex}
          range={intervalRange}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center gap-12 max-w-2xl">
        <TextBlock>
          Waiting for the other participants to submit their inputs.
        </TextBlock>
        <MpcVideo />
        <WaitingDots />
        <Warning>
          Please do not close this tab until the result is ready!
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
