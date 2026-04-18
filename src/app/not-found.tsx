import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-poppins font-bold mb-2">Page not found</h1>
        <p className="text-gray-300 font-inter mb-6">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-accent-cyan text-primary-dark font-bold px-6 py-3 rounded-lg hover:bg-[#00bfe6] transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

