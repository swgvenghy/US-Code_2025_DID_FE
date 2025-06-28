import useSWRMutation from "swr/mutation";
import { apiFetch } from "./api-fetcher";
import { API_PATH } from "./api-path";
import useSWR from "swr";

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

type GetPlanItem = {
  contentsType: "작물소개" | "일상공유" | "상품홍보";
  item: "마늘" | "사과" | "흑마늘" | "쌀" | "자두";
  title: string;
  summary: string;
  contentsTitle: string;
  status: string;
  ver: 1 | 2 | 3;
};

const getFetcher = async (url: string) => {
  const res = await apiFetch<GetPlanItem[]>(url, {
    method: "GET",
  });
  return res;
};
export function useGetPlan() {
  return useSWR<GetPlanItem[]>(`${API_PATH.blog}/plans`, getFetcher);
}

//----

//블로그 작성하기

export type BlogWriteReqType = {
  contentsType: "작물소개" | "일상공유" | "상품홍보";
  item: "마늘" | "사과" | "흑마늘" | "쌀" | "자두";
  blogTitlePrompt: string;
  blogContensPrompt: string;
};

export type BlogWriteResType = {
  status: string;
  data: string;
  timestamp: string;
};

export async function writeBlog(payloads: BlogWriteReqType) {
  const res: BlogWriteResType = await apiFetch(API_PATH.blog, {
    method: "POST",
    body: JSON.stringify(payloads),
  });
  return res;
}
