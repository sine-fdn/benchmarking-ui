export default async function Links({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.BASEPATH ?? "http://localhost:3000";

  const link1 = `${baseUrl}/session/${id}/party1`;
  const link2 = `${baseUrl}/session/${id}/party2`;
  const link3 = `${baseUrl}/session/${id}/party3`;

  const linkClasses =
    "border border-black rounded-3xl px-4 py-2 underline decoration-sine-purple font-mono text-sm w-fit";

  const participantClasses =
    "bg-sine-purple border border-black rounded-3xl xl:pt-0.5 xl:w-1/3 xl:h-1/2 w-1/4 mt-6";

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <p>Give each participant one link:</p>
      <div className="grid xl:grid-flow-col xl:grid-rows-3 xl:grid-cols-3 gap-x-3 mt-2 mb-12 grid-flow-row mx-4">
        <div className="flex justify-center items-end">
          <p className={participantClasses}>Participant 1</p>
        </div>
        <div className="flex justify-center bg-black w-[1.5px] mx-auto">|</div>
        <div className={linkClasses}>
          <a href={link1}>{link1}</a>
        </div>
        <div className="flex justify-center items-end">
          <p className={participantClasses}>Participant 2</p>
        </div>
        <div className="flex justify-center bg-black w-[1.5px] mx-auto">|</div>
        <div className={linkClasses}>
          <a href={link2}>{link2}</a>
        </div>
        <div className="flex justify-center items-end">
          <p className={participantClasses}>Participant 3</p>
        </div>
        <div className="flex justify-center bg-black w-[1.5px] mx-auto">|</div>
        <div className={linkClasses}>
          <a href={link3}>{link3}</a>
        </div>
      </div>
      <p className="text-center">
        Each participant will be asked to provide a public alias and an input,
        which will remain private.
      </p>
      <p className="text-center mt-12 bg-sine-red rounded-3xl px-4 py-2 border border-black">
        All participants must be online at the same time!
      </p>
    </div>
  );
}
