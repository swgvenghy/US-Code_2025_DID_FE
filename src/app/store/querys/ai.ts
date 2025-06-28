import useSWRMutation from "swr/mutation";
import { apiFetch } from "./api-fetcher";
import { API_PATH } from "./api-path";

export type PlansPayloadType = {
  contentsType: "작물소개" | "일상공유" | "상품홍보";
  count: number;
  item: "마늘" | "사과" | "흑마늘" | "쌀" | "자두";
  type: "NAVER_BLOG" | "NAVER_STORE" | "INSTAGRAM";
  keywords: string[];
};
export type PlansResItemType = {
  title: string;
  summary: string;
};

export type PlansResEnvelope = {
  contentsTitle: string;
  plans: PlansResItemType[];
};

export type PlansResType = PlansResItemType[];

async function postPlanFetcher(
  url: string,
  { arg }: { arg: PlansPayloadType }
) {
  const res = await apiFetch<PlansResEnvelope>(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  console.log(res);
  return res;
}

export function usePostPlan() {
  return useSWRMutation(`${API_PATH.blog}/plans`, postPlanFetcher);
}

export type PostPlanSavePayload = PlansResEnvelope & PlansPayloadType;

export async function postPlanSaveFetch({ arg }: { arg: PostPlanSavePayload }) {
  await apiFetch(`${API_PATH.blog}/plans/save`, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

//----

//블로그 작성하기
