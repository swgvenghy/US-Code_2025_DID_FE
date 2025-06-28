"use client";

import { UserInfo, useUserStore } from "@/app/store/store/user.store";
import { useEffect } from "react";

interface Props {
  initial: UserInfo;
  children: React.ReactNode;
}

export default function ClientProfileInitializer({ initial, children }: Props) {
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  useEffect(() => {
    setUserInfo(initial);
  }, [initial, setUserInfo]);

  return <>{children}</>;
}
