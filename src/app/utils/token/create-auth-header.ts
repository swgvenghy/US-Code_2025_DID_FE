import { reissueAccessToken } from "@/app/store/querys/member";
import { getServerToken } from "./get-server-token";

let reissuePromise: Promise<string | null> | null = null;

export async function createHeader(): Promise<{ Authorization: string }> {
  const token = await getServerToken("accessToken");
  if (token) return { Authorization: `Bearer ${token}` };

  if (!reissuePromise) {
    reissuePromise = reissueAccessToken()
      .then(() => getServerToken("accessToken"))
      .finally(() => {
        reissuePromise = null;
      });
  }

  const newToken = await reissuePromise;
  if (!newToken) {
    throw new Error("accessToken 재발급 실패");
  }
  return { Authorization: `Bearer ${newToken}` };
}
