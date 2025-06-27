// app/afterLogin/layout.tsx
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getServerToken } from "../utils/token/get-server-token";

export default async function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = await getServerToken("accessToken");

  if (!token) {
    redirect("/");
  }

  return (
    <div className='flex w-dvw h-dvh'>
      <div className='w-60'>사이드바</div>
      <div className='w-full bg-[#F2F4F6]'>{children}</div>
    </div>
  );
}
