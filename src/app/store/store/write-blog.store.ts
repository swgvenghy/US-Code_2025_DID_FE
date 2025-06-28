"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const BLOG_TOPICS = ["작물소개", "일상공유", "상품홍보"] as const;
export const ITEMS = ["마늘", "사과", "흑마늘", "쌀", "자두"] as const;
export type Topic = (typeof BLOG_TOPICS)[number];
export type Item = (typeof ITEMS)[number];

interface WriteBlogState {
  selectedTopic: Topic;
  selectedItem: Item[];
  title: string;
  content: string;
  imgFiles: string[];
  setTopic: (t: Topic) => void;
  setItems: (items: Item[]) => void;
  toggleItem: (c: Item) => void;
  setTitle: (t: string) => void;
  setContent: (c: string) => void;
  setImgFiles: (files: string[]) => void;
  reset: () => void;
}

export const useWriteBlogStore = create<WriteBlogState>()(
  devtools(
    persist(
      (set) => ({
        selectedTopic: "상품홍보",
        selectedItem: ["흑마늘"],
        title: "",
        content: "",
        imgFiles: [],
        setTopic: (selectedTopic) => set({ selectedTopic }),
        setItems: (selectedItem) => set({ selectedItem }),
        toggleItem: (crop) =>
          set((s) => ({
            selectedItem: s.selectedItem.includes(crop)
              ? s.selectedItem.filter((v) => v !== crop)
              : [...s.selectedItem, crop],
          })),
        setTitle: (title) => set({ title }),
        setContent: (content) => set({ content }),
        setImgFiles: (imgFiles) => set({ imgFiles }),
        reset: () =>
          set({
            selectedTopic: "상품홍보",
            selectedItem: ["흑마늘"],
            title: "",
            content: "",
            imgFiles: [],
          }),
      }),
      { name: "write-blog-storage" }
    )
  )
);
