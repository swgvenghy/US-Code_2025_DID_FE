"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation"; // ⬅️ push 사용
import { useFunnel } from "@/app/hooks/useFunnel";

import { NameCheck } from "./steps/name-check";
import { AddressCheck } from "./steps/adress-check";
import { CallCheck } from "./steps/call-check";
import { ToneCheck } from "./steps/tone-check";
import { PlatformCheck } from "./steps/platform-check";
import {
  getProfile,
  patchProfile,
  ProfilePatchType,
} from "@/app/store/querys/intro";

type PlatformType = "NAVER_BLOG" | "INSTAGRAM" | "NAVER_STORE";
type ToneType = "SNS_CASUAL" | "FRIENDLY" | "LIVELY" | "CALM_EXPLANATORY";

type FormValues = {
  nickName: string;
  address: string;
  phoneNumber: string;
  kakaoId: string;
  snsId: string;
  smartStoreLink: string;
  contactEmail: string;
  tone: ToneType | undefined;
  platform: PlatformType[];
};

export default function IntroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const steps = [
    "이름 확인",
    "주소 작성",
    "연락처 작성",
    "홍보 말투 설정",
    "플랫폼 설정",
  ] as const;
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  const methods = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      nickName: "",
      address: "",
      phoneNumber: "",
      kakaoId: "",
      snsId: "",
      smartStoreLink: "",
      contactEmail: "",
      tone: undefined,
      platform: [],
    },
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getProfile();
        if (!cancelled) setName(res.data.name);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmitProfile = async (data: FormValues) => {
    const platformMap: Record<
      PlatformType,
      ProfilePatchType["platform"][number]
    > = {
      NAVER_BLOG: "NAVER_BLOG",
      INSTAGRAM: "INSTAGRAM",
      NAVER_STORE: "NAVER_STORE",
    };

    const payload: ProfilePatchType = {
      name: data.nickName,
      nickname: data.nickName,
      introStatus: true,
      gender: "MALE",
      platform: data.platform.map((v) => platformMap[v]),
      address: data.address,

      contactEmail: data.contactEmail || undefined,
      smartStoreLink: data.smartStoreLink || undefined,
      phoneNumber: data.phoneNumber || undefined,
      kakaoId: data.kakaoId || undefined,
      snsId: data.snsId || undefined,

      contentsTone: data.tone ?? "SNS_CASUAL",
    };

    try {
      await patchProfile(payload);
      router.push(`/dashboard/${payload.platform[0]}`);
    } catch (e) {
      console.error(e);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  if (loading) return <div className='p-8 text-center'>로딩 중...</div>;

  const currentStepNum = steps.findIndex((s) => s === currentStep) + 1;
  const nextStepName =
    steps[steps.findIndex((s) => s === currentStep) + 1] ?? steps[0];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmitProfile, (err) =>
          console.log("검증 실패:", err)
        )}
        className='flex flex-col w-full h-full'
      >
        <Funnel>
          <Step name='이름 확인'>
            <NameCheck
              name={name}
              totalStep={steps.length}
              currentStep={currentStepNum}
              onNext={() => setStep(nextStepName)}
            />
          </Step>

          <Step name='주소 작성'>
            <AddressCheck
              totalStep={steps.length}
              currentStep={currentStepNum}
              onNext={() => setStep(nextStepName)}
            />
          </Step>

          <Step name='연락처 작성'>
            <CallCheck
              totalStep={steps.length}
              currentStep={currentStepNum}
              onNext={() => setStep(nextStepName)}
            />
          </Step>

          <Step name='홍보 말투 설정'>
            <ToneCheck
              totalStep={steps.length}
              currentStep={currentStepNum}
              onNext={() => setStep(nextStepName)}
            />
          </Step>

          <Step name='플랫폼 설정'>
            <PlatformCheck
              totalStep={steps.length}
              currentStep={currentStepNum}
            />
          </Step>
        </Funnel>
      </form>
    </FormProvider>
  );
}
