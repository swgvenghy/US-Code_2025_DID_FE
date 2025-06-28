import { z } from "zod";
import { API_PATH } from "./api-path";
import { apiFetch } from "./api-fetcher";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

const ProfilePatchSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  introStatus: z.boolean(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  platform: z.array(z.enum(["NAVER_BLOG", "NAVER_STORE", "INSTAGRAM"])),
  address: z.string(),
  contactEmail: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  kakaoId: z.string().optional(),
  snsId: z.string().optional(),
  smartStoreLink: z.string().url().optional(),
  contentsTone: z.enum([
    "SNS_CASUAL",
    "FRIENDLY",
    "LIVELY",
    "CALM_EXPLANATORY",
  ]),
});
export type ProfilePatchType = z.infer<typeof ProfilePatchSchema>;
export type ProfileGetType = {
  data: ProfilePatchType;
  status: string;
  timeStamp: Timestamp;
};

export async function patchProfile(rawData: ProfilePatchType) {
  const parsed = ProfilePatchSchema.safeParse(rawData);
  if (!parsed.success) {
    throw parsed.error.flatten().fieldErrors;
  }

  await apiFetch<void>(`${API_PATH.member}/info`, {
    method: "PATCH",
    body: JSON.stringify(parsed.data),
  });
}

export type ProfileType = z.infer<typeof ProfilePatchSchema>;

export async function getProfile() {
  return await apiFetch<ProfileGetType>(`${API_PATH.member}/info`, {
    method: "GET",
  });
}

export type AlarmPayloads = {
  alarmFrequency: "TWICE" | "ONCE" | "THIRD";
  alramTime: string;
  introStatus: boolean;
};

export async function alarmPatchProfile(payloads: AlarmPayloads) {
  await apiFetch<void>(`${API_PATH.member}/info`, {
    method: "PATCH",
    body: JSON.stringify(payloads),
  });
}
