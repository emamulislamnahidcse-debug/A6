'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

function WorkoutDetailsContent() {
  const params = useParams();
  const id = params?.id;
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const { addToPlan, planWorkouts } = usePlan();

  useEffect(() => {
    if (id) {
      fetch('/workouts.json')
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((item: any) => item.id.toString() === id.toString());
          setWorkout(found);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <p className="text-xl font-bold animate-pulse text-[#ccff00]">Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
        <Link href="/" className="px-5 py-2.5 bg-[#ccff00] rounded-xl text-black font-bold hover:opacity-90 transition">
          Back to Workouts
        </Link>
      </div>
    );
  }

  const isAddedToPlan = planWorkouts?.some((item: any) => item.id === workout.id);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-neutral-400 hover:text-[#ccff00] text-sm font-semibold transition">
          ← Back to Workouts
        </Link>

        {/* Two-column Layout: Image Left, Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 bg-[#1a1a1a] border border-neutral-800/80 rounded-3xl overflow-hidden p-3 shadow-2xl">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900">
              <Image
                src={workout.image || workout.imageUrl || '/placeholder.jpg'}
                alt={workout.title || 'Workout Image'}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column: Workout Info & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Title & Description */}
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-3 text-white italic font-oswald">
                {workout.title}
              </h1>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
                {workout.description}
              </p>

              {/* Category Badges */}
              {workout.category && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(workout.category) ? workout.category : workout.category.split(',')).map((cat: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#ccff00] text-black font-bold text-xs rounded-full uppercase tracking-wider"
                    >
                      {cat.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Information Table Card */}
              <div className="bg-[#1a1a1a]/80 border border-neutral-800 rounded-2xl p-5 mb-8 space-y-3">
                {workout.equipment && (
                  <div className="flex justify-between items-center text-xs md:text-sm py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-medium uppercase tracking-wider">Equipment</span>
                    <span className="text-white font-bold">{workout.equipment}</span>
                  </div>
                )}
                {workout.difficulty && (
                  <div className="flex justify-between items-center text-xs md:text-sm py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-medium uppercase tracking-wider">Difficulty</span>
                    <span className="text-white font-bold capitalize">{workout.difficulty}</span>
                  </div>
                )}
                {workout.sets && (
                  <div className="flex justify-between items-center text-xs md:text-sm py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-medium uppercase tracking-wider">Sets</span>
                    <span className="text-white font-bold">{workout.sets}</span>
                  </div>
                )}
                {workout.reps && (
                  <div className="flex justify-between items-center text-xs md:text-sm py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-medium uppercase tracking-wider">Reps</span>
                    <span className="text-white font-bold">{workout.reps}</span>
                  </div>
                )}
                {workout.duration && (
                  <div className="flex justify-between items-center text-xs md:text-sm py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-medium uppercase tracking-wider">Duration</span>
                    <span className="text-white font-bold">{workout.duration}</span>
                  </div>
                )}
                {workout.calories && (
                  <div className="flex justify-between items-center text-xs md:text-sm py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-medium uppercase tracking-wider">Calories</span>
                    <span className="text-white font-bold">{workout.calories} kcal</span>
                  </div>
                )}
                {workout.rating && (
                  <div className="flex justify-between items-center text-xs md:text-sm py-1">
                    <span className="text-neutral-400 font-medium uppercase tracking-wider">Rating</span>
                    <span className="text-white font-bold">{workout.rating}</span>
                  </div>
                )}
              </div>

              {/* Instructions Section */}
              {workout.instructions && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">Instructions</h3>
                  <ol className="space-y-3 text-neutral-300 text-sm leading-relaxed">
                    {workout.instructions.map((step: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <span className="font-bold text-[#ccff00]">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-neutral-800">
              <button
                onClick={() => addToPlan(workout)}
                className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all ${
                  isAddedToPlan
                    ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed border border-neutral-700'
                    : 'bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-lg shadow-[#ccff00]/10'
                }`}
              >
                📅 {isAddedToPlan ? "Added to Plan" : "Add to today's plan"}
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider border transition-all ${
                  isSaved
                    ? 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    : 'border-neutral-700 text-white hover:border-[#ccff00] hover:text-[#ccff00]'
                }`}
              >
                🔖 {isSaved ? 'Saved' : 'Save for later'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">Loading...</div>}>
      <WorkoutDetailsContent />
    </Suspense>
  );
}