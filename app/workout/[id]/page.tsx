"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";

export default function WorkoutDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/workouts.json")
      .then((res) => res.json())
      .then((data: Workout[]) => {
        const found = data.find((item) => item.id.toString() === resolvedParams.id);
        if (found) {
          setWorkout(found);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workout detail:", err);
        setLoading(false);
      });
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        <div className="inline-block w-10 h-10 border-4 border-neutral-800 border-t-[#ccff00] rounded-full animate-spin mb-4" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Workout Not Found</h2>
        <Link href="/" className="px-4 py-2 bg-[#ccff00] text-black font-bold rounded-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  // Parse categories properly
  const categories = workout.category
    ? workout.category.split(",").map((c) => c.trim())
    : [];

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Side: Large Workout Image */}
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
          <Image
            src={workout.image || "/banner.png"}
            alt={workout.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Details & Action Controls */}
        <div className="flex flex-col gap-6 pt-2">
          
          {/* Title & Description */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {workout.title}
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
              {workout.description ||
                "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
            </p>
          </div>

          {/* Green Category Badges */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 bg-[#ccff00] text-black text-xs font-black rounded-full uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Table Details */}
          <div className="bg-neutral-900/80 border border-neutral-800/90 rounded-2xl p-5 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-xs">EQUIPMENT</span>
              <span className="text-white font-semibold">{workout.equipment}</span>
            </div>
            
            <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-xs">DIFFICULTY</span>
              <span className="text-white font-semibold">{workout.difficulty || "Intermediate"}</span>
            </div>

            <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-xs">SETS</span>
              <span className="text-white font-semibold">{workout.sets || 4}</span>
            </div>

            <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-xs">REPS</span>
              <span className="text-white font-semibold">{workout.reps || "6-8"}</span>
            </div>

            <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-xs">DURATION</span>
              <span className="text-white font-semibold">{workout.duration}</span>
            </div>

            <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-xs">CALORIES</span>
              <span className="text-white font-semibold">{workout.calories} kcal</span>
            </div>

            <div className="flex justify-between items-center text-neutral-400">
              <span className="font-bold uppercase tracking-wider text-xs">RATING</span>
              <span className="text-white font-semibold">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-base font-black uppercase tracking-wider text-white mb-3">
              INSTRUCTIONS
            </h3>
            {workout.instructions && workout.instructions.length > 0 ? (
              <ol className="space-y-2.5 text-neutral-300 text-xs sm:text-sm list-decimal list-inside leading-relaxed">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-neutral-500">No instructions available.</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button
              onClick={() => alert("Added to today's plan!")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider hover:bg-[#b3ff00] transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Add to today's plan</span>
            </button>

            <button
              onClick={() => alert("Saved for later!")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-black text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Save for later</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}