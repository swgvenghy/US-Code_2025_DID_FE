import { create } from "zustand";

export interface UserInfo {
  name: string;
  nickname: string;
  introStatus: boolean;
  gender: "MALE" | "FEMALE" | "OTHER";
  platform: ("NAVER_BLOG" | "NAVER_STORE" | "INSTAGRAM")[];
  address: string;
  contactEmail?: string;
  phoneNumber?: string;
  kakaoId?: string;
  snsId?: string;
  smartStoreLink?: string;
  contentsTone: "SNS_CASUAL" | "FRIENDLY" | "LIVELY" | "CALM_EXPLANATORY";
}

interface UserState {
  userInfo: UserInfo | null;
  setUserInfo: (u: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  setUserInfo: (u) => set({ userInfo: u }),
  clearUserInfo: () => set({ userInfo: null }),
}));
