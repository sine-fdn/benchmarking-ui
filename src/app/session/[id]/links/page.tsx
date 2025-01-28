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

  const linkClasses = "text-green-600 underline mb-2";

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <p className="text-xl my-6">
        Share the following links with the parties to start the computation
      </p>
      <p className="text-justify w-1/2 mb-6">
        Three parties are needed for the computation to remain private
        (otherwise, the results could be easily reverse engineered). <br />
        Please make sure to find two other parties willing to engage in this
        pilot with you and provide each of them with one of the following links:
      </p>

      <a className={linkClasses} href={link1}>
        {link1}
      </a>
      <a className={linkClasses} href={link2}>
        {link2}
      </a>
      <p className="mt-6 mb-2">
        Then, do not forget to use a link for yourself:
      </p>
      <a className={linkClasses} href={link3}>
        {link3}
      </a>

      <p className="text-justify w-1/2 mt-6">
        Each party will be asked to provide an alias and an input value.
        Polytune will take each value and privately compute their average. Then,
        it will calculate whether the difference between the average and each
        party&apos;s input value is smaller than the interval range you set.{" "}
      </p>
      <p className="text-justify w-1/2 mt-6">
        <strong>Please note:</strong> all three parties must remain online
        during the entire computation. Please make sure to inform all parties of
        this requirement, lest the computation fails.
      </p>
      <p className="text-justify w-1/2 mt-6">
        The current Polytune implementation is a pilot and may contain bugs.
      </p>
      <h2 className="text-xl font-bold mt-6 mb-2">Learn more about SMPC</h2>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/l25jcolQW6Q?si=HsuyLUada_OQFpXS"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      />
    </div>
  );
}
