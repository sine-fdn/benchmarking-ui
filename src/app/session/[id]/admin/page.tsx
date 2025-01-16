export default async function PartyO({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const sessionID = (await params).id;

  const link1 = `http://localhost:3000/session/${sessionID}/party1`;
  const link2 = `http://localhost:3000/session/${sessionID}/party2`;

  return (
    <div>
      <p>One link is for you, the other one, for the other party:</p>
      <ul>
        <li />
        Link1: <a href={link1}>{link1}</a>
        <li />
        Link2: <a href={link2}>{link2}</a>
      </ul>
    </div>
  );
}
