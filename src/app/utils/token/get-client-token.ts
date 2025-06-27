type GetClientTokenProps = {
  tokenName: string;
  storageName: "localStorage" | "sessionStorage";
};
export function getClientToken({
  tokenName,
  storageName,
}: GetClientTokenProps): string | null {
  if (typeof window === "undefined") return null;
  try {
    const storage =
      storageName === "localStorage" ? localStorage : sessionStorage;
    return storage.getItem(tokenName);
  } catch {
    return null;
  }
}
