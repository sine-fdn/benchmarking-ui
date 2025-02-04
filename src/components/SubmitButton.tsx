export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="border border-green-600 px-3 py-1 bg-sine-green mt-6 hover:bg-green-600 hover:text-white rounded-xl"
    >
      {children}
    </button>
  );
}
