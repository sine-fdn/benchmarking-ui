import Box from "@/components/Box";
import PrivateInputForm from "@/components/PrivateInputForm";
import TextBlock from "@/components/TextBlock";
import { sql } from "@/lib/db";

export default async function Party({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  async function getSession() {
    const { id } = await params;

    const session = await sql`
      SELECT * FROM sessions WHERE session_id = ${id}
    `;

    if (session.length != 1) {
      throw new Error(`Session with id ${id} not found`);
    }

    return session[0];
  }

  const { session_id, value_name, interval_range, unit } = await getSession();
  const { party } = await params;
  const partyIndex = parseInt(party[party.length - 1]);

  return (
    <div className="flex flex-col justify-center items-center gap-12 max-w-2xl">
      <TextBlock>
        You&apos;ve been invited to join a private benchmark, powered by SINE
        Foundation&apos;s Secure Multi-Party Computation (MPC) engine,{" "}
        <strong>Polytune</strong>.
      </TextBlock>
      <TextBlock>
        The benchmark will determine whether your value of{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {value_name}
        </span>{" "}
        in{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {unit}
        </span>{" "}
        is within{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {interval_range}%
        </span>{" "}
        of the average of all participants.{" "}
        <strong>Your input will remain private and ecnrypted</strong>.
      </TextBlock>
      <Box>
        <PrivateInputForm
          sessionID={session_id}
          party={partyIndex}
          valueName={value_name}
          unit={unit}
        />
      </Box>
    </div>
  );
}
