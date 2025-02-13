import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div>
        <h1 className="-mb-2">Private Multi-Party Benchmark</h1>
        <h2>by SINE Foundation</h2>
      </div>
      <h2 className="text-xl font-bold">About MPC</h2>
      <p className="leading-8">
        Here you can find an animation that explains how the protocol used in
        the benchmark works:
      </p>
      <div className="max-w-2xl">
        <video width="max" height="max" autoPlay loop>
          <source src="/mpc.mp4" type="video/mp4" />
        </video>
      </div>
      <a
        href="https://www.youtube.com/watch?v=l25jcolQW6Q"
        className="underline decoration-sine-purple decoration-4"
        target="_blank"
      >
        Other resources
      </a>
      <p>
        Do not hesitate to reach out if you want to learn more about{" "}
        <strong>Polytune</strong> or have a use case you would like to discuss:{" "}
        <a
          href="mailto:vorstand@sine.foundation"
          className="underline decoration-sine-purple decoration-4"
        >
          vorstand@sine.foundation
        </a>
      </p>
      <Link
        href={"/"}
        className="bg-sine-green border border-black rounded-3xl px-4 py-2"
      >
        Start new benchmark
      </Link>
    </div>
  );
}
