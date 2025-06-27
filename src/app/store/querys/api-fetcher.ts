import { createHeader } from "@/app/utils/token/create-auth-header";

export async function apiFetch<T>(
  url: RequestInfo,
  init: RequestInit = {}
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
      const msg = await res.text();
      throw new Error(`${res.status} ${res.statusText}: ${msg}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("API 요청 실패:", err);
    throw err;
  }
}
