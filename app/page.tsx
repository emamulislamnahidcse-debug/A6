"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/lib/types";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/workouts.json")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workouts:", err);
        setLoading(false);
      });
  }, []);

  // Sort logic
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      const durA = parseInt(a.duration);
      const durB = parseInt(b.duration);
      return durA - durB;
    } else if (sortBy === "calories") {
      return b.calories - a.calories;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Filter logic
  const filteredWorkouts = sortedWorkouts.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Hero / Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#181818] to-[#121212] border-b border-neutral-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#ccff00] text-xs font-bold tracking-[0.2em] uppercase bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">
              WORKOUT LIBRARY
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mt-6 leading-none">
              TRAIN WITH INTENT. <br />
              <span className="text-[#ccff00]">LOG EVERY SET.</span>
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg mt-6 leading-relaxed max-w-xl">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>
            <div className="mt-8">
              <a
                href="#library"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#ccff00] text-black font-extrabold uppercase tracking-wider hover:bg-[#b3ff00] transition-transform active:scale-95 shadow-lg shadow-[#ccff00]/10"
              >
                <span>BROWSE WORKOUTS</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl flex items-center justify-center">
            <Image
              src="/banner.png"
              alt="Gym banner"
              fill
              className="object-contain opacity-90 hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
              THE LIBRARY
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search exercise or muscle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
            />

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
                className="bg-transparent text-xs text-[#ccff00] font-bold uppercase focus:outline-none cursor-pointer"
              >
                <option value="duration" className="bg-neutral-900 text-white">Duration</option>
                <option value="calories" className="bg-neutral-900 text-white">Calories</option>
                <option value="rating" className="bg-neutral-900 text-white">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-12 h-12 border-4 border-neutral-800 border-t-[#ccff00] rounded-full animate-spin mb-4" />
            <p className="text-neutral-400 text-sm font-medium tracking-wider uppercase">Loading workouts...</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filteredWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group bg-neutral-900/60 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-[#ccff00]/50 transition-all duration-300 flex flex-col"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full bg-neutral-800 overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workout.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Info Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Green Category Badges (Placed right below the picture) */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {workout.category.includes(",") ? (
                        workout.category.split(",").map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-[#ccff00] text-black font-extrabold rounded-md text-[10px] uppercase tracking-wider"
                          >
                            {cat.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="px-2.5 py-1 bg-[#ccff00] text-black font-extrabold rounded-md text-[10px] uppercase tracking-wider">
                          {workout.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-[#ccff00] transition-colors tracking-wide">
                      {workout.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 font-medium">
                      Equipment: {workout.equipment}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-300">
                    <span className="flex items-center gap-1.5 font-semibold">
                      ⏱️ {workout.duration}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-orange-400">
                      🔥 {workout.calories} kcal
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-yellow-400">
                      ⭐ {workout.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}