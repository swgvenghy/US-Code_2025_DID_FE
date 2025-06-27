"use client";

import { useFormContext } from "react-hook-form";
import Steper from "@/app/ui/steper";
import Image from "next/image";

type PlatformType = "NAVER_BLOG" | "INSTAGRAM" | "NAVER_STORE" | "CARROT";

interface FormValues {
  platform: PlatformType[];
}

type PlatformCheckProps = {
  totalStep: number;
  currentStep: number;
};

const OPTIONS = [
  {
    value: "NAVER_BLOG",
    label: "네이버 블로그",
    icon: "/images/naverblog-icon.png",
  },
  { value: "CARROT", label: "당근마켓", icon: "/images/dangeun-icon.png" },
  {
    value: "INSTAGRAM",
    label: "인스타그램",
    icon: "/images/instagram-icon.png",
  },
  {
    value: "NAVER_STORE",
    label: "네이버 스토어",
    icon: "/images/naverSmartStore-icon.png",
  },
] as const;

export function PlatformCheck({ totalStep, currentStep }: PlatformCheckProps) {
  const { register, watch } = useFormContext<FormValues>();
  const selected = watch("platform", []);

  return (
    <div className='flex flex-col gap-6 items-center p-14 h-full'>
      <Steper totalStep={totalStep} currentStep={currentStep} />

      <div className='flex items-end gap-8 mb-12'>
        <Image
          src='/images/intro-character.png'
          alt='인트로용 캐릭터'
          width={80}
          height={80}
        />
        <div className='flex-1 bg-white p-10 rounded-3xl text-xl text-[#343434]'>
          <strong>자! 이제</strong>
          <br />
          어떤 플랫폼으로 홍보를 시작할까요?
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <label
              key={opt.value}
              className={`w-[120px] h-[120px] flex flex-col items-center justify-center bg-white rounded-2xl
                          ${
                            isSelected
                              ? "border-2 border-[#488143]"
                              : "border border-[#E0E0E0]"
                          }`}
            >
              <input
                type='checkbox'
                value={opt.value}
                {...register("platform", { required: true })}
                className='sr-only'
              />
              <Image src={opt.icon} alt={opt.label} width={48} height={48} />
              <span className='mt-2 text-base text-[#343434]'>{opt.label}</span>
            </label>
          );
        })}
      </div>

      {/* ▶︎ form 전체를 submit */}
      <button
        type='submit'
        disabled={selected.length === 0}
        className={`mt-4 p-2 w-[343px] h-[56px] rounded-xl text-white
                    ${selected.length > 0 ? "bg-[#217011]" : "bg-[#ACACAC]"}`}
      >
        시작하기
      </button>
    </div>
  );
}
