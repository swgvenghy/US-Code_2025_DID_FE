import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PlansPayloadType, PlansResType } from "../querys/ai";

interface PlanState {
  payload: PlansPayloadType | null;
  plans: PlansResType;
  setPayload: (payload: PlansPayloadType) => void;
  setPlans: (plans: PlansResType) => void;
  reset: () => void;
}

export const usePlanStore = create<PlanState>()(
  devtools(
    persist(
      (set) => ({
        payload: null,
        plans: [],
        setPayload: (payload) => set({ payload }),
        setPlans: (plans) => set({ plans }),
        reset: () => set({ payload: null, plans: [] }),
      }),
      {
        name: "plan-storage",
        partialize: (s) => ({ payload: s.payload, plans: s.plans }),
      }
    )
  )
);
