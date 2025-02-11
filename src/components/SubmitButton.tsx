export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="border border-black px-8 py-1 bg-sine-green rounded-2xl cursor-pointer"
    >
      {children}
    </button>
  );
}
