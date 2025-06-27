"use server";

import { cookies } from "next/headers";

type CreateTokenProps = {
  name: string;
  value: string;
};
export async function setToken({ name, value }: CreateTokenProps) {
  const cookieStore = await cookies();

  cookieStore.set(name, value);
}
