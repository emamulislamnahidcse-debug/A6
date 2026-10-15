import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-[#ccff00] tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold text-white uppercase tracking-wider mt-4">Page Not Found</h2>
      <p className="text-neutral-400 text-sm mt-2 max-w-md">
        The lift or page you are looking for doesn't exist in our log book.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3ff00] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}