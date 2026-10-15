"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planWorkouts, savedWorkouts } = usePlan();

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#ccff00] rounded-lg flex items-center justify-center font-black text-black text-xl italic tracking-tighter group-hover:scale-105 transition-transform">
            F
          </div>
          <span className="text-xl font-black text-white tracking-widest italic">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold tracking-wider uppercase transition-colors ${
              pathname === "/" ? "text-[#ccff00]" : "text-neutral-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-semibold tracking-wider uppercase transition-colors ${
              pathname === "/my-plan" ? "text-[#ccff00]" : "text-neutral-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right-side Status Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
          >
            <span>Plan</span>
            <span className="w-5 h-5 bg-black text-[#ccff00] rounded-full flex items-center justify-center text-[10px]">
              {planWorkouts.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider hover:border-[#ccff00] transition-colors"
          >
            <span>Saved</span>
            <span className="w-5 h-5 bg-neutral-800 text-white rounded-full flex items-center justify-center text-[10px]">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}