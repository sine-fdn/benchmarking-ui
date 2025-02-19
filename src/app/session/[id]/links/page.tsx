import Warning from "@/components/Warning";
import { sql } from "@/lib/db";

export default async function Links({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.BASEPATH ?? "http://localhost:3000";

  const linkClasses =
    "border border-black rounded-3xl break-words px-2 sm:px-4 pt-2 pb-2 underline decoration-sine-purple decoration-4 font-mono text-sm w-xs sm:w-fit xl:mb-0";

  const participantClasses =
    "bg-sine-purple border border-black rounded-3xl xl:w-1/3 px-2 py-1";

  const connectionLineClasses =
    "flex justify-center bg-black w-[1.5px] mx-auto h-6 xl:h-20";

  // TODO: Show actual values from previous screen (making it obvious that it's interactive)
  const session = await sql`
    SELECT * FROM sessions WHERE session_id = ${id}
  `;

  const { value_name, interval_range, unit } = session[0];

  // TODO: Add a button to copy the link to the clipboard
  // TODO: Add a button to share the link via email

  return (
    <div className="text-center flex flex-col justify-center items-center gap-10 sm:gap-16">
      <p className="w-xs sm:w-xl leading-8 md:-mb-6 h-fit">
        Now you can share the following links with participants of your choice,
        checking that their inputs for{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {value_name}
        </span>{" "}
        in{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {unit}
        </span>{" "}
        are within{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {interval_range}%
        </span>{" "}
      </p>
      <div className="grid xl:grid-cols-3 gap-x-3 gap-y-6 grid-flow-row mx-4">
        {[1, 2, 3].map((num) => {
          const link = `${baseUrl}/session/${id}/party${num}`;

          return (
            <div key={num}>
              <div className="flex justify-center items-end">
                <p className={participantClasses}>Participant {num}</p>
              </div>
              <div className={connectionLineClasses}></div>
              <div className={linkClasses}>
                <a href={link}>{link}</a>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center w-xs sm:w-xl">
        Each participant will be asked to provide an input, which will remain
        encrypted and private.
      </p>
      <Warning>All participants must be online at the same time!</Warning>
    </div>
  );
}
