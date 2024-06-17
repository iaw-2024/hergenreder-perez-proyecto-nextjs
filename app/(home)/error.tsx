'use client';

export default function Error({
  error
}: {
  error: Error ;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-white">Something went wrong!</h2>
      <h2 className="text-center text-white">{error?.message}</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => window.location.assign('/')
        }
      >
        Volver al inicio
      </button>
    </div>
  );
}