import { createHeader } from "@/app/utils/token/create-auth-header";
import { reissueAccessToken } from "./member";

export async function apiFetch<T>(
  url: RequestInfo,
  init: RequestInit = {},
  retry = true // 재시도 여부 플래그
): Promise<T> {
  try {
    const authHeader = await createHeader();
    const res = await fetch(url, {
      ...init,
      headers: {
        ...(init.headers ?? {}),
        ...authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // 401 Unauthorized 처리
      if (res.status === 401 && retry) {
        const newAccessToken = await reissueAccessToken();
        if (newAccessToken) {
          // 새 토큰으로 헤더 갱신 후 재시도
          const newAuthHeader = await createHeader();
          const retryRes = await fetch(url, {
            ...init,
            headers: {
              ...(init.headers ?? {}),
              ...newAuthHeader,
              "Content-Type": "application/json",
            },
          });
          if (!retryRes.ok) {
            const retryMsg = await retryRes.text();
            throw new Error(
              `${retryRes.status} ${retryRes.statusText}: ${retryMsg}`
            );
          }
          return (await retryRes.json()) as T;
        }
      }
      const msg = await res.text();
      throw new Error(`${res.status} ${res.statusText}: ${msg}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("API 요청 실패:", err);
    throw err;
  }
}
