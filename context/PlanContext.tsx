"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/lib/types";

interface PlanContextType {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  doneWorkouts: number[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [doneWorkouts, setDoneWorkouts] = useState<number[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog_plan");
      const savedSaved = localStorage.getItem("fitlog_saved");
      const savedDone = localStorage.getItem("fitlog_done");

      if (savedPlan) setPlanWorkouts(JSON.parse(savedPlan));
      if (savedSaved) setSavedWorkouts(JSON.parse(savedSaved));
      if (savedDone) setDoneWorkouts(JSON.parse(savedDone));
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
  }, []);

  // Save to localStorage whenever states change
  useEffect(() => {
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(planWorkouts));
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
      localStorage.setItem("fitlog_done", JSON.stringify(doneWorkouts));
    } catch (e) {
      console.error("Failed to save data to localStorage", e);
    }
  }, [planWorkouts, savedWorkouts, doneWorkouts]);

  const addToPlan = (workout: Workout): boolean => {
    if (planWorkouts.some((item) => item.id === workout.id)) {
      return false; // Already exists
    }
    if (planWorkouts.length >= 5) {
      return false; // Cap of 5 reached
    }
    setPlanWorkouts((prev) => [...prev, workout]);
    return true;
  };

  const removeFromPlan = (id: number) => {
    setPlanWorkouts((prev) => prev.filter((item) => item.id !== id));
    setDoneWorkouts((prev) => prev.filter((itemId) => itemId !== id));
  };

  const addToSaved = (workout: Workout) => {
    if (!savedWorkouts.some((item) => item.id === workout.id)) {
      setSavedWorkouts((prev) => [...prev, workout]);
    }
  };

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleDone = (id: number) => {
    setDoneWorkouts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <PlanContext.Provider
      value={{
        planWorkouts,
        savedWorkouts,
        doneWorkouts,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};