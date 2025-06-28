import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ContentsType = "작물소개" | "일상공유" | "상품홍보";
type ItemType = "마늘" | "사과" | "흑마늘" | "살" | "자두";
export interface WriteReqType {
  contentsType: ContentsType;
  item: ItemType[];
  extraTitle: string;
  extraPrompt: string;
  setContentsType: (contentsType: ContentsType) => void;
  addItem: (item: ItemType) => void;
  removeItem: (item: ItemType) => void;
  setExtraTitle: (extraTitle: string) => void;
  setExtraPrompt: (extraPrompt: string) => void;
}

export const useWriteReqStore = create<WriteReqType>()(
  devtools(
    persist(
      (set) => ({
        contentsType: "작물소개",
        item: ["마늘"],
        extraTitle: "",
        extraPrompt: "",
        setContentsType: (contentsType) => set({ contentsType }),
        addItem: (item) =>
          set((state) =>
            state.item.includes(item) ? state : { item: [...state.item, item] }
          ),
        removeItem: (item) =>
          set((state) => ({
            item: state.item.filter((k) => k !== item),
          })),
        setExtraTitle: (extraTitle) => set({ extraTitle }),
        setExtraPrompt: (extraPrompt) => set({ extraPrompt }),
      }),
      { name: "write-blog-req-storage" }
    )
  )
);
