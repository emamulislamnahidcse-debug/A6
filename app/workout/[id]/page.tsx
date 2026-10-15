'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

 
function WorkoutDetailsContent() {
  const params = useParams();
  const id = params?.id;
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
        <Link href="/" className="px-4 py-2 bg-rose-600 rounded-lg text-white font-medium hover:bg-rose-700 transition">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-6 text-neutral-400 hover:text-white transition">
          ← Back to Workouts
        </Link>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-rose-500">{workout.title}</h1>
          <p className="text-neutral-300 mb-6">{workout.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
              <span className="block text-xs text-neutral-400 uppercase">Category</span>
              <span className="font-semibold">{workout.category}</span>
            </div>
            <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
              <span className="block text-xs text-neutral-400 uppercase">Duration</span>
              <span className="font-semibold">{workout.duration}</span>
            </div>
            <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
              <span className="block text-xs text-neutral-400 uppercase">Calories Burn</span>
              <span className="font-semibold">{workout.calories} kcal</span>
            </div>
            <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
              <span className="block text-xs text-neutral-400 uppercase">Difficulty</span>
              <span className="font-semibold">{workout.difficulty}</span>
            </div>
          </div>

          {workout.instructions && (
            <div>
              <h3 className="text-xl font-bold mb-3 text-rose-400">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-neutral-300">
                {workout.instructions.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

 
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Loading...</div>}>
      <WorkoutDetailsContent />
    </Suspense>
  );
}