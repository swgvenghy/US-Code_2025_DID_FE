"use client";

import { useFormContext, useWatch } from "react-hook-form";
import Image from "next/image";
import Steper from "@/app/ui/steper";

interface ToneCheckForm {
  tone: string;
}

type ToneCheckProps = {
  totalStep: number;
  currentStep: number;
  onNext: () => void;
};

const OPTIONS = [
  {
    value: "casual",
    title: "SNS 캐주얼톤",
    content: (
      <>
        향 진짜 미쳤어요🧄 탱글탱글한 알이 입에서 팡팡 터져요.
        <br />
        요즘 이런 퀄리티? 솔직히 드물어요.
        <br />
        의성 햇마늘, 요리할 때 한 번 써보면 무조건 반해요✨
      </>
    ),
  },
  {
    value: "friendly",
    title: "정겨운톤",
    content: (
      <>
        의성 마늘이 올해 아주 실하게 자랐어요.
        <br />
        알이 굵고 향도 진해서 요리하실 때 딱 좋습니다.
        <br />
        믿고 찾아주시는 분들께 좋은 상품 보내드릴게요~
      </>
    ),
  },
  {
    value: "lively",
    title: "발랄한 톤",
    content: (
      <>
        마늘이 이렇게 귀여울 일?! 😍
        <br />
        의성 햇마늘은 향도 맛도 그냥 대폭발💥
        <br />
        요리할 때 무조건 넣어줘야 진짜 맛이 나요!
      </>
    ),
  },
  {
    value: "calm",
    title: "차분한 설명 톤",
    content: (
      <>
        의성산 햇마늘은 GAP 인증을 받은 고품질 상품입니다.
        <br />
        알 크기가 고르고, 향이 강한 것이 특징입니다.
        <br />
        택배로 신선하게 포장되어 전국 발송 가능합니다.
      </>
    ),
  },
];

export function ToneCheck({ totalStep, currentStep, onNext }: ToneCheckProps) {
  const { register, control, setValue } = useFormContext<ToneCheckForm>();
  const selected = useWatch({ control, name: "tone", defaultValue: "" });

  const handleSelect = (value: string) => {
    setValue("tone", value, { shouldValidate: true });
  };

  return (
    <div className='flex flex-col gap-2 items-center p-14 h-full'>
      <Steper totalStep={totalStep} currentStep={currentStep} />

      <div className='flex items-end gap-8 mb-4'>
        <Image
          src='/images/intro-character.png'
          alt='인트로용 캐릭터'
          width={80}
          height={80}
        />
        <div className='flex-1 bg-white p-10 rounded-3xl text-xl text-[#343434]'>
          <strong>자신의 말투가</strong> 잘 들어나는
          <br />
          농산품의 홍보글을 선택해주세요
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 w-full'>
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={`
              p-10 flex flex-col gap-4 rounded-3xl cursor-pointer
              ${
                selected === opt.value
                  ? "bg-white text-black border border-[#488143] shadow"
                  : "bg-[#E6EAEE] text-black"
              }
            `}
          >
            <input
              type='radio'
              {...register("tone", { required: true })}
              value={opt.value}
              className='hidden'
            />
            <div className='font-bold text-2xl'>{opt.title}</div>
            <hr className='border-black' />
            <div className='text-base font-medium'>{opt.content}</div>
          </label>
        ))}
      </div>

      <button
        type='button'
        onClick={onNext}
        disabled={!selected}
        className={`
          mt-4 w-[343px] h-[56px] p-2 rounded-xl text-white
          ${selected ? "bg-[#217011]" : "bg-[#ACACAC]"}
        `}
      >
        다음
      </button>
    </div>
  );
}
