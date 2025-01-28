export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="border border-green-600 rounded px-2 py-1 bg-green-200 mt-6 hover:bg-green-600 hover:text-white"
    >
      {children}
    </button>
  );
}
