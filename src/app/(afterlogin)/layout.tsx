import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getServerToken } from "../utils/token/get-server-token";
import SideBar, { Platform } from "./ui/sidebar";

export default async function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = await getServerToken("accessToken");

  if (!token) {
    redirect("/");
  }

  const items: { key: Platform; label: string }[] = [
    { key: "naverblog", label: "네이버 블로그" },
    { key: "naverSmartStore", label: "네이버 스토어" },
    { key: "instagram", label: "인스타그램" },
  ];

  return (
    <div className='flex w-dvw h-dvh bg-white pr-3 py-3 '>
      <SideBar items={items} />
      <div className=' bg-[#F2F4F6] w-full rounded-xl'>{children}</div>
    </div>
  );
}
