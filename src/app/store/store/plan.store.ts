import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PlansPayloadType, PlansResType } from "../querys/ai";

interface PlanState {
  payload: PlansPayloadType | null;
  contentsTitle: string;
  plans: PlansResType;
  setPayload: (p: PlansPayloadType) => void;
  setContentsTitle: (p: string) => void;
  setPlans: (p: PlansResType) => void;
  reset: () => void;
}

export const usePlanStore = create<PlanState>()(
  devtools(
    persist(
      (set) => ({
        payload: null,
        contentsTitle: "",
        plans: [],
        setPayload: (payload) => set({ payload }),
        setContentsTitle: (contentsTitle) => set({ contentsTitle }),
        setPlans: (plans) => set({ plans }),
        reset: () => set({ payload: null, contentsTitle: "", plans: [] }),
      }),
      { name: "plan-storage" }
    )
  )
);
type Topic = "작물소개" | "일상공유" | "상품홍보";
type Crop = "마늘" | "사과" | "흑마늘" | "쌀" | "자두";

interface PlanReqState {
  topic: Topic;
  crop: Crop;
  keywords: string[];
  setTopic: (topic: Topic) => void;
  setCrop: (crop: Crop) => void;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  reset: () => void;
}

export const usePlanReqStore = create<PlanReqState>()(
  devtools(
    persist(
      (set) => ({
        topic: "작물소개",
        crop: "마늘",
        keywords: [],

        setTopic: (topic) => set({ topic }),
        setCrop: (crop) => set({ crop }),

        addKeyword: (keyword) =>
          set((state) =>
            state.keywords.includes(keyword)
              ? state
              : { keywords: [...state.keywords, keyword] }
          ),

        removeKeyword: (keyword) =>
          set((state) => ({
            keywords: state.keywords.filter((k) => k !== keyword),
          })),

        reset: () => set({ topic: "작물소개", crop: "마늘", keywords: [] }),
      }),
      { name: "plan-req-storage" }
    )
  )
);
