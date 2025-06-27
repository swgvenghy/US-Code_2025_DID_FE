import { cookies } from "next/headers";

export async function getServerToken(
  tokenName: string
): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(tokenName)?.value ?? null;
  return token;
}
