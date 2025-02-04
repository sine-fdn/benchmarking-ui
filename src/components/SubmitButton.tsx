export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="border border-black px-8 py-1 bg-sine-green mt-6 rounded-2xl"
    >
      {children}
    </button>
  );
}
