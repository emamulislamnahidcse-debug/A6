export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-neutral-800 text-neutral-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#ccff00] rounded flex items-center justify-center font-black text-black text-sm italic">
            F
          </div>
          <span className="text-lg font-black text-white tracking-widest italic">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>

        {/* Right: Copyright */}
        <p className="text-xs text-neutral-500 tracking-wide text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}