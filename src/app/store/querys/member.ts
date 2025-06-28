import { z } from "zod";
import { SignupFormSchema } from "../lib/signup-definitions";
import { API_PATH } from "./api-path";
import { LoginFormSchema } from "../lib/login-definitions";
import { getClientToken } from "@/app/utils/token/get-client-token";

type SignupType = z.infer<typeof SignupFormSchema>;
type LoginType = z.infer<typeof LoginFormSchema>;

// 회원가입 API
export async function postSignup(rawData: SignupType) {
  const parsed = SignupFormSchema.safeParse(rawData);
  if (!parsed.success) {
    throw parsed.error.flatten().fieldErrors;
  }

  const res = await fetch(API_PATH.member, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Signup failed (${res.status}): ${errorBody}`);
  }

  return res;
}

// 로그인 API
type LoginResType = {
  accessToken: string;
  refreshToken: string;
};

export async function postLogin(rawData: LoginType): Promise<LoginResType> {
  const parsed = LoginFormSchema.safeParse(rawData);
  if (!parsed.success) {
    throw parsed.error.flatten().fieldErrors;
  }
  const res = await fetch(`${API_PATH.auth}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`로그인 실패 (${res.status}): ${errorBody}`);
  }

  const tokens: LoginResType = await res.json();

  return tokens;
}

// 재로그인
type ReissueRes = { status: string; data: { accessToken: string } };

export async function reissueAccessToken(): Promise<string | null> {
  /* 1. refreshToken 확보 --------------------------------------------------- */
  const refreshToken = getClientToken({
    tokenName: "refreshToken",
    storageName: "localStorage",
  });
  if (!refreshToken) return null;

  /* 2. 재발급 요청 -------------------------------------------------------- */
  const res = await fetch(`${API_PATH.auth}/reissue`, {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
    cache: "no-store",
  });
  if (!res.ok) return null;

  const json: ReissueRes = await res.json();
  const newAccess = json.data.accessToken;

  /* 3-A. 클라이언트 저장 --------------------------------------------------- */
  sessionStorage.setItem("accessToken", newAccess);

  /* 3-B. 서버 저장 – 동적 import(서버에서만 실행) -------------------------- */
  if (typeof window === "undefined") {
    const { setServerAccessTokenCookie } = await import(
      "../../utils/token/set-token"
    );
    setServerAccessTokenCookie(newAccess);
  }

  return newAccess;
}
