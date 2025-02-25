export default function WaitingDots() {
  return (
    <div className="flex justify-center gap-1">
      <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.3s]"></div>
      <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.6s]"></div>
      <div className="rounded-4xl bg-sine-green border border-black w-2 h-2 animate-bounce [animation-delay:0.9s]"></div>
    </div>
  );
}
