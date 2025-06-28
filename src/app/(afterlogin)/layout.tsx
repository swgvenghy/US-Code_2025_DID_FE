import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getServerToken } from "../utils/token/get-server-token";
import SideBar, { Platform } from "./ui/sidebar";
import { getProfile } from "../store/querys/intro";
import PopupInitializer from "../ui/popup-initializer";

type SideBarItem = { key: Platform; label: string };

const PLATFORM_MAP: Record<
  string,
  { key: Platform; label: string } | undefined
> = {
  NAVER_BLOG: { key: "NAVER_BLOG", label: "네이버 블로그" },
  NAVER_STORE: { key: "NAVER_STORE", label: "네이버 스토어" },
  INSTAGRAM: { key: "INSTAGRAM", label: "인스타그램" },
};
export default async function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = await getServerToken("accessToken");
  if (!token) redirect("/");

  const userInfo = (await getProfile()).data;
  const needPopup = userInfo.introStatus === true;
  const sideBarItems: SideBarItem[] = (
    Array.isArray(userInfo.platform) ? userInfo.platform : []
  )
    .map((code) => PLATFORM_MAP[code])
    .filter((item): item is SideBarItem => item !== undefined);

  return (
    <div className='flex h-dvh w-dvw gap-3 bg-white p-3'>
      <PopupInitializer initial={needPopup} />

      <SideBar items={sideBarItems} />

      <div className='w-full rounded-xl bg-[#E9EBED]'>{children}</div>
    </div>
  );
}
