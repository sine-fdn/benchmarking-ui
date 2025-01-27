export default async function Links({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.BASEPATH ?? "http://localhost:3000";

  const link1 = `${baseUrl}/session/${id}/party1`;
  const link2 = `${baseUrl}/session/${id}/party2`;
  const link0 = `${baseUrl}/session/${id}/party0`;

  const linkClasses = "text-green-600 underline";

  return (
    <div className="text-center">
      <p className="text-xl my-6">
        Share the following links with the parties to start the computation
      </p>

      <div className="flex flex-col gap-2 justify-center mx-auto mt-6 text-left">
        <p>Party 1: </p>
        <a className={linkClasses} href={link1}>
          {link1}
        </a>
        <p>Party 2: </p>
        <a className={linkClasses} href={link2}>
          {link2}
        </a>
        <p>Use the following link for yourself: </p>
        <a className={linkClasses} href={link0}>
          {link0}
        </a>
      </div>
    </div>
  );
}
