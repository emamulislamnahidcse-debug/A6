"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const { planWorkouts, savedWorkouts, doneWorkouts, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const currentList = activeTab === "plan" ? planWorkouts : savedWorkouts;

  // Calculate stats
  const totalExercises = planWorkouts.length;
  const totalMinutes = planWorkouts.reduce((acc, curr) => acc + parseInt(curr.duration), 0);
  const totalCalories = planWorkouts.reduce((acc, curr) => acc + curr.calories, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white uppercase tracking-wider">MY PLAN</h1>
        <p className="text-neutral-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-3 gap-4 my-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-center">
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">EXERCISES</p>
          <p className="text-2xl sm:text-4xl font-black text-[#ccff00] mt-1">{totalExercises} <span className="text-xs text-neutral-500 font-normal">/ 5</span></p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-center">
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">MINUTES</p>
          <p className="text-2xl sm:text-4xl font-black text-white mt-1">{totalMinutes}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-center">
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">CALORIES</p>
          <p className="text-2xl sm:text-4xl font-black text-orange-400 mt-1">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800 mb-8">
        <button
          onClick={() => setActiveTab("plan")}
          className={`pb-3 px-6 font-extrabold text-sm uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === "plan"
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-transparent text-neutral-400 hover:text-white"
          }`}
        >
          Today's Plan ({planWorkouts.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-3 px-6 font-extrabold text-sm uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === "saved"
              ? "border-[#ccff00] text-[#ccff00]"
              : "border-transparent text-neutral-400 hover:text-white"
          }`}
        >
          Saved ({savedWorkouts.length})
        </button>
      </div>

      {/* Content List */}
      {currentList.length === 0 ? (
        <div className="py-20 bg-neutral-900/30 border border-dashed border-neutral-800 rounded-2xl text-center px-4">
          <h3 className="text-xl font-black text-white uppercase tracking-wider">NOTHING HERE YET</h3>
          <p className="text-neutral-400 text-sm mt-2 max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3ff00] transition-colors"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((workout) => {
            const isDone = doneWorkouts.includes(workout.id);
            return (
              <div
                key={workout.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-900 border rounded-2xl gap-4 transition-all ${
                  isDone ? "border-emerald-500/40 bg-emerald-950/10" : "border-neutral-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-800 shrink-0">
                    <Image src={workout.image} alt={workout.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className={`font-black text-lg ${isDone ? "line-through text-neutral-500" : "text-white"}`}>
                      {workout.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Equipment: {workout.equipment}</p>
                    <div className="flex gap-4 mt-2 text-xs text-neutral-300">
                      <span>⏱️ {workout.duration}</span>
                      <span className="text-orange-400">🔥 {workout.calories} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-bold uppercase transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => {
                        toggleDone(workout.id);
                        toast.success(isDone ? "Marked as pending" : "Marked as completed!");
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                      }`}
                    >
                      {isDone ? "✓ Done" : "Mark Done"}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                        toast.success("Removed from plan");
                      } else {
                        removeFromSaved(workout.id);
                        toast.success("Removed from saved");
                      }
                    }}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}