"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-primary-dark text-white flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-poppins font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-300 font-inter mb-6">
            Please try again. If this keeps happening, contact support.
          </p>
          <button
            onClick={reset}
            className="w-full bg-accent-cyan text-primary-dark font-bold py-3 rounded-lg hover:bg-[#00bfe6] transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

