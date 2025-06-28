"use server";

import { cookies } from "next/headers";

/** accessToken 을 서버-사이드 쿠키에 기록 */
export async function setServerAccessTokenCookie(token: string) {
  (await cookies()).set("accessToken", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1시간
  });
}
