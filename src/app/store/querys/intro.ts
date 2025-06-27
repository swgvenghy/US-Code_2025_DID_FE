import { z } from "zod";
import { API_PATH } from "./api-path";
import { apiFetch } from "./api-fetcher";

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
  return await apiFetch<ProfileType>(`${API_PATH.member}/info`, {
    method: "GET",
  });
}
