import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getServerToken } from "../utils/token/get-server-token";

export default async function BeforeLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = await getServerToken("accessToken");

  if (token) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
